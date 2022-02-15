/* eslint-disable vue/no-mutating-props */
<template>
    <div class="rule-row-item flex flex-justify-start">
        <div class="rule-box">
            <!-- {{ ruleItem.field_type }} -->
            <!-- {{ newRuleItem.field_key }} -->
            <select-variable
                :task-variable="newRuleItem.field_key"
                :events-id="eventsId"
                :disabled="disabled"
                :class="[newRuleItem.field_key || disabled ? '' : 'rule-item-err']"
                @changeObj="(v, o) => changeTaskVariable(v, o, newRuleItem)"
            />
        </div>
        <div class="rule-box">
            <!-- {{ newRuleItem.opreator }} -->
            <el-select
                v-model="newRuleItem.opreator"
                style="width: 100%"
                size="mini"
                :disabled="disabled"
                :class="[newRuleItem.opreator || disabled ? '' : 'rule-item-err']"
                @change="operateChange(newRuleItem)"
            >
                <el-option
                    v-for="item in typeToOperate(newRuleItem.field_type)"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
        </div>
        <div
            v-if="
                newRuleItem.field_type === 'DATETIME' &&
                    (newRuleItem.opreator === 'BETWEEN' || newRuleItem.opreator === 'RELATIVE')
            "
            class="rule-box-time"
        >
            <!-- 绝对时间区间 -->
            <el-date-picker
                v-if="newRuleItem.opreator === 'BETWEEN'"
                v-model="newRuleItem.params"
                value-format="YYYY-MM-DD HH:mm:ss"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                :clearable="false"
                :disabled="disabled"
                :class="[
                    (newRuleItem.params[0] && newRuleItem.params[1]) || disabled
                        ? ''
                        : 'rule-item-err'
                ]"
            />
            <!-- 相对时间区间 -->
            <div
                v-if="newRuleItem.opreator === 'RELATIVE'"
                class="rule-box-time-relative"
            >
                <el-input-number
                    v-model="newRuleItem.params[0]"
                    style="width: 80px"
                    placeholder="请输入"
                    :controls="false"
                    :step="1"
                    :min="0"
                    step-strictly
                    :disabled="disabled || newRuleItem.params_unit[0] === 'TODAY'"
                    :class="[
                        newRuleItem.params[0] ||
                            newRuleItem.params[0] === 0 ||
                            disabled ||
                            newRuleItem.params_unit[0] === 'TODAY'
                            ? ''
                            : 'rule-item-err',
                        'mr4'
                    ]"
                />
                <el-select
                    v-model="newRuleItem.params_unit[0]"
                    placeholder="请选择"
                    style="width: 80px"
                    :disabled="disabled"
                    :class="[newRuleItem.params_unit[0] || disabled ? '' : 'rule-item-err']"
                    @change="(e) => relativeTimeChange(e, newRuleItem, 0)"
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
                    v-model="newRuleItem.params[1]"
                    style="width: 80px"
                    placeholder="请输入"
                    :controls="false"
                    :step="1"
                    :min="0"
                    step-strictly
                    :disabled="disabled || newRuleItem.params_unit[1] === 'TODAY'"
                    :class="[
                        newRuleItem.params[1] ||
                            newRuleItem.params[1] === 0 ||
                            disabled ||
                            newRuleItem.params_unit[1] === 'TODAY'
                            ? ''
                            : 'rule-item-err',
                        'mr4'
                    ]"
                />
                <el-select
                    v-model="newRuleItem.params_unit[1]"
                    placeholder="请选择"
                    style="width: 80px"
                    :disabled="disabled"
                    :class="[newRuleItem.params_unit[1] || disabled ? '' : 'rule-item-err']"
                    @change="(e) => relativeTimeChange(e, newRuleItem, 1)"
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
                newRuleItem.field_type === 'NUMBER' && newRuleItem.opreator === 'BETWEEN'
            "
            class="rule-box-number-range"
        >
            <el-input-number
                v-model="newRuleItem.params[0]"
                placeholder="请输入"
                style="width: 164px"
                size="mini"
                :controls="false"
                :disabled="
                    disabled || ['EMPTY', 'NOT_EMPTY'].includes(newRuleItem.opreator)
                "
                :class="[
                    newRuleItem.params[0] ||
                        disabled ||
                        ['EMPTY', 'NOT_EMPTY'].includes(newRuleItem.opreator)
                        ? ''
                        : 'rule-item-err'
                ]"
            />
            <span>&nbsp;至&nbsp;</span>
            <el-input-number
                v-model="newRuleItem.params[1]"
                placeholder="请输入"
                style="width: 164px"
                size="mini"
                :controls="false"
                :disabled="
                    disabled || ['EMPTY', 'NOT_EMPTY'].includes(newRuleItem.opreator)
                "
                :class="[
                    newRuleItem.params[1] ||
                        disabled ||
                        ['EMPTY', 'NOT_EMPTY'].includes(newRuleItem.opreator)
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
                    (newRuleItem.field_type === 'DATETIME' &&
                        newRuleItem.opreator === 'SHORTCUT_RELATIVE') ||
                        (newRuleItem.field_type === 'OPTIONS' &&
                            !['IN', 'NOT_IN'].includes(newRuleItem.opreator))
                "
            >
                <el-select
                    v-model="newRuleItem.params[0]"
                    :disabled="
                        disabled || ['EMPTY', 'NOT_EMPTY'].includes(newRuleItem.opreator)
                    "
                    placeholder="请选择单选"
                    style="width: 100%"
                    :class="[
                        newRuleItem.params[0] ||
                            disabled ||
                            ['EMPTY', 'NOT_EMPTY'].includes(newRuleItem.opreator)
                            ? ''
                            : 'rule-item-err'
                    ]"
                    @focus="(e) => optionVisibleChange(e, newRuleItem)"
                >
                    <el-option
                        v-for="(option, indexO) in newRuleItem.options"
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
                    newRuleItem.field_type === 'OPTIONS' &&
                        ['IN', 'NOT_IN'].includes(newRuleItem.opreator)
                "
            >
                <el-select
                    :key="newRuleItem.opreator"
                    v-model="newRuleItem.params"
                    :disabled="
                        disabled || ['EMPTY', 'NOT_EMPTY'].includes(newRuleItem.opreator)
                    "
                    placeholder="请选择多选"
                    style="width: 100%"
                    :multiple="true"
                    :class="[
                        newRuleItem.params.length !== 0 ||
                            disabled ||
                            ['EMPTY', 'NOT_EMPTY'].includes(newRuleItem.opreator)
                            ? ''
                            : 'rule-item-err'
                    ]"
                    @focus="(e) => optionVisibleChange(e, newRuleItem)"
                >
                    <template v-if="newRuleItem.options && newRuleItem.options.length">
                        <el-option
                            v-for="(option, indexO) in newRuleItem.options"
                            :key="option.label + `${indexO}${newRuleItem.opreator}`"
                            :label="option.label"
                            :value="option.value"
                        />
                    </template>
                </el-select>
            </template>
            <!-- 数字 -->
            <el-input-number
                v-else-if="
                    newRuleItem.field_type === 'NUMBER' && newRuleItem.opreator !== 'BETWEEN'
                "
                :key="newRuleItem.opreator"
                v-model="newRuleItem.params[0]"
                style="width: 100%"
                placeholder="请输入"
                size="mini"
                :controls="false"
                :disabled="
                    disabled || ['EMPTY', 'NOT_EMPTY'].includes(newRuleItem.opreator)
                "
                :class="[
                    newRuleItem.params[0] ||
                        disabled ||
                        ['EMPTY', 'NOT_EMPTY'].includes(newRuleItem.opreator)
                        ? ''
                        : 'rule-item-err',
                    'mr4'
                ]"
            />
            <el-input
                v-else
                v-model="newRuleItem.params[0]"
                class="mr4"
                style="width: 100%"
                placeholder="请输入"
                size="mini"
                :disabled="
                    disabled ||
                        ['EMPTY', 'NOT_EMPTY'].includes(newRuleItem.opreator) ||
                        newRuleItem.field_type === 'BOOLEAN'
                "
                :class="[
                    newRuleItem.params[0] ||
                        disabled ||
                        ['EMPTY', 'NOT_EMPTY'].includes(newRuleItem.opreator) ||
                        newRuleItem.field_type === 'BOOLEAN'
                        ? ''
                        : 'rule-item-err'
                ]"
            />
        </div>
        <div v-if="!disabled" class="rule-item-btn-group flex flex-justify-start">
            <div
                class="add-rule-btn rule-row-item-btn flex flex-justify-center flex-align-center"
                @click="$emit('addRuleItem')"
            >
                <img
                    src="@/assets/images/eventManage/addInGroup.svg"
                    alt="+"
                >
            </div>
            <div
                class="add-rule-btn rule-row-item-btn flex flex-justify-center flex-align-center"
                @click="$emit('delRuleItem')"
            >
                <img
                    src="@/assets/images/eventManage/minusInGroup.svg"
                    alt="-"
                >
            </div>
        </div>
    </div>
