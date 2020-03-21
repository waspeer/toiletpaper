const { resolve } = require('path');

try {
  const env = require('./env');
} catch {
  const env = {};
}

module.exports = {
  env,
  webpack(config, { dev, isServer }) {
    config.resolve.alias['#root'] = resolve(__dirname, 'src');

    return config;
  },
};
