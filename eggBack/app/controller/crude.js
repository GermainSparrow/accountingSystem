'use strict';

const { Controller } = require('egg');

class crude extends Controller {
    async search() {
        const { ctx } = this
        const data = await this.service.crude.search(ctx.body);
        ctx.body = {
            code: '200',
            data
        }
    }
    async getVisual() {
        const { ctx } = this
        const data = await this.service.crude.getVisual(ctx.body);
        ctx.body = {
            code: '200',
            data
        }
    }
}

module.exports = crude;
