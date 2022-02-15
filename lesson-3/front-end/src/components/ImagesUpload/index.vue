<template>
    <div class="upload-container ">
        <div class="drag-image">
            <draggable v-model="urlList" :disabled="props.disabled" item-key="index" @end="dragEnd">
                <template #item="{ element: item, index}">
                    <div class="images">
                        <!-- <div v-for="(item, index) in url" :key="index" class="images"> -->
                        <el-image :src="item" :style="`width:${width}px;height:${height}px;`" fit="cover" @click="preview(index)" />
                        <div class="delet-btn " @click="remove(index)">
                            <i class="el-icon-close fs12 cfff" />
                        </div>
                        <!-- <div class="mask">
                        <div class="actions">
                            <span title="预览" @click="preview(index)">
                                <i class="el-icon-zoom-in" />
                            </span>
                            <span title="移除" @click="remove(index)">
                                <i class="el-icon-delete" />
                            </span>
                            <span v-show="url.length > 1" title="左移" :class="{'disabled': index == 0}" @click="move(index, 'left')">
                                <i class="el-icon-back" />
                            </span>
                            <span v-show="url.length > 1" title="右移" :class="{'disabled': index == url.length - 1}" @click="move(index, 'right')">
                                <i class="el-icon-right" />
                            </span>
                        </div>
                    </div> -->
                    </div>
                </template>
            </draggable>
        </div>
        <el-upload
            v-show="url.length < max"
            :show-file-list="false"
            :headers="headers"
            :action="action"
            :data="data"
            :name="name"
            :limit="props.max"
            multiple
            :file-list="defaultImageList.list"
            :before-upload="beforeUpload"
            :on-progress="onProgress"
            :on-success="onSuccess"
            :http-request="uploadImg"
            :on-exceed="fileTooMany"
            drag
            class="images-upload"
        >
            <div class="image-slot" :style="`width:${width}px;height:${height}px;`">
                <i class="el-icon-plus" />
            </div>
            <div v-show="data.progress.percent" class="progress" :style="`width:${width}px;height:${height}px;`">
                <el-image :src="data.progress.preview" :style="`width:${width}px;height:${height}px;`" fit="fill" />
                <el-progress type="circle" :width="Math.min(width, height) * 0.8" :percentage="data.progress.percent" />
            </div>
        </el-upload>
        <!-- <div v-if="!notip" class="el-upload__tip">
            <div style="display: inline-block;">
                <el-alert :title="`上传图片支持 ${ ext.join(' / ') } 格式，单张图片大小不超过 ${ size }MB，建议图片尺寸为 ${width}*${height}，且图片数量不超过 ${ max } 张`" type="info" show-icon :closable="false" />
            </div>
        </div> -->
        <el-image-viewer v-if="data.imageViewerVisible" :url-list="url" :initial-index="data.dialogImageIndex" @close="previewClose" />
    </div>
</template>

<script setup>
import Http from '../../util/request'
import { ref, onMounted } from  'vue'
import draggable from 'vuedraggable'
// import Sortable from 'sortablejs'
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
        type: Array,
        default: () => []
    },
    urlUnSync: {
        type: Array,
        default: () => []
    },
    // urlList: {
    //     type: Array,
    //     default: () => []
    // },
    max: {
        type: Number,
        default: 3
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
        // default: () => ['jpg', 'png', 'gif', 'bmp']
        default: () => ['jpg', 'png', 'jpeg']
    },
    disable: {
        type: Boolean,
        default: false
    }
})
const loading = ref(false)
const urlList = ref([]) // 因为不可以使用url板顶拖拽组件

const emit = defineEmits(['update:url', 'on-success', 'urlChange'])

// const data = ref({
//     dialogImageIndex: 0,
//     imageViewerVisible: false,
//     progress: {
//         preview: '',
//         percent: 0
//     }
// })
const data = ref({
    imageViewerVisible: false,
    dialogImageIndex: 0,
    progress: {
        preview: '',
        percent: 0
    },
    file: {
        file: '',
        'file_type': '1'
    }
})
const defaultImageList = ref({
    imLength: 0,
    list: [],
    hasChange: false
})

// ===========监听
watch(() => props.url, newVal => {
    // console.log('触发了', newVal)
    if (JSON.stringify(newVal) !== JSON.stringify(urlList.value)) {
        urlList.value = JSON.parse(JSON.stringify(newVal))
        defaultImageList.value.list = urlList.value
        // if (!defaultImageList.value.hasChange && urlList.value[0]) {
        //     console.log('图片数组', urlList.value.length)
        //     defaultImageList.value.imLength = urlList.value.length
        //     defaultImageList.value.hasChange = true
        // }
    }
}, {
    deep: true,
    immediate: true
})

onMounted(() => {
    // drag(false)
})

// 拖拽商品
// function drag(disabled) {
//     // console.log('禁止拖动', disabled)
//     const el = document.querySelectorAll('.drag-image')[0]
//     drageble.value = Sortable.create(el, {
//         disabled: disabled,
//         handle: '.images',
//         setData: function(dataTransfer) {
//             dataTransfer.setData('Text', '')
//         },
//         onEnd: ({ newIndex, oldIndex }) => {
//             // 更换数组元素位置
//             let nowArr = JSON.parse(JSON.stringify(props.url))
//             nowArr = swapArray(nowArr, newIndex, oldIndex)
//             console.log('更改顺序', newIndex, oldIndex, nowArr)

