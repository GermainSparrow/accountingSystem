const jwt = require('jsonwebtoken');

module.exports = () => {
  return async function token(ctx, next) {
    if(ctx.path == '/user/login'){
      await next();
      return;
    };
    const authorization = ctx.get('Authorization');
    if (!authorization) {
      ctx.status = 401;
      ctx.body = { message: 'Authorization header is missing' };
      return;
    }
    const token = authorization.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, ctx.app.config.jwt.secret);
      ctx.state.user = decoded;
      await next();
    } catch (err) {
      ctx.status = 401;
      ctx.body = { message: 'Token is invalid' };
    }

  };
};