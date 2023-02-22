var express = require('express');
var router = express.Router();
const db = require('../src/db')
/* GET users listing. */
router.get('/a', function (req, res, next) {
  res.send('get user message')
});
//登录接口 
router.post('/login', function (req, resp, next) {
  console.log(req.body);
})
module.exports = router;
