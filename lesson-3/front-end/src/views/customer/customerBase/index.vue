<template>
    <div>
        <!-- <template> -->
        <div class="search-form">
            <!-- 表单 -->
            <el-form inline size="small">
                <el-form-item label="群名" prop="keyword">
                    <el-input
                        v-model="form.formData.keyword"
                        placeholder="请输入群名"
                    />
                </el-form-item>
                <el-form-item label="群主选择" prop="members">
                    <selectMember
                        ref="addMemberDialogRef"
                        input-placeholder="请选择企微成员"
                        :is-group="true"
                        :is-multiple-selected="true"
                        :custom-input-value-fn="customInputValueFn"
                        :custom-selected-fn="customSelectedFn"
                        style="width: 200px"
                        @confirm="confirmChooseMember"
                    >
                        <template #default="scope">
                            <span>
                                <el-input
                                    v-model="scope.data"
                                    placeholder="请选择"
                                    suffix-icon="el-icon-caret-bottom"
                                    readonly
                                />
                            </span>
                        </template>
                    </selectMember>
                    <!-- <MemberTransfer 
                        ref="checkClear"
                        :title="'群主'"
                        :members="handleReset"
                        @selectedList="addSelectedList"
                    /> -->
                </el-form-item>
                <el-form-item label="创建时间" prop="addDate">
                    <el-date-picker
                        v-model="form.formData.addDate"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        value-format="YYYY-MM-DD"
                        @change="handleChangeDate"
                    />
                </el-form-item>
                <!-- 表单操作按钮 -->
                <div class="pagoda-button-group">
                    <el-button @click="handleReset">重置</el-button>
                    <el-button type="primary" @click="handleSubmit">查询</el-button>
                </div>
            </el-form>
            <!-- <div class="total-number">共{{ totalDataNum }}个客户群</div> -->
        </div>

        <!-- 实现一屏展示时 一定要配置表格高度 -->
        <page-main>
            <CustomerTable
                :table-title="form.tableTitle"
                :table-data="form.tableData"
            >
                <template #group_name="scope">
                    <el-button type="text" @click="handleDetail(scope.data.chat_id)">
                        {{ scope.data.group_name }}
                    </el-button>
                </template>
                <template #group_leader="scope">
                    <div class="flex flex-align-center color-primary">
                        <MenberItem 
                            class="table-member-card"
                            :member-id="scope.data.member_id" 
                            :avatar="scope.data.group_leader_avatar"
                            :name="scope.data.group_leader"
                            :department-name="scope.data.group_leader_department"
                        />
                    </div>  
                </template>       
            </CustomerTable> 
            <!-- 分页 -->
            <customer-pagination
                v-model:page="form.formData.page"
                v-model:limit="form.formData.page_size"
                :total="form.totalDataNum"
                :get-data="getList"
            />
        </page-main>
    </div>
</template>
<script setup>
import http from '@/util/request'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
const router = useRouter()
const form = reactive({
    formData: {
        page: 1,
        page_size: 10,
        search_department_id_arr: [], // 部门
        search_member_id_arr: [] // 成员
    },
    tableData: [],
    totalDataNum: 0,
    isTableLoading: false,
    tableTitle: [
        {
            label: '客户群名',
            prop: 'group_name',
            type: 'slot'
        },
        {
            label: '群人数',
            prop: 'group_member_num'
        },
        {
            label: '群主',
            prop: 'group_leader',
            type: 'slot'
        },
        {
            label: '创建时间',
            prop: 'add_time'
        }
    ]
})
// const checkClear = ref(null)
const addMemberDialogRef = ref(null)
function customInputValueFn(param) {
    return getShowStr(param, 3) || ''
}
function getShowStr(arr, len) {
    return `${arr
        .slice(0, len)
        .map(ele => ele['member_name'] || ele['department_name'])
        .join('，')}${arr.length > len ? '...' : ''}`
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
function handleSubmit() {
    if (addMemberDialogRef.value) {
        addMemberDialogRef.value.dialogVisible = false
    }
    form.formData.page = 1
    form.formData.page_size = 10
    getList()
}
function getList() {
    const params = form.formData
    http
        .getGroupChatList(params)
        .then(res => {
            form.tableData = res.data.list || []
            form.totalDataNum = res.data.total_num || 0
        })
        .catch(() => {})
}
function handleReset() {
    // checkClear.value.clearSearch()
    addMemberDialogRef.value.resetSelect()
    form.formData = {
        page: 1,
        page_size: 10
    }
    getList()
}
getList()
// 至详情页
function handleDetail(chatId) {
    router.push({
        name: 'customerBaseDetail',
        query: {
            chatId
        }
    })
}
function handleChangeDate(arr = []) {
    form.formData.start_time = arr[0]
    form.formData.end_time = arr[1]
}
// 搜索添加群主成员
function confirmChooseMember(selectedList) {
    const departmentArr = []
    const memberArr = []
    for (let i = 0;i < selectedList.length;i++) {
        const data = selectedList[i]
        if (data.type == 'MEMBER') {
            memberArr.push(data.id)
        } else {
            departmentArr.push(data.id)
        }
    }

    form.formData.search_department_id_arr = departmentArr
    form.formData.search_member_id_arr = memberArr
}
</script>

<style scoped lang="scss">
// :deep(.el-form-item){
//     width: 200px;
// }
.search-form {
    padding: 24px;
    background-color: #fff;
    margin: 24px;
}
.customer-type {
  display: flex;
  line-height: 40px;
  .el-image {
    width: 40px;
    height: 40px;
    margin-right: 5px;
  }
}
.total-number {
  margin-top: 10px;
  padding: 10px 0 20px;
  border-top: 1px solid #e1e6eb;
}
.company-tag {
  display: inline-block;
  background-color: #00c587;
  color: #fff;
  border-radius: 3px;
  padding: 0 5px;
  margin: 3px;
}
</style>
