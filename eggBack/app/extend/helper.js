//token校验函数
module.exports = {
    getToken(id, time, secret) {
        return this.app.jwt.sign({ id: id }, secret, { expiresIn: time });
    }
}



