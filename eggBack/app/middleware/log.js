// 引入文件系统模块和路径模块
const fs = require('fs');
const path = require('path');

module.exports = () => {
    return async function logger(ctx, next) {
        if (ctx.path == '/user/login') {
            //记录当前时间
            // const start = new Date().now();
            // //等待请求完毕
            await next()
            // //计算处理请求的时间
            // const costTime = new Date().now() - start;
            //获取输出的登录信息
            const userInfo = JSON.stringify(ctx.request.body);
            //获取校验结果
            const result = JSON.stringify(ctx.body.data);
            //获取尝试登录者的ip
            const  ip  = ctx.ip;
            // 构造日志字符串
            const log = `[${new Date().toLocaleString()}] ip:${ip} 输入信息:${userInfo} 登录结果:${result} 费时: ms\n`;
            // 定义日志文件路径
            const logPath = path.join(__dirname, '..', 'logs', 'access.log');
            // 将日志字符串追加到日志文件中
            fs.appendFileSync(logPath, log, 'utf8');
            console.log(log);
        }else{
            await next();
        }
    }
}