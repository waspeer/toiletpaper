import { NextApiRequest, NextApiResponse } from 'next';

import { TriggerRequest } from '#root/lib/ledger/types';
import { handleServerRequest } from '#root/lib/ledger';

export default async function Ledger(req: NextApiRequest, res: NextApiResponse) {
  const triggerRequest = req.body as TriggerRequest;
  handleServerRequest(triggerRequest);
  return res.status(204).send('');
}
