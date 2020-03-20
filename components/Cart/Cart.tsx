import React from 'react';

import { ProductVariant } from '#root/lib/shopify/types';

interface LineItem {
  variant: ProductVariant & { productTitle: string };
  quantity: number;
}

interface Props {
  lineItems: LineItem[];
}

const Cart = ({ lineItems }: Props) => {
  console.log(lineItems);

  return <div />;
};

export default Cart;
