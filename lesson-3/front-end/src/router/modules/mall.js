const Layout = () => import('@/layout/index.vue')

const route = [
    {
        path: '/integelMall',
        component: Layout,
        redirect: '/integelMall/goodsManage',
        name: 'integelMall',
        meta: {
            title: '商品管理',
            icon: 'goods',
            parent: '积分商城',
            parentUrl: '/integelMall'
        },
        children: [
            {
                path: 'goodsManage',
                name: 'goodsManage',
                component: () => import('@/views/integel_mall/goodsManage/index.vue'),
                meta: {
                    title: '商品管理',
                    sidebar: false,
                    activeMenu: '/integelMall'
                },
                children: [
                    {
                        path: 'addGoods',
                        name: 'addGoods',
                        component: () => import('@/views/integel_mall/goodsManage/edit.vue'),
                        meta: {
                            title: '添加商品',
                            sidebar: false,
                            breadcrumb: true,
                            activeMenu: '/integelMall'
                        }
                    },
                    {
                        path: 'editGoods',
                        name: 'editGoods',
                        component: () => import('@/views/integel_mall/goodsManage/edit.vue'),
                        meta: {
                            title: '编辑商品',
                            sidebar: false,
                            breadcrumb: true,
                            activeMenu: '/integelMall'
                        }
                    }
                ]
            }
        ]
    },
    
    {
        path: '/orderManage',
        name: 'orderManage',
        redirect: '/orderManage/expressOrder',
        component: Layout,
        meta: {
            title: '订单管理',
            icon: 'order',
            parent: '积分商城',
            parentUrl: '/orderManage'
        },
        children: [
            {
                path: 'expressOrder',
                name: 'expressOrder',
                component: () => import('@/views/integel_mall/order/express/index.vue'),
                meta: {
                    title: '快递订单'
                    // sidebar: false,
                    // activeMenu: '/orderManage'
                },
                children: [
                    {
                        name: 'expressOrderDetail',
                        path: 'expressOrderDetail',
                        component: () => import('@/views/integel_mall/order/express/detail.vue'),
                        meta: {
                            title: '订单详情页',
                            sidebar: false,
                            activeMenu: '/orderManage/expressOrder'
                        }
                    }
                ]
            },
            {
                path: 'storeOrder',
                name: 'storeOrder',
                component: () => import('@/views/integel_mall/order/store/index.vue'),
                meta: {
                    title: '到店订单'
                },
                children: [
                    {
                        name: 'storeOrderDetail',
                        path: 'storeOrderDetail',
                        component: () => import('@/views/integel_mall/order/store/detail.vue'),
                        meta: {
                            title: '订单详情页',
                            sidebar: false,
                            activeMenu: '/orderManage/storeOrder'
                        }
                    }
                ]
            }
        ]
    },
    
    {
        path: '/rotationManage',
        component: Layout,
        redirect: '/rotationManage/rotationManage',
        name: 'rotationManage',
        meta: {
            title: '轮播图管理',
            icon: 'r_images',
            parent: '积分商城',
            parentUrl: '/rotationManage'
        },
        children: [
            {
                path: 'rotationManage',
                name: 'rotationManage',
                component: () => import('@/views/integel_mall/rotationManage/index.vue'),
                meta: {
                    title: '轮播图管理',
                    sidebar: false,
                    activeMenu: '/rotationManage'
                },
                children: [
                    {
                        path: 'editRotation',
                        name: 'editRotation',
                        component: () => import('@/views/integel_mall/rotationManage/edit.vue'),
                        meta: {
                            title: '编辑轮播图',
                            sidebar: false,
                            breadcrumb: true,
                            activeMenu: '/rotationManage'
                        }
                    },
                    {
                        path: 'addRotation',
                        name: 'addRotation',
                        component: () => import('@/views/integel_mall/rotationManage/edit.vue'),
                        meta: {
                            title: '添加轮播图',
                            sidebar: false,
                            breadcrumb: true,
                            activeMenu: '/rotationManage'
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/serviceManage',
        name: 'serviceManage',
        component: Layout,
        redirect: '/serviceManage/serviceList',
        meta: {
            title: '客服管理',
            icon: 'service',
            parent: '积分商城',
            parentUrl: '/serviceManage'
        },
        children: [
            {
                path: 'serviceList',
                name: 'serviceList',
                component: () => import('@/views/integel_mall/service/index.vue'),
                meta: {
                    title: '客服管理',
                    sidebar: false,
                    activeMenu: '/serviceManage'
                },
                children: [
                    {
                        path: 'memberCodeEdit',
                        name: 'iframe-service-memberCodeEdit',
                        component: () => import('@/components/Iframe/inline-iframe.vue'),
                        meta: {
                            title: '编辑活码',
                            iframeSrc:
                                `/member_code/detail?${window.localStorage.getItem('menberEditParams')}&token=${window.localStorage.getItem('token')}`,
                            iframeName: '编辑活码',
                            activeMenu: '/serviceManage'
                        },
                        beforeEnter: (to, from, next) => {
                            to.meta.iframeSrc = `/member_code/detail?${to.query.params}&token=${window.localStorage.getItem('token')}`
                            // console.log('附件到恪守妇道', to)
                            next()
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/integelManage',
        name: 'integelManage',
        component: Layout,
        redirect: '/integelManage/integelList',
        meta: {
            title: '积分管理',
            icon: 'integel',
            parent: '积分商城',
            parentUrl: '/integelManage'
        },
        children: [
            {
                path: 'integelList',
                name: 'integelList',
                component: () => import('@/views/integel_mall/integelManage/index.vue'),
                meta: {
                    title: '积分管理',
                    sidebar: false,
                    activeMenu: '/integelManage'
                }
            }
        ]
    }
]

export default route