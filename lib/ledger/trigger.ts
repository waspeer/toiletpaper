import axios from 'axios';

import { TriggerRequest } from './types';

const LEDGER_ENDPOINT = '/api/ledger';

const trigger = async ({ type, payload }: TriggerRequest) => {
  try {
    await axios.post(LEDGER_ENDPOINT, { type, payload });
    return Promise.resolve();
  } catch {
    return Promise.reject();
  }
};

export default trigger;
