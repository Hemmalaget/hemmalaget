const webpack = require("webpack")
const path = require("path")

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: [
    // hot reload
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/only-dev-server",

    // Main entry
    "./app/index.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
    publicPath: "/"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
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
