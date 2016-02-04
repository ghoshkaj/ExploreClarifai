/**
 * Created by kajarighosh on 1/20/16.
 */

'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan'); // formerly express.logger
var errorhandler = require('errorhandler');
var Clarifai = require('./clarifai_node.js');
//var location = require('./routeFiles/location.js');
//var agency = require('./routeFiles/agency.js');
//var dataSource = require('./routeFiles/dataSource.js');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

// express/connect middleware
app.use(favicon(__dirname + '/app/favicon.ico'));
app.use(morgan('dev'));

// serve up static assets
app.use(express.static(path.join(__dirname, 'app')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/styles', express.static(__dirname + 'app/styles'));


// development only
if ('development' === app.get('env')) {
  app.use(errorhandler());
}

http.createServer(app).listen(app.get('port'), function () {
  console.log('myApp server listening on port ' + app.get('port'));
});

Clarifai.initAPI("QFv4z9eNEKGAGNLl9hHtb7tIZ9iopyuV8bTxavR6", "svX3BEQAnH1dw1HFuGIFHLUggs133cO3ff7RrIVI" );

//app.get('/location', location.getLocation);
//app.get('/dataSource', dataSource.getDataSource);
//app.get('/agency', agency.getAgency);