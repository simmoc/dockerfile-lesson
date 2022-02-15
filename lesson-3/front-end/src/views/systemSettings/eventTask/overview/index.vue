<template>
    <div>
        <div class="search-form">
            <div class="search-head-wrap flex flex-justify-between bg-color-fff p-24">
                <div class="search-head-left flex-1">
                    <el-form
                        label-position="left"
                        :inline="true"
                        :model="reacData.search"
                        size="mini"
                        class="search-form-inline"
                        label-width="auto"
                    >
                        <el-form-item label="任务生成时间：" class="mr24 mb24">
                            <el-date-picker
                                v-model="reacData.search.create_time"
                                value-format="YYYY-MM-DD HH:mm:ss"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right"
                                style="width: 320px"
                                @change="headSearch"
                            />
                        </el-form-item>
                        <el-form-item label="执行成员：" class="mr24 mb24">
                            <SelectMember
                                ref="addMemberDialogRef"
                                input-placeholder="请选择"
                                :write-back-selected-member-org="reacData.writeBackSelectedMemberOrg"
                                :is-multiple-selected="true"
                                :custom-input-value-fn="reacData.customInputValueFn"
                                :custom-selected-fn="customSelectedFn"
                                style="width: 200px"
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
                            </SelectMember>
                        </el-form-item>
                        <el-form-item label="任务名称：" class="mr24 mb24">
                            <el-select
                                v-model="reacData.search.task_id"
                                placeholder="请选择"
                                size="mini"
                                multiple
                                filterable
                                remote
                                collapse-tags
                                :loading="reacData.taskLoading"
                                :remote-method="getTaskOptionData"
                                class="select-task"
                                @change="headSearch"
                            >
                                <el-option
                                    v-for="item in reacData.taskOption"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                />
                            </el-select>
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
            <div class="event-task-overview-page search-table-page flex flex-direction-column">
                <!-- <div class="page-title-head pl24">
            {{ $route.meta && $route.meta.title }}
        </div> -->
                <div class="content-wrap flex flex-direction-column flex-1">
                    <div class="flex-1 flex flex-direction-column content-main-right">
                        <div class="table-head flex flex-justify-between">
                            <div class="table-head-left overflow-ellipsis">
                                <span class="table-head-left-text">送达率：{{ reacData.touchRate }}</span>
                                <span class="table-head-left-text">
                                    目标客户数：{{ reacData.customerCount }}
                                </span>
                            </div>
                        </div>
                        <div class="table-body content-main-right-table-body">
                            <CustomerTable
                                :table-title="reacData.tableTitle"
                                :table-data="reacData.tableData"
                                :need-pagination="true"
                            >
                                <!-- 成员姓名 -->
                                <template #member_name="scope">
                                    <div class="flex flex-align-center color-primary">
                                        <MenberItem 
                                            class="table-member-card"
                                            :member-id="scope.data.member_id" 
                                            :avatar="scope.data.member_avatar"
                                            :name="scope.data.member_name"
                                            :department-name="scope.data.member_department"
                                        />
                                    </div>
                                </template>
                            </CustomerTable>
                        </div>
                        <div class="table-pagination-wrap flex flex-justify-end">
                            <el-pagination
                                v-if="reacData.tableData.length"
                                :current-page="reacData.pageNo"
                                :page-sizes="reacData.pageSizes"
                                :page-size="reacData.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="reacData.totalNo"
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
import moment from 'moment'
import SelectMember from '@/components/select-member/select-member.vue'
import { ElMessage } from 'element-plus'

const reacData = reactive({
    search: {
        create_time: '',
        sendor: '',
        task_id: ''
    },
    taskLoading: false,
    taskOption: [],
    tableData: [],
    pageSize: 10,
    pageNo: 1,
    pageSizes: [10, 15, 20],
    totalNo: 0,
    param: {},
    touchRate: 0,
    customerCount: 0,
    writeBackSelectedMemberOrg: [],
    customInputValueFn: param => {
        return getShowStr(param, 3) || ''
    },
    tableTitle: [
        {
            label: '成员名称',
            prop: 'member_name',
            type: 'slot'
        },
        {
            label: '任务名称',
            prop: 'name'
        },
        {
            label: '任务生成时间',
            prop: 'create_time_F'
        },
        {
            label: '执行状态',
            prop: 'is_execute_txt'
        },
        {
            label: '执行时间',
            prop: 'receive_time_F'
        },
        {
            label: '目标客户',
            prop: 'customer_name'
        }
    ]
})
const addMemberDialogRef = ref(null)

