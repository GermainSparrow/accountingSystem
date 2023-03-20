'use strict';

const Service = require('egg').Service;

class Test extends Service {
    async search() {
        try { } catch (err) {
            console.log('err------------->', err);
        }
    }
    async getVisual(){
        try { } catch (err) {
            console.log('err------------->', err);
        }
    }
}
module.exports = Test;
