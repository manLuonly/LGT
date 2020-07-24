import request from '@/utils/axios';

/**
 *
 * 分页查询
 * @export
 * @param {*} params
 * pageNum 页号
 * pageSize 每页大小
 * search_name 搜索条件(姓名/电话)
 * vip vip(0否/1是)
 * start_time 开始时间(yyyy-MM-dd HH:mm:ss)
 * end_time 结束时间(yyyy-MM-dd HH:mm:ss)
 * 
 * @returns
 */
export function listPage(params) {
    return request({
        url: 'clientLists/listPage',
        method: 'get',
        params
    })
}

/**
 *
 * 新增客户
 * @export
 * @param {*} data
 * id id
 * name 名字
 * note 备注
 * tel 手机号码
 * update_time 更新时间
 * vip 是否vip(0否 1是)
 * wx_number 微信号
 * @returns
 */
export function add(data) {
    return request({
        url: 'clientLists/add',
        method: 'post',
        data
    })
}

/**
 *
 * 删除客户
 * @export
 * @param {*} id
 * id id
 * @returns
 */
export function deleteUser(id) {
    return request({
        url: `clientLists/delete?id=${id}`,
        method: 'delete',
    })
}


/**
 *
 * 修改客户
 * @export
 * @param {*} data
 * id id
 * name 名字
 * note 备注
 * tel 手机号码
 * update_time 更新时间
 * vip 是否vip(0否 1是)
 * wx_number 微信号
 * @returns
 */
export function edit(data) {
    return request({
        url: 'clientLists/edit',
        method: 'put',
        data
    })
}