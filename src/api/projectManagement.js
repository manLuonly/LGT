import request from '@/utils/axios'
const url = "192.168.0.106:8080";


export function caseList(params) {
    return request({
        url: '/caselist',
        method: 'get',
        params: params
    })
}