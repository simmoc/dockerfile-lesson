<template>
    <div>
        <div class="search-form">
            <div class="flex flex-justify-between">
                <div class="flex-1 search-form-margin">
                    <el-form
                        label-position="right"
                        :inline="true"
                        :model="form.search"
                        size="small"
                        label-width="120px"
                    >
                        <el-form-item label="企微成员：">
                            <selectMember
                                ref="addMemberDialogRef"
                                input-placeholder="请选择企微成员"
                                :is-multiple-selected="true"
                                :custom-input-value-fn="form.customInputValueFn"
                                :custom-selected-fn="customSelectedFn"
                                style="width: 200px"
                                @confirm="confirmChooseMember"
                            >
                                <template #default="scope">
                                    <span>
                                        <!-- {{ scope }} -->
                                        <el-input
                                            v-model="scope.data"
                                            placeholder="请选择"
                                            suffix-icon="el-icon-caret-bottom"
                                            readonly
                                        />
                                    </span>
                                </template>
                            </selectMember>
                        </el-form-item>
                        <el-form-item label="文本内容 ：">
                            <el-input
                                v-model.trim="form.search.search_content"
                                style="width: 210px"
                                size="small"
                                placeholder="请输入文本内容"
                                show-word-limit
                                clearable
                                @clear="headSearch"
                                @keyup.enter="headSearch"
                            />
                        </el-form-item>
                        <el-form-item
                            label="发送次数排名 ："
                            class="separate-radio"
                        >
                            <el-radio-group v-model="form.search.search_send_num_type">
                                <el-radio-button
                                    :label="1"
                                    @click.prevent="clickRadioItem(1)"
                                >
                                    前30%
                                </el-radio-button>
                                <el-radio-button
                                    :label="2"
                                    style="margin-left: -3px"
                                    @click.prevent="clickRadioItem(2)"
                                >
                                    后30%
                                </el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" @click="resetHeadSearch">重置</el-button>
                            <el-button type="primary" size="small" @click="headSearch">
                                查询
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <page-main class="flex flex-direction-column search-table-page event-list-page">
            <div v-if="form.tableData.length > 0">
                <!-- <div class="content-wrap flex flex-direction-column flex-1 bg-color-fff p24"> -->
                <div class="flex-1 flex-direction-column">
                    <div class="table-head flex flex-justify-between">
                        <div class="table-head-left overflow-ellipsis">
                            <div
                                class="delete-btn"
                                :class="{ 'delete-width': form.currentSelectAll.length > 0 }"
                                @click="multiDelete('是否删除已选择话术','deleteMember')"
                            >
                                <span>批量删除</span>
                                <div
                                    v-show="form.currentSelectAll.length > 0"
                                    class="delete-num"
                                >
                                    {{ form.currentSelectAll && form.currentSelectAll.length }}
                                </div>
                            </div>
                            <!--            <el-button-->
                            <!--              size="small"-->
                            <!--              @click="multiDelete('是否删除已选择话术', 'deleteMember')"-->
                            <!--            >-->
                            <!--              <span class="vertical-middle">批量删除</span>-->
                            <!--              <el-badge-->
                            <!--                :value="currentSelectAll.length"-->
                            <!--                class="delete-num"-->
                            <!--                v-show="currentSelectAll.length > 0"-->
                            <!--              ></el-badge>-->
                            <!--            </el-button>-->
                        </div>
                        <div class="table-head-right" />
                    </div>
                    <!-- <div class="table-body"> -->
                    <CustomerTable
                        ref="multipleTable"
                        :table-data="form.tableData"
                        style="width: 100%; position: relative"
                        size="small"
                    >
                        <el-table-column width="55">
                            <!-- <template #default="scope" #header>
                                    <div>
                                        批量
                                    </div>
                                </template> -->
                            <template #header>
                                <div>批量</div>
                            </template>
                            <template #default="scope">
                                <el-checkbox
                                    v-model="scope.row.checked"
                                    @change="getSelect($event, scope.row)"
                                />
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="企微成员"
                            show-overflow-tooltip
                            min-width="80px"
                        >
                            <template #default="scope">
                                <div class="flex flex-align-center">
                                    <div class="icon-in-td">
                                        <img
                                            v-if="scope.row.qw_thumb_avatar"
                                            :src="scope.row.qw_thumb_avatar"
                                            :alt="scope.row.qw_thumb_avatar"
                                        >
                                    </div>
                                    <el-popover
                                        placement="right"
                                        width="400"
                                        trigger="click"
                                        popper-class="member-info-pop"
                                    >
                                        <div class="member-info-header">
                                            成员名片
                                        </div>
                                        <div class="member-info">
                                            <img
                                                :src="scope.row.qw_thumb_avatar"
                                                class=""
                                            >
                                            <div class="">
                                                <div>
                                                    <span
                                                        class="
                                                                fs16
                                                                fw400
                                                                color-black
                                                            "
                                                    >
                                                        {{ scope.row.qw_name }}
                                                    </span>
                                                    <i
                                                        class="color-primary"
                                                        :class="{
                                                            'el-icon-male': scope.row.qw_gender == 1 || scope.row.qw_gender == 0,
                                                            'el-icon-female': scope.row.qw_gender == 2
                                                        }"
                                                    />
                                                    <el-tag
                                                        v-if="scope.row.qw_position"
                                                        type="success"
                                                    >
                                                        {{ scope.row.qw_position }}
                                                    </el-tag>
                                                </div>
                                                <div class="pt-10 fs14">
                                                    <span class="pr10">
                                                        手机号：{{ scope.row.qw_phone }}
                                                    </span>
                                                    <i
                                                        class="el-icon-document-copy"
                                                        @click="copy(scope.row.qw_phone)"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <ul>
                                            <li
                                                class="
                                                        flex
                                                        member-detail-li
                                                    "
                                            >
                                                <div class="member-detail-left ">
                                                    对外职务
                                                </div>
                                                <div class="member-detail-right">
                                                    {{ scope.row.qw_external_position || "-" }}
                                                </div>
                                            </li>
                                            <li
                                                class="
                                                        flex
                                                        member-detail-li
                                                    "
                                            >
                                                <div class="member-detail-left">
                                                    所属部门
                                                </div>
                                                <div class="member-detail-right">
                                                    {{ scope.row.qw_department_name || "-" }}
                                                </div>
                                            </li>
                                            <li
                                                class="
                                                        flex
                                                        member-detail-li
                                                    "
                                            >
                                                <div class="member-detail-left">
                                                    邮箱
                                                </div>
                                                <div class="member-detail-right">
                                                    {{ scope.row.qw_email || "-" }}
                                                </div>
                                            </li>
                                            <li
                                                class="
                                                        flex
                                                        member-detail-li
                                                    "
                                            >
                                                <div class="member-detail-left">
                                                    座机
                                                </div>
                                                <div class="member-detail-right">
                                                    {{ scope.row.qw_phone || "-" }}
                                                </div>
                                            </li>
                                            <li
                                                class="
                                                        flex
                                                        member-detail-li
                                                    "
                                            >
                                                <div class="member-detail-left">
                                                    地址
                                                </div>
                                                <div class="member-detail-right">
                                                    {{ scope.row.qw_address || "-" }}
                                                </div>
                                            </li>
                                        </ul>
                                        <template #reference>
                                            <span class="cl-blue member-name">
                                                {{ scope.row.qw_name }} /
                                                {{
                                                    scope.row.qw_department_name
                                                }}
                                            </span>
                                        </template>
                                    </el-popover>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="内容"
                            prop="content"
                            min-width="150px"
                        >
                            <template #default="{ row }">
                                <div v-if="row.content.length <= 34">
                                    {{ row.content }}
                                </div>
                                <el-popover
                                    v-else
                                    placement="bottom"
                                    width="400"
                                    trigger="hover"
                                    popper-class="member-info-pop"
                                >
                                    <div class="popover-content-box">
                                        {{ row.content }}
                                    </div>
                                    <template #reference>
                                        <div class="popover-content">
                                            {{ row.content.substring(0, 34) }}
                                            ...
                                        </div>
                                    </template>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="发送次数"
                            prop="send_num"
                            show-overflow-tooltip
                        />
                        <el-table-column
                            label="操作"
                            width="160px"
                            fixed="right"
                        >
                            <template #default="scope">
                                <el-button
                                    type="text"
                                    size="mini"
                                    @click="
                                        showConfirm(
                                            '是否删除该话术',
                                            'deleteMember',
                                            [scope.row.sale_script_id]
                                        )
                                    "
                                >
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </CustomerTable>
                    <!-- </div> -->
                    <div class="table-pagination-wrap flex flex-justify-end">
                        <el-pagination
                            v-if="form.tableData && form.tableData.length"
                            :current-page="form.pageNo"
                            :page-sizes="form.pageSizes"
                            :page-size="form.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="form.totalNo"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                        />
                    </div>
                </div>
                <!-- 删除知识 -->
                <el-dialog v-model="form.dialogIsKnowdege" width="30%">
                    <template #title>
                        <div>
                            <span class="new-group-title">提示</span>
                        </div>
                    </template>

                    <div class="dialog-body">
                        <div class="group_name">{{ form.deleteMsg }}</div>
                    </div>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="form.dialogIsKnowdege = false">取 消</el-button>
                            <el-button type="primary" @click="deleteMember(form.deleteMemberId)">确 定</el-button>
                        </span>
                    </template>
                </el-dialog>
                <!-- </div> -->
            </div>
            <div v-else>
                <NoData>
                    <template #content>
                        <div>暂无成员话术!</div>
                    </template>
                </NoData>
            </div>
        </page-main>
    </div>
