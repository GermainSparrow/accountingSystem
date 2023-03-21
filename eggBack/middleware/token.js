export default function getToken(value) {
    return this.app.jwt.sign(value, this.app.config.jwt.secret);
}