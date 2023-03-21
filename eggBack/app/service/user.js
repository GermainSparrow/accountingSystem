'use strict';

const Service = require('egg').Service;
//md5 
const crypto = require('crypto');

class Test extends Service {
    async login(obj) {
        try {
            const password = crypto.createHash("md5").update(obj.password, "utf8").digest("hex");
            console.log('password: ' + password);
            const result = await this.app.mysql.select('user', { where: { name: obj.userName, password } })
            return result.length > 0 ? result[0] : false;
        } catch (err) {
            console.log('err---------------->', err);
            return false;
        }
    }
}
module.exports = Test;
