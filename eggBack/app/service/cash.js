'use strict';

const Service = require('egg').Service;

class Test extends Service {
    async add() {
        try { } catch (err) {
            console.log('err------------->', err);
        }
    }
    async delete() {
        try { } catch (err) {
            console.log('err------------->', err);
        }
    }
    async update() {
        try { } catch (err) {
            console.log('err------------->', err);
        }
    }
    async get() {
        try {
            const app = this.app;
            const res = await app.mysql.select('reserves')
            return res
        } catch (err) {
            console.log('err------------->', err);
        }
    }
}
module.exports = Test;
