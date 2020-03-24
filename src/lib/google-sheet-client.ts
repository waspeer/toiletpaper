/* eslint-disable @typescript-eslint/camelcase */
import Debug from 'debug';
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

const debug = Debug('toiletpaper:google-sheet');

export const getSheet = async () => {
  if (
    !process.env.GOOGLE_SHEET_ID ||
    !process.env.GOOGLE_CLIENT_EMAIL ||
    !process.env.GOOGLE_PRIVATE_KEY
  ) {
    throw new Error('GOOGLE SHEET: Credentials should be set in environment variables.');
  }

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: JSON.parse(`"${process.env.GOOGLE_PRIVATE_KEY || ''}"`),
  });

  await doc.loadInfo();
  return doc.sheetsByIndex[0] as GoogleSpreadsheetWorksheet;
};

const sheetPromise = getSheet();

export const orderAlreadyLogged = async (paymentId: string) => {
  const sheet = await sheetPromise;
  const rows = await sheet.getRows<SheetRow>();
  return rows.some((row) => row.paymentId === paymentId);
};

export const addOrder = async ({
  donation,
  products,
  shipping,
  ...rowData
}: ReceivedOrderPayload) => {
  debug('logger called for payment: %s', rowData.paymentId);

  const sheet = await sheetPromise;

  if (await orderAlreadyLogged(rowData.paymentId)) {
    debug('order already logged: "%s"', rowData.paymentId);
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
    debug('add shipping: € %d', shipping);
    rows.push({ ...rowData, product: '✉︎ shipping ✉︎', total: shipping });
  }

  if (+donation) {
    debug('add donation: € %d', donation);
    rows.push({ ...rowData, product: '♥️ donation ♥️', total: donation });
  }

  debug(`logging ${rows.length} rows...`);

  sheet.addRows(rows);
};

export const subscribe = (events: Events) => {
  events.ReceivedOrder.attach((order) => {
    addOrder(order);
  });
};
