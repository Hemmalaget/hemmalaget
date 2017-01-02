var express = require('express');
var compression = require('compression')

// Common variables
var app = express();
var oneDay = 86400000;
var port = process.env.PORT || 3000;


// Middleware
app.use(compression());


// Serve static files
app.use('/assets', express.static(__dirname + '/dist', { maxAge: oneDay }));
app.get('/', (req, res) => res.sendFile(__dirname + '/app/index.html'));


// Listen for requests
console.log('Listening to port:', port);
app.listen(port);
