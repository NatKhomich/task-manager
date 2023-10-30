import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '0de32dd8-38bf-442a-adf6-1e6453e370bb'
    }
})










