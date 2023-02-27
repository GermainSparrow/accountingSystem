var express = require('express');
var router = express.Router();
const db = require("../src/db");

router.get('/', function(req, res,next) {
    let sql = "SELECT * FROM oil_sale";
    db.query(sql, function(err,result){
        if(err) {
            console.log(err);
            res.send({
                code: 500,
                msg: "服务器错误"
            })
            throw err;
        }
        res.send({
            code: 200,
            data: result
        })  
    })
})
module.exports = router