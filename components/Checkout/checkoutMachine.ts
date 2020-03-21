/* eslint-disable prefer-promise-reject-errors */
import { StripeCardElement, StripeIdealBankElement } from '@stripe/stripe-js';
import { Machine, assign } from 'xstate';
import * as yup from 'yup';

import { pick, sentenceCase } from '#root/lib/helpers';

import { Cart as CartObject } from '#root/lib/cart/types';
import { handlePayment } from '#root/lib/stripe';
import { CheckoutOrder } from '#root/lib/stripe/types';

interface FormData {
  address: string;
  city: string;
  country: string;
  disabled: boolean;
  email: string;
  name: string;
  postalCode: string;
}

type Context = Omit<CartObject, 'products'> & {
  authenticationError: string;
  formErrors: Map<keyof FormData, string>;
  hasProducts: boolean;
  initialDonation: number;
  paymentMethod: 'card' | 'ideal';
  paymentMethodValid: boolean;
};

type Events =
  | { type: 'ERROR' }
  | {
      type: 'SUBMIT';
      products: CartObject['products'];
      stripeElement: StripeCardElement | StripeIdealBankElement;
    }
  | { type: 'SUCCESS' }
  | { type: 'UPDATE_BILLING_DETAILS'; name: string; value: string }
  | { type: 'UPDATE_DONATION'; donation: number }
  | { type: 'UPDATE_PAYMENT_METHOD'; isValid?: boolean; method?: Context['paymentMethod'] }
  | { type: 'VALIDATION_ERROR'; errors: Context['formErrors'] }
  | { type: 'REVALIDATE'; errors: Context['formErrors'] }
  | { type: 'VALID' };

const formSchema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  city: yup.string().required(),
  postalCode: yup.string().required(),
  country: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
});

const getFormErrors = <T extends Record<string, any>>(fields: T): Map<keyof T, string> => {
  try {
    formSchema.validateSync(fields, { abortEarly: false });
    return new Map();
  } catch ({ inner }) {
    const errors = inner.map(({ path, message }: any) => [path, sentenceCase(message)]);
    return new Map(errors);
  }
};

const authenticateOrder = async ({
  billingDetails,
  donation,
  paymentMethod,
  products,
  stripeElement,
}: Pick<Context, 'billingDetails' | 'donation' | 'paymentMethod'> &
  Pick<CartObject, 'products'> & {
    stripeElement: StripeCardElement | StripeIdealBankElement;
  }) => {
  const order: CheckoutOrder = { billingDetails, donation, products };

  const result = await handlePayment({
    element: stripeElement,
    order,
    paymentMethod,
  });

  // let result: Result<any, ErrorTypes> | undefined;

  // if (paymentMethod === 'card')
  //   result = await stripeHandler.handleCardPayment({
  //     card: stripeElement as StripeCardElement,
  //     order,
  //   });

  // if (paymentMethod === 'ideal')
  //   result = await stripeHandler.handleIDealPayment({
  //     idealBank: stripeElement as StripeIdealBankElement,
  //     order,
  //   });

  if (!result) throw Error('unexpected payment method');

  if (result.success) return Promise.resolve();

  return Promise.reject(result.error);
};

const getCheckoutMachine = ({ cart }: { cart: CartObject }) => {
  const initialContext: Context = {
    ...pick(cart, ['billingDetails', 'donation', 'shippingCosts']),
    authenticationError: '',
    formErrors: new Map(),
    hasProducts: !!cart.products.length,
    initialDonation: cart.donation,
    paymentMethod: 'card',
    paymentMethodValid: false,
  };

  return Machine<Context, Events>(
    {
      id: 'cart',
      initial: 'idle',
      context: initialContext,
      states: {
        idle: {
          entry: assign({
            formErrors: ({ billingDetails }) => getFormErrors(billingDetails),
          }),
          on: {
            UPDATE_BILLING_DETAILS: {
              target: '',
              actions: [
                assign(({ billingDetails: previousBillingDetails }, { name, value }) => {
                  const billingDetails = {
                    ...previousBillingDetails,
                    [name]: value,
                  };
                  const formErrors = getFormErrors(billingDetails);
                  return { billingDetails, formErrors };
                }),
                'updateStoredBillingDetails',
              ],
            },
            UPDATE_DONATION: {
              target: '',
              actions: assign({ donation: (_, e) => +e.donation }),
            },
            UPDATE_PAYMENT_METHOD: {
              target: '',
              actions: assign(
                (
                  { paymentMethodValid: previousIsValid, paymentMethod: previousMethod },
                  { isValid, method },
                ) => {
                  const paymentMethodValid =
                    typeof isValid !== 'undefined' ? isValid : previousIsValid;
                  const paymentMethod = method || previousMethod;
                  return { paymentMethodValid, paymentMethod };
                },
              ),
            },
            SUBMIT: [
              {
                target: 'authenticating',
                cond: 'isFormValid',
              },
              { target: 'idle.error' },
            ],
          },
          initial: 'initial',
          states: {
            initial: {},
            error: {},
          },
        },
        authenticating: {
          invoke: {
            id: 'authenticateOrder',
            src: ({ billingDetails, donation, paymentMethod }, event) => {
              if (event.type === 'SUBMIT') {
                const { products, stripeElement } = event;
                return authenticateOrder({
                  billingDetails,
                  donation,
                  paymentMethod,
                  products,
                  stripeElement,
                });
              }
              return Promise.reject();
            },
            onDone: 'success',
            onError: {
              target: 'idle.error',
              actions: assign({ authenticationError: (_, { data }) => data.message || data || '' }),
            },
          },
        },
        success: {
          type: 'final',
        },
      },
    },
    {
      guards: {
        isFormValid: ({ donation, formErrors, hasProducts, paymentMethodValid }) =>
          !formErrors.size && paymentMethodValid && (!!donation || hasProducts),
      },
    },
  );
};

export default getCheckoutMachine;
