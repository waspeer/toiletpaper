import { GetStaticProps } from 'next';
import React from 'react';

import PageHead from '#root/components/PageHead';
import Productlist from '#root/sections/Productlist';
import { getCollection } from '#root/lib/shopify';
import { Product as ShopifyProduct } from '#root/lib/shopify/types';

export const getStaticProps: GetStaticProps = async () => {
  const { products } = await getCollection();

  return { props: { products: Object.values(products.byId) } };
};

interface Props {
  products: ShopifyProduct[];
}

const Products = ({ products }: Props) => {
  return (
    <>
      <PageHead title="Products" />
      <Productlist products={products} />
    </>
  );
};

export default Products;
