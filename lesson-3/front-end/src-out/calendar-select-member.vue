<template>
  <div class="add-member-dialog-com">
    <!-- <slot>
              <el-input
                  v-model="reacData.inputValue"
                  :placeholder="props.inputPlaceholder"
                  suffix-icon="el-icon-caret-bottom"
                  readonly
                  @click="openMemberDialog"
              />
          </slot> -->

    <div class="slot-box-pre" @click="openMemberDialog">
      <slot :data="reacData.inputValue" />
    </div>

    <el-dialog
      v-model:value="dialogVisible"
      append-to-body
      lock-scroll
      custom-class="add-member-dialog"
    >
      <div class="add-member-dialog-main-wrap">
        <el-tabs
          v-if="reacData.headTypeArr && reacData.headTypeArr.length"
          v-model:value="reacData.activeTab"
          type="card"
          @tab-click="handleClickTabs"
        >
          <el-tab-pane
            v-for="item in reacData.headTypeArr"
            :key="item.value"
            :label="item.label"
            :name="item.value"
          >
            <SelectMemberOrgTab
              :ref="'member-org-tab-' + item.value"
              :is-multiple-selected="props.isMultipleSelected"
              :is-multiple-check-box="props.isMultipleCheckBox"
              :param="{ type: item.value }"
              :selected-member-org="reacData.selectedMemberOrg"
              :dialog-visible="dialogVisible"
              :custom-selected-fn="props.customSelectedFn"
              :touch-object="touchObject"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <!-- <span slot="footer" class="dialog-footer"> -->
          <el-button @click="cancelChoose">取 消</el-button>
          <el-button type="primary" @click="submitConfirmChooseMember">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import Http from '@/util/request.js'
import { getCurrentInstance } from 'vue'
import SelectMemberOrgTab from './calendar-org-tab.vue'
const props = defineProps({
  inputPlaceholder: {
    type: String,
    default: '请选择',
  },
  // 右侧单选 多选
  isMultipleSelected: {
    type: Boolean,
    default: true,
  },
  // 左侧 checkbox 控制
  isMultipleCheckBox: {
    type: Boolean,
    default: false,
  },
  // 传入默认选中成员
  writeBackSelectedMemberOrg: {
    type: Array,
    default: function () {
      return []
    },
  },
  // 用户控制是否可选中
  customSelectedFn: {
    type: Function,
  },
  // 用户使用默认input时，依据选中成员数组，生成回显汉字
  customInputValueFn: {
    type: Function,
  },
  // 筛选时必传参数
  touchObject: {
    type: String,
  },
})

const reacData = reactive({
  headTypeArr: [],
  // dialogVisible: false,
  activeTab: '',
  selectedMemberOrg: [],
  inputValue: '',
})
const dialogVisible = ref(false)
const emit = defineEmits(['confirm'])
const { proxy } = getCurrentInstance()
defineExpose({ dialogVisible, resetSelect })
// watch(() => [reacData.activeTab, props.writeBackSelectedMemberOrg], ([activeTabNew, writeNew], [activeTabOld, writeOld]) => {
//     if (activeTabNew !== activeTabOld) {
//         // setTimeout(() => {
//         //     if (activeTabNew) {
//         //         reacData.selectedMemberOrg = JSON.parse(
//         //             JSON.stringify(proxy.$refs[`member-org-tab-${reacData.activeTabNew}`].selectedMembers)
//         //         )
//         //     }
//         // }, 300)
//     } else if (writeNew !== writeOld) {
//         console.error('获取的数据', writeNew)
//         if (writeNew) {
//             reacData.selectedMemberOrg = JSON.parse(JSON.stringify(writeNew))
//             if (props.customInputValueFn) {
//                 reacData.inputValue = props.customInputValueFn(writeNew)
//             }
//         }
//     }
// })

watch(
  () => props.writeBackSelectedMemberOrg,
  (val) => {
    // console.error('获取的数据', val)
    if (val) {
      reacData.selectedMemberOrg = JSON.parse(JSON.stringify(val))
      if (props.customInputValueFn) {
        reacData.inputValue = props.customInputValueFn(val)
      }
    }
  },
  {
    deep: true,
    immediate: true,
  }
)

onMounted(async () => {
  await getHeadTypeArr()
})

function openMemberDialog() {
  dialogVisible.value = true
  // console.log('测打印', reacData.activeTab, proxy.$refs[`member-org-tab-${reacData.activeTab}`])
  // console.log(this.dialogVisible)
}
// function setDialogVisible(v) {
//     dialogVisible.value = v
// }

// 取消选择（全部）
function resetSelect() {
  reacData.inputValue = []
  emit('confirm', [])
}
function cancelChoose() {
  dialogVisible.value = false
  reacData.selectedMemberOrg = JSON.parse(
    JSON.stringify(props.writeBackSelectedMemberOrg)
  )
}
function submitConfirmChooseMember() {
  reacData.selectedMemberOrg =
    proxy.$refs[`member-org-tab-${reacData.activeTab}`].selectedMembers || []
  let param = JSON.parse(JSON.stringify(reacData.selectedMemberOrg))

  console.log('显示值====', param)

  emit('confirm', param)
  // 用户input框 显示值
  if (props.customInputValueFn) {
    reacData.inputValue = props.customInputValueFn(param)
  }
  dialogVisible.value = false
}

async function getHeadTypeArr() {
  Http.getMemberType()
    .then((res) => {
      reacData.headTypeArr = res.data
      reacData.activeTab = reacData.headTypeArr[0].value
    })
    .catch(() => {})
}
// function dialogClosed() {
//     reacData.headTypeArr = []
//     reacData.treeData = []
// }
// async function dialogOpen() {
//     await getHeadTypeArr()
//     reacData.treeData = await getOrgList(0)
// }
function handleClickTabs() {}
</script>

<style lang="scss">
@import url('./calendar-select-member.scss');
</style>
