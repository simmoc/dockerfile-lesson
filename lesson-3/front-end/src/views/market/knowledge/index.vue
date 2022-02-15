<template>
    <div>
        <div class="search-form">
            <el-form :inline="true" :model="knowledgeInfo" label-position="right" label-width="120px" size="small" class="search-form-margin">
                <el-form-item label="文本内容：">
                    <el-input v-model="knowledgeInfo.search_content" placeholder="请输入文本内容" style="width:274px;"
                              @keyup.enter="onSearch"
                    />
                </el-form-item>
                <el-form-item label="关键词：">
                    <el-select
                        ref="inputkeysClone"
                        v-model="searchKeysVal"
                        v-el-select-loadmore="loadMoreTheme"
                        class="ipt-type keys-overflow-scoll"
                        el-select
                        multiple
                        placeholder="输入关键词"
                        filterable
                        remote
                        no-match-text="no data"
                        no-data-text="no data"
                        :remote-method="getKeys"
                        size="small"
                        reserve-keyword
                        default-first-option
                        clearable
                        :automatic-dropdown="true"
                        :popper-append-to-body="false"
                        style="width:274px;"
                        @keyup.enter.stop.prevent="() => {return true}"
                        @remove-tag="removeKeys"
                        @change="searchKeysKnowledgeList"
                    >
                        <el-option
                            v-for="item in keysList"
                            :key="item.keyword_id"
                            :label="item.name"
                            :value="item.keyword_id"
                        >
                            <span
                                style="
                                float: left;
                                width: 250px;
                                overflow: hidden;
                                text-overflow: ellipsis;"
                                :title="item.name"
                            >
                                {{ item.name }}
                            </span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="default" @click="onReset">重置</el-button>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <page-main class="flex flex-direction-column">
            <div class="flex">
                <div class="table-search-box">
                    <div class="flex mb24">
                        <el-input v-model="groupInfo.search_group_name" prefix-icon="el-icon-search" placeholder="请输入分组名称" size="small" class="table-search-input" @input="search($event)" />
                        <el-button size="small" @click="openGroupDialog">添加分组</el-button>
                    </div>

                    <div class="table-tree">
                        <TreeDrag
                            ref="treeDrag"
                            v-model="groupNextInfo"
                            :group-list="groupList"
                            :is-search="isSearch"
                            :get-list="getKnowledgeList"
                            :get-group-list="getGroupList"
                            :set-tree-checked="setTreeChecked"
                        />
                    </div>
                </div>
                <div class=" flex-1">
                    <div class="table-top-area flex flex-align-center flex-justify-between">
                        <div v-show="groupList.length>0">
                            <span class="fs16 c0 mr8 fwb vtm">{{ groupNextInfo.name }}</span>
                            <span class="fs12 c9 vtm">此分组内已有知识 {{ tableData.length }}/20</span>
                        </div>
                        <div class="tr">
                            <el-button
                                v-if="groupList.length>0"
                                icon="el-icon-plus"
                                type="primary"
                                size="small"
                                data-isSet="1"
                                :disabled="tableData.length===20"
                                @click="goTo('knowledgeAdd',{ group_id: groupNextInfo.group_id})"
                            >
                                添加知识
                            </el-button>
                        </div>
                    </div>
                    <CustomerTable
                        v-show="groupList.length>0"
                        :table-title="tableTitle"
                        :table-data="tableData"
                        :need-pagination="true"
                        class="customer-tree"
                        :class="{'is-collapse': $store.state.settings.mode === 'pc' && $store.state.settings.sidebarCollapse}"
                    >
                        <template #sort="scope">
                            <img
                                style="width: 12px; height: 12px; margin-left: 8px;vertical-align: middle;"
                                src="@/assets/images/knowledgeBase/drag.svg"
                                :data-sort="scope.data.sort"
                                alt=""
                            >
                        </template>
                        <template #content="scope">
                            <div v-if="scope.data.content.length <= 30">
                                {{ scope.data.content }}
                            </div>
                            <el-popover
                                v-else
                                placement="bottom"
                                width="400"
                                trigger="hover"
                                popper-class="member-info-pop"
                            >
                                <div class="popover-content-box">
                                    {{ scope.data.content }}
                                </div>
                                <template #reference>
                                    <div class="popover-content">
                                        {{ scope.data.content.substring(0, 30) }} ...
                                    </div>
                                </template>
                            </el-popover>
                        </template>
                        <template #keyword_arr="scope">
                            <div v-if="scope.data.keyword_arr.length <= 3 && scope.data.keyword_arr.length>0">
                                <el-tag v-for="item in scope.data.keyword_arr" :key="item.keyword_id" effect="dark" class="item-tag-content" size="mini">
                                    {{ item.keyword_name || '' }}
                                </el-tag>
                            </div>
                            <el-popover
                                v-else-if="scope.data.keyword_arr.length > 3"
                                placement="bottom"
                                trigger="hover"
                                popper-class="key-word-pop"
                                height="325"
                                width="542"
                            >
                                <div class="member-tag-pop">
                                    <el-tag v-for="item in scope.data.keyword_arr" :key="item.keyword_id" effect="dark" class="item-tag-content" size="mini">
                                        {{ item.keyword_name || '' }}
                                    </el-tag>
                                </div>
                                <template #reference>
                                    <div>
                                        <el-tag effect="dark" class="item-tag-content" size="mini">
                                            {{ scope.data.keyword_arr[0].keyword_name || '' }}
                                        </el-tag>
                                        <el-tag effect="dark" class="item-tag-content" size="mini">
                                            {{ scope.data.keyword_arr[1].keyword_name || '' }}
                                        </el-tag>
                                        <el-tag effect="dark" class="item-tag-content" size="mini">
                                            {{ scope.data.keyword_arr[2].keyword_name || '' }}
                                        </el-tag>
                                        <span>...</span>
                                    </div>
                                </template>
                            </el-popover>
                            <div v-else>-</div>
                        </template>
                        <el-table-column
                            label="操作"
                            prop=""
                            show-overflow-tooltip
                            fixed="right"
                            width="150"
                        >
                            <template #default="{ row }">
                                <el-button
                                    type="text"
                                    size="mini"
                                    @click="goTo('knowledgeEdit',{group_id:groupNextInfo.group_id,sale_scrip_id:row.sale_scrip_id,selected: JSON.stringify(node),member_name:row.member_name,update_time:row.update_time,create_time:row.create_time
                                    })"
                                >
                                    编辑
                                </el-button>
                                <el-button
                                    type="text"
                                    size="mini"
                                    @click="
                                        showConfirm(
                                            row.sale_scrip_id
                                        )
                                    "
                                >
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </CustomerTable>
                    <div v-show="groupList.length===0" class="table-blank">
                        <div class="tc">
                            <div>暂无分组！</div>
                            <el-button size="small" type="primary" class="mt16" @click="openGroupDialog">添加分组</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </page-main>
        <!-- 新建分组 -->
        <CustomerDialog title="新建分组名称" :dialog-visible="dialogVisible" width="600px" :confirm-fn="addGroup" @cancel="cancelDialog">
            <div class="mb8">分组名称</div>
            <el-input
                v-model="groupName"
                autocomplete="off"
                maxlength="10"
                placeholder="请输入分组名称"
                show-word-limit
            />
        </CustomerDialog>
        <!-- 删除知识 -->
        <CustomerDialog title="提示" :dialog-visible="dialogIsKnowdege" width="400px" :confirm-fn="()=>delKnowleDel(sale_script_id)" @cancel="cancelDialog">
            <div class="group_name">是否删除该知识?</div>
        </CustomerDialog>
    </div>
