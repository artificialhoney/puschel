const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');

process.env.NX_APP_VERSION = require('../../package.json').version;

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  config.resolve = {
    ...config.resolve,
    fallback: {
      '@abandonware/noble': false,
      util: false,
    },
  };
  return config;
});
