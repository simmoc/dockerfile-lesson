<template>
    <div>
        <!-- <template> -->

        <div class="search-form ">
            <div class="search-form-margin">
                <el-form inline size="small" label-position="right" label-width="120px">
                    <el-form-item label="客户类型" prop="keyword">
                        <el-select
                            v-model="form.formData.customer_type"
                            placeholder="请选择客户类型"
                            style="width: 274px;"
                            @change="getList"
                        >
                            <el-option label="全部" value="" />
                            <el-option
                                v-for="item in form.customerTypeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="客户状态" prop="keyword">
                        <el-select
                            v-model="form.formData.customer_status"
                            placeholder="请选择客户状态"
                            style="width: 274px;"
                            @change="getList"
                        >
                            <el-option label="全部" value="" />
                            <el-option
                                v-for="item in form.customerStatusList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="企业标签" prop="members">
                        <el-cascader
                            ref="cascader"
                            v-model="form.enterprise_label"
                            clearable
                            filterable
                            placeholder="请选择企业标签"
                            :options="form.companyTags"
                            :props="{ multiple: true}"
                            :collapse-tags="isCollapseTags"
                            style="width: 274px;"
                            @change="handleChangeTag"
                            @expand-change="expandChange"
                        />
                    </el-form-item>
                    <el-form-item label="跟进成员" prop="members">
                        <MemberTransfer
                            :title="'跟进成员'"
                            style="width: 274px;"
                            @selectedList="addSelectedList"
                        />
                    </el-form-item>
                    <el-form-item label="客户名称" prop="members">
                        <el-input
                            v-model="form.formData.keyword"
                            placeholder="请输入客户名称"
                            style="width: 274px;"
                            @keyup.enter="getList"
                        />
                    </el-form-item>
                    <el-form-item label="添加时间" prop="addDate">
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
                    <el-form-item>
                        <el-button @click="handleReset">重置</el-button>
                        <el-button type="primary" @click="handleSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <page-main>
            <div>
                当前有{{ form.totalDataNum }}个客户人次，共{{ form.customerNum }}个客户
            </div>
            <CustomerTable
                :table-title="form.tableTitle"
                :table-data="form.tableData"
            >
                <template #customerType="scope">
                    <div class="flex flex-align-center">
                        <img :src="scope.data.img" alt="" class="member-avatar">
                        <span>{{ scope.data.name }}</span>
                        <span
                            v-if="scope.data.customer_type === '2'"
                            class="name-croWechat"
                        >
                            @{{ scope.data.corp_name }}
                        </span>
                        <span v-else class="color-success">@微信</span>
                    </div>
                </template>
                <template #label="scope">
                    <div
                        v-for="(item, index) in scope.data.label"
                        :key="index"
                        class="company-tag"
                    >
                        {{ item }}
                    </div>
                </template>
                <el-table-column label="操作" width="190px" fixed="right">
                    <template #default="{ row }">
                        <div>
                            <el-button
                                type="text"
                                @click="handleDetail(row.id)"
                            >
                                详情
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
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
import { reactive, computed } from 'vue'
const router = useRouter()
const form = reactive({
    formData: {
        page: 1,
        page_size: 10,
        customer_status: '',
        customer_type: '',
        keyword: '',
        addDate: []
    },
    tableData: [],
    totalDataNum: 0,
    isTableLoading: false,
    customerTypeList: [],
    customerStatusList: [],
    companyTags: [],
    currentIndex: undefined,
    enterprise_label: [],
    tableTitle: [
        {
            label: '客户名称/类型',
            prop: 'customerType',
            type: 'slot'
        },
        {
            label: '跟进成员',
            prop: 'member_name'
        },
        {
            label: '添加时间',
            prop: 'add_time'
        },
        {
            label: '企业标签',
            prop: 'label',
            type: 'slot'
        },
        {
            label: '状态',
            prop: 'status'
        }
    ],
    customerNum: 0
})
const isCollapseTags = computed(() => {
    let length = form.enterprise_label.length || 0
    return length > 10
})
function expandChange(valueList) {
    let companyTags = form.companyTags
    form.currentIndex = companyTags.findIndex(element => {
        return element.value === valueList[0]
    })
    // // 在展开时,绑定滚动事件;
}
function handleChangeTag(arr) {
    console.log('handleChangeTag--handleChangeTag', arr)
    form.formData.enterprise_label = []
    arr.forEach(item => {
        let length = item.length
        form.formData.enterprise_label.push(item[length - 1])
    })
}
function handleSubmit() {
    form.formData.page = 1
    form.formData.page_size = 10
    getList()
}
function getList() {
    const params = form.formData
    http
        .operationGetCustomerList(params)
        .then(res => {

            form.tableData = res.data.list || []
            form.totalDataNum = res.data.total_num || 0
        })
        .catch(() => {})
    getCustomerNum()
}
async function operationGetCustomerType() {
    let { data } = await http.operationGetCustomerType()
    form.customerTypeList = data || []
}
operationGetCustomerType()
async function operationGetCustomerStatus() {
    let { data } = await http.operationGetCustomerStatus()
    form.customerStatusList = data
}
operationGetCustomerStatus()
function handleReset() {
    form.formData = {
        page: 1,
        page_size: 10

    }
    form.enterprise_label = []
    getList()
}
async function getCustomerNum() {
    let params = form.formData
    let { data } = await http.getCustomerNum(params)
    form.customerNum = data.total_customer_num || 0
}
getCustomerNum()
async function operationGetLabel() {
    let { data } = await http.operationGetLabel()
    data.forEach(item => {
        item.label = item.group_name
        item.value = item.group_name
        item.range = 200
        item.group_list.forEach(item => {
            item.label = item.label_name
            item.value = item.id
        })
        // item.children = item.group_list
        item.children = item.group_list.slice(0, 200)

    })
    form.companyTags = data
    console.log(form.companyTags)
}
operationGetLabel()
getList()
// 至详情页
function handleDetail(id) {
    router.push({
        name: 'weChatCustomerDetail',
        query: {
            id
        }
    })
}
function handleChangeDate(arr = []) {
    form.formData.start_time = arr[0]
    form.formData.end_time = arr[1]
}
// 搜索添加成员
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
.customer-type .name-croWechat {
    color: #e98839;
}
    .member-avatar{
        width: 32px;
        height: 32px;
        border-radius: 4px;
        margin-right: 6px;
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
