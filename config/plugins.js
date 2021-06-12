const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
const CaseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { EnvironmentPlugin, HotModuleReplacementPlugin } = require('webpack');
const { resolve, extensions } = require('./utils');

module.exports = ({ isDev, publicUrl }) =>
  [
    new VanillaExtractPlugin(),
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
    new ForkTsCheckerWebpackPlugin({ eslint: { files: `./src/**/*.{${extensions.join(',')}}` } }),
    new HtmlWebpackPlugin({ template: resolve('public/index.html'), publicPath: publicUrl }),
    new EnvironmentPlugin({
      NODE_ENV: isDev ? 'development' : 'production',
      PUBLIC_URL: publicUrl,
    }),
    isDev && new ReactRefreshWebpackPlugin(),
    isDev && new HotModuleReplacementPlugin(),
    !isDev &&
      new ImageMinimizerWebpackPlugin({
        minimizerOptions: {
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 4 }],
            ['svgo'],
            ['webp', { quality: 85 }],
          ],
        },
      }),
    !isDev &&
      new MiniCssExtractPlugin({
        filename: isDev ? 'css/main.css' : 'css/[name].[contenthash].css',
        chunkFilename: isDev ? 'css/[name].chunk.css' : 'css/[name].[contenthash].chunk.css',
      }),
  ].filter(Boolean);
