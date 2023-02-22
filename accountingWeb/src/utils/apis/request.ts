import Login from '../../pages/login'
import request from './index'
export default {
    getUserInfo() {
        request.get('/demo', {})
    },
    Login() {
        request.post('/demo', {
            account: Number,
            password: Number,
        })
    }
}