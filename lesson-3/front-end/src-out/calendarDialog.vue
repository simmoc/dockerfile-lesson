<template>
  <el-dialog
    ref="dialog"
    :model-value="props.dialogVisible"
    :title="props.title"
    :width="width || '50%'"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="emit('cancel')"
  >
    <slot />
    <template #footer>
      <span v-if="props.dialogButton" class="dialog-footer">
        <el-button size="small" @click="emit('cancel')">取消</el-button>
        <el-button type="primary" size="small" @click="handleConfirm"
          >确定</el-button
        >
      </span>

      <span v-else-if="props.dialogEditText" class="dialog-footer">
        <el-button size="small" @click="handleConfirmType">仅此</el-button>
        <el-button type="primary" size="small" @click="handleConfirm"
          >所有</el-button
        >
      </span>

      <span v-else-if="props.dialogStop" class="dialog-footer">
        <el-button size="small" @click="emit('cancel')">取消</el-button>
        <el-button type="primary" size="small" @click="handleConfirmType"
          >仅终止当前任务</el-button
        >
        <el-button type="primary" size="small" @click="handleConfirm"
          >终止将来所有任务</el-button
        >
      </span>

      <span v-else class="dialog-footer">
        <el-button size="small" @click="emit('cancel')">取消</el-button>
        <el-button type="primary" size="small" @click="handleConfirmType"
          >仅删除当前任务</el-button
        >
        <el-button type="primary" size="small" @click="handleConfirm"
          >删除将来所有任务</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
// import { ElMessage } from 'element-plus'
const props = defineProps({
  title: {
    type: String,
    default: '弹窗标题',
  },
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  confirmFn: {
    type: Function,
    default: () =>
      new Promise((resolve) => {
        return resolve()
      }),
  },
  confirmFnType: {
    type: Function,
    default: () =>
      new Promise((resolve) => {
        return resolve()
      }),
  },
  width: {
    type: String,
    default: '500px',
  },
  dialogButton: {
    type: Boolean,
  },
  dialogEditText: {
    type: Boolean,
  },
  dialogStop: {
    type: Boolean,
  },
})
const emit = defineEmits(['cancel'])
const handleConfirm = async () => {
  console.log(2222)
  props.confirmFn()
  // ElMessage.success('保存成功')
}
const handleConfirmType = async () => {
  console.log(2222)
  props.confirmFnType()
}
// const confirmText = () => {
//     if (props.dialogStop) {
//         return '确认'
//     }
// }
</script>

<style scoped></style>
