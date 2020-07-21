import request from '@/utils/axios'

/**
 *
 *
 * @export
 * @param {*} params
 * pageNum 页号
 * pageSize 每页大小
 * system_type 系统的类型(pc/mini)
 * @returns
 */
export function listPage(params) {
    return request({
        url: 'caseLists/listPage',
        method: 'get',
        params,
    })
}


/**
 *
 *
 * @export
 * @param {*} data
 * 
 * @returns
 */
export function caseLists(data) {
    return request({
        url: 'caseLists',
        method: 'post',
        data,
    })
}