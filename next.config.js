require('dotenv').config();
const { resolve } = require('path');

module.exports = {
  env: {
    GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
    GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID,
    SHOPIFY_COLLECTION_ID: process.env.SHOPIFY_COLLECTION_ID,
    SHOPIFY_DOMAIN: process.env.SHOPIFY_DOMAIN,
    SHOPIFY_TOKEN: process.env.SHOPIFY_TOKEN,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    STRIPE_SECRET: process.env.STRIPE_SECRET,
  },
  webpack(config, { dev, isServer }) {
    config.module.rules.push({ test: /\.html$/i, loader: 'html-loader' });
    config.resolve.alias['#root'] = resolve(__dirname, 'src');
    return config;
  },
};
