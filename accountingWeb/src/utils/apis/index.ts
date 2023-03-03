import axios, { AxiosPromise } from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:3001';
//设置请求拦截器
axios.interceptors.request.use((res) => {
    let token = localStorage.getItem('token');
    res.headers['Authorization'] = 'Bearer ' + token;
    return res;
})
export default {
    post(url: string, data: {}) {

        console.log('data', data);

        return axios({
            url: url,
            method: 'POST',
            data: data
        })
    },
    get(url: string, params) {
        return axios({
            url: url,
            method: 'GET',
            params: params
        })
    }
}