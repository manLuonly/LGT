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

// import '@/mockjs'; // mock数据

// i18n国际化
import i18n from "@/lang";


Vue.prototype.alertMsgBox = function alert(msg, title, settings = {}) {
    Object.assign(settings, { //合并对象
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true, //允许确认框内容为html格式
        beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                setTimeout(() => {
                    done();
                    setTimeout(() => {
                        instance.confirmButtonLoading = false;
                    }, 300);
                }, 1000);
            } else {
                done();
            }
        }
    })
    return this.$confirm(`<p style="font-weight:bold;">${msg || '此操作将删除该数据,30天内可恢复,是否继续?' }</p>`, title || '提示', settings)
}


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