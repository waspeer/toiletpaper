/* eslint-disable no-undef */
import fetch from 'node-fetch';
import Client from 'shopify-buy';

// Nasty hack to get the shopifyClient to work on server-side 🤷‍♂️
if (!globalThis.fetch) {
  globalThis.fetch = fetch as any;
}

const client = Client.buildClient({
  domain: process.env.SHOPIFY_DOMAIN || '',
  storefrontAccessToken: process.env.SHOPIFY_TOKEN || '',
});

export default client;
