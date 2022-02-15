<template>
    <div>
        <div class="search-form">
            <el-form size="small" class="customer-header" inline>
                <el-form-item label="群名" class="customer-header-item">
                    <p>{{ form.groupChatInfo.group_name }}</p>
                </el-form-item>
                <el-form-item label="群主" class="customer-header-item">
                    <p>{{ form.groupChatInfo.group_leader }}</p>
                </el-form-item>
                <el-form-item label="群成员总数" class="customer-header-item">
                    <p>{{ form.groupChatInfo.group_members_num }}人</p>
                </el-form-item>
            </el-form>
            <el-form size="small" class="customer-header" inline>
                <el-form-item label="今日退群" class="customer-header-item">
                    <p>{{ form.groupChatInfo.today_out_nums }}</p>
                </el-form-item>
                <el-form-item label="今日加群" class="customer-header-item">
                    <p>{{ form.groupChatInfo.today_add_nums }}</p>
                </el-form-item>
                <el-form-item label="创建时间" class="customer-header-item">
                    <p>{{ form.groupChatInfo.create_time }}</p>
                </el-form-item>
            </el-form>
        </div>
        <page-main>
            <el-form size="small" inline>
                <el-form-item label="群成员名称" prop="keyword">
                    <el-input
                        v-model="form.formData.keyword"
                        placeholder="请输入群成员名称"
                    />
                </el-form-item>
                <!-- 表单操作按钮 -->
                <el-form-item>
                    <el-button @click="handleReset">重置</el-button>
                    <el-button type="primary" @click="handleSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <CustomerTable
                v-loading="form.isTableLoading"
                :table-data="form.tableData"
            >
                <el-table-column
                    prop="member_name"
                    width="150"
                    label="群成员名称"
                />
                <el-table-column
                    prop="member_type"
                    width="150"
                    label="成员类型"
                />
                <el-table-column
                    prop="member_join_scene"
                    label="进群渠道"
                />
                <el-table-column
                    prop="member_join_time"
                    label="进群时间"
                    show-overflow-tooltip
                />
            </CustomerTable>
            <!-- 分页 -->
            <el-pagination
                v-show="form.totalDataNum !== 0"
                v-model:page="form.formData.page"
                v-model:limit="form.formData.page_size"
                :total="form.totalDataNum"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </page-main>
    </div>
</template>

<script setup>
import http from '@/util/request'
import { reactive } from 'vue-demi'
import { useRoute } from 'vue-router'

const form = reactive({
    formData: {
        page: 1,
        page_size: 10
    },
    groupChatInfo: {},
    isTableLoading: false,
    tableData: [],
    chat_id: '',
    totalDataNum: 0
})
// const router = useRouter()
const route = useRoute()
function handleSubmit() {
    const params = form.formData
    http
        .getGroupChatMemberList(params)
        .then(res => {
            form.tableData = res.data.list || []
            form.totalDataNum = res.data.total_num || 0
            console.log('tableData', form.tableData)
        })
        .catch(() => {})
}
function getGroupChatInfo(params) {
    http
        .getGroupChatInfo(params)
        .then(res => {
            form.groupChatInfo = res.data || {}
        })
        .catch(() => {})
}
function handleReset() {
    form.formData = {
        page: 1,
        page_size: 10,
        keyword: '',
        chat_id: form.chat_id
    }
    handleSubmit()
}
// pageSize 改变时会触发
function handleSizeChange(val) {
    form.formData.page_size = val
    refreshTableData()
}
// currentPage 改变时会触发
function handleCurrentChange(val) {
    form.formData.page = val
    handleSubmit()
}
// 刷新表格数据，重置回第一页
function refreshTableData() {
    form.formData.page = 1
    handleSubmit()
}
// 页面初始化工作
function onInitial() {
    // console.log('chatIdchatIdchatIdchatId', route.query.chatId)
    form.formData.chat_id = route.query.chatId
    form.chat_id = route.query.chatId
    getGroupChatInfo(form.formData)
    handleSubmit(form.formData)
}
onInitial()
</script>
<style scoped lang="scss">
.search-form {
    padding: 24px;
    margin: 24px;
    background: #fff;
}
.customer-header {
    display: flex;
}
.customer-header-item {
    flex: 1;
}
.customer-label {
  display: inline-block;
  background-color: #00c587;
  color: #fff;
  border-radius: 3px;
  padding: 3px 10px;
  margin: 0 5px;
  cursor: pointer;
}
.customer-profile {
  padding-top: 10px;
  border-top: 1px solid #e1e6eb;
  border-bottom: 1px solid #e1e6eb;
}
.customer-labels {
  padding-top: 10px;
  .el-form-item__content {
    width: 100%;
  }
}
</style>
