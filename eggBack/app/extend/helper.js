//token校验函数
module.exports = {
    getToken(value) {
        return this.app.jwt.sign(value, this.app.config.jwt.secret);
    }
}



