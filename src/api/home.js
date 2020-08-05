import request from '@/utils/axios';
import { local } from "@/utils/env";



/**
 *登录接口
 *
 * @export
 * @param {*} params 
 * @returns 
 */
export function login(params) {
    return request({
        url: '/login',
        method: 'get',
        params
    })
}

export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}



export function admin() {
    return request({
        url: '/admin',
        method: 'post'
    })
}

export function user() {
    return request({
        url: '/user',
        method: 'post'
    })
}

/**
 *
 * 首页参数统计
 * @export
 * @returns
 */
export function nums() {
    return request({
        url: '/statistics/nums',
        method: 'get'
    })
}

/**
 * 近7天每日总额统计
 * @export
 * @param {*} day
 * @returns
 */
export function moneyFn(day) {
    return request({
        url: `/statistics/money?day=${day}`,
        method: 'get'
    })
}


/**
 * 近7天每日预约人数统计
 * @export
 * @param {*} day
 * @returns
 */
export function reservationFn(day) {
    return request({
        url: `/statistics/reservation?day=${day}`,
        method: 'get'
    })
}


/**
 *
 *公网ip获取
 * @export
 * @returns
 */
export function getIp() {
    return request({
        url: `${local}/realIp`,
        method: 'get'
    })
}