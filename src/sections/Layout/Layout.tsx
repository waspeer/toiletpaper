/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import { Title } from '#root/components/Typography';
import { useCart } from '#root/lib/cart';

import { Header, Menu, MenuItem } from './_styles';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { products } = useCart();

  const total = products.reduce((acc, [, { quantity }]) => acc + quantity, 0);

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
      </Header>
      {children}
    </>
  );
};

export default Layout;
