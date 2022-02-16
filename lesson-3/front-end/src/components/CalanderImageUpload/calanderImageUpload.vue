<template>
    <div class="upload-container">
        <el-upload
            :show-file-list="false"
            :headers="headers"
            :action="action"
            :data="data"
            :name="name"
            :before-upload="beforeUpload"
            :on-progress="onProgress"
            :on-success="onSuccess"
            :http-request="uploadImg"
            drag
        >
            <el-image v-if="url === ''" v-loading="loading" :src="url === '' ? placeholder : url" :style="`width:${width}px;height:${height}px;display:flex;flex-direction:column;align-items:center;justify-content:center;`"
                      fit="fill"
            >
                <template #error>
                    <div class="">
                        <i class="el-icon-plus" />
                        <div>
                            点击上传
                        </div>
                        <div class="upload-tips">
                            支持{{ props.type==='文件'?props.fileType.toString():ext.toString() }}格式{{ props.type }}大小不能大于{{ size }}M
                        </div>
                    </div>
                </template>
            </el-image>
            <div v-else class="image">
                <el-image v-if="type=='图片'" :src="url" :style="`width:140px;height:140px;`" fit="fill" />
                <video v-if="type=='视频'" :src="url" :style="`width:140px;height:140px;`" fit="fill" />
                <div v-if="type=='文件'" class="file-source-content" :style="`width:352px;height:72px;`">
                    <!-- @click="handleFileUpload" -->
                    <div class="file-img-icon">
                        <div class="file-img-icon-img">
                            <el-image
                                style="width: 40px; height: 40px"
                                fit="fill"
                                :src="fileUrl"
                            />
                        </div>
                        <div class="file-img-icon-name">
                            {{ fileName }}
                        </div>
                    </div>
                    <div class="file-icon">
                        <img
                            class="video-edit-icon"
                            src="@/assets/images/knowledgeBase/edit-000.svg"
                            alt=""
                        >
                        <img
                            class="video-delete-icon"
                            src="@/assets/images/knowledgeBase/icon_delete_000.svg"
                            alt=""
                            @click.stop="remove"
                        >
                    </div>
                </div>
                <div v-if="type!=='文件'" class="mask">
                    <div class="actions">
                        <span title="重新上传">
                            <img src="@/assets/images/knowledgeBase/icon_edit_solid.svg" alt="">
                        </span>
                        <span title="移除" @click.stop="remove">
                            <i class="el-icon-delete-solid" />
                        </span>
                    </div>
                </div>
            </div>
            <div v-show="data.progress.percent" class="progress" :style="`width:${width}px;height:${height}px;`">
                <el-image :src="data.progress.preview" :style="`width:${width}px;height:${height}px;`" fit="fill" />
                <el-progress type="circle" :width="Math.min(width, height) * 0.8" :percentage="data.progress.percent" />
            </div>
        </el-upload>
        <!--        <div v-if="!notip" class="el-upload__tip">-->
        <!--            <div style="display: inline-block;">-->
        <!--                <el-alert :title="`上传图片支持 ${ ext.join(' / ') } 格式，且图片大小不超过 ${ size }MB，建议图片尺寸为 ${width}*${height}`" type="info" show-icon :closable="false" />-->
        <!--            </div>-->
        <!--        </div>-->
        <el-image-viewer v-if="data.imageViewerVisible" :url-list="[url]" @close="previewClose" />
    </div>
</template>

<script setup>
import Http from '@/util/request'
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
    url: {
        type: String,
        default: ''
    },
    size: {
        type: Number,
        default: 2
    },
    width: {
        type: Number,
        default: 150
    },
    height: {
        type: Number,
        default: 150
    },
    placeholder: {
        type: String,
        default: ''
    },
    notip: {
        type: Boolean,
        default: false
    },
    ext: {
        type: Array,
        default: () => ['jpg', 'png', 'gif', 'bmp']
    },
    fileType: {
        type: Array,
        default: () => ['jpg', 'png', 'gif', 'bmp']
    },
    type: {
        type: String,
        default: '图片'
    },
    taskType: {
        type: String
    }
})
const fileUrl = ref('')

const emit = defineEmits(['removeUrl', 'on-success'])

