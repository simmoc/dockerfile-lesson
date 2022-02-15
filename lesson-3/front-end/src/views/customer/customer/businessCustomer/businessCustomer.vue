<template>
    <div>
        <div class="search-form ">
            <div class="search-form-margin">
                <el-form ref="ruleFormRef" inline size="small" label-position="right" label-width="75px" :model="form.formData" class="clearfix">
                    <el-form-item label="业务ID： " prop="yw_id">
                        <el-input
                            v-model="form.formData.yw_id"
                            placeholder="请输入"
                            style="width: 274px;"
                            @keyup.enter="handleSubmit"
                        />
                    </el-form-item>
                    <el-form-item label="添加时间： " prop="addDate">
                        <el-date-picker
                            v-model="form.formData.addDate"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            value-format="YYYY-MM-DD"
                            :disabled-date="disabledDate"
                            @change="handleChangeDate"
                        />
                    </el-form-item>
                    <el-form-item label="标签： ">
                        <customerSelect
                            ref="customerSelectRef"
                            v-model="form.treeChecked"
                            :tree-data="form.treeData"
                            :edit-select-list="form.selectList"
                        />
                    </el-form-item>
                    <!-- 自定义筛选条件 -->
                    <custom-filter ref="customFilterRef" v-model="form.formData.where_dynamic" :subject-id="form.formData.subject_id" :close-customer-select="closeCustomerSelect" />
                    <el-form-item class="right mr0">
                        <el-button :disabled="form.isTableLoading" @click="handleReset">重置</el-button>
                        <el-button type="primary" :disabled="form.isTableLoading" @click="handleSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <page-main>
            <CustomerTable
                :loading="form.isTableLoading"
                :table-title="form.tableTitle"
                :table-data="form.tableData"
            >
                <!-- 标签 -->
                <template #tag_arr="scope">
                    <div v-if="scope.data.tag_arr.length <= 1">
                        <customerTag
                            v-for="item in scope.data.tag_arr"
                            :key="item.id"
                            :left-title="item.group_name"
                            :right-title="item.name"
                            :color="
                                item.tag_type === 'HQ' ? '#409eff' : '#FF6F00'
                            "
                            :customer-style="{ 'margin-bottom': 0 }"
                        />
                    </div>
                    <el-popover
                        v-else
                        placement="bottom"
                        trigger="click"
                        popper-class="key-word-pop"
                        width="542"
                    >
                        <div class="member-tag-pop p16">
                            <customerTag
                                v-for="key in scope.data.tag_arr"
                                :key="key.id"
                                :left-title="key.group_name"
                                :right-title="key.name"
                                :color="
                                    key.tag_type === 'HQ' ? '#409eff' : '#FF6F00'
                                "
                                :right-text-break="false"
                                :right-text-auto="true"
                            />
                        </div>
                        <template #reference>
                            <div class="inline-flex">
                                <customerTag
                                    :left-title="scope.data.tag_arr[0].group_name"
                                    :right-title="scope.data.tag_arr[0].name"
                                    :right-title-width="52"
                                    :color="
                                        scope.data.tag_arr[0].tag_type === 'HQ'
                                            ? '#409eff'
                                            : '#FF6F00'
                                    "
                                    :customer-style="{ 'margin-bottom': 0 }"
                                />
                                <span class="color-primary">...</span>
                            </div>
                        </template>
                    </el-popover>
                    <div v-if="!scope.data.tag_arr[0]">--</div>
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
                <el-table-column label="操作" width="100px" fixed="right">
                    <template #default="{ row }">
                        <div>
                            <el-button
                                type="text"
                                @click="handleDetail(row.id, row.yw_id)"
                            >
                                查看详情
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </CustomerTable>
            <!-- 分页 -->
            <customer-pagination
                v-model:page="form.formData.page"
                v-model:limit="form.formData.limit"
                :total="form.totalDataNum"
                :get-data="getList"
            />
        </page-main>
    </div>
