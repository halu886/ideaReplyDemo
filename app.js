var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var ejs = require('./expand_modules/ejs')
var bodyParser = require('body-parser');
var session = require('express-session');
var setting = require('./settings');
var MongoStore = require('connect-mongo')(require('connect'));
var layout = require('express-ejs-layouts');
var index = require('./routes/index');

var app = express();

// view engine setup
app.engine('ejs', ejs);
// app.set('view options')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(layout);

// app.locals.

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  // host:
  // store: setting.store,
  resave: false,
  saveUninitialized: false,
  secret: setting.cookieSecret,
  // store:new Mong
  store: new MongoStore({
    db: setting.db
  })
  // o
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use（

//对ejs模板引擎传值
app.use(function (req, res, next) {
  if (!req.session.user) {
    var user = req.session.user = null;//当user不存在时，初始化
  }
  res.locals.user = req.session.user;
  next();
});

index(app);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.error(err.stack);
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