const data = ref({
    imageViewerVisible: false,
    progress: {
        preview: '',
        percent: 0
    },
    file: {
        file: '',
        'file_type': '1'
    }
})
const fileName = ref('')
const loading = ref(false)
// 关闭预览
function previewClose() {
    data.value.imageViewerVisible = false
}
// 移除
function remove() {
    emit('removeUrl', '')
}
const imgs = import.meta.globEager('../../assets/images/knowledgeBase/**.svg')
console.log(imgs)
async function  beforeUpload(file) {
    const fileName = file.name.split('.')
    const fileExt = fileName[fileName.length - 1]
    if (props.type === '文件') {
        data.value.file.file_type = 3
        if (/\.(xlsx|xls|excel)$/.test(file.name)) {
            fileUrl.value = imgs['../../assets/images/knowledgeBase/excel-img.svg'].default
        }
        if (/\.(docx|doc)$/.test(file.name)) {
            fileUrl.value = imgs['../../assets/images/knowledgeBase/word-img.svg'].default
        }
        if (/\.(pptx|ppt)$/.test(file.name)) {
            fileUrl.value = imgs['../../assets/images/knowledgeBase/ppt-img.svg'].default
        }
        if (/\.(pdf)$/.test(file.name)) {
            fileUrl.value = imgs['../../assets/images/knowledgeBase/pdf-img.svg'].default
        }
    } else if (props.type === '图片') {
        data.value.file.file_type = 1
    } else {
        data.value.file.file_type = 2
    }
    const isTypeOk = props.ext.indexOf(fileExt) >= 0
    const isSizeOk = file.size / 1024 / 1024 < props.size
    if (!isTypeOk) {
        proxy.$message.error(`上传图片只支持 ${ props.ext.join(' / ') } 格式！`)
    }
    if (!isSizeOk) {
        proxy.$message.error(`上传图片大小不能超过 ${props.size}MB！`)
    }
    
    if (props.type === '视频') {
        let isTimeOk = await getVideoTime(file)
        // console.log('isTimeOk', isTimeOk, 'isTypeOk', isTypeOk, 'isSizeOk', isSizeOk)
        if (!isTimeOk) {
            proxy.$message.error('上传视频时长大小不能超过30秒')
            return
        }
    }

    if (isTypeOk && isSizeOk) {
        data.value.progress.preview = URL.createObjectURL(file)
        data.value.file.file = file
    }
    return isTypeOk && isSizeOk
}
function onProgress(file) {
    data.value.progress.percent = ~~file.percent
    if (data.value.progress.percent == 100) {
        setTimeout(() => {
            data.value.progress.preview = ''
            data.value.progress.percent = 0
        }, 1000)
    }
}
async function onSuccess(res) {
    console.log('res', data.value.file.filename)
    await emit('on-success', res)
}
async function uploadImg() {
    loading.value = true
    console.log('data.value.file', data.value.file)
    if (props.taskType == '4' && data.value.file.file_type != 3) {
        data.value.file.type = 'attachment'
        console.log('data.value.file22222222', data.value.file)
        let res = await Http.fileUpload(data.value.file, [], true)
        if (res.code === 200) {
            await emit('on-success', res.data)
            fileName.value = res.data.file_name
            loading.value = false
        }
    } else {
        // console.error('props.type', props.type)
        // if (props.type == '视频')
        let res = await Http.fileUpload(data.value.file, [], true)
        if (res.code === 200) {
            await emit('on-success', res.data)
            fileName.value = res.data.file_name
            loading.value = false
        }
    }

}

function getVideoTime(file) {
    return new Promise(resolve => {
        let url = URL.createObjectURL(file)
        console.error('3333', url)
        let audioElement = new Audio(url)
        console.error('4444', audioElement)
        audioElement.addEventListener('loadedmetadata', () => {
            let duration = parseInt(audioElement.duration)
            console.log('秒数', duration)
            if (duration > 30) {
                resolve(false)
            } else {
                resolve (true)
            }
        })
    })
}
// 图片引入
// function getImageUrl(url) {
//     console.log(url)
//     console.log('../../assets/images/' + url + '.svg')
//     console.log(import.meta)
//     let res = new URL('../../assets/images/' + url + '.svg', 'https://we-customer-admin.test.freshgood.cn/')
//     console.log(res)
//     return new URL('../../assets/images/' + url + '.svg', 'https://we-customer-admin.test.freshgood.cn/').href
// }
</script>

<style lang="scss" scoped>
.upload-container {
    line-height: initial;
}
.image {
    position: relative;
    .mask {
        opacity: 0;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        font-size: 24px;
        background-color: rgba(0, 0, 0, 0.5);
        transition: all 0.3s;
        .actions {
            width: 100px;
            height: 100px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            @include position-center(xy);
            span {
                width: 50%;
                text-align: center;
                color: #fff;
                cursor: pointer;
                transition: all 0.1s;
                &.disabled {
                    color: #999;
                    cursor: not-allowed;
                }
                &:hover:not(.disabled) {
                    transform: scale(1.5);
                }
            }
        }
    }
    &:hover .mask {
        opacity: 1;
    }
}
:deep(.el-upload) {
    .el-upload-dragger {
        width: auto;
        height: auto;
        &.is-dragover {
            border-width: 1px;
        }
        .el-image {
            display: block;
            .image-slot {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                color: #909399;
                font-size: 30px;
                background-color: transparent;
            }
        }
        .progress {
            position: absolute;
            top: 0;
            &::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                background-color: rgba(0, 0, 0, 0.2);
            }
            .el-progress {
                z-index: 1;
                @include position-center(xy);
                .el-progress__text {
                    color: #fff;
                }
            }
        }
    }
}
    .upload-tips{
        padding-top: 8px;
        font-size: 12px;
        color: #8c8c8c;
    }
.file-source-content{
    display: flex;
    align-items: center;
}
.file-source-content .file-img-icon {
    width: 272px;
    display: flex;
    align-items: center;
}
.file-source-content .file-img-icon .file-img-icon-img {
    height: 40px;
    padding-left: 16px;
    padding-right: 8px;
}
.file-source-content .file-img-icon .file-img-icon-name {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
}

.file-source-content .file-icon {
    flex-grow: 1;
}
.file-source-content .file-icon img {
    display: inline-block;
    vertical-align: middle;
    margin-right: 19px;
}

</style>
