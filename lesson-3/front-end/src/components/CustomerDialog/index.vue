<template>
    <el-dialog
        ref="dialog"
        :model-value="props.dialogVisible"
        :title="props.title"
        :width="width||'50%'"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="emit('cancel')"
    >
        <slot />
        <template #footer>
            <span class="dialog-footer">
                <el-button size="small"
                           @click="emit('cancel')"
                >取消</el-button>
                <el-button type="primary"
                           size="small"
                           @click="handleConfirm"
                >确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
// import { ElMessage } from 'element-plus'
const props = defineProps({
    title: {
        type: String,
        default: '弹窗标题'
    },
    dialogVisible: {
        type: Boolean,
        default: false
    },
    confirmFn: {
        type: Function,
        default: () => new Promise(resolve => { return resolve() })
    },
    width: {
        type: String,
        default: '500px'
    }
})
const emit = defineEmits([ 'cancel'])
const handleConfirm = async() => {
    console.log(2222)
    props.confirmFn()
    // ElMessage.success('保存成功')
}
</script>

<style scoped>

</style>
