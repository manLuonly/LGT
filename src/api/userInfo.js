import request from '@/utils/axios'



/**
 用户信息
*/
export function userInfo(params) {
    return request({
        url: '/zngl/userInfo',
        method: 'post',
        data: params
    })
}