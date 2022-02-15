<template>
    <div class="integel-page pt16">
        <div class="page-scroll">
            <div class="search-form pb24 bdr2 mt0">
                <el-row>
                    <el-col :span="6" class="bdr">
                        <div class="integel-total-label tc fs14 c8c mb4">可用积分</div>
                        <div class="integel-total-value tc fs28 c26">{{ integelTotal.not_use_score || '—' }}</div>
                    </el-col>
                    <el-col :span="6" class="bdr">
                        <div class="integel-total-label tc fs14 c8c mb4">失效积分</div>
                        <div class="integel-total-value tc fs28 c26">{{ integelTotal.failure_score || '—' }}</div>
                    </el-col>
                    <el-col :span="6" class="bdr">
                        <div class="integel-total-label tc fs14 c8c mb4">累计发放积分</div>
                        <div class="integel-total-value tc fs28 c26">{{ integelTotal.all_score || '—' }}</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="integel-total-label tc fs14 c8c mb4">累计消耗积分</div>
                        <div class="integel-total-value tc fs28 c26">{{ integelTotal.used_score || '—' }}</div>
                    </el-col>
                </el-row>
            </div>
            <div class="search-form pb8 bdr2">
                <div class="panal-title fs16 c26 mb8 fwb">
                    通用积分规则
                </div>
                <CustomerTable
                    :table-title="commonTableTitle"
                    :table-data="commonTableData"
                    :need-pagination="true"
                    :class="{'is-collapse': $store.state.settings.mode === 'pc' && $store.state.settings.sidebarCollapse}"
                > 
                    <template #category_name="scope">
                        <div v-if="scope.data.rule_code == 'birthday'">
                            <el-button type="text" size="mini" @click="openBirthdayEdit(scope.data)">设置</el-button>
                        </div>
                    </template>
                </customertable>
            </div>
            <div class="rule-table search-form pb24 bdr2">
                <div class="flex flex-justify-between">
                    <div class="panal-title fs16 c26 fwb lh32">
                        活动积分规则
                    </div>
                    <el-button size="small" icon="el-icon-plus" type="primary" @click="openEdit('add')">添加规则</el-button>
                </div>
            
                <CustomerTable
                    :table-title="TableTitle"
                    :table-data="TableData"
                    :need-pagination="true"
                    class="drag-table"
                    :class="{'is-collapse': $store.state.settings.mode === 'pc' && $store.state.settings.sidebarCollapse}"
                > 
                    <template #sort="scope">
                        <div class="can-drag-icon flex flex-align-center flex-space-center" style="height: 50px">
                            <img
                                style="width: 12px; height: 12px; margin-left: 8px;vertical-align: middle;"
                                src="@/assets/images/knowledgeBase/drag.svg"
                                :data-sort="scope.data.sort"
                                alt=""
                            >
                        </div>
                    </template>
                    <template #start_time="scope">
                        <div>
                            {{ scope.data.start_time }}至
                            <br>
                            {{ scope.data.end_time }}
                        </div>
                    </template>
                    <template #status="scope">
                        <div>
                            <el-switch
                                v-model="scope.data.status"
                                active-color="#1773FA"
                                inactive-color="#C0CCDA"
                                active-value="on"
                                inactive-value="off"
                                @change="val => updateStatus(val, scope.data.id)"
                            />
                        </div>
                    </template>
                    <template #oprate="scope">
                        <div>
                            <el-button
                                type="text"
                                size="mini"
                                @click="openEdit('edit', scope.data)"
                            >
                                编辑
                            </el-button>
                            <el-button
                                type="text"
                                size="mini"
                                @click="openDelete(scope.data.id)"
                            >
                                删除
                            </el-button>
                            <!-- <el-button type="text" size="small" @click="openEdit('edit', scope.data)">编辑</el-button>
                            <el-button type="text" size="small" @click="openDelete(scope.data.id)">删除</el-button> -->
                        </div>
                    </template>
                </customertable>
            </div>
            <!-- 设置生日积分规则 -->
            <CustomerDialog title="设置规则" :dialog-visible="birthdayVisible" width="418px" :confirm-fn="setBirthdayRule" @cancel="birthdayVisible = false">
                <div>
                    <div class="fs14 mb8">会员生日积分</div>
                    <div>
                        <el-radio-group v-model="birthdayParams.birthday_type">
                            <el-radio label="day">
                                <span class="mr8 c26">生日当日消费积分得</span>
                                <el-input-number
                                    v-model="birthdayTime.day"
                                    :disabled="birthdayParams.birthday_type !== 'day'" 
                                    :controls="false" :precision="0"
                                    :max="999"
                                    :min="1"
                                    size="small"
                                    style="width: 64px" @keyup="limitNunber"
                                />
                                <span class="ml8 c26">倍</span>
                            </el-radio><br>
                            <el-radio label="week">
                                <span class="mr8 c26">生日当周消费积分得</span>
                                <el-input-number
                                    v-model="birthdayTime.week"
                                    :disabled="birthdayParams.birthday_type !== 'week'" 
                                    :controls="false" :precision="0"
                                    :max="999"
                                    :min="1"
                                    size="small"
                                    style="width: 64px" @keyup="limitNunber"
                                />
                                <span class="ml8 c26">倍</span>
                            </el-radio><br>
                            <el-radio label="month" class="">
                                <span class="mr8 c26">生日当月消费积分得</span>
                                <el-input-number
                                    v-model="birthdayTime.month"
                                    :disabled="birthdayParams.birthday_type !== 'month'" 
                                    :controls="false" :precision="0"
                                    :max="999"
                                    :min="1"
                                    size="small"
                                    style="width: 64px" @keyup="limitNunber"
                                />
                                <span class="ml8 c26">倍</span>
                            </el-radio><br>
                        </el-radio-group>
                    </div>
                </div>
            </CustomerDialog>

            <!-- 添加、编辑积分规则 -->
            <CustomerDialog class="integel-add-dialog" :title="paramsTiile" :dialog-visible="paramsVisible" width="568px" top="15vh" :confirm-fn="changeRules" @cancel="paramsVisible = false">
                <div class="rule-panel">
                    <el-form
                        ref="ruleForm"
                        :model="ruleParams"
                        :rules="ruleParamsRules"
                        size="small"
                        class="demo-ruleForm"
                        height="32px"
                        label-width="520px"
                        label-position="top"
                    >
                        <el-form-item label="规则名称" prop="rule_name">
                            <el-input v-model="ruleParams.rule_name" size="small" show-word-limit maxlength="10" placeholder="请输入规则名称" />
                        </el-form-item>
                        <el-form-item label="规则详情" prop="type">
                            <el-radio-group v-model="ruleParams.type">
                                <el-radio label="double">
                                    <span class="mr8 c26">每成功交易 1 笔订单，积分翻</span>
                                    <el-input-number
                                        v-model="ruleParams.double"
                                        :disabled="ruleParams.type !== 'double'" 
                                        :controls="false" :precision="0"
                                        :max="999"
                                        :min="1"
                                        size="small"
                                        style="width: 100px" @keyup="limitNunber"
                                    />
                                    <span class="ml8 c26">倍</span>
                                </el-radio><br>
                                <el-radio label="extra_add_score" class="mt8">
                                    <span class="mr8 c26">每成功交易 1 笔订单，额外赠送</span>
                                    <el-input-number
                                        v-model="ruleParams.extra_add" 
                                        :disabled="ruleParams.type !== 'extra_add_score'"
                                        :controls="false" :precision="0"
                                        max="99999999"
                                        size="small"
                                        style="width: 100px" @keyup="limitNunber"
                                    />
                                    <span class="ml8 c26">积分</span>
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="有效时间" prop="start_time">
                            <el-date-picker
                                v-model="activeTime"
                                value-format="YYYY-MM-DD HH:mm:ss"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :default-time="defaultTime"
                                align="right"
                                style="width: 100%"
                                @change="changeTime"
                            />
                        </el-form-item>
                        <el-form-item label="">
                            <div class="flex flex-justify-between flex-align-center">
                                <span class="">是否启用该活动规则</span>
                                <el-switch
                                    v-model="ruleParams.status"
                                    active-color="#1773FA"
                                    inactive-color="#C0CCDA"
                                    active-value="on"
                                    inactive-value="off"
                                />
                            </div>
                        </el-form-item>
                    </el-form>
                    <div class="rule-hint mt12">
                        <div class="hint-title flex flex-align-center mb16">
                            <i class="el-icon-question fs16 c999 mr8" />
                            <span class="fs16 lh24 fwb c26">温馨提示: </span>
                        </div>
                        <div class="hint-item fs14 lh22 c999 mb8">
                            1、同一时间段内有多个活动积分规则时，按照排序在前的优先生效
                        </div>
                        <div class="hint-item fs14 lh22 c999">
                            2、同一时间段内有活动积分规则和会员生日积分规则时，仅活动积分规则生效
                        </div>
                    </div>
                </div>
            </CustomerDialog>
            <!-- 删除弹窗 -->
            <CustomerDialog title="提示" :dialog-visible="deleteVidible" width="480px" :confirm-fn="deleteRule" @cancel="deleteVidible = false">
                <div class="c8c">是否删除该活动积分规则</div>
            </CustomerDialog>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Http from '@/util/request'
