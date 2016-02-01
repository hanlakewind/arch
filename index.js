'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var settings = require('./settings.json');

// Encoding and morgan
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan(settings.MORGAN_MODE));

// Routes
var authenticationRoute = require('./server/authentication/route')(app);

// Mongodb
mongoose.connect(settings.MONGO_PATH);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('Databse connected');
});

// Start server
var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});