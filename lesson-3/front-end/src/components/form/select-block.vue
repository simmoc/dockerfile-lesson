/* eslint-disable vue/valid-v-slot */
<template>
    <div>
        <!-- {{ reacData.eventId }}- -->
        <el-input
            v-if="props.disabled"
            v-model="label"
            style="width: 100%"
            size="mini"
            :placeholder="props.placeholder"
            suffix-icon="el-icon-caret-bottom"
            readonly
            :disabled="true"
        />
        <el-popover
            v-else
            ref="selectBlockPopover"
            v-model="reacData.visible"
            :width="400"
            :popper-class="props.popperClass"
            :visible-arrow="false"
            trigger="click"
        >
            <!-- <slot> -->
            <!-- 触发下拉弹框 -->
            <template #reference>
                <el-input
                    v-if="props.isInputShow"
                    v-model="label"
                    style="width: 100%"
                    size="mini"
                    :placeholder="props.placeholder"
                    suffix-icon="el-icon-caret-bottom"
                    readonly
                />
                <div v-else class="for-position" />
            </template>

            <!-- </slot> -->
            <div class="select-block-inner">
                <el-input
                    v-model.trim="reacData.keyword"
                    placeholder="搜索"
                    class="input-with-select del-end-clear-input"
                    size="mini"
                    clearable
                >
                    <template #append>
                        <el-button icon="el-icon-search" />
                    </template>
                </el-input>
                <div v-if="!reacData.keyword" class="option-group-wrap">
                    <template v-if="props.optionGroup && props.optionGroup.length">
                        <div
                            v-for="(group, index) in props.optionGroup"
                            :key="group.subject_id + `${index}`"
                            class="option-group"
                        >
                            <div class="option-group-title">
                                <!-- {{ group }}{{ reacData.groupLabelKey }} -->
                                {{ group[reacData.groupLabelKey] }}
                            </div>
                            <el-row class="option-item-wrap">
                                <el-col
                                    v-for="(item, index1) in group.son"
                                    :key="item[reacData.valueKey] + `${index}${index1}`"
                                    :span="8"
                                    :title="item[reacData.labelKey]"
                                >
                                    <div
                                        :class="[
                                            'option-item overflow-ellipsis',
                                            props.value === item[reacData.valueKey] ? 'option-item-active' : ''
                                        ]"
                                        @click.stop="handleClickOptionItem(item)"
                                    >
                                        {{ item[reacData.labelKey] }}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </template>
                    <div v-else class="tip">{{ reacData.tipTxtO.optionEmpty }}</div>
                </div>
                <div v-else class="search-option-result-wrap">
                    <template v-if="reacData.filterOptionResult && reacData.filterOptionResult.length">
                        <div
                            v-for="(item, index1) in reacData.filterOptionResult"
                            :key="`${index1}-${item[reacData.valueKey]}`"
                            :class="[
                                'search-item-wrap',
                                props.value === item[reacData.valueKey] ? 'search-item-wrap-active' : ''
                            ]"
                            @click.stop="handleClickOptionItem(item)"
                        >
                            <span class="search-item-left">{{ item[reacData.groupLabelKey] }}</span>
                            <span>-</span>
                            <span class="search-item-right">{{ item[reacData.labelKey] }}</span>
                        </div>
                    </template>
                    <div v-else class="tip">{{ reacData.tipTxt }}</div>
                </div>
            </div>
        </el-popover>
    </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue'

