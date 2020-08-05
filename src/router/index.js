import Vue from 'vue'
import Router from 'vue-router'
import { Layout, Content } from "../layout"; // 页面整体布局
// import { topRouterMap } from "./topRouter";
let topRouterMap = [];

process.env.NODE_ENV === "development" ? Vue.use(Router) : null;

function filterTopRouterMap(name) {
    let router = topRouterMap.find((item) => {
        return item.parentName === name;
    });
    return router.data; // arr
}

/**
 * 1、roles:后台返回的权限结构;
 * 
 */
//手动跳转的页面白名单
const whiteList = [
    '/'
];
/**
 * path:''与path:'*'的区别：
 * 1、path:'*', 会匹配所有路径
 * 2、path:''，也是会匹配到路由
 * 
 */
//默认不需要权限的页面
export const constantRouterMap = [{
        path: '',
        component: Layout,
        redirect: '/index/index',
        hidden: true
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/page/login/components/login-page'),
        //    component: () =>
        // import ('@/page/login'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/page/errorPage/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () =>
            import ('@/page/errorPage/401'),
        hidden: true
    },
    {
        path: '/index',
        name: 'index',
        component: Layout,
        meta: {
            title: '首页',
            icon: 'icondashboard',
        },
        noDropdown: true,
        children: [{
            path: 'index',
            meta: {
                title: '首页',
                icon: 'icondashboard',
                routerType: 'leftmenu'
            },
            component: () =>
                import ('@/page/index/index'),
        }]
    }
]

//注册路由
export default new Router({
    // mode: 'history', // 默认为'hash'模式
    base: '/dist', // 添加跟目录,对应服务器部署子目录
    routes: constantRouterMap
})

//异步路由（需要权限的页面）
export const asyncRouterMap = [{
        path: '/projectManagement',
        name: 'projectManagement',
        meta: {
            title: '案例管理',
            icon: 'icon-xiangmu',
        },
        component: Layout,
        children: [{
                path: 'caseClassification',
                name: 'caseClassification',
                meta: {
                    title: '案例分类',
                    routerType: 'leftmenu'
                },
                component: () =>
                    import ('@/page/projectManagement/caseClassification'),
            },
            {
                path: 'caseList',
                name: 'caseList',
                meta: {
                    title: '案例列表',
                    routerType: 'leftmenu'
                },
                component: () =>
                    import ('@/page/projectManagement/caseList'),
            }
        ]
    },
    {
        path: '/clientManagement',
        name: 'clientManagement',
        meta: {
            title: '预约管理',
            icon: 'icon-kehuguanli',
        },
        component: Layout,
        redirect: '/clientManagement/userInfo',
        children: [{
            path: 'userInfo',
            name: 'userInfo',
            meta: {
                title: '预约管理'
            },
            component: () =>
                import ('@/page/clientManagement/userInfo')
        }]
    },
    {
        path: '/orderManagement',
        component: Layout,
        name: 'orderManagement',
        meta: {
            title: '录入管理',
            icon: 'icon-fuwuxiangmu'
        },
        children: [{
                path: 'orderDetails',
                name: 'orderDetails',
                component: () =>
                    import ('@/page/orderManagement/orderDetails'),
                meta: {
                    title: '订单录入',
                    noCache: true
                }
            },
            {
                path: 'userDetails',
                name: 'userDetails',
                component: () =>
                    import ('@/page/orderManagement/userDetails'),
                meta: {
                    title: '客户录入',
                    noCache: true
                }
            },

        ]
    },
    {
        path: '/history',
        component: Layout,
        name: 'history',
        meta: {
            title: '历史记录',
            icon: 'icon-Icon_orderhistory'
        },
        noDropdown: true, // 不开启下拉列表
        children: [{
            path: 'historyRecord',
            name: 'history',
            component: () =>
                import ('@/page/historyRecord/historyRecord'),
            meta: {
                title: '历史记录',
                noCache: true // 不缓存
            }
        }, ]
    },
    {
        path: '/uploadFile',
        component: Layout,
        name: 'uploadFile',
        meta: {
            title: '上传文件',
            icon: 'icon-upload'
        },
        noDropdown: true, // 不开启下拉列表
        children: [{
            path: 'uploadFile',
            name: 'uploadFile',
            component: () =>
                import ('@/page/uploadFile/uploadFile'),
            meta: {
                title: '上传文件',
                noCache: true // 不缓存
            }
        }, ]
    },
    { path: '*', redirect: '/404', hidden: true }
];

/**
 *  路由设置要求：
 * 1、该路由有子菜单,可以设置多层嵌套路由children;如果没有子菜单,不需要设置children;通过item.children.length来判断路由的级数;
 * 2、登录成功后,定位到系统首页时,需要加载页面整体布局组件Layout并进行子路由定向加载;
 * 
 * 按需加载路由组件的2种方法：
 * 1、component: () => import('@/page/login')
 * 2、component:resolve => require(['@/page/fundPosition'], resolve)
 * 
 * 
 * 
 * 
 * 
 * 
 */