'use strict';

const Service = require('egg').Service;

class Test extends Service {
  async search(obj) {
    const tableName = obj.table;
    try {
      delete obj.table;
      const keyArr = await this.app.mysql.query(`SELECT COLUMN_NAME FROM information_schema.columns WHERE table_name = '${tableName}'`);
      const keyArry = keyArr.map(item => item.COLUMN_NAME);
      const searchData = {};
      keyArry.map(items => { searchData[items] = '%' + obj.keyword + '%'; return null; });
      let queryString = `SELECT * FROM \`${tableName}\` WHERE `;

      Object.keys(searchData).map(key => { queryString += `\`${key}\` LIKE "${searchData[key]}" OR `; return null; });
      queryString = queryString.slice(0, -3);
      const result = await this.app.mysql.query(queryString);
      return result.reverse();
    } catch (err) {
      console.log('err------------->', err);
      return false;
    }
  }
}
module.exports = Test;
