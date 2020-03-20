import { PaymentIntent } from '@stripe/stripe-js';
import { Evt } from 'evt';

import { ServerRequestObject } from '#root/lib/server/types';
import { ServerOrder } from '#root/lib/stripe/types';

// EVENTS

export type ReceivedOrderPayload = ServerOrder & {
  status: PaymentIntent.Status;
};

export interface Events {
  ReceivedOrder: Evt<ReceivedOrderPayload>;
}

// SUBSCRIBER

export interface Subscriber {
  (events: Events): void;
}

// SERVER

export type TriggerRequest = ServerRequestObject<'RECEIVED_ORDER', ReceivedOrderPayload>;
