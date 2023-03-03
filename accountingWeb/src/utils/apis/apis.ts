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
    getFinancialList() {
        return request.get('/financial/getFinancialList', {})
    },
    updateFinancialList(obj: {}) {
        return request.post('/financial/updateFinancialList', obj)
    },
    addFinancialList(obj: {}): any {
        return request.post('/financial/addFinancialList', obj)
    },
    deleteFinancialList(obj: {}): any {
        return request.post('/financial/delete', obj)
    },
    //油品
    getOliList() {
        return request.get('/oil/', {})
    },
    updateOliList(obj: {}) {
        return request.post('/oil/updateOilList', obj)
    },
    addOliList(obj: {}): any {
        return request.post('/oil/addOil', obj)
    },
    deleteOliList(obj: {}): any {
        return request.post('/oil/delete', obj)
    },
    //波箱
    getWavesList() {
        return request.get('/waveBox/getWaveBoxList', {})
    },
    updateWavesList(obj: {}) {
        return request.post('/waveBox/updateWaveBox', obj)
    },
    addWavesList(obj: {}): any {
        return request.post('/waveBox/addWaveBox', obj)
    },
    deleteWavesList(obj: {}): any {
        return request.post('/waveBox/delete', obj)
    },
    //获取所有的可视化数据
    getVisualData(name: string) {
        switch (name) {
            case 'oil':
                return request.get('/oil/getVisualData', {})

            case 'waveBox':
                return request.get('/waveBox/getVisualData', {})

            case 'financial':
                return request.get('/financial/getVisualData', {})

        }
    },
    //crud
    searchData(obj: {table:string,[key:string] : any}) {
        return request.post('/crud/search', obj)
    }
}