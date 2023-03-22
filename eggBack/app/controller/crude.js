'use strict';

const { Controller } = require('egg');

class crude extends Controller {
    async search() {
        const { ctx } = this
        const data = await this.service.crude.search(ctx.request.body);
        data ? ctx.body = { code: 200, data, msg: '查询数据成功' } : ctx.body = { code: 500, msg: '查询数据失败' }
    }
}

module.exports = crude;
