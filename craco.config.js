const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const webpackConfig = {
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.resolve.plugins.push(new TsconfigPathsPlugin({}));
          return webpackConfig;
        }
      }
    }
  ]
};

module.exports = webpackConfig;
