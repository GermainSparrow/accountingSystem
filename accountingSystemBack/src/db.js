const mysql = require('mysql')     //引入mysql 模块
// 创建数据库连接 填入数据库信息 

//远程数据库
const db = mysql.createConnection({
    user: 'root',          //用户名
    password: '200113Sam_lai',	//密码
    host: '1.14.74.199',		//主机（默认都是local host）
    database: 'xialai'       //数据库名
})
//本地数据库
// const db = mysql.createConnection({
//     user: 'root',          //用户名
//     password: '200113Sam_lai',	//密码
//     host: '127.0.0.1',		//主机（默认都是local host）
//     database: 'xiaolai'       //数据库名
// })
// 测试连接
db.connect(err => {
    console.log(err == null ? '服务器连接成功' : '服务器连接失败,err---->' + err);
})
module.exports = db