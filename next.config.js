const { resolve } = require('path');
const env = require('./env');

module.exports = {
  env,
  webpack(config, { dev, isServer }) {
    config.resolve.alias['#root'] = resolve(__dirname);

    return config;
  },
};