</template>

<script setup>
import Http from '@/util/request'
import { bounce } from '@/util/index'
import {  onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Sortable from 'sortablejs'
import TreeDrag from '@/components/TreeDrag/index.vue'
// import CustomerDialog from '@/components/CustomerDialog/index.vue'
import { ElMessage } from 'element-plus'
const treeDrag = ref(null)
const router = useRouter()
// const route = useRoute()
const groupList = ref([])
const groupInfo = ref({
    type: 0,
    get_sale_script_num: 0,
    search_content: '',
    search_group_name: '',
    search_keyword_id_arr: []
})

// const inputkeysClone = ref(null)
const groupNextInfo = ref({})
const  isSearch = ref(false)
const tableData = ref([])
const tableTitle = ref([
    {
        label: '排序',
        prop: 'sort',
        type: 'slot',
        width: 50
    },
    {
        label: '内容',
        prop: 'content',
        width: 450,
        type: 'slot'
    },
    {
        label: '关键词',
        prop: 'keyword_arr',
        type: 'slot',
        width: 210
    },
    {
        label: '最后修改成员',
        prop: 'member_name'
    }, {
        label: '最后修改时间',
        prop: 'update_time'
    }
])
const searchKeysVal = ref([])
const knowledgeInfo = reactive({
    group_id: 1,
    search_content: '', // 搜索的name名称
    search_keyword_id_arr: [] })
const dialogVisible = ref(false)
const dialogIsKnowdege = ref(false)
const keysInfo = reactive({
    search_name: '',
    page_num: 1,
    page_size: 5
})
const groupName = ref('')
const keysList = ref([])
const total_num = ref(0)
const sale_script_id = ref('')
onMounted(() => {
    drag(false)

    document.body.addEventListener('click', e => {
        let goal = document.getElementsByClassName('table')[0]
        // console.log('eeeee', e)
        if (!e.path.includes(goal)) {
            keysInfo.search_name = ''
        }
    })
    // 搜索选择框加入箭头图标
    var selecteIcon = document.querySelector('.keys-overflow-scoll .el-input--suffix .el-input__suffix-inner>i')
    selecteIcon.classList.add('el-icon-arrow-up')

})

// const changeAllowIcon = visible => {
//     console.log('搜索问题', visible)
//     let selecteIconNow = document.querySelector('.keys-overflow-scoll .el-input--suffix .el-input__suffix-inner>i')
//     if (visible) {
//         selecteIconNow.classList.add('is-reverse')
//     } else {
//         selecteIconNow.classList.remove('is-reverse')
//     }
// }

// onMounted(() => {
//     document.body.addEventListener('click', e => {
//         let goal = document.getElementsByClassName('table')[0]
//         // console.log('eeeee', e)
//         if (!e.path.includes(goal)) {
//             handleKnowledgeCancel()
//         }
//     })
// })
const drag = disabled => {
    const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
    Sortable.create(el, {
        disabled: disabled,
        ghostClass: 'sortable-ghost',
        setData: function(dataTransfer) {
            dataTransfer.setData('Text', '')
        },
        onEnd: ({ newIndex, oldIndex }) => {
            let arr = []
            arr.push({ sale_script_id: tableData.value[oldIndex].sale_scrip_id, sort: newIndex })
            arr.push({ sale_script_id: tableData.value[newIndex].sale_scrip_id, sort: oldIndex })
            updateKnowledgeSort(arr)

        }
    })
}
// function getImageUrl(url) {
//     return new URL(url, import.meta.url).href
// }
const updateKnowledgeSort = async sale_script_list => {
    await Http.updateKnowledgeSort({ sale_script_list })
    groupInfo.value.search_keyword_id_arr = []
}
const cancelDialog = () => {
    groupName.value = ''
    dialogVisible.value = false
    dialogIsKnowdege.value = false
}
const addGroup = async() => {
    if (!groupName.value) {
        ElMessage.error('分组名称不能为空')
        return
    }
    // 请求接口
    let res = await Http.addKnowledgeGroup({ name: groupName.value })
    if (res.code === 200) {
        ElMessage.success('添加成功！')
        cancelDialog()
        // this.isNewGrpup = true
        groupInfo.value.search_keyword_id_arr = []
        searchKeysVal.value = []
        knowledgeInfo.search_content = ''
        groupInfo.search_group_name = ''
        getGroupList(() => {
            treeDrag.value.handlerGroupKnowledge(groupList.value[groupList.value.length - 1])
        })
    }

}
const setTreeChecked = i => {
    groupInfo.value.search_keyword_id_arr = []
    searchKeysVal.value = []
    knowledgeInfo.search_content = ''
    groupInfo.search_group_name = ''
    getGroupList(() => {
        treeDrag.value.handlerGroupKnowledge(groupList.value[i])
    })
}
const openGroupDialog = () => {
    dialogVisible.value = true
}
/**
 * 关键词列表懒加载
 */
const loadMoreTheme = () => {
    keysInfo.page_num = ++keysInfo.page_num
    if (total_num.value > keysList.value.length) {
        classGetKeysList()
    }
}

// 获取关键词列表
const getKeys = bounce(val => {
    console.log('点击时会不会触发', val)
    if (val) {
        keysInfo.page_num = 1
        classGetKeysList(val)
    } else {
        keysInfo.page_num = 1
        keysList.value = []
        classGetKeysList(val)
    }
})
// const getKeys = keyVal => {
//     // if (!keyVal.trim()) {
//     //   return
//     // }
//     console.log(keyVal)
//     keysInfo.page_num = 1
//     keysList.value = []
//     bounce(classGetKeysList(keyVal))
// }

const searchKeysKnowledgeList = () => {
    console.log('searchKeysVal', searchKeysVal.value)
    // 关键词列表id如果为空
    groupInfo.value.search_keyword_id_arr = searchKeysVal.value
    // // 获取到当前关键字列表id
    knowledgeInfo.search_keyword_id_arr = searchKeysVal.value
    // // this.knowledgeInfo.search_keyword_id_arr.push(...this.searchKeysVal)
    if (knowledgeInfo.search_content || searchKeysVal.value.length > 0) {
        isSearch.value = true
    } else {
        isSearch.value = false
    }
    // // 获取知识列表参数
    getGroupList()
    keysInfo.page_num = 1
    // keysList.value = []
    tableData.value = []
    classGetKeysList('')
}
const classGetKeysList = async keyVal => {
    // let { data } = await Http.getKeywordList({
    //     search_name: keyVal,
    //     page_num: keysInfo.page_num
    // })
    keysInfo.search_name = keyVal
    let { data } = await Http.getKeywordList({
        search_name: keysInfo.search_name,
        page_num: keysInfo.page_num
    })

    if (keyVal) {
        keysList.value = []
        keysList.value = data.list

    } else if (!keyVal && keysInfo.page_num > 1) {
        keysList.value = [...keysList.value, ...data.list]
        // keysList.value = [...data.list]
    } else {
        keysList.value = [...data.list]
    }

    total_num.value = data.total_num
}
const getGroupList = async cb => {
    let { data } = await Http.getGroupList(groupInfo.value)
    groupList.value = data
    if (cb) { cb() } else {
        treeDrag.value.handlerGroupKnowledge(groupList.value[0])
    }
}
const removeKeys = () => {
    knowledgeInfo.search_keyword_id_arr = searchKeysVal.value
    groupInfo.value.search_keyword_id_arr = searchKeysVal.value
    // 获取知识列表参数
    getKnowledgeList()
}
const onReset = () => {
    tableData.value = []
    searchKeysVal.value = []
    knowledgeInfo.group_id = 1
    knowledgeInfo.search_content = ''
    knowledgeInfo.search_keyword_id_arr = []
    groupInfo.value.search_group_name = ''
    groupInfo.value.search_content = ''
    groupInfo.value.search_keyword_id_arr = []
    knowledgeInfo.search_content = ''
    isSearch.value = false
    tableTitle.value = [
        {
            label: '排序',
            prop: 'sort',
            type: 'slot',
            width: 50
        },
        {
            label: '内容',
            prop: 'content',
            width: 450,
            type: 'slot'
        },
        {
            label: '关键词',
            prop: 'keyword_arr',
            type: 'slot',
            width: 210
        },
        {
            label: '最后修改成员',
            prop: 'member_name'
        }, {
            label: '最后修改时间',
            prop: 'update_time'
        }
    ]
    drag(false)
    getGroupList()
    getKnowledgeList()
}
const onSearch = () => {
    knowledgeInfo.search_keyword_id_arr = searchKeysVal.value
    groupInfo.value.search_keyword_id_arr = searchKeysVal.value
    groupInfo.value.search_content = knowledgeInfo.search_content
    groupInfo.value.get_sale_script_num = 1
    if (knowledgeInfo.search_content || searchKeysVal.length > 0) {
        isSearch.value = true
        tableTitle.value = [
            {
                label: '内容',
                prop: 'content',
                width: 350,
                type: 'slot'
            },
            {
                label: '关键词',
                prop: 'keyword_arr',
                type: 'slot',
                width: 210
            },
            {
                label: '最后修改成员',
                prop: 'member_name',
                width: 210
            }, {
                label: '最后修改时间',
                prop: 'update_time'
            }
        ]
        drag(true)
    } else {
        isSearch.value = false
        tableTitle.value = [
            {
                label: '排序',
                prop: 'sort',
                type: 'slot',
                width: 50
            },
            {
                label: '内容',
                prop: 'content',
                width: 450,
                type: 'slot'
            },
            {
                label: '关键词',
                prop: 'keyword_arr',
                type: 'slot',
                width: 210
            },
            {
                label: '最后修改成员',
                prop: 'member_name'
            }, {
                label: '最后修改时间',
                prop: 'update_time'
            }
        ]
        drag(false)
    }
    getKnowledgeList()
    getGroupList()
}
const search = bounce(() =>  {
    groupNextInfo.value = {}
    groupInfo.value.search_keyword_id_arr = []
    getGroupList()
})

const goTo = (name, query) => {

    router.push({ name, query })
}
const showConfirm = arg => {
    dialogIsKnowdege.value = true
    console.log(arg)
    sale_script_id.value = arg
}
const delKnowleDel = async sale_script_id => {
    let res = await Http.delKnowleDel({
        sale_script_id
    })
    if (res.code === 200) {
        dialogIsKnowdege.value = false
        ElMessage.success('删除成功')
        getKnowledgeList()
    }

}
// 获取知识列表
const getKnowledgeList = async info => {
    if (info) {
        knowledgeInfo.search_keyword_id_arr = searchKeysVal.value
        knowledgeInfo.group_id = info.group_id
        groupInfo.value.search_keyword_id_arr = info
    }
    let { data } = await Http.getKnowledgeList(knowledgeInfo)
    console.log('tableData', data)
    tableData.value = data

}
getGroupList()
classGetKeysList()
</script>

<style scoped lang="scss">
    .search-form {
        padding: 24px;
        background-color: #fff;
        margin: 24px;
    }

    .table-search-box {
        width: 296px;
        flex-grow: 0;
        flex-shrink: 0;
        border-right: 1px solid #edeef2;
        padding-right: 16px;
        margin-right: 16px;
    }
    .table-tree{
        height: 600px;
        overflow-y: auto;
    }

    .table-search-input {
        margin-right: 8px;
    }

    .table-top-tip {
        color: #8c8c8c;
        font-size: 12px;
        margin-left: 8px;
    }

    .customer-tree {
        width: calc(100vw - 693px);
        &.is-collapse{
            width:calc(100vw - 556px);
        }
    }

    .distribution-role-list {
        max-height:150px;
        overflow-y: auto;
        & > div {
            margin-top: 8px;
            font-size: 12px;
            cursor: pointer;

            &:first-child {
                margin-top: 22px;
            }

            .el-icon-check {
                margin-left: 8px;
            }
        }
    }

    .pd12 {
        padding: 12px;
    }

    .icon{
        font-size: 19px;
        vertical-align: middle;
    }
    .sync-btn{
        display: inline-block;
        width: 146px;
        height: 32px;
        background: #ffffff;
        border: 1px solid $customer-primary-color;
        border-radius: 2px;
        color: $customer-primary-color;
        text-align: center;
        padding: 4px 18px;
        cursor: pointer;
        &:hover{
            background-color: #e8f1ff;
        }
    }
    .item-tag-content{
        margin-right: 8px;
    }
    .table-blank {
        height: 600px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