</template>

<script>
// import { nextTick } from 'vue-demi'
import { typeToOperate } from './combinationRule'
export default {
    name: 'RuleItem',
    components: {
        'select-variable': () => import('../selectVariable/selectVariable.vue')
    },
    props: {
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
    },
    emits: ['addRuleItem', 'delRuleItem', 'updateValue'],
    data() {
        return {
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
        }
    },
    computed: {
        // 图片引入
        getImageUrl(url) {
            return new URL(url, import.meta.url).href
        },
        // 输入规则是否报错
        isError() {
            let ruleItem = this.newRuleItem
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
                        let i0 = this.getMultipleI(ruleItem.params_unit[0])
                        let i1 = this.getMultipleI(ruleItem.params_unit[1])
                        let gap = i1 * ruleItem.params[1] - i0 * ruleItem.params[0]
                        return !!(parseInt(gap) < 0)
                    }
                }
            }
            return false
        }
    },
    watch: {

        // ruleItem: {
        //     handler(n, o) {
        //         console.log(o)
        //         this.newRuleItem = JSON.parse(JSON.stringify(n))
        //     },
        //     immediate: true,
        //     deep: true
        // }

        // ruleList: {
        //     handler(n, o) {
        //         console.log(o)
        //         this.newRuleItem = JSON.parse(JSON.stringify(n[this.index]))
        //     },
        //     immediate: true,
        //     deep: true
        // }
        newRuleItem: {
            handler(n) {
                this.$emit('updateValue', n, this.index)
                // console.log(o)
                // this.newRuleItem = JSON.parse(JSON.stringify(n))
            },
            deep: true
        }
        
    },
    mounted() {
        // 页面初始化时接收父组件传来的值
        // console.log('初始化规则的值', this.ruleItem)
        // nextTick(() => {
        //     if (this.ruleItem) {
        //         this.newRuleItem = JSON.parse(JSON.stringify(this.ruleItem))
        //     }
        // })
    },
    created() {},
    methods: {
        getMultipleI(type) {
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
        },
        typeToOperate,
        // 相对时间 时间单位下拉框改变
        relativeTimeChange(v, ruleItem, i) {
            if (v === 'TODAY') {
                let p = ruleItem.params
                p[i] = 0
                // this.$set(ruleItem, 'params', p)
                ruleItem.params = p
            }
        },
        // 单多选项聚焦
        optionVisibleChange(e, ruleItem) {
            this.operateChange(ruleItem)
        },
        // 第一个框 变量改变
        async changeTaskVariable(v, o, ruleItem) {
            // console.log('变量改变', v, o, ruleItem)
            ruleItem.opreator = ''
            ruleItem.params = ['', '']
            ruleItem.field_type = o.element_type
            ruleItem.target_type = o.target_type // 条件类型选择，EVENT/ SUBJECT/EVENT_AGGRE"
            this.newRuleItem.field_key = v
            if (o.element_type === 'OPTIONS' && o.element_key) {
                // this.$set(ruleItem, 'option_json', o.element_option_json)
                ruleItem.option_json = o.element_option_json
            }
        },
        async operateChange(ruleItem) {
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
        },
        getElementOptions(keys) {
            let param = {
                key: keys
            }
            console.log(param)
            return new Promise(res => {
                const response = {
                    pay_type: ['支付宝', '微信'],
                    card_type: ['钻石', '金卡', '银卡', '普卡']
                }
                res(response)
            })
        },
        addRuleItem(arr, i) {
            let item = this.getRuleBase('SINGLE')
            arr.splice(i + 1, 0, item[0])
        },
        ruleChange() {
            this.$emit('updateValue', this.newRuleItem, this.index)
        },
        delRuleItem(arr, i) {
            arr.splice(i, 1)
        },
        getRuleBase(type) {
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
    }
}
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
