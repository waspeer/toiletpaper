import { subscribe as googleSheet } from '#root/lib/google-sheet-client';
import { subscribe as mailer } from '#root/lib/mailer';

import { Subscriber } from './types';

const subscribers: Subscriber[] = [googleSheet, mailer];

export default subscribers;
