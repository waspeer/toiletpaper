import { DISCOUNT } from '#root/lib/constants';
import { NormalizedShopifyData } from '#root/lib/shopify/types';

import { Cart, LineItem } from './types';

export const mapCartProductsToLineItems = (
  collection: NormalizedShopifyData,
  cartProducts: Cart['products'],
): LineItem[] => {
  const { products, variants } = collection;

  return cartProducts.map(
    ([variantId, { quantity, donation }]): LineItem => {
      const variant = variants.byId[variantId];
      const discountPrice = +variant.price.amount * quantity * DISCOUNT;
      const productTitle = products.byId[variant.productId].title;
      return {
        donation,
        discountPrice,
        variant,
        quantity,
        title: `${productTitle} ${variant.title}`,
        get total() {
          return +donation + discountPrice;
        },
      };
    },
  );
};
