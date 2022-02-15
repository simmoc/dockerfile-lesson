<template>
    <div class="select-page">
        <div class="search-box pb20">
            {{ props.grouList }}
            <el-form :inline="true" :model="params" label-position="right" label-width="120px" size="small" class="search-form-margin clearfix">
                <el-form-item label="成员活码名称：">
                    <el-input v-model="params.search_name" placeholder="请输入文本内容" style="width:274px;" />
                </el-form-item>
                <el-form-item label="配置成员：">
                    <selectMember
                        ref="addMemberDialogRef"
                        input-placeholder="请选择企微成员"
                        :is-multiple-selected="true"
                        :custom-selected-fn="customSelectedFn"
                        :write-back-selected-member-org="writeBackSelectedMemberOrg"
                        :custom-input-value-fn="(fnArr) => getShowStr(fnArr, 3)"
                        style="width:274px;"
                        @confirm="confirmChooseMember"
                    >
                        <template #default="scope">
                            <el-input
                                v-model="scope.data"
                                placeholder="请选择"
                                suffix-icon="el-icon-arrow-down"
                                readonly
                            />
                        </template>
                    </selectMember>
                </el-form-item>
                <el-form-item label="创建时间：">
                    <el-date-picker
                        v-model="creatTime"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                        @change="changeTime"
                    />
                </el-form-item>
                <el-form-item class="right mr0">
                    <el-button type="default" size="small" @click="onReset">重置</el-button>
                    <el-button type="primary" size="small" @click="onSearch = !onSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="data-box flex pt24">
            <div class="search-tree flex-g0 flex-s0">
                <groupTree 
                    ref="crudClassifyTree"
                    :on-search="onSearch"
                    :params="params"
                    @selectItem="selectTreeItem"
                />
                <!-- <el-tree :data="grouList" :props="defaultProps" @node-click="handleNodeClick" /> -->
            </div>
            <div class="tab-box flex-g1 flex-s1 pl16">
                <div class="cate-name fs16 c26 fwb">{{ activityGroup.name }}</div>
                <CustomerTable
                    :table-title="tableTitle"
                    :table-data="tableData"
                    :need-pagination="true"
                    :height="'calc(100vh - 450px)'"
                    class="cs-goods-table"
                    :class="{'is-collapse': $store.state.settings.mode === 'pc' && $store.state.settings.sidebarCollapse}"
                > 
                    <template #select="scope">
                        <!-- <div 
                            class="select-icon flex felx-align-center flex-justify-center" 
                            :class="[scope.data.code_id == selectItem.member_code_id ? 'select-icon-active' : '']"
                            @click="checkItem(scope.data)"
                        >
                            <i class="el-icon-check cfff fs8" />
                        </div> -->
                        <!-- <div class="goods-check">
                            <img :src="getCheckImageUrl(scope.data.code_id)" alt="选择" @click="checkItem(scope.data)">
                        </div> -->
                        <el-radio v-model="radiaoSelectSelect.member_code_id" :label="scope.data.code_id" @click="checkItem(scope.data)">&nbsp;</el-radio>
                    </template>
                    <template #code_url="scope">
                        <div class="">
                            <!-- {{ selectItem }} -->
                            <img class="qr-img" :src="baseUrl + scope.data.code_url" alt="二维码">
                        </div>
                    </template>
                    <template #member_arr="{data}">
                        <!-- {{ data.member_arr }} -->
                        <label class="textClass">
                            <span v-if="!data.member_arr[0]"> — </span>
                            <span v-else-if="data.member_arr.length == 1" class="event-list-page flex">
                                <span v-for="(item, index) in data.member_arr" :key="index">
                                    <div class="icon-in-td">
                                        <img 
                                            v-if="item.qw_avatar"
                                            :src="item.qw_avatar"
                                            :alt="item.qw_avatar"
                                        >
                                    </div>
                                    <span class="cl-blue member-name">
                                        <div> {{ item.qw_name }}<span v-show="item.parent_name"> / {{ item.parent_name }}</span></div>
                                    </span>
                                </span>
                            </span>
                            <el-popover
                                v-else
                                width="400"
                                trigger="click"
                            >
                                <div class="event-list-page flex">
                                    <span v-for="(item, index) in data.member_arr" :key="index" class="mr16">
                                        <div class="icon-in-td">
                                            <img 
                                                v-if="item.qw_avatar"
                                                :src="item.qw_avatar"
                                                :alt="item.qw_avatar"
                                            >
                                        </div>
                                        <span class="cl-blue member-name">
                                            <div> {{ item.qw_name }} <span v-show="item.parent_name"> / {{ item.parent_name }}</span></div>
                                        </span>
                                    </span>
                                </div>
                                <!-- <memberCheck
                                    :member-data="data.member_arr"
                                /> -->
                                <template #reference>
                                    <span class="event-list-page">
                                        <span v-for="(item, index) in data.member_arr.slice(0, 1)" :key="index" class="mr8">
                                            <div class="icon-in-td">
                                                <img 
                                                    v-if="item.qw_avatar"
                                                    :src="item.qw_avatar"
                                                    :alt="item.qw_avatar"
                                                >
                                            </div>
                                            <span class="cl-blue member-name">
                                                {{ item.qw_name }} <span v-show="item.parent_name"> / {{ item.parent_name }} ...
                                                </span>
                                            </span>
                                        </span>
                                    </span></template>
                            </el-popover>
                        </label>
                    </template>
                    <template #tag_arr="scope">
                        <div v-if="scope.data.tag_arr.length <= 1">
                            <customerTag
                                v-for="item in scope.data.tag_arr"
                                :key="item.tag_name"
                                :left-title="item.tag_group_name"
                                :right-title="item.tag_name"
                                :color="
                                    item.tag_group_type === 'HQ' ? '#409eff' : '#FF6F00'
                                "
                                :customer-style="{ 'margin-bottom': 0 }"
                            />
                        </div>
                        <el-popover
                            v-else
                            placement="bottom"
                            trigger="hover"
                            popper-class="key-word-pop"
                            width="542"
                        >
                            <div class="member-tag-pop">
                                <customerTag
                                    v-for="key in scope.data.tag_arr"
                                    :key="key.tag_name"
                                    :left-title="key.tag_group_name"
                                    :right-title="key.tag_name"
                                    :color="
                                        key.tag_group_type === 'HQ' ? '#409eff' : '#FF6F00'
                                    "
                                    :right-text-break="false"
                                    :right-text-auto="true"
                                />
                            </div>
                            <template #reference>
                                <div>
                                    <customerTag
                                        :left-title="scope.data.tag_arr[0].tag_group_name"
                                        :right-title="scope.data.tag_arr[0].tag_name"
                                        :color="
                                            scope.data.tag_arr[0].tag_group_type === 'HQ'
                                                ? '#409eff'
                                                : '#FF6F00'
                                        "
                                        :customer-style="{ 'margin-bottom': 0 }"
                                    />
                                    <span>...</span>
                                </div>
                            </template>
                        </el-popover>
                        <div v-if="!scope.data.tag_arr[0]">—</div>
                    </template>
                </CustomerTable>
                <!-- 分页 -->
                <customer-pagination
                    v-model:limit="params.page_size"
                    v-model:page="params.page_num"
                    :total="total"
                    :get-data="getmemberList"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Http from '@/util/request'
