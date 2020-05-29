import request from '@/utils/axios'



/**
 案例分类
*/
export function getCaseType(params) {
    return request({
        url: '/zngl/caseType',
        method: 'post',
        data: params
    })
}