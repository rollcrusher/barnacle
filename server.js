var express = require('express');
var app = express();
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// db
var mongoose = require('mongoose');
var database = require('./app/config/database');
mongoose.connect(database.url);
var db  = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// webapp
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the

require('./app/routes.js')(app);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});