import { ElMessage } from 'element-plus'
import groupTree from './groupTree.vue'

const props = defineProps({
    selectItem: {
        type: Object,
        default: () => {}
    }
    // type: {
    //     type: String,
    //     default: 'all'
    // }
})
// console.log(props)
const emits = defineEmits(['update:selectItem', 'selectCode'])
const baseUrl = import.meta.env.VITE_APP_API_BASEURL

// const defaultProps = ref({
//     children: 'tag_arr',
//     label: 'tag_name'
// })
// 点击搜索传入树搜索
const onSearch = ref(false)

const creatTime = ref([])

const params = ref({
    search_name: '',
    start_time: '',
    end_time: '',
    search_member_id_arr: [],
    search_department_id_arr: [],
    page_num: 1,
    page_size: 10,
    group_id: ''
})
const activityGroup = ref({})

const radiaoSelectSelect = ref({
    member_code_id: props.selectItem.member_code_id,
    type: props.selectItem.type
})

const tableData = ref([])
const total = ref(0)
// const grouList = ref([])
console.log(props)
const tableTitle = ref([
    {
        label: '',
        prop: 'select',
        type: 'slot',
        width: 50
    },
    {
        label: '二维码',
        prop: 'code_url',
        width: 96,
        type: 'slot'
    },
    {
        label: '成员活码名称',
        prop: 'code_name',
        width: 120
    },
    {
        label: '配置成员',
        prop: 'member_arr',
        width: 180,
        type: 'slot'
    }, 
    {
        label: '描述',
        prop: 'code_description',
        width: 100
    }, 
    {
        label: '创建时间',
        prop: 'create_time',
        width: 180
    }, 
    {
        label: '引流人数',
        prop: 'code_drainage_num'
    },
    { 
        label: '关联标签',
        prop: 'tag_arr',
        type: 'slot',
        width: 278
    }
])
const addMemberDialogRef = ref(null)
const writeBackSelectedMemberOrg = ref([])

