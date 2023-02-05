// require('./src/index.js')
// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// // module.exports = app;
// app.listen(3000, function () {
//   console.log('服务器启动成功!端口号为3000!');
// });
const express = require('express') //引入express 模块
const app = express()              //创建实例
const mysql = require('mysql')     //引入mysql 模块
// 创建数据库连接 填入数据库信息 
//填自己数据库的信息!!!!!!!!!!!
const conn = mysql.createConnection({
  user: 'root',          //用户名
  password: '200113',	//密码
  host: 'localhost',		//主机（默认都是local host）
  database: 'test'       //数据库名
})
// 测试连接
conn.connect(err => {
  console.log(err, '如果为null 就是连接成功');
})
// 定义路由(说白了就是网址)     
app.get('/a', (req, res) => {
  let sqlStr = "INSERT INTO student ( s_no, s_name )VALUES(20150015,'大帅比')"
  //执行mysql 语句
  conn.query(sqlStr, (err) => {
    console.log(err, '如果为null，sql语句执行成功')
  })
  //成功后的页面显示
  res.send('插入成功')
})

// 开启服务器
app.listen(3000, () => {
  console.log('服务器在3000端口开启。。。。。');
})
