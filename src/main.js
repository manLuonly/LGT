import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'

// 'development',use package;'production':use cdn;
import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'mini' });
import ('element-ui/lib/theme-chalk/index.css')

/**
 * 挂载公共组件 及全局方法
 */
import commonComponents from '@/components'
Vue.use(commonComponents);

import axios from 'axios'
Vue.prototype.$axios = axios;


import echarts from 'echarts';
Vue.prototype.$echarts = echarts;


// i18n国际化
import i18n from "@/lang";
import './components/iconSvg' // iconSvg
import './directive'; // 全局指令
import '@/permission';




Vue.config.productionTip = false;

axios.defaults.withCredentials = true

new Vue({
    router,
    store,
    i18n, // 便于可以直接在组件中通过this.$i18n使用，也可以按需引用
    render: h => h(App),
}).$mount('#app')