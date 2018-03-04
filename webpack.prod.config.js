const webpack = require("webpack")
const path = require("path")

module.exports = {
  mode: "production",
  devtool: "cheap-module-source-map",
  entry: [
    // Main entry
    "./app/index.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
    publicPath: "/"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              hash: "sha512",
              digest: "hex",
              name: "[hash].[ext]"
            }
          }
        ]
      }
    ]
  }
}
