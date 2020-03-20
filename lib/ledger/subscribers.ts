import { subscribe as googleSheet } from '#root/lib/google-sheet-client';

import { Subscriber } from './types';

const subscribers: Subscriber[] = [googleSheet];

export default subscribers;
