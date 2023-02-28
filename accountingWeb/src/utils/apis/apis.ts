import Login from '../../pages/login'
import request from './index'
export default {
    //登录
    getUserInfo() {
        request.get('/demo', {})
    },
    Login(obj: { userName: string, password: string }): any {
        return request.post('/user/login', obj)
    },
    //备用金
    getFinancialList(){
        return request.get('/financial/getFinancialList',{})
    },
    updateFinancialList(obj:{}){
        return request.post('/financial/updateFinancialList',obj)
    },
    addFinancialList(obj:{}): any {
        return request.post('/financial/addFinancialList',obj)
    },
    //油品
    getOliList(){
        return request.get('/oil/',{})
    },
    updateOliList(obj:{}){
        return request.post('/oil/updateOilList',obj)
    },
    addOliList(obj:{}): any {
        return request.post('/oil/addOil',obj)
    },
    //油气
    //波箱
    getWavesList(){
        return request.get('/waveBox/getWaveBoxList',{})
    },
    updateWavesList(obj:{}){
        return request.post('/waveBox/updateWaveBox',obj)
    },
    addWavesList(obj:{}): any {
        return request.post('/waveBox/addWaveBox',obj)
    },
}