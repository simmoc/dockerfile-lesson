const Layout = () => import('@/layout/index.vue')

const route = [
    {
        path: '/marketing_engine',
        component: Layout,
        redirect: '/marketing_engine/iframe/tag_act_record/list',
        name: 'marketing-engine',
        meta: {
            title: '标记引擎',
            icon: 'mark',
            parent: '营销',
            parentUrl: '/marketing_engine'
        },
        children: [
            {
                path: 'iframe/tag_act_record/list',
                name: 'iframe-tag-act-record-list',
                component: () => import('@/components/Iframe/inline-iframe.vue'),
                meta: {
                    title: '自由标签引擎',
                    iframeSrc: '/tag_act_records?token=' + window.localStorage.getItem('token')
                    // iframeName: '自由标签'
                }
            }
        ]
    },

    {
        path: '/marketing_label',
        component: Layout,
        redirect: '/marketing_label/iframe/customer/service_tags',
        name: 'marketing-label',
        meta: {
            title: '标签库',
            icon: 'label',
            parent: '营销',
            parentUrl: '/marketing_engine'
        },
        children: [
            {
                path: 'iframe/customer/service_tags',
                name: 'iframe-customer-service_tags',
                component: () => import('@/components/Iframe/inline-iframe.vue'),
                meta: {
                    title: '服务标签库',
                    iframeSrc: '/tags?type=SERVICE'
                }
            },
            {
                path: 'iframe/customer/hq_tags',
                name: 'iframe-customer-hq_tags',
                component: () => import('@/components/Iframe/inline-iframe.vue'),
                meta: {
                    title: '总部标签库',
                    iframeSrc: '/tags?type=HQ'
                }
            }
        ]
    },

    {
        path: '/marketing_member',
        component: Layout,
        redirect: '/marketing_member/iframe/drainage/member_code',
        name: 'marketing-member',
        meta: {
            title: '引流',
            icon: 'drenaggio',
            parent: '营销',
            parentUrl: '/marketing_engine'
        },
        children: [
            {
                path: 'iframe/drainage/member_code',
                name: 'iframe-drainage-member_code',
                component: () => import('@/components/Iframe/inline-iframe.vue'),
                meta: {
                    title: '成员活码',
                    iframeSrc: '/member_code'
                    // iframeName: '自由标签'
                }
            }
        ]
    },

    {
        path: '/marketing_memberSpeechcraft',
        component: Layout,
        redirect: '/marketing_memberSpeechcraft/memberSpeechcraft',
        name: 'marketing-memberSpeechcraft',
        meta: {
            title: '成员话术',
            icon: 'Intervento',
            parent: '营销',
            parentUrl: '/marketing_engine'
        },
        children: [
            {
                path: 'memberSpeechcraft',
                name: 'memberSpeechcraft',
                component: () => import('@/views/marketing/memberSpeechcraft/index.vue'),
                meta: {
                    title: '成员话术',
                    sidebar: false,
                    activeMenu: '/marketing_memberSpeechcraft'
                }
            }
        ]
    },

    {
        path: '/marketing_reply',
        component: Layout,
        redirect: '/marketing_reply/reply',
        name: 'marketing-reply',
        meta: {
            title: '推荐回复',
            icon: 'reply',
            parent: '营销',
            parentUrl: '/marketing_engine'
        },
        children: [
            {
                path: 'reply',
                name: 'reply',
                component: () => import('@/views/marketing/reply/index.vue'),
                meta: {
                    title: '推荐回复',
                    sidebar: false,
                    activeMenu: '/marketing_reply'
                },
                children: [
                    {
                        path: 'edit',
                        name: 'marketing-reply_Edit',
                        component: () => import('@/views/marketing/reply/edit.vue'),
                        meta: {
                            title: '编辑推荐回复',
                            sidebar: false,
                            activeMenu: '/marketing_reply'
                        }
                    }
                ]
            }
        ]
    },

    {
        path: '/labelSale',
        component: Layout,
        redirect: '/labelSale/labelSale',
        name: 'labelSale',
        meta: {
            title: '标签营销',
            icon: 'label_sale',
            parent: '营销',
            parentUrl: '/marketing_engine'
        },
        children: [
            {
                path: 'labelSale',
                name: 'labelSale',
                component: () => import('@/views/market/labelSale/index.vue'),
                meta: {
                    title: '标签营销',
                    sidebar: false,
                    activeMenu: '/labelSale'
                },
                children: [
                    {
                        path: 'labelSaleAdd',
                        name: 'labelSaleAdd',
                        component: () => import('@/views/market/labelSale/addLabelSale.vue'),
                        meta: {
                            title: '添加标签营销',
                            sidebar: false,
                            activeMenu: '/labelSale'
                        }
                    },
                    {
                        path: 'labelSaleEdit',
                        name: 'labelSaleEdit',
                        component: () => import('@/views/market/labelSale/addLabelSale.vue'),
                        meta: {
                            title: '编辑标签营销',
                            sidebar: false,
                            activeMenu: '/labelSale'
                        }
                    }
                ]
            }
        ]
    },

    {
        path: '/knowledgeBaseList',
        component: Layout,
        redirect: '/knowledgeBaseList/knowledgeBaseList',
        name: 'knowledgeBaseList',
        meta: {
            title: '知识库',
            icon: 'knowledge',
            parent: '营销',
            parentUrl: '/marketing_engine'
        },
        children: [
            {
                path: 'knowledgeBaseList',
                name: 'knowledgeBaseList',
                component: () => import('@/views/market/knowledge/index.vue'),
                meta: {
                    title: '知识库',
                    sidebar: false,
                    activeMenu: '/knowledgeBaseList'
                },
                children: [
                    {
                        path: 'knowledgeAdd',
                        name: 'knowledgeAdd',
                        component: () => import('@/views/market/knowledge/addKnowledge.vue'),
                        meta: {
                            title: '添加知识库',
                            sidebar: false,
                            activeMenu: '/knowledgeBaseList'
                        }
                    },
                    {
                        path: 'knowledgeEdit',
                        name: 'knowledgeEdit',
                        component: () => import('@/views/market/knowledge/addKnowledge.vue'),
                        meta: {
                            title: '编辑知识库',
                            sidebar: false,
                            activeMenu: '/knowledgeBaseList'
                        }
                    }
                ]
            }
        ]
    },

    {
        path: '/marketing_task',
        component: Layout,
        redirect: '/marketing_task/calendar',
        name: 'marketing_task',
        meta: {
            title: '任务中心',
            icon: 'calendar',
            parent: '营销',
            parentUrl: '/marketing_task'
        },
        children: [
            {
                path: 'calendar',
                name: 'calendar',
                component: () => import('@/views/marketing/task/index.vue'),
                meta: {
                    title: '任务日历'
                },
                children: [
                    // {
                    //     path: 'manualAdd',
                    //     name: 'manualAdd',
                    //     component: () => import('@/views/marketing/task/addManual.vue'),
                    //     meta: {
                    //         title: '新建手工任务',
                    //         sidebar: false,
                    //         activeMenu: '/marketing_task'
                    //     }
                    // },
                    {
                        path: 'planAdd',
                        name: 'planAdd',
                        component: () => import('@/views/marketing/task/addPlan.vue'),
                        meta: {
                            title: '新建任务',
                            sidebar: false,
                            activeMenu: '/marketing_task'
                        }
                    },
                    {
                        path: 'planDetail',
                        name: 'planDetail',
                        component: () => import('@/views/marketing/task/planDetail.vue'),
                        meta: {
                            title: '计划任务详情',
                            sidebar: false,
                            activeMenu: '/marketing_task'
                        }
                    },
                    // {
                    //     path: 'manualDetail',
                    //     name: 'manualDetail',
                    //     component: () => import('@/views/marketing/task/manualDetail.vue'),
                    //     meta: {
                    //         title: '计划任务详情',
                    //         sidebar: false,
                    //         activeMenu: '/marketing_task'
                    //     }
                    // },
                    {
                        path: 'ImplementDetail',
                        name: 'ImplementDetail',
                        component: () => import('@/views/marketing/task/ImplementDetail.vue'),
                        meta: {
                            title: '执行任务详情',
                            sidebar: false,
                            activeMenu: '/marketing_task'
                        }
                    },
                    // {
                    //     path: 'editHandTask',
                    //     name: 'editHandTask',
                    //     component: () => import('@/views/marketing/task/addManual.vue'),
                    //     meta: {
                    //         title: '编辑手工任务',
                    //         sidebar: false,
                    //         activeMenu: '/marketing_task'
                    //     }
                    // },
                    {
                        path: 'editPlanTask',
                        name: 'editPlanTask',
                        component: () => import('@/views/marketing/task/addPlan.vue'),
                        meta: {
                            title: '编辑任务',
                            sidebar: false,
                            activeMenu: '/marketing_task'
                        }
                    }
                ]
            },
            {
                path: 'iframe/cw_message_group_send/detail',
                name: 'iframe-group-send-code-detail',
                component: () => import('@/components/Iframe/inline-iframe.vue'),
                meta: {
                    title: '查看结果',
                    iframeSrc: 'https://control-workwechat-k8s.test.freshgood.cn/cw_message_group_send/detail?type=result&id=443'
                    // iframeName: '自由标签'
                }
            },
            {
                path: 'eventTaskOverview',
                name: 'eventTaskOverview',
                // component: () => import('@/views/systemSettings/eventTask/overview/index.vue'),
                component: () => import('@/views/systemSettings/eventTask/overview/index.vue'),
                meta: {
                    title: '事件任务总览'
                }
            },
            {
                path: 'eventTask',
                name: 'eventTask',
                component: () => import('@/views/systemSettings/eventTask/list/index.vue'),
                meta: {
                    title: '事件任务'
                },
                children: [
                    {
                        path: 'addEvent',
                        name: 'addEvent',
                        component: () => import('@/views/systemSettings/eventTask/edit/edit.vue'),
                        meta: {
                            title: '新增事件任务',
                            sidebar: false,
                            breadcrumb: true,
                            activeMenu: '/marketing_task'
                        }
                    },
                    {
                        path: 'editEvent',
                        name: 'editEvent',
                        component: () => import('@/views/systemSettings/eventTask/edit/edit.vue'),
                        meta: {
                            title: '编辑事件任务',
                            sidebar: false,
                            breadcrumb: true,
                            activeMenu: '/marketing_task'
                        }
                    },
                    {
                        path: 'taskDetail',
                        name: 'eventDetail',
                        component: () => import('@/views/systemSettings/eventTask/edit/edit.vue'),
                        meta: {
                            title: '事件任务详情',
                            sidebar: false,
                            breadcrumb: true,
                            activeMenu: '/marketing_task'
                        }
                    }
                ]
            }
        ]
    }

]

export default route
