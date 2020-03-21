import { Cart } from '#root/lib/cart/types';

import { shopifyClient } from '.';
import { normalizeShopify } from './normalize';
import { LineItem, NormalizedShopifyData } from './types';

const DISCOUNT = (process.env.DISCOUNT && +process.env.DISCOUNT) || 0.81;

export const getCollection = () =>
  shopifyClient.collection
    .fetchWithProducts(process.env.SHOPIFY_COLLECTION_ID || '')
    .then(normalizeShopify);

export const mapCartProductsToLineItems = (
  collection: NormalizedShopifyData,
  cartProducts: Cart['products'],
): LineItem[] => {
  const { products, variants } = collection;

  return cartProducts.map(
    ([variantId, { quantity, donation }]): LineItem => {
      const variant = variants.byId[variantId];
      const productTitle = products.byId[variant.productId].title;
      return {
        donation,
        variant,
        quantity,
        title: `${productTitle} ${variant.title}`,
        get total() {
          return +donation + +variant.price.amount * DISCOUNT * quantity;
        },
      };
    },
  );
};
