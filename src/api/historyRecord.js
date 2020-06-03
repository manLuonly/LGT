import request from '@/utils/axios'

/**
 历史记录
*/
export function historyRecord(params) {
    return request({
        url: '/zngl/historyRecord',
        method: 'post',
        data: params
    })
}