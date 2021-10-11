const webpack = require('webpack');

const dotEnvResult = require('dotenv').config();

const prod = process.env.MODE === 'production'; 
const parsedVariables = dotEnvResult.parsed || {};
const dotEnvVariables = {};

const clientSideEnv = {};
const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')


for (const key of Object.keys(parsedVariables)) {
  dotEnvVariables[key] = process.env[key];
  clientSideEnv[JSON.stringify(key)] = JSON.stringify(process.env[key]);
};

module.exports = withCss(withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      // ...
    ]
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    config.node = {
      child_process: 'empty'
}
    // for making env variables available to front end too (after server side rendering is done):

    config.plugins.push(
      new webpack.DefinePlugin({
        ...clientSideEnv
      })
    );
    
    // let's include symlinks as well
    config.resolve.symlinks = false

    return config
  },
  env: {
    ...dotEnvVariables,
  }
}));
