<template>
    <div v-show="props.list.length>0" class="drag-list">
        <div v-for="(item,index) in props.list" :key="index">
            <!--        <draggable v-model="dragList" @end="dragEnd">-->
            <!--            <template #item="{ element: item}">-->
            <CustomerMediaItem
                v-if="!checkList"
                :show-edit="item.type!=='TEXT'"
                :page-type="props.pageType"
                :type="item.type"
                :media-content-width="props.mediaContentWidth"
                @deleteItem="deleteItems(index)"
                @editItem="editItem(index)"
            >
                <div v-if="item.type=='TEXT'">
                    <div class="relative">
                        <el-input v-model="item.content" type="textarea" class="media-textarea" :show-word-limit="true" :maxlength="props.textLimit" resize="none" @input="item.content = item.content.substring(0,props.textLimit)" />
                        <div class="oparation-bottom-box">
                            <img
                                src="@/assets/images/welcomeTextAndFile/emojiWhite.svg"
                                alt="表情包"
                                class="emoji-btn"
                                @click="expandEmoji"
                            >
                            <div class="flex flex-align-center">
                                <span class="length-limit">{{ item.content.length }}/{{ props.textLimit }}</span>
                                <div v-if="props.eventSelectShow" class="select-event">
                                    <el-button size="mini" @click="openSelectEvent">+ 插入变量</el-button>
                                    <select-event
                                        ref="selectRef"
                                        v-model="events_id.value"
                                        class="mr12"
                                        :is-input-show="false"
                                        :variable-show="true"
                                        :events-id="props.eventsId"
                                        @changeObj="(v,o)=>insetEverntChange(v, o, item)"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <CustomerEmogi v-if="emojiVisible" @insertEmoji="(val)=> insertEmoji(val, item)" />
                </div>

                <div v-if="item.type!='TEXT'" class="file-media">
                    <video v-if="item.type==='VIDEO'" :src="item.file_url" alt="" @click.stop="previewMedia(item)" />
                    <img v-if="item.type==='FILE'" :src="fileType(item.file_url)" alt="" @click.stop="previewMedia(item)">
                    <img v-if="item.type==='IMAGE'" :src="item.file_url" alt="" @click.stop="previewMedia(item)">
                    <img v-if="item.type==='LINK'" :src="fileType(item.file_url,item.type)" alt="" @click.stop="previewMedia(item)">
                    <el-popover
                        v-if="item.type==='MINIPROGRAM'"
                        placement="right"
                        trigger="hover"
                        popper-class="crud-classify-tree-operate-popover webApp"
                        class="webApp-popo-warp"
                        width=""
                    >
                        <!-- webpage-item-body -->
                        <div class="webpage-item-body">
                            <div class="webpage-item-body-title">
                                <span class="webpage-item-body-title-con">
                                    {{ item.qw_miniprogram_title }}
                                </span>

                                <span class="webpage-item-body-title-right">
                                    <img
                                        src="@/assets/images/knowledgeBase/cancel-x.svg"
                                    >
                                </span>
                            </div>
                            <div class="webpage-item-body-con">
                                <el-image
                                    :src="item.file_url"
                                    style="width: 100%; height: 100%"
                                />
                            </div>
                            <div class="webpage-item-body-bottom">
                                <img
                                    class="webpage-item-body-bottom-icon"
                                    src="@/assets/images/knowledgeBase/what-app-min.svg"
                                >
                                <span class="webpage-item-body-bottom-z">小程序</span>
                            </div>
                        </div>
                        <template #reference>
                            <img :src="item.file_url" alt="" @click="previewMedia(item)">
                        </template>
                    </el-popover>

                    <div class="file-text">
                        <p class="file-media-title">{{ item.file_name||item.title||item.name||item.qw_link_title||item.qw_miniprogram_title }}</p>
                        <p v-if="item.type==='LINK'" class="file-media-tip">{{ item.url_content||(item.url?item.url+item.qw_link_url:item.qw_link_url) }}</p>
                    </div>
                </div>
            </CustomerMediaItem>
            <CheckCustomerMediaItem v-if="checkList">
                <div v-if="item.type=='TEXT'">
                    <div class="file-media">
                        {{ item.content }}
                    </div>
                </div>

                <div v-if="item.type!='TEXT'" class="file-media relative">
                    <video v-if="item.type==='VIDEO'" :src="item.file_url" alt="图片" @click.stop.prevent="previewMedia(item)" />
                    <img v-if="item.type==='FILE'" :src="fileType(item.file_url)" alt="图片" @click.stop.prevent="previewMedia(item)">
                    <img v-if="item.type==='IMAGE'" :src="item.file_url" alt="图片" @click.stop.prevent="previewMedia(item)">
                    <img v-if="item.type==='LINK'" :src="fileType(item.file_url,item.type)" alt="图片" @click.stop.prevent="previewMedia(item)">
                    <el-popover
                        v-if="item.type==='MINIPROGRAM'"
                        placement="right"
                        trigger="hover"
                        popper-class="crud-classify-tree-operate-popover webApp"
                        class="webApp-popo-warp"
                        width=""
                    >
                        <div class="webpage-item-body">
                            <div class="webpage-item-body-title">
                                <span class="webpage-item-body-title-con">
                                    {{ item.qw_miniprogram_title }}
                                </span>

                                <span class="webpage-item-body-title-right">
                                    <img
                                        src="@/assets/images/knowledgeBase/cancel-x.svg"
                                    >
                                </span>
                            </div>
                            <div class="webpage-item-body-con">
                                <el-image
                                    :src="item.file_url"
                                    style="width: 100%; height: 100%"
                                />
                            </div>
                            <div class="webpage-item-body-bottom">
                                <img
                                    class="webpage-item-body-bottom-icon"
                                    src="@/assets/images/knowledgeBase/what-app-min.svg"
                                >
                                <span class="webpage-item-body-bottom-z">小程序</span>
                            </div>
                        </div>
                        <template #reference>
                            <img :src="item.file_url" alt="" @click.stop="previewMedia(item)">
                        </template>
                    </el-popover>

                    <div class="file-text">
                        <p class="file-media-title">{{ item.file_name||item.title||item.name||item.qw_link_title||item.qw_miniprogram_title }}</p>
                        <p v-if="item.type==='LINK'" class="file-media-tip">{{ item.url_content||(item.url+item.qw_link_url) }}</p>
                    </div>
                </div>
            </CheckCustomerMediaItem>
        </div>
        <!-- 图片预览 -->
        <el-dialog
            :model-value="picPlayerVisible"
            title="图片预览"
            custom-class="sop-add-other-content-dialog"
            width="648px"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            @close="closeDialog"
        >
            <div class="el-dialog__body">
                <el-image style="height: 100%" :src="imagesUrl" />
            </div>
        </el-dialog>
        <!-- 小程序预览 -->
        <!-- <el-dialog
            :model-value="whatAppPlayerVisible"
            title="小程序预览"
            custom-class="sop-add-other-content-dialog"
            width="780px"
            @close="closeDialog"
        >
            <div style="width: 740px; height: 400px; margin: 0 auto">
                //小程序预览 whatAppPlyerShow(url) { this.whatApplayerVisible = true
                this.whatAppUrl = url },
            </div>
        </el-dialog> -->
        <el-dialog
            :model-value="videoplayerVisible"
            title="视频预览"
            custom-class="sop-add-other-content-dialog"
            width="648px"
            @close="closeDialog"
        >
            <div id="videoPlyer" class="el-dialog__body">
                <video
                    v-if="imagesUrl"
                    :src="imagesUrl"
                    controls="controls"
                    style="width: 100%; height: 100%"
                >
                    您的浏览器不支持视频播放
                </video>
            </div>
        </el-dialog>
    </div>
