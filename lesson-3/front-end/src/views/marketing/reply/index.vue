<template>
    <div>
        <div class="search-form flex flex-justify-between p24">
            <el-form
                v-model="form.knowledgeInfo"
                label-position="left"
                :inline="true"
                size="small"
                label-width="auto"
            >
                <el-form-item label="文本内容 :" class="mb0 mr24">
                    <el-input
                        v-model="form.knowledgeInfo.search_content"
                        clearable
                        show-word-limit
                        placeholder="请输入文本内容"
                        @keyup.enter="searchContentText"
                    />
                </el-form-item>

                <el-form-item label="关键词 :" class="mb0 mr24">
                    <el-select
                        v-model="form.searchKeysVal"
                        v-el-select-loadmore.stop="loadMoreTheme"
                        class="keys-overflow-scoll"
                        el-select
                        multiple
                        placeholder="输入关键词"
                        filterable
                        remote
                        style="width: 206px"
                        no-match-text="no data"
                        no-data-text="no data"
                        :remote-method="getKeys"
                        reserve-keyword
                        default-first-option
                        clearable
                        :multiple-limit="form.select_reule"
                        :popper-append-to-body="false"
                        @remove-tag="removeKeys"
                        @change="searchKeysKnowledgeList"
                    >
                        <el-option
                            v-for="item in form.keysList"
                            :key="item.keyword_id"
                            :label="item.name"
                            :value="item.keyword_id"
                        >
                            <span style="float: left; overflow: hidden; text-overflow: ellipsis;" :title="item.name">
                                {{ item.name }}
                            </span>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form size="small">
                <el-button @click="handleReset">
                    重置
                </el-button>
                <el-button
                    type="primary"
                    @click="selectAll"
                >
                    查询
                </el-button>
            </el-form>
        </div>

        <page-main class="flex">
            <div class="content-main">
                <div class="left">
                    <div class="tree-head-left overflow-ellipsis">
                        <el-input
                            v-model="form.groupInfo.search_group_name"
                            style="width: 280px"
                            prefix-icon="el-icon-search"
                            placeholder="请输入分组名称"
                            size="small"
                            @input="handlerSearchGroup"
                        />
                    </div>
                    <div>
                        <groupTree
                            ref="groupTreeList"
                            :group-list="form.groupList"
                            :search-group-name="form.groupInfo.search_group_name"
                            :is-search="form.isSearch"
                            @updateGroupInfo="updateGroupInfo"
                            @getKnowledgeList="getKnowledgeList"
                        />
                    </div>
                </div>
            </div>
            <!-- <div class="fly-mid"></div> -->
            <!-- 数据展示列表页 -->
            <tablePage
                :table-page-content="form.tablePageContent"
                :knowledge-list="form.knowledgeList"
                :group-next-info="form.groupNextInfo"
                :keys-list="form.keysList"
                class="customer-tree"
                :class="{'is-collapse': $store.state.settings.mode === 'pc' && $store.state.settings.sidebarCollapse}"
                @getGroupListInfo="getGroupListInfo"
            />
        </page-main>
    </div>
</template>
<script setup>
import { bounce } from '@/util/index'
import http from '@/util/request'
import { useRoute } from 'vue-router'
const route = useRoute()
const groupTreeList = ref(null)
const form = ref({
    total_num: 0,
    groupList: [],  // 分组列表信息
    searchKeysVal: [], // 搜索关键字勾选后列表
    groupName: '', // 分组名称
    keysList: [],
    keysInfo: {
        search_name: '',
        page_num: 1,
        page_size: 5
    },
    tablePageContent: {
        groupLength: 0,
        btnContent: '去知识库',
        content: '暂无推荐回复，请去知识库添加知识!'
    },
    groupInfo: {
        // 分组信息
        type: 1,
        get_sale_script_num: 0,
        search_content: '',
        search_group_name: '',
        search_keyword_id_arr: []
    },
    groupNextInfo: {},
    newGroupInfo: [],
    knowledgeList: [],
    knowledgeInfo: {
        group_id: 1,
        search_content: '', // 搜索的name名称
        search_keyword_id_arr: []
    },
    select_reule: 99,
    isSearch: false
})
/**
 * 关键词列表懒加载
 */
