/* eslint-disable react/jsx-props-no-spreading */
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import { AppProps } from 'next/app';
import React from 'react';

import Header from '#root/components/Header';
import { CartProvider } from '#root/lib/cart';
import { ThemeProvider } from '#root/style';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY || '', { apiVersion: '2020-03-02' });

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  whyDidYouRender(React);
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <CartProvider>
        <Elements stripe={stripePromise}>
          <Header />
          <Component {...pageProps} />
        </Elements>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
