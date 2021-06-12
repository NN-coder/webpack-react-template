const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CaseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { EnvironmentPlugin, HotModuleReplacementPlugin } = require('webpack');
const { resolve, extensions, getPublicUrl } = require('./utils');

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';
const publicUrl = getPublicUrl();

const commonPlugins = [
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
  new EnvironmentPlugin({ NODE_ENV, PUBLIC_URL: publicUrl }),
];

const developmentPlugins = [new ReactRefreshWebpackPlugin(), new HotModuleReplacementPlugin()];

const productionPlugins = [
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
  new MiniCssExtractPlugin({ filename: 'css/main.[contenthash].css' }),
  new OptimizeCssAssetsWebpackPlugin({
    cssProcessorPluginOptions: {
      preset: ['default', { discardComments: { removeAll: true } }],
    },
  }),
];

module.exports = commonPlugins.concat(isDev ? developmentPlugins : productionPlugins);
