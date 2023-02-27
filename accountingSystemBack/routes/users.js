var express = require("express");
var router = express.Router();
const db = require("../src/db");
/* GET users listing. */
router.get("/a", function (req, res, next) {
  res.send("get user message");
});
//登录接口
router.post("/login", async function (req, resp, next) {
  let selectCode = `select * from user where name ='${req.body.userName}' and password ='${req.body.password}' `;
  await db.query(selectCode, function (err, result) {
    console.log(req.body, "result", result, "err",err);
    if (!err) {
      //如果查询到的数据不为空
      if (result.length > 0) {
        resp.send({
          code: 200,
          msg: "登录成功",
          data: result,
        });
      }
      //如果查询到的数据为空
      else {
        resp.send({
          code: 400,
          msg: "用户名或密码错误",
        });
      }
    }
  });
});
module.exports = router;