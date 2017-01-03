const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack.config.js');

const host = 'localhost';
const port = 3000;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  contentBase: 'app/',
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
})
.listen(port, host, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening at http://${host}:${port}`);
});
