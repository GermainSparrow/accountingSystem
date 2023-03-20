'use strict';

const { Controller } = require('egg');

class db extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = await this.service.reserves.getReservesList();
    }
}

module.exports = db;
