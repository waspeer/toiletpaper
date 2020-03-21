/* eslint-disable no-undef */
import fetch from 'node-fetch';
import Client from 'shopify-buy';

import { normalizeShopify } from './normalize';

// Nasty hack to get the shopifyClient to work on server-side 🤷‍♂️
if (!globalThis.fetch) {
  globalThis.fetch = fetch as any;
}

export const client = Client.buildClient({
  domain: process.env.SHOPIFY_DOMAIN || '',
  storefrontAccessToken: process.env.SHOPIFY_TOKEN || '',
});

export const getCollection = () =>
  client.collection
    .fetchWithProducts(process.env.SHOPIFY_COLLECTION_ID || '')
    .then(normalizeShopify);

export const getProductAvailability = async (productId: string) => {
  const product = await client.product.fetch(productId);
  return new Map(product.variants.map(({ id, available }: any) => [id, available]));
};