</template>

<script setup>
import http from '@/util/request'
import { onMounted, reactive } from 'vue'
import NoData from '@/components/NoData/index.vue'
import { ElMessage } from 'element-plus'

const form = reactive({
    writeBackSelectedMemberOrg: [],
    search: {
        search_send_num_type: '',
        search_content: ''
    },
    dialogIsKnowdege: false,
    pageNo: 1,
    pageSizes: [10, 15, 20],
    tableData: [],
    pageSize: 10,
    totalNo: 0,
    param: {},
    currentSelectAll: [],
    customInputValueFn: param => {
        return getShowStr(param, 3) || ''
    },
    deleteMsg: '',
    deleteMemberId: ''
})
const addMemberDialogRef = ref(null)
onMounted(() => {
    getTableData()
})
function copy(data) {
    let url = data
    let oInput = document.createElement('input')
    oInput.value = url
    document.body.appendChild(oInput)
    oInput.select() // 选择对象;
    document.execCommand('Copy') // 执行浏览器复制命令
    ElMessage({
        message: '复制成功',
        type: 'success'
    })
    oInput.remove()
}
function clickRadioItem(e) {
    e === form.search.search_send_num_type
        ? (form.search.search_send_num_type = '')
        : (form.search.search_send_num_type = e)
    getTableData()
    form.currentSelectAll = []
}
function getSelect(checked, node) {
    if (!checked) {
        let current = ''
        form.currentSelectAll.forEach((item, i) => {
            if (item.sale_script_id === node.sale_script_id)
                current = i
        })
        form.currentSelectAll.splice(current, 1)
    } else {
        let flag = false
        form.currentSelectAll.forEach(current => {
            if (current.sale_script_id === node.sale_script_id)
                flag = true
        })
        !flag && form.currentSelectAll.push(node)
    }
}
function getShowStr(arr, len) {
    return `${arr
        .slice(0, len)
        .map(ele => ele['member_name'] || ele['department_name'])
        .join('，')}${arr.length > len ? '...' : ''}`
}
function headSearch() {
    getTableData()
}
function resetHeadSearch() {
    form.search = {
        search_send_num_type: '',
        search_content: '',
        search_department_id_arr: [],
        search_member_id_arr: []
    }
    console.log('111111', addMemberDialogRef)
    // addMemberDialogRef.value.inputValue = ''
    // 调用子组件函数
    addMemberDialogRef.value.resetSelect()
    getTableData()
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
    form.writeBackSelectedMemberOrg = r
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
        form.search.search_department_id_arr = department_id
        form.search.search_member_id_arr = member_id
        headSearch()
    }
    if (addMemberDialogRef.value) {
        addMemberDialogRef.value.dialogVisible = false
    }
}
function deleteMember(sale_script_id_arr) {
    http.deleteSaleScript({
        sale_script_id_arr
    }).then(res => {
        if (res.code === 200 || res.code === 0) {
            form.currentSelectAll = []
            ElMessage.success('删除成功！')
            form.dialogIsKnowdege = false
            getTableData()
        }
    }).catch(() => {})
}
async function getTableData() {
    let param = {
        ...form.search,
        page_num: form.pageNo,
        page_size: form.pageSize
    }
    http.getSaleScriptList(param)
        .then(res => {
            form.tableData = res.data && res.data.list
            form.totalNo = res.data && res.data.total_num
            form.tableData.map(item => {
                item.checked = false
            })
            setTimeout(() => {
                if (form.currentSelectAll.length > 0) {
                    form.tableData.forEach(item => {
                        form.currentSelectAll.forEach(row => {
                            if (item.sale_script_id === row.sale_script_id) {
                                item.checked = true
                            }
                        })
                    })
                }
            }, 200)
        })
        .catch(() => {})
}
function handleSizeChange(val) {
    form.pageSize = val
    form.pageNo = 1
    getTableData()
}
function showConfirm(msg, fn, arg) {
    form.deleteMsg = msg
    form.dialogIsKnowdege = true
    form.deleteMemberId = arg
}
async function handleCurrentChange(val) {
    form.pageNo = val
    await getTableData()
}
function multiDelete(msg, fn) {
    if (form.currentSelectAll.length == 0) {
        ElMessage.error('请选择删除的成员')
        return
    }
    showConfirm(msg, fn, form.currentSelectAll)
}
</script>

<style scoped lang="scss">
@import './index.scss';
@import '../../../assets/styles/pageCommonStyle/searchTable.scss';
.search-form {
        padding: 24px;
        background-color: #fff;
        margin: 24px;
}
.overflow-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
