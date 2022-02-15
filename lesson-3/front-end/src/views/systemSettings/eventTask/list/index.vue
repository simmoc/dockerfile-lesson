<template>
    <div>
        <div class="search-form pb24">
            <el-form :inline="true" class="flex flex-justify-between" :model="reacData.form" label-position="right" label-width="120px" size="small">
                <el-form-item label="事件任务名称：" class="mb0">
                    <el-input
                        v-model.trim="reacData.search.code_name"
                        style="width: 210px"
                        size="small"
                        placeholder="请输入名称"
                        show-word-limit
                        clearable
                        @clear="headSearch"
                        @keyup.enter="headSearch"
                    />
                </el-form-item>
                <el-form-item class="mb0 mr0">
                    <el-button type="default" @click="resetHeadSearch">重置</el-button>
                    <el-button type="primary" @click="headSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <page-main>
            <div class="event-task-list-page search-tree-table-page flex flex-direction-column">
                <!-- <div class="page-title-head pl24">事件任务</div> -->
                <div class="page search-tree-table flex flex-direction-column flex-1">
                    <div class="content-wrap flex flex-direction-column flex-1">
                        <div class="content-main flex flex-justify-start flex-1">
                            <div class="left pb16 content-main-left bdr mr16 pr16">
                                <!--  -->
                                <CrudClassifyTreeCom
                                    ref="crudClassifyTree"
                                    :parent-search-params="reacData.search"
                                    :is-select-all-btn="true"
                                    :before-add-children="beforeAddChildren"
                                    :parent-get-tree="reacData.doGetTree"
                                    :parent-add="doAddTree"
                                    :parent-reset="reacData.doResetTree"
                                    :style="{ minHeight: 'calc(100vh - 287px)', height: treeHeight }"
                                    @updatecurrenttreedata="updateCurrentTreeData"
                                />
                            </div>
                            <!-- <div class="mid" /> -->
                            <div class="right flex-1 flex flex-direction-column content-main-right">
                                <div class="table-head flex-row flex flex-justify-between">
                                    <div class="table-head-left overflow-ellipsis">
                                        {{ reacData.currentTreeData.name || '' }}
                                    </div>
                                    <div class="table-head-right">
                                        <el-button
                                            v-if="reacData.currentTreeData && reacData.currentTreeData.id"
                                            type="primary"
                                            size="mini"
                                            icon="el-icon-plus"
                                            @click="handleListItemAdd"
                                        >
                                            新增事件任务
                                        </el-button>
                                    </div>
                                </div>
                                <div class="table-body content-main-right-table-body">
                                    <CustomerTable
                                        v-if="reacData.currentTreeData && reacData.currentTreeData.id"
                                        :table-title="reacData.tableTitle"
                                        :table-data="reacData.tableData"
                                        :need-pagination="true"
                                    >
                                        <template #active="scope">
                                            <el-switch
                                                v-model="scope.data.active"
                                                @change="(e) => handleSwitchChange(scope.data, e)"
                                            />
                                        </template>
                                        <el-table-column label="操作" width="160px" fixed="right">
                                            <template #default="scope">
                                                <el-button
                                                    type="text"
                                                    size="mini"
                                                    @click="handleListItemDetail(scope.row, scope.index)"
                                                >
                                                    查看
                                                </el-button>
                                                <el-button
                                                    type="text"
                                                    size="mini"
                                                    @click="handleListItemEdit(scope.row, scope.index)"
                                                >
                                                    编辑
                                                </el-button>
                                                <el-button
                                                    type="text"
                                                    size="mini"
                                                    @click="handleListItemDel(scope.row, scope.index)"
                                                >
                                                    删除
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                    </CustomerTable>
                                    <div
                                        v-else-if="reacData.tableData && !reacData.tableData.length"
                                        class="empty-tree-data"
                                    >
                                        <NoData>
                                            <template #content>
                                                <div>暂无分组！</div>
                                            </template>
                                            <template #button>
                                                <el-button size="small" type="primary" @click="addNewClassify">新建分组</el-button>
                                            </template>
                                        </NoData>
                                        <!-- <div class="empty-tree-data-txt">暂无分组！</div>
                                        <el-button size="mini" type="primary" @click="addNewClassify">
                                            新建分组
                                        </el-button> -->
                                    </div>
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
                </div>
            </div>
        </page-main>
    </div>
</template>

<script setup>
import Http from '@/util/request'
import CrudClassifyTreeCom from '@/components/crudClassifyTree/crudClassifyTree.vue'
// import { getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import NoData from '@/components/NoData/index.vue'

const route = useRoute()
const router = useRouter()
const crudClassifyTree = ref(null)
// const { proxy } = getCurrentInstance()
const reacData = reactive({
    previewDialog: {
        dialogVisible: false,
        title: '二维码',
        imgUrl: '',
        imgName: ''
    },

    search: {},
    tableData: [],
    pageSize: 10,
    pageNo: 1,
    pageSizes: [5, 10, 15, 20],
    totalNo: 0,
    param: {},
    currentTreeData: {},
    treeHeight: '400px',
    doGetTree: false,
    doAddTree: false,
    doResetTree: false,
    tableTitle: [
        {
            label: '任务名称',
            prop: 'name'
        },
        {
            label: '分组名称',
            prop: 'group_name'
        },
        {
            label: '是否开启',
            prop: 'active',
            type: 'slot'
        },
        {
            label: '创建时间',
            prop: 'create_time'
        },
        {
            label: '更新时间',
            prop: 'update_time'
        },
        {
            label: '创建人',
            prop: 'operator_name'
        }
    ]

})

