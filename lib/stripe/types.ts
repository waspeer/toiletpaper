import { PaymentIntent } from '@stripe/stripe-js';

import { Cart as CartObject } from '#root/lib/cart/types';
import { SuccessResult, FailedResult, UnexpectedErrorType } from '#root/lib/result/types';
import { ServerRequestObject } from '#root/lib/server/types';
import { LineItem } from '#root/lib/shopify/types';

// ORDER

export interface CheckoutOrder {
  billingDetails: CartObject['billingDetails'];
  donation: number;
  products: CartObject['products'];
}

export type ServerOrder = Omit<CheckoutOrder, 'products'> & {
  currencyCode: string;
  lineItems: LineItem[];
  paymentId: string;
  shippingCosts: number;
};

// SERVER REQUESTS

export type RequestPaymentRequest = ServerRequestObject<
  'REQUEST_PAYMENT',
  {
    paymentMethodId: string;
    order: CheckoutOrder;
  }
>;

export type ConfirmPaymentRequest = ServerRequestObject<
  'CONFIRM_PAYMENT',
  {
    order: ServerOrder;
    paymentIntentId: string;
  }
>;

export type ServerRequest = RequestPaymentRequest | ConfirmPaymentRequest;

// SERVER RESPONSES

export type SuccesResponsePayload = {
  status: PaymentIntent.Status;
  order: ServerOrder;
  paymentIntentClientSecret: string;
};

export type ServerResponse =
  | SuccessResult<SuccesResponsePayload>
  | FailedResult<UnexpectedErrorType>;
