const Layout = () => import('@/layout/index.vue')

export default {
    path: '/riskControl',
    component: Layout,
    redirect: '/riskControl/conversation',
    name: 'riskControl',
    meta: {
        title: '会话记录',
        icon: 'conversazione',
        parent: '风控',
        parentUrl: '/riskControl'
    },
    children: [
        {
            path: 'conversation',
            name: 'conversation',
            component: () => import('@/views/riskControl/conversation/index.vue'),
            meta: {
                title: '会话记录',
                sidebar: false,
                activeMenu: '/riskControl'
            }
        }
    ]
}
