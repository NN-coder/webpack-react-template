const fs = require('fs');
const path = require('path');
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

const getPublicUrl = () => {
  const { homepage } = packageJson;

  if (homepage) {
    if (homepage.startsWith('.')) return isDev ? '/' : homepage;
    return new URL(homepage.endsWith('/') ? homepage : `${homepage}/`).pathname;
  }

  return '/';
};

const publicUrl = getPublicUrl();

module.exports = {
  mode: NODE_ENV,
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
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: ['babel-loader', '@linaria/webpack-loader'],
      },
      {
        test: /\.css$/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|ico|webp|svg)/,
        use: {
          loader: 'file-loader',
          options: { name: isDev ? 'img/[name].[ext]' : 'img/[name].[contenthash].[ext]' },
        },
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new EnvironmentPlugin({ NODE_ENV, PUBLIC_URL: publicUrl }),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({ template: resolve('public/index.html'), publicPath: publicUrl }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('public'),
          globOptions: { ignore: resolve('public/index.html') },
          noErrorOnMissing: true,
        },
      ],
    }),
    isDev && new HotModuleReplacementPlugin(),
    isDev && new ReactRefreshWebpackPlugin(),
    !isDev && new MiniCssExtractPlugin({ filename: 'css/main.[contenthash].css' }),
    !isDev &&
      new OptimizeCssAssetsWebpackPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
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
  ].filter(Boolean),
};
