'use strict';

const { Controller } = require('egg');

class userControl extends Controller {
    async login() {
        const data = await this.service.user.login(this.ctx.request.body)
        delete data.password;
        const token = this.ctx.helper.getToken('xiaolai');
        console.log(token);
        data ? this.ctx.body = { 'code': 200, data, token } : this.ctx.body = { 'code': 500, data, }
    }
}

module.exports = userControl;