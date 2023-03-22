'use strict';

const Service = require('egg').Service;

class Test extends Service {
    async add(obj) {
        try {
            const result = await this.app.mysql.insert('oil_sale', obj);
            return result
        } catch (err) {
            console.log('err------------->', err);
            return false
        }
    }
    async delete(obj) {
        try {
            //判断一下传入key值存在与否 防止空字符串导致清空表
            if (obj.key) {
                const result = await this.app.mysql.delete('oil_sale', obj);
                return result
            } else {
                return false
            }
        } catch (err) {
            console.log('err------------->', err);
            return false
        }
    }
    async update(obj) {
        const { key } = obj;
        delete obj.key
        try {
            const result = await this.app.mysql.update('oil_sale', obj, { where: { key: key } });
            return result
        } catch (err) {
            console.log('err------------->', err);
            return false
        }
    }
    async get() {
        try {
            const result = await this.app.mysql.select('oil_sale')
            return result.reverse();
        } catch (err) {
            console.log('err------------->', err);
            return false
        }
    }
    async getVisual() {
        try {
            const result = await this.app.mysql.select('oil_sale');
            let temp = [];
            result.map((items) => {
                if (items.head && items.getMonth) {
                    temp.push({
                        name: items.head,
                        count: items.collection,
                        month: items.getMonth,
                    });
                }
            });
            return temp
        } catch (err) {
            console.log('err------------->', err);
            return false
        }
    }
}
module.exports = Test;
