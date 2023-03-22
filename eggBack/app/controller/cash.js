'use strict';

const { Controller } = require('egg');

class db extends Controller {
    async update() {
        const { ctx } = this;
        const data = await this.service.cash.update(ctx.request.body);
        data ? ctx.body = { code: 200, data, msg: 'success' } : { code: 500, msg: '服务器出错' }
    }
    async get() {
        const { ctx } = this;
        const data = await this.service.cash.get();
        data ? ctx.body = { code: 200, data, msg: 'success' } : { code: 500, msg: '服务器出错' }
    }
}

module.exports = db;
