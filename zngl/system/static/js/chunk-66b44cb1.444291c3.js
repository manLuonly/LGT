(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-66b44cb1"],{"2f1a":function(e,t,r){"use strict";var a=r("5459"),n=r.n(a);n.a},"41f2":function(e,t,r){"use strict";var a=r("8af0"),n=r.n(a);n.a},5459:function(e,t,r){},"74b2":function(e,t,r){"use strict";r.d(t,"d",(function(){return n})),r.d(t,"a",(function(){return l})),r.d(t,"b",(function(){return i})),r.d(t,"c",(function(){return o})),r.d(t,"f",(function(){return s})),r.d(t,"e",(function(){return c}));var a=r("a27e");function n(e){return Object(a["a"])({url:"orderLists/listPage",method:"get",params:e})}function l(e){return Object(a["a"])({url:"orderLists/add",method:"post",data:e})}function i(e){return Object(a["a"])({url:"orderLists/delete?id=".concat(e),method:"delete"})}function o(e){return Object(a["a"])({url:"orderLists/edit",method:"put",data:e})}function s(e){return Object(a["a"])({url:"/clientLists/listAll?search_name=".concat(e),method:"get"})}function c(e){return Object(a["a"])({url:"orderLists/restore?id=".concat(e),method:"post"})}},"7cdf":function(e,t,r){var a=r("5ca1");a(a.S,"Number",{isInteger:r("9c12")})},"8af0":function(e,t,r){},"9c12":function(e,t,r){var a=r("d3f4"),n=Math.floor;e.exports=function(e){return!a(e)&&isFinite(e)&&n(e)===e}},"9cf5":function(e,t,r){"use strict";r.d(t,"g",(function(){return n})),r.d(t,"a",(function(){return l})),r.d(t,"b",(function(){return i})),r.d(t,"c",(function(){return o})),r.d(t,"d",(function(){return s})),r.d(t,"f",(function(){return c})),r.d(t,"e",(function(){return u})),r.d(t,"i",(function(){return m})),r.d(t,"h",(function(){return p}));var a=r("a27e");function n(e){return Object(a["a"])({url:"caseTypes/listAll",method:"get",params:e})}function l(e){return Object(a["a"])({url:"caseTypes/addH5Type",method:"post",data:e})}function i(e){return Object(a["a"])({url:"caseTypes/addType",method:"post",data:e})}function o(e){return Object(a["a"])({url:"caseTypes/deleteH5Type?id=".concat(e),method:"delete"})}function s(e){return Object(a["a"])({url:"caseTypes/deleteType?id=".concat(e),method:"delete"})}function c(e){return Object(a["a"])({url:"caseTypes/editType",method:"put",data:e})}function u(e){return Object(a["a"])({url:"caseTypes/editH5Type",method:"put",data:e})}function m(e){return Object(a["a"])({url:"caseTypes/restorePc?id=".concat(e),method:"post"})}function p(e){return Object(a["a"])({url:"caseTypes/restoreMini?id=".concat(e),method:"post"})}},c408:function(e,t,r){"use strict";var a=r("ea89"),n=r.n(a);n.a},dd5a:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"order-details"},[e.orderDetails.isShow?r("order-details-dialog",{attrs:{isShow:e.orderDetails.isShow,dialogRow:e.orderDetails.dialogRow},on:{getOrderList:e.getDataList,closeDialog:e.hideDialog}}):e._e(),r("div",{staticClass:"add-order-details inline-block"},[r("el-button",{staticClass:"add-order-details-btn",attrs:{type:"primary",size:"large"},on:{click:function(t){e.showDialog(),e.setEmptyForm()}}},[e._v("添加订单")])],1),r("date-picker",{on:{changeDate:function(t){return e.changeDate(t)}}}),r("filter-state",{on:{selectState:function(t){return e.selectState(t)}}}),r("search",{attrs:{customizePlaceholder:e.customizePlaceholder},on:{searchUserList:function(t){return e.searchUserList(t)}}}),r("div",{staticClass:"total-money text_center inline-block"},[e._m(0),r("div",{staticClass:"right-num inline-block"},[r("span",[e._v("￥"+e._s(e.total))])])]),r("div",{staticClass:"table_container"},[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)",data:e.tableData,height:e.tableHeight,"default-sort":{prop:"price",order:"descending"}}},[r("el-table-column",{attrs:{prop:"name",label:"姓名",align:"center"}}),r("el-table-column",{attrs:{prop:"tel",label:"联系电话",align:"center"}}),r("el-table-column",{attrs:{prop:"wx_number",label:"微信号",align:"center"}}),r("el-table-column",{attrs:{prop:"email",label:"邮箱",align:"center","show-overflow-tooltip":""}}),r("el-table-column",{attrs:{prop:"service_type",label:"服务项目",align:"center","show-overflow-tooltip":""}}),r("el-table-column",{attrs:{prop:"note",label:"备注",align:"center","show-overflow-tooltip":""}}),r("el-table-column",{attrs:{prop:"vip",label:"vip",align:"center",formatter:e.isVip,filters:[{text:"是",value:1},{text:"否",value:0}],"filter-method":e.filterTag}}),r("el-table-column",{attrs:{prop:"state",label:"状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-tag",{attrs:{type:e.currentState(t.row)},domProps:{innerHTML:e._s(e.currentStatus(t.row))}},[e._v(e._s(t.row.state))])]}}])}),r("el-table-column",{attrs:{prop:"price",label:"交易金额",align:"center",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v("￥"+e._s(t.row.price))])]}}])}),r("el-table-column",{attrs:{prop:"update_time",label:"更新时间",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(Date.format(t.row.update_time)))])]}}])}),r("el-table-column",{attrs:{prop:"operation",align:"center",label:"操作",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{icon:"edit",size:"mini"},on:{click:function(r){return e.lookorderStatus(t.row)}}},[e._v("编辑")]),r("el-button",{attrs:{type:"danger",icon:"delete",size:"mini"},on:{click:function(r){return e.deleteOrder(t.row)}}},[e._v("删除")])]}}])})],1),r("pagination",{attrs:{pageTotal:e.pageTotal},on:{handleCurrentChange:e.handleCurrentChange,handleSizeChange:e.handleSizeChange}})],1)],1)},n=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"left-text inline-block"},[r("span",[e._v("总额")])])}],l=(r("8e6e"),r("ac6a"),r("456d"),r("bd86")),i=r("5880"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-dialog",{attrs:{visible:e.isVisible,title:e.dialogRow.title,"close-on-click-modal":!1,"close-on-press-escape":!1,"modal-append-to-body":!1,center:""},on:{"update:visible":function(t){e.isVisible=t},close:e.closeDialog}},[r("el-form",{ref:"ruleForm",staticClass:"order-ruleForm",attrs:{model:e.ruleForm,rules:e.form_rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"客户姓名",prop:"name"}},[r("el-select",{directives:[{name:"clearSpecial",rawName:"v-clearSpecial:[ruleForm.name]",value:{set:e.setValue,setName:"name"},expression:"{set:setValue, setName:'name'}",arg:e.ruleForm.name}],attrs:{clearable:"",filterable:"",placeholder:"请选择或输入姓名"},on:{change:e.currentVal},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}},e._l(e.userOptions,(function(e){return r("el-option",{key:e.tel,attrs:{label:e.name,value:e}})})),1)],1),r("el-form-item",{attrs:{label:"联系电话",prop:"tel"}},[r("el-select",{directives:[{name:"clearSpecial",rawName:"v-clearSpecial:[ruleForm.tel]",value:{set:e.setValue,setName:"tel"},expression:"{set:setValue, setName:'tel'}",arg:e.ruleForm.tel}],attrs:{clearable:"",filterable:"",placeholder:"请选择或输入电话"},on:{change:e.currentVal},model:{value:e.ruleForm.tel,callback:function(t){e.$set(e.ruleForm,"tel",t)},expression:"ruleForm.tel"}},e._l(e.userOptions,(function(e){return r("el-option",{key:e.tel,attrs:{label:e.tel,value:e}})})),1)],1),r("el-form-item",{attrs:{label:"微信号",prop:"wxNumber"}},[r("el-select",{directives:[{name:"clearSpecial",rawName:"v-clearSpecial:[ruleForm.wx_number]",value:{set:e.setValue,setName:"wx_number"},expression:"{set:setValue, setName:'wx_number'}",arg:e.ruleForm.wx_number}],attrs:{clearable:"",filterable:"",placeholder:"请选择微信号"},on:{change:e.currentVal},model:{value:e.ruleForm.wx_number,callback:function(t){e.$set(e.ruleForm,"wx_number",t)},expression:"ruleForm.wx_number"}},e._l(e.userOptions,(function(e){return r("el-option",{key:e.tel,attrs:{label:e.wx_number,value:e}})})),1)],1),r("el-form-item",{attrs:{label:"金额",prop:"price"}},[r("el-input-number",{attrs:{precision:2,step:1,min:0,max:999999},model:{value:e.ruleForm.price,callback:function(t){e.$set(e.ruleForm,"price",t)},expression:"ruleForm.price"}})],1),r("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[r("el-input",{model:{value:e.ruleForm.email,callback:function(t){e.$set(e.ruleForm,"email",t)},expression:"ruleForm.email"}})],1),r("el-form-item",{attrs:{label:"服务项目",prop:"service_type"}},[r("el-select",{attrs:{placeholder:"请选择服务项目"},model:{value:e.ruleForm.service_type,callback:function(t){e.$set(e.ruleForm,"service_type",t)},expression:"ruleForm.service_type"}},e._l(e.serviceOptions,(function(e){return r("el-option",{key:e.type_name,attrs:{label:e.type_name,value:e.type}})})),1)],1),r("el-form-item",{attrs:{label:"状态",prop:"state"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.state,callback:function(t){e.$set(e.ruleForm,"state",t)},expression:"ruleForm.state"}},e._l(e.stateOptions,(function(e){return r("el-option",{key:e.label,attrs:{label:e.label,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"vip",prop:"vip"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.vip,callback:function(t){e.$set(e.ruleForm,"vip",t)},expression:"ruleForm.vip"}},e._l(e.vipOptions,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"备注"}},[r("el-input",{attrs:{type:"textarea",maxlength:"80","show-word-limit":""},model:{value:e.ruleForm.note,callback:function(t){e.$set(e.ruleForm,"note",t)},expression:"ruleForm.note"}})],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("提 交")]),r("el-button",{on:{click:e.closeDialog}},[e._v("取 消")])],1)],1)],1)},s=[],c=(r("7f7f"),r("c5f6"),r("7cdf"),r("9cf5")),u=r("74b2");function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(r,!0).forEach((function(t){Object(l["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d={name:"orderDialog",data:function(){var e=function(e,t,r){var a=/^1[3|4|5|6|7|8][0-9]{9}$/;if(!t)return r(new Error("电话号码不能为空"));setTimeout((function(){Number.isInteger(+t)?a.test(t)?r():r(new Error("电话号码格式不正确")):r(new Error("请输入数字值"))}),100)},t=function(e,t,r){var a=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;if(!t)return r();setTimeout((function(){a.test(t)?r():r(new Error("请输入正确的邮箱格式"))}),100)};return{isVisible:this.isShow,ruleForm:{name:"",tel:"",wx_number:"",email:"",service_type:"",state:"",vip:"",price:"",note:""},form_rules:{name:[{required:!0,message:"请输入客户姓名",trigger:"blur"}],tel:[{required:!0,message:"请输入联系电话",trigger:"blur"},{validator:e,trigger:"blur"}],wxNumber:[{required:!0,message:"请输入微信号",trigger:"blur"}],service_type:[{required:!0,message:"请选择服务项目",trigger:"blur"}],state:[{required:!0,message:"请选择状态",trigger:"blur"}],price:[{required:!0,message:"请输入金额",trigger:"blur"}],email:[{message:"请输入邮箱",trigger:"blur"},{validator:t,trigger:"blur"}]},stateOptions:[{value:0,label:"已完成"},{value:1,label:"进行中"},{value:2,label:"已取消"}],vipOptions:[{value:1,label:"是"},{value:0,label:"否"}],serviceOptions:[],userOptions:[]}},props:{isShow:Boolean,dialogRow:Object},computed:p({},Object(i["mapGetters"])(["status"])),mounted:function(){var e=this;"add"===this.status?this.$nextTick((function(){e.$refs["ruleForm"].resetFields()})):this.ruleForm=this.dialogRow,this.getUserList(),this.getCaseType()},methods:{getUserList:function(){var e=this,t=this.ruleForm.name?this.ruleForm.name:" ";Object(u["f"])(t).then((function(t){e.userOptions=t.data||[]}))},getCaseType:function(){var e=this,t={pageNum:1,pageSize:20,system_type:"pc",delete_status:0};Object(c["g"])(t).then((function(t){e.serviceOptions=t.data.map((function(e){return e}))||[]}))},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(e){var r=t.ruleForm;t.showLoading(),"add"===t.status?Object(u["a"])(r).then((function(e){t.$refs["ruleForm"].resetFields(),t.closeDialog(),t.message("新增订单成功"),t.$emit("getOrderList")})).finally((function(){t.hideLoading()})):Object(u["c"])(r).then((function(e){t.$refs["ruleForm"].resetFields(),t.closeDialog(),t.message("修改订单成功"),t.$emit("getOrderList")})).finally((function(){t.hideLoading()}))}}))},closeDialog:function(){this.$emit("closeDialog")},currentVal:function(e){this.ruleForm=p({},this.ruleForm,{name:e.name,tel:e.tel,wx_number:e.wx_number,email:e.email,vip:e.vip,note:e.note})},setValue:function(e,t){this.ruleForm[e]=t}}},f=d,b=(r("c408"),r("2877")),g=Object(b["a"])(f,o,s,!1,null,"486d6f4c",null),h=g.exports,v=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"filter-vip inline-block"},[r("span",{staticClass:"filter-type-text"},[e._v("状态")]),r("el-select",{attrs:{size:"large",placeholder:"请选择"},on:{change:e.changeType},model:{value:e.state,callback:function(t){e.state=t},expression:"state"}},e._l(e.stateOptions,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)},y=[],O={name:"filterVip",data:function(){return{state:-1,stateOptions:[{value:-1,label:"全部"},{value:0,label:"已完成"},{value:1,label:"进行中"},{value:2,label:"已取消"}]}},methods:{changeType:function(e){this.$emit("selectState",e)}}},_=O,w=(r("2f1a"),Object(b["a"])(_,v,y,!1,null,"a21c37fc",null)),F=w.exports;function D(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?D(r,!0).forEach((function(t){Object(l["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):D(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var x={data:function(){return{tableData:[],orderDetails:{isShow:!1,dialogRow:{title:"注:需要有当前客户,才能输入订单"}},paginationForm:{pageNum:1,pageSize:20,search_name:"",state:-1,vip:-1,start_time:"",end_time:"",delete_status:0},loading:!0,tableHeight:0,pageTotal:0,total:0,customizePlaceholder:"请输入姓名/微信号"}},components:{orderDetailsDialog:h,filterState:F},computed:j({},Object(i["mapGetters"])(["systemType"])),mounted:function(){this.getDataList(),this.setTableHeight()},methods:{setTableHeight:function(){var e=this;this.$nextTick((function(){e.tableHeight=document.body.clientHeight-250}))},getDataList:function(){var e=this,t=this.paginationForm;Object(u["d"])(t).then((function(t){e.tableData=t.data||[],e.total=t.total,e.pageTotal=t.count})).finally((function(){e.loading=!1}))},handleCurrentChange:function(e){this.paginationForm.pageNum=e,this.getDataList()},handleSizeChange:function(e){this.paginationForm.pageSize=e,this.getDataList()},lookorderStatus:function(e){this.orderDetails.dialogRow=j({},e),this.showDialog(),this.$store.commit("SET_ADDOREDIT","edit")},deleteOrder:function(e){var t=this,r=e.id;this.alertMsgBox().then((function(){Object(u["b"])(r).then((function(e){t.message(e.msg),t.getDataList()}))})).catch((function(e){t.message("已取消","info")}))},showDialog:function(){this.orderDetails.isShow=!0},hideDialog:function(){this.orderDetails.isShow=!1},changeDate:function(e){this.paginationForm.start_time=e?Date.formatDate(e[0]):"",this.paginationForm.end_time=e?Date.formatDate(e[1]):"",this.getDataList()},selectState:function(e){this.paginationForm.state=e,this.getDataList()},searchUserList:function(e){this.paginationForm.pageNum=1,this.paginationForm.search_name=e,this.getDataList()},setEmptyForm:function(){this.$store.commit("SET_ADDOREDIT","add")},filterTag:function(e,t){return t.vip===e},isVip:function(e){var t=e.vip;return 0===t?"否":1===t?"是":"否"},currentStatus:function(e){var t=e.state;return 0===t?"已完成":1===t?"进行中":2===t?"已取消":"未知"},currentState:function(e){var t=e.state;return 0===t?"success":1===t?"":2===t?"danger":"未知"}}},k=x,S=(r("41f2"),Object(b["a"])(k,a,n,!1,null,"68d2c11a",null));t["default"]=S.exports},ea89:function(e,t,r){}}]);