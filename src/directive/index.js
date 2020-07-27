import Vue from "vue";
import { stringRemoveSpecialSymbols } from "@/utils/mUtils";

/**
 * 去除输入框内特殊符号的指令
 *
 * value  ->   binding.arg
 * setName ->  binding.value.setName
 * {Function} set
 *
 * @example v-clearSpecial:[model.introduce]="{set:setValue, setName:'introduce'}"
 *
 */
Vue.directive("clearSpecial", {
    update: function(el, binding) {
        //组件中对应data中的属性名
        const name = binding.value.setName;
        //绑定属性的value值
        const value = binding.arg;
        if (value) {
            //去除特殊符号
            binding.value.set(name, stringRemoveSpecialSymbols(value));
        }
    }
});



/**
 * 禁止输入中文
 * @example v-numberInt
 *
 */
Vue.directive('numberInt', {
    bind: function(el, binding, vnode) {
        const element = el.getElementsByTagName('input')[0]
        const len = binding.arg // 初始化设置 
        element.value = Number(element.value).toFixed(len) // 失焦时候格式化
        element.addEventListener('blur', function() {
            if (isNaN(element.value)) {
                // vnode.data.model.callback(0) //(输入框替换为0)
            } else {
                vnode.data.model.callback(Number(element.value).toFixed(len))
            }
        })
    }
})