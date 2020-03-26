/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable class-methods-use-this */
import {
  PaymentIntent,
  PaymentMethodCreateParams,
  Stripe,
  StripeCardElement,
  StripeError,
  StripeIdealBankElement,
  loadStripe,
} from '@stripe/stripe-js';
import axios from 'axios';

import { mapCartProductsToLineItems } from '#root/lib/cart';
import { SHIPPING_COSTS, DEFAULT_CURRENCY } from '#root/lib/constants';
import { ok, fail } from '#root/lib/result';
import { ErrorObject, FailedResult, Result } from '#root/lib/result/types';
import { getCollection } from '#root/lib/shopify';
import { NormalizedShopifyData } from '#root/lib/shopify/types';

import * as Errors from './errors';
import {
  CheckoutOrder,
  ServerOrder,
  ServerResponse,
  ServerRequest,
  SuccesResponsePayload,
} from './types';

const API_ENDPOINT = '/api/pay';

export const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY || '', {
  apiVersion: '2020-03-02',
});

export async function makeServerRequest(
  request: ServerRequest,
): Promise<Result<SuccesResponsePayload, Errors.ErrorTypes>> {
  try {
    const { data: response } = await axios.post<ServerResponse>(API_ENDPOINT, request);
    return response;
  } catch (error) {
    if ('response' in error) return error.response.data as ServerResponse;
    throw error;
  }
}

export async function handlePayment({
  element,
  order: checkoutOrder,
  paymentMethod,
}: {
  element: StripeCardElement | StripeIdealBankElement;
  order: CheckoutOrder;
  paymentMethod: 'card' | 'ideal';
}) {
  const stripe = (await stripePromise) as Stripe;

  const intentResult = await makeServerRequest({
    type: 'CREATE_INTENT',
    payload: checkoutOrder,
  });
  if (!intentResult.success) return intentResult;
  const { order } = intentResult.payload;

  let result: { error?: StripeError; paymentIntent?: PaymentIntent } | undefined;

  if (paymentMethod === 'card') {
    result = await stripe.confirmCardPayment(intentResult.payload.paymentIntentClientSecret, {
      payment_method: {
        billing_details: mapBillingDetails(order.billingDetails),
        card: element as StripeCardElement,
      },
    });
  }

  if (paymentMethod === 'ideal') {
    result = await stripe.confirmIdealPayment(intentResult.payload.paymentIntentClientSecret, {
      payment_method: {
        billing_details: mapBillingDetails(order.billingDetails),
        ideal: element as StripeIdealBankElement,
      },
      return_url: `${window.location.origin}/checkout`,
    });
  }

  return handlePaymentIntentStatus({ ...result, order });
}

export async function checkPaymentStatus({
  clientSecret,
  order: checkoutOrder,
  paymentId,
}: {
  clientSecret: string;
  order: CheckoutOrder;
  paymentId: string;
}) {
  const stripe = (await stripePromise) as Stripe;
  const result = await stripe.retrievePaymentIntent(clientSecret);
  const collection = await getCollection();
  const order = makeOrderObject({ ...checkoutOrder, collection, paymentId });
  return handlePaymentIntentStatus({ ...result, order });
}

export async function handlePaymentIntentStatus({
  order,
  paymentIntent,
  error,
}: {
  order: ServerOrder;
  paymentIntent?: PaymentIntent;
  error?: StripeError;
}): Promise<Result<any, Errors.ErrorTypes>> {
  if (error) return mapErrorToResult(error);

  if (!paymentIntent) throw new Error('unexpected error state');

  const stripe = (await stripePromise) as Stripe;
  const { status } = paymentIntent;

  if (status === 'succeeded' || status === 'processing') {
    return ok({ processing: status === 'processing' });
  }

  if (status === 'requires_payment_method' || status === 'canceled') {
    return fail(Errors.PaymentFailed());
  }

  if (status === 'requires_confirmation') {
    return makeServerRequest({
      type: 'CONFIRM_PAYMENT',
      payload: {
        order,
        paymentIntentId: paymentIntent.id,
      },
    });
  }

  if (status === 'requires_action' || status === 'requires_capture') {
    const result = stripe.handleCardAction(paymentIntent.client_secret!);
    return handlePaymentIntentStatus({ ...result, order });
  }

  throw new Error('unexpected status');
}

export function mapBillingDetails({
  address,
  city,
  country,
  email,
  name,
  postalCode,
}: CheckoutOrder['billingDetails']): PaymentMethodCreateParams.BillingDetails {
  return {
    address: { city, country, line1: address, postal_code: postalCode },
    email,
    name,
  };
}

export function makeOrderObject({
  collection,
  donation,
  paymentId,
  products,
  ...order
}: CheckoutOrder & { collection: NormalizedShopifyData; paymentId: string }): ServerOrder {
  const lineItems = mapCartProductsToLineItems(collection, products);
  const shippingCosts = lineItems.length ? SHIPPING_COSTS : 0;
  const currencyCode = lineItems.length
    ? lineItems[0].variant.price.currencyCode
    : DEFAULT_CURRENCY;

  return {
    ...order,
    currencyCode,
    donation,
    lineItems,
    paymentId,
    shippingCosts,
  };
}

export function mapErrorToResult({ code, message }: StripeError): FailedResult<Errors.ErrorTypes> {
  let error: ErrorObject<Errors.ErrorTypes>;

  if (code === 'amount_too_large') error = Errors.AmountTooLarge(message);
  else if (code === 'amount_too_small') error = Errors.AmountTooSmall(message);
  else if (code === 'api_connection_error' || code === 'api_error') error = Errors.ApiUnavailable();
  else if (
    code === 'balance_insufficient' ||
    code === 'bank_account_declined' ||
    code === 'bank_account_unusable' ||
    code === 'card_decline_rate_limit_exceeded' ||
    code === 'card_declined' ||
    code === 'expired_card' ||
    code === 'incorrect_address' ||
    code === 'incorrect_cvc' ||
    code === 'incorrect_number' ||
    code === 'incorrect_zip' ||
    code === 'invalid_card_type' ||
    code === 'invalid_cvc' ||
    code === 'invalid_expiry_month' ||
    code === 'invalid_expiry_year' ||
    code === 'invalid_number' ||
    code === 'postal_code_invalid' ||
    code === 'payment_intent_authentication_failure' ||
    code === 'processing_error'
  )
    error = Errors.PaymentMethodError(message);
  else if (
    code === 'authentication_error' ||
    code === 'api_key_expired' ||
    code === 'rate_limit' ||
    code === 'invalid_charge_amount' ||
    code === 'secret_key_required' ||
    code === 'payment_intent_invalid_parameter' ||
    code === 'payment_intent_incompatible_payment_method'
  )
    error = Errors.BadImplementation(message);
  else if (code === 'country_unsupported') error = Errors.CountryUnsupported(message);
  else if (code === 'validation_error') error = Errors.ValidationError(message || 'Not valid');
  else error = Errors.UnexpectedError(message);

  return { success: false, error };
}
