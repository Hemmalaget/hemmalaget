var express = require('express');
var compression = require('compression')

// Common variables
var app = express();
var oneDay = 86400000;
var port = process.env.PORT || 3000;


// Middleware
app.use(compression());


// Serve static files
app.use('/', express.static(__dirname + '/docs', { maxAge: oneDay }));


// Listen for requests
console.log('Listening to port:', port);
app.listen(port);
