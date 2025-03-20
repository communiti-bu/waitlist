const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');

// Load env variables
const env = dotenv.config().parsed || {};
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: './script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin(envKeys)
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, '/'),
    },
    compress: true,
    port: 3000,
    allowedHosts: 'all',
    host: '0.0.0.0',
    client: {
      webSocketURL: 'auto://'
    }
  }
};