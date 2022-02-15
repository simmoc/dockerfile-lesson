/* eslint-disable vue/no-mutating-props */
<template>
    <div class="rule-row-item flex flex-justify-start">
        <div class="rule-box">
            <!-- {{ ruleItem.field_type }} -->
            <!-- {{ newRuleItem.field_key }} -->
            <SelectVariable
                :task-variable="reacData.newRuleItem.field_key"
                :events-id="props.eventsId"
                :disabled="props.disabled"
                :class="[reacData.newRuleItem.field_key || props.disabled ? '' : 'rule-item-err']"
                @changeObj="(v, o) => changeTaskVariable(v, o, reacData.newRuleItem)"
            />
        </div>
        <div class="rule-box">
            <!-- {{ reacData.newRuleItem.opreator }} -->
            <el-select
                v-model="reacData.newRuleItem.opreator"
                style="width: 100%"
                size="mini"
                :disabled="props.disabled"
                :class="[reacData.newRuleItem.opreator || props.disabled ? '' : 'rule-item-err']"
                @change="operateChange(reacData.newRuleItem)"
            >
                <el-option
                    v-for="item in typeToOperate(reacData.newRuleItem.field_type)"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
        </div>
        <div
            v-if="
                reacData.newRuleItem.field_type === 'DATETIME' &&
                    (reacData.newRuleItem.opreator === 'BETWEEN' || reacData.newRuleItem.opreator === 'RELATIVE')
            "
            class="rule-box-time"
        >
            <!-- 绝对时间区间 -->
            <el-date-picker
                v-if="reacData.newRuleItem.opreator === 'BETWEEN'"
                v-model="reacData.newRuleItem.params"
                value-format="YYYY-MM-DD HH:mm:ss"
                type="datetimerange"
                :picker-options="reacData.pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                :clearable="false"
                :disabled="props.disabled"
                :class="[
                    (reacData.newRuleItem.params[0] && reacData.newRuleItem.params[1]) || props.disabled
                        ? ''
                        : 'rule-item-err'
                ]"
            />
            <!-- 相对时间区间 -->
            <div
                v-if="reacData.newRuleItem.opreator === 'RELATIVE'"
                class="rule-box-time-relative"
            >
                <el-input-number
                    v-model="reacData.newRuleItem.params[0]"
                    style="width: 80px"
                    placeholder="请输入"
                    :controls="false"
                    :step="1"
                    :min="0"
                    step-strictly
                    :disabled="props.disabled || reacData.newRuleItem.params_unit[0] === 'TODAY'"
                    :class="[
                        reacData.newRuleItem.params[0] ||
                            reacData.newRuleItem.params[0] === 0 ||
                            props.disabled ||
                            reacData.newRuleItem.params_unit[0] === 'TODAY'
                            ? ''
                            : 'rule-item-err',
                        'mr4'
                    ]"
                />
                <el-select
                    v-model="reacData.newRuleItem.params_unit[0]"
                    placeholder="请选择"
                    style="width: 80px"
                    :disabled="props.disabled"
                    :class="[reacData.newRuleItem.params_unit[0] || props.disabled ? '' : 'rule-item-err']"
                    @change="(e) => relativeTimeChange(e, reacData.newRuleItem, 0)"
                >
                    <el-option
                        v-for="(item, indexU) in typeToOperate('TIMEUNIT')"
                        :key="item.value + `${indexU}S`"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
                <span>&nbsp;至&nbsp;</span>
                <el-input-number
                    v-model="reacData.newRuleItem.params[1]"
                    style="width: 80px"
                    placeholder="请输入"
                    :controls="false"
                    :step="1"
                    :min="0"
                    step-strictly
                    :disabled="props.disabled || reacData.newRuleItem.params_unit[1] === 'TODAY'"
                    :class="[
                        reacData.newRuleItem.params[1] ||
                            reacData.newRuleItem.params[1] === 0 ||
                            props.disabled ||
                            reacData.newRuleItem.params_unit[1] === 'TODAY'
                            ? ''
                            : 'rule-item-err',
                        'mr4'
                    ]"
                />
                <el-select
                    v-model="reacData.newRuleItem.params_unit[1]"
                    placeholder="请选择"
                    style="width: 80px"
                    :disabled="props.disabled"
                    :class="[reacData.newRuleItem.params_unit[1] || props.disabled ? '' : 'rule-item-err']"
                    @change="(e) => relativeTimeChange(e, reacData.newRuleItem, 1)"
                >
                    <el-option
                        v-for="(item, indexU) in typeToOperate('TIMEUNIT')"
                        :key="item.value + `${indexU}E`"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
                <!-- 待完善！！ -->
                <div v-if="isError" class="rule-box-tip">
                    <div class="rule-box-tip-txt">时间区间配置有误</div>
                </div>
            </div>
        </div>
        <!-- 数字区间 -->
        <div
            v-else-if="
                reacData.newRuleItem.field_type === 'NUMBER' && reacData.newRuleItem.opreator === 'BETWEEN'
            "
            class="rule-box-number-range"
        >
            <!-- {{ reacData.newRuleItem.params[0] + '—' }}
            {{ reacData.newRuleItem.params[1] + '—' }} -->
            <el-input-number
                v-model="reacData.newRuleItem.params[0]"
                placeholder="请输入"
                style="width: 164px"
                size="mini"
                :controls="false"
                :disabled="
                    props.disabled || ['EMPTY', 'NOT_EMPTY'].includes(reacData.newRuleItem.opreator)
                "
                :class="[
                    reacData.newRuleItem.params[0] ||
                        props.disabled ||
                        ['EMPTY', 'NOT_EMPTY'].includes(reacData.newRuleItem.opreator)
                        ? ''
                        : 'rule-item-err'
                ]"
            />
            <span>&nbsp;至&nbsp;</span>
            <el-input-number
                v-model="reacData.newRuleItem.params[1]"
                placeholder="请输入"
                style="width: 164px"
                size="mini"
                :controls="false"
                :disabled="
                    props.disabled || ['EMPTY', 'NOT_EMPTY'].includes(reacData.newRuleItem.opreator)
                "
                :class="[
                    reacData.newRuleItem.params[1] ||
                        props.disabled ||
                        ['EMPTY', 'NOT_EMPTY'].includes(reacData.newRuleItem.opreator)
                        ? ''
                        : 'rule-item-err'
                ]"
            />
            <div v-if="isError" class="rule-box-tip">
                <div class="rule-box-tip-txt">数值区间配置有误</div>
            </div>
        </div>
        <div v-else class="rule-box">
            <!-- 快捷时间区间 + 单选项-->
            <template
                v-if="
                    (reacData.newRuleItem.field_type === 'DATETIME' &&
                        reacData.newRuleItem.opreator === 'SHORTCUT_RELATIVE') ||
                        (reacData.newRuleItem.field_type === 'OPTIONS' &&
                            !['IN', 'NOT_IN'].includes(reacData.newRuleItem.opreator))
                "
            >
                <el-select
                    v-model="reacData.newRuleItem.params[0]"
                    :disabled="
                        props.disabled || ['EMPTY', 'NOT_EMPTY'].includes(reacData.newRuleItem.opreator)
                    "
                    placeholder="请选择单选"
                    style="width: 100%"
                    :class="[
                        reacData.newRuleItem.params[0] ||
                            props.disabled ||
                            ['EMPTY', 'NOT_EMPTY'].includes(reacData.newRuleItem.opreator)
                            ? ''
                            : 'rule-item-err'
                    ]"
                    @focus="(e) => optionVisibleChange(e, reacData.newRuleItem)"
                >
                    <el-option
                        v-for="(option, indexO) in reacData.newRuleItem.options"
                        :key="option.label + `${indexO}`"
                        :label="option.label"
                        :value="option.value"
                    />
                </el-select>
            </template>
            <!-- 选项多选 -->
            <!-- 多选 -->
            <template
                v-else-if="
                    reacData.newRuleItem.field_type === 'OPTIONS' &&
                        ['IN', 'NOT_IN'].includes(reacData.newRuleItem.opreator)
                "
            >
                <el-select
                    :key="reacData.newRuleItem.opreator"
                    v-model="reacData.newRuleItem.params"
                    :disabled="
                        props.disabled || ['EMPTY', 'NOT_EMPTY'].includes(reacData.newRuleItem.opreator)
                    "
                    placeholder="请选择多选"
                    style="width: 100%"
                    :multiple="true"
                    :class="[
                        reacData.newRuleItem.params.length !== 0 ||
                            props.disabled ||
                            ['EMPTY', 'NOT_EMPTY'].includes(reacData.newRuleItem.opreator)
                            ? ''
                            : 'rule-item-err'
                    ]"
                    @focus="(e) => optionVisibleChange(e, reacData.newRuleItem)"
                >
                    <template v-if="reacData.newRuleItem.options && reacData.newRuleItem.options.length">
                        <el-option
                            v-for="(option, indexO) in reacData.newRuleItem.options"
                            :key="option.label + `${indexO}${reacData.newRuleItem.opreator}`"
                            :label="option.label"
                            :value="option.value"
                        />
                    </template>
                </el-select>
            </template>
            <!-- 数字 -->
            <el-input-number
                v-else-if="
                    reacData.newRuleItem.field_type === 'NUMBER' && reacData.newRuleItem.opreator !== 'BETWEEN'
                "
                :key="reacData.newRuleItem.opreator"
                v-model="reacData.newRuleItem.params[0]"
                style="width: 100%"
                placeholder="请输入"
                size="mini"
                :controls="false"
                :disabled="
                    props.disabled || ['EMPTY', 'NOT_EMPTY'].includes(reacData.newRuleItem.opreator)
                "
                :class="[
                    reacData.newRuleItem.params[0] ||
                        props.disabled ||
                        ['EMPTY', 'NOT_EMPTY'].includes(reacData.newRuleItem.opreator)
                        ? ''
                        : 'rule-item-err',
                    'mr4'
                ]"
            />
            <el-input
                v-else
                v-model="reacData.newRuleItem.params[0]"
                class="mr4"
                style="width: 100%"
                placeholder="请输入"
                size="mini"
                :disabled="
                    props.disabled ||
                        ['EMPTY', 'NOT_EMPTY'].includes(reacData.newRuleItem.opreator) ||
                        reacData.newRuleItem.field_type === 'BOOLEAN'
                "
                :class="[
                    reacData.newRuleItem.params[0] ||
                        props.disabled ||
                        ['EMPTY', 'NOT_EMPTY'].includes(reacData.newRuleItem.opreator) ||
                        reacData.newRuleItem.field_type === 'BOOLEAN'
                        ? ''
                        : 'rule-item-err'
                ]"
            />
        </div>
        <div v-if="!props.disabled" class="rule-item-btn-group flex flex-justify-start">
            <div
                class="add-rule-btn rule-row-item-btn flex flex-justify-center flex-align-center"
                @click="emit('addRuleItem')"
            >
                <img
                    src="@/assets/images/eventManage/addInGroup.svg"
                    alt="+"
                >
            </div>
            <div
                class="add-rule-btn rule-row-item-btn flex flex-justify-center flex-align-center"
                @click="emit('delRuleItem')"
            >
                <img
                    src="../../assets/images/eventManage/minusInGroup.svg"
                    alt="-"
                >
            </div>
        </div>
    </div>
