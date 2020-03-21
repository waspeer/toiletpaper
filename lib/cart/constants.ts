import { Cart } from './types';

export const LOCAL_STORAGE_KEY = 'klangstof-toiletpaper-cart';

export const SHIPPING_COSTS = process.env.SHIPPING_COSTS ? +process.env.SHIPPING_COSTS : 10;

export const EMPTY_CART: Cart = {
  billingDetails: {
    address: '',
    city: '',
    country: '',
    email: '',
    name: '',
    postalCode: '',
  },
  donation: 0,
  products: [],
  shippingCosts: 0,
};
