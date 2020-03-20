/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';

import { Title } from '#root/components/Typography';
import { useCart } from '#root/lib/cart';

import { Menu, MenuItem, Wrapper } from './_styles';

const Header = () => {
  const { products } = useCart();

  const total = products.reduce((acc, [, { quantity }]) => acc + quantity, 0);

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default Header;
