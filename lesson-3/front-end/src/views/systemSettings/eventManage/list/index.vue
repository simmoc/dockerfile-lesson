<template>
    <div>
        <div class="search-form">
            <div class="search-head-wrap flex flex-justify-between pb0">
                <div class="search-head-left flex-1">
                    <el-form
                        label-position="left"
                        :inline="true"
                        :model="ReacData.search"
                        size="mini"
                        class="search-form-inline"
                        label-width="auto"
                    >
                        <el-form-item label="主体：" class="mb24 mr24 subject-id">
                            <el-select
                                v-model="ReacData.search.subject_id"
                                :class="[
                                    'custom-subject-el-select',
                                    ReacData.search.subject_id ? 'select-text' : 'select-empty'
                                ]"
                                placeholder="请选择人的主体"
                                size="mini"
                                @change="subjectChange"
                            >
                                <template v-if="ReacData.search.subject_id" #prefix>
                                    <div
                                        class="custom-subject-el-select-input-icon flex flex-justify-center flex-align-center"
                                    >
                                        <img
                                            v-if="ReacData.search.platform_type"
                                            class="img"
                                            :src="
                                                getImageUrl(ReacData.search.platform_type)
                                            "
                                            alt=""
                                        >
                                    </div>
                                </template>
                                <el-option
                                    v-for="item in ReacData.subjectOption"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                >
                                    <div
                                        class="custom-subject-option flex flex-justify-start flex-align-center"
                                    >
                                        <div class="custom-subject-option-img-wrap flex flex-align-center">
                                            <img
                                                v-if="item.platform_type"
                                                class="img"
                                                :src="
                                                    getImageUrl(item.platform_type)
                                                "
                                                alt=""
                                            >
                                        </div>
                                        <div class="pl8">{{ item.name }}</div>
                                    </div>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="事件标识 ：" class="mb24 mr24">
                            <el-input
                                v-model.trim="ReacData.search.event_key"
                                style="width: 210px"
                                size="mini"
                                placeholder="请输入"
                                show-word-limit
                                clearable
                                @clear="headSearch"
                                @keyup.enter="headSearch"
                            />
                        </el-form-item>
                        <el-form-item label="事件名称 ：" class="mb24 mr24">
                            <el-input
                                v-model.trim="ReacData.search.event_name"
                                style="width: 210px"
                                size="mini"
                                placeholder="请输入"
                                show-word-limit
                                clearable
                                @clear="headSearch"
                                @keyup.enter="headSearch"
                            />
                        </el-form-item>
                    </el-form>
                </div>
                <div class="search-head-right">
                    <el-button size="mini" @click="resetHeadSearch">重置</el-button>
                    <el-button type="primary" size="mini" @click="headSearch">
                        查询
                    </el-button>
                </div>
            </div>
        </div>
        <page-main>
            <div class="event-list-page search-table-page flex flex-direction-column">
                <!-- <div class="page-title-head pl24">
            {{ $route.meta && $route.meta.title }}
        </div> -->
                <div class="content-wrap flex flex-direction-column flex-1">
                    <div class="flex-1 flex flex-direction-column content-main-right">
                        <div class="table-head flex flex-justify-between">
                            <div class="table-head-left overflow-ellipsis flex-align-start">数据列表</div>
                            <div class="table-head-right">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    icon="el-icon-plus"
                                    @click="handleListItemAdd"
                                >
                                    新增自定义事件
                                </el-button>
                            </div>
                        </div>
                        <CustomerTable
                            :table-title="tableTitle"
                            :table-data="ReacData.tableData"
                            :need-pagination="true"
                        >
                            <template #human="scope">
                                <div class="flex-row flex-align-center">
                                    <div class="icon-in-td">
                                        <img
                                            v-if="scope.data.platform_type"
                                            :src="
                                                getImageUrl(scope.data.platform_type)
                                            "
                                            :alt="scope.data.platform_name"
                                        >
                                    </div>
                                    <span>{{ scope.data.human }}</span>
                                </div>
                            </template>
                            <el-table-column label="操作" width="160px" fixed="right">
                                <template #default="scope">
                                    <el-button
                                        type="text"
                                        size="mini"
                                        @click="handleListItemRecord(scope.row, scope.index)"
                                    >
                                        历史事件
                                    </el-button>
                                    <el-button
                                        type="text"
                                        size="mini"
                                        @click="handleListItemEdit(scope.row, scope.index)"
                                    >
                                        编辑
                                    </el-button>
                                </template>
                            </el-table-column>
                        </CustomerTable>
                        <div class="table-pagination-wrap flex flex-justify-end">
                            <el-pagination
                                v-if="ReacData.tableData && ReacData.tableData.length"
                                :current-page="ReacData.pageNo"
                                :page-sizes="ReacData.pageSizes"
                                :page-size="ReacData.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="ReacData.totalNo"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </page-main>
    </div>
