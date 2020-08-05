import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import store from '../store';
import { getToken, removeToken, removeName } from '@/utils/auth';


// 创建axios实例
let service = axios.create({
        baseURL: process.env.BASE_API, // api的base_url
        timeout: 10000 // 请求超时时间
    })
    // request拦截器
service.interceptors.request.use(config => {
    config.headers['token'] = getToken().Token;
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

                if (res.code === -1 || res.code === -2 || res.code === -3 || res.code === -4) {
                    MessageBox.confirm('你已被登出，请重新登录', '确定登出', {
                        showCancelButton: false, // 不显示取消按钮
                        confirmButtonText: '重新登录',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // store.dispatch(['LogOut'])
                        removeToken('Token')
                        removeName('name')
                        location.reload();
                    })
                }
                return Promise.reject(response.data)
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