<template>
    <div>
        <div class="search-form ">
            <div class="search-form-margin">
                <el-form ref="ruleFormRef" inline size="small" label-position="right" label-width="75px" :model="form.formData" class="clearfix">
                    <el-form-item label="客户类型：" prop="qw_type">
                        <el-select
                            v-model="form.formData.qw_type"
                            placeholder="请选择客户类型"
                            style="width: 274px;"
                            @change="getList(1)"
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
                    <el-form-item label="添加时间：" prop="addDate">
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
                    <el-form-item label="跟进成员：" prop="qw_userid">
                        <selectMember
                            ref="addMemberDialogRef"
                            input-placeholder="请选择跟进成员"
                            :is-multiple-selected="true"
                            :custom-input-value-fn="customInputValueFn"
                            :custom-selected-fn="customSelectedFn"
                            style="width: 274px"
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
                            ref="memberTransfer"
                            :title="'跟进成员'"
                            style="width: 274px;"
                            @selectedList="addSelectedList"
                        /> -->
                    </el-form-item>
                    <el-form-item label="客户昵称：" prop="qw_external_name">
                        <el-input
                            v-model.trim="form.formData.qw_external_name"
                            placeholder="请输入客户名称"
                            style="width: 274px;"
                            maxlength="20"
                            @keyup.enter="getList(1)"
                        />
                    </el-form-item>
                    <el-form-item label="客户状态：" prop="deleted_state">
                        <el-select
                            v-model="form.formData.deleted_state"
                            placeholder="请选择客户状态"
                            style="width: 274px;"
                            @change="getList(1)"
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
                    <el-form-item label="备注名：" prop="qw_remark">
                        <el-input
                            v-model.trim="form.formData.qw_remark"
                            placeholder="请输入查询"
                            style="width: 274px;"
                            maxlength="20"
                            @keyup.enter="getList(1)"
                        />
                    </el-form-item>
                    
                    <el-form-item class="right mr0">
                        <!-- <el-button @click="handleSubmit">基础筛选<el-icon class="el-icon--right" /></el-button> -->
                        <el-button :disabled="form.isTableLoading" @click="handleReset">重置</el-button>
                        <el-button type="primary" :disabled="form.isTableLoading" @click="handleSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <page-main>
            <div>
                当前有<span class="number color-primary ml8 mr8 fwb fs18">{{ form.totalDataNum }}</span>个客户人次，共<span class="number color-primary ml8 mr8 fwb fs18">{{ form.customerNum }}</span>个客户
            </div>
            <CustomerTable
                :loading="form.isTableLoading"
                :table-title="form.tableTitle"
                :table-data="form.tableData"
            >
                <!-- 客户信息 -->
                <template #customerType="scope">
                    <div class="flex flex-align-center">
                        <personItem :person="{
                            pic: scope.data.qw_external_avatar,
                            yw_name: scope.data.qw_external_name,
                            qw_type: scope.data.qw_type,
                            qw_type_str: scope.data.qw_type_str,
                            sex: scope.data.qw_gender == '1' ? '男' : scope.data.qw_gender == '2' ? '女' : '0'
                        }"
                        />
                        <!-- <img :src="scope.data.qw_external_avatar" alt="" class="member-avatar">
                        <span class="mr4 flex-s0">{{ scope.data.qw_external_name }}</span>
                        <span
                            v-if="scope.data.qw_type == '2'"
                            class="color-warning flex-s0"
                        >
                            @企业微信
                        </span>
                        <span v-if="scope.data.qw_type == '1'" class="color-success flex-s0">@微信</span>
                        <i :class="[scope.data.qw_gender == '1' ? 'girl' : 'boy', 'gender flex-s0']" /> -->
                    </div>
                </template>
                <!-- 添加来源 -->
                <template #qw_add_way="scope">
                    <div class="flex flex-align-center">
                        <el-tooltip
                            v-if="scope.data.qw_add_way == '0'"
                            class="box-item"
                            effect="dark"
                            content="包含直接扫描我的二维码"
                            placement="right"
                        >
                            <div>
                                <span>{{ scope.data.qw_add_way_str }}</span>
                                <img :src="getImageUrl('question-circle')" alt="" class="icon">
                            </div>
                        </el-tooltip>
                        <div v-else style="width: 100%;">
                            <template v-if="scope.data.qw_add_way_str">
                                <span v-if="getTextWidth(scope.data.qw_add_way_str) < scope.width - 20">
                                    {{ scope.data.qw_add_way_str }}
                                </span>
                                <el-tooltip v-else :content="scope.data.qw_add_way_str" placement="bottom" effect="light">
                                    <span class="overflow-ellipsis" style="display: inline-block; width: 100%;">
                                        {{ scope.data.qw_add_way_str }}
                                    </span>
                                </el-tooltip>
                            </template>
                            <template v-else>
                                <div>--</div>
                            </template>
                        </div>
                    </div>
                </template>
                <!-- 跟进成员 -->
                <template #follow_member="scope">
                    <div class="flex flex-align-center color-primary">
                        <MenberItem 
                            class="table-member-card"
                            :member-id="scope.data.member_id" 
                            :avatar="scope.data.qw_avatar"
                            :name="scope.data.qw_name"
                            :department-name="scope.data.qw_department_name"
                        />
                        <!-- <el-tooltip
                            class="box-item"
                            effect="light"
                            content="包含直接扫描我的二维码"
                            placement="right"
                        >
                            <template #content>
                                <div>
                                    <span>{{ scope.data.qw_name }}</span>
                                    <span>{{ scope.data.qw_department_name }}</span>
                                </div>
                            </template>
                            <div class="flex flex-align-center">
                                <img :src="scope.data.member_pic" alt="" class="member_pic mr6">
                                <div class="overflow-ellipsis qw_name">
                                    <span>{{ scope.data.qw_name }}</span>
                                    <span>{{ scope.data.qw_department_name }}</span>
                                </div>
                            </div>
                        </el-tooltip> -->
                    </div>
                </template>
                <!-- 客户状态 -->
                <template #deleted_state="scope">
                    <div class="flex flex-align-center">
                        <span>{{ transformDelstate(scope.data.deleted_state) }}</span>
                    </div>
                </template>
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
                                @click="handleDetail(row.subject_data_id, row.yw_id)"
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
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { onBeforeMount, reactive, ref } from 'vue'
import { DELETED_STATE } from '@/util/contant'
import { getTextWidth } from '@/util'
const router = useRouter()
const route = useRoute()
let ruleFormRef = ref(null)
// let memberTransfer = ref(null)
const addMemberDialogRef = ref(null)
const form = reactive({
    formData: {
        subject_id: '', // 主体id
        search_type: '1', // 1基础筛选 2高级筛选
        page: 1,
        limit: 10,
        deleted_state: '', // 客户状态
        qw_type: '', // 客户类型
        qw_external_name: '', // 客户昵称
        qw_remark: '', // 备注
        addDate: [], // 添加时间
        search_department_id_arr: [], // 部门
        search_member_id_arr: [] // 成员
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
            label: '客户信息',
            prop: 'customerType',
            width: 200,
            fixed: 'left',
            type: 'slot'
        },
        {
            label: '备注名',
            prop: 'qw_remark',
            width: 86,
            type: 'tooltip'
        },
        {
            label: '添加来源',
            prop: 'qw_add_way',
            width: 230,
            type: 'slot'
        },
        {
            label: '跟进成员',
            prop: 'follow_member',
            width: 180,
            type: 'slot'
        },
        {
            label: '上下游名称',
            prop: 'chain_name',
            width: 210,
            type: 'tooltip'
        },
        {
            label: '企业名称',
            prop: 'chain_company',
            width: 210,
            type: 'tooltip'
        },
        {
            label: '客户状态',
            prop: 'deleted_state',
            width: 109,
            type: 'slot'
        },
        {
            label: '添加时间',
            prop: 'qw_createtime',
            width: 180,
            type: 'tooltip'
        },
        {
            label: '标签',
            prop: 'tag_arr',
            fixed: 'right',
            type: 'slot',
            width: 230
        }
    ],
    customerNum: 0
})
form.formData.subject_id = route.meta?.subject_id
function getImageUrl(name) {
    return new URL(`../../../assets/images/icon/${name}.png`, import.meta.url).href
}
// 日期选择禁用
const disabledDate = time => {
    const timeRange = 24 * 60 * 60 * 1000
    const maxTime = Date.now()
    const minTime = maxTime - timeRange * 90
    return (time.getTime() > maxTime || time.getTime() < minTime)
}
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
    form.formData.limit = 10
    getList()
}
function getList(page) {
    page && (form.formData.page = page)
    form.isTableLoading = true
    const params = Object.assign({}, form.formData);
    [params.start_time, params.end_time] = params.addDate
    delete params.addDate
    http.extensiveCustomerSubjectList(params).then(res => {
        res.data.list && res.data.list.forEach(item => {
            // 兼容多标签组件所需数据tag_arr
            item.tag_arr = [...item.tag.hq, ...item.tag.service]
        })
        form.tableData = res.data.list || []
        form.totalDataNum = res.data.total || 0 // 总数目
        form.customerNum = res.data.people_num || 0 // 总人次
    }).catch(() => {}).finally(() => {
        form.isTableLoading = false
    })
}
async function operationGetCustomerType() {
    try {
        let { data } = await http.operationGetCustomerType()
        form.customerTypeList = data || []
    } catch (error) {
        console.log('operationGetCustomerType error', error)
    }
    
}
async function operationGetCustomerStatus() {
    try {
        let { data } = await http.operationGetCustomerStatus()
        form.customerStatusList = data
    } catch (error) {
        console.log('operationGetCustomerStatus err', error)
    }
    
}
function handleReset() {
    addMemberDialogRef.value.resetSelect()
    ruleFormRef.value.resetFields()
    form.formData.page = 1
    form.formData.limit = 10
    getList()
}

