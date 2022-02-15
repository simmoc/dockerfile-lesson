import { createRouter, createWebHashHistory } from 'vue-router'
// import {  h } from 'vue'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style
import path from 'path-browserify'
// import { deepClone } from '@/util'
// 固定路由
const constantRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/qrLogin',
        name: 'qrLogin',
        component: () => import('@/views/qrlogin.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/setting.vue'),
        meta: {
            title: '实施配置'
        }
    },
    {
        path: '/init',
        name: 'init',
        component: () => import('@/views/init.vue'),
        meta: {
            title: '初始化'
        }
    },
    {
        path: '/',
        redirect: '/dashboard',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/views/index.vue'),
                meta: {
                    title: '首页'
                }
            },
            {
                path: 'personal/setting',
                name: 'personalSetting',
                component: () => import('@/views/personal/setting.vue'),
                meta: {
                    title: '个人设置',
                    breadcrumbNeste: [
                        { title: '个人设置', path: '/personal/setting' }
                    ]
                }
            },
            {
                path: 'personal/edit/password',
                name: 'personalEditPassword',
                component: () => import('@/views/personal/edit.password.vue'),
                meta: {
                    title: '修改密码',
                    breadcrumbNeste: [
                        { title: '修改密码', path: '/personal/edit/password' }
                    ]
                }
            },
            {
                path: 'reload',
                name: 'reload',
                component: () => import('@/views/reload.vue')
            }
        ]
    }
]

// import MultilevelMenuExample from './modules/multilevel.menu.example'
// import BreadcrumbExample from './modules/breadcrumb.example'
import System from './modules/system'
import customer from './modules/customer'
import marketing from './modules/marketing'
import riskControl from './modules/riskControl'
import shop from './modules/shop'
// import Mall from './modules/mall'

// import dataTotal from './modules/dataTotal'
// import { setItem } from '@/util/storage'
// function defaultComponent(component) {
//     return {
//         comp: component,
//         name: 'routeReplaceSelf',
//         computed: {
//         },
//         render() {
//             // defineAsyncComponent 创建一个在需要时才会加载的异步组件
//             // 若不同 则渲染 当前路由所对应的页面   若相同则渲染当前
//             return h('router-view')
//         }
//     }
// }
// 动态路由（异步路由、导航栏路由）
const asyncRoutes = [
    {
        meta: {
            title: '客户',
            icon: 'customer',
            activeMenu: '/customer'
        },
        children: customer
    },
    {
        meta: {
            title: '营销',
            icon: 'sale'
        },
        children: marketing
    },
    {
        meta: {
            title: '风控',
            icon: 'risk'
        },
        children: [
            riskControl
        ]
    },
    {
        meta: {
            title: '应用市场',
            icon: 'market'
        },
        children: [
            shop
        ]
    },
    // {
    //     meta: {
    //         title: '积分商城',
    //         icon: 'mall'
    //     },
    //     children: Mall
        
    // },
    // {
    //     meta: {
    //         title: '数据统计',
    //         icon: 'sale'
    //     },
    //     children: [
    //         dataTotal
    //     ]
    // },
    {
        meta: {
            title: '基础设置',
            icon: 'system'
        },
        children: System
    }
]

