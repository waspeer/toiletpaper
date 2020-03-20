import { CardElement, IdealBankElement, useElements, useStripe } from '@stripe/react-stripe-js';
import {
  StripeCardElement,
  PaymentMethodCreateParams,
  StripeIdealBankElement,
} from '@stripe/stripe-js';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import List from '#root/components/List';
// import useCart from '#root/lib/hooks/useCart';
import { ProductVariant } from '#root/lib/shopify/types';
import StripeHandler from '#root/lib/stripe';
import { Order, Result } from '#root/lib/stripe/types';
import { ErrorTypes } from '#root/lib/stripe/errors';

import { Form, Title, Wrapper } from './_styles';
import Button from '../Button';
import DonationForm from './DonationForm';
import LineItem from './LineItem';
import OrderSummary from './OrderSummary';
import PaymentForm from './PaymentForm';
import ShippingForm, {
  FormData as ShippingFormData,
  formSchema as shippingFormSchema,
} from './ShippingForm';
import Alert from '../Alert';
import Thanks from '../Thanks';
import Loading from '../Loading';

interface LineItem {
  variant: ProductVariant & { productTitle: string };
  quantity: number;
}

interface Props {
  lineItems: LineItem[];
}

type PaymentMethod = 'ideal' | 'card';

type State = 'idle' | 'loading' | 'error' | 'success';

const Cart = ({ lineItems }: Props) => {
  const stripe = useStripe();

  const stripeElements = useElements();

  // const cart = useCart();

  // const { donation: initialDonation, emptyCart, setBillingDetails, shipping: shippingCosts } = cart;

  const [initialDonation, emptyCart, shippingCosts, setBillingDetails] = [
    10,
    () => console.log('empty cart'),
    10,
    (d: any) => console.log('setBillingDetails', d),
  ];
  const cart = { products: {} };

  const [state, setState] = useState<State>('idle');

  const [error, setError] = useState('');

  const [donation, setDonation] = useState(initialDonation);

  const [paymentIsValid, setPaymentIsValid] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  const handleDonationChange = useCallback((value: number) => setDonation(value), []);

  const {
    errors,
    formState: { isValid: shippingIsValid },
    handleSubmit,
    register,
    triggerValidation,
  } = useForm<ShippingFormData>({
    mode: 'onBlur',
    validationSchema: shippingFormSchema,
  });

  if (!(stripe && stripeElements)) return <Loading />;

  if (state === 'success')
    return (
      <Wrapper>
        <Thanks />
      </Wrapper>
    );

  const stripeHandler = new StripeHandler(stripe);

  const currencyCode = lineItems.length ? lineItems[0].variant.price.currencyCode : 'EUR';

  const productTotal = lineItems.reduce((acc, { variant }) => acc + +variant.price.amount, 0);

  const disabled = !shippingIsValid || !paymentIsValid || !(donation || productTotal);

  const onPaymentChange = ({
    isValid: valid,
    method,
  }: {
    isValid?: boolean;
    method?: PaymentMethod;
  }) => {
    if (valid !== undefined) setPaymentIsValid(valid);
    if (method) setPaymentMethod(method);
  };

  const onSubmit = async ({
    address,
    city,
    country,
    email,
    name,
    postalCode,
  }: ShippingFormData) => {
    if (disabled || !(stripe && stripeElements)) return;

    const billingDetails = { address, city, country, email, name, postalCode };

    setBillingDetails(billingDetails);

    const order: Order = {
      billingDetails,
      currencyCode,
      donation,
      products: cart.products,
      shipping: shippingCosts,
    };

    const stripeBillingDetails: PaymentMethodCreateParams.BillingDetails = {
      address: { city, country, line1: address, postal_code: postalCode },
      email,
      name,
    };

    let result: Result<any, ErrorTypes> | undefined;

    if (paymentMethod === 'card') {
      const card = stripeElements.getElement(CardElement) as StripeCardElement;
      setState('loading');
      result = await stripeHandler.handleCardPayment({
        billingDetails: stripeBillingDetails,
        card,
        order,
      });
    }

    if (paymentMethod === 'ideal') {
      const idealBank = stripeElements.getElement(IdealBankElement) as StripeIdealBankElement;
      setState('loading');
      result = await stripeHandler.handleIDealPayment({
        idealBank,
        billingDetails: stripeBillingDetails,
        order,
      });
    }

    if (!result) throw Error('unexpected payment method');

    if (result.success) {
      emptyCart();
      setState('success');
    } else {
      setError(result.error.message);
      setState('error');
    }
  };

  if (!lineItems.length && initialDonation) {
    setDonation(0);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>Cart</Title>
      <List
        className="lineItems"
        items={lineItems}
        split
        renderItem={({ variant: { id, image, productTitle, selectedOptions }, quantity }) => (
          <LineItem
            id={id}
            image={image}
            key={id}
            selectedOptions={selectedOptions}
            title={productTitle}
            quantity={quantity}
          />
        )}
      />
      <Title>Donation</Title>
      <DonationForm
        disabled={state === 'loading'}
        currencyCode={currencyCode}
        initialDonation={initialDonation}
        value={donation}
        onChange={handleDonationChange}
      />
      <Title>Info</Title>
      <ShippingForm
        disabled={state === 'loading'}
        errors={errors}
        register={register}
        triggerValidation={triggerValidation}
      />
      <Title>Payment</Title>
      <PaymentForm
        disabled={state === 'loading'}
        method={paymentMethod}
        onChange={onPaymentChange}
      />
      <Title>Summary</Title>
      <OrderSummary
        currencyCode={currencyCode}
        donation={donation}
        productTotal={productTotal}
        shippingCosts={shippingCosts}
      />
      {state === 'error' && (
        <Alert type="error" message="Payment could not be completed" description={error} />
      )}
      <Button
        block
        disabled={disabled}
        loading={state === 'loading'}
        htmlType="submit"
        size="large"
        type="primary"
      >
        Checkout
      </Button>
    </Form>
  );
};

Cart.whyDidYouRender = true;

export default Cart;
