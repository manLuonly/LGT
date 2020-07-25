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
    },
    // inserted: function(el, binding) {
    //     //组件中对应data中的属性名
    //     const name = binding.value.setName;
    //     //绑定属性的value值
    //     const value = binding.arg;
    //     // console.log(binding.arg, 'binding.arg');
    //     if (value) {
    //         //去除特殊符号
    //         binding.value.set(name, stringRemoveSpecialSymbols(value));
    //     }
    // },
    // componentUpdated: function(el, binding) {
    //     //组件中对应data中的属性名
    //     const name = binding.value.setName;
    //     //绑定属性的value值
    //     const value = binding.arg;
    //     console.log(binding.arg, 'componentUpdatedbinding.arg');
    //     if (value) {
    //         //去除特殊符号
    //         binding.value.set(name, stringRemoveSpecialSymbols(value));
    //     }
    // },
    // bind: function(el, binding) {
    //     //组件中对应data中的属性名
    //     const name = binding.value.setName;
    //     //绑定属性的value值
    //     const value = binding.arg;
    //     console.log(binding.arg, 'bindbinding.arg');
    //     if (value) {
    //         //去除特殊符号
    //         binding.value.set(name, stringRemoveSpecialSymbols(value));
    //     }
    // },
});