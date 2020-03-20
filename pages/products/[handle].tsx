import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

import Product from '#root/components/ProductForm';
import { getCollection, shopifyClient, normalizeShopifyProduct } from '#root/lib/shopify';
import { Product as ShopifyProduct } from '#root/lib/shopify/types';

export const getStaticPaths: GetStaticPaths = async () => {
  const { products } = await getCollection();

  const paths = Object.values(products.byId).map(
    ({ handle }: { handle: string }) => `/products/${handle}`,
  ) as string[];

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { handle } = params as any;
  const product = await shopifyClient.product.fetchByHandle(handle);
  return { props: normalizeShopifyProduct(product) };
};

const ProductPage = ({ description, images, options, title, variants }: ShopifyProduct) => {
  const image = images[0];
  return (
    <Product
      description={description}
      image={image}
      title={title}
      options={options}
      variants={variants}
    />
  );
};

export default ProductPage;
