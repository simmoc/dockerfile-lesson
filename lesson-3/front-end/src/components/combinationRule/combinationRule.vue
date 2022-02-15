<template>
    <div>
        <!-- element_type -->
        <div class="combination-rule-wrap" style="min-width: 80vw">
            <div class="rule-group-container">
                <div
                    v-for="(item, i) in [combineRules]"
                    :key="i"
                    class="flex flex-justify-start"
                >
                    <!-- 最外层条件组 -->
                    <div
                        class="rule-condition-wrap condition flex flex-direction-column flex-justify-center"
                    >
                        <template
                            v-if="
                                item.rule_set &&
                                    item.rule_set.length &&
                                    item.rule_set.length > 1
                            "
                        >
                            <div class="rule-condition-link rule-condition-link-up" />
                            <el-select
                                v-model="item.condition"
                                style="width: 80px"
                                size="mini"
                                :disabled="disabled"
                                class="mr12"
                            >
                                <el-option
                                    v-for="citem in conditionOption"
                                    :key="citem.value"
                                    :label="citem.label"
                                    :value="citem.value"
                                />
                            </el-select>
                            <div class="rule-condition-link rule-condition-link-down" />
                        </template>
                    </div>
                    <div class="rule-item-wrap flex-1">
                        <div
                            v-for="(rule, i1) in item.rule_set"
                            :key="i1"
                            class="rule flex flex-justify-start"
                        >
                            <div
                                v-if="
                                    rule.type === 'GROUP' && rule.rule_set && rule.rule_set.length
                                "
                                class="flex flex-justify-between rule-item-group-wrap of00 flex-1"
                            >
                                <div class="flex flex-justify-start">
                                    <div class="rule-condition-wrap flex flex-direction-column flex-justify-center">
                                        <template
                                            v-if="
                                                rule.rule_set &&
                                                    rule.rule_set.length &&
                                                    rule.rule_set.length > 1
                                            "
                                        >
                                            <div
                                                class="rule-condition-link flex flex-direction-column rule-condition-link-up"
                                                :style="{
                                                    height: (rule.rule_set.length * 46 - 70) * 0.5 + 'px'
                                                }"
                                            />
                                            <el-select
                                                v-model="rule.condition"
                                                style="width: 80px"
                                                size="mini"
                                                :disabled="disabled"
                                                class="mr12"
                                            >
                                                <el-option
                                                    v-for="(coitem, index) in conditionOption"
                                                    :key="coitem.value + `${index}`"
                                                    :label="coitem.label"
                                                    :value="coitem.value"
                                                />
                                            </el-select>
                                            <div
                                                class="rule-condition-link rule-condition-link-down"
                                                :style="{
                                                    height: (rule.rule_set.length * 46 - 70) * 0.5 + 'px'
                                                }"
                                            />
                                        </template>
                                    </div>
                                    <div>
                                        <!-- 循环单条件单元 -->
                                        <div
                                            v-for="(ruleItem, i2) in rule.rule_set"
                                            :key="i2"
                                            class="rule flex flex-justify-start"
                                        >
                                            <rule-item
                                                :rule-item="ruleItem"
                                                :index="i2"
                                                :events-id="eventsId"
                                                :disabled="disabled"
                                                :is-operate="true"
                                                :rule-list="rule.rule_set"
                                                @updateValue="(item_pp, index_pp) => changeRuleItem(item_pp, index_pp, rule.rule_set)"
                                                @addRuleItem="addRuleItem(rule.rule_set, i2)"
                                                @delRuleItem="
                                                    delRuleItem(
                                                        rule.rule_set,
                                                        i2,
                                                        'group',
                                                        item.rule_set,
                                                        i1
                                                    )
                                                "
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="rule-group-item-btn-group flex flex-justify-start flex-align-center"
                                >
                                    <div
                                        v-if="!disabled"
                                        class="rule-group-item-btn-del"
                                        @click="delRuleItem(item.rule_set, i1)"
                                    >
                                        <i class="el-icon-circle-close" />
                                    </div>
                                </div>
                            </div>
                            <div v-else-if="rule.type === 'SINGLE'">
                                <rule-item
                                    :events-id="eventsId"
                                    :disabled="disabled"
                                    :rule-item="rule"
                                    :rule-list="item.rule_set"
                                    :is-operate="false"
                                    :index="i1"
                                    @updateValue="(item_vv, index_vv) => changeRuleItem(item_vv, index_vv, item.rule_set)"
                                    @addRuleItem="addRuleItem(item.rule_set, i1)"
                                    @delRuleItem="delRuleItem(item.rule_set, i1)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!disabled" class="flex flex-justify-start pr24 pr8 pl8">
            <div
                class="add-rule-btn flex flex-justify-start flex-align-center"
                @click="addRule('SINGLE', 1)"
            >
                <img src="@/assets/images/eventManage/addItem.svg">
                <span>添加条件</span>
            </div>
            <div
                class="add-rule-btn flex flex-justify-start flex-align-center"
                @click="addRule('GROUP', 1)"
            >
                <img src="@/assets/images/eventManage/addGroup.svg">
                <span>添加条件组</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        'rule-item': () => import('./ruleItem.vue')
        // 'select-variable': () => import('../selectVariable/selectVariable.vue')
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        baseCombineRules: {
            type: Object,
            default: function() {
                return {}
            }
        },
        eventsId: {
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
            combineRules: {},
            condition: '',
            taskVariable: '',
            conditionOption: [
                {
                    label: 'AND',
                    value: 'AND'
                },
                {
                    label: 'OR',
                    value: 'OR'
                }
            ],
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
    computed: {},
    watch: {
        baseCombineRules: {
            async handler(n) {
                console.log('rule==', n)
                this.combineRules = JSON.parse(JSON.stringify(n))
            },
            immediate: true
        }
    },
    created() {},
    mounted() {},
    methods: {
        // // 图片引入
        // getImageUrl(url) {
        //     return new URL(url, import.meta.url).href
        // },
        getElementOptions(keys) {
            let param = {
                key: keys
            }
            console.log(param)
            // mock
            return new Promise(res => {
                const response = {
                    pay_type: ['支付宝', '微信'],
                    card_type: ['钻石', '金卡', '银卡', '普卡']
                }
                res(response)
            })
        },
        // 从子元素emit回来修改
        changeRuleItem(item, index, ruleNow) {
            ruleNow[index] = item
            console.log('修啊hi改', ruleNow)
        },
        addRuleItem(arr, i) {
            let item = this.getRuleBase('SINGLE')
            arr.splice(i + 1, 0, item[0])
        },
        delRuleItem(arr, i, type, group, gi) {
            arr.splice(i, 1)
            // 条件组置空
            if (type === 'group' && !arr.length) {
                this.delRuleItem(group, gi)
            }
        },
        addRule(type) {
            let addRuleItem = this.getRuleBase(type)
            if (this.combineRules && this.combineRules.rule_set) {
                this.combineRules.rule_set = this.combineRules.rule_set.concat(
                    addRuleItem
                )
            } else {
                this.combineRules = {
                    condition: 'AND',
                    type,
                    rule_set: addRuleItem
                }
            }
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
                            condition: 'AND',
                            rule_set: [
                                {
                                    target_type: '',
                                    field_type: '',
                                    opreator: '',
                                    params: ['', ''],
                                    options: []
                                },
                                {
                                    target_type: '',
                                    field_type: '',
                                    opreator: '',
                                    params: ['', ''],
                                    options: []
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
.combination-rule-wrap {
  background: #f9fafb;
  box-sizing: border-box;
  padding: 8px;
}
.rule-group-container {
  .rule-group-container {
    width: 400px;
    outline: 1px solid chartreuse;
  }
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
  .rule-condition-wrap {
    display: flex;
    width: 90px;
    align-items: flex-end;
    .rule-condition-link {
      // background: cornflowerblue;
      width: 50%;
      // height: calc(40% - 14px);
      border-left: 1px solid #d8d8d8;
      border-right: none;
      height: calc(50% - 34px);
    }
    .rule-condition-link-up {
      border-top: 1px solid #d8d8d8;
    }
    .rule-condition-link-down {
      border-bottom: 1px solid #d8d8d8;
    }
  }
  .of00 {
    margin: 5px 0;
    // outline: 1px solid #f00;
  }
  .rule-item-group-wrap {
    border: 1px dashed #ccd3db;
    padding-left: 12px;
  }
  .rule-item-btn-group {
    align-items: center;
  }
  .rule-item-btn {
    width: 14px;
    height: 14px;
    line-height: 14px;
    box-sizing: border-box;
    outline: 2px solid #333;
    text-align: center;
    cursor: pointer;
    margin-right: 10px;
  }
  .rule-group-item-btn-group {
    padding-right: 3px;
    .rule-group-item-btn-del {
      padding: 4px;
      cursor: pointer;
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
</style>
