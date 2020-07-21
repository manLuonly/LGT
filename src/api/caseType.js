import request from '@/utils/axios'


/**
 *  获取案例分类
 * @param {*} params 
 *  system_type 系统的类型(pc/mini)
 */
export function listAll(params) {
    return request({
        url: 'caseTypes/listAll',
        method: 'get',
        params
    })
}


/**
 *  新增小程序类型
 * @param {*} data 
 * id id
 * type_name 类型名称
 * type 类型
 * update_time 更新时间
 * cover_img 封面图
 * details 描述
 * price 价格 (默认0)
 * icon_img icon图标
 * enable 是否开启 teue = 开   false = 关
 */

export function addH5Type(data) {
    return request({
        url: 'caseTypes/addH5Type',
        method: 'post',
        data
    })
}



/**
 *  新增pc类型
 * @param {*} data 
 * id id
 * type_name 类型名称
 * type 类型
 * enable 是否开启 teue = 开   false = 关
 * update_time 更新时间
 */

export function addType(data) {
    return request({
        url: 'caseTypes/addType',
        method: 'post',
        data
    })
}


/**
 * 通过ID删除单个小程序类型
 * @param {*} id
 * id id 
 */

export function deleteH5Type(id) {
    return request({
        url: `caseTypes/deleteH5Type?id=${id}`,
        method: 'delete',
    })
}

/**
 * 通过ID删除单个pc类型
 * @param {*} id
 * id id 
 */

export function deleteType(id) {
    return request({
        url: `caseTypes/deleteType?id=${id}`,
        method: 'delete',
    })
}

/**
 * 编辑pc类型
 * @param {*} data
 * id id
 * type_name 类型名称
 * type 类型
 * enable 是否开启 teue = 开   false = 关
 * update_time 更新时间
 */
export function editType(data) {
    return request({
        url: 'caseTypes/editType',
        method: 'put',
        data
    })
}


/**
 * 编辑小程序类型
 * @param {*} data
 * id id
 * type_name 类型名称
 * type 类型
 * enable 是否开启 teue = 开   false = 关
 * update_time 更新时间
 */
export function editH5Type(data) {
    return request({
        url: 'caseTypes/editH5Type',
        method: 'put',
        data
    })
}