'use strict';

const Service = require('egg').Service;

class Test extends Service {
    async add(obj) {
        try {
            const result = await this.app.mysql.insert('reserves', obj);
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
                const result = await this.app.mysql.delete('reserves', obj);
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
            const result = await this.app.mysql.update('reserves', obj, { where: { key: key } });
            return result
        } catch (err) {
            console.log('err------------->', err);
            return false
        }
    }
    async get() {
        try {
            const result = await this.app.mysql.select('reserves')
            return result
        } catch (err) {
            console.log('err------------->', err);
            return false
        }
    }
    async getBy(obj) {
        try {
            const result = await this.app.mysql.select('reserves', { where: obj })
            return result
        } catch (err) {
            console.log('err------------->', err);
            return false
        }
    }
    async getVisual() {
        try {
            const result = await this.app.mysql.select('reserves');
            const temp = result.map((item, index) => {
                if (item.in) {
                    return {
                        name: item.payee,
                        month: item.month,
                        count: Number(item.in),
                    };
                } else {
                    return {
                        name: item.reimbursers,
                        month: item.month,
                        count: 0 - Number(item.out),
                    };
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