</template>
<script setup>
import Http from '@/util/request.js'
import { onMounted, reactive } from 'vue-demi'
import { useRouter, useRoute } from 'vue-router'
function getImageUrl(url) {
    return new URL(`../../../../assets/images/eventManage/${url}.svg`, import.meta.url).href
}
// --------变量申明-----------------
const router = useRouter()
const route = useRoute()
const ReacData = reactive({
    search: {
        subject_id: '',
        event_name: '',
        event_key: ''
    },
    subjectOption: [],
    tableData: [],
    pageSize: 10,
    pageNo: 1,
    pageSizes: [10, 15, 20],
    totalNo: 0,
    param: {}
})
const tableTitle = reactive([
    {
        label: '事件标识',
        prop: 'event_key'
    },
    {
        label: '事件类型',
        prop: 'event_type_txt'
    },
    {
        label: '事件名称',
        prop: 'event_name'
    },
    {
        label: '人',
        prop: 'human',
        type: 'slot'
    },
    {
        label: '货',
        prop: 'good'
    },
    {
        label: '场',
        prop: 'scene'
    },
    {
        label: '创建时间',
        prop: 'create_time'
    }
])

// ------生命周期---------
onMounted(() => {
    getSubjectData()
    getTableData()
})

// 主体下拉选择
const getSubjectData = () => {
    Http
        .getTagSubjectsKey()
        .then(res => {
            let result = res.data

            let humanArr = result.filter(ele => {
                return ele.type === 'HUMAN'
            })
            if (humanArr && humanArr.length && humanArr[0] && humanArr[0].data) {
                ReacData.subjectOption = humanArr[0].data
                // console.log('选择框', ReacData.subjectOption)
            } else {
                ReacData.subjectOption = []
            }

            nextTick(() => {})
        })
        .catch(() => {})
}
const getTableData = () => {
    // 查询参数
    let param = {
        ...ReacData.search,
        page_no: ReacData.pageNo,
        page_size: ReacData.pageSize
    }

    Http
        .getEventList(param)
        .then(res => {
            console.log(res.data)
            ReacData.tableData = res.data && res.data.list
            ReacData.totalNo = res.data && res.data.count
            nextTick(() => {})
        })
        .catch(() => {})

    console.log('table 参数===', param)
}

function handleSizeChange(val) {
    ReacData.pageSize = val
    ReacData.pageNo = 1
    getTableData()
}
function handleCurrentChange(val) {
    ReacData.pageNo = val
    getTableData()
}
function headSearch() {
    getTableData()
}

// 主体变更
function subjectChange() {
    let fid = ReacData.search.subject_id
    let fArr = ReacData.subjectOption.filter(ele => {
        return ele.id === fid
    })
    if (fArr && fArr[0]) {
        // ReacData.$set(ReacData.search, 'platform_type', fArr[0].platform_type)
        ReacData.search.platform_type = fArr[0].platform_type
    }
}
function resetHeadSearch() {
    ReacData.search = {
        subject_id: '',
        event_name: '',
        event_key: ''
    }
    getTableData()
}
function handleListItemRecord(row) {
    router.push({
        path: '/event/eventManage/eventRecord',
        query: {
            id: row.id,
            page_no: ReacData.pageNo,
            from_page: route.name
        }
    })
}

function handleListItemAdd() {
    router.push({
        path: '/event/eventManage/eventAdd',
        query: {
            type: 'add',
            page_no: ReacData.pageNo,
            from_page: route.name
        }
    })
}
function handleListItemEdit(row) {
    router.push({
        path: '/event/eventManage/eventEdit',
        query: {
            type: 'edit',
            id: row.id,
            page_no: ReacData.pageNo,
            from_page: route.name
        }
    })
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/pageCommonStyle/searchTable.scss';
@import '@/assets/styles/cusstyle/custom-subject.scss';
/* 表格页搜索条件 */
.search-form {
  padding: 24px;
  padding-bottom: 0;
  background-color: #fff;
  margin: 24px;
}

.event-list-page {
  .search-form-inline {
    :deep(.el-form-item):nth-child(1) {
      .el-form-item__label-wrap {
        margin-left: 0 !important;
      }
    }
  }

  .icon-in-td {
    width: 22px;
    height: 22px;
    text-align: center;
    display: inline-block;
    margin-right: 9px;
    img {
      width: 100%;
    }
  }
}
</style>
