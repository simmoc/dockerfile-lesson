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
                    <MemberTransfer 
                        ref="checkClear"
                        :title="'群主'"
                        :members="handleReset"
                        @selectedList="addSelectedList"
                    />
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
const router = useRouter()
const form = reactive({
    formData: {
        page: 1,
        page_size: 10,
        members: []
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
            prop: 'group_leader'
        },
        {
            label: '创建时间',
            prop: 'add_time'
        }
    ]
})
const checkClear = ref(null)
function handleSubmit() {
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
    checkClear.value.clearSearch()
    form.formData.members = []
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
function addSelectedList(selectedList) {
    form.formData.members = selectedList
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
