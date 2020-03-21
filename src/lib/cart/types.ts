import { ProductVariant } from '#root/lib/shopify/types';

export interface BillingDetails {
  address: string;
  city: string;
  country: string;
  email: string;
  name: string;
  postalCode: string;
}

export interface CartProduct {
  quantity: number;
  donation: number;
}

export interface Cart {
  billingDetails: BillingDetails;
  donation: number;
  products: [string, CartProduct][];
  shippingCosts: number;
}

export interface AddItemFunction {
  (args: { variantId: string; donation: number; quantity: number }): void;
}

export interface RemoveItemFunction {
  (variantId: string): void;
}

export interface SetDonationFunction {
  (donation: number): void;
}

export interface SetBillingDetailsFunction {
  (name: string, value: string): void;
}

export type CartContext = Cart & {
  addItemToCart: AddItemFunction;
  cartSize: number;
  emptyCart: () => void;
  removeItemFromCart: RemoveItemFunction;
  setDonation: SetDonationFunction;
  setBillingDetails: SetBillingDetailsFunction;
};

export interface LineItem {
  donation: number;
  discountPrice: number;
  quantity: number;
  title: string;
  total: number;
  variant: ProductVariant;
}
