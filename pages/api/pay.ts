/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-use-before-define */
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import { fail, ok } from '#root/lib/result';
import { Result, UnexpectedErrorType } from '#root/lib/result/types';
import { ServerOrder, ServerRequest, SuccesResponsePayload } from '#root/lib/stripe/types';
import { AmountTooSmall, UnexpectedError, ErrorTypes } from '#root/lib/stripe/errors';
import { makeOrderObject, mapErrorToResult } from '#root/lib/stripe';
import { getCollection } from '#root/lib/shopify';

const RETURN_URL = `${process.env.DOMAIN || 'http://localhost:3000'}/checkout/complete`;
const STRIPE = new Stripe(process.env.STRIPE_SECRET || '', { apiVersion: '2020-03-02' });

type Response = Result<SuccesResponsePayload, UnexpectedErrorType | ErrorTypes>;

export default async function Pay(req: NextApiRequest, res: NextApiResponse<Response>) {
  const body = req.body as ServerRequest;

  try {
    let intent: Stripe.PaymentIntent | undefined;
    let order: ServerOrder | undefined;

    if (body.type === 'CREATE_INTENT') {
      const collection = await getCollection();
      order = makeOrderObject({ ...body.payload, collection, paymentId: '' });
      const amount = calculateOrderTotal(order);

      if (amount < 1) return res.status(400).json(fail(AmountTooSmall()));

      intent = await STRIPE.paymentIntents.create({
        amount,
        currency: order.currencyCode,
        description: 'Operation Toiletpaper by Klangstof ♥️',
        payment_method_types: ['card', 'ideal'],
      });
    }

    if (body.type === 'CONFIRM_PAYMENT') {
      const { paymentIntentId } = body.payload;
      order = body.payload.order;
      intent = await STRIPE.paymentIntents.confirm(paymentIntentId);
    }

    if (!(intent && order))
      return res.status(500).json(fail<UnexpectedErrorType>(UnexpectedError('Unknown request')));

    order.paymentId = intent.id;

    return res.status(200).json(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ok({ status: intent.status, paymentIntentClientSecret: intent.client_secret!, order }),
    );
  } catch (e) {
    return res.status(500).json(mapErrorToResult(e));
  }
}

const calculateOrderTotal = ({ donation, lineItems, shippingCosts }: ServerOrder) => {
  const safeDonation = donation > 0 ? +donation : 0;
  const productTotal = lineItems.reduce((acc, { total }) => acc + total, 0);
  return Math.floor((safeDonation + productTotal + shippingCosts) * 100);
};
