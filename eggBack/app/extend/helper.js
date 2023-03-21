//token校验函数
module.exports = {
    getToken(value) {
        return this.app.jwt.sign({ userId: value, exp: 60 * 60 * 7 }, this.app.config.jwt.secret);
    }
}