import { ElMessage } from 'element-plus'
import Sortable from 'sortablejs'

const integelTotal = ref({})
const commonTableTitle = ref([
    {
        label: '规则名称',
        prop: 'rule_name'
    },
    {
        label: '规则详情',
        prop: 'rule_content'
    },
    {
        label: '操作',
        prop: 'category_name',
        type: 'slot',
        width: 160
    }
])
const commonTableData = ref([])

const defaultTime = ref([
    new Date(2000, 1, 1, 0, 0, 0),
    new Date(2000, 2, 1, 23, 59, 59)
])

const TableTitle = ref([
    {
        label: '排序',
        prop: 'sort',
        type: 'slot',
        width: 50
    },
    {
        label: '活动规则名称',
        prop: 'rule_name'
    },
    {
        label: '规则详情',
        prop: 'rule_content'
    },
    {
        label: '有效期',
        prop: 'start_time',
        type: 'slot',
        width: 230
    }, 
    {
        label: '配置状态',
        prop: 'status',
        type: 'slot',
        width: 180
    }, 
    {
        label: '操作',
        prop: 'oprate',
        type: 'slot',
        width: 160
    } 
])
const TableData = ref([])

// 设置生日积分规则
const birthdayVisible = ref(false)
const birthdayParams = ref({
    id: '',
    birthday_type: '',
    double: 1
})
const birthdayTime = ref({
    day: 1,
    week: 1,
    month: 1
})

