const fs = require('fs');
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
const packageJson = require(resolve('package.json'));
const extensions = ['tsx', 'ts', 'jsx', 'js'];

const resolveIndexFile = () => {
  if (fs.existsSync(resolve(packageJson.main))) return resolve(packageJson.main);
  const ext = extensions.find((ext) => fs.existsSync(resolve(`src/index.${ext}`)));
  return resolve(`src/index.${ext}`);
};

module.exports = {
  mode: NODE_ENV,
  entry: resolveIndexFile(),
  output: {
    path: resolve('build'),
    filename: 'bundle.js',
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
