var express = require('express');
var router = express.Router();
const db = require("../src/db");

router.get('/getWaveBoxList',function(req,res,next){
    let sql = "SELECT * FROM wavebox";
    db.query(sql,function(err,result){
        if(err) {
            res.send({
                code: 500,
                msg: '服务器错误 已经暂停服务'
            })
            throw err;
        }
        res.send(result.reverse());
    });
})
//修改表
router.post('/updateWaveBox', function(req, res, next) {
    let sqlHead = "UPDATE wavebox SET ";
    let sqlTail = "WHERE `key` = ";
    console.log(req.body);

    for(key in req.body){
        if(key!="key") {sqlHead += `\`${key}\` = '${req.body[key]}' ,`;}
    }
    //拼装一下sql语句
    sqlHead = sqlHead.substring(0,sqlHead.length-1);
    sqlHead += sqlTail+=req.body['key'];
    console.log(sqlHead);
    db.query(sqlHead,(err,result)=>{
        if (err) {
            res.send({
                code: 500,
                msg: "数据库添加失败 服务器暂停"
            })
            throw err;
        };
        res.send({
            code: 200,
            msg: "success",
            data: result
        })
    })
});
//新增数据
router.post("/addWaveBox", function (req, res, next) {
    let sqlHead = "INSERT INTO wavebox ( ";
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
  //删除表
router.post("/delete", function (req, res, next) {
  let sqlHead = `DELETE FROM wavebox WHERE \`key\` =${req.body.key}`;
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
module.exports = router;
