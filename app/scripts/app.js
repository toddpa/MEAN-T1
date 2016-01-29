var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var log4js = require('log4js');
var logger = log4js.getLogger('math');
logger.setLevel('TRACE');

var Schema = mongoose.Schema;
var db = mongoose.connect('localhost:27017/mydb');

var app = express();

/*
// ORGINAL - works 
var server = app.listen(3000, function() {
  logger.info('Listening on port %d', server.address().port);
});
*/

app.set('views', './views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

app.use(function(req, res, next) {
  logger.trace('Time: %d', Date.now());
  next();
});


// NEW - alternative using the HTTP server
app.set('port', process.env.PORT || 3000); 
http.createServer(app).listen(app.get('port'), function(){
  logger.info('Express server listening on port ' + app.get('port'));
});


var questionRoute = require('./serverside/routes/question.routes')(app, express.Router());
var elementsRoute = require('./serverside/routes/elements.routes')(app, express.Router());
var elementRoute = require('./serverside/routes/element.routes')(app, express.Router());

logger.info("./", path.resolve('./'));
app.use(express.static(path.resolve('./')));
app.use("/content", express.static(path.resolve('./')));
// app.use("/content/Fractions", express.static(path.resolve('./content/Fractions')));

// Log Error
function logErrors(err, req, res, next) {
  logger.error(err.stack);
  next(err);
}


// Location not found
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({
      error: 'Malfunction!'
    });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', {
    error: err
  });
}

function errorHandlerLog(req, res, next) {
  logger.info('Cannot find that:' + req.path);
  next();
}

app.use(errorHandlerLog);

app.use(function(req, res, next) {
  // res.send(404, 'Sorry cant find that!');
  res.status(404).send('Sorry cant find that!')
});