/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';

import Countdown from '#root/components/Countdown';
import { Title, Paragraph } from '#root/components/Typography';
import { useCart } from '#root/lib/cart';
import { END_DATE } from '#root/lib/constants';

import { Ended, Header, Menu, MenuItem } from './_styles';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { products } = useCart();
  const total = products.reduce((acc, [, { quantity }]) => acc + quantity, 0);
  const today = new Date();
  const [running, setRunning] = useState(today < END_DATE);

  const onCountdownEnd = () => {
    setRunning(false);
  };

  if (!running) {
    return (
      <Ended>
        <Title>Operation Toiletpaper has ended!</Title>
        <Paragraph>
          Sadly Operation Toiletpaper has come to an end. <br /> But don&apos;t worry! You can still
          get our swag at the <a href="https://store.klangstof.com">regular store</a>.
        </Paragraph>
      </Ended>
    );
  }

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
      </Head>
      <Header>
        <Title>Operation Toiletpaper</Title>
        <Menu>
          <MenuItem>
            <Link href="/products" passHref>
              <a>Products</a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/about" passHref>
              <a>About</a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/checkout" passHref>
              <a>Cart ({total})</a>
            </Link>
          </MenuItem>
        </Menu>
        <Countdown endDate={END_DATE} onEnd={onCountdownEnd} />
      </Header>
      {children}
    </>
  );
};

export default Layout;
