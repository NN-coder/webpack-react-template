const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CaseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { EnvironmentPlugin, HotModuleReplacementPlugin } = require('webpack');

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

const resolve = (...pathSegments) => path.resolve(process.cwd(), ...pathSegments);

module.exports = {
  mode: NODE_ENV,
  entry: resolve('src/index.tsx'),
  output: {
    path: resolve('build'),
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
    isDev && new ReactRefreshWebpackPlugin(),
    new CaseSensitivePathsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('public'),
          globOptions: { ignore: resolve('public/index.html') },
          noErrorOnMissing: true,
        },
      ],
    }),
    new EnvironmentPlugin({ NODE_ENV }),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({ template: resolve('public/index.html') }),
  ].filter(Boolean),
};
