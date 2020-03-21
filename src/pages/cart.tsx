import { GetStaticProps } from 'next';
import React from 'react';

import useCart from '#root/lib/hooks/useCart';
import { normalizeShopifyProduct, shopifyClient } from '#root/lib/shopify';
import { Product as ShopifyProduct, ProductVariant } from '#root/lib/shopify/types';
import Cart from '#root/sections/Cart';

export const getStaticProps: GetStaticProps = async () => {
  const variants: ProductVariantWithProductInfo[] = await shopifyClient.product
    .fetchAll()
    .then((shopifyProducts) => {
      return shopifyProducts.map(normalizeShopifyProduct).flatMap((product) => {
        return product.variants.map((variant) => {
          return {
            ...variant,
            productTitle: product.title,
          };
        });
      });
    });

  return { props: { variants } };
};

type ProductVariantWithProductInfo = ProductVariant & {
  productTitle: ShopifyProduct['title'];
};

interface Props {
  variants: ProductVariantWithProductInfo[];
}

const CartPage = ({ variants }: Props) => {
  const { products: variantIdQuantityMap } = useCart();

  const productIds = Object.keys(variantIdQuantityMap);

  const lineItems = variants
    .filter((variant) => productIds.includes(variant.id))
    .map((lineItem) => ({ variant: lineItem, quantity: variantIdQuantityMap[lineItem.id] }));

  return <Cart lineItems={lineItems} />;
};

export default CartPage;
