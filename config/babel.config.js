module.exports = (isDev) => ({
  presets: [
    require('@babel/preset-typescript'),
    require('@babel/preset-react'),
    [require('@babel/preset-env'), { useBuiltIns: 'usage', corejs: 3 }],
  ],
  plugins: [
    require('@vanilla-extract/babel-plugin'),
    isDev && require('react-refresh/babel'),
  ].filter(Boolean),
});