</template>

<script setup>
import { typeToOperate } from './combinationRule'
import SelectVariable from '../selectVariable/selectVariable.vue'
import { computed, watch } from 'vue-demi'

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    ruleItem: {
        type: Object,
        default: function() {
            return {}
        }
    },
    ruleList: {
        type: Array,
        default: () => []
    },
    eventsId: {
        type: [String, Number],
        default: ''
    },
    index: {
        type: Number
    }
})

const emit = defineEmits(['addRuleItem', 'delRuleItem', 'updateValue'])

const reacData = reactive({
    newRuleItem: {},
    pickerOptions: {
        shortcuts: [
            {
                text: '最近一周',
                onClick(picker) {
                    const end = new Date()
                    const start = new Date()
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                    picker.$emit('pick', [start, end])
                }
            },
            {
                text: '最近一个月',
                onClick(picker) {
                    const end = new Date()
                    const start = new Date()
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                    picker.$emit('pick', [start, end])
                }
            }
        ]
    }
})

const isError = computed(() => {
    let ruleItem = reacData.newRuleItem
    let type = ruleItem.field_type
    let params = JSON.parse(JSON.stringify(ruleItem.params))
    if (params && type) {
        // 数字区间
        if (type === 'NUMBER' && ruleItem.opreator === 'BETWEEN') {
            if (params[0] > params[1]) {
                return true
            }
        } else if (type === 'DATETIME' && ruleItem.opreator === 'RELATIVE') {
            // 相对时间区间
            if (
                ruleItem.params_unit &&
                ruleItem.params_unit[0] &&
                ruleItem.params_unit[1]
            ) {
                let i0 = getMultipleI(ruleItem.params_unit[0])
                let i1 = getMultipleI(ruleItem.params_unit[1])
                let gap = i1 * ruleItem.params[1] - i0 * ruleItem.params[0]
                return !!(parseInt(gap) < 0)
            }
        }
    }
    return false
})