onMounted(() => {
    getTableData()
    window.addEventListener('resize', resizeFn)
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeFn)

})

function resizeFn() {
    let rightDom = document.querySelector(
        '.right.content-main-right .content-main-right-table-body'
    )
    if (rightDom) {
        reacData.treeHeight = rightDom.clientHeight + 112 + 'px'
    }
}
function beforeAddChildren(data) {
    return new Promise(res => {
        if (data.is_leaf) {
            ElMessageBox.confirm('是否将同级的任务移入到该新建分组？', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    res(true)
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '已取消新增'
                    })
                    res(false)
                })
        } else {
            res(true)
        }
    })
}
function handleSwitchChange(row, e) {
    let beforeConfirm = !e
    row.active = beforeConfirm
    ElMessageBox.confirm(
        `确认${beforeConfirm ? '关闭' : '开启'}${row.name}事件任务吗？`,
        '提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        }
    )
        .then(() => {
            Http
                .getTaskStatus({ id: row.id })
                .then(res => {
                    if (res.code == 0 || res.code == 200) {
                        ElMessage({
                            type: 'success',
                            message: `${beforeConfirm ? '关闭' : '开启'}成功!`
                        })
                        row.active = e
                    }
                })
                .catch(() => {})
        })
        .catch(() => {})
}
function handleListItemAdd() {
    router.push({
        name: 'addEvent',
        query: {
            type: 'add',
            page_no: reacData.pageNo,
            from_page: route.name
        }
    })
}
function handleListItemEdit(row) {
    router.push({
        name: 'editEvent',
        query: {
            type: 'edit',
            id: row.id,
            page_no: reacData.pageNo,
            from_page: route.name
        }
    })
}

function handleListItemDetail(row) {
    router.push({
        name: 'eventDetail',
        query: {
            type: 'detail',
            id: row.id,
            page_no: reacData.pageNo,
            from_page: route.name
        }
    })
}
function handleListItemDel(row) {
    // 任务触发 字段待替换
    if (row.active) {
        ElMessage({
            type: 'error',
            message: '该事件任务不可删除'
        })
        return
    }
    ElMessageBox.confirm('确认是否删除该事件任务?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
    })
        .then(() => {
            Http
                .deleteTask({ id: row.id })
                .then(res => {
                    if (res.code == 0 || res.code == 200) {
                        ElMessage({
                            type: 'success',
                            message: '删除成功!'
                        })
                        getTableData()
                    }
                })
                .catch(() => {})
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消删除'
            })
        })
}

function updateCurrentTreeData(d, pageNo) {
    reacData.currentTreeData = d.id ? JSON.parse(JSON.stringify(d)) : {}
    reacData.pageNo = parseInt(pageNo) || 1
    getTableData()
}
function addNewClassify() {
    // reacData.$refs.crudClassifyTree.handleClickAdd()
    crudClassifyTree.value.handleClickAdd()
    reacData.doAddTree = !reacData.doAddTree
}
// function previewCodeImg(row) {
//     reacData.previewDialog.dialogVisible = true
//     reacData.previewDialog.imgUrl = row.url
//     reacData.previewDialog.imgName = row.code_name
// }
function getTableData() {
    if (!reacData.currentTreeData.id) {
        reacData.tableData = []
        return
    }
    // 查询参数
    let params = {
        ...reacData.search,
        page: reacData.pageNo,
        page_size: reacData.pageSize,
        id: reacData.currentTreeData.id,
        search_name: reacData.currentTreeData.keyword,
        task_key: reacData.search.code_name || ''
    }
    Http
        .getTask(params)
        .then(res => {
            reacData.tableData = res.data && res.data.list
            reacData.totalNo = res.data && res.data.count
            nextTick(() => {
                resizeFn()
            })
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
function resetHeadSearch() {
    reacData.search = {
        code_name: ''
    }
    nextTick(() => {
        // this.$refs.crudClassifyTree.resetTree()
        crudClassifyTree.value.resetTree()
        reacData.doResetTree = !reacData.doResetTree
    })
}
function headSearch() {
    // proxy.$refs.crudClassifyTree.getTreeData()
    console.log('crudClassifyTree.value', crudClassifyTree.value)
    crudClassifyTree.value.getTreeData()
    reacData.doGetTree = !reacData.doGetTree
    getTableData()
}
</script>
<style scoped lang="scss"></style>
<style scoped lang="scss">
@import '@/assets/styles/pageCommonStyle/searchTreeTable.scss';
.no-wrap {
  flex-wrap: nowrap;
}
.event-task-list-page {
  min-height: calc(100vh - 105px);
}

</style>
