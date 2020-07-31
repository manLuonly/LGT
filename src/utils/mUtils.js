import Vue from 'vue';
let md5 = require('js-md5');


// 消息弹窗
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

// 消息提示
Vue.prototype.message = function(message, type, showClose) {
    this.$message({
        message: message || '成功',
        type: type || "success",
        showClose: showClose || true
    });
}

// 显示dialog
Vue.prototype.showLoading = function() {
    const loading = this.$loading({
        lock: true,
        text: "上传中,请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
    });
    return loading;
}


// 关闭dialog
Vue.prototype.hideLoading = function() {
    let loading = this.showLoading();
    loading.close();
}


// window.watchTable = function() {
//     if (this.table.table.length > 0) {
//         this.$emit("changeLoading", false);
//     }
// }


/**
 * 将md5加密方法挂在window上
 * 
 * @param 
 * 
 * @example _md5("lijiacheng")
 * 
 * @return {string} 加密后的字符串
 */
window._md5 = md5

/**
 * 存储localStorage
 */

window.setStore = function(name, content) {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}


/**
 * 获取localStorage
 */
window.getStore = function(name) {
    if (!name) return;
    var value = window.localStorage.getItem(name);
    if (value !== null) {
        try {
            value = JSON.parse(value);
        } catch (e) {
            value = value;
        }
    }
    return value;
}

/**
 * 删除localStorage
 */
window.removeStore = function(name) {
    if (!name) return;
    window.localStorage.removeItem(name);
}



/**
 *  获取时间 YYYY-MM-DD 
 * 
 */

Date.getTime = () => {
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth() + 1;
    let dd = new Date().getDate();
    return yy + '-' + mm + '-' + dd;
}


/**
 *  获取当前时间 YYYY-MM-DD hh:MM:ss
 * 
 */

Date.getNewTime = () => {
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth() + 1;
    let dd = new Date().getDate();
    let hh = new Date().getHours();
    let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
    let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
    return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
}

/**
 *  获取当前时间 YYYY-MM-DD 23:59:59
 * 
 */
Date.getNewTime = () => {
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth() + 1;
    let dd = new Date().getDate();
    let hh = 23;
    let mf = 59;
    let ss = 59;
    return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
}

/**
 * format 时间戳格式化 YYYY-MM-DD
 * 
 */
Date.format = function(value) {
    var date = new Date(value);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return YY + MM + DD + " " + hh + mm + ss;
};



/**
 * @param {date} 标准时间格式:Fri Nov 17 2017 09:26:23 GMT+0800 (中国标准时间)
 * @param {type} 类型
 *   type == 1 ---> "yyyy-mm-dd hh:MM:ss.fff"
 *   type == 2 ---> "yyyymmddhhMMss"
 *   type == '' ---> "yyyy-mm-dd hh:MM:ss"
 */
Date.formatDate = (date, type) => {
    var year = date.getFullYear(); //年
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1; //月
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); //日
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //时
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //分
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //秒
    var milliseconds = date.getMilliseconds() < 10 ? "0" + date.getMilliseconds() : date.getMilliseconds() //毫秒
    if (type == 1) {
        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds + "." + milliseconds;
    } else if (type == 2) {
        return year + "" + month + "" + day + "" + hour + "" + minutes + "" + seconds;
    } else if (type == 3) {
        return year + "-" + month + "-" + day;
    } else {
        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    }
}



/**
 * 时间转换：20150101010101 --> '2015-01-01 01:01:01'
 */
Date.parseToDate = (timeValue) => {
    var result = "";
    var year = timeValue.substr(0, 4);
    var month = timeValue.substr(4, 2);
    var date = timeValue.substr(6, 2);
    var hour = timeValue.substr(8, 2);
    var minute = timeValue.substr(10, 2);
    var second = timeValue.substr(12, 2);
    result = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    return result;
}


/**
 * 时间转换：1590827670 --> '2015-01-01 01:01:01' (时间戳转时间)
 */
Date.Conversiontime = (timestamp) => {                
    let date = new Date(timestamp);                
    let Y = date.getFullYear() + '-';                
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';                
    let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';                
    let h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';                
    let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';                
    let s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());                
    return Y + M + D + h + m + s;        
}





/**
 * 判断空值
 */
export const isEmpty = (keys) => {
    if (typeof keys === "string") {
        keys = keys.replace(/\"|&nbsp;|\\/g, '').replace(/(^\s*)|(\s*$)/g, "");
        if (keys == "" || keys == null || keys == "null" || keys === "undefined") {
            return true;
        } else {
            return false;
        }
    } else if (typeof keys === "undefined") { // 未定义
        return true;
    } else if (typeof keys === "number") {
        return false;
    } else if (typeof keys === "boolean") {
        return false;
    } else if (typeof keys == "object") {
        if (JSON.stringify(keys) == "{}") {
            return true;
        } else if (keys == null) { // null
            return true;
        } else {
            return false;
        }
    }

    if (keys instanceof Array && keys.length == 0) { // 数组
        return true;
    }

}

/**
 * 返回两位的小数的字符串
 */
export const toFixedNum = (num) => {
    const tonum = Number(num).toFixed(2);
    return tonum;
}



/**
 * 读取base64
 */
export const readFile = file => {
    console.log(file)
        //var file = this.files[0];
        //判断是否是图片类型
    if (!/image\/\w+/.test(file.raw.type)) {
        alert("只能选择图片");
        return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
        var filedata = {
            filename: file.name,
            filebase64: e.target.result
        }
        alert(e.target.result)
    }
}

/**
 * 动态插入css
 */
export const loadStyle = url => {
        const link = document.createElement('link')
        link.type = 'text/css'
        link.rel = 'stylesheet'
        link.href = url
        const head = document.getElementsByTagName('head')[0]
        head.appendChild(link)
    }
    /**
     * 设置浏览器头部标题
     */
export const setTitle = (title) => {
    title = title ? `${title}` : '智能桂联后台管理'
    window.document.title = title
}

export const param2Obj = url => {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

//是否为正整数
export const isInteger = (s) => {
    var re = /^[0-9]+$/;
    return re.test(s)
}

export const setContentHeight = (that, ele, height) => {
    that.$nextTick(() => {
        ele.style.height = (document.body.clientHeight - height) + 'px'
    })
}


/**
 *
 * 深拷贝
 * @export
 * @param {*} obj
 * @returns
 */
export function deepCopy(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                result[key] = deepCopy(obj[key]); //递归复制
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}



/**
 *
 * 表情和中文字去除
 * @export
 * @param {*} str
 * @returns
 */
export function  stringRemoveSpecialSymbols(str)  { 
    str = str.toString();   
    str  =  str.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\w]/g,  ''); // 特殊符号
    str  =  str.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,  ""); // 表情  
    return  str   
}