// 设置活动积分规则
const ruleForm = ref(null)
const paramsVisible = ref(false)
const paramsTiile = ref('添加活动规则')
const ruleParams = ref({
    type: 'extra_add_score',
    rule_name: '',
    extra_add: '',
    start_time: '',
    end_time: '',
    rule_content: '',
    status: 'off',
    double: 1
})
const activeTime = ref([])

const ruleParamsRules = {
    rule_name: [
        {
            required: true,
            message: '规则名称不可为空',
            trigger: 'blur'
        }
    ],
    type: [
        {
            required: true,
            message: '请选择规则详情',
            trigger: 'change'
        }
    ],
    start_time: [
        {
            required: true,
            message: '有效时间不可为空',
            trigger: 'change'
        }
    ]
}

const sortParams = ref({
    rule_data: []
})

const deleteVidible = ref(false)
const deleteParams = ref({
    id: ''
})
// 删除提示
const openDelete = (id, status) => {
    if (status == 'on') {
        ElMessage.error({ message: '当前活动积分规则已开启，关闭后才能删除该活动积分规则！' })
    }
    deleteParams.value.id = id
    deleteVidible.value = true
}
// 删除规则
const deleteRule = async() => {
    const { code } = await Http.deleteIntegelRule(deleteParams.value)
    if (code == 200) {
        deleteVidible.value = false
        ElMessage.success({ message: '删除规则成功' })
        getActivityRule()
    }
}

const openBirthdayEdit = row => {
    // console.log('痰喘', row)
    birthdayParams.value.id = row.id
    birthdayParams.value.birthday_type = row.birthday_type
    birthdayParams.value.double = row.double

    birthdayTime.value[birthdayParams.value.birthday_type] = row.double
    birthdayVisible.value = true
}
// 设置生日积分规则
const setBirthdayRule = async() => {
    birthdayParams.value.double = birthdayTime.value[birthdayParams.value.birthday_type]
    console.log('触发设置规则', birthdayParams.value)
    let { code } = await Http.setBirthdayIntegelRule(birthdayParams.value)

    // console.log('获取code')
    if (code == 200) {
        ElMessage.success({ message: '设置积分规则成功' })
        birthdayVisible.value = false
        getCommentRule()
    }
}

// 时间选择器变动
const changeTime = () => {
    // absoluteTime = 
    if (activeTime.value && activeTime.value[0]) {
        ruleParams.value.start_time = activeTime.value[0]
        ruleParams.value.end_time = activeTime.value[1]
        return
    }
    ruleParams.value.start_time = ''
    ruleParams.value.end_time = ''
}
// 打开活动规则编辑面板
const openEdit = (type, row = {}) => {
    if (type == 'add') {
        ruleParams.value = {
            type: 'extra_add_score',
            rule_name: '',
            extra_add: '',
            start_time: '',
            end_time: '',
            rule_content: '',
            status: 'off',
            double: 1
        }
        activeTime.value = []
        paramsTiile.value = '添加活动规则'
        paramsVisible.value = true
    } else {
        ruleParams.value.id = row.id
        ruleParams.value.type = row.type
        ruleParams.value.rule_name = row.rule_name
        ruleParams.value.double = row.double
        ruleParams.value.extra_add = row.extra_add
        ruleParams.value.start_time = row.start_time
        ruleParams.value.end_time = row.end_time
        ruleParams.value.rule_content = row.rule_content
        ruleParams.value.status = row.status

        activeTime.value[0] = row.start_time
        activeTime.value[1] = row.end_time

        paramsTiile.value = '编辑活动规则'
        paramsVisible.value = true
    }
    
    // 清楚elements-plus规则
    nextTick(() => {
        ruleForm.value.clearValidate()
    })
    
}

