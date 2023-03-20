'use strict';

const Service = require('egg').Service;

class Test extends Service {
    async getReservesList() {
        try {
            const app = this.app;
            const res = await app.mysql.select('reserves')
            return res
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = Test;
