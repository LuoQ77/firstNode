var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require("express-session"); 

const urlModule = require("url");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var positionsRouter = require('./routes/positions')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: "asdasdsdasdasdasd",
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 30 * 60 * 1000}
}));


app.use(function(req,res,next){
  const {url} = req;
  const URL = urlModule.parse(url);

  const pathname = URL.pathname;
  if(pathname.indexOf("position") != -1){
    const user = req.session.loginUser;

    if(!user){
      res.redirect("/");
      return ;
    }
  }

  next();
})
//指明静态资源位于public目录下
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use("/api/positions",positionsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
