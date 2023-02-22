const express = require('express') //引入express 模块
const app = express()
const cors = require('cors'); //引入跨域 
app.use(cors()); //使用跨域
const mysql = require('mysql')     //引入mysql 模块
// 创建数据库连接 填入数据库信息 

//填自己数据库的信息!!!!!!!!!!!
const conn = mysql.createConnection({
  user: 'root',          //用户名
  password: '200113',	//密码
  host: 'localhost',		//主机（默认都是local host）
  database: 'xiaolai'       //数据库名
})

// 测试连接
conn.connect(err => {
  console.log(err == null ? '服务器连接成功' : '服务器连接失败,err---->' + err);
})

// 定义路由(说白了就是网址)     
app.get('/demo', (req, res) => {
  let sqlStr = "SELECT * FROM reserves"
  //执行mysql 语句
  conn.query(sqlStr, (err, result) => {
    console.log(err, '如果为null，sql语句执行成功');
    console.log(result);
    res.send(result)
  })
  
  //成功后的页面显示

})


// 开启服务器
app.listen(3000, () => {
  console.log('服务器在3000端口开启。。。。。');
})
