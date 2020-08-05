import * as mUtils from '@/utils/mUtils'
import { login, logout, getIp, admin } from '@/api/home'
import { getToken, setToken, removeToken, setName, removeName } from '@/utils/auth'


const user = {
    state: {
        name: '',
        avatar: '',
        token: getToken('Token'),
        roles: [],
        browserHeaderTitle: getStore('browserHeaderTitle') || 'LGT后台管理',
        systemType: '', // 系统类型(pc=pc 小程序=mini)
        status: 'add', // dialog状态(新增=add 编辑=edit)
    },
    getters: {
        token: state => state.token,
        roles: state => state.roles,
        avatar: state => state.avatar,
        name: state => state.name,
        browserHeaderTitle: state => state.browserHeaderTitle,
        systemType: state => state.systemType,
        status: state => state.status,
    },
    mutations: {
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_BROWSERHEADERTITLE: (state, action) => {
            state.browserHeaderTitle = action.browserHeaderTitle
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_SYSTEMTYPE: (state, systemType) => {
            state.systemType = systemType
        },
        SET_ADDOREDIT: (state, status) => {
            state.status = status
        },
    },
    actions: {
        // 登录
        Login({ commit }, form) {
            return new Promise((resolve, reject) => {
                login(form)
                    .then((res) => {
                        setToken("Token", res.token);
                        setName("name", res.data.username);
                        getIp().then((res) => {
                            setStore("ip", res.data.ip);
                        });
                        admin().then(() => {});
                        resolve()
                    })
            })
        },
        // 登出
        LogOut({ commit }) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_ROLES', [])
                    removeToken('Token')
                    removeName('name')
                    resolve()
                })
            })
        },
    }
}

export default user;