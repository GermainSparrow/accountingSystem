var express = require("express");
var router = express.Router();
const db = require("../src/db");
const jsonWebToken = require("jsonwebtoken");
const crypto = require("crypto");
const mysql = require("mysql");
/* GET users listing. */
router.get("/a", function (req, res, next) {
  res.send("get user message");
});

//生成token
const token = jsonWebToken.sign({ msg: "已经成功加密" }, "xiaoLai", {
  expiresIn: 60 * 60 * 24,
});
//登录接口
router.post("/login", async function (req, res, next) {
  console.log("name为 " + req.body.userName + " 正在尝试登录",'password'+ crypto.createHash("md5").update(req.body.password, "utf8").digest("hex"));
  const params = [
    req.body.userName,
    crypto.createHash("md5").update(req.body.password, "utf8").digest("hex"),
  ];
  let selectCode = `select * from user where name = ? and password = ? `;
  selectCode = mysql.format(selectCode, params);

  console.log(selectCode);

  db.query(selectCode, function (err, result) {
    if (!err) {
      //如果查询到的数据不为空
      if (result.length > 0) {
        res.send({
          code: 200,
          msg: "登录成功",
          data: {
            token,
            userName: result[0].userName,
            auth: result[0].auth,
          },
        });
      }
      //如果查询到的数据为空
      else {
        res.send({
          code: 400,
          msg: "用户名或密码错误",
        });
      }
    }
  });
});
module.exports = router;
