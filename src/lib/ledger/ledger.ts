import subscribers from './subscribers';
import { Events, TriggerRequest } from './types';

// EVENTS

const events: Events = {
  ReceivedOrder: [],
};

// REGISTER

subscribers.forEach((subscriber) => {
  subscriber(events);
});

export const trigger = async ({ type, payload }: TriggerRequest) => {
  if (type === 'RECEIVED_ORDER') {
    return Promise.all(events.ReceivedOrder.map((listener) => listener(payload)));
  }

  return Promise.resolve();
};
