const express = require("express");
var router = express.Router();
const db = require("../src/db");
router.post("/search", (req, res) => {
  let sqlHead = `SELECT * FROM ${req.body.table} `;
  let count = true;
  for (key in req.body) {
    if (key != "table") {
      if (count) {
        sqlHead += `WHERE \`${key}\` = '${req.body[key]}' `;
        count = false;
      } else {
        sqlHead += `AND \`${key}\` = '${req.body[key]}' `;
      }
    }
  }
  let result = db.query(sqlHead, (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        code: 500,
        msg: "查询失败",
      });
    }
    res.send({
      code: 200,
      msg: "查询成功",
      data: result,
    });
  });
});
module.exports = router;