// onMounted(() => {
//     reacData.newRuleItem = JSON.parse(JSON.stringify(props.ruleItem))
// })

watch(() => props.ruleItem, valNew => {
    if (JSON.stringify(reacData.newRuleItem) == '{}') {
        reacData.newRuleItem = valNew
    } else {
        return
    }
}, {
    immediate: true,
    deep: true
})

watch(() => reacData.newRuleItem, valNew => {
    if (JSON.stringify(reacData.newRuleItem) !== '{}') {
        emit('updateValue', valNew, props.index)
    }
}, {
    immediate: true,
    deep: true
})
// // 图片引入
// function getImageUrl(url) {
//     return new URL(url, import.meta.url).href
// }

function getMultipleI(type) {
    switch (type) {
        case 'AFTER_DAY':
            return 1
        case 'BEFORE_DAY':
            return -1
        case 'TODAY':
            return 0
        default:
            return 0
    }
}
// typeToOperate,
// 相对时间 时间单位下拉框改变
function relativeTimeChange(v, ruleItem, i) {
    if (v === 'TODAY') {
        let p = ruleItem.params
        p[i] = 0
        // this.$set(ruleItem, 'params', p)
        ruleItem.params = p
    }
}
// 单多选项聚焦
function optionVisibleChange(e, ruleItem) {
    operateChange(ruleItem)
}

