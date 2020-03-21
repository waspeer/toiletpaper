/* eslint-disable no-param-reassign */
import {
  Product,
  ProductVariant,
  SelectedOption,
  Money,
  Image,
  ProductOption,
  NormalizedShopifyData,
} from './types';

const normalizeProductOption = ({ id, name, values }: any): ProductOption => ({
  id: String(id),
  name,
  values: values.map(({ value }: { value: string }) => value),
});

const normalizeImage = ({ altText, id, originalSrc, src }: any): Image => ({
  id: String(id),
  src: originalSrc || src,
  altText,
});

const normalizeMoney = ({ amount, currencyCode }: any): Money => ({ amount, currencyCode });

const normalizeSelectedOption = ({ name, value }: any): SelectedOption => ({ name, value });

const normalizeProductVariant = (
  { id, image, title, priceV2, available, availableForSale, selectedOptions }: any,
  productId: string,
): ProductVariant => ({
  id: String(id),
  image: normalizeImage(image),
  title,
  price: normalizeMoney(priceV2),
  productId,
  available: availableForSale || available,
  selectedOptions: selectedOptions.map(normalizeSelectedOption),
});

const normalizeProductPriceRange = (variants: any[]) => {
  const prices = variants.map(({ priceV2 }) => normalizeMoney(priceV2));
  const min = prices.reduce((prevPrice, price) =>
    price.amount < prevPrice.amount ? price : prevPrice,
  );
  const max = prices.reduce((prevPrice, price) =>
    price.amount > prevPrice.amount ? price : prevPrice,
  );

  return { min: { ...min }, max: { ...max } };
};

export const normalizeProduct = ({
  id,
  availableForSale,
  description,
  handle,
  title,
  options,
  images,
  variants,
}: any): Product => ({
  id: String(id),
  available: availableForSale,
  description,
  handle,
  title,
  options: options.map(normalizeProductOption),
  priceRange: normalizeProductPriceRange(variants),
  images: images.map(normalizeImage),
  variants: variants.map((variant: any) => normalizeProductVariant(variant, id)),
});

function objectById<T extends Record<string, any>>(objects: T[]) {
  return objects.reduce((acc, object) => {
    acc[object.id] = object;
    return acc;
  }, {} as Record<string, T>);
}

export const normalizeShopify = (shopifyData: any) => {
  const products = shopifyData.products.map(normalizeProduct) as Product[];
  return products.reduce(
    (normalized, product) => {
      const variantsById = objectById(product.variants);
      const variantIds = Object.keys(variantsById);
      const normalizedProduct = { ...product, variants: variantIds };
      normalized.variants.allIds.push(...variantIds);
      normalized.variants.byId = { ...normalized.variants.byId, ...variantsById };
      normalized.products.allIds.push(product.id);
      normalized.products.byId = { ...normalized.products.byId, [product.id]: normalizedProduct };
      return normalized;
    },
    {
      variants: { allIds: [], byId: {} },
      products: { allIds: [], byId: {} },
    } as NormalizedShopifyData,
  );
};
