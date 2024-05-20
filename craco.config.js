const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { whenDev } = require('@craco/craco');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.plugins.push(new TsconfigPathsPlugin({}));

      whenDev(() => {
        const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
        webpackConfig.plugins.push(new ReactRefreshPlugin());
      });

      return webpackConfig;
    },
  },
};
