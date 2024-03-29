const express = require("express");
const router = express.Router();
const db = require("../src/db");

//封装一下查询方法
const selectCash = async () => {
  let cashArr = [];
  let oilArr = [];
  let waveBoxArr = [];
  let reservesArr = [];
  let cashSql = `SELECT * FROM cash`;
  let oilSql = `SELECT * FROM oil_sale`;
  let waveBoxSql = `SELECT * FROM wavebox`;
  let reservesSql = `SELECT * FROM reserves`;
  //所有取数据同时进行
  await Promise.all([
    //拿到所有cash数组
    new Promise((resolve, reject) => {
      db.query(cashSql, (err, result) => {
        cashArr = result;
        resolve();
      });
    }),
    //取到所有的oil数组

    new Promise((resolve, reject) => {
      db.query(oilSql, (err, result) => {
        oilArr = result;
        resolve();
      });
    }),
    //拿到所有的waveBox数组

    new Promise((resolve, reject) => {
      db.query(waveBoxSql, (err, result) => {
        waveBoxArr = result;
        resolve();
      });
    }),
    //拿到所有的reserves数组

    new Promise((resolve, reject) => {
      db.query(reservesSql, (err, result) => {
        reservesArr = result;
        resolve();
      });
    }),
  ]);
  //处理表
  cashArr = cashArr.map((items, index) => {
    let oilCount = 0;
    let waveBoxCount = 0;
    let reservesOut = 0;
    let currentBalance = 0;
    let cumulativeBalances = 0;
    switch (items.head) {
      case "邹小龙": {
        oilArr.forEach((oil) => {
          if (items.month == oil.getMonth && oil.head == items.head) {
            oilCount += Number(oil.real_sales);
          }
        });
        waveBoxArr.forEach((waveBox) => {
          if (items.month == waveBox.getMonth && waveBox.head != "邹小龙") {
            waveBoxCount += Number(waveBox.cost);
          }
        });
        reservesArr.forEach((reserves) => {
          if (
            items.month == reserves.month &&
            reserves.reimbursers == "邹小龙"
          ) {
            reservesOut += Number(reserves.out);
          }
        });
        currentBalance =
          oilCount +
          waveBoxCount -
          reservesOut +
          items.extraIncome +
          items.otherIncome -
          items.bankOut;
        break;
      }
      case "蔡强": {
        oilArr.forEach((oil) => {
          if (items.month == oil.getMonth && oil.head == items.head) {
            oilCount += Number(oil.real_sales);
          }
        });
        waveBoxArr.forEach((waveBox) => {
          if (items.month == waveBox.getMoneyMonth && waveBox.payee == "蔡强") {
            waveBoxCount += Number(waveBox.Collection);
          }
        });
        reservesArr.forEach((reserves) => {
          if (items.month == reserves.month && reserves.reimbursers == "蔡强") {
            reservesOut += Number(reserves.out);
          }
        });
        break;
      }
      case "公司账户": {
        oilArr.forEach((oil) => {
          if (items.month == oil.getMonth) {
            oilCount += Number(oil.real_sales);
          }
        });
        waveBoxArr.forEach((waveBox) => {
          if (items.month == waveBox.getMoneyMonth) {
            waveBoxCount += Number(waveBox.cost);
          }
        });
        break;
      }
    }
    currentBalance =
      oilCount +
      waveBoxCount -
      reservesOut +
      items.extraIncome +
      items.otherIncome -
      items.bankOut;
    let temp = {
      ...items,
      oilCount,
      waveBoxCount,
      reservesOut,
      currentBalance,
      cumulativeBalances,
    };
    return temp;
  });
  cashArr[0].cumulativeBalances = 4012 + cashArr[0].currentBalance;
  cashArr[1].cumulativeBalances = 0;
  cashArr[2].cumulativeBalances = 8577.94 + cashArr[2].currentBalance;

  cashArr = cashArr.map((items, index) => {
    if (index >= 3) {
      items.cumulativeBalances =
        items.currentBalance + cashArr[index - 3].cumulativeBalances;
      return items;
    } else {
      return items;
    }
  });
  return cashArr;
};

//获取表数据
router.get("/", async (req, res) => {
  const cashArr = await selectCash();
  res.send(cashArr);
});

//修改表数据
router.post("/update", async (req, res) => {
  let sql = "UPDATE cash SET ";

  for (key in req.body) {
    if (key != "key") {
      sql += `\`${key}\` = ${req.body[key]} ,`;
    }
  }
  sql = sql.substring(0, sql.length - 1);
  sql += `WHERE \`key\` = ${req.body["key"]}`;
  // 执行查询 
  db.query(sql, async (err, result) => {  
    if (err) {
      res.send(err);
    }
    // 此时数据库应该是已经被修改
    const cashArr = await selectCash();
    res.send({
      code: "200",
      data: cashArr,
    });
  });
});

module.exports = router;