</template>
<script setup>
import CustomerMediaItem from '@/components/CustomerMediaList/CustomerMediaItem.vue'
import CustomerEmogi from '@/components/CustomerEmoji/index.vue'
import selectEvent from '@/components/selectEvent/selectEvent.vue'
import Sortable from 'sortablejs'
import { onMounted } from 'vue'
const emojiVisible = ref(false)
const picPlayerVisible = ref(false)
const whatAppPlayerVisible = ref(false)
const videoplayerVisible = ref(false)
const imagesUrl = ref('')
const selectRef = ref(null)

const props = defineProps({
    list: {
        type: Array
    },
    eventSelectShow: {
        type: Boolean,
        default: false
    },
    eventsId: {
        type: [ String, Number]
    },
    mediaContentWidth: {
        type: Number
    },
    checkList: {
        type: Boolean,
        default: false
    },
    pageType: {
        type: String,
        default: ''
    },
    textLimit: {
        type: Number
    }
})
const events_id = ref([])
onMounted(() => {
    drag()
})

// const fileType = file => {
//     if (/\.(xlsx|xls|excel)$/.test(file)) {
//         return '/src/assets/images/knowledgeBase/excel-img.svg'
//     }
//     if (/\.(docx|doc)$/.test(file)) {
//         return '/src/assets/images/knowledgeBase/word-img.svg'
//     }
//     if (/\.(pptx|ppt)$/.test(file)) {
//         return '/src/assets/images/knowledgeBase/ppt-img.svg'
//     }
//     if (/\.(pdf)$/.test(file)) {
//         return '/src/assets/images/knowledgeBase/pdf-img.svg'
//     }
// }
const imgs = import.meta.globEager('../../assets/images/knowledgeBase/**.svg')
const fileType = (file, type) => {
    console.log(file)
    if (/\.(xlsx|xls|excel)$/.test(file)) {
        return imgs['../../assets/images/knowledgeBase/excel-img.svg'].default
    }
    if (/\.(docx|doc)$/.test(file)) {
        return imgs['../../assets/images/knowledgeBase/word-img.svg'].default
    }
    if (/\.(pptx|ppt)$/.test(file)) {
        return imgs['../../assets/images/knowledgeBase/ppt-img.svg'].default
    }
    if (/\.(pdf)$/.test(file)) {
        return imgs['../../assets/images/knowledgeBase/pdf-img.svg'].default
    }
    if (/\.(pdf)$/.test(file)) {
        return imgs['../../assets/images/knowledgeBase/pdf-img.svg'].default
    }
    if (type === 'LINK' && !file) {
        return imgs['../../assets/images/knowledgeBase/default_2x.svg'].default
    } else {
        return file
    }
}

