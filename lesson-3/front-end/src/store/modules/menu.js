import path from 'path-browserify'
import { deepClone } from '@/util'
import api from '@/api'
import Http from '@/util/request'
import { getItem } from '@/util/storage'
function hasPermission(permissions, route) {
    let isAuth = false
    if (route.meta && route.meta.auth) {
        isAuth = permissions.some(auth => {
            if (typeof route.meta.auth == 'string') {
                return route.meta.auth === auth
            } else {
                return route.meta.auth.some(routeAuth => {
                    return routeAuth === auth
                })
            }
        })
    } else {
        isAuth = true
    }
    return isAuth
}

function filterAsyncRoutes(routes, permissions) {
    const res = []
    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(permissions, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, permissions)
                tmp.children.length && res.push(tmp)
            } else {
                res.push(tmp)
            }
        }
    })
    return res
}
// function flatAsyncMenus(menus) {
//     menus.forEach(item => {
//         rightMenu.push(item)
//         if (item.children) {
//             flatAsyncMenus(item.children)
//         }
//     })
// }
function hasMenu(menus, menu) {
    let i = ''
    menus.forEach((item, index) => {
        if (item.title === menu.meta.title) i = index
    })
    return i
}

function filterMenu(routes, menus, level) {
    const res = []
    routes.forEach(route => {
        const tmp = { ...route }
        let i = hasMenu(menus, tmp)
        if (i === 0 || i) {
            if (tmp.children && level < 2) {
                tmp.children = filterMenu(tmp.children, menus[i].children, ++level)
                tmp.children.length && res.push(tmp) && --level

            } else {
                res.push(tmp)
            }
        }
    })
    return res
}

function formatBackRoutes(routes, views = import.meta.glob('../../views/**/*.vue')) {
    return routes.map(route => {
        switch (route.component) {
            case 'Layout':
                route.component = () => import('@/layout/index.vue')
                break
            default:
                if (route.component) {
                    route.component = views[`../../views/${route.component}`]
                }
        }
        if (route.children) {
            route.children = formatBackRoutes(route.children, views)
        }
        return route
    })
}

// 将多层嵌套路由处理成平级
function flatAsyncRoutes(routes, breadcrumb, baseUrl = '') {
    let res = []
    routes.forEach(route => {
        const tmp = { ...route }
        if (tmp.children) {
            let childrenBaseUrl = ''
            if (baseUrl == '') {
                childrenBaseUrl = tmp.path
            } else if (tmp.path != '') {
                childrenBaseUrl = `${baseUrl}/${tmp.path}`
            }
            let childrenBreadcrumb = deepClone(breadcrumb)
            if (route.meta.breadcrumb !== false) {
                childrenBreadcrumb.push({
                    path: childrenBaseUrl,
                    title: route.meta.title,
                    parent: route.meta.parent
                })
            }
            let tmpRoute = deepClone(route)
            tmpRoute.path = childrenBaseUrl
            tmpRoute.meta.breadcrumbNeste = childrenBreadcrumb
            delete tmpRoute.children
            res.push(tmpRoute)
            let childrenRoutes = flatAsyncRoutes(tmp.children, childrenBreadcrumb, childrenBaseUrl)
            childrenRoutes.map(item => {
                // 如果 path 一样则覆盖，因为子路由的 path 可能设置为空，导致和父路由一样，直接注册会提示路由重复
                if (res.some(v => v.path == item.path)) {
                    res.forEach((v, i) => {
                        if (v.path == item.path) {
                            res[i] = item
                        }
                    })
                } else {
                    res.push(item)
                }
            })
        } else {
            if (baseUrl != '') {
                if (tmp.path != '') {
                    tmp.path = `${baseUrl}/${tmp.path}`
                } else {
                    tmp.path = baseUrl
                }
            }
            // 处理面包屑导航
            let tmpBreadcrumb = deepClone(breadcrumb)
            if (tmp.meta.breadcrumb !== false) {
                tmpBreadcrumb.push({
                    path: tmp.path,
                    title: tmp.meta.title,
                    parent: tmp.meta.parent
                })
            }
            tmp.meta.breadcrumbNeste = tmpBreadcrumb
            res.push(tmp)
        }
    })
    return res
}

