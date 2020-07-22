import request from '@/utils/axios'

/**
 *  分页查询
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
 * 新增小程序案例
 * @export
 * @param {*} data
 * details_imgs 详情图数组
 * details_total 详情图数据条数
 * enable 是否开启 
 * img 封面图
 * name 案例名称
 * type 类型
 * @returns
 */
export function addH5TypeList(data) {
    return request({
        url: 'caseLists/addH5TypeList',
        method: 'post',
        data,
    })
}


/**
 * 新增pc案例
 * @export
 * @param {*} data
 * details_imgs 详情图数组
 * details_total 详情图数据条数
 * enable 是否开启 
 * img 封面图
 * name 案例名称
 * type 类型
 * @returns
 */
export function addTypeList(data) {
    return request({
        url: 'caseLists/addTypeList',
        method: 'post',
        data,
    })
}


/**
 *  通过ID删除单个小程序案例
 * @param {*} id 
 * id id
 */
export function deleteH5TypeList(id) {
    return request({
        url: `caseLists/deleteH5TypeList?id=${id}`,
        method: 'delete'
    })
}



/**
 *  通过ID删除单个pc案例
 * @param {*} id 
 * id id
 */
export function deleteTypeList(id) {
    return request({
        url: `caseLists/deleteTypeList?id=${id}`,
        method: 'delete'
    })
}


/**
 * 编辑小程序案例
 * @export
 * @param {*} data
 * details_imgs 详情图数组
 * details_total 详情图数据条数
 * enable 是否开启 
 * img 封面图
 * name 案例名称
 * type 类型
 * @returns
 */
export function editH5TypeList(data) {
    return request({
        url: 'caseLists/editH5TypeList',
        method: 'put',
        data,
    })
}



/**
 * 编辑pc案例
 * @export
 * @param {*} data
 * details_imgs 详情图数组
 * details_total 详情图数据条数
 * enable 是否开启 
 * img 封面图
 * name 案例名称
 * type 类型
 * @returns
 */
export function editTypeList(data) {
    return request({
        url: 'caseLists/editTypeList',
        method: 'put',
        data,
    })
}