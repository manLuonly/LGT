import request from '@/utils/axios';
import { local } from "@/utils/env";

/**
 *
 * 分页查询
 * @export
 * @param {*} params
 * pageNum 页号
 * pageSize 每页大小
 * search_name 搜索文件名
 * 
 * @returns
 */
export function listPage(params) {
    return request({
        url: 'uploadCaseLists/listPage',
        method: 'get',
        params
    })
}

/**
 *
 * 新增客户
 * @export
 * @param {*} data
 * name 文件名
 * type 文件类型 (1为文件 / 2为单图片)
 * file 文件(formData)
 * @returns
 */
export function add(data) {
    return request({
        url: 'uploadCaseLists/add',
        method: 'post',
        data
    })
}



/**
 *
 * 删除文件
 * @export
 * @param {*} id
 * id id
 * @returns
 */
export function deleteFile(id) {
    return request({
        url: `uploadCaseLists/delete?id=${id}`,
        method: 'delete',
    })
}


/**
 *
 * 修改文件名称
 * @export
 * @param {*} params
 * id id 
 * newName 文件新名称
 * @returns
 */
export function edit(params) {
    return request({
        url: "uploadCaseLists/edit",
        method: "put",
        params
    })
}