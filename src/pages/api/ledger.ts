import bodyParser from 'body-parser';
import dayjs from 'dayjs';
import { IncomingMessage, OutgoingMessage } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { PaymentIntent } from '@stripe/stripe-js';

import { trigger } from '#root/lib/ledger';
import { BillingDetails } from '#root/lib/cart/types';
import { ReceivedOrderPayload } from '#root/lib/ledger/types';

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

const stripe = new Stripe(process.env.STRIPE_SECRET || '', { apiVersion: '2020-03-02' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function Ledger(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, bodyParser.raw({ type: 'application/json' }));

  const signature = req.headers['stripe-signature'] as string;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.log('error at constructevent', error);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as PaymentIntent;

    console.log('Received succesful payment with id: %s', paymentIntent.id);

    if ((paymentIntent as any).metadata.toiletpaper === 'true') {
      console.log('Payment intent was for operation toiletpaper');
      const metadata = parseMetadata(paymentIntent);
      await trigger({ type: 'RECEIVED_ORDER', payload: metadata });
    }
  }

  return res.status(200).json({ received: true });
}

function runMiddleware<I extends IncomingMessage, O extends OutgoingMessage>(
  req: I,
  res: O,
  fn: (req: I, res: O, cb: (result: any) => any) => void,
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

function parseMetadata(paymentIntent: PaymentIntent): ReceivedOrderPayload {
  const metadata = (paymentIntent as any).metadata as Record<string, string>;

  const emptyBillingDetails: BillingDetails = {
    address: '',
    city: '',
    country: '',
    email: '',
    name: '',
    postalCode: '',
  };

  const products = (safeParse(metadata.order) || []) as {
    title: string;
    total: number;
    quantity: number;
  }[];

  return {
    ...((safeParse(metadata.billingDetails) || emptyBillingDetails) as BillingDetails),
    currencyCode: paymentIntent.currency,
    date: dayjs.unix(paymentIntent.created).format('DD-MM-YYYY HH:mm:ss'),
    donation: +metadata.donation || 0,
    paymentId: paymentIntent.id,
    processed: '',
    products,
    shipping: +metadata.shippingCosts,
    status: paymentIntent.status,
  };
}

function safeParse(string: string) {
  try {
    return JSON.parse(string);
  } catch (error) {
    return false;
  }
}
