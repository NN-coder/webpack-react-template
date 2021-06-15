const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const { resolveIndexFile, extensions, resolve, getPublicUrl } = require('./utils');
const getLoaders = require('./loaders');
const getPlugins = require('./plugins');

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';
const publicUrl = getPublicUrl();

module.exports = {
  mode: NODE_ENV,
  // React refresh doesn't work with browserslist
  target: isDev ? 'web' : 'browserslist',
  devtool: isDev && 'cheap-module-source-map',
  entry: resolveIndexFile(),
  output: {
    path: resolve('build'),
    filename: isDev ? 'js/main.js' : 'js/[name].[contenthash].js',
    chunkFilename: isDev ? 'js/[name].chunk.js' : 'js/[name].[contenthash].chunk.js',
    publicPath: publicUrl,
  },
  resolve: {
    extensions: extensions.map((ext) => `.${ext}`),
  },
  devServer: {
    hot: true,
    open: true,
    port: 3000,
    historyApiFallback: {
      disableDotRule: true,
      index: publicUrl,
    },
  },
  module: {
    rules: getLoaders({ isDev, publicUrl }),
  },
  plugins: getPlugins({ isDev, publicUrl }),
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerWebpackPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
};
