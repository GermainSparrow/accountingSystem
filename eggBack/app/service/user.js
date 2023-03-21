'use strict';

const Service = require('egg').Service;

class Test extends Service {
    async login(obj) {
        try {
            const result = await this.app.mysql.select('user', { where: { name: obj.userName, password: obj.password } })
            return result.length > 0 ? result[0] : false;
        } catch (err) {
            console.log('err---------------->', err);
            return false;
        }
    }
}
module.exports = Test;