</template>
<script setup>
import http from '@/util/request'
import { useRouter, useRoute } from 'vue-router'
import { onBeforeMount, reactive, ref, computed } from 'vue'
import CustomFilter from './components/CustomFilter.vue'
import { deepClone } from '@/util'
const router = useRouter()
const route = useRoute()
// el-form Ref
let ruleFormRef = ref(null)
// 自定义选择组件Ref
let customFilterRef = ref(null)
// 标签自定义Ref
let customerSelectRef = ref(null)
const form = reactive({
    formData: {
        subject_id: '', // 主体id
        search_type: '1', // 1基础筛选 2高级筛选
        page: 1,
        limit: 10,
        addDate: [], // 添加时间
        where_dynamic: [] // 基础筛选自定义字段
    },
    treeData: [
        {
            id: '总部标签',
            name: '总部标签',
            childrens: [
                {
                    id: '消费水平',
                    name: '消费水平',
                    childrens: [
                        {
                            id: '5万元/月',
                            name: '5万元/月',
                            num: 4
                        }
                    ]
                }
            ]
        },
        {
            id: '服务标签',
            name: '服务标签',
            childrens: [
                {
                    id: '情感需求',
                    name: '情感需求',
                    childrens: [
                        {
                            id: '缺自信',
                            name: '缺自信',
                            num: 4
                        }
                    ]
                }
            ]
        }
    ], // 树形数据;
    selectList: [],
    treeChecked: [], // 选中标签数据
    tableData: [],
    totalDataNum: 0,
    isTableLoading: false,
    tableTitle: [], // 自定义table title
    customerNum: 0
})
// 主体id
form.formData.subject_id = route.meta?.subject_id
// 标签ID
form.formData.tag_id = computed(() => {
    return form.treeChecked.map(item => item.tag_id).join(',')
})
// 日期选择禁用
const disabledDate = time => {
    const timeRange = 24 * 60 * 60 * 1000
    const maxTime = Date.now()
    const minTime = maxTime - timeRange * 90
    return (time.getTime() > maxTime || time.getTime() < minTime)
}
function handleSubmit() {
    form.formData.page = 1
    form.formData.limit = 10
    getList()
}
function getList() {
    form.isTableLoading = true
    const params = Object.assign({}, form.formData);
    [params.start_time, params.end_time] = params.addDate
    delete params.addDate
    http
        .extensiveCustomerSubjectList(params)
        .then(res => {
            res.data.list && res.data.list.forEach(item => {
                item.tag_arr = [...item.tag.hq, ...item.tag.service]
            })
            form.tableData = res.data.list || []
            form.totalDataNum = res.data.total || 0 // 总数目
            form.customerNum = res.data.people_num || 0 // 总人次
            form.tableTitle = res.data.field.map(item => {
                return {
                    label: item.label,
                    prop: item.name,
                    fixed: item.name == 'businessID' ? 'left' : null,
                    width: item.name == 'businessID' ? 160 : 120,
                    type: 'tooltip'
                }
            })
            form.tableTitle.push({
                label: '标签',
                prop: 'tag_arr',
                width: '230',
                type: 'slot',
                fixed: 'right'
            })
        })
        .catch(() => {}).finally(() => {
            form.isTableLoading = false
        })
}
function handleReset() {
    customFilterRef.value.resetFields()
    ruleFormRef.value.resetFields()
    let cArr = deepClone(form.treeChecked)
    cArr.forEach((item, index) => {
        customerSelectRef.value.closeTag(index, item)
    })
    form.treeChecked = []
    form.selectList = []
    form.formData.where_dynamic = []
    form.formData.page = 1
    form.formData.limit = 10
    getList()
}
const closeCustomerSelect = () => {
    customerSelectRef.value.close()
}
// 至详情页
function handleDetail(id, yw_id) {
    let subject_id = form.formData.subject_id
    router.push({
        name: 'weChatCustomerDetail',
        query: {
            id,
            yw_id,
            subject_id
        }
    })
}
function handleChangeDate(arr = []) {
    form.formData.start_time = arr[0]
    form.formData.end_time = arr[1]
}
onBeforeMount(async() => {
    // 获取列表数据
    getList()
})
</script>

<style scoped lang="scss">
.gender {
    width: 14px;
    height: 14px;
    margin-left: 4px;
}
.girl {
    @include gender-sprite('girl');
}
.boy {
    @include gender-sprite('boy');
}
.search-form {
    padding: 24px;
    background-color: #fff;
    margin: 24px;
    :deep(.el-input__suffix) {
        top: -2px;
    }
    :deep(.customer-select) {
        width: 274px;
    }
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