const props = defineProps({
    modelValue: {
        type: [Number, String],
        default: ''
    },
    placeholder: {
        type: String,
        default: '请选择'
    },
    popperClass: {
        type: String,
        default: 'select-block-popover'
    },
    // 字段对应关系
    props: {
        type: Object,
        default: () => {
            return {
                valueKey: 'id',
                labelKey: 'label',
                groupKey: 'group',
                childrenKey: 'child'
            }
        }
    },
    // 下拉选项
    optionGroup: {
        type: Array,
        default: () => []
    },
    // 搜索方法
    filterMethod: {
        type: Function
    },
    // 点击触发器显示
    isInputShow: {
        type: Boolean,
        default: true
    },
    // 是否禁用
    disabled: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['changeObj', 'change', 'update:modelValue'])
const { proxy } = getCurrentInstance()

const reacData = reactive({
    visible: false,
    keyword: '',
    filterOptionResult: [],
    valueKey: props.props.valueKey || 'id',
    labelKey: props.props.labelKey || 'label',
    groupLabelKey: props.props.groupLabelKey || 'group',
    childrenKey: props.props.childrenKey || 'child',
    tipTxt: '加载中',
    tipTxtO: {
        loading: '加载中',
        searchEmpty: '无搜索结果，请重新输入',
        optionEmpty: '暂无数据'
    },
    // label: ''
    eventId: props.modelValue || ''
})

const label = computed(() => {
    // let curArr = reacData.keyword
    //     ? reacData.filterOptionResult
    //     : props.optionGroup.flatMap(ele => ele[reacData.childrenKey])
    let curArr = []
    if (reacData.keyword) {
        curArr = reacData.filterOptionResult
    } else if (props.optionGroup.length) {
        curArr = props.optionGroup.flatMap(ele => ele[reacData.childrenKey])
    }
    // console.log('++++++++', reacData.eventId)
    // console.log('0000000', props.optionGroup, reacData.valueKey)
    let curOption = curArr.filter(ele => {
        if (ele && ele[reacData.valueKey] != null) {
            return ele[reacData.valueKey] == reacData.eventId
        } else {
            return false
        }
    })
    return (curOption && curOption[0] && curOption[0][reacData.labelKey]) || ''
})

// watch(() => [reacData.keyword], async(n, o) => {
//     if (n && n !== o && props.filterMethod) {
//         reacData.tipTxt = reacData.tipTxtO.loading
//         reacData.filterOptionResult = await props.filterMethod(n)
//         if (!reacData.filterOptionResult.length) {
//             reacData.tipTxt = reacData.tipTxtO.searchEmpty
//         }
//     }
// }, {
//     immediate: true
// })

watch(() => [reacData.keyword,  props.modelValue], async([activeTabNew, modelValueNew], [activeTabOld, modelValueOld]) => {
    if (activeTabNew !== activeTabOld) {
        if (activeTabNew && activeTabNew !== activeTabOld && props.filterMethod) {
            reacData.tipTxt = reacData.tipTxtO.loading
            reacData.filterOptionResult = await props.filterMethod(activeTabNew)
            if (!reacData.filterOptionResult.length) {
                reacData.tipTxt = reacData.tipTxtO.searchEmpty
            }
        }
    } else if (modelValueNew !== modelValueOld) {
        reacData.eventId = modelValueNew
    }
}, {
    deep: true
})
// onMounted(() => {
//     // getLabel()
//     // console.log(props.optionGroup, '77777777777777')
// })
function openPopover() {
    proxy.$refs.selectBlockPopover.show()
}
defineExpose({ openPopover })
// function getLabel() {
//     let curArr = []
//     if (reacData.keyword) {
//         curArr = reacData.filterOptionResult
//     } else {
//         curArr = props.optionGroup.flatMap(ele => ele[reacData.childrenKey])
//     }
//     let curOption = curArr.filter(ele => {
//         // if (ele && ele[reacData.valueKey] != null) {
//         //     return ele[reacData.valueKey] == props.value
//         // } else {
//         //     return false
//         // }
//         ele[reacData.valueKey] == reacData.eventId
//     })
//     label = (curOption && curOption[0] && curOption[0][reacData.labelKey]) || ''
//     // return (curOption && curOption[0] && curOption[0][reacData.labelKey]) || ''
// }

function handleClickOptionItem(item) {
    // console.log(item, item[props.props.valueKey])
    reacData.eventId = item[props.props.valueKey]

    emit('change', item[props.props.valueKey] || item['id'])
    emit('changeObj', item[props.props.valueKey] || item['id'], item)
    emit('update:modelValue', item[props.props.valueKey] || item['id'])
    // console.log(item[props.props.valueKey])
    // getLabel()
    proxy.$refs.selectBlockPopover.visibility = false
}
</script>

<style lang="scss">
// .select-block-popover {
//   width: 300px;
//   padding: 0;
// }
.el-popover {
  padding: 0;
  .del-end-clear-input {
    .el-input__icon.el-input__validateIcon.el-icon-circle-close,
    .el-input__icon.el-input__validateIcon.el-icon-circle-check {
      display: none;
    }
  }
}
</style>

<style scoped lang="scss">
// :deep(.el-popover) {
//   padding: 0;
// }
.select-block-inner {
  // width: 300px;
  .input-with-select .el-button {
    width: 40px;
  }
  .search-option-result-wrap,
  .option-group-wrap {
    height: 426px;
    overflow: auto;
    box-sizing: border-box;
    .tip {
      font-size: 14px;
      font-weight: 400;
      text-align: left;
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .option-group-wrap {
    .option-group-title {
      font-size: 14px;
      font-weight: 500;
      text-align: left;
      color: rgba(0, 0, 0, 0.85);
      line-height: 20px;
      padding: 12px;
    }
    .option-item-wrap {
      width: 100%;
      box-sizing: border-box;
      .option-item {
        cursor: pointer;
        background: #f9fafb;
        color: #000;
        font-size: 14px;
        font-weight: 300;
        text-align: left;
        color: rgba(0, 0, 0, 0.85);
        line-height: 18px;
        height: 34px;
        padding: 8px 12px;
        &:hover {
          background: #edeff2;
          color: #000;
        }
        &.option-item-active {
          background: #1773fa;
          color: #fff;
        }
      }
    }
  }
  .search-option-result-wrap {
    padding: 6px 0px;
    .search-item-wrap {
      padding: 6px 12px;
      cursor: pointer;
      &:hover {
        background: #edeff2;
        color: #000;
      }
      &.search-item-wrap-active {
        background: #1773fa;
        span {
          color: #fff;
        }
      }
      .search-item-left {
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        color: rgba(0, 0, 0, 0.85);
        line-height: 20px;
      }
      .search-item-right {
        font-size: 14px;
        font-weight: 300;
        text-align: left;
        color: rgba(0, 0, 0, 0.85);
        line-height: 20px;
      }
    }
  }
}
</style>
