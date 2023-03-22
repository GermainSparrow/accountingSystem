'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = '<h1>welcome  xiaoLai</h1>';
  }
}

module.exports = HomeController;
