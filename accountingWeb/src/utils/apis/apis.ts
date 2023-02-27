import Login from '../../pages/login'
import request from './index'
export default {
    getUserInfo() {
        request.get('/demo', {})
    },
    Login(obj: { userName: string, password: string }): any {
        return request.post('/user/login', obj)
    },
    getFinancialList(){
        return request.get('/financial/getFinancialList',{})
    },
    updateFinancialList(obj:{}){
        return request.post('/financial/updateFinancialList',obj)
    },
    getOliList(){
        return request.get('/oil/',{})
    }
}