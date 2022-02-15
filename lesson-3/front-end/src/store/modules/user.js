import api from '@/api'
import Http from '@/util/request'
import { setItem, removeItem, getItem } from '@/util/storage'

const state = () => ({
    username: getItem('username') || '',
    token: getItem('token') || '',
    exp: getItem('exp') || '',
    permissions: [],
    'accomplish_init': getItem('accomplish_init') || '', // 初始化操作
    'accomplish_app_config': getItem('accomplish_app_config') || '', // 实施配置
    'accomplish_init_subject': getItem('accomplish_init_subject') || '', // 主体配置
    subjectName: getItem('subjectName') || '',
    menus: getItem('menus') || [],
    qw_avatar: getItem('qw_avatar') || ''
})

const getters = {
    // 判断是否超时
    isLogin: state => {
        let retn = false
        if (state.token) {
            let unix = Date.parse(new Date())
            if (unix < state.exp * 1000 && state.accomplish_init && state.accomplish_app_config && state.accomplish_init_subject) {
                retn = true
            }
        }
        return retn
    },
    isInit: state => {
        return state.accomplish_init && state.accomplish_init !== 'undefined'
    }
}

const actions = {
    getSubjectName({ commit }) {
        return new Promise(resolve => {
            Http.getSubjectName().then(res => {
                commit('setSubjectName', res.data)
                resolve()
            })

        })

    },
    getMenus({ commit }) {
        return new Promise(resolve => {
            Http.getMenus().then(res => {
                commit('setMenus', res.data)
                resolve(res.data)
            })
        })

    },
    login({ commit }, data) {
        console.log(data)
        return new Promise(resolve => {
            Http.loginIn(data).then(res => {
                commit('setUserData', { ...res.data, accomplish_init: true, accomplish_app_config: true, accomplish_init_subject: true })
                resolve()
            })

        })
    },
    logout({ commit }) {
        commit('removeUserData')
        commit('removeMenus')
        commit('menu/invalidRoutes', null, { root: true })
        commit('tabbar/clean', null, { root: true })
        commit('menu/removeRoutes', null, { root: true })
    },
    // 获取我的权限
    getPermissions({ state, commit }) {
        return new Promise(resolve => {
            // 通过 mock 获取权限
            api.get('member/permission', {
                baseURL: '/mock/',
                params: {
                    username: state.username
                }
            }).then(res => {
                commit('setPermissions', res.data.permissions)
                resolve(res.data.permissions)
            })
        })
    }
}

const mutations = {
    setMenus(state, data) {
        setItem('menus', data)
        state.menus = data
    },
    setSubjectName(state, data) {
        setItem('subjectName', data)
        state.subjectName = data
    },
    setInit(state, data) {
        setItem('accomplish_init', data.accomplish_init)
        setItem('accomplish_app_config', data.accomplish_app_config)
        setItem('accomplish_init_subject', data.accomplish_init_subject)
        state.accomplish_init = data.accomplish_init
        state.accomplish_app_config = data.accomplish_app_config
        state.accomplish_init_subject = data.accomplish_init_subject
    },
    setUserData(state, data) {
        setItem('username', data.username)
        setItem('token', data.token)
        setItem('exp', data.exp)
        setItem('accomplish_init', data.accomplish_init)
        setItem('accomplish_app_config', data.accomplish_app_config)
        setItem('accomplish_init_subject', data.accomplish_init_subject)
        setItem('qw_avatar', data.qw_avatar)
        state.username = data.username
        state.token = data.token
        state.exp = data.exp
        state.accomplish_init = data.accomplish_init
        state.accomplish_app_config = data.accomplish_app_config
        state.accomplish_init_subject = data.accomplish_init_subject
        state.qw_avatar = data.qw_avatar
    },
    removeMenus(state) {
        removeItem('menus')
        removeItem('subjectName')
        state.menus = []
        state.subjectName = ''
    },
    removeUserData(state) {
        removeItem('username')
        removeItem('token')
        removeItem('exp')
        removeItem('accomplish_app_config')
        removeItem('accomplish_init_subject')
        removeItem('accomplish_init')
        state.username = ''
        state.token = ''
        state.exp = ''
        state.accomplish_init = ''
        state.accomplish_init_subject = ''
        state.accomplish_app_config = ''

    },
    setPermissions(state, permissions) {
        state.permissions = permissions
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
