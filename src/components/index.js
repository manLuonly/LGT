/**
 * 存放公共组件位置
 */

// import IconSvg from '../components/iconSvg';
import pagination from '@/components/pagination';
import selectSystem from '@/components/selectSystem';
import datePicker from '@/components/datePicker';
import search from '@/components/search';




export default {
    install(Vue) {
        // Vue.component('icon-svg', IconSvg)
        Vue.component('pagination', pagination)
        Vue.component('select-system', selectSystem)
        Vue.component('date-picker', datePicker)
        Vue.component('search', search)
    },
}