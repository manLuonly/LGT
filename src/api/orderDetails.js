import request from '@/utils/axios';

/**
 * 分页查询
 * @export
 * @param {*} params
 * pageNum 页号
 * pageSize 每页大小
 * search_name 搜索条件(姓名/电话)
 * state 订单状态(0已完成/1进行中/2已取消)
 * vip vip(0否/1是)
 * start_time 开始时间(yyyy-MM-dd HH:mm:ss)
 * end_time 结束时间(yyyy-MM-dd HH:mm:ss)
 * @returns
 */
export function listPage(params) {
    return request({
        url: 'orderLists/listPage',
        method: 'get',
        params
    })
}



/**
 *
 * 新增订单
 * @export
 * @param {*} data
 * id id
 * leave_message 留言
 * name 名字
 * price 价格
 * service_type 服务类型
 * state 状态(0已完成/1进行中/2已取消)
 * tel 手机号码
 * update_time 更新时间
 * vip (0否/1是)
 * wx_number 微信号
 * @returns
 */
export function add(data) {
    return request({
        url: 'orderLists/add',
        method: 'post',
        data
    })
}


/**
 *
 * 删除订单
 * @export
 * @param {*} id
 * id id
 * @returns
 */
export function deleteOrder(id) {
    return request({
        url: `orderLists/delete?id=${id}`,
        method: 'delete'
    })
}




/**
 *
 * 修改订单
 * @export
 * @param {*} data
 * id id
 * leave_message 留言
 * name 名字
 * price 价格
 * service_type 服务类型
 * state 状态(0已完成/1进行中/2已取消)
 * tel 手机号码
 * update_time 更新时间
 * vip (0否/1是)
 * wx_number 微信号
 * @returns
 */
export function edit(data) {
    return request({
        url: 'orderLists/edit',
        method: 'put',
        data
    })
}


/**
 *
 * 获取全部客户
 * @export
 * @param {*} search_name
 * @returns
 */
export function userListAll(search_name) {
    return request({
        url: `/clientLists/listAll?search_name=${search_name}`,
        method: 'get'
    })
}