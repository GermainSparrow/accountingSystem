import { message } from 'antd';
import axios from 'axios';



axios.defaults.baseURL = 'http://127.0.0.1:7001';
//设置远程服务器的地址
// axios.defaults.baseURL = 'http://1.14.74.199:3001'
//设置请求拦截器
axios.interceptors.request.use((req) => {
    let token = localStorage.getItem('token');
    req.headers['Authorization'] = 'Bearer ' + token;
    return req;
})
//设置响应拦截器
axios.interceptors.response.use((res => {
    return res
}), (error) => {
    const { response } = error;
    if (response.status == 401) {
        message.open({
            content: '登录过期请重新登录',
            type: 'error',
            duration: 3
        })
        window.location.assign('http://1.14.74.199:3001')
        
    }
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