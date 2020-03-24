import { ServerRequestObject } from '#root/lib/server/types';

// EVENTS

export type ReceivedOrderPayload = {
  address: string;
  city: string;
  country: string;
  currencyCode: string;
  date: string;
  donation: number;
  email: string;
  name: string;
  paymentId: string;
  postalCode: string;
  processed: string;
  products: { title: string; total: number; quantity: number }[];
  quantity?: number;
  shipping: number;
  status: string;
};

export interface Events {
  ReceivedOrder: ((payload: ReceivedOrderPayload) => void)[];
}

// SUBSCRIBER

export interface Subscriber {
  (events: Events): void;
}

// SERVER

export type TriggerRequest = ServerRequestObject<'RECEIVED_ORDER', ReceivedOrderPayload>;
