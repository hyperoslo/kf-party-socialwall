var express = require('express.io');
var http = require('http');
var path = require('path');

var routes = require('./routes');
var figaro = require('figaro');
var instagram = require('instagram-node-lib');

var app = express();

app.http().io();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.post('/callback', routes.callback);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Configure Instagram lib
figaro.parse('figaro.json', function() {
  instagram.set('client_id', process.env.INSTAGRAM_CLIENT_ID);
  instagram.set('client_secret', process.env.INSTAGRAM_CLIENT_SECRET);
  instagram.set('callback_url', process.env.INSTAGRAM_CALLBACK_URL);
  instagram.set('redirect_url', process.env.INSTAGRAM_REDIRECT_URL);
});

app.io.route('ready', function(req) {
  req.io.emit('message', { message: 'This is a message.' });
});

module.exports = app;
