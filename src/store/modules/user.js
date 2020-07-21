import * as mUtils from '@/utils/mUtils'
import { logout } from '@/api/user'
import { getToken, removeToken } from '@/utils/auth'


const user = {
    state: {
        name: '',
        avatar: '',
        token: getToken('Token'),
        roles: [],
        browserHeaderTitle: mUtils.getStore('browserHeaderTitle') || 'LGT后台管理',
        systemType: '',
        status: 'add', // 状态(新增=add 编辑=edit)
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
        //登出
        LogOut({ commit, reqData }) {
            return new Promise((resolve, reject) => {
                logout(reqData).then(response => {
                    commit('SET_ROLES', [])
                    removeToken('Token')
                    resolve()
                })
            })
        },
    }
}

export default user;