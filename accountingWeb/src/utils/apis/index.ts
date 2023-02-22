import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:3000';
export default {
    post(url: string, data: {}) {
        return axios({
            url: url,
            method: 'POST',
            data: data
        })
    },
    get(url: string, params: {}) {
        return axios({
            url: url,
            method: 'GET',
            params: params
        })
    }
}