// 图片引入
// function getImageUrl(url) {
//     return new URL(`../../assets/images/${url}.svg`, import.meta.url).href
// }
const closeDialog = () => {
    picPlayerVisible.value = false
    whatAppPlayerVisible.value = false
    videoplayerVisible.value = false
    imagesUrl.value = ''
}
const previewMedia = item => {
    console.log(item)
    if (item.type === 'LINK') {
        window.open(item.url + item.qw_link_url || item.url_content)
    }
    if (item.type === 'FILE') {
        window.open(item.file_url)
    }
    if (item.type == 'MINIPROGRAM' || item.type == 'we_applets') {
        whatAppPlayerVisible.value = true
    }
    if (item.type === 'IMAGE') {
        imagesUrl.value = item.file_url
        picPlayerVisible.value = true
    }
    if (item.type === 'VIDEO') {
        imagesUrl.value = item.file_url
        videoplayerVisible.value = true
    }
}
const emits = defineEmits(['changeSort', 'deleteMedia', 'editMedia'])
const openSelectEvent = () => {
    selectRef.value.openPopover()
}
// const handleChangeObj = (v, o) => {
//     console.log(v, o)
// }
const expandEmoji = () => {
    emojiVisible.value = !emojiVisible.value
}
const drag = () => {
    const el = document.querySelectorAll('.drag-list')[0]
    Sortable.create(el, {
        disabled: false,
        ghostClass: 'sortable-ghost',
        filter: '.ignore-disable',
        setData: function(dataTransfer) {
            dataTransfer.setData('Text', '')
        },
        onEnd: ({ newIndex, oldIndex }) => {
            console.log('newIndex', newIndex)
            console.log(oldIndex)
            emits('changeSort', { newIndex, oldIndex })
        }
    })
}
// 插入变量
const insetEverntChange = (v, o, item) => {
    let insertContent = ''
    if (o.target_type === 'SUBJECT') {
        insertContent = `&%${o.target_type}|${o.element_key}|${o.subject_id}%&`
    } else {
        insertContent = `&%${o.target_type}|${o.element_key}%&`
    }

    // 限制800字数
    if (item.content.length + insertContent.length > 800) {
        return
    }
    item.content = item.content + insertContent
}
const insertEmoji = (emoji, item) => {
    // 一个表情包占两个字符
    if (item.content.length > 798) {
        return
    }
    item.content = item.content + emoji
}
const deleteItems = index => {
    console.log(index)
    emits('deleteMedia', index)
}
const editItem = index => {
    emits('editMedia', index)
}
</script>

