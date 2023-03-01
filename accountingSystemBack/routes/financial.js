var express = require("express");
var router = express.Router();
const db = require("../src/db");
//获取表
router.get("/getFinancialList", function (req, res, next) {
  let sql = "SELECT * FROM reserves";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({
      code: 200,
      msg: "success",
      data: result.reverse(),
    });
  });
});
//修改表
router.post("/updateFinancialList", function (req, res, next) {
  let sqlHead = "UPDATE reserves SET ";
  let sqlTail = "WHERE `key` = ";
  for (key in req.body) {
    if (key != "key") {
      sqlHead += `\`${key}\` = '${req.body[key]}' ,`;
    }
  }
  //拼装一下sql语句
  sqlHead = sqlHead.substring(0, sqlHead.length - 1);
  sqlHead += sqlTail += req.body["key"];
  db.query(sqlHead, (err, result) => {
    if (err) {
      res.send({
        code: 500,
        msg: "数据库添加失败 服务器暂停",
      });
      throw err;
    }
    res.send({
      code: 200,
      msg: "success",
      data: result,
    });
  });
});
//新增数据
router.post("/addFinancialList", function (req, res, next) {
  let sqlHead = "INSERT INTO reserves ( ";
  let sqlTail = "VALUES ( ";
  for (key in req.body) {
    if (key != "key") {
      sqlHead += `\`${key}\` ,`;
      sqlTail += `'${req.body[key]}' ,`;
    }
  }
  //拼装一下sql语句
  sqlHead = sqlHead.substring(0, sqlHead.length - 1);
  sqlHead +=')'
  sqlTail = sqlTail.substring(0, sqlTail.length - 1);
  sqlTail+=')'
  
  db.query(sqlHead+sqlTail, (err, result) => {
    if (err) {
      res.send({
        code: 500,
        msg: "数据库添加失败 服务器暂停",
      });
      throw err;
    }
    res.send({
      code: 200,
      msg: "success",
      data: result,
    });
  });
});
module.exports = router;
