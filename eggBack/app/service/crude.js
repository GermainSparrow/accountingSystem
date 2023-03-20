'use strict';

const Service = require('egg').Service;

class Test extends Service {
    async search(obj) {
        try {
            const tableName = obj.table
            delete obj.table
            const result = await this.app.mysql.select(tableName, { where: obj })
            return result
        } catch (err) {
            console.log('err------------->', err);
            return false;
        }
    }
}
module.exports = Test;
