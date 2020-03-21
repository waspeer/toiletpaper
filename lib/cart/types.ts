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
  emptyCart: () => void;
  removeItemFromCart: RemoveItemFunction;
  setDonation: SetDonationFunction;
  setBillingDetails: SetBillingDetailsFunction;
};
