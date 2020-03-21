import { Cart } from './types';

export const LOCAL_STORAGE_KEY = 'klangstof-toiletpaper-cart';

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
