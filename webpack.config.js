const webpack = require('webpack');
const path = require('path');

// See: https://stackoverflow.com/questions/37788142/webpack-for-back-end

const common = {
  context: __dirname + '/client',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env']
        }
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};

const client = {
  entry: '../client/src/client.js',
  output: {
    path: __dirname + '/client/dist',
    filename: 'app.js'
  }
};

const server = {
  entry: '../client/src/server.js',
  target: 'node',
  output: {
    path: __dirname + '/public',
    filename: 'app-server.js',
    libraryTarget: 'commonjs-module'
  }
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];