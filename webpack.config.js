const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { EnvironmentPlugin, HotModuleReplacementPlugin } = require('webpack');

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

module.exports = {
  mode: NODE_ENV,
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  devServer: {
    hot: true,
    open: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    isDev && new HotModuleReplacementPlugin(),
    new EnvironmentPlugin({ NODE_ENV }),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public/index.html') }),
  ].filter(Boolean),
};
