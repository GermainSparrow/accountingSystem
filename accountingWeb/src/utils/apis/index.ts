import axios, { AxiosPromise } from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:3000';
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
            params: JSON.stringify(params)
        })
    }
}