<style scoped lang="scss">
    .oparation-bottom-box {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 40px;
        width: 100%;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
    }
    .media-textarea {
        margin-bottom: 40px;
    }

    .emoji-btn{
        // position: absolute;
        // bottom:12px;
        // left: 12px;
        cursor: pointer;
        width: 18px;
        height:18px;
    }
    .length-limit {
        color: #909399;
        font-size: 14px;
        // line-height: 40px;
    }
    .select-event{
        // position: absolute;
        // bottom:5px;
        // right: 56px;
        // right: 5px;
        margin-left: 5px;
        cursor: pointer;
    }
    .file-media{
        display: flex;
        align-items: center;
        padding: 8px;
        img,video{
            width: 44px;
            height: 44px;
            border-radius: 4px;
            margin-right: 8px;
        }
        .file-media-btn{
            position: absolute;
            opacity: 0;
        }
        .file-text{
            width: 300px;

        }
        .file-media-title{
            font-size: 14px;
            line-height: 14px;

        }
        .file-media-tip{
            font-size: 12px;
            color: #999;
            line-height: 12px;
            margin-top: 8px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;

        }
    }
    .webpage-item-body {
        width: 275px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        padding: 15px 15px 0 15px;
        border-radius: 2px;
        background: #f6f6f6;
    }
    .webpage-item-body-title {
        width: 245px;
        height: 25px;
        line-height: 25px;
        margin-bottom: 8px;
    }
    .webpage-item-body-title-con {
        font-size: 18px;
        font-weight: 400;
        text-align: left;
        color: #171717;
        line-height: 25px;
    }

    .webpage-item-body-con {
        width: 245px;
        height: 200px;
    }
    .webpage-item-body-title-right {
        display: inline-block;
        float: right;
        margin-right: 0;
        cursor: pointer;
        margin-top: 5px;
    }
    .webpage-item-body-bottom {
        width: 275px;
        height: 32px;
        margin-top: 15px;
        line-height: 32px;
        background: #f2f2f2;
        border-top: 1px solid #e7e7e7;
        border-radius: 2px;
    }
    .webpage-item-body-bottom .webpage-item-body-bottom-icon {
        margin-top: 8px;
        margin-left: 15px;
        width: 16px;
        height:16px;
        margin-bottom: 8px;
    }
    .webpage-item-body-bottom .webpage-item-body-bottom-z {
        display: inline-block;
        font-size: 12px;
        color: #b2b2b2;
        margin-left: 8px;
    }
</style>

<style lang="scss">
// scoped 无法覆盖element UI
    .media-textarea .el-input__count {
        display: none;
    }
</style>
