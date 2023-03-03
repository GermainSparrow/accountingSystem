const express = require('express') //引入express 模块
const app = express()
const db = require('./src/db')
const cors = require('cors'); //引入跨域 
app.use(cors()); //使用跨域
app.use(express.json());  
const user = require('./routes/users')
const financial = require('./routes/financial')
const oil_sale = require('./routes/oil')
const waveBox = require('./routes/waveBox')
const crud = require('./routes/crud')

// 定义路由(说白了就是网址)     
app.get('/demo', (req, res) => {
  let sqlStr = "SELECT * FROM reserves"
  //执行mysql 语句
  conn.query(sqlStr, (err, result) => {
    console.log(err, '如果为null,sql语句执行成功');
    console.log(result);
    res.send(result)
  })
  //成功后的页面显示
})

app.use('/user', user)
app.use('/financial', financial)
app.use('/oil', oil_sale)
app.use('/waveBox', waveBox)
app.use('/crud', crud)
// 开启服务器
app.listen(3001, () => {
  console.log('服务器在3001端口开启。。。。。');
})
