import { GetStaticProps } from 'next';
import React from 'react';

import { useCart } from '#root/lib/cart';
import { getCollection, mapCartProductsToLineItems } from '#root/lib/shopify';
import { NormalizedShopifyData } from '#root/lib/shopify/types';
import Checkout from '#root/components/Checkout';

export const getStaticProps: GetStaticProps = async () => {
  const shopifyData = await getCollection();

  return { props: shopifyData };
};

const CheckoutPage = (shopifyData: NormalizedShopifyData) => {
  const { products } = useCart();
  const lineItems = mapCartProductsToLineItems(shopifyData, products);
  return <Checkout lineItems={lineItems} />;
};

export default CheckoutPage;
