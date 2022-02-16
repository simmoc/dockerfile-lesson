<template>
    <div>
        <el-popover
            v-model:visible="mediaPopoverVisible"
            placement="top"
            width="606"
            trigger="manual"
            popper-class="customer-media-popover"
        >
            <div class="media-content">
                <div class="media-title">
                    <span>选择添加素材类型</span>
                    <i
                        class="el-icon-close"
                        @click="cancelPopover"
                    />
                </div>
                <div class="bdt">
                    <div class="media-item-list">
                        <!-- 事件任务只可编辑一个文本 -->
                        <!-- <div v-if="['taskEdit'].includes(props.pageType)" class="media-item task-disable-btn">
                            <img
                                src="@/assets/images/knowledgeBase/text-src.svg"
                                alt="文本"
                            >
                            <div class="media-item-text">文本</div>

                            <div class="media-item-sum">
                                {{ calculateNum.textLength }}/{{ textSum }}
                            </div>
                        </div>
                        <div v-else class="media-item" @click="confirmText('TEXT')">
                            <img
                                src="@/assets/images/knowledgeBase/text-src.svg"
                                alt="文本"
                            >
                            <div class="media-item-text">文本</div>

                            <div class="media-item-sum">
                                {{ calculateNum.textLength }}/{{ textSum }}
                            </div>
                        </div> -->
                        <div v-if="!props.hiddenBtns.includes('TEXT')" class="media-item" @click="confirmText('TEXT')">
                            <img
                                src="@/assets/images/knowledgeBase/text-src.svg"
                                alt="文本"
                            >
                            <div class="media-item-text">文本</div>

                            <div class="media-item-sum">
                                {{ calculateNum.textLength }}/{{ textSum }}
                            </div>
                        </div>
                        <div v-if="!props.hiddenBtns.includes('IMAGE')" class="media-item" :class="{ disabled: otherSum === 0 }"
                             @click="confirmText('IMAGE')"
                        >
                            <img
                                src="@/assets/images/welcomeTextAndFile/otherContent1@2x.png"
                                alt="图片"
                            >
                            <div class="media-item-text">图片</div>

                            <div class="media-item-sum">
                                {{ calculateNum.imageLength }}/{{ otherSum }}
                            </div>
                        </div>
                        <div v-if="!props.hiddenBtns.includes('VIDEO')" class="media-item" :class="{ disabled: otherSum === 0 }"
                             @click="confirmText('VIDEO')"
                        >
                            <img
                                src="@/assets/images/welcomeTextAndFile/otherContent2@2x.png"
                                alt="视频"
                            >
                            <div class="media-item-text">视频</div>

                            <div class="media-item-sum">
                                {{ calculateNum.videoLength }}/{{ otherSum }}
                            </div>
                        </div>
                        <!-- <div v-if="['taskEdit'].includes(props.pageType)" class="media-item task-disable-btn">
                            <img
                                src="@/assets/images/welcomeTextAndFile/otherContent4@2x.png"
                                alt="文件"
                            >
                            <div class="media-item-text">文件</div>

                            <div class="media-item-sum">
                                {{ calculateNum.fileLength }}/{{ otherSum }}
                            </div>
                        </div>
                        <div v-else class="media-item" :class="{ disabled: otherSum === 0 }"
                             @click="confirmText('FILE')"
                        >
                            <img
                                src="@/assets/images/welcomeTextAndFile/otherContent4@2x.png"
                                alt="文件"
                            >
                            <div class="media-item-text">文件</div>

                            <div class="media-item-sum">
                                {{ calculateNum.fileLength }}/{{ otherSum }}
                            </div>
                        </div> -->
                        <div v-if="!props.hiddenBtns.includes('FILE')" class="media-item" :class="{ disabled: otherSum === 0 }"
                             @click="confirmText('FILE')"
                        >
                            <img
                                src="@/assets/images/welcomeTextAndFile/otherContent4@2x.png"
                                alt="文件"
                            >
                            <div class="media-item-text">文件</div>

                            <div class="media-item-sum">
                                {{ calculateNum.fileLength }}/{{ otherSum }}
                            </div>
                        </div>
                        <div v-if="!props.hiddenBtns.includes('LINK')" class="media-item" :class="{ disabled: otherSum === 0 }"
                             @click="confirmText('LINK')"
                        >
                            <img
                                src="@/assets/images/welcomeTextAndFile/otherContent3@2x.png"
                                alt="网页"
                            >
                            <div class="media-item-text">网页</div>

                            <div class="media-item-sum">
                                {{ calculateNum.webLinkLength }}/{{ otherSum }}
                            </div>
                        </div>
                        <div v-if="!props.hiddenBtns.includes('MINIPROGRAM')" class="media-item" :class="{ disabled: otherSum === 0 }"
                             @click="confirmText('MINIPROGRAM')"
                        >
                            <img
                                src="@/assets/images/welcomeTextAndFile/otherContent4@2x.png"
                                alt="小程序"
                            >
                            <div class="media-item-text">小程序</div>

                            <div class="media-item-sum">
                                {{ calculateNum.whatAppLength }}/{{ otherSum }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <template #reference>
                <el-button
                    type="primary"
                    size="small"
                    style="width: 100%;"
                    :disabled="props.list.length===10"
                    @click="addOtherContent"
                >
                    <i class="el-icon-plus" />
                    添加素材
                </el-button>
            </template>
        </el-popover>
        <!--        <el-dialog-->
        <!--            :model-value="dialogVisible"-->
        <!--            :title="`添加${title}`"-->
        <!--            custom-class="sop-add-other-content-dialog"-->
        <!--            width="648px"-->
        <!--        >-->
        <!--            <ImageUpload :width="350" :height="140" :type="title" :ext="ext" :size="size" :url="file.file_url" @on-success="uploadImg" @removeUrl="removeUrl" />-->
        <!--            <template #footer>-->
        <!--                <span class="dialog-footer">-->
        <!--                    <el-button size="small"-->
        <!--                               @click="cancelDialog"-->
        <!--                    >取消</el-button>-->
        <!--                    <el-button type="primary"-->
        <!--                               size="small"-->
        <!--                               @click="mediaConfirm"-->
        <!--                    >确定</el-button>-->
        <!--                </span>-->
        <!--            </template>-->
        <!--        </el-dialog>-->
        <CustomerDialog :title="`添加${title}`" :dialog-visible="dialogVisible" width="400px" :confirm-fn="mediaConfirm" @cancel="cancelDialog">
            <ImageUpload :width="350" :height="140" :type="title" :ext="ext" :size="size" :url="file.file_url" :file-type="fileType" @on-success="uploadImg" @removeUrl="removeUrl" />
        </CustomerDialog>
        <CustomerDialog title="添加网页消息" :dialog-visible="linkVisible" width="480px" :confirm-fn="linkConfirm" @cancel="cancelDialog">
            <el-form
                ref="webPageRef"
                :model="webPageForm"
                :rules="webPageRules"
                label-width="100px"
                label-position="top"
                size="mini"
                inline-message="true"
            >
                <el-form-item label="网页标题：" prop="qw_link_title">
                    <el-input
                        v-model="webPageForm.qw_link_title"
                        type="textarea"
                        placeholder="请输入标题"
                        :autosize="{ minRows: 1.34 }"
                        maxlength="30"
                        show-word-limit
                        class="el-input-show-show-word-limit"
                    />
                </el-form-item>

                <el-form-item label="网页链接：" prop="qw_link_url">
                    <el-input
                        v-model="webPageForm.qw_link_url"
                        placeholder="请输入链接"
                        class="input-with-select"
                    >
                        <template #prepend>
                            <el-select
                                v-model="webPageForm.url"
                                style="color: #555555;width: 100px;"
                                placeholder="http://"
                            >
                                <el-option label="https://" value="https://" />
                                <el-option label="http://" value="http://" />
                            </el-select>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="网页封面：">
                    <ImageUpload :width="436" :height="140" :type="title" :ext="ext" :size="size" :url="webPageForm.file_url" @on-success="uploadImg" @removeUrl="removeUrl" />
                </el-form-item>
                <el-form-item label="网页描述：">
                    <el-input
                        v-model="webPageForm.qw_link_desc"
                        class="el-input-show-show-word-limit el-input-show-show-web-limit"
                        type="textarea"
                        placeholder="请输入描述"
                        maxlength="500"
                        show-word-limit
                        :autosize="{ minRows: 2.45 }"
                    />
                </el-form-item>
            </el-form>
        </CustomerDialog>
        <CustomerDialog title="添加小程序" :dialog-visible="miniprogramVisible" width="480px" :confirm-fn="miniConfirm" @cancel="cancelDialog">
            <el-form
                ref="miniRef"
                :model="miniForm"
                :rules="miniRule"
                label-width="100px"
                label-position="top"
                size="mini"
                inline-message
            >
                <el-form-item label="小程序标题：" prop="qw_miniprogram_title">
                    <el-input
                        v-model="miniForm.qw_miniprogram_title"
                        placeholder="请输入标题"
                        maxlength="16"
                        show-word-limit
                    />
                </el-form-item>
                <el-form-item label="小程序封面：" prop="file_id">
                    <ImageUpload :width="436" :height="140" :type="title" :ext="ext" :size="size" :url="miniForm.file_url" @on-success="uploadImg" @removeUrl="removeUrl" />
                </el-form-item>
                <el-form-item label="小程序Appid：" prop="qw_miniprogram_appid">
                    <el-input
                        v-model="miniForm.qw_miniprogram_appid"
                        class="el-input-show-show-word-limit"
                        type="textarea"
                        placeholder="请输入小程序Appid"
                        :autosize="{ minRows: 1.34 }"
                        maxlength="32"
                        show-word-limit
                    />
                </el-form-item>
                <el-form-item label="小程序Page路径：" prop="qw_miniprogram_page">
                    <el-input
                        v-model="miniForm.qw_miniprogram_page"
                        type="textarea"
                        placeholder="请输入小程序Page路径"
                        :autosize="{ minRows: 2 }"
                        maxlength="200"
                        show-word-limit
                        class="el-input-show-show-word-limit"
                    />
                </el-form-item>
            </el-form>
        </CustomerDialog>
    </div>
</template>

<script setup>
import CustomerDialog from '@/components/CustomerDialog/index.vue'
import ImageUpload from '@/components/ImageUpload/index.vue'
import { watch, defineProps, defineExpose, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import vxRule from '@/util/formValidate'

const props = defineProps({
    list: {
        type: Array
    },
    // numberFommat: {
    //     type: Function,
    //     default: () => {}
    // }
    pageType: {
        type: String,
        default: ''
    },
    hiddenBtns: {
        type: Array,
        default: () => []
    }
})
const textSum = ref(10)
const otherSum = ref(9)
const calculateNum = reactive({
    imageLength: 0,
    fileLength: 0,
    textLength: 0,
    webLinkLength: 0,
    whatAppLength: 0,
    videoLength: 0
})

watch(() => props.list, async val => {
    // console.log('监听', val)
    calculateNum.imageLength = 0
    calculateNum.fileLength = 0
    calculateNum.textLength = 0
    calculateNum.webLinkLength = 0
    calculateNum.whatAppLength = 0
    calculateNum.videoLength = 0
    val.forEach(item => {
        switch (item.type) {
            case 'TEXT': ++calculateNum.textLength;break
            case 'IMAGE': ++calculateNum.imageLength;break
            case 'FILE': ++calculateNum.fileLength;break
            case 'VIDEO': ++calculateNum.videoLength;break
            case 'LINK': ++calculateNum.webLinkLength;break
            case 'MINIPROGRAM': ++calculateNum.whatAppLength;break
        }
    })
    // console.log(calculateNum.textLength > 0)
    let sum = calculateNum.textLength > 0 ? 10 : 9
    // console.log(sum)
    textSum.value = 10 - calculateNum.imageLength - calculateNum.fileLength - calculateNum.videoLength - calculateNum.webLinkLength - calculateNum.whatAppLength
    otherSum.value = sum - calculateNum.textLength - calculateNum.imageLength - calculateNum.fileLength - calculateNum.videoLength - calculateNum.webLinkLength - calculateNum.whatAppLength
    // console.log(otherSum.value)

}, { deep: true, immediate: true })
const mediaPopoverVisible = ref(false)
const dialogVisible = ref(false)
const emit = defineEmits(['handleConfirm'])
const type = ref('')
const file = ref({
    file_url: ''
})
const ext = ref([])
const size = ref(2)
const title = ref('图片')
const linkVisible = ref(false)
const miniprogramVisible = ref(false)
const webPageForm = reactive({
    url: 'http://',
    qw_link_url: '',
    qw_link_title: '',
    qw_link_desc: '',
    file_id: ''

})
const webPageRef = ref(null)
const isEdit = ref(false)
let miniForm = reactive({
    qw_miniprogram_appid: '',
    qw_miniprogram_page: '',
    qw_miniprogram_title: '',
    file_id: ''
})
const webPageRules = ref({
    qw_link_url: [vxRule(true, '', 'blur', '网页链接不可为空')],
    qw_link_title: [vxRule(true, '', 'blur', '网页标题不可为空')]
})
const miniRef = ref(null)
const miniRule = ref({
    qw_miniprogram_appid: [vxRule(true, '', 'blur', '小程序Appid不可为空')],
    qw_miniprogram_page: [vxRule(true, '', 'blur', '小程序Page路径不可为空')],
    qw_miniprogram_title: [vxRule(true, '', 'blur', '小程序标题不可为空')],
    file_id: [vxRule(true, '', 'blur', '小程序封面不可为空')]
})
const addOtherContent = () => {
    mediaPopoverVisible.value = true
}
const fileType = ref([])
// 附件计数方式(一般)
// const fileNumberCount = val => {
//     // console.log('监听', val)
//     calculateNum.imageLength = 0
//     calculateNum.fileLength = 0
//     calculateNum.textLength = 0
//     calculateNum.webLinkLength = 0
//     calculateNum.whatAppLength = 0
//     calculateNum.videoLength = 0
//     val.forEach(item => {
//         switch (item.type) {
//             case 'TEXT': ++calculateNum.textLength;break
//             case 'IMAGE': ++calculateNum.imageLength;break
//             case 'FILE': ++calculateNum.fileLength;break
//             case 'VIDEO': ++calculateNum.videoLength;break
//             case 'LINK': ++calculateNum.webLinkLength;break
//             case 'MINIPROGRAM': ++calculateNum.whatAppLength;break
//         }
//     })
//     console.log(calculateNum.textLength > 0)
//     let sum = calculateNum.textLength > 0 ? 10 : 9
//     console.log(sum)
//     textSum.value = 10 - calculateNum.imageLength - calculateNum.fileLength - calculateNum.videoLength - calculateNum.webLinkLength - calculateNum.whatAppLength
//     otherSum.value = sum - calculateNum.textLength - calculateNum.imageLength - calculateNum.fileLength - calculateNum.videoLength - calculateNum.webLinkLength - calculateNum.whatAppLength
//     console.log(otherSum.value)
// }
// 图片引入
// function getImageUrl(url) {
//     return new URL(url, import.meta.url).href
// }
// 打开弹窗
const confirmText = (val, obj) => {
    // 如果其他附件已经达到9张，就不能再上传了
    if (val !== 'TEXT' && otherSum.value === 0 && !obj) {
        return
    }
    console.log('obj', obj)
    mediaPopoverVisible.value = false
    type.value = val
    if (obj) {
        isEdit.value = true
    } else {
        isEdit.value = false
        // file.value.file_url = ''
    }
    if (val === 'IMAGE' || val === 'VIDEO' || val === 'FILE') {
        dialogVisible.value = true
    }
    if (val === 'LINK') {
        title.value = '图片'
        ext.value = ['png', 'jpg']
        linkVisible.value = true
        webPageForm.url = 'http://'
        if (obj) nextTick(() => {
            webPageForm.qw_link_url = obj.qw_link_url
            webPageForm.qw_link_title = obj.qw_link_title
            webPageForm.qw_link_desc = obj.qw_link_desc
            webPageForm.file_id = obj.file_id
            webPageForm.url = obj.url
            webPageForm.file_url = obj.file_url
            webPageForm.sort = obj.sort
        })

    }
    if (val === 'MINIPROGRAM') {
        title.value = '图片'
        ext.value = ['png', 'jpg']
        miniprogramVisible.value = true
        if (obj)
            nextTick(() => {
                miniForm.qw_miniprogram_appid = obj.qw_miniprogram_appid
                miniForm.qw_miniprogram_appid = obj.qw_miniprogram_appid
                miniForm.qw_miniprogram_page = obj.qw_miniprogram_page
                miniForm.qw_miniprogram_title = obj.qw_miniprogram_title
                miniForm.file_id = obj.file_id
                miniForm.file_url = obj.file_url
                miniForm.sort = obj.sort
            })
    }

    if (val === 'IMAGE') {
        ext.value = ['png', 'jpg']
        size.value = 2
        title.value = '图片'
        if (obj)file.value = obj
    }
    if (val === 'VIDEO') {
        ext.value = ['mp4']
        size.value = 10
        title.value = '视频'
        if (obj)file.value = obj
    }
    if (val === 'FILE') {
        ext.value = ['pdf', 'ppt', 'pptx', 'doc', 'xls', 'xlsx', 'docx']
        fileType.value = ['word', 'excel', 'ppt', 'pdf']
        size.value = 20
        title.value = '文件'
        if (obj)file.value = obj
    }
    if (val === 'TEXT') {
        emit('handleConfirm', { type: type.value })
    }

}
const cancelPopover = () => {
    mediaPopoverVisible.value = false
}
const cancelDialog = () => {
    dialogVisible.value = false
    linkVisible.value = false
    miniprogramVisible.value = false
    file.value = {
        file_url: ''
    }
    webPageForm.url = 'http://'
    webPageForm.qw_link_url = ''
    webPageForm.qw_link_title = ''
    webPageForm.qw_link_desc = ''
    webPageForm.file_id = ''
    webPageForm.file_url = ''
    miniForm.qw_miniprogram_appid = ''
    miniForm.qw_miniprogram_page = ''
    miniForm.qw_miniprogram_title = ''
    miniForm.file_url = ''
    miniForm.file_id = ''
}
defineExpose({ confirmText, cancelDialog })
// 图片/文件/视频上传确认
const mediaConfirm = async() => {
    console.log(type.value, file.value)
    if (!file.value.file_url) {
        ElMessage.error('请上传附件')
        return
    }
    dialogVisible.value = false
    await emit('handleConfirm', { type: type.value, file: file.value, isEdit: isEdit.value })
}
// 网页确认
const linkConfirm = async() => {
    // console.log(999)
    let valid = await webPageRef.value.validate()
    console.log(valid)
    if (valid) {
        linkVisible.value = false
        await emit('handleConfirm', { type: type.value, file: webPageForm, isEdit: isEdit.value })
    }
}
// 小程序确认
const miniConfirm = async() => {
    let valid = await miniRef.value.validate()
    console.log(valid)
    if (valid) {
        miniprogramVisible.value = false
        await emit('handleConfirm', { type: type.value, file: miniForm, isEdit: isEdit.value })
    }
}
// 图片上传
const uploadImg = async res => {
    if (res) {
        if (type.value === 'LINK') {
            webPageForm.file_id = await res.file_id
            webPageForm.file_url = await res.file_url
        } else if (type.value === 'MINIPROGRAM') {
            miniForm.file_id = await res.file_id
            miniForm.file_url = await res.file_url
            console.log(miniForm)
        } else {
            file.value = await Object.assign(res, { sort: file.value.sort })

        }
    }
}
const removeUrl = res => {
    if (type.value === 'LINK') {
        webPageForm.file_id = res
        webPageForm.file_url = res
    } else if (type.value === 'MINIPROGRAM') {
        miniForm.file_id = res
        miniForm.file_url = res
        console.log(miniForm)
    } else {
        file.value = res
    }
}
</script>

<style scoped lang="scss">
    .media-content{
    }
    .media-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        color: #000;
        padding: 16px 24px;
    }
    .media-item-list{
        display: flex;
        justify-content: space-between;
        padding: 24px;
        margin-left: -8px;
    }
    .media-item{
        width: 86px;
        height: 86px;
        box-sizing: border-box;
        background: #fff;
        border-radius: 4px;
        border: 1px solid $customer-border-color;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-left: 8px;
        .media-item-text{
            padding-top: 8px;
            font-size: 14px;
            color:#303133;
        }
        .media-item-sum{
            padding-top: 2px;
            font-size: 12px;
            color:#909399;
        }
        img{
            width: 24px;
            height:24px;
        }
        &.disabled {
            cursor: not-allowed;
            opacity: 0.6;
            img {
                opacity: 0.6;
            }
        }
    }
    .task-disable-btn{
        opacity: 0.6;
        cursor: not-allowed;
    }
</style>
