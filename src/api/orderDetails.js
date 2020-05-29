import request from '@/utils/axios'



/**
    订单详情
*/
export function userOrderInfo(params) {
    return request({
        url: '/zngl/userOrderInfo',
        method: 'post',
        data: params
    })
}