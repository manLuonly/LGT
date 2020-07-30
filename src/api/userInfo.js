import request from '@/utils/axios';

/**
 * 
 * @param {*} params 
 * pageNum 页号
 * pageSize 每页大小
 * source 来源(pc/mini)
 * search_name 搜索条件(姓名/电话)
 * start_time 开始时间(yyyy-MM-dd HH:mm:ss)
 * end_time 结束时间(yyyy-MM-dd HH:mm:ss)
 */
export function listPage(params) {
    return request({
        url: 'reservations/listPage',
        method: 'get',
        params
    })
}


/**
 *
 * 删除数据
 * @export
 * @param {*} id
 * id id
 * @returns
 */
export function deleteReservations(id) {
    return request({
        url: `reservations/delete?id=${id}`,
        method: 'delete'
    })
}



/**
 *
 * 恢复数据
 * @export
 * @param {*} id
 * id id
 * @returns
 */
export function restore(id) {
    return request({
        url: `reservations/restore?id=${id}`,
        method: 'post'
    })
}