import request from './index'
export default {
    getUserInfo(){
        request.get('/demo',{})
    }
}