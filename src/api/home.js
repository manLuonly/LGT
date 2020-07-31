import request from '@/utils/axios';
import { local } from "@/utils/env";


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
        url: `${local}/common/ip`,
        method: 'get'
    })
}