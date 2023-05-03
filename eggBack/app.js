const egg = require('egg');
egg.startCluster({
  baseDir: __dirname,
  workers: os.cpus().length,
  port: process.env.PORT || 7001,
});
