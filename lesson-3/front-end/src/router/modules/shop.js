const Layout = () => import('@/layout/index.vue')

export default {
    path: '/shop',
    component: Layout,
    redirect: '/shop/iframe/mini_shop/goods',
    name: 'shop',
    meta: {
        title: '爆品分销商城',
        icon: 'shopping',
        parent: '应用市场',
        parentUrl: '/shop'
    },
    children: [
        {
            path: 'iframe/mini_shop/goods',
            name: 'iframe-mini_shop-goods',
            component: () => import('@/components/Iframe/inline-iframe.vue'),
            meta: {
                title: '商品管理',
                iframeSrc: '/goods'
                // iframeName: '商品管理'
            }
        },
        {
            path: 'iframe/mini_shop/orders',
            name: 'iframe-iframe-mini_shop-orders',
            component: () => import('@/components/Iframe/inline-iframe.vue'),
            meta: {
                title: '订单管理',
                iframeSrc: '/orders'
            }
        },
        {
            path: 'iframe/mini_shop/union_customers',
            name: 'iframe-iframe-mini_shop-union_customers',
            component: () => import('@/components/Iframe/inline-iframe.vue'),
            meta: {
                title: '小程序会员管理',
                iframeSrc: '/union_customers'
            }
        }
    ]
}
