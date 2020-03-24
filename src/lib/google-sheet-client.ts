/* eslint-disable @typescript-eslint/camelcase */
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';

import { ReceivedOrderPayload, Events } from '#root/lib/ledger/types';

export interface SheetRow {
  address: string;
  city: string;
  country: string;
  currencyCode: string;
  date: string;
  email: string;
  name: string;
  paymentId: string;
  postalCode: string;
  processed: string;
  product: string;
  total: number;
  quantity?: number;
  status: string;
}

export const getSheet = async () => {
  if (
    !process.env.GOOGLE_SHEET_ID ||
    !process.env.GOOGLE_CLIENT_EMAIL ||
    !process.env.GOOGLE_PRIVATE_KEY
  ) {
    throw new Error('GOOGLE SHEET: Credentials should be set in environment variables.');
  }

  console.log('[google-sheet]: retreiving sheet... ');

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: (process.env.GOOGLE_PRIVATE_KEY || '')
      .replace(/\\n/g, '\n')
      .replace(/\\u003d/g, '='),
  });

  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0] as GoogleSpreadsheetWorksheet;

  console.log('[google-sheet]: google sheet successfully retreived');

  return sheet;
};

export const addOrder = async ({
  donation,
  products,
  shipping,
  ...rowData
}: ReceivedOrderPayload) => {
  console.log('[google-sheet]: called for payment: %s', rowData.paymentId);

  const sheet = await getSheet();

  const savedRows = await sheet.getRows<SheetRow>();
  if (savedRows.some((row) => row.paymentId === rowData.paymentId)) {
    console.log('[google-sheet]: order already logged: "%s"', rowData.paymentId);
    return;
  }

  const rows = [] as SheetRow[];

  rows.push(
    ...products.map(({ quantity, title: product, total }) => ({
      ...rowData,
      product,
      total,
      quantity,
    })),
  );

  if (+shipping) {
    console.log('[google-sheet]: add shipping: € %d', shipping);
    rows.push({ ...rowData, product: '✉︎ shipping ✉︎', total: shipping });
  }

  if (+donation) {
    console.log('[google-sheet]: add donation: € %d', donation);
    rows.push({ ...rowData, product: '♥️ donation ♥️', total: donation });
  }

  console.log(`[google-sheet]: logging ${rows.length} rows...`);

  await sheet.addRows(rows);

  console.log('[google-sheet]: logging successful');
};

export const subscribe = (events: Events) => {
  events.ReceivedOrder.push(async (order) => {
    return addOrder(order);
  });
};
