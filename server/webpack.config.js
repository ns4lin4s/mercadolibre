
'use strict';
const path = require('path');

module.exports = {
  entry: [
    __dirname + "/public/index.js"
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    chunkFilename: '[name].js',
    publicPath:'/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use:"style!css!"
      }
    ]
  },
  devtool: "source-map",
  plugins: [],
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css"]
  }
};
