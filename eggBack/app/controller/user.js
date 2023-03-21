'use strict';

const { Controller } = require('egg');

class userControl extends Controller {
    async login() {
        const data = await this.service.user.login(this.ctx.request.body)
        data ? this.ctx.body = { 'code': 200, data } : this.ctx.body = { 'code': 500, data }
    }
}

module.exports = userControl;