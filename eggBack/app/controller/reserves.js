'use strict';

const { Controller } = require('egg');

class db extends Controller {
    async add() {
        const { ctx } = this;
        const result = await this.service.reserves.add(ctx.request.body);
        result ? ctx.body = ({ code: '200', data: result }) : { code: '500', msg: '添加数据失败' }
    }
    async delete() {
        const { ctx } = this;
        const result = await this.service.reserves.delete(ctx.request.body)
        result ? ctx.body = ({ code: '200', data: result }) : { code: '500', msg: '删除数据失败' }
    }
    async update() {
        const { ctx } = this;
        const result = await this.service.reserves.update(ctx.request.body)
        result ? ctx.body = ({ code: '200', data: result }) : { code: '500', msg: '更新数据失败' }
    }
    async get() {
        const { ctx } = this;
        const result = await this.service.reserves.get();
        result ? ctx.body = ({ code: '200', data: result }) : { code: '500', msg: '查询数据失败' }
    }
    async getVisual() {
        const { ctx } = this;
        const data = await this.service.reserves.getVisual();
        data?ctx.body = {code:'200',data}:{code:'500',msg:'获取可视化数据失效'};
    }
}

module.exports = db;
