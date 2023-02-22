import axios from 'axios';

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