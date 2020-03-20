/* eslint-disable consistent-return */
import { useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { useCart } from '#root/lib/cart';
import Alert from '#root/components/Alert';
import Loading from '#root/components/Loading';
import StripeHandler from '#root/lib/stripe';
import Thanks from '#root/components/Thanks';
import { getCollection } from '#root/lib/shopify';
import { NormalizedShopifyData } from '#root/lib/shopify/types';

interface Props {
  collection: NormalizedShopifyData;
}

type State = 'loading' | 'success' | 'error' | 'processing';

export const getStaticProps: GetStaticProps = async () => {
  const collection = await getCollection();
  return { props: { collection } };
};

const CheckoutCompletePage = ({ collection }: Props) => {
  const { billingDetails, donation, emptyCart, products } = useCart();
  const stripe = useStripe();
  const [state, setState] = useState<State>('loading');
  const [error, setError] = useState('');
  const clientSecret = useRouter().query.payment_intent_client_secret as string | undefined;
  const paymentId = useRouter().query.payment_intent as string;
  const order = StripeHandler.makeOrderObject({
    billingDetails,
    collection,
    donation,
    paymentId,
    products,
  });

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (stripe && clientSecret) {
        const stripeHandler = new StripeHandler(stripe);
        const stripeResult = await stripe.retrievePaymentIntent(clientSecret);
        const result = await stripeHandler.handlePaymentIntentStatus({ ...stripeResult, order });

        if (!result.success) {
          setError(result.error.message);
          return setState('error');
        }

        if (products.length) emptyCart();

        if (result.payload.status === 'processing') {
          return setState('processing');
        }

        return setState('success');
      }
    };

    checkPaymentStatus();
  }, [clientSecret, emptyCart, error, order, products.length, stripe]);

  if (!stripe || state === 'loading') {
    return <Loading />;
  }

  if (state === 'success') {
    return <Thanks />;
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      {state === 'error' && <Alert message={error} type="error" icon />}
      {state === 'processing' && <Alert message="Your order is being processed..." icon />}
    </div>
  );
};

CheckoutCompletePage.whyDidYouRender = true;

export default CheckoutCompletePage;