onMounted(() => {
    getTaskOptionData()
    getTableData()
})

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
function getShowStr(arr, len) {
    return `${arr
        .slice(0, len)
        .map(ele => ele['member_name'] || ele['department_name'])
        .join('，')}${arr.length > len ? '...' : ''}`
}
function confirmChooseMember(r) {
    reacData.writeBackSelectedMemberOrg = r
    var member_id = []
    var department_id = []
    if (r && Array.isArray(r)) {
        r.map(ele => {
            if (ele.isOrg) {
                department_id.push(ele.id)
            } else {
                member_id.push(ele.id)
            }
        })
        reacData.search.department_id = department_id.join(',')
        reacData.search.member_id = member_id.join(',')
        reacData.search.member_arr = r
        headSearch()
    }
    if (addMemberDialogRef) {
        addMemberDialogRef.value.dialogVisible = false
    }
}
// 任务选项 下拉选择
function getTaskOptionData(v) {
    console.log('search', v)
    reacData.taskLoading = true
    let param = {
        keyword: v
    }
    setTimeout(() => {
        reacData.taskLoading = false
        // let res = []
        Http
            .getTaskAllList(param)
            .then(res => {
                reacData.taskOption = res.data

                nextTick(() => {})
            })
            .catch(() => {})
    }, 2000)
}
function getTableData() {
    // 查询参数
    let param = {
        ...reacData.search,
        page_no: reacData.pageNo,
        page_size: reacData.pageSize
    }
    console.log('table 参数===', param)

    Http
        .getOverviewList(param)
        .then(res => {
            console.log(res.data)
            let tableData = res.data && res.data.list
            reacData.totalNo = res.data && res.data.count

            reacData.touchRate = res.data && res.data.touch_rate
            reacData.customerCount = res.data && res.data.customer_count
            // 显示时间处理
            reacData.tableData = tableData.map(ele => {
                if (ele.create_time) {
                    ele.create_time_F = moment(ele.create_time).format('MM-DD HH:mm')
                } else {
                    ele.create_time_F = '-'
                }
                if (ele.receive_time) {
                    ele.receive_time_F = moment(ele.receive_time).format('MM-DD HH:mm')
                } else {
                    ele.receive_time_F = '-'
                }
                return ele
            })

            nextTick(() => {})
        })
        .catch(() => {})
}

function handleSizeChange(val) {
    reacData.pageSize = val
    reacData.pageNo = 1
    getTableData()
}
function handleCurrentChange(val) {
    reacData.pageNo = val
    getTableData()
}
function headSearch() {
    // console.log('日期选中值', reacData.search.create_time)
    getTableData()
}
function resetHeadSearch() {
    reacData.search = {
        subject_id: '',
        event_name: '',
        event_key: ''
    }
    reacData.writeBackSelectedMemberOrg = []
    getTableData()
}
</script>

<style src="../../../../assets/styles/pageCommonStyle/searchTable.scss" lang="scss"></style>
<style scoped lang="scss">
.search-form {
    padding: 24px;
    padding-bottom: 0;
    background-color: #fff;
    margin: 24px;
}
// @import url('./index.scss');
.event-task-overview-page {
  .table-head-left-text {
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    color: rgba(0, 0, 0, 0.85);
    line-height: 22px;
  }
  .table-head-left-text + .table-head-left-text {
    margin-left: 24px;
  }

//   .search-head-wrap {
//     padding: 24px 24px 1px 24px;
//   }
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
<style lang="scss">
.search-head-wrap .select-task.el-select {
  width: 200px;
  .el-select__tags {
    height: 24px;
    overflow: hidden;
  }
  .el-select__tags-text {
    display: inline-block;
    max-width: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-tag__close.el-icon-close {
    top: -5px;
    right: -4px;
  }
}

</style>
