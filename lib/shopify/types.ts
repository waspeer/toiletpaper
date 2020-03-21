export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface Image {
  altText: string;
  id: string;
  src: string;
}

export interface Money {
  amount: number;
  currencyCode: string;
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  available: boolean;
  id: string;
  image: Image;
  price: Money;
  productId: string;
  selectedOptions: SelectedOption[];
  title: string;
}

export interface ProductPriceRange {
  min: Money;
  max: Money;
}

export interface Product {
  available: boolean;
  description: string;
  handle: string;
  id: string;
  images: Image[];
  options: ProductOption[];
  priceRange: ProductPriceRange;
  title: string;
  variants: ProductVariant[];
}

interface NormalizedObject<T> {
  byId: Record<string, T>;
  allIds: string[];
}

export interface NormalizedShopifyData {
  products: NormalizedObject<Omit<Product, 'variants'> & { variants: string[] }>;
  variants: NormalizedObject<ProductVariant>;
}

export interface LineItem {
  donation: number;
  quantity: number;
  title: string;
  total: number;
  variant: ProductVariant;
}
