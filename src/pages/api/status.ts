import { NextApiRequest, NextApiResponse } from 'next';
import { getSheet } from '#root/lib/google-sheet-client';

export default async function Status(req: NextApiRequest, res: NextApiResponse) {
  try {
    await getSheet();
    res.json(makeResponse(true));
  } catch (error) {
    res.status(500).json(makeResponse(false, error));
  }
}

function makeResponse(success: boolean, error?: any) {
  return {
    success,
    error,
  };
}
