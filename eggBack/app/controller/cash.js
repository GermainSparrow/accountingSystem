'use strict';

const { Controller } = require('egg');

class db extends Controller {
    async add() {
        const { ctx } = this;
    }
    async delete() {
        const { ctx } = this;
    }
    async update() {
        const { ctx } = this;
    }
    async get() {
        const { ctx } = this;
        ctx.body = await this.service.reserves.getReservesList();
    }
    async getVisual(){
        const { ctx } = this;
    }
}

module.exports = db;
