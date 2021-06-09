const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    hot: true,
    open: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public/index.html') }),
  ],
};
