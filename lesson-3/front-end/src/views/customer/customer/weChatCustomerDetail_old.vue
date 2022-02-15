<template>
    <div>
        <!-- <template> -->
        <div class="search-form">
            <el-image :src="customerInfo.img" class="customer-img" />
            <!-- 表单 -->
            <div class="flex-1">
                <el-row :gutter="20" class="mb16 c9">
                    <el-col :span="5">姓名 <span class="pl8 c3">{{ customerInfo.name }}</span></el-col>
                    <el-col :span="4">性别<span class="pl8 c3">{{ customerInfo.gender===1?'男':'女' }}</span></el-col>
                    <el-col :span="7">客户userid<span class="pl8 c3">{{ customerInfo.external_userid }}</span></el-col>
                    <el-col :span="8">客户unionid<span class="pl8 c3">{{ customerInfo.customer_unionid }}</span></el-col>
                </el-row>
                <el-row :gutter="20" class="mb16 c9">
                    <el-col :span="5">已添加员工<span class="pl8 c3">{{ customerInfo.name }}</span></el-col>
                    <el-col :span="4">跟进成员<span class="pl8 c3">{{ customerInfo.gender===1?'男':'女' }}</span></el-col>
                    <el-col :span="7">成员userid<span class="pl8 c3">{{ customerInfo.member_userid }}</span></el-col>
                    <el-col :span="8">添加时间<span class="pl8 c3">{{ customerInfo.add_time }}</span></el-col>
                </el-row>
                <el-row :gutter="20" class="mb16 c9">
                    <el-col :span="5">数据库记录时间<span class="pl8 c3">{{ customerInfo.create_time }}</span></el-col>
                </el-row>
                <el-row :gutter="20" class="mb16 c9">
                    <el-col :span="5">电话<span class="pl8 c3">{{ otherInfo.tel }}</span></el-col>
                    <el-col :span="4">年龄<span class="pl8 c3">{{ otherInfo.age }}</span></el-col>
                    <el-col :span="7">{{ otherInfo.other_info&&otherInfo.other_info.name }}<span class="pl8 c3">{{ otherInfo.other_info&&otherInfo.other_info.value }}</span></el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <span class="c9 mr8">标签</span>
                        <div
                            v-for="(item, index) in labelList"
                            :key="index"
                            class="company-tag"
                        >
                            {{ item }}
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>

        <!-- 实现一屏展示时 一定要配置表格高度 -->
        <page-main>
            <el-tabs v-model="currentTab" class="pagoda-form-table-layout-tab">
                <el-tab-pane label="客户动态" name="trend" />
            </el-tabs>
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
                :get-data="operationCustomerNews"
            />
        </page-main>
    </div>
</template>
<script setup>
import http from '@/util/request'
import { useRouter, useRoute } from 'vue-router'
import { reactive, onMounted } from 'vue'
const router = useRouter()
const route = useRoute()
const form = reactive({
    formData: {
        page: 1,
        page_size: 10
    },
    tableData: [],
    totalDataNum: 0,
    isTableLoading: false,
    tableTitle: [
        {
            label: '操作',
            prop: 'type'
        },
        {
            label: '具体动态',
            prop: 'content'
        },
        {
            label: '时间',
            prop: 'create_time'
        }
    ],
    customerInfo: {
    },
    otherInfo: {}
})
const customerInfo = ref({})
const otherInfo = ref({})
const labelList = ref({})
const currentTab = ref('trend')
onMounted(() => {
    if (route.query.id) {
        operationCustomerInfo(route.query.id)
        operationCustomerOtherInfo(route.query.id)
        operationCustomerLabel(route.query.id)
        operationCustomerNews(route.query.id)
    }
})
// function getList() {
//     const params = form.formData
//     http
//         .getGroupChatList(params)
//         .then(res => {
//             form.tableData = res.data.list || []
//             form.totalDataNum = res.data.total_num || 0
//         })
//         .catch(() => {})
// }
// getList()
// 至详情页
function handleDetail(chatId) {
    router.push({
        name: 'customerBaseDetail',
        query: {
            chatId
        }
    })
}

const operationCustomerInfo = async id => {
    let { data } = await http.operationCustomerInfo({ id })
    customerInfo.value = data
}
const operationCustomerOtherInfo = async id => {
    let { data } = await http.operationCustomerOtherInfo({ id })
    console.log(data)
    otherInfo.value = data
}
const operationCustomerLabel = async id => {
    let { data } = await http.operationCustomerLabel({ id })
    labelList.value = data
}
const operationCustomerNews = async id => {
    let { data } = await http.operationCustomerNews({ id, ...form.formData })
    form.tableData = data.list
    form.totalDataNum = data.total_num || 0
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
        display: flex;
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
    .customer-img{
        width: 100px;
        height: 100px;
        margin-right: 24px;
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
