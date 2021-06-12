module.exports = (isDev) => ({
  plugins: [
    isDev && require('autoprefixer'),
    require('postcss-preset-env'),
    require('postcss-flexbugs-fixes'),
  ].filter(Boolean),
});
