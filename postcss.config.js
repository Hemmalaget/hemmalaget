module.exports = {
  plugins: [
    require("postcss-import")({
      path: './app/',
    }),
    require("postcss-import")(),
    //require("postcss-url")(), // Handled by webpack file-loder or url-loader
    require("postcss-cssnext")(),
    require("postcss-browser-reporter")(),
    require("postcss-reporter")()
  ]
}