// 第一个框 变量改变
async function changeTaskVariable(v, o, ruleItem) {
    // console.log('变量改变', v, o, ruleItem)
    ruleItem.opreator = ''
    ruleItem.params = ['', '']
    ruleItem.field_type = o.element_type
    ruleItem.target_type = o.target_type // 条件类型选择，EVENT/ SUBJECT/EVENT_AGGRE"
    reacData.newRuleItem.field_key = v
    if (o.element_type === 'OPTIONS' && o.element_key) {
        // this.$set(ruleItem, 'option_json', o.element_option_json)
        ruleItem.option_json = o.element_option_json
    }
}
async function operateChange(ruleItem) {
    ruleItem.options = []
    ruleItem.params = ['', '']
    if (ruleItem.field_type === 'OPTIONS') {
        let options = ruleItem.option_json.map(ele => {
            if (ele) {
                return {
                    label: ele,
                    value: ele
                }
            }
        })
        if (['IN', 'NOT_IN'].includes(ruleItem.opreator)) {
            // this.$set(ruleItem, 'options', options)
            // this.$set(ruleItem, 'params', [])
            ruleItem.options = options
            ruleItem.params = []
        } else {
            ruleItem.options = options
            ruleItem.params = ['', '']
        }
        console.log(ruleItem.params)
    } else if (ruleItem.field_type === 'DATETIME') {
        if (ruleItem.opreator === 'RELATIVE') {
            // this.$set(ruleItem, 'params_unit', ['', ''])
            ruleItem.params_unit = ['', '']
        } else if (ruleItem.opreator === 'SHORTCUT_RELATIVE') {
            ruleItem.options = [
                {
                    label: '当月',
                    value: 'CURRENT_MONTH'
                }
            ]
            ruleItem.params = ['CURRENT_MONTH', '']
        }
    }
}
// function getElementOptions(keys) {
//     let param = {
//         key: keys
//     }
//     console.log(param)
//     return new Promise(res => {
//         const response = {
//             pay_type: ['支付宝', '微信'],
//             card_type: ['钻石', '金卡', '银卡', '普卡']
//         }
//         res(response)
//     })
// }

