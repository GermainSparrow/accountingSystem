/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  //跨域
  config.cors = {
    origin: '*', // 允许所有的源进行请求
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }
  //配置helper
  config.helper = {
    // 指定需要加载的 helper 文件路径
    path: 'app/extend/helper',
  },
    // CSRF 
    config.security = {
      csrf: {
        enable: true,
      },
    };
  //配置jwt
  config.jwt = {
    secret: 'xiaolai'
  }
  //配置mysql
  config.mysql = {
    app: true,
    agent: false,
    client: {
      // 数据库类型，支持 mysql、sqlite、postgres、mssql
      type: 'mysql',
      // 数据库连接地址
      host: 'localhost',
      // 数据库连接端口
      port: '3306',
      // 数据库用户名
      user: 'root',
      // 数据库密码
      password: '200113Sam_lai',
      // 数据库名称
      database: 'xiaolai',
    }
  }
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_200113';

  // add your middleware config here
  config.middleware = ['token'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
