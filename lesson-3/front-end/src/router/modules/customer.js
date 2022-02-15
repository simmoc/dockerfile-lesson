const Layout = () => import('@/layout/index.vue')

const route = [
    {
        path: '/customer',
        component: Layout,
        redirect: '/customer/iframe/customer/user_list',
        name: 'customer',
        meta: {
            title: '客户',
            icon: 'member',
            parent: '客户',
            activeMenu: '/customer',
            parentUrl: '/customer'
        },
        children: [
            {
                path: 'iframe/customer/user_list',
                name: 'iframe-customer-user-list',
                component: () => import('@/components/Iframe/inline-iframe.vue'),
                meta: {
                    title: '泛客户',
                    iframeSrc:
                    '/tag_subject_user/list?token=' + window.localStorage.getItem('token'),
                    iframeName: '泛客户',
                    icon: 'rectangle',
                    activeMenu: '/customer/iframe/customer/user_list'
                }
            },
            {
                path: 'weChatCustomer',
                name: 'weChatCustomer',
                component: () => import('@/views/customer/customer/weChatCustomer.vue'),
                meta: {
                    title: '企业微信客户',
                    parent: '客户',
                    sidebar: true,
                    icon: 'weChat',
                    activeMenu: '/customer/weChatCustomer'
                },
                children: [
                    {
                        path: 'weChatCustomerDetail',
                        name: 'weChatCustomerDetail',
                        component: () => import('@/views/customer/customer/weChatCustomerDetail.vue'),
                        meta: {
                            title: '客户详情页',
                            sidebar: false,
                            activeMenu: '/customer/weChatCustomer'
                        }
                    }
                ]
            },
            {
                path: 'businessCustomer',
                name: 'businessCustomer',
                component: () => import('@/views/customer/customer/businessCustomer/businessCustomer.vue'),
                meta: {
                    title: '业务客户',
                    parent: '客户',
                    sidebar: true,
                    icon: 'business',
                    activeMenu: '/customer/businessCustomer'
                }
            }
        ]
    },

    {
        path: '/customerBase',
        name: 'customerBase',
        component: Layout,
        redirect: '/customerBase/index',
        meta: {
            title: '客户群',
            parent: '客户',
            icon: 'client_group',
            parentUrl: '/customer'
        },
        children: [
            {
                path: 'index',
                name: 'customerBaseIndex',
                component: () => import('@/views/customer/customerBase/index.vue'),
                meta: {
                    title: '客户群',
                    icon: 'client_group',
                    parent: '客户',
                    // parentUrl: '/customer',
                    sidebar: false,
                    activeMenu: '/customerBase/index'
                },
                children: [
                    {
                        path: 'detail',
                        name: 'customerBaseDetail',
                        component: () => import('@/views/customer/customerBase/detail.vue'),
                        meta: {
                            title: '客户群详情页',
                            sidebar: false,
                            activeMenu: '/customerBase/index'
                        }
                    }
                ]
            }
        ]
    }
]

export default route
