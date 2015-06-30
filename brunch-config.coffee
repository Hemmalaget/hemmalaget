exports.config =
  # See http:#brunch.io/#documentation for docs.
  # modules:
  #   definiton: false
  #   wrapper: false
  npm:
    enabled: true
  files:
    javascripts:
      joinTo:
        'app.js': /^app/
        'vendor.js': /^(bower_components|node_modules|vendor)/
    stylesheets:
      joinTo:
        'app.css': /^app/
        'vendor.css': /^(bower_components|node_modules|vendor)/
    templates:
      joinTo:
        'js/templates.js': /.+\.jade$/
  plugins:
    jshint:
      pattern: /^app\/.*\.js$/
    stylus:
      plugins: ['lost-grid']
    jaded:
      staticPatterns: /^app(\/|\\)(.+)\.jade$/
      jade:
        pretty: true
    coffeescript:
      bare: true