// 添加或编辑积分规则
const changeRules = async() => {
    // 验证表单
    let ruleTyle = true
    ruleForm.value.validate((valid, object) => {
        console.log(valid, object)
        if (valid) {
            console.log('subimt')
        } else {
            console.log('error submit!!')
            ruleTyle = false
            return false
        }
    })
    if (!ruleTyle) return

    console.log(ruleParams)

    // 判断规则类型以及 合成规则内容
    if (ruleParams.value.type == 'extra_add_score') {
        if (!ruleParams.value.extra_add) {
            ElMessage.warning({ message: '额外赠送积分' })
            return 
        }
        ruleParams.value.rule_content = `每成功交易 1 笔订单，额外赠送 ${ruleParams.value.extra_add} 积分`
    } else if (ruleParams.value.type == 'double') {
        if (!ruleParams.value.double) {
            ElMessage.warning({ message: '请输入翻倍倍数' })
            return
        }
        ruleParams.value.rule_content = `每成功交易 1 笔订单，积分翻 ${ruleParams.value.double} 倍`
    }

    // 判断编辑还是添加
    if (ruleParams.value.id) { // 编辑状态
        const { code } = await Http.editIntegelRule(ruleParams.value)
        if (code == 200) {
            ElMessage.success({ message: '编辑活动规则成功' })
        }
    } else {
        const { code } = await Http.addIntegelRule(ruleParams.value)
        if (code == 200) {
            ElMessage.success({ message: '添加活动规则成功' })
        }
    }
    getActivityRule()
    paramsVisible.value = false
}

const limitNunber = e => {
    let flag = new RegExp('^[0-9]([0-9])*$').test(e.target.value)
    // console.log(e.target.value, flag)
    if (!flag) {
        e.target.value = e.target.value.replace(/[^[0-9]]*/g, '')
    }

}

// 更新活动规则状态
const updateStatus = async(status, id) => {
    if (!id) return
    const { code } = await Http.setIntegelRuleStatus({
        id: id,
        status: status
    })
    if (code == 200) {
        ElMessage.success({ message: '修改状态成功成功' })
    }
}

// 更新排序
const updateRulesSort = async() => {
    TableData.value = []
    const { code } = await Http.sortIntegelRules(sortParams.value)
    if (code == 200) {
        ElMessage.success({ message: '规则排序成功' })
        getActivityRule()
    }
}

// 拖拽规则
const drag = disabled => {
    // console.log('禁止拖动', disabled)
    const el = document.querySelectorAll('.drag-table .el-table__body-wrapper > table > tbody')[0]
    Sortable.create(el, {
        disabled: disabled,
        ghostClass: 'sortable-ghost',
        handle: '.can-drag-icon',
        setData: function(dataTransfer) {
            dataTransfer.setData('Text', '')
        },
        onEnd: ({ newIndex, oldIndex }) => {
            let arr = []
            // 更换数组元素位置
            let nowArr = JSON.parse(JSON.stringify(TableData.value))
            nowArr = swapArray(nowArr, newIndex, oldIndex)
            // console.log('更改顺序', newIndex, oldIndex, nowArr)

            nowArr.forEach((item, index) => {
                arr.push({ id: item.id, sort: 200 - index })
            })
            console.log('调转之后顺序', sortParams, arr)
            sortParams.value.rule_data = arr
            updateRulesSort()
            // console.log(updateGoodsSort(arr))
        }
    })
}

// 数组元素移动位置
function swapArray(arr, newIndex, oldIndex) {
    let item = JSON.parse(JSON.stringify(arr[oldIndex]))
    arr.splice(oldIndex, 1)
    arr.splice(newIndex, 0, item)
    return arr
}

// 获取统计
const getIntegelTotal = async() => {
    const { data } = await Http.getIntegelTotal()
    integelTotal.value = data || {}
}

// 获取通用规则
const getCommentRule = async() => {
    const { data } = await Http.getIntegelCommenList()
    commonTableData.value = data || {}
}
// 获取活动积分规则
const getActivityRule = async() => {
    const { data } = await Http.getIntegelList()
    TableData.value = data || {}
}

onMounted(() => {
    getIntegelTotal()
    getCommentRule()
    getActivityRule()
    drag(false)
})
</script>

<style lang="scss">
    .rule-table {
        // min-height: 400px;
    }
</style>