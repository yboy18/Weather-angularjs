
/**
 * Module dependencies.
 */

var express = require('express');
var session = require('express-session');
//var routes = require('./routes');
var users = require('./modules/user');
var functions = require('./modules/function');
var http = require('http');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  // 假如你不想使用 redis 而想要使用 memcached 的话，代码改动也不会超过 5 行。
  // 这些 store 都遵循着统一的接口，凡是实现了那些接口的库，都可以作为 session 的 store 使用，比如都需要实现 .get(keyString) 和 .set(keyString, value) 方法。
  // 编写自己的 store 也很简单
  store: new redisStore(),
  secret: 'somesecrettoken'
}));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', users.registration);
app.get('/users', users.list);
app.get('/registration', users.registration);
app.post('/registry', users.registry);
app.get('/login', users.login_temp);
app.post('/loginpost', users.login);
app.get('/weather', functions.weather);

app.get('/test', function(req, res){
  res.render("test");
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  res.render('message', { title: '404' ,result : err.message});
});


// development error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('message', { title: '500' ,result : 'Internal Server Error<br>'+err.message});
  
  });
}

//error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('message', { title: '500' ,result : 'Internal Server Error<br>'+err.message});
});

//error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 501);
  res.render('message', { title: '501' ,result : 'Not Implemented<br>'+err.message});
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