//             emit('update:url', nowArr)
//             drageble.value = null
//             // sortParams.value.goods_list = arr
//             // updateGoodsSort()
//             // console.log(updateGoodsSort(arr))
//         }
//     })
// }

// 拖拽完成
function dragEnd() {
    emit('update:url', urlList.value)
    emit('urlChange', urlList.value)
}

// 预览
function preview(index) {
    data.value.dialogImageIndex = index
    data.value.imageViewerVisible = true
}
// 关闭预览
function previewClose() {
    data.value.imageViewerVisible = false
}
// 移除
function remove(index) {
    let url = props.url
    defaultImageList.value.list.splice(index, 1)

    url.splice(index, 1)
    emit('update:url', url)
    emit('urlChange', url)
}
// 移动
// function move(index, type) {
//     let url = props.url
//     if (type == 'left' && index != 0) {
//         url[index] = url.splice(index - 1, 1, url[index])[0]
//     }
//     if (type == 'right' && index != url.length - 1) {
//         url[index] = url.splice(index + 1, 1, url[index])[0]
//     }
//     emit('update:url', url)
// }
// function beforeUpload(file) {
//     const fileName = file.name.split('.')
//     const fileExt = fileName[fileName.length - 1]
//     const isTypeOk = props.ext.indexOf(fileExt) >= 0
//     const isSizeOk = file.size / 1024 / 1024 < props.size
//     if (!isTypeOk) {
//         proxy.$message.error(`上传图片只支持 ${ props.ext.join(' / ') } 格式！`)
//     }
//     if (!isSizeOk) {
//         proxy.$message.error(`上传图片大小不能超过 ${props.size}MB！`)
//     }
//     if (isTypeOk && isSizeOk) {
//         data.value.progress.preview = URL.createObjectURL(file)
//     }
//     return isTypeOk && isSizeOk
// }
function beforeUpload(file) {
    // console.log('上传数量', file, props.url.length, props.max)
    const fileName = file.name.split('.')
    const fileExt = fileName[fileName.length - 1]
    const isTypeOk = props.ext.indexOf(fileExt) >= 0
    const isSizeOk = file.size / 1024 / 1024 < props.size
    if (!isTypeOk) {
        proxy.$message.error(`上传图片只支持 ${ props.ext.join(' / ') } 格式！`)
    }
    if (!isSizeOk) {
        proxy.$message.error(`上传图片大小不能超过 ${props.size}MB！`)
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
        data.value.progress.preview = ''
        data.value.progress.percent = 0
    }
}

async function uploadImg() {
    loading.value = true
    let res = await Http.fileUpload(data.value.file, [], true)
    if (res.code === 200) {
        await emit('on-success', res.data)
        let url = props.url
        url.push(res.data.file_url)
        emit('update:url', url)
        emit('urlChange', url)
        // fileName.value = res.data.file_name
        loading.value = false
    }

}
function onSuccess(res) {
    // console.log()
    emit('on-success', res)
}
function fileTooMany(files, fileList) {
    console.log('文件数量超出限制', files, fileList, props.max)
    proxy.$message.error('文件数量超出限制')
}
</script>

<style lang="scss" scoped>
.upload-container {
    display: block;
    // line-height: initial;
}

.drag-image {
    // width: 100%;
    position: relative;
    display: inline-block;
    vertical-align: top;
}
.images {
    position: relative;
    display: inline-block;
    margin-right: 10px;
    // border: 1px dashed #d9d9d9;
    // border-radius: 6px;
    overflow: hidden;
    border: 1px solid #d9d9d9;
    .el-image {
        display: block;
    }
    .delet-btn {
        display: none;
    }

    &:hover .delet-btn{
        display: block;
        box-sizing: border-box;
        padding-top: 2px;
        position: absolute;
        top: 2px;
        right: 2px;
        width: 20px;
        height: 20px;
        text-align: center;
        border-radius: 10px;
        background-color: #7C7B75;
        cursor: pointer;
        i {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .mask {
        opacity: 0;
        position: absolute;
        top: 50%;
        bottom: 50%;
        transform: translate(0,-50%);
        width: 100%;
        // height: 100%;
        font-size: 16px;
        background-color: rgba(0, 0, 0, 0.5);
        transition: all 0.3s;
        .actions {
            width: 80px;
            height: 30px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            @include position-center(xy);
            span {
                // width: 50%;
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
.images-upload {
    // display: block;
    display: inline-block;
    vertical-align: top;
}
:deep(.el-upload) {
    .el-upload-dragger {
        width: auto;
        height: auto;
        border-radius: 2px;
        border: 0;
        &.is-dragover {
            border-width: 1px;
        }
        .image-slot {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            color: #909399;
            font-size: 30px;
            // background-color: transparent;
            background-color: #f8f8f8;
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
</style>
