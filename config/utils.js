const fs = require('fs');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

const resolve = (...pathSegments) => path.resolve(process.cwd(), ...pathSegments);
const packageJson = require(resolve('package.json'));

const getPublicUrl = () => {
  const { homepage } = packageJson;

  if (homepage) {
    if (homepage.startsWith('.')) return isDev ? '/' : homepage;
    return new URL(homepage.endsWith('/') ? homepage : `${homepage}/`).pathname;
  }

  return '/';
};

const extensions = ['tsx', 'ts', 'jsx', 'js', 'cjs', 'mjs'];

const resolveIndexFile = () => {
  if (fs.existsSync(resolve(packageJson.main))) return resolve(packageJson.main);
  const ext = extensions.find((ext) => fs.existsSync(resolve(`src/index.${ext}`)));
  return resolve(`src/index.${ext}`);
};

module.exports = {
  resolve,
  getPublicUrl,
  extensions,
  resolveIndexFile,
};