// function showUserType(type) {
//     let index = type - 0
//     let arr = ['', '微信用户', '企业微信用户']
//     return arr[index]
// }
// async function operationGetLabel() {
//     let { data } = await http.operationGetLabel()
//     data.forEach(item => {
//         item.label = item.group_name
//         item.value = item.group_name
//         item.range = 200
//         item.group_list.forEach(item => {
//             item.label = item.label_name
//             item.value = item.id
//         })
//         // item.children = item.group_list
//         item.children = item.group_list.slice(0, 200)

//     })
//     form.companyTags = data
//     console.log(form.companyTags)
// }
// operationGetLabel()
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
// 搜索添加成员
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
// const transformQaw = qw_add_way => {
//     return QW_ADD_WAY[qw_add_way]
// }
const transformDelstate = deleted_state => {
    return DELETED_STATE[deleted_state]
}
onBeforeMount(() => {
    // 获取客户类型
    operationGetCustomerType()
    // 获取客户状态
    operationGetCustomerStatus()
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
.icon {
    width: 16px;
    height: 16px;
    margin-left: 5px;
    vertical-align: middle;
}
.qw_name {
    width: 120px;
    cursor: pointer;
}
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
.member_pic {
    width: 32px;
    height: 32px;
    border-radius: 4px;
}
.company-tag {
    display: inline-block;
    background-color: #00c587;
    color: #fff;
    border-radius: 3px;
    padding: 0 5px;
    margin: 3px;
}
.follow-member {
    @include text-overflow(1, true);
}
</style>
