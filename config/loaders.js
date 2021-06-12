const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { extensions, getPublicUrl } = require('./utils');

const isDev = process.env.NODE_ENV === 'development';
const publicUrl = getPublicUrl();

const loaders = [
  {
    test: new RegExp(`\\.(${extensions.join('|')})`),
    exclude: /node_modules/,
    use: ['babel-loader', '@linaria/webpack-loader'],
  },
  {
    test: /\.css$/,
    use: [
      isDev
        ? 'style-loader'
        : { loader: MiniCssExtractPlugin.loader, options: { publicPath: publicUrl } },
      'css-loader',
      'postcss-loader',
    ],
  },
  {
    test: /\.(png|jpe?g|gif|ico|webp|svg)/,
    use: {
      loader: 'file-loader',
      options: { name: isDev ? 'img/[name].[ext]' : 'img/[name].[contenthash].[ext]' },
    },
  },
];

module.exports = loaders;