const state = () => ({
    isGenerate: false,
    routes: [],
    defaultOpenedPaths: [],
    headerActived: 0,
    currentRemoveRoutes: []
})

const getters = {
    // 由于 getter 的结果不会被缓存，导致导航栏切换时有明显的延迟，该问题会在 Vue 3.2 版本中修复，详看 https://github.com/vuejs/vuex/pull/1883
    routes: (state, getters, rootState) => {
        let routes
        if (rootState.settings.menuMode === 'single') {
            routes = [{ children: [] }]
            state.routes.map(item => {
                routes[0].children.push(...item.children)
            })
        } else {
            routes = state.routes
        }
        return routes
    },
    sidebarRoutes: (state, getters) => {
        return getters.routes.length > 0 ? getters.routes[state.headerActived].children : []
    }
}

const actions = {
    async getMenu({ rootState, dispatch, commit }, data) {
        console.log(rootState)
        console.log(dispatch)
        console.log(commit)
        console.log(data)
        let res = await Http.getMenus()
        return new Promise(resolve => {
            resolve(res)
        })

    },
    // 根据权限动态生成路由（前端生成）
    generateRoutesAtFront({ rootState, dispatch, commit }, data) {
        console.log('这什么鬼')
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async resolve => {

            let accessedRoutes
            // 如果权限功能开启，则需要对路由数据进行筛选过滤
            if (rootState.settings.enablePermission) {
                const permissions = await dispatch('user/getPermissions', null, { root: true })
                accessedRoutes = filterAsyncRoutes(data.asyncRoutes, permissions)
            } else {
                accessedRoutes = data.asyncRoutes
            }
            // ----------本地调试 start-----------
            let menus = getItem('menus')
            // let menus = [{ 'id': 1, 'title': '基础设置', 'route': '#', 'page_route': '', 'parent_id': 0, 'children': [{ 'id': 5, 'title': '全局配置', 'route': '#', 'page_route': '#', 'parent_id': 1, 'children': [{ 'id': 11, 'title': '数据同步', 'route': '/sync/time', 'page_route': '/event/dataSync', 'parent_id': 5, 'children': [] }] }, { 'id': 6, 'title': '欢迎语管理', 'route': '#', 'page_route': '#', 'parent_id': 1, 'children': [{ 'id': 7, 'title': '成员活码欢迎语', 'route': '/customer_welcome_msgs/group_list', 'page_route': '/system_welcome/iframe/drainage/cw_customer_welcome_msgs', 'parent_id': 6, 'children': [] }, { 'id': 8, 'title': '群欢迎语素材', 'route': '#', 'page_route': '#', 'parent_id': 6, 'children': [] }] }, { 'id': 9, 'title': '事件配置', 'route': '#', 'page_route': null, 'parent_id': 1, 'children': [{ 'id': 2, 'title': '事件任务总览', 'route': '/task/overview_list', 'page_route': '/event/eventTaskOverview', 'parent_id': 9, 'children': [] }, { 'id': 3, 'title': '事件任务', 'route': '/task/list', 'page_route': '/event/eventTask', 'parent_id': 9, 'children': [] }, { 'id': 4, 'title': '事件管理', 'route': '/events', 'page_route': '/event/eventManage', 'parent_id': 9, 'children': [] }] }, { 'id': 32, 'title': '职能管理', 'route': '#', 'page_route': '/system', 'parent_id': 1, 'children': [{ 'id': 33, 'title': '角色与权限管理', 'route': '/authority', 'page_route': '/system/jurisdiction', 'parent_id': 32, 'children': [] }, { 'id': 35, 'title': '组织架构与成员', 'route': '/members', 'page_route': '/system/organization', 'parent_id': 32, 'children': [] }] }, { 'id': 36, 'title': '主体配置', 'route': '#', 'page_route': '/system_subject', 'parent_id': 1, 'children': [{ 'id': 37, 'title': '主体配置', 'route': '/subject', 'page_route': '/system_subject/iframe/tag_subject/data_list', 'parent_id': 36, 'children': [] }] }] }, { 'id': 10, 'title': '营销', 'route': '#', 'page_route': '#', 'parent_id': 0, 'children': [{ 'id': 12, 'title': '成员话术', 'route': '#', 'page_route': '/marketing_memberSpeechcraft', 'parent_id': 10, 'children': [{ 'id': 30, 'title': '成员话术', 'route': '/material_library/list', 'page_route': '/marketing_memberSpeechcraft/memberSpeechcraft', 'parent_id': 12, 'children': [] }] }, { 'id': 13, 'title': '知识库', 'route': '#', 'page_route': '/knowledgeBaseList', 'parent_id': 10, 'children': [{ 'id': 29, 'title': '知识库', 'route': '/material_library/list', 'page_route': '/knowledgeBaseList', 'parent_id': 13, 'children': [] }] }, { 'id': 14, 'title': '标签营销', 'route': '#', 'page_route': '/labelSale', 'parent_id': 10, 'children': [{ 'id': 34, 'title': '标签营销', 'route': '/suggestions_library/list', 'page_route': '/labelSale/labelSale', 'parent_id': 14, 'children': [] }] }, { 'id': 15, 'title': '推荐回复', 'route': '#', 'page_route': '/marketing_reply', 'parent_id': 10, 'children': [{ 'id': 31, 'title': '推荐回复', 'route': '/oss/sale_script/get_sale_script_list', 'page_route': '/marketing_reply/reply', 'parent_id': 15, 'children': [] }] }, { 'id': 16, 'title': '标记引擎', 'route': '#', 'page_route': '#', 'parent_id': 10, 'children': [{ 'id': 17, 'title': '自由标签引擎', 'route': '/tags', 'page_route': '/marketing_engine/iframe/tag_act_record/list', 'parent_id': 16, 'children': [] }] }, { 'id': 18, 'title': '标签库', 'route': '#', 'page_route': '#', 'parent_id': 10, 'children': [{ 'id': 19, 'title': '服务标签库', 'route': '/tags', 'page_route': '/marketing_label/iframe/customer/service_tags', 'parent_id': 18, 'children': [] }, { 'id': 20, 'title': '总部标签库', 'route': '/tags', 'page_route': '/marketing_label/iframe/customer/hq_tags', 'parent_id': 18, 'children': [] }] }, { 'id': 21, 'title': '引流', 'route': '#', 'page_route': '#', 'parent_id': 10, 'children': [{ 'id': 22, 'title': '成员活码', 'route': '/member_code', 'page_route': '/marketing_member/iframe/drainage/member_code', 'parent_id': 21, 'children': [] }] }] }, { 'id': 23, 'title': 'subject_name', 'route': '#', 'page_route': '#', 'parent_id': 0, 'children': [{ 'id': 24, 'title': '客户', 'route': '#', 'page_route': '#', 'parent_id': 23, 'children': [{ 'id': 27, 'title': '企业微信客户', 'route': '#', 'page_route': '#', 'parent_id': 24, 'children': [] }, { 'id': 28, 'title': '泛客户', 'route': '/tag_subject_user/list', 'page_route': '/customer/iframe/customer/user_list', 'parent_id': 24, 'children': [] }] }, { 'id': 25, 'title': '客户群', 'route': '#', 'page_route': '#', 'parent_id': 23, 'children': [{ 'id': 26, 'title': '客户群', 'route': '/operation_get_groupchat_list', 'page_route': '/customerBase/index', 'parent_id': 25, 'children': [] }] }] }, { 'id': 40, 'title': '风控', 'route': '#', 'page_route': '#', 'parent_id': 0, 'children': [{ 'id': 41, 'title': '会话记录', 'route': '#', 'page_route': '/riskControl', 'parent_id': 40, 'children': [{ 'id': 38, 'title': '会话记录', 'route': '#', 'page_route': '/riskControl/conversation', 'parent_id': 41, 'children': [] }] }] }, { 'id': 42, 'title': '应用市场', 'route': '#', 'page_route': '#', 'parent_id': 0, 'children': [{ 'id': 43, 'title': '爆品分销商城', 'route': '#', 'page_route': '/shop', 'parent_id': 42, 'children': [{ 'id': 45, 'title': '商品管理', 'route': '/goods/ajax', 'page_route': '/shop/iframe/mini_shop/goods', 'parent_id': 43, 'children': [] }, { 'id': 46, 'title': '订单管理', 'route': '/orders/ajax', 'page_route': '/shop/iframe/mini_shop/orders', 'parent_id': 43, 'children': [] }, { 'id': 47, 'title': '小程序会员管理', 'route': '/union_customers/ajax', 'page_route': '/shop/iframe/mini_shop/union_customers', 'parent_id': 43, 'children': [] }] }] }]
            let subjectName = getItem('subjectName')
            let subjectIndex = null
            if (menus && menus.length > 0) {
                subjectIndex = menus.findIndex(val => val.title === 'subject_name')
            }
            if (subjectIndex || subjectIndex === 0) {
                if (subjectIndex >= 0 && menus.length > 0) {
                    data.asyncRoutes[0].meta.title = subjectName
                    data.asyncRoutes[0].children[0].meta.parent = subjectName
                    menus[subjectIndex].title = subjectName
                    // menus[subjectIndex].pre_title = 'subject_name'
                }
            }

            accessedRoutes = filterMenu(data.asyncRoutes, menus, 0)
            console.log('asyncRoutes', data.asyncRoutes)
            // ----------本地调试 end-----------
            commit('setRoutes', accessedRoutes)
            commit('setHeaderActived', data.currentPath)
            let routes = []
            accessedRoutes.map(item => {
                routes.push(...item.children)
            })
            // 将三级及以上路由数据拍平成二级
            routes.map(item => {
                if (item.children) {
                    item.children = flatAsyncRoutes(item.children, [{
                        path: item.path,
                        title: item.meta.title,
                        parent: item.meta.parent,
                        parentUrl: item.meta.parentUrl
                    }])
                }
            })
            // route.meta.flatAsyncRoutes
            commit('setDefaultOpenedPaths', routes)
            console.log('routes', routes)
            resolve(routes)

        })
    },
    // 生成路由（后端获取）
    generateRoutesAtBack({ commit }, data) {
        return new Promise(resolve => {
            api.get('route/list', {
                baseURL: '/mock/'
            }).then(res => {
                let accessedRoutes = formatBackRoutes(res.data)
                commit('setRoutes', accessedRoutes)
                commit('setHeaderActived', data.currentPath)
                let routes = []
                accessedRoutes.map(item => {
                    routes.push(...item.children)
                })
                // 将三级及以上路由数据拍平成二级
                routes.map(item => {
                    if (item.children) {
                        item.children = flatAsyncRoutes(item.children, [{
                            path: item.path,
                            title: item.meta.title
                        }])
                    }
                })
                // console.log(route.meta.breadcrumbNeste)
                commit('setDefaultOpenedPaths', routes)
                resolve(routes)
            })
        })
    }
}