const lastRoute = {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    component: () => import('@/layout/index.vue'),
    children: [
        {
            path: '/404',
            name: 'init',
            component: () => import('@/views/404.vue'),
            meta: {
                title: '找不到页面'
            }
        }
    ]
}

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})
// let isPermission = false
// function getPermission(arr, obj) {
//     if (arr.length) {
//         arr.map(v => {
//             if (v.path == obj.name) {
//                 isPermission = true
//             }
//             if (v.children) {
//                 getPermission(v.children, obj)
//             }
//         })
//     }
// }
// getPermission()
// console.log(isPermission)
// const testArr = routers => {
//     const resArr = routers.find(item => item.meta.title == '客户').children
//     const filterArr = resArr.find(item => item.meta.title == '客户').children
//     const filter = filterArr.find(item => item.name == 'weChatCustomer')
//     filter.path = filter.path.split(':')[0] + '456'
//     const filterObj = deepClone(filterArr.find(item => item.name == 'weChatCustomer'))
//     filterObj.path = filterObj.path.split(':')[0] + '123'
//     filterArr.push(filterObj)
//     return routers
// }
router.beforeEach(async(to, from, next) => {
    console.log('去哪', to)
    store.state.settings.enableProgress && NProgress.start()
    console.log('isGenerate', store.state.menu.isGenerate)
    // 已经登录，但还没根据权限动态生成并挂载路由
    if (store.getters['user/isLogin'] && !store.state.menu.isGenerate) {
        console.log('有isGenerate？', store.state.menu.isGenerate)
        let accessRoutes = []
        // enableBackendReturnRoute 是否开始后端返回的数据 现在为false
        if (!store.state.settings.enableBackendReturnRoute) {
            accessRoutes = await store.dispatch('menu/generateRoutesAtFront', {
                asyncRoutes,
                currentPath: to.path
            })
        } else {
            accessRoutes = await store.dispatch('menu/generateRoutesAtBack', {
                currentPath: to.path
            })
        }
        accessRoutes.push(lastRoute)
        let removeRoutes = []
        accessRoutes.forEach(route => {
            removeRoutes.push(router.addRoute(route))
        })
        // let arr = testArr(deepClone(store.state.menu.routes))
        // store.commit('menu/setRoutes', arr)
        // console.log('accessRoutes 最后的', accessRoutes, router)
        // 记录的 accessRoutes 路由数据，在登出时会使用到，不使用 router.removeRoute 是考虑配置的路由可能不一定有设置 name ，则通过调用 router.addRoute() 返回的回调进行删除
        store.commit('menu/setCurrentRemoveRoutes', removeRoutes)
        next({ ...to, replace: true })
    } else {
        if (store.state.menu.isGenerate && store.state.settings.menuMode !== 'single') {
            store.commit('menu/setHeaderActived', to.path)
        }
        console.log(store.getters['user/isLogin'])
        // 增加判断是否已初始化
        if (store.getters['user/isLogin'] && store.getters['user/isInit']) {
            if (to.name) {
                if (to.matched.length !== 0) {
                    // 如果已登录状态下，进入登录页会强制跳转到控制台页面
                    if (to.name == 'login' || to.name == 'qrLogin') {
                        next({
                            name: 'dashboard',
                            replace: true
                        })
                    } else if (!store.state.settings.enableDashboard && to.name == 'dashboard') {
                        // 如果未开启控制台页面，则默认进入侧边栏导航第一个模块
                        if (store.getters['menu/sidebarRoutes'].length > 0) {
                            // 此处没有使用 store.getters['menu/sidebarRoutes'][0].path 直接进行跳转是因为会有个隐性 bug ，即当父级路由如果设置了 redirect ，而 redirect 对应的嵌套子路由由于没有权限导致没有被注册，此时则会无限进入 404 页面
                            let getDeepestPath = (routes, rootPath = '', level) => {
                                let retnPath
                                if (routes.children && level < 1) {
                                    if (
                                        routes.children.some(item => {
                                            return item.meta.sidebar != false
                                        })
                                    ) {
                                        for (let i = 0; i < routes.children.length; i++) {
                                            if (routes.children[i].meta.sidebar != false) {
                                                retnPath = getDeepestPath(routes.children[i], path.resolve(rootPath, routes.path), ++level)
                                                break
                                            }
                                        }
                                    } else {
                                        retnPath = getDeepestPath(routes.children[0], path.resolve(rootPath, routes.path), ++level)
                                    }
                                } else {
                                    retnPath = path.resolve(rootPath, routes.path)
                                }
                                return retnPath
                            }
                            next({
                                path: getDeepestPath(store.getters['menu/sidebarRoutes'][0], '', 0),
                                replace: true
                            })
                        } else {
                            next()
                        }
                    } else {
                        next()
                    }
                } else {
                    // 如果是通过 name 跳转，并且 name 对应的路由没有权限时，需要做这步处理，手动指向到 404 页面
                    store.dispatch('user/logout')
                    next({
                        path: '/qrLogin'
                    })
                }
            } else {
                next()
            }
        } else if (to.path === '/init') {
            next()
        } else {
            // isLogin=false 过期了 且isInit=false 且跳转的不是init
            if (to.name !== 'login' && to.name !== 'setting' && to.name !== 'qrLogin') {
                next({
                    name: 'qrLogin',
                    query: {
                        redirect: to.fullPath
                    }
                })
            } else {
                next()
            }
        }
    }
})

router.afterEach((to, from) => {
    store.state.settings.enableProgress && NProgress.done()
    // 设置页面 title
    to.meta.title && store.commit('settings/setTitle', typeof to.meta.title === 'function' ? to.meta.title() : to.meta.title)
    // 判断当前页面是否开启缓存，如果开启，则将当前页面的 name 信息存入 keep-alive 全局状态
    if (to.meta.cache) {
        let componentName = to.matched[to.matched.length - 1].components.default.name
        if (componentName) {
            to.matched.forEach(item => {
                if (item.components.default.name && item.components.default.name != 'Layout') {
                    store.commit('keepAlive/add', item.components.default.name)
                }
            })
        } else {
            console.warn('该页面组件未设置组件名，会导致缓存失效，请检查')
        }
    }
    // 判断离开页面是否开启缓存，如果开启，则根据缓存规则判断是否需要清空 keep-alive 全局状态里离开页面的 name 信息
    if (from.meta.cache) {
        let componentName = from.matched[from.matched.length - 1].components.default.name
        // 通过 meta.cache 判断针对哪些页面进行缓存
        switch (typeof from.meta.cache) {
            case 'string':
                if (from.meta.cache != to.name) {
                    store.commit('keepAlive/remove', componentName)
                }
                break
            case 'object':
                if (!from.meta.cache.includes(to.name)) {
                    store.commit('keepAlive/remove', componentName)
                }
                break
        }
        // 如果进入的是 reload 页面，则也将离开页面的缓存清空
        if (to.name == 'reload') {
            store.commit('keepAlive/remove', componentName)
        }
    }
})

export default router
