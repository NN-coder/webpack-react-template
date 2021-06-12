const { resolveIndexFile, extensions, resolve, getPublicUrl } = require('./utils');
const loaders = require('./loaders');
const plugins = require('./plugins');

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
    filename: isDev ? 'js/bundle.js' : 'js/[name].[contenthash].js',
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
  },
  module: {
    rules: loaders,
  },
  plugins,
};
