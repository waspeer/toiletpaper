import { Evt } from 'evt';

import subscribers from './subscribers';
import { Events, TriggerRequest } from './types';

// EVENTS

const events: Events = {
  ReceivedOrder: new Evt(),
};

// REGISTER

subscribers.forEach((subscriber) => {
  subscriber(events);
});

export const handleServerRequest = ({ type, payload }: TriggerRequest) => {
  if (type === 'RECEIVED_ORDER') {
    events.ReceivedOrder.post(payload);
  }
};
