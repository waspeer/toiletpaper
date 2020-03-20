/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/jsx-props-no-spreading */
import { useElements, useStripe, CardElement, IdealBankElement } from '@stripe/react-stripe-js';
import { useMachine } from '@xstate/react';
import React, { useCallback } from 'react';

import Alert from '#root/components/Alert';
import { useCart } from '#root/lib/cart';
import Loading from '#root/components/Loading';
import StripeHandler from '#root/lib/stripe';
import Thanks from '#root/components/Thanks';
import { LineItem as LineItemObject } from '#root/lib/shopify/types';
import List from '#root/components/List';

import { Form, Title, Wrapper } from './_styles';
import getCheckoutMachine from './checkoutMachine';
import DonationForm from './DonationForm';
import LineItem from './LineItem';
import BillingDetailsForm from './BillingDetailsForm';
import Button from '../Button';
import PaymentForm from './PaymentForm';
import OrderSummary from './OrderSummary';

interface Props {
  lineItems: LineItemObject[];
}

const DEFAULT_CURRENCY = 'EUR';
const DISCOUNT = (process.env.DISCOUNT && +process.env.DISCOUNT) || 0.81;

const Checkout = ({ lineItems }: Props) => {
  const stripeElements = useElements();

  const stripe = useStripe();

  const { setBillingDetails, ...cart } = useCart();

  const updateStoredBillingDetails = useCallback(
    (_, { name, value }) => setBillingDetails(name, value),
    [setBillingDetails],
  );

  const [current, send] = useMachine(getCheckoutMachine({ cart }), {
    devTools: process.env.NODE_ENV === 'development',
    actions: { updateStoredBillingDetails },
  });

  const {
    authenticationError,
    billingDetails,
    donation,
    formErrors: formErrorMap,
    initialDonation,
    paymentMethodValid,
    paymentMethod,
    shippingCosts,
  } = current.context;

  const currencyCode = lineItems.length
    ? lineItems[0].variant.price.currencyCode
    : DEFAULT_CURRENCY;

  const formErrors = current.matches('idle.error') ? formErrorMap : new Map();

  const productTotal = lineItems.reduce((acc, { variant }) => acc + +variant.price.amount, 0);

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

      if (!(formIsValid && stripe && stripeElements)) return;

      const stripeHandler = new StripeHandler(stripe);

      const stripeElement =
        paymentMethod === 'card'
          ? stripeElements.getElement(CardElement)!
          : stripeElements.getElement(IdealBankElement)!;

      send({ type: 'SUBMIT', products: cart.products, stripeElement, stripeHandler });
    },
    [cart.products, formIsValid, paymentMethod, send, stripe, stripeElements],
  );

  if (!(stripe && stripeElements)) return <Loading />;

  if (current.matches('success'))
    return (
      <Wrapper>
        <Thanks />
      </Wrapper>
    );

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Cart</Title>
      <List
        className="lineItems"
        items={lineItems}
        split
        renderItem={({
          donation: lineItemDonation,
          variant: {
            id,
            image,
            price: { amount: variantPrice },
            selectedOptions,
          },
          title,
          quantity,
        }: LineItemObject) => (
          <LineItem
            currencyCode={currencyCode}
            priceAmount={lineItemDonation + +variantPrice * DISCOUNT}
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
            initialDonation={initialDonation}
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
      {current.matches('idle.error') && authenticationError && (
        <Alert
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
