const env = require('./env');
const { resolve } = require('path');

module.exports = {
  env,
  webpack(config, { dev, isServer }) {
    config.resolve.alias['#root'] = resolve(__dirname, 'src');

    return config;
  },
};
