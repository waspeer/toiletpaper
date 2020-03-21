/* eslint-disable @typescript-eslint/camelcase */
import dayjs from 'dayjs';
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';

import { ReceivedOrderPayload, Events } from '#root/lib/ledger/types';

import credentials from './google-cred.json';

interface SheetRow {
  address: string;
  city: string;
  country: string;
  currencyCode: string;
  date: string;
  donation: number;
  email: string;
  name: string;
  paymentId: string;
  postalCode: string;
  processed: string;
  product?: string;
  quantity?: number;
  shipping: number;
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
  billingDetails,
  currencyCode,
  donation,
  lineItems,
  paymentId,
  shippingCosts: shipping,
  status,
}: ReceivedOrderPayload) => {
  console.log('logger called');

  const sheet = await sheetPromise;

  if (await orderAlreadyLogged(paymentId)) {
    console.log('order already logged', paymentId);

    return;
  }

  const { address, city, country, email, name, postalCode } = billingDetails;
  const date = dayjs().format('DD-MM-YYYY HH:mm:ss');
  const rowData: SheetRow = {
    address,
    city,
    country,
    currencyCode,
    date,
    donation,
    email,
    name,
    paymentId,
    postalCode,
    processed: '',
    shipping,
    status,
  };

  if (!lineItems.length && donation) {
    console.log('no products, just donation', donation);

    await sheet.addRow(rowData);
    return;
  }

  const rows: SheetRow[] = lineItems.map(({ quantity, title: product }) => ({
    ...rowData,
    product,
    quantity,
  }));

  console.log(`logging ${rows.length} products`);

  sheet.addRows(rows);
};

export const subscribe = (events: Events) => {
  console.log('logger registered');

  events.ReceivedOrder.attach((order) => {
    addOrder(order);
  });
};
