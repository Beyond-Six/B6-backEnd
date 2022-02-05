const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

require('dotenv').config();

//bodyParser http post parse
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json()); //vue.js post type json

//whitelist setup xss. check .env file
const cors = require("cors");
const corsOptions = {
  origin: function (origin, callback){
      callback(null, true);
  }
}
app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//router require
const indexRouter = require('./routes/index');
const test = require('./routes/test');

//router setup
app.use('/', indexRouter);
app.use('/api/test/', test);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
