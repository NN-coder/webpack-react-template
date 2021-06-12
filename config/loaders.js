const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { extensions } = require('./utils');
const getBabelConfig = require('./babel.config');
const getPostcssConfig = require('./postcss.config');

module.exports = ({ isDev, publicUrl }) => [
  {
    test: new RegExp(`\\.(${extensions.join('|')})`),
    exclude: /node_modules/,
    use: { loader: 'babel-loader', options: { ...getBabelConfig(isDev), cacheDirectory: true } },
  },
  {
    test: /\.css$/,
    use: [
      isDev
        ? 'style-loader'
        : { loader: MiniCssExtractPlugin.loader, options: { publicPath: publicUrl } },
      { loader: 'css-loader', options: { sourceMap: isDev, url: false } },
      {
        loader: 'postcss-loader',
        options: { postcssOptions: getPostcssConfig(isDev), sourceMap: isDev },
      },
    ],
  },
  {
    test: /\.(png|jpe?g|gif|ico|webp|svg)/,
    use: {
      loader: 'file-loader',
      options: {
        name: isDev ? 'img/[name].[ext]' : 'img/[name].[contenthash].[ext]',
        publicPath: publicUrl,
      },
    },
  },
];
