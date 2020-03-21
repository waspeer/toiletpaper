import { Machine } from 'xstate';

import { Image, ProductVariant, ProductOption } from '#root/lib/shopify/types';
import { SHIPPING_COSTS } from '#root/lib/constants';

type LineItem = ProductVariant & {
  product: {
    handle: string;
    id: string;
    images: Image[];
    options: ProductOption[];
    title: string;
  };
  quantity: number;
};

interface BillingDetails {
  address: string;
  city: string;
  country: string;
  email: string;
  name: string;
  postalCode: string;
}

interface Checkout {
  billingDetails: BillingDetails;
  donation: number;
  products: LineItem[];
  shipping: number;
  total: number;
}

const initialContext: Checkout = {
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
  shipping: SHIPPING_COSTS,
  total: 0,
};

const checkoutMachine = Machine<Checkout>({
  id: 'cart',
  initial: 'idle',
  context: initialContext,
  states: {
    idle: {},
    loading: {},
    error: {},
    success: {},
  },
});

export default checkoutMachine;
