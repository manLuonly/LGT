import request from '@/utils/axios'
const url = "192.168.0.106:8080";


export function login(params) {
    return request({
        url: '/zngl/login',
        method: 'post',
        data: params
    })
}


export function logout() {
    return request({
        url: '/zngl/signout',
        method: 'post'
    })
}


export function getUserInfo(params) {
    return request({
        url: '/user/info/get',
        method: 'get',
        data: params
    })
}

export function getUserList(reqData) {
    return request({
        url: '/user/list/get',
        method: 'get',
        data: reqData
    })
}