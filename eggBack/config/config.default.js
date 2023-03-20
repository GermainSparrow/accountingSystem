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

  // CSRF //允许跨域请求
  config.security = {
    csrf: {
      enable: false,
    },
  };
  //配置mysql
  config.mysql = {
    app: true,
    agent: false,
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '200113',
      database: 'xiaolai'
    }
  }
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_200113';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
