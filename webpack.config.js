module.exports = {
  entry: './alt/index.js',
  output: {
    filename: 'bundle.js',
    path: './alt/dist'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}
