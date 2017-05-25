const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    // hot reload
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',

    // Main entry
    './app/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1',
          'postcss-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=9&interlaced=false'
        ]
      }
    ]
  }
}