// 图片引入
// const getCheckImageUrl = id => {
//     let name = id == props.selectItem.member_code_id ? 'checked' : 'no_check'
//     return new URL(`../../../../assets/images/mall/${name}.svg`, import.meta.url).href
// }
// 选择活码
const checkItem = row => {
    let obj = {
        member_code_id: row.code_id,
        type: props.selectItem.type
    }
    emits('update:selectItem', obj)
    // emits('selectCode', obj)
    // console.log()
}

function customSelectedFn(data, len) {
    const maxLen = 200
    if (len >= maxLen) {
        ElMessage({
            message: `最多支持客户人数${maxLen}人`,
            type: 'error'
        })
        return false
    } else {
        return true
    }
}
function confirmChooseMember(r) {
    writeBackSelectedMemberOrg.value = r
    let member_id = []
    let department_id = []
    if (r && Array.isArray(r)) {
        r.map(ele => {
            if (ele.isOrg) {
                department_id.push(ele.id)
            } else {
                member_id.push(ele.id)
            }
        })
        params.value.search_member_id_arr = member_id
        params.value.search_department_id_arr = department_id
    }
    if (addMemberDialogRef.value) {
        addMemberDialogRef.value.dialogVisible = false
    }
}
function getShowStr(arr, len) {
    return `${arr
        .slice(0, len)
        .map(ele => ele['member_name'] || ele['department_name'])
        .join('，')}${arr.length > len ? '...' : ''}`
}

// 时间变动
const changeTime = () => {
    if (creatTime.value[0]) {
        params.value.start_time = creatTime.value[0]
        params.value.end_time = creatTime.value[1]
        return
    }
    params.value.start_time = ''
    params.value.end_time = ''
}

const selectTreeItem = item => {
    // console.log('----', item)
    if (!item) {
        tableData.value = []
        return
    }
    activityGroup.value = item
    params.value.group_id = item.id || ''
    // params.value.code_name = item.code_name || ''
    // params.value.search_member_id_arr = item.search_member_id_arr || ''
    // params.value.search_department_id_arr = item.search_department_id_arr || ''
    getmemberList()
}

const onReset = () => {
    params.value = {
        search_name: '',
        start_time: '',
        end_time: '',
        search_member_id_arr: [],
        search_department_id_arr: [],
        page_num: 1,
        page_size: 10,
        group_id: ''
    }
    writeBackSelectedMemberOrg.value = []
    onSearch.value = !onSearch.value
}

// 获取成员列表
const getmemberList = async() => {
    const { data } = await Http.getmemberList(params.value)
    // console.log('答应打飞发机', data)
    tableData.value = data.list || []
    total.value = data.total_num || 0
}

// onMounted(() => {
//     getmemberList()
// })
</script>

<style lang="scss">
    .search-box {
        border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
    }
    .search-tree {
        width: 280px;
        height: 53vh;
        overflow-y: scroll;
    }
    .tab-box {
        // max-height: 53vh;
        border-left: 2px solid #edeef2;
        width: calc(100% - 280px);
        .cs-goods-table {
            width: 100%;
        }
    }
    .qr-img {
        display: block;
        width: 42px;
        height: 42px;
    }

    .select-icon {
        box-sizing: border-box;
        display: block;
        width: 16px;
        height: 16px;
        border-radius: 8px;
        border: 1px solid #bfbfbf;
    }
    .select-icon-active {
        box-sizing: border-box;
        display: block;
        width: 16px;
        height: 16px;
        border-radius: 8px;
        border: 1px solid #1773FA;
        background-color: #1773FA;
        padding-top: 2px;
        padding-left: 1px;
        i {
            display: block;
        }
    }
</style>