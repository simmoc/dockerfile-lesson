<template>
    <el-upload
        :action="props.action"
        :data="props.data"
        :name="props.name"
        :before-upload="beforeUpload"
        :on-exceed="onExceed"
        :file-list="files"
        :limit="max"
        :http-request="uploadImg"
    >
        <!--        <div class="slot">-->
        <!--            <i class="el-icon-upload" />-->
        <!--            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
        <!--        </div>-->
        <el-button size="small" type="default" icon="el-icon-upload2">点击上传</el-button>
        <!--        <template #tip>-->
        <!--            <div v-if="!notip" class="el-upload__tip">-->
        <!--                <div style="display: inline-block;">-->
        <!--                    <el-alert :title="`上传文件支持 ${ ext.join(' / ') } 格式，单个文件大小不超过 ${ size }MB，且文件数量不超过 ${ max } 个`" type="info" show-icon :closable="false" />-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </template>-->
    </el-upload>
</template>

<script setup>
import Http from '@/util/request'
// import { timestampToTime } from '@/util/index'
import { ElMessage } from 'element-plus'
const { proxy } = getCurrentInstance()

const props = defineProps({
    action: {
        type: String,
        default: ''
    },
    headers: {
        type: Object,
        default: () => {}
    },
    data: {
        type: Object,
        default: () => {}
    },
    name: {
        type: String,
        default: 'file'
    },
    size: {
        type: Number,
        default: 2
    },
    max: {
        type: Number,
        default: 3
    },
    files: {
        type: Array,
        default: () => []
    },
    notip: {
        type: Boolean,
        default: false
    },
    ext: {
        type: Array,
        default: () => ['zip', 'rar']
    }
})

const emit = defineEmits(['on-success'])
console.log(emit)
// const fileTypeList = ref([])
// const fileList = ref([])
const data = ref([])
function beforeUpload(file) {
    // 判断文件大小、格式
    // const isRightName = file.name.length <= Infinity
    const isLT8M = file.size / 1024 / 1024 <= 2
    const fileNameArray = file.name.split('.')
    const fileSuffix = `${fileNameArray[fileNameArray.length - 1]}` // 文件名后缀
    // const isSameFileName =
    //     fileList && fileList.value.find(i => i.resourceName === file.name) // 文件名称是否重复
    // 根据文件名后缀判断文件格式是否正确
    if (
        props.ext.length > 0 &&
        !props.ext.includes(fileSuffix)
    ) {

        ElMessage.error('文件格式不正确')

        return false
    }
    // if (!isRightName) {
    //     ElMessage.error('文件名称不能超过30个字（含后缀名）')
    //     return false
    // }
    // if (isSameFileName) {
    //     ElMessage.error('上传文件名称不可相同，请修改文件名后重新上传')
    //     return false
    // }
    if (!isLT8M) {
        ElMessage.error('文件大小不能超过2M')
        return false
    }
    // const time = timestampToTime()
    data.value = {
        file,
        'file_type': '3' // 实施配置文件上传
    }
}
function onExceed() {
    proxy.$message.warning('文件上传超过限制')
}
function onSuccess(data) {
    emit('on-success', data)
}
async function uploadImg() {
    let res = await Http.upload(data.value, [], true)
    onSuccess(res.data)

}
</script>

<style lang="scss" scoped>
/*:deep(.el-upload-dragger) {*/
/*    width: auto;*/
/*    height: auto;*/
/*    overflow: unset;*/
/*    &.is-dragover {*/
/*        border-width: 1px;*/
/*    }*/
/*}*/
.slot {
    width: 300px;
    height: 160px;
}
</style>