function addRuleItem(arr, i) {
    let item = getRuleBase('SINGLE')
    arr.splice(i + 1, 0, item[0])
}
function delRuleItem(arr, i) {
    arr.splice(i, 1)
}

function getRuleBase(type) {
    switch (type) {
        case 'SINGLE':
            return [
                {
                    target_type: 'SUBJECT',
                    type: 'SINGLE',
                    condition: 'AND',
                    field_type: '',
                    opreator: '',
                    params: ['', '']
                }
            ]
        case 'GROUP':
            return [
                {
                    type: 'GROUP',
                    condition: 'OR',
                    rule_set: [
                        {
                            target_type: 'EVENT',
                            field_type: 'NUMBER',
                            opreator: 'GE',
                            params: ['', '']
                        },
                        {
                            target_type: 'EVENT',
                            field_type: 'NUMBER',
                            opreator: 'LS',
                            params: [10]
                        }
                    ]
                }
            ]
        default:
            break
    }
}

defineExpose({ addRuleItem, delRuleItem })
</script>

<style scoped lang="scss">
.rule-row-item {
  padding: 4px 12px;
  background: rgba(0, 0, 0, 0.04);
  margin: 5px 0;
}
.rule-box {
  width: 160px;
  align-items: center;
}
.rule-box + .rule-box {
  margin-left: 4px;
}
.rule-box + .rule-box-time {
  margin-left: 4px;
}
.rule-box + .rule-box-number-range {
  margin-left: 4px;
}
.rule-box-time-relative,
.rule-box-number-range {
  position: relative;
  .rule-box-tip {
    position: absolute;
    bottom: -16px;
    color: #f00;
    left: 0;
    height: 14px;
    line-height: 14px;
    width: 250px;
    display: flex;
    justify-content: right;
    box-sizing: border-box;
    padding-left: 8px;
    .rule-box-tip-txt {
      font-size: 12px;
      transform: scale(0.8);
      transform-origin: left;
    }
  }
}
.add-rule-btn {
  cursor: pointer;
  margin-right: 26px;
  i.el-icon-minus::before,
  i.el-icon-plus::before {
    display: inline-block;
    text-align: center;
    height: 14px;
    width: 14px;
    font-size: 11px;
    outline: 2px solid transparent;
    line-height: 14px;
    display: inline-block;
  }
  i.el-icon-outline::before {
    outline: 1px solid rgba(0, 0, 0, 0.65);
  }
  span {
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    color: rgba(0, 0, 0, 0.65);
    line-height: 22px;
    margin-left: 10px;
  }
}
.rule-row-item-btn {
  margin-right: 0;
  margin-left: 8px;
}
.rule-row-item :deep(.el-input-number) {
  input {
    text-align: left;
  }
}
</style>
<style>
.rule-item-err {
  /* outline: 1px solid #f00; */
}
</style>
