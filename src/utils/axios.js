import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'



// 创建axios实例
let service = axios.create({
        baseURL: process.env.BASE_API, // api的base_url
        timeout: 20000 // 请求超时时间
    })
    // request拦截器
service.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers = {
            'Authorization': "Token " + getToken('Token'), //携带权限参数
        };
    }
    return config
}, error => {
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        if (response.data) {
            const res = response.data;
            if (res.code === 0) { // res.code === 0,正常返回数据
                return response.data
            } else {
                Message({
                    message: res.msg,
                    type: 'error',
                    duration: 5 * 1000
                })
                return Promise.reject('error')
            }
        } else {
            console.log(response, 'response')
        }
    },
    error => {
        Message({
            message: error,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service