let { expressjwt } = require("express-jwt");

const config = expressjwt({
  secret: "xiaoLai",
  algorithms: ["HS256"],
  credentialsRequired: true,
}).unless({
  path: ["/user/login"],
});

module.exports = config;
