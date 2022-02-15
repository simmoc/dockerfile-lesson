const REQUEST_API = {
    getloginComponys: { // 获取可登录企业列表
        method: 'get',
        url: '/operation/qw_qr_login_param_chain'
    },
    // 登录
    loginIn: {
        method: 'post',
        url: '/operation/login'
    },
    // 实施配置文件上传
    upload: {
        method: 'post',
        url: '/file/init_upload'
    },
    systemDepartments: {
        method: 'get',
        url: '/departments'
    },
    systemMembers: {
        method: 'get',
        url: '/members'
    },
    systemRoles: {
        method: 'get',
        url: '/roles'
    },
    addRoles: {
        method: 'post',
        url: '/role/add'
    },
    authority: {
        method: 'get',
        url: '/authority'
    },
    deleteRole: {
        method: 'post',
        url: '/role/delete'
    },
    initialize: {
        method: 'get',
        url: '/initialize'
    },
    addInitialize: {
        method: 'post',
        url: '/initialize/add'
    },
    qrLoginUrl: {
        method: 'get',
        url: '/operation/qw_qr_login_url'
    },
    addSubject: {
        method: 'post',
        url: '/initialize/add_subject'
    },
    initStatus: {
        method: 'get',
        url: '/initialize/init'
    },
    doInit: {
        method: 'get',
        url: '/initialize/do_init'
    },
    authorityRole: {
        method: 'get',
        url: '/authority/role'
    },
    roleEdit: {
        method: 'post',
        url: '/role/edit'
    },
    roleAllocate: {
        method: 'post',
        url: '/role/allocate'
    },
    roleDrop: {
        method: 'post',
        url: '/role/drop'
    },
    initializeAdmin: {
        method: 'get',
        url: '/initialize/admin'
    },

    // ==============事件与任务模块===================
    // 获取任务列表
    getMemberType: {
        method: 'get',
        url: '/member/get_type'
    },
    getMemberList: {
        method: 'post',
        url: '/get_department_members'
    },
    getMemberDepartmentList: {
        method: 'get',
        url: '/get_qw_department'
    },

    // 获取任务分组列表
    getTaskCategory: {
        method: 'get',
        url: '/task_category'
    },

    // 获取任务列表
    getTask: {
        method: 'get',
        url: '/task/list'
    },

    // 获取任务列表
    getTaskStatus: {
        method: 'post',
        url: '/task/status'
    },

    // 刪除分组
    getTaskCategoryDel: {
        method: 'post',
        url: '/task_category/delete'
    },
    // getTaskCategoryDel(id) {
    //     return AjaxService.request({
    //         url: '/task_category/delete/' + id,
    //         method: 'post'
    //     })
    // },
    // 修改分组名称
    getTaskCategoryUpdate: {
        method: 'post',
        url: '/task_category/update'
    },
    // 添加分组名称
    getTaskCategoryAdd: {
        method: 'post',
        url: '/task_category/add'
    },
    // 获取分组下拉选择框
    getListSon: {
        method: 'get',
        url: '/task/list_son'
    },
    // 获取成员状态下拉选择框
    getTaskType: {
        method: 'get',
        url: '/task/task_type'
    },
    // 获取分组下拉选择框
    getTagSubject: {
        method: 'get',
        url: '/task/tag_subject'
    },
    // 添加任务
    addTaskAdd: {
        method: 'post',
        url: '/task/add'
    },
    // 删除任务
    deleteTask: {
        method: 'post',
        url: '/task/delete'
    },

    // 获取编辑信息
    getUpdateTask: {
        method: 'get',
        url: '/task/update'
    },
    // 编辑任务
    updateTask: {
        method: 'post',
        url: '/task/update'
    },

    // 获取事件任务总览列表
    getOverviewList: {
        method: 'post',
        url: '/task/overview_list'
    },
    getTaskAllList: {
        method: 'post',
        url: '/task/all_list'
    },

    // =============事件模块================
    // 获取任务列表
    getEventList: {
        method: 'post',
        url: '/events'
    },
    // 保存事件
    getEventsAdd: {
        method: 'post',
        url: '/events/add'
    },

    // 获取事件信息-编辑
    getEventsUpdateData: {
        method: 'post',
        url: '/events/update_data'
    },

    // 获取事件要素类型
    getEventsFieldType: {
        method: 'post',
        url: '/events/get_field_type'
    },

    // 保存事件
    getEventsUpdate: {
        method: 'post',
        url: '/events/update'
    },

    // 获取变量选择器数据列表
    getEventsElementsOptions: {
        method: 'post',
        url: '/events/events_elements_options'
    },
    // 获取历史事件列表
    getHistoryList: {
        method: 'post',
        url: '/events/history_list'
    },
    // 获取历史事件列表
    getElementList: {
        method: 'post',
        url: '/events/element_list'
    },
    // 获取历史事件快照
    getSnapshot: {
        method: 'post',
        url: '/events/snapshot'
    },
    // 获取事件选择器数据列表
    getEventsOptions: {
        method: 'post',
        url: '/events/events_options'
    },
    // 获取成员信息
    getMemberData: {
        method: 'post',
        url: '/member/name_card'
    },

    getLoginParam: {
        method: 'get',
        url: '/operation/qw_qr_login_param'
    },
    qrLogin: {
        method: 'post',
        url: '/operation/qw_qr_login'
    },
    setAdmin: {
        method: 'post',
        url: '/initialize/add_admin'
    },
    getSyncTime: {
        method: 'get',
        url: '/sync/time'
    },
    accomplishInit: {
        method: 'get',
        url: '/initialize/init_status'
    },
    syncMember: {
        method: 'get',
        url: '/sync/member'
    },
    syncDepartment: {
        method: 'get',
        url: '/sync/department'
    },
    syncCustomer: {
        method: 'get',
        url: '/sync/customer'
    },
    syncGroup: {
        method: 'get',
        url: '/sync/group'
    },
    // 成员话术
    getTagSubjectsKey: {
        method: 'post',
        url: '/events/get_tag_subjects_key'
    },
    deleteSaleScript: {
        method: 'post',
        url: '/oss/sale_script_personal/delete_sale_script'
    },
    getSaleScriptList: {
        method: 'post',
        url: '/oss/sale_script_personal/get_sale_script_list'
    },
    // 客户群
    getGroupChatList: {
        method: 'post',
        url: '/operation_get_groupchat_list'
    },
    // 营销建议编辑页获取素材标题列表
    getProposalTitleList: {
        method: 'post',
        url: '/suggestions_material/select_list'
    },
    // 获取企业成员
    getAddMember: {
        method: 'post',
        url: '/operation_get_member_list'
    },
    // 获取群成员列表
    getGroupChatMemberList: {
        method: 'post',
        url: '/operation_get_groupchat_member_list'
    },
    // 获取手工任务成员列表
    getOptionMemberList: {
        method: 'post',
        url: '/tasks_varied/get_option_member_list'
    },
    // 获取群成员列表页群概览数据
    getGroupChatInfo: {
        method: 'post',
        url: '/operation_get_groupchat_overview'
    },
    // 后端配置后返回路由权限
    getMenus: {
        method: 'get',
        url: '/menus'
    },
    // 根据前端自定义，开发路由权限
    // getMenus: {
    //     method: 'get',
    //     url: '/menu/all_menus'
    // },
    getAdminToken: {
        method: 'get',
        url: '/initialize/set_admin_token'
    },
    // 获取分组列表
    getGroupList: {
        method: 'post',
        url: '/oss/sale_script_group/get_group_list'
    },
    // 获取知识库列表
    getKnowledgeList: {
        method: 'post',
        url: '/oss/sale_script/get_sale_script_list'
    },
    // 获取知识库关键词
    // search_name	否	string	筛选关键词
    getKeywordList: {
        method: 'post',
        url: '/oss/sale_script_keyword/get_keyword_list'
    },
    //   删除知识库话术下的关键词
    updateKnowledgeKeys: {
        method: 'post',
        url: '/oss/sale_script_keyword/update_keyword'
    },
    // 标签营销table数据列表
    getSaleTagScriptList: {
        method: 'post',
        url: '/oss/sale_script_tag/get_sale_script_list'
    },
    // 标签营销树数据
    getTagScriptList: {
        method: 'post',
        url: '/oss/sale_script_tag/get_tag_list'
    },
    // 标签营销下拉框
    getTagGroup: {
        method: 'post',
        url: '/oss/sale_script_tag/get_tag_group'
    },
    getTagList: {
        method: 'post',
        url: '/oss/tag/get_tag_list'
    },
    fileUpload: {
        method: 'post',
        url: '/file/upload'
    },
    addSaleScript: {
        method: 'post',
        url: '/oss/sale_script_tag/add_sale_script'
    },
    updateSaleScript: {
        method: 'post',
        url: '/oss/sale_script_tag/update_sale_script'
    },
    getSaleScriptDetail: {
        method: 'post',
        url: '/oss/sale_script_tag/get_sale_script_detail'
    },
    deleteTagSaleScript: {
        method: 'post',
        url: '/oss/sale_script_tag/delete_sale_script'
    },
    delKnowledgeGroup: {
        method: 'post',
        url: '/oss/sale_script_group/delete_group'
    },
    updateKnowledgeGroupName: {
        method: 'post',
        url: '/oss/sale_script_group/update_group_name'
    },
    KnowleGroupSort: {
        method: 'post',
        url: '/oss/sale_script_group/update_group_sort'
    },
    addKnowledgeGroup: {
        method: 'post',
        url: '/oss/sale_script_group/add_group'
    },
    addKnowledgeSpeech: {
        method: 'post',
        url: '/oss/sale_script/add_sale_script'
    },
    getKnowledgeDetails: {
        method: 'post',
        url: '/oss/sale_script/get_sale_script_detail'
    },
    delKnowleDel: {
        method: 'post',
        url: '/oss/sale_script/delete_sale_script'
    },
    updateKnowledgeSort: {
        method: 'post',
        url: '/oss/sale_script/update_sale_script_sort'
    },
    getCustomList: {
        method: 'get',
        url: '/operation_get_member_customer_list'
    },
    getChildDepartment: {
        method: 'get',
        url: '/get_child_department'
    },
    getMember: {
        method: 'get',
        url: '/cw_members'
    },
    getMessageList: {
        method: 'get',
        url: '/operation_get_message_list'
    },
    updateKnowledge: {
        method: 'post',
        url: '/oss/sale_script/update_sale_script'
    },
    getSubjectName: {
        method: 'get',
        url: '/initialize/subject_name'
    },
    roleMember: {
        method: 'get',
        url: '/department/role_members'
    },
    operationGetCustomerList: {
        method: 'post',
        url: '/operation_get_customer_list'
    },
    operationGetCustomerType: {
        method: 'get',
        url: '/operation_get_customer_type'
    },
    operationGetCustomerStatus: {
        method: 'get',
        url: '/operation_get_customer_status'
    },
    getCustomerNum: {
        method: 'post',
        url: '/operation_get_duplicate_removal_customer_num'
    },
    operationGetLabel: {
        method: 'get',
        url: '/operation_get_label'
    },
    operationCustomerInfo: {
        method: 'post',
        url: '/operation_get_customer_info'
    },
    operationCustomerOtherInfo: {
        method: 'post',
        url: '/operation_get_customer_other_info'
    },
    operationCustomerLabel: {
        method: 'post',
        url: '/operation_get_customer_label'
    },
    operationCustomerNews: {
        method: 'post',
        url: '/operation_get_customer_news'
    },
    initializeAddFirst: {
        method: 'post',
        url: '/initialize/add_first'
    },
    editRoleMember: {
        method: 'post',
        url: '/role/member/edit'
    },

    // 任务日历接口
    // ------- start --------
    // 日历Tab页
    calendarData: {
        method: 'post',
        url: '/tasks_varied/calendar'
    },
    taskTabList: {
        method: 'post',
        url: '/tasks_varied/all_list'
    },
    // 新增手工任务
    addHandTask: {
        method: 'post',
        url: '/tasks_varied/hand/add'
    },
    // 新增计划任务
    addTask: {
        method: 'post',
        url: '/tasks_varied/add'
    },
    // 删除手工Tabs任务
    deleteHandTabsTask: {
        method: 'post',
        url: '/tasks_varied/hand/delete'
    },
    // 删除Tabs任务
    deleteTabsTask: {
        method: 'post',
        url: '/tasks_varied/delete'
    },
    // 终止手工Tabs任务
    stopHandTabsTask: {
        method: 'post',
        url: '/tasks_varied/hand/stop'
    },
    // 终止计划Tabs任务
    stopTabsTask: {
        method: 'post',
        url: '/tasks_varied/stop'
    },
    // 编辑与详情手工任务
    handEditOrDetailTask: {
        method: 'post',
        url: '/tasks_varied/hand/edit'
    },
    // 编辑与详情计划任务
    editOrDetailTask: {
        method: 'post',
        url: '/tasks_varied/edit'
    },
    // 编辑手工任务数据保存
    handUpdateTaskSave: {
        method: 'post',
        url: '/tasks_varied/hand/update'
    },
    // 编辑计划任务数据保存
    updateTaskSave: {
        method: 'post',
        url: '/tasks_varied/update'
    },
    // 任务日历标签组件数据
    getCalendarTag: {
        method: 'post',
        url: '/tasks_varied/get_tag_list'
    },
    // 任务日历成员组件组织架构树
    getCalendarDepartment: {
        method: 'post',
        url: '/tasks_varied/get_qw_department'
    },
    // 成员组件查询成员
    getDepartmentMemberList: {
        method: 'post',
        url: '/tasks_varied/get_department_members'
    },
    // 预估触达数量统计
    getTouchNum: {
        method: 'post',
        url: '/tasks_varied/get_touch_num'
    },
    // 手工执行详情列表
    getHandImplementDetail: {
        method: 'post',
        url: '/tasks_varied/hand/task_result_detail'
    },
    // 计划执行详情列表
    getImplementDetail: {
        method: 'post',
        url: '/tasks_varied/task_result_detail'
    },
    // 执行详情可选时间
    getImplementTime: {
        method: 'post',
        url: '/tasks_varied/task_result_time'
    },
    // 任务重复数量
    getTaskRepeatNum: {
        method: 'post',
        url: '/tasks_varied/get_task_num'
    },
    // ------- end --------

    // 商品管理模块-奥斯芬
    getGoodsList: { // 商品列表
        method: 'post',
        url: '/oss/score_shop/get_goods_list'
    },
    updateGoods: { // 编辑商品
        method: 'post',
        url: '/oss/score_shop/update_goods'
    },
    getGoodsDetail: { // 商品详情
        method: 'post',
        url: '/oss/score_shop/get_goods_detail'
    },
    addGoods: { // 新增商品
        method: 'post',
        url: '/oss/score_shop/add_goods'
    },
    deleteGoods: { // 删除商品
        method: 'post',
        url: '/oss/score_shop/delete_goods'
    },
    updataGoodsStatus: { // 商品上下架
        method: 'post',
        url: '/oss/score_shop/update_goods_sale_status'
    },
    topGoodsSort: { // 商品移动到第一个
        method: 'post',
        url: '/oss/score_shop/update_goods_sort_top'
    },
    updateGoodsSort: { // 商品排序
        method: 'post',
        url: '/oss/score_shop/update_goods_sort'
    },
    getGoodsTypes: { // 商品类目列表
        method: 'post',
        url: '/oss/score_shop/get_goods_category_list'
    },
    addGoodsType: { // 添加商品类目
        method: 'post',
        url: '/oss/score_shop/add_goods_category'
    },
    editGoodsType: { // 编辑商品类目
        method: 'post',
        url: '/oss/score_shop/update_goods_category'
    },
    deleteGoodsType: { // 删除商品类目
        method: 'post',
        url: '/oss/score_shop/delete_goods_category'
    },
    editGoodsListSort: { // 更新商品类目排序
        method: 'post',
        url: '/oss/score_shop/update_goods_category_sort'
    },
    updateGoodsTypes: { // 更新商品类目(包括添加等)
        method: 'post',
        url: '/oss/score_shop/save_goods_category'
    },
    getGoodsCates: { // 获取商品分类列表
        method: 'post',
        url: '/oss/score_shop/get_goods_class_list'
    },
    editGoodsCate: { // 编辑商品分类列表
        method: 'post',
        url: '/oss/score_shop/update_goods_class_name'
    },
    adddGoodsCate: { // 添加商品分类
        method: 'post',
        url: '/oss/score_shop/add_goods_class'
    },
    deleteGoodsCate: { // 删除商品分类
        method: 'post',
        url: '/oss/score_shop/delete_goods_class'
    },
    updateGoodsCatesSort: { // 更新分类排序
        method: 'post',
        url: '/oss/score_shop/update_goods_class_sort'
    },

    // 订单管理模块-奥斯芬
    getOrderNum: { // 获取快递订单统计
        method: 'post',
        url: '/oss/score_shop/get_logistics_order_total'
    },
    getOrderData: { // 获取快递订单列表
        method: 'post',
        url: '/oss/score_shop/get_logistics_order_list'
    },
    getOrderExpressCode: { // 获取快递公司编码
        method: 'get',
        url: '/oss/score_shop/get_express_code_list'
    },
    sendOrderGoods: { // 快递订单发货
        method: 'post',
        url: '/oss/score_shop/send_goods'
    },
    getCompleteOrder: { // 快递订单确认完成
        method: 'post',
        url: '/oss/score_shop/complete_order'
    },
    getOrderDetail: { // 获取快递订单详情
        method: 'post',
        url: '/oss/score_shop/get_logistics_order_detail'
    },
    // 客服管理模块===============
    getSeviceList: { // 获取客服信息
        method: 'get',
        url: '/oss/score_shop/get_customer_service_data'
    },
    setSevice: { // 设置客服
        method: 'post',
        url: '/oss/score_shop/set_customer_service_code'
    },
    deleteSevice: { // 删除客服
        method: 'post',
        url: '/oss/score_shop/del_customer_service_code'
    },
    updateSevice: { // 更新客服
        method: 'post',
        url: '/oss/score_shop/update_customer_service_code'
    },
    // 成员活码
    getmemberGroup: { // 获取成员活码分组
        method: 'post',
        url: '/oss/member_code/get_group_list'
    },
    getmemberList: { // 获取成员活码列表
        method: 'post',
        url: '/oss/member_code/get_code_list'
    },
    getOrderStoretotal: { // 获取到店订单统计
        method: 'post',
        url: '/oss/score_shop/get_arrival_order_total'
    },
    getOrderStorelist: { // 获取到店订单列表
        method: 'post',
        url: '/oss/score_shop/get_arrival_order_list'
    },
    getOrderStoreDetail: { // 获取到店订单详情
        method: 'post',
        url: '/oss/score_shop/get_arrival_order_detail'
    },
    getOrderStoreGoods: { // 获取分类&商品列表(订单管理使用)
        method: 'post',
        url: '/oss/score_shop/get_class_goods_list'
    },

    // 轮播图管理
    getBannerList: { // 获取轮播图列表
        method: 'get',
        url: '/oss/score_shop/banner_list'
    },
    getBannertype: { // 获取轮播图类型
        method: 'get',
        url: '/oss/score_shop/banner_type'
    },
    updateBannerSort: { // 轮播图排序
        method: 'post',
        url: '/oss/score_shop/banner_sort'
    },
    // 积分管理
    deleteBanner: { // 获取轮播图类型
        method: 'post',
        url: '/oss/score_shop/banner_del'
    },
    addBanner: { // 新增轮播图
        method: 'post',
        url: '/oss/score_shop/banner_add'
    },
    getBannerDetail: { // 获取轮播图详情
        method: 'get',
        url: '/oss/score_shop/banner_detail'
    },
    updateBannerEdit: { // 编辑轮播图
        method: 'post',
        url: '/oss/score_shop/banner_update'
    },
    // 积分规则
    getIntegelTotal: { // 获取积分统计
        method: 'get',
        url: '/oss/score_shop/statistical_score'
    },
    getIntegelCommenList: { // 获取通用积分规则
        method: 'get',
        url: '/oss/score_shop/normal_rule_list'
    },
    getIntegelList: { // 获取活动规则列表
        method: 'get',
        url: '/oss/score_shop/activity_rule_list'
    },
    addIntegelRule: { // 添加积分规则
        method: 'post',
        url: '/oss/score_shop/add_activity_rule'
    },
    editIntegelRule: { // 编辑活动规则
        method: 'post',
        url: '/oss/score_shop/edit_activity_rule'
    },
    deleteIntegelRule: { // 删除活动规则
        method: 'post',
        url: '/oss/score_shop/del_activity_rule'
    },
    setBirthdayIntegelRule: { // 生日积分设置
        method: 'post',
        url: '/oss/score_shop/edit_normal_rule'
    },
    setIntegelRuleStatus: { // 设置活动状态
        method: 'post',
        url: '/oss/score_shop/activity_rule_status'
    },
    sortIntegelRules: { // 活动规则排序
        method: 'post',
        url: '/oss/score_shop/activity_rule_sort'
    },
    extensiveCustomerSubjectList: { // 主体实例列表
        method: 'post',
        url: '/extensive_customer/subject_list'
    },
    extensiveCustomerSearchFieldList: { // 主体实例列表-自定义字段列表
        method: 'post',
        url: '/extensive_customer/search_field_list'
    },
    // 主体客户相关接口
    getSujectDetailTab: { // 请求客户详细详情顶部tab等
        method: 'post',
        url: '/extensive_customer/detail'
    },
    getSujectDetail: { // 请求客户详细详情
        method: 'post',
        url: '/extensive_customer/detail_user_info'
    },
    getSujectGroupInfo: { // 请求客户群相关信息
        method: 'post',
        url: '/extensive_customer/group_list'
    },
    getTrendstypes: { // 获取动态分组列表
        method: 'post',
        url: '/extensive_customer/get_type'
    },
    getTrendsList: { // 获取动态列表
        method: 'post',
        url: '/extensive_customer/dynamic_list'
    },
    getEventParams: { // 获取动态列表
        method: 'post',
        url: '/event/name_card'
    }
}
export default REQUEST_API
