import request from '@/utils/axios'


export function caseList(data) {
    return request({
        url: '/zngl/caseList',
        method: 'post',
        data
    })
}