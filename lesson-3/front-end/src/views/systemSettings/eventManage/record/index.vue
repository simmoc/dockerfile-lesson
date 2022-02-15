<template>
    <div>
        <div class="search-form">
            <div class="head">
                <!-- <div class="head-r1">{{ ReacData.name }}</div> -->
                <div class="head-r2 mb24">事件标识：{{ ReacData.key }}</div>
                <div class="search-bar">
                    <div class="search-field-item">
                        <div class="search-field-item-label">搜索要素：</div>
                        <el-select
                            v-model="ReacData.fieldId"
                            class="search-field-id"
                            style="width: 170px"
                            size="mini"
                            @change="fieldIdChange"
                        >
                            <el-option
                                v-for="item in ReacData.subjectfields"
                                :key="item.element_key"
                                :label="item.element_name"
                                :value="item.element_key"
                            />
                        </el-select>
                        <el-input
                            v-if="ReacData.fieldShowType === 'INPUT'"
                            v-model="ReacData.fieldValue"
                            class="search-field-value"
                            size="mini"
                            @keyup.enter="getTableData"
                        />
                        <el-date-picker
                            v-if="ReacData.fieldShowType === 'DATETIME'"
                            v-model="ReacData.fieldValue"
                            class="search-field-value"
                            size="mini"
                            placeholder="选择日期时间"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="YYYY-MM-DD HH:mm:ss"
                            value-format="YYYY-MM-DD HH:mm:ss"
                            @change="getTableData"
                        />
                    </div>
                    <div class="search-btn-group">
                        <el-button size="mini" @click="reset">重置</el-button>
                        <el-button size="mini" type="primary" @click="getTableData">
                            查询
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <page-main>
            <div class="page event-record-page only-table-page flex flex-direction-column">
                <!-- <div class="page-title-head pl24 bg-grey">
            {{ $route.meta && $route.meta.title }}
        </div> -->
                <div class="content-wrap p-24">
                    <div class="table-body content-main-right-table-body">
                        <template v-if="ReacData.tableCol && ReacData.tableCol.length">
                            <CustomerTable
                                :table-title="[]"
                                :table-data="ReacData.tableData"
                                :need-pagination="true"
                            >
                                <el-table-column
                                    v-for="item in ReacData.tableCol"
                                    :key="item.name"
                                    :label="item.name"
                                    :prop="item.field"
                                    show-overflow-tooltip
                                    min-width="80px"
                                >
                                    <template #header>
                                        <div class="flex flex-align-center">
                                            <div
                                                v-if="item.type"
                                                class="icon-in-td flex-row flex-align-center"
                                            >
                                                <img
                                                    v-if="
                                                        item.type && ['THIRD', 'BUSINESS'].includes(item.type)
                                                    "
                                                    :src="
                                                        getImageUrl(item.type)
                                                    "
                                                >
                                            </div>
                                            <div>{{ item.name }}</div>
                                        </div>
                                    </template>
                            
                                    <template #default="scope">
                                        <span
                                            :class="[item.is_subject ? 'clickable' : '']"
                                            @click="handleClickTh(item, scope.row)"
                                        >
                                            {{ scope.row[item.field] || '—' }}
                                            <!--  <br>{{ item.field}} -->
                                        </span>
                                    </template>
                                </el-table-column>
                            </CustomerTable>
                        </template>
                    </div>
                    <div class="table-pagination-wrap flex flex-justify-end">
                        <el-pagination
                            v-if="ReacData.tableData.length"
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
                <el-dialog
                    v-model="ReacData.dialogVisible"
                    title="关联主体详情"
                    width="418px"
                    custom-class="event-snap-dialog"
                >
                    <span>快照时间：{{ ReacData.dialogTime }}</span>
                    <el-table
                        :data="ReacData.dialogTableData"
                        style="max-width: 100%; margin-top: 12px"
                        size="mini"
                        height="270"
                        :show-header="true"
                        border
                    >
                        <el-table-column
                            label="字段名称"
                            prop="name"
                            show-overflow-tooltip
                            min-width="80px"
                            class-name="table-column-name"
                        >
                            <template #default="scope">
                                <span class="table-column-name-text">{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="值"
                            prop="content"
                            show-overflow-tooltip
                            min-width="80px"
                        >
                            <template #default="scope">
                                {{ scope.row.content }}
                            </template>
                        </el-table-column>
                    </el-table>
                </el-dialog>
            </div>
        </page-main>
    </div>
</template>

<script setup>
// import { getCurrentInstance  } from 'vue'
import Http from '@/util/request.js'
import { reactive } from 'vue-demi'
import { useRoute } from 'vue-router'
// const router = useRouter()
function getImageUrl(url) {
    return new URL(`../../../../assets/images/eventManage/${url}.svg`, import.meta.url).href
}

// const { proxy }  = getCurrentInstance()
// console.log('代理对象', proxy)
const route = useRoute()
const ReacData = reactive({
    id: '',
    name: '',
    key: '',
    tableData: [],
    tableCol: [],
    pageSize: 10,
    pageNo: 1,
    pageSizes: [10, 15, 20],
    totalNo: 0,
    search: {},

    subjectfields: [],
    fieldId: '',
    fieldValue: '',
    fieldShowType: 'INPUT',

    dialogVisible: false,
    dialogTime: '',
    dialogTableData: []
})

// const tableTitle = reactive([])

onMounted(() => {
    ReacData.id = route && route.query && route.query.id
    getFieldIds()
})

function reset() {
    ReacData.fieldValue = ReacData.fieldShowType === 'DATETIME' ? ['', ''] : ''
    getTableData()
}
async function  handleClickTh(head, data) {
    if (head.is_subject && data[head.field] && data[head.field] != '—') {
        getSnap(data.id, head.subject_id)
    }
}
async function getSnap(events_happen_id, subject_id) {
    let param = {
        events_happen_id: events_happen_id,
        subject_id: subject_id
    }
    await Http
        .getSnapshot(param)
        .then(res => {
            ReacData.dialogTime = res.data.create_time
            ReacData.dialogTableData = res.data.data_snap
            ReacData.dialogVisible = true
        })
        .catch(() => {})
}
// 搜索要素变更
function fieldIdChange(v) {
    let [cur] = ReacData.subjectfields.filter(ele => ele.element_key === v)
    if (cur && cur.element_type === 'DATETIME') {
        ReacData.fieldShowType = 'DATETIME'
        ReacData.fieldValue = ['', '']
    } else {
        ReacData.fieldShowType = 'INPUT'
        ReacData.fieldValue = ''
    }
    getTableData()
}
// 搜索要素选项
function getFieldIds() {
    let param = {
        events_id: ReacData.id
    }
    console.log('要素参数======', param)

    Http
        .getElementList(param)
        .then(res => {
            ReacData.subjectfields = res.data

            ReacData.fieldId = ReacData.subjectfields[0].element_key
            if (
                ReacData.subjectfields[0] &&
                ReacData.subjectfields[0].element_type === 'DATETIME'
            ) {
                ReacData.fieldShowType = 'DATETIME'
            } else {
                ReacData.fieldShowType = 'INPUT'
            }
            // 判断是否是企微
            // let sub_plat_type = 'THIRD'
            getTableData()

            nextTick(() => {})
        })
        .catch(() => {})
}

function getTableData() {
    let param = {
        events_id: ReacData.id
    }
    let filterArr = ReacData.subjectfields.filter(ele => {
        if (ele.element_key === ReacData.fieldId) {
            ele.keyword = ReacData.fieldValue
            return true
        }
    })
    if (filterArr && filterArr.length) {
        param = {
            events_id: route.query && route.query.id,
            elements_info: filterArr[0],
            page_size: ReacData.pageSize,
            page_no: ReacData.pageNo
        }
    }

    console.log('表格参数======', param)
    Http
        .getHistoryList(param)
        .then(res => {
            console.log(res.data)
            ReacData.tableData = res.data && res.data.table_data.list
            console.log('ReacData.tableData', ReacData.tableData)
            ReacData.totalNo = res.data && res.data.table_data.count
            ReacData.name = res.data.event_name
            ReacData.key = res.data.event_key
            ReacData.tableCol = res.data.table_th
            nextTick(() => {})
        })
        .catch(() => {})

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
</script>
<style scoped lang="scss">
@import '@/assets/styles/pageCommonStyle/onlyTable.scss';
/* 表格页搜索条件 */
.search-form {
  padding: 24px;
  background-color: #fff;
  margin: 24px;
}
.head {
    .head-r1 {
      font-size: 22px;
      font-weight: 500;
      text-align: left;
      color: #171717;
      letter-spacing: 1px;
      margin-bottom: 12px;
    }
    .head-r2 {
      font-size: 14px;
      font-weight: 400;
      text-align: left;
      color: rgba(0, 0, 0, 0.65);
      line-height: 22px;
    }
  }
.clickable {
    font-weight: 400;
    text-decoration: underline;
    text-align: left;
    color: #1773fa;
    cursor: pointer;
}
.icon-in-td {
    width: 20px;
    height: 20px;
    margin-right: 6px;
    img {
        width: 100%;
    }
}
.search-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    background: #fff;
    .search-field-item {
        display: flex;
        align-items: center;
        .search-field-item-label {
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            color: #000000;
            line-height: 22px;
            white-space: nowrap;
        }  
    }
    .search-btn-group {
        white-space: nowrap;
    }
}
.search-field-value {
    width: 360px;
    margin-left: 2px;
}
.event-record-page {
//   min-height: calc(100vh - 105px);
  
}
:deep(.event-snap-dialog) {
  .el-dialog__body {
    padding: 24px 24px 46px 24px;
    .table-column-name {
      background: #fafafa;
      .table-column-name-text {
        font-size: 12px;
        font-weight: 500;
        text-align: left;
        color: rgba(0, 0, 0, 0.85);
        line-height: 22px;
      }
    }
  }
}
</style>
