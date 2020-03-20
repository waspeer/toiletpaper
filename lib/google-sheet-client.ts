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

export const addOrder = async ({
  billingDetails,
  currencyCode,
  donation,
  lineItems,
  paymentId,
  shippingCosts: shipping,
  status,
}: ReceivedOrderPayload) => {
  console.log('Called...');

  const sheet = await sheetPromise;
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

  console.log('lineItems', lineItems);
  console.log('donation', donation);

  if (!lineItems.length && donation) {
    await sheet.addRow(rowData);
    return;
  }

  const rows: SheetRow[] = lineItems.map(({ quantity, title: productTitle, variant }) => {
    const { title: variantTitle } = variant;
    const product = `${productTitle} ${variantTitle}`;
    return { ...rowData, product, quantity };
  });

  sheet.addRows(rows);
};

export const subscribe = (events: Events) => {
  events.ReceivedOrder.attach((order) => {
    console.log('Registered...');

    addOrder(order);
  });
};
