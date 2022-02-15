<template>
    <template v-if="data.customList.length">
        <div v-for="item in data.customList" ref="customForm" :key="item.name" :label="item.label+'：'" class="custom-list mr36 mb16">
            <span class="label pl12 pr12">{{ item.label }}</span>
            <el-input v-if="item.type === 'TEXT'" v-model.trim="data.formData[item.name]" placeholder="请输入" style="width: 274px;" size="small" />
            <el-input v-if="item.type === 'NUMBER'" v-model.trim="data.formData[item.name]" type="number" placeholder="请输入" style="width: 274px;" size="small" />
            <el-select v-if="item.type === 'SELECT'" v-model="data.formData[item.name]" class="m-2" placeholder="请选择" multiple collapse-tags style="width: 274px;" size="small">
                <el-option
                    v-for="option in item.options"
                    :key="option"
                    :label="option"
                    :value="option"
                />
            </el-select>
            <el-select v-if="item.type === 'BOOLEAN'" v-model="data.formData[item.name]" class="m-2" placeholder="请选择" style="width: 274px;" size="small">
                <el-option
                    :key="1"
                    label="是"
                    value="是"
                />
                <el-option
                    :key="0"
                    label="否"
                    value="否"
                />
                <el-option
                    key="NOT"
                    label="非空"
                    value="NOT"
                />
                <el-option
                    key="NULL"
                    label="空值"
                    value="NULL"
                />
            </el-select>

            <el-date-picker
                v-if="item.type === 'DATETIME'"
                v-model="data.formData[item.name]"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="YYYY/MM/DD HH:mm:ss"
                :disabled-date="disabledDate"
                style="width: 274px;"
                size="small"
                @change="handleChangeDate($event, item)"
            />
            <img class="icon" width="16" height="16" :src="errorSvg" @click.stop="deleteFilter(item)">
        </div>
    </template>
    <div class="add-btn mr8 ml8" @click.stop="toggleFilter">
        <svg class="icon" width="12" height="12" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-042ca774="">
            <path fill="currentColor" d="M480 480V128a32 32 0 0164 0v352h352a32 32 0 110 64H544v352a32 32 0 11-64 0V544H128a32 32 0 010-64h352z" />
        </svg>
        <div v-if="data.visible" class="show-select" @click.stop="showFilter">
            <el-input v-model="data.search" placeholder="搜索自定义字段名称" class="mb8 input" />
            <div class="ul">
                <template v-if="data.curList.length">
                    <div v-for="item in data.curList" :key="item.name" class="li" :class="[item.active ? 'disabled' : '', 'tl pl20 pr20']" @click.stop="getFilter(item)">{{ item.label }}</div>
                </template>
                <template v-else>
                    <div class="li no-data">暂无数据</div>
                </template>
            </div>
        </div>
    </div>
