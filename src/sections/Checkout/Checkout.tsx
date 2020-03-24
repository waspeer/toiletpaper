/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/jsx-props-no-spreading */
import { useElements, CardElement, IdealBankElement } from '@stripe/react-stripe-js';
import { useMachine } from '@xstate/react';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';

import Alert from '#root/components/Alert';
import Button from '#root/components/Button';
import List from '#root/components/List';
import Loading from '#root/components/Loading';
import { DEFAULT_CURRENCY } from '#root/lib/constants';
import { useCart } from '#root/lib/cart';
import { LineItem as LineItemObject } from '#root/lib/cart/types';

import { Form, Title, Wrapper } from './_styles';
import getCheckoutMachine from './checkoutMachine';
import {
  BillingDetailsForm,
  DonationForm,
  LineItem,
  OrderSummary,
  PaymentForm,
  Thanks,
} from './components';

interface Props {
  lineItems: LineItemObject[];
}

const Checkout = ({ lineItems }: Props) => {
  const stripeElements = useElements();

  const { emptyCart, setBillingDetails, setDonation, ...cart } = useCart();

  const { payment_intent_client_secret: clientSecret, payment_intent: paymentId } = useRouter()
    .query as any;

  const updateStoredBillingDetails = useCallback(
    (_, { name, value }) => setBillingDetails(name, value),
    [setBillingDetails],
  );

  const updateStoredDonation = useCallback((_, { donation }) => setDonation(donation), [
    setDonation,
  ]);

  const [current, send] = useMachine(getCheckoutMachine({ cart }), {
    devTools: process.env.NODE_ENV === 'development',
    actions: { updateStoredBillingDetails, updateStoredDonation, emptyStoredCart: emptyCart },
  });

  const {
    authenticationError,
    billingDetails,
    donation,
    formErrors: formErrorMap,
    paymentMethodValid,
    paymentMethod,
    shippingCosts,
  } = current.context;

  const currencyCode = lineItems.length
    ? lineItems[0].variant.price.currencyCode
    : DEFAULT_CURRENCY;

  const formErrors = current.matches('idle.error') ? formErrorMap : new Map();

  const productTotal = lineItems.reduce((acc, { total }) => acc + total, 0);

  const formIsValid = !formErrors.size && paymentMethodValid && (donation || productTotal);

  const handleDonationChange = useCallback(
    (value: number) => send({ type: 'UPDATE_DONATION', donation: value }),
    [send],
  );

  const handleBillingDetailsChange = useCallback(
    ({ name, value }: { name: string; value: string }) =>
      send({ type: 'UPDATE_BILLING_DETAILS', name, value }),
    [send],
  );

  const handlePaymentMethodChange = useCallback(
    ({ isValid, method }: { isValid?: boolean; method?: 'card' | 'ideal' }) =>
      send({ type: 'UPDATE_PAYMENT_METHOD', isValid, method }),
    [send],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!(formIsValid && stripeElements)) return;

      const stripeElement =
        paymentMethod === 'card'
          ? stripeElements.getElement(CardElement)!
          : stripeElements.getElement(IdealBankElement)!;

      send({ type: 'SUBMIT', products: cart.products, stripeElement });
    },
    [cart.products, formIsValid, paymentMethod, send, stripeElements],
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      smoothscroll.polyfill();

      if (current.matches('idle.error') && authenticationError) {
        document.querySelector('#authenticationError')!.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [authenticationError, current]);

  if (current.matches('idle.initial') && paymentId && clientSecret) {
    send({ type: 'CHECK_PAYMENT_STATUS', clientSecret, paymentId, products: cart.products });
  }

  if (
    !stripeElements ||
    (paymentId && clientSecret && current.matches('idle.initial')) ||
    current.matches('checkingStatus')
  ) {
    return <Loading />;
  }

  if (current.matches('success')) {
    return (
      <Wrapper>
        <Thanks />
      </Wrapper>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Cart</Title>
      <List
        className="lineItems"
        items={lineItems}
        split
        renderItem={({
          variant: { id, image, selectedOptions },
          title,
          total,
          quantity,
        }: LineItemObject) => (
          <LineItem
            currencyCode={currencyCode}
            priceAmount={total}
            id={id}
            image={image}
            key={id}
            selectedOptions={selectedOptions}
            title={title}
            quantity={quantity}
          />
        )}
      />
      {!lineItems.length && (
        <>
          <Title>Donation</Title>
          <DonationForm
            disabled={current.matches('authenticating')}
            currencyCode={currencyCode}
            value={donation}
            onChange={handleDonationChange}
          />
        </>
      )}
      <Title>Info</Title>
      <BillingDetailsForm
        {...billingDetails}
        disabled={current.matches('authenticating')}
        formErrors={formErrors}
        onChange={handleBillingDetailsChange}
      />
      <Title>Payment</Title>
      <PaymentForm
        disabled={current.matches('authenticating')}
        method={paymentMethod}
        onChange={handlePaymentMethodChange}
        showError={current.matches('idle.error') && !paymentMethodValid}
      />
      <Title>Summary</Title>
      <OrderSummary
        currencyCode={currencyCode}
        donation={donation}
        productTotal={productTotal}
        shippingCosts={shippingCosts}
      />
      {current.matches('idle.error') && !!authenticationError && (
        <Alert
          id="authenticationError"
          type="error"
          message="Payment could not be completed"
          description={authenticationError}
        />
      )}
      <Button
        block
        disabled={!formIsValid}
        loading={current.matches('authenticating')}
        htmlType="submit"
        size="large"
        type="primary"
      >
        Checkout
      </Button>
    </Form>
  );
};

export default Checkout;