const mutations = {
    invalidRoutes(state) {
        state.isGenerate = false
        state.headerActived = 0
    },
    setRoutes(state, routes) {
        state.isGenerate = true // 每次都要重新获取路由
        let newRoutes = deepClone(routes)
        state.routes = newRoutes.filter(item => {
            return item.children.length != 0
        })
    },
    setDefaultOpenedPaths(state, routes) {
        let defaultOpenedPaths = []
        routes.map(item => {
            item.meta.defaultOpened && defaultOpenedPaths.push(item.path)
            item.children && item.children.map(child => {
                child.meta.defaultOpened && defaultOpenedPaths.push(path.resolve(item.path, child.path))
            })
        })
        state.defaultOpenedPaths = defaultOpenedPaths
    },
    // 根据路由判断属于哪个头部导航
    setHeaderActived(state, path) {
        state.routes.map((item, index) => {
            if (
                item.children.some(r => {
                    return path.indexOf(r.path + '/') === 0 || path == r.path
                })
            ) {
                state.headerActived = index
            }
        })
    },
    // 切换头部导航
    switchHeaderActived(state, index) {
        state.headerActived = index
    },
    // 记录 accessRoutes 路由，用于登出时删除路由
    setCurrentRemoveRoutes(state, routes) {
        state.currentRemoveRoutes = routes
    },
    // 清空动态路由
    removeRoutes(state) {
        state.isGenerate = false
        state.currentRemoveRoutes.forEach(removeRoute => {
            removeRoute()
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
