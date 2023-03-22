'use strict';

const Service = require('egg').Service;
const cashSearch = async (app) => {
    let cashArr = [];
    let oilArr = [];
    let waveBoxArr = [];
    let reservesArr = [];
    await Promise.all([
        new Promise(async resolve => {
            cashArr = await app.mysql.select('cash');
            resolve();
        }),
        new Promise(async resolve => {
            oilArr = await app.mysql.select('oil_sale');
            resolve();
        }),
        new Promise(async resolve => {
            waveBoxArr = await app.mysql.select('wavebox');
            resolve();
        }),
        new Promise(async resolve => {
            reservesArr = await app.mysql.select('reserves');
            resolve();
        })]);
    //处理表
    console.log('cashArr------------>', cashArr);
    cashArr = cashArr.map(items => {
        let oilCount = 0;
        let waveBoxCount = 0;
        let reservesOut = 0;
        let currentBalance = 0;
        const cumulativeBalances = 0;
        // eslint-disable-next-line default-case
        switch (items.head) {
            case '邹小龙': {
                oilArr.forEach((oil) => {
                    if (items.month == oil.getMonth && oil.head == items.head) {
                        oilCount += Number(oil.real_sales);
                    }
                });
                waveBoxArr.forEach((waveBox) => {
                    if (items.month == waveBox.getMonth && waveBox.head != '邹小龙') {
                        waveBoxCount += Number(waveBox.cost);
                    }
                });
                reservesArr.forEach((reserves) => {
                    if (
                        items.month == reserves.month &&
                        reserves.reimbursers == '邹小龙'
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
            case '蔡强': {
                oilArr.forEach((oil) => {
                    if (items.month == oil.getMonth && oil.head == items.head) {
                        oilCount += Number(oil.real_sales);
                    }
                });
                waveBoxArr.forEach((waveBox) => {
                    if (items.month == waveBox.getMoneyMonth && waveBox.payee == '蔡强') {
                        waveBoxCount += Number(waveBox.Collection);
                    }
                });
                reservesArr.forEach((reserves) => {
                    if (items.month == reserves.month && reserves.reimbursers == '蔡强') {
                        reservesOut += Number(reserves.out);
                    }
                });
                break;
            }
            case '公司账户': {
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
        const temp = {
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
}

class Test extends Service {
    async update(obj) {
        try {
            await this.app.mysql.update('cash', obj, { where: { key: obj.key } });
            const cashArr = await cashSearch(this.app);
            return cashArr;
        } catch (err) {
            console.log('err------------->', err);
            return false
        }
    }
    async get() {
        try {
            const cashArr = await cashSearch(this.app)
            return cashArr
        } catch (err) {
            console.log('err------------->', err);
            return false;
        }
    }
}
module.exports = Test;
