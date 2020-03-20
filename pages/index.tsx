import { IdealBankElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeIdealBankElement } from '@stripe/stripe-js';
import axios from 'axios';
import Head from 'next/head';
import React from 'react';

import Button from '#root/components/Button';
import { Paragraph } from '#root/components/Typography';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  if (!stripe || !elements) {
    return (
      <Paragraph>
        We&apos;re not able to accept payments at the moment :( please try again later.
      </Paragraph>
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const idealBank = elements.getElement(IdealBankElement) as StripeIdealBankElement;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'ideal',
      ideal: idealBank,
    });

    if (!error && paymentMethod) {
      const { id } = paymentMethod;

      try {
        const { data } = await axios.post('/api/payment', { id, amount: 1000 });

        const { error: err } = await stripe.confirmIdealPayment(data.clientSecret, {
          payment_method: {
            ideal: idealBank,
          },
          return_url: 'http://localhost:3000/checkout/complete',
        });

        if (err) {
          console.error(err);
        }
      } catch (err) {
        console.log('err', err);
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <IdealBankElement />
      <Button htmlType="submit" block>
        Pay
      </Button>
    </form>
  );
};

const Home = () => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <PaymentForm />
    </main>
  </div>
);

export default Home;
