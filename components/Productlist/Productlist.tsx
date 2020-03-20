import React from 'react';

import { Product as ShopifyProduct } from '#root/lib/shopify/types';

import { ProductWrapper, Wrapper } from './_styles';
import Product from './Product';

interface Props {
  products: ShopifyProduct[];
}

const Productlist = ({ products }: Props) => {
  return (
    <Wrapper>
      {products.map(({ handle, id, images, title, priceRange }) => {
        const price = priceRange.min;

        return (
          <ProductWrapper key={id}>
            <Product handle={handle} images={images} price={price} title={title} />
          </ProductWrapper>
        );
      })}
    </Wrapper>
  );
};

export default Productlist;
