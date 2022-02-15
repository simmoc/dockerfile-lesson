const Layout = () => import('@/layout/index.vue')

const route = [
    {
        path: '/system',
        component: Layout,
        redirect: '/system/organization',
        name: 'system',
        meta: {
            title: '职能管理',
            icon: 'process',
            parent: '基础设置',
            parentUrl: '/system'
        },
        children: [
            {
                path: 'organization',
                name: 'organization',
                component: () => import('@/views/systemSettings/functionManage/organization.vue'),
                meta: {
                    title: '组织架构与成员'
                }
            },
            {
                path: 'jurisdiction',
                name: 'jurisdiction',
                component: () => import('@/views/systemSettings/functionManage/jurisdiction.vue'),
                meta: {
                    title: '角色与权限管理'
                },
                children: [
                    {
                        path: 'addRole',
                        name: 'addRole',
                        component: () => import('@/views/systemSettings/functionManage/addRole.vue'),
                        meta: {
                            title: '添加角色',
                            sidebar: false,
                            breadcrumb: true,
                            activeMenu: '/system/jurisdiction'
                        }
                    },
                    {
                        path: 'editRole',
                        name: 'editRole',
                        component: () => import('@/views/systemSettings/functionManage/addRole.vue'),
                        meta: {
                            title: '编辑角色',
                            sidebar: false,
                            breadcrumb: true,
                            activeMenu: '/system/jurisdiction'
                        }
                    },
                    {
                        path: 'checkRole',
                        name: 'checkRole',
                        component: () => import('@/views/systemSettings/functionManage/addRole.vue'),
                        meta: {
                            title: '查看权限',
                            sidebar: false,
                            breadcrumb: true,
                            activeMenu: '/system/jurisdiction'
                        }
                    }
                ]
            }
        ]
    },

    {
        path: '/system_subject',
        component: Layout,
        redirect: '/system_subject/iframe/tag_subject/data_list',
        name: 'system-subject',
        meta: {
            title: '主体配置',
            icon: 'main',
            parent: '基础设置',
            parentUrl: '/system'
        },
        children: [
            {
                path: 'iframe/tag_subject/data_list',
                name: 'iframe-tag-subject-data-list',
                component: () => import('@/components/Iframe/inline-iframe.vue'),
                meta: {
                    title: '主体配置',
                    iframeSrc:
                    '/tag_subjects/list?token=' + window.localStorage.getItem('token'),
                    sidebar: false,
                    activeMenu: '/system_subject'
                }
            }
        ]
    },

    {
        path: '/event',
        component: Layout,
        name: 'event',
        meta: {
            title: '事件配置',
            icon: 'event',
            parent: '基础设置',
            parentUrl: '/system'
        },
        children: [

            // {
            //     path: 'eventTaskOverview',
            //     name: 'eventTaskOverview',
            //     // component: () => import('@/views/systemSettings/eventTask/overview/index.vue'),
            //     component: () => import('@/views/systemSettings/eventTask/overview/index.vue'),
            //     meta: {
            //         title: '事件任务总览'
            //     }
            // },
            {
                path: 'eventManage',
                name: 'eventManage',
                component: () => import('@/views/systemSettings/eventManage/list/index.vue'),
                meta: {
                    title: '事件管理'
                },
                children: [
                    {
                        path: 'eventAdd',
                        name: 'eventAdd',
                        component: () => import('@/views/systemSettings/eventManage/edit/edit.vue'),
                        meta: {
                            title: '新增自定义事件',
                            sidebar: false,
                            breadcrumb: true,
                            activeMenu: '/event/eventManage'
                        }
                    },
                    {
                        path: 'eventEdit',
                        name: 'eventEdit',
                        component: () => import('@/views/systemSettings/eventManage/edit/edit.vue'),
                        meta: {
                            title: '编辑自定义事件',
                            sidebar: false,
                            breadcrumb: true,
                            activeMenu: '/event/eventManage'
                        }
                    },
                    {
                        path: 'eventRecord',
                        name: 'eventRecord',
                        component: () => import('@/views/systemSettings/eventManage/record/index.vue'),
                        meta: {
                            title: '历史事件',
                            sidebar: false,
                            breadcrumb: true,
                            activeMenu: '/event/eventManage'
                        }
                    }
                ]
            }
            // {
            //     path: 'eventTask',
            //     name: 'eventTask',
            //     component: () => import('@/views/systemSettings/eventTask/list/index.vue'),
            //     meta: {
            //         title: '事件任务'
            //     },
            //     children: [
            //         {
            //             path: 'addEvent',
            //             name: 'addEvent',
            //             component: () => import('@/views/systemSettings/eventTask/edit/edit.vue'),
            //             meta: {
            //                 title: '新增事件任务',
            //                 sidebar: false,
            //                 breadcrumb: true,
            //                 activeMenu: '/event/eventTask'
            //             }
            //         },
            //         {
            //             path: 'editEvent',
            //             name: 'editEvent',
            //             component: () => import('@/views/systemSettings/eventTask/edit/edit.vue'),
            //             meta: {
            //                 title: '编辑事件任务',
            //                 sidebar: false,
            //                 breadcrumb: true,
            //                 activeMenu: '/event/eventTask'
            //             }
            //         },
            //         {
            //             path: 'taskDetail',
            //             name: 'eventDetail',
            //             component: () => import('@/views/systemSettings/eventTask/edit/edit.vue'),
            //             meta: {
            //                 title: '事件任务详情',
            //                 sidebar: false,
            //                 breadcrumb: true,
            //                 activeMenu: '/event/eventTask'
            //             }
            //         }
            //     ]
            // }
        ]
    },
    {
        path: '/globalSetting',
        component: Layout,
        name: 'globalSetting',
        meta: {
            title: '全局配置',
            icon: 'setting',
            parent: '基础设置',
            parentUrl: '/system'
        },
        children: [
            {
                path: 'dataSync',
                name: 'dataSync',
                component: () => import('@/views/systemSettings/event/dataSync.vue'),
                meta: {
                    title: '数据同步'
                }
            }
        ]
    },
    {
        path: '/system_welcome',
        component: Layout,
        name: 'system-welcome',
        meta: {
            title: '欢迎语管理',
            icon: 'welcome',
            parent: '基础设置',
            parentUrl: '/system'
        },
        children: [
            {
                path: 'iframe/drainage/cw_customer_welcome_msgs',
                name: 'iframe-drainage-cw_customer_welcome_msgs',
                component: () => import('@/components/Iframe/inline-iframe.vue'),
                meta: {
                    title: '欢迎语配置',
                    iframeSrc: '/cw_customer_welcome_msgs'
                }
            }
        ]
    }
    // {
    //     path: '/breadcrumb_example',
    //     component: Layout,
    //     redirect: '/breadcrumb_example/list1',
    //     name: 'breadcrumbExample',
    //     meta: {
    //         title: '全局配置',
    //         icon: 'sidebar-breadcrumb'
    //     },
    //     children: [
    //         {
    //             path: 'list1',
    //             name: 'breadcrumbExampleList1',
    //             component: () => import('@/views/breadcrumb_example/list1.vue'),
    //             meta: {
    //                 title: '组织架构与成员'
    //             }
    //         },
    //         {
    //             path: 'detail1',
    //             name: 'breadcrumbExampleDetail1',
    //             component: () => import('@/views/breadcrumb_example/detail1.vue'),
    //             meta: {
    //                 title: '角色与权限管理',
    //                 activeMenu: '/breadcrumb_example/list1',
    //                 children: [
    //                     {
    //                         path: '',
    //                         component: () => import('@/views/breadcrumb_example/list2.vue'),
    //                         meta: {
    //                             title: '列表2（层级模式）',
    //                             sidebar: false,
    //                             breadcrumb: false
    //                         }
    //                     },
    //                     {
    //                         path: 'detail2',
    //                         name: 'breadcrumbExampleDetail2',
    //                         component: () => import('@/views/breadcrumb_example/detail2.vue'),
    //                         meta: {
    //                             title: '详情2',
    //                             sidebar: false,
    //                             activeMenu: '/breadcrumb_example/list2'
    //                         }
    //                     }
    //                 ]
    //             }
    //         },
    //     ]
    // },
    // {
    //     path: '/breadcrumb_example',
    //     component: Layout,
    //     redirect: '/breadcrumb_example/list1',
    //     name: 'breadcrumbExample',
    //     meta: {
    //         title: '欢迎语配置',
    //         icon: 'sidebar-breadcrumb'
    //     },
    //     children: [
    //         {
    //             path: 'list1',
    //             name: 'breadcrumbExampleList1',
    //             component: () => import('@/views/breadcrumb_example/list1.vue'),
    //             meta: {
    //                 title: '组织架构与成员'
    //             }
    //         },
    //         {
    //             path: 'detail1',
    //             name: 'breadcrumbExampleDetail1',
    //             component: () => import('@/views/breadcrumb_example/detail1.vue'),
    //             meta: {
    //                 title: '角色与权限管理',
    //                 activeMenu: '/breadcrumb_example/list1',
    //                 children: [
    //                     {
    //                         path: '',
    //                         component: () => import('@/views/breadcrumb_example/list2.vue'),
    //                         meta: {
    //                             title: '列表2（层级模式）',
    //                             sidebar: false,
    //                             breadcrumb: false
    //                         }
    //                     },
    //                     {
    //                         path: 'detail2',
    //                         name: 'breadcrumbExampleDetail2',
    //                         component: () => import('@/views/breadcrumb_example/detail2.vue'),
    //                         meta: {
    //                             title: '详情2',
    //                             sidebar: false,
    //                             activeMenu: '/breadcrumb_example/list2'
    //                         }
    //                     }
    //                 ]
    //             }
    //         },
    //     ]
    // },
]
export default route
