import { PaymentIntent } from '@stripe/stripe-js';

import { Cart as CartObject, LineItem } from '#root/lib/cart/types';
import { SuccessResult, FailedResult, UnexpectedErrorType } from '#root/lib/result/types';
import { ServerRequestObject } from '#root/lib/server/types';

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

export type CreateIntentRequest = ServerRequestObject<'CREATE_INTENT', CheckoutOrder>;

export type ConfirmPaymentRequest = ServerRequestObject<
  'CONFIRM_PAYMENT',
  {
    order: ServerOrder;
    paymentIntentId: string;
  }
>;

export type ServerRequest = ConfirmPaymentRequest | CreateIntentRequest;

// SERVER RESPONSES

export type SuccesResponsePayload = {
  status: PaymentIntent.Status;
  order: ServerOrder;
  paymentIntentClientSecret: string;
};

export type ServerResponse =
  | SuccessResult<SuccesResponsePayload>
  | FailedResult<UnexpectedErrorType>;
