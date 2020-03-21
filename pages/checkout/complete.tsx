/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useCart } from '#root/lib/cart';
import Alert from '#root/components/Alert';
import Loading from '#root/components/Loading';
import Thanks from '#root/components/Thanks';
import { CheckoutOrder } from '#root/lib/stripe/types';
import { checkPaymentStatus } from '#root/lib/stripe';

type State = 'loading' | 'success' | 'error' | 'processing';

const CheckoutCompletePage = () => {
  const { billingDetails, donation, emptyCart, products } = useCart();
  const [state, setState] = useState<State>('loading');
  const [error, setError] = useState('');
  const clientSecret = useRouter().query.payment_intent_client_secret as string | undefined;
  const paymentId = useRouter().query.payment_intent as string | undefined;
  const order: CheckoutOrder = { billingDetails, donation, products };

  useEffect(() => {
    const getStatus = async () => {
      if (clientSecret && paymentId) {
        const result = await checkPaymentStatus({ clientSecret, order, paymentId });

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

    getStatus();
  }, [clientSecret, emptyCart, order, paymentId, products.length]);

  if (state === 'loading') {
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