</template>
<script setup>
import http from '@/util/request'
import { reactive, onMounted, watchEffect, computed } from 'vue'
import errorSvg from '@/assets/images/customer/error.svg'
// const customForm = ref(null)
const props = defineProps({
    modelValue: {
        type: Object
    },
    subjectId: {
        type: [Number, String],
        default: ''
    },
    closeCustomerSelect: {
        type: Function
    }
})
const emit = defineEmits(['update:modelValue'])
const data = reactive({
    search: '',
    formData: {},
    visible: false,
    filterList: [],
    customList: [],
    where_dynamic: [],
    curList: []
})
watchEffect(() => {
    emit('update:modelValue', data.where_dynamic)
})
// 可选择的自定义筛选列表
data.curList = computed(() => {
    let arr = []
    if (data.filterList.length) {
        arr = data.filterList.filter(item => item.label.includes(data.search))
    }
    return arr
})
// watchEffect(() => {
//     if (data.filterList.length) {
//         data.curList = data.filterList.filter(item => item.label.includes(data.search))
//     }
// })
// 获取当前选择的type,value,data
data.where_dynamic = computed(() => {
    let dataArr = []
    for (const key in data.formData) {
        if (Object.hasOwnProperty.call(data.formData, key)) {
            const obj = data.customList.find(item => item.name == key)
            if (obj && verKey(data.formData[key])) {
                dataArr.push({
                    type: obj.type,
                    field: key,
                    value: ((obj.type === 'DATETIME' || obj.type === 'SELECT') ? data.formData[key].join(',') : data.formData[key])
                })
            }
        }
    }
    return dataArr
})
const verKey = val => {
    if (Array.isArray(val)) {
        return val.length
    } else {
        if (!val && val !== 0) return false
        return true
    }
}
// 日期选择禁用
const disabledDate = time => {
    const timeRange = 24 * 60 * 60 * 1000
    const maxTime = Date.now()
    const minTime = maxTime - timeRange * 90
    return (time.getTime() > maxTime || time.getTime() < minTime)
}
// 选择时间的回调
function handleChangeDate(arr, item) {
    data.formData[item.name] = arr ?? []
}
// 点击选择自定义筛选条件
const getFilter = item => {
    let index = data.customList.findIndex(filter => filter.name === item.name)
    if (index === -1) {
        data.customList.push(item)
        item.active = true
        data.visible = false
    }
}
// 删除自定义筛选条件
const deleteFilter = item => {
    const index = data.customList.findIndex(filter => filter.name === item.name)
    if (index !== -1) {
        data.customList.splice(index, 1)
        delete data.formData[item.name]
        item.active = false
    }
}
// 获取自定义筛选条件列表
const searchFieldList = () => {
    http.extensiveCustomerSearchFieldList({ subject_id: props.subjectId }).then(res => {
        if (res.data && Array.isArray(res.data)) {
            data.filterList = res.data.filter(filterList)
        }
    })
}
const filterList = item => {
    let labelArray = ['业务ID', '添加时间', '标签']
    return !labelArray.includes(item.label) && item.type !== 'SUBJECT' // 去掉高级筛选
}
// 清空筛选条件
const resetFields = () => {
    for (const key in data.formData) {
        if (Object.hasOwnProperty.call(data.formData, key)) {
            data.formData[key] = ''
        }
    }
}

const toggleFilter = () => {
    if (typeof props.closeCustomerSelect == 'function') {
        props.closeCustomerSelect()
    }
    data.visible = !data.visible
    data.search = ''
}
const showFilter = () => {
    data.visible = true
}
defineExpose({
    resetFields
})
onMounted(async() => {
    // 获取自定义字段列表
    searchFieldList()
    document.body.addEventListener('click', () => {
        data.visible = false,
        data.search = ''
    }, false)
})
</script>
<style scoped lang="scss">
.custom-box {
    display: inline-block;
    vertical-align: middle;
}
.custom-list {
    position: relative;
    display: inline-flex;
    align-items: center;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: 2px;
    &:last-child {
        margin-right: 0 !important;
    }
    > .label {
        position: relative;
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0,0,0,0.65);
        &::after {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            width: 1px;
            height: 22px;
            background: #d8d8d8;
        }
    }
    .icon {
        position: absolute;
        right: -6px;
        top: -6px;
        z-index: 9;
        cursor: pointer;
    }
    :deep(.el-input__inner) {
        border: 0;
    }
    :deep(.el-date-editor .el-range-separator) {
        padding: 0;
    }
}
.item-box {
    position: relative;
    display: inline-block;
    
}
.add-btn {
    width: 32px;
    height: 32px;
    line-height: 32px;
    background: #ffffff;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
    position: relative;
    display: inline-block;
}
.show-select {
    position: absolute;
    width: 224px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.06); 
    z-index: 1000;
    top: 40px;
    left: 0;
    :deep(.el-input__inner) {
        height: 32px;
        line-height: 32px;
        background: #ffffff;
        border-radius: 2px;
        border: 0;
        border-bottom: 1px solid rgba(0,0,0,0.15);
    }
    .ul {
        height: 273px;
        overflow-y: auto;
    }
    .li {
        height: 34px;
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #606266;
        line-height: 34px;
        &.disabled {
            color: #BFBFBF;
            cursor:not-allowed;
        }
        &.no-data {
            color: #c4c4c4;
            cursor: not-allowed;
        }
        &:not(.disabled) {
            &:hover {
                background-color: #F5F7FA;
            }
        }
    }
}
</style>