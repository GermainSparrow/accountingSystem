'use strict';

const Service = require('egg').Service;

class Test extends Service {
    async add(obj) {
        try {
            const result = await this.app.mysql.insert('wavebox', obj);
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
                const result = await this.app.mysql.delete('wavebox', obj);
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
            const result = await this.app.mysql.update('wavebox', obj, { where: { key: key } });
            return result
        } catch (err) {
            console.log('err------------->', err);
            return false
        }
    }
    async get() {
        try {
            const result = await this.app.mysql.select('wavebox')
            return result.reverse()
        } catch (err) {
            console.log('err------------->', err);
            return false
        }
    }
    async getVisual() {
        try {
            const result = await this.app.mysql.select('wavebox');
            const temp = result.map((item) => {
                return {
                    name: item.Head,
                    month: item.getMoneyMonth,
                    count: item.cost,
                };
            });
            return temp
        } catch (err) {
            console.log('err------------->', err);
            return false
        }
    }
}
module.exports = Test;
