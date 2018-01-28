/**
 * REQUIRE
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')
var database = require('./modules/database');


/**
 * ROUTE
 */
var index = require('./routes/index');
var users = require('./routes/api/users');
var teams = require('./routes/api/teams');
var tournaments = require('./routes/api/tournaments');
var matches = require('./routes/api/matches');

/**
 * START
 */
var app = express();

/**
 * CORS
 */
app.use(cors({
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

/**
 * APP USE
 */
// view engine setup
app.set('views', ['client/dist', 'client']);
// To render HTML file
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/dist')));

app.use('/', index);
app.use('/api/users', users);
app.use('/api/teams', teams);
app.use('/api/tournaments', tournaments);
app.use('/api/matches', matches);

/**
 * DATABASE
 */
database.openConnection()
/**
 * ERROR
 */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
