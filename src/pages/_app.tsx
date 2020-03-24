/* eslint-disable react/jsx-props-no-spreading */
import { Elements } from '@stripe/react-stripe-js';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';

import Layout from '#root/sections/Layout';
import { CartProvider } from '#root/lib/cart';
import { stripePromise } from '#root/lib/stripe';
import { ThemeProvider } from '#root/style';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  whyDidYouRender(React);
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <CartProvider>
        <Elements stripe={stripePromise}>
          <Head>
            <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
            <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Elements>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
