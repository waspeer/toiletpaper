/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable class-methods-use-this */
import {
  PaymentIntent,
  PaymentMethodCreateParams,
  Stripe,
  StripeCardElement,
  StripeError,
  StripeIdealBankElement,
  PaymentMethod,
} from '@stripe/stripe-js';
import axios from 'axios';

import trigger from '#root/lib/ledger/trigger';
import { ok, fail } from '#root/lib/result';
import { ErrorObject, FailedResult, Result } from '#root/lib/result/types';
import { ServerRequestObject } from '#root/lib/server/types';
import { mapCartProductsToLineItems } from '#root/lib/shopify';
import { NormalizedShopifyData } from '#root/lib/shopify/types';

import * as Errors from './errors';
import {
  ConfirmPaymentRequest,
  CheckoutOrder,
  RequestPaymentRequest,
  ServerOrder,
  ServerResponse,
  ServerRequest,
  SuccesResponsePayload,
} from './types';

const DEFAULT_CURRENCY = process.env.DEFAULT_CURRENCY || 'EUR';
const SHIPPING_COSTS = process.env.SHIPPING_COSTS ? +process.env.SHIPPING_COSTS : 10;

class StripeHandler {
  constructor(private stripe: Stripe) {}

  async handleCardPayment({
    card,
    order,
  }: {
    card: StripeCardElement;
    order: CheckoutOrder;
  }): Promise<Result<any, Errors.ErrorTypes>> {
    const result = await this.stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: StripeHandler.mapBillingDetails(order.billingDetails),
    });

    return this.makePaymentRequest({ ...result, order });
  }

  async handleIDealPayment({
    idealBank,
    order,
  }: {
    idealBank: StripeIdealBankElement;
    order: CheckoutOrder;
  }): Promise<Result<any, Errors.ErrorTypes>> {
    const result = await this.stripe.createPaymentMethod({
      billing_details: StripeHandler.mapBillingDetails(order.billingDetails),
      ideal: idealBank,
      type: 'ideal',
    });

    return this.makePaymentRequest({ ...result, order });
  }

  async makePaymentRequest({
    error,
    paymentMethod,
    order,
  }: {
    error?: StripeError;
    paymentMethod?: PaymentMethod;
    order: CheckoutOrder;
  }) {
    if (error) return StripeHandler.mapErrorToResult(error);

    if (!paymentMethod) throw new Error('unexpected error state');

    const { id: paymentMethodId } = paymentMethod;

    return this.handleServerRequest<RequestPaymentRequest>('REQUEST_PAYMENT', {
      paymentMethodId,
      order,
    });
  }

  async handleServerRequest<R extends ServerRequest>(
    type: R extends ServerRequestObject<infer T> ? T : string,
    requestPayload: R extends ServerRequestObject<string, infer P> ? P : any,
  ): Promise<Result<SuccesResponsePayload, Errors.ErrorTypes>> {
    try {
      const request = { type, payload: requestPayload };

      const { data: response } = await axios.post<ServerResponse>('/api/pay', request);

      if (!response.success) return response;

      const { order, paymentIntentClientSecret, status } = response.payload;

      let result;

      if (status === 'requires_action') {
        result = await this.stripe.handleCardAction(paymentIntentClientSecret);
      } else {
        result = await this.stripe.retrievePaymentIntent(paymentIntentClientSecret);
      }

      return this.handlePaymentIntentStatus({ ...result, order });
    } catch (error) {
      if ('response' in error) return error.response.data;
      throw error;
    }
  }

  async handlePaymentIntentStatus({
    order,
    paymentIntent,
    error,
  }: {
    order: ServerOrder;
    paymentIntent?: PaymentIntent;
    error?: StripeError;
  }): Promise<Result<any, Errors.ErrorTypes>> {
    if (error) return StripeHandler.mapErrorToResult(error);

    if (!paymentIntent) throw new Error('unexpected error state');

    const { status } = paymentIntent;

    if (status === 'succeeded') {
      trigger({ type: 'RECEIVED_ORDER', payload: { ...order, status } });
      return ok({});
    }

    if (status === 'requires_payment_method' || status === 'canceled') {
      return fail(Errors.PaymentFailed());
    }

    if (status === 'requires_confirmation') {
      return this.handleServerRequest<ConfirmPaymentRequest>('CONFIRM_PAYMENT', {
        order,
        paymentIntentId: paymentIntent.id,
      });
    }

    if (status === 'requires_action' || status === 'requires_capture') {
      throw new Error('not implemented');
    }

    if (status === 'processing') {
      trigger({ type: 'RECEIVED_ORDER', payload: { ...order, status } });
      return ok({ processing: true });
    }

    throw new Error('unexpected status');
  }

  static mapBillingDetails({
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

  static makeOrderObject({
    billingDetails,
    collection,
    donation: checkoutDonation,
    paymentId,
    products,
  }: CheckoutOrder & { collection: NormalizedShopifyData; paymentId: string }): ServerOrder {
    const lineItems = mapCartProductsToLineItems(collection, products);
    const lineItemDonations = lineItems.reduce((acc, { donation }) => acc + donation, 0);
    const shippingCosts = lineItems.length ? SHIPPING_COSTS : 0;
    const currencyCode = lineItems.length
      ? lineItems[0].variant.price.currencyCode
      : DEFAULT_CURRENCY;

    return {
      billingDetails,
      currencyCode,
      donation: checkoutDonation + lineItemDonations,
      lineItems,
      paymentId,
      shippingCosts,
    };
  }

  static mapErrorToResult({ code, message }: StripeError): FailedResult<Errors.ErrorTypes> {
    let error: ErrorObject<Errors.ErrorTypes>;

    if (code === 'amount_too_large') error = Errors.AmountTooLarge(message);
    else if (code === 'amount_too_small') error = Errors.AmountTooSmall(message);
    else if (code === 'api_connection_error' || code === 'api_error')
      error = Errors.ApiUnavailable();
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
}

export default StripeHandler;
