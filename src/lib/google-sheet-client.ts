/* eslint-disable @typescript-eslint/camelcase */
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';

import { ReceivedOrderPayload, Events } from '#root/lib/ledger/types';

import credentials from './google-cred.json';

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

const getSheet = async () => {
  if (!process.env.GOOGLE_SHEET_ID) {
    throw new Error('GOOGLE SHEET: Spreadsheet ID should be set in environment variables.');
  }

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
  await doc.useServiceAccountAuth(credentials);
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
  console.log('logger called');

  const sheet = await sheetPromise;

  if (await orderAlreadyLogged(rowData.paymentId)) {
    console.log('order already logged', rowData.paymentId);

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
    console.log('add shipping', shipping);
    rows.push({ ...rowData, product: '✉︎ shipping ✉︎', total: shipping });
  }

  if (+donation) {
    console.log('add donation', donation);
    rows.push({ ...rowData, product: '♥️ donation ♥️', total: donation });
  }

  console.log(`logging ${rows.length} rows`);

  sheet.addRows(rows);
};

export const subscribe = (events: Events) => {
  console.log('logger registered');

  events.ReceivedOrder.attach((order) => {
    addOrder(order);
  });
};
