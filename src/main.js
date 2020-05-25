import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'

// 'development',use package;'production':use cdn;
import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'mini' });
import ('element-ui/lib/theme-chalk/index.css')

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

import axios from 'axios'
Vue.prototype.$axios = axios;

import './components/iconSvg' // iconSvg

import '@/permission' // permission control

import '@/mockjs'; // mock数据

// i18n国际化
import i18n from "@/lang";



Vue.prototype.message = function(message, type, showClose) {
    this.$message({
        message: message || '成功',
        type: type || "success",
        showClose: showClose || true
    });
}

Vue.config.productionTip = false;

axios.defaults.withCredentials = true

new Vue({
    router,
    store,
    i18n, // 便于可以直接在组件中通过this.$i18n使用，也可以按需引用
    render: h => h(App),
}).$mount('#app')