const path = require('path');

module.exports = {
  webpack: {
    resolve: {
      fallback: {
        https: require.resolve('https-browserify')
      }
    }
  }
};