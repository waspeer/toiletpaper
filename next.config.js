const { resolve } = require('path');
const dotEnvResult = require('dotenv').config();

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

const parsedVariables = dotEnvResult.parsed || {};
const env = {};

for (const key of Object.keys(parsedVariables)) {
  env[key] = process.env[key];
}

module.exports = {
  env,
  webpack(config, { dev, isServer }) {
    config.resolve.alias['#root'] = resolve(__dirname, 'src');

    return config;
  },
};