function loadMoreTheme() {
    // console.log(form.value.keysInfo.page_num)
    form.value.keysInfo.page_num = ++form.value.keysInfo.page_num
    // console.error(form.value.total_num > form.value.keysList.length)
    if (form.value.total_num > form.value.keysList.length) {
        classGetKeysList()
    }
}
function updateGroupInfo(e) {
    form.value.groupNextInfo.group_id = e.group_id
    form.value.groupNextInfo.name = e.name
}
// 搜索分组名称
function  handlerSearchGroup() {
    form.value.groupNextInfo = {}
    // 请求分组信息
    getGroupListInfo()
}
// 文本内容回车搜索文本内容
function searchContentText() {
    form.value.groupInfo.get_sale_script_num = 1
    form.value.groupInfo.search_content = form.value.knowledgeInfo.search_content
    if (form.value.knowledgeInfo.search_content || form.value.searchKeysVal.length > 0) {
        form.value.isSearch = true
    } else {
        form.value.isSearch = false
    }

    // console.log('2222', form.value.isSearch)
    getGroupListInfo()
}
// 获取分组信息
const getGroupListInfo = bounce(() => {
    http.getGroupList(form.value.groupInfo).then(
        res => {
            const { data } = res
            console.log('teee', data)
            // 得到分组列表
            form.value.groupList = data
            // 每次调用分组  获取分组列表长度信息，同步数据
            form.value.tablePageContent.groupLength = data.length
            if (!data.length) {
                // 相应的对应分组列表也会为空
                form.value.groupList = []
                form.value.knowledgeList = []
                // form.value.groupNextInfo = {}
                return
            }
            if (form.value.groupNextInfo.group_id) {
                // 文本搜索 next有id，但是和 data[0]id不一致
                const flex = data.some((item, index) => {
                    if (item.group_id == form.value.groupNextInfo.group_id) {
                        form.value.groupNextInfo = data[index]
                        return true
                    }
                })
                // 没找到 采用第一个分组信息
                if (!flex) {
                    form.value.groupNextInfo = data[0]
                    form.value.knowledgeInfo.group_id = data[0].group_id
                    groupTreeList.value.setNavaticeGroupId(
                        form.value.groupNextInfo.group_id
                    )
                    getKnowledgeList()
                    return
                }
                // 采用next id
                form.value.knowledgeInfo.group_id = form.value.groupNextInfo.group_id
                groupTreeList.value.setNavaticeGroupId(form.value.groupNextInfo.group_id)
                getKnowledgeList()
                return
            }
            // 改变当前查询的知识列表信息
            let { knowledgeInfo } = form.value
            // console.warn('111111', data[0])
            form.value.groupNextInfo = JSON.parse(JSON.stringify(data[0]))
            // // 改变当前group_id
            form.value.knowledgeInfo.group_id = data[0].group_id
            groupTreeList.value.setNavaticeGroupId(data[0].group_id)

            // // 如果从其他路由过来 改变groupid 请求其他分组信息
            if (route.query.group_id) {
                knowledgeInfo.group_id = route.query.group_id
                const res = data.find(item => {
                    return item.group_id == route.query.group_id
                })
                form.value.groupNextInfo = res
                // 样式没同步
                groupTreeList.value.setNavaticeGroupId(form.value.groupNextInfo.group_id)
                route.query.group_id = null
            }

            if (data[0].search_content) {
                form.value.groupInfo.get_sale_script_num = 1
                knowledgeInfo.search_content = data[0].search_content
                getKnowledgeList()
                return
            }
            form.value.groupInfo.get_sale_script_num = 0
            // knowledgeInfo.search_content = ''

            getKnowledgeList()
        },
        error => {
            console.log(error)
        }
    )
})
// 获取知识列表
function getKnowledgeList(knowledgeInfo) {
    console.log('1111', knowledgeInfo)
    if (knowledgeInfo) {
        // form.value.knowledgeInfo.search_content = form.value.knowledgeInfo.search_content
        form.value.knowledgeInfo.search_keyword_id_arr = form.value.searchKeysVal
        form.value.knowledgeInfo.group_id = knowledgeInfo.group_id
        form.value.groupInfo.search_keyword_id_arr = form.value.searchKeysVal
        // console.error('11111', form.value.groupInfo.search_keyword_id_arr)
    }
    http.getKnowledgeList(form.value.knowledgeInfo).then(
        res => {
            const { data } = res
            // 知识列表
            form.value.knowledgeList = data
        },
        error => {
            console.log(error)
        }
    )
}
// 关键字列表发生变化时触发
function searchKeysKnowledgeList() {
    // this.$refs.inputkeysClone.query = ''
    // 关键词列表id如果为空
    // if (!this.searchKeysVal.length) {
    //   return
    // }
    // 获取到当前关键字列表id
    form.value.knowledgeInfo.search_keyword_id_arr = form.value.searchKeysVal
    form.value.groupInfo.search_keyword_id_arr = form.value.searchKeysVal
    // form.value.knowledgeInfo.search_keyword_id_arr.push(...form.value.searchKeysVal)
    if (form.value.knowledgeInfo.search_content || form.value.searchKeysVal.length > 0) {
        form.value.isSearch = true
    } else {
        form.value.isSearch = false
    }
    // 获取知识列表参数
    getGroupListInfo()
    form.value.keysInfo.page_num = 1
    // form.value.keysList = []
    classGetKeysList('')
}
// 公共的请求关键字列表方法
function classGetKeysList(keyVal) {
    // 1.发送请求
    http
        .getKeywordList({
            search_name: keyVal,
            page_num: form.value.keysInfo.page_num
        })
        .then(
            res => {
                const { data } = res
                if (!data.list.length) {
                    return
                }
                if (keyVal) {
                    form.value.keysList = data.list
                } else {
                    form.value.keysList = [...form.value.keysList, ...data.list]
                }
                form.value.total_num = data.total_num
                // 分组中查找关键字 动态渲染
                console.warn('keysList', form.value.keysList)
            },
            error => {
                console.log(error)
            }
        )
}
// 获取关键词列表
function getKeys(keyVal) {
    // if (!keyVal) {
    //   return
    // }
    console.warn('keyVal', keyVal)
    form.value.keysInfo.page_num = 1
    form.value.keysList = []
    classGetKeysList(keyVal)
}
// 点击重置
function handleReset() {
    form.value = {
        groupList: [],  // 分组列表信息
        searchKeysVal: [], // 搜索关键字勾选后列表
        groupName: '', // 分组名称
        keysList: [],
        keysInfo: {
            search_name: '',
            page_num: 1,
            page_size: 5
        },
        tablePageContent: {
            groupLength: 0,
            btnContent: '去知识库',
            content: '暂无推荐回复，请去知识库添加知识!'
        },
        groupInfo: {
            // 分组信息
            type: 1,
            get_sale_script_num: 0,
            search_content: '',
            search_group_name: '',
            search_keyword_id_arr: []
        },
        groupNextInfo: {},
        newGroupInfo: [],
        knowledgeList: [],
        knowledgeInfo: {
            group_id: 1,
            search_content: '', // 搜索的name名称
            search_keyword_id_arr: []
        },
        select_reule: 99,
        isSearch: false
    }

    // 发送请求 请求默认数据
    groupTreeList.value.setNavaticeGroupId(0)
    getGroupListInfo()
    classGetKeysList()
}
// 点击移除关键字
function removeKeys() {
    console.log('searchKeysVal', form.value.searchKeysVal)
    form.value.knowledgeInfo.search_keyword_id_arr = form.value.searchKeysVal
    form.value.groupInfo.search_keyword_id_arr = form.value.searchKeysVal
    // 获取知识列表参数
    getGroupListInfo()
}
// 点击查询
function selectAll() {
    form.value.knowledgeInfo.search_keyword_id_arr = form.value.searchKeysVal
    form.value.groupInfo.search_keyword_id_arr = form.value.searchKeysVal
    form.value.groupInfo.search_content = form.value.knowledgeInfo.search_content
    form.value.groupInfo.get_sale_script_num = 1
    if (form.value.knowledgeInfo.search_content || form.value.searchKeysVal.length > 0) {
        form.value.isSearch = true
    } else {
        form.value.isSearch = false
    }
    getGroupListInfo()
}
// 页面初始化
function onInitial() {
    getGroupListInfo()
    classGetKeysList()
}
onInitial()
</script>

<style></style>

<style scoped lang="scss">
@import '../../../assets/styles/pageCommonStyle/searchTable.scss';
// @import '@/views/knowledgeBase/list/index.less';
@import './index.scss';
.search-form {
    padding: 24px;
    background-color: #fff;
    margin: 24px;
}
</style>
