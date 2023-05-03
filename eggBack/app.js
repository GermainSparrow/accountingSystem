const egg = require('egg');
const os = require('os');

egg.startCluster({
  baseDir: __dirname,
  workers: os.cpus().length,
  port: process.env.PORT || 7001,
});
