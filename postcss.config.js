module.exports = {
  plugins: [
    require("postcss-import")({
      path: './alt/',
    }),
    require("postcss-import")(),
    //require("postcss-url")(), // Handled by webpack file-loder or url-loader
    require("postcss-cssnext")(),
    require("postcss-browser-reporter")(),
    require("postcss-reporter")()
  ]
}
