<template>
    <el-dialog
        ref="dialog"
        :model-value="props.dialogVisible"
        :title="props.title"
        :width="width||'50%'"
        :close-on-click-modal="false"
        :top="top"
        :close-on-press-escape="false"
        @close="emit('cancel')"
    >
        <slot />
        <template #footer>
            <span class="dialog-footer">
                <slot 
                    name="text"
                />
                <el-button size="small"
                           @click="emit('cancel')"
                >取消</el-button>
                <el-button
                    v-if="!props.customConfirm"
                    type="primary"
                    size="small"
                    @click="handleConfirm"
                >确定</el-button>
                <slot 
                    v-else
                    name="confirm" 
                />
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
    width: { // 弹窗离顶部高度
        type: String,
        default: '500px'
    },
    top: {
        type: String,
        default: '15vh'
    },
    customConfirm: {
        type: Boolean,
        default: false
    },
    cusHeader: {
        type: Boolean,
        default: false  
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
