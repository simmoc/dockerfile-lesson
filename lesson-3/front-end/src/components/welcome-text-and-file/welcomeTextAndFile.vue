<template>
    <div class="welcome-text-and-file">
        <div
            :class="[
                'text-emoji-content-wrap',
                curContentErr ? 'fake-border__error' : 'mb8'
            ]"
        >
            <!-- 测试用 后续删除 -->
            <!-- 字数：{{ info.content.length }}字节：{{ getByteLen(info.content) }} -->
            <!-- @blur="validTextEmojiContent(info.content, 4000)" -->
            <div style="position: relative">
                <el-input
                    id="editContent"
                    v-model="info.content"
                    type="textarea"
                    placeholder="请输入内容"
                    :autosize="{ minRows: 10 }"
                    maxlength="800"
                    :readonly="disabled"
                    @blur="validTextEmojiContent(info.content, 4000)"
                />
                <template v-if="!disabled">
                    <div class="emoji-btn" @click="addEmojiPopover(info)">
                        <img
                            :src="emojiWhite"
                            alt="表情包"
                        >
                    </div>
                    <div class="content-input-right">
                        <div class="limit-number">
                            {{ info.content.length }}/800
                            <el-tooltip
                                effect="dark"
                                content="变量字符长度不可控，建议内容长度适当。"
                                placement="bottom"
                                popper-class="limit-number-tip"
                            >
                                <img :src="infoImg" alt="">
                            </el-tooltip>
                        </div>
                        <div v-if="isAddVariableBtn" class="add-variable-btn">
                            <el-button
                                v-show="!!eventsId"
                                size="mini"
                                icon="el-icon-plus"
                                @click.stop="addVariablePopover"
                            >
                                插入变量
                            </el-button>
                            <select-variable
                                ref="welcomeTextVariableSelectBlock"
                                v-model="selectVariableValue"
                                :is-input-show="false"
                                :events-id="eventsId"
                                @changeObj="insertVariable"
                            />
                        </div>
                    </div>
                </template>
            </div>
            <el-collapse-transition v-if="!disabled">
                <div v-show="info.emojiPopoverVisible" class="emoji-popover-wrap">
                    <!-- :label="emojiGroup.name" -->
                    <el-tabs v-model="emojiTab">
                        <el-tab-pane
                            v-for="(emojiGroup, emojiIndex) in emojiList"
                            :key="emojiIndex"
                            :name="emojiGroup.label"
                            style="height: 200px; overflow: auto"
                        >
                            <template #label>
                                <span class="emoji-tab-label">
                                    {{ emojiGroup.name }}
                                </span>
                            </template>
                            <div class="emoji-box">
                                <div
                                    v-for="(subItem, subIndex) in emojiGroup.value"
                                    :key="subIndex"
                                    @click="insertText(subItem, info)"
                                >
                                    <span>{{ subItem }}</span>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-collapse-transition>
        </div>
        <div v-if="curContentErr" class="fake-el-form-item__error mb8">
            输入内容过长
        </div>
        <!-- 附件列表 -->
        <div class="other-content-wrap">
            <div
                v-for="(contentItem, contentIndex) in info.other_content_list"
                :key="contentIndex"
                class="other_content_item"
            >
                <!-- 视频缩略图 url、其他 upload_url -->
                <div
                    v-if="['we_applets', 'images'].includes(contentItem.type)"
                    class="url-image-box"
                    @click="previewMedia(contentItem)"
                >
                    <el-image
                        style="width: 44px; height: 44px"
                        :src="contentItem.upload_url"
                        :preview-src-list="[contentItem.upload_url]"
                    >
                        <template #error>
                            <div class="image-err-slot">
                                <i class="el-icon-picture-outline" />
                            </div>
                        </template>
                    </el-image>
                </div>
                <div
                    v-if="contentItem.type == 'web_page'"
                    class="url-image-box"
                    @click="previewMedia(contentItem)"
                >
                    <el-image
                        style="width: 44px; height: 44px"
                        :src="contentItem.upload_url"
                    >
                        <template #error>
                            <div class="image-err-slot">
                                <img
                                    style="width: 100%"
                                    :src="default_2x"
                                    alt=""
                                >
                            </div>
                        </template>
                    </el-image>
                </div>

                <!-- <img
        v-else-if="contentItem.type == 'web_page'"
        :src="contentItem.upload_url"
        @click="previewMedia(contentItem)"
        style="width: 44px; height: 44px"
        alt="封面" /> -->

                <video
                    v-if="contentItem.media_url && contentItem.type == 'video'"
                    style="width: 44px; height: 44px; cursor: pointer"
                    fit="fill"
                    :src="contentItem.media_url"
                    @click="previewVideo(contentItem.media_url)"
                />
                <div class="middle-txt">
                    <div class="title overflow-ellipsis">
                        {{
                            contentItem.title ||
                                (contentItem.type == 'images'
                                    ? '图片'
                                    : contentItem.type == 'video'
                                        ? '视频'
                                        : '-')
                        }}
                    </div>
                    <div
                        v-if="['we_applets', 'web_page'].includes(contentItem.type)"
                        class="desc overflow-ellipsis"
                    >
                        {{ contentItem.description || '-' }}
                    </div>
                </div>
                <div v-if="!disabled" class="right-operate">
                    <div class="right-operate-btn right-operate-success">
                        <i class="el-icon-success" />
                    </div>
                    <div
                        class="right-operate-btn right-operate-del"
                        @click="delOtherContentList(info.other_content_list, contentIndex)"
                    >
                        <i class="el-icon-delete-solid" />
                    </div>
                </div>
            </div>
        </div>
        <template v-if="!disabled">
            <!-- 上传附件弹窗 -->
            <el-popover
                v-model="addOtherContentVisible"
                placement="top"
                width="400"
                trigger="manual"
            >
                <div class="add-other-content-wrap">
                    <div class="add-other-content-header">
                        <span>选择添加附件类型</span>
                        <i
                            class="el-icon-close"
                            @click="addOtherContentVisible = false"
                        />
                    </div>
                    <div class="add-other-content-main">
                        <div class="add-other-content-item" @click="addPic">
                            <img
                                :src="otherContent1"
                                alt="图片"
                            >
                            <span>图片</span>
                        </div>
                        <div class="add-other-content-item" @click="addVideo">
                            <img
                                :src="otherContent2"
                                alt="视频"
                            >
                            <span>视频</span>
                        </div>
                        <div class="add-other-content-item" @click="addWebPage">
                            <img
                                :src="otherContent3"
                                alt="网页"
                            >
                            <span>网页</span>
                        </div>
                        <div class="add-other-content-item" @click="addWechatApp">
                            <img
                                :src="otherContent4"
                                alt="小程序"
                            >
                            <span>小程序</span>
                        </div>
                    </div>
                </div>
                <template #reference>
                    <el-button
                        type="primary"
                        style="width: 100%"
                        size="small"
                        :disabled="
                            info.other_content_list && info.other_content_list.length === 9
                        "
                        @click="addOtherContent"
                    >
                        + 添加图片/视频/网页/小程序
                    </el-button>
                </template>
            </el-popover>
            <!-- 网页附件 -->
            <el-dialog
                v-model:visible="webPageDialogVisible"
                title="添加网页消息"
                custom-class="sop-add-other-content-dialog"
                width="400px"
            >
                <el-form
                    ref="webPageForm"
                    :model="webPageForm"
                    :rules="webPageRules"
                    label-width="100px"
                    label-position="top"
                    size="mini"
                >
                    <el-form-item label="网页标题：" prop="title">
                        <el-input
                            v-model="webPageForm.title"
                            type="textarea"
                            placeholder="请输入标题"
                            :autosize="{ minRows: 2 }"
                            maxlength="30"
                            show-word-limit
                            class="el-input-show-show-word-limit"
                            @input="
                                webPageForm.title = webPageForm.title.replace(noEmojiReg, '')
                            "
                        />
                    </el-form-item>
                    <el-form-item label="网页封面：" prop="upload_url">
                        <el-upload
                            :action="`${requestUrl}/task/file/upload`"
                            :multiple="false"
                            :data="{ file_type: 1 }"
                            accept="image/jpg, image/jpeg, image/bmp, image/gif, image/png"
                            :show-file-list="false"
                            :headers="{ token: token }"
                            :on-success="
                                (response, file, fileList) =>
                                    handleImgUploadSuccess(
                                        response,
                                        file,
                                        fileList,
                                        'webPageForm'
                                    )
                            "
                            :on-error="
                                (err, file, fileList) =>
                                    handleImgUploadErr(err, file, fileList, 'webPageForm')
                            "
                            :before-upload="beforeImgUpload"
                        >
                            <el-image
                                v-if="webPageForm.upload_url"
                                style="width: 100px; height: 100px"
                                fit="fill"
                                :src="webPageForm.upload_url"
                            />
                            <template v-if="!webPageForm.upload_url" #trigger>
                                <div
                                    class="uploader"
                                >
                                    <i class="el-icon-plus uploader-icon" />
                                    <span>点击上传</span>
                                </div>
                            </template>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="网页描述：" prop="description">
                        <el-input
                            v-model="webPageForm.description"
                            class="el-input-show-show-word-limit"
                            type="textarea"
                            placeholder="请输入描述"
                            maxlength="100"
                            show-word-limit
                            :autosize="{ minRows: 2 }"
                            @input="
                                webPageForm.description = webPageForm.description.replace(
                                    noEmojiReg,
                                    ''
                                )
                            "
                        />
                    </el-form-item>
                    <el-form-item label="网页链接：" prop="url">
                        <el-input
                            v-model="webPageForm.url"
                            type="textarea"
                            placeholder="请输入链接"
                            :autosize="{ minRows: 2 }"
                            maxlength="500"
                            show-word-limit
                            class="el-input-show-show-word-limit"
                            @input="webPageForm.url = webPageForm.url.replace(noEmojiReg, '')"
                        />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button size="mini" @click="cancelAddWebPage">取 消</el-button>
                        <el-button size="mini" type="primary" @click="confirmAddWebPage">
                            确 认
                        </el-button>
                    </span>
                </template>
            </el-dialog>
            <!-- 小程序附件 -->
            <el-dialog
                v-model:visible="wechatAppDialogVisible"
                title="添加小程序消息"
                custom-class="sop-add-other-content-dialog"
                width="400px"
            >
                <el-form
                    v-if="addWechatAppType == 0"
                    ref="wechatAppForm"
                    :model="wechatAppForm"
                    :rules="wechatAppRules"
                    label-width="100px"
                    label-position="top"
                    size="mini"
                >
                    <el-form-item label="小程序标题：" prop="title">
                        <el-input
                            v-model="wechatAppForm.title"
                            type="textarea"
                            placeholder="请输入标题"
                            :autosize="{ minRows: 2 }"
                            maxlength="16"
                            show-word-limit
                            @input="
                                wechatAppForm.title = wechatAppForm.title.replace(
                                    noEmojiReg,
                                    ''
                                )
                            "
                        />
                    </el-form-item>
                    <el-form-item label="小程序封面：" prop="upload_url">
                        <el-upload
                            :action="`${requestUrl}/task/file/upload`"
                            :multiple="false"
                            :data="{ file_type: 1 }"
                            :headers="{ token: token }"
                            accept="image/jpg, image/jpeg, image/png"
                            :show-file-list="false"
                            :on-success="
                                (response, file, fileList) =>
                                    handleImgUploadSuccess(
                                        response,
                                        file,
                                        fileList,
                                        'wechatAppForm',
                                        'miniapp'
                                    )
                            "
                            :on-error="
                                (err, file, fileList) =>
                                    handleImgUploadErr(err, file, fileList, 'wechatAppForm')
                            "
                            :before-upload="(e) => beforeImgUpload(e, 'wechatApp')"
                        >
                            <el-image
                                v-if="wechatAppForm.upload_url"
                                style="width: 100px; height: 100px"
                                fit="fill"
                                :src="wechatAppForm.upload_url"
                            />
                            <div v-else class="uploader">
                                <i class="el-icon-plus uploader-icon" />
                                <span class="action-txt">点击上传</span>
                                <span class="tip">封面图建议尺寸为520*416</span>
                            </div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="小程序Appid：" prop="appid">
                        <p style="font-size: 12px; color: red; line-height: 22px">
                            提示：请确认小程序已绑定相应的企业微信，且appid一定准确，否则消息将推送失败
                        </p>
                        <el-input
                            v-model="wechatAppForm.appid"
                            type="textarea"
                            placeholder="请输入小程序Appid"
                            :autosize="{ minRows: 2 }"
                            maxlength="32"
                            show-word-limit
                            @input="
                                wechatAppForm.appid = wechatAppForm.appid
                                    .replace(noEmojiReg, '')
                                    .replace(/[^a-zA-Z0-9]/g, '')
                            "
                        />
                    </el-form-item>
                    <el-form-item label="小程序Page路径：" prop="url">
                        <el-input
                            v-model="wechatAppForm.url"
                            type="textarea"
                            placeholder="请输入小程序Page路径"
                            :autosize="{ minRows: 2 }"
                            maxlength="200"
                            show-word-limit
                            class="el-input-show-show-word-limit"
                            @input="
                                wechatAppForm.url = wechatAppForm.url.replace(noEmojiReg, '')
                            "
                        />
                    </el-form-item>
                </el-form>
                <el-form
                    v-if="addWechatAppType == 1"
                    ref="wechatAppForm"
                    :model="wechatAppForm"
                    label-width="100px"
                    label-position="top"
                    size="mini"
                >
                    <el-form-item label="选择小程序：">
                        <el-select
                            v-model="minipro_id"
                            size="mini"
                            class="w-100percent"
                            placeholder="请选择"
                            clearable
                        >
                            <template v-for="(item, index) in appOptions" :key="index">
                                <el-option
                                    :label="item.title"
                                    :value="index + 1"
                                />
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="小程序封面：" prop="upload_url">
                        <el-upload
                            :action="`${requestUrl}/task/file/upload`"
                            :data="{ file_type: 1 }"
                            :multiple="false"
                            accept="image/jpg, image/jpeg, image/png"
                            :show-file-list="false"
                            :headers="{ token: token }"
                            :on-success="
                                (response, file, fileList) =>
                                    handleImgUploadSuccess(
                                        response,
                                        file,
                                        fileList,
                                        'wechatAppForm',
                                        'miniapp'
                                    )
                            "
                            :on-error="
                                (err, file, fileList) =>
                                    handleImgUploadErr(err, file, fileList, 'wechatAppForm')
                            "
                            :before-upload="(e) => beforeImgUpload(e, 'wechatApp')"
                        >
                            <el-image
                                v-if="wechatAppForm.upload_url"
                                style="width: 100px; height: 100px"
                                fit="fill"
                                :src="wechatAppForm.upload_url"
                            />
                            <div v-else class="uploader">
                                <i class="el-icon-plus uploader-icon" />
                                <span class="action-txt">点击上传</span>
                                <span class="tip">封面图建议尺寸为520*416</span>
                            </div>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <span
                    v-if="addWechatAppType == 0 && allowAddWechatAppType.includes(1)"
                    style="color: #1773fa; cursor: pointer"
                    @click="changeAddWechatAppType(1)"
                >
                    选择添加的小程序
                </span>
                <span
                    v-if="addWechatAppType == 1 && allowAddWechatAppType.includes(0)"
                    style="color: #1773fa; cursor: pointer"
                    @click="changeAddWechatAppType(0)"
                >
                    自定义配置小程序
                </span>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button size="mini" @click="cancelWechatApp">取 消</el-button>
                        <el-button size="mini" type="primary" @click="confirmWechatApp">
                            确 认
                        </el-button>
                    </span>
                </template>
            </el-dialog>
            <!-- 图片附件 -->
            <el-dialog
                v-model:visible="picDialogVisible"
                title="添加图片"
                custom-class="sop-add-other-content-dialog"
                width="400px"
            >
                <el-form
                    ref="picForm"
                    :model="picForm"
                    :rules="picRules"
                    label-width="100px"
                    label-position="top"
                    size="mini"
                >
                    <el-form-item label="" prop="upload_url">
                        <el-upload
                            :action="`${requestUrl}/task/file/upload`"
                            :multiple="false"
                            :data="{ file_type: 1 }"
                            :headers="{ token: token }"
                            :on-remove="removePic"
                            accept="image/jpg, image/jpeg, image/bmp, image/gif, image/png"
                            :show-file-list="false"
                            :on-success="
                                (response, file, fileList) =>
                                    handleImgUploadSuccess(response, file, fileList, 'picForm')
                            "
                            :on-error="
                                (err, file, fileList) =>
                                    handleImgUploadErr(err, file, fileList, 'picForm')
                            "
                            :before-upload="beforeImgUpload"
                        >
                            <el-image
                                v-if="picForm.upload_url"
                                style="width: 100px; height: 100px"
                                fit="fill"
                                :src="picForm.upload_url"
                            />
                            <template v-if="!picForm.upload_url" #trigger>
                                <div class="uploader">
                                    <i class="el-icon-plus uploader-icon" />
                                    <span>点击上传</span>
                                </div>
                            </template>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button size="mini" @click="cancelAddPic">取 消</el-button>
                        <el-button size="mini" type="primary" @click="confirmAddPic">
                            确 认
                        </el-button>
                    </span>
                </template>
            </el-dialog>
            <!-- 视频附件 -->
            <el-dialog
                v-model:visible="videoDialogVisible"
                title="添加视频"
                custom-class="sop-add-other-content-dialog"
                width="400px"
            >
                <el-form
                    ref="videoForm"
                    :model="videoForm"
                    :rules="videoRules"
                    label-width="100px"
                    label-position="top"
                    size="mini"
                >
                    <el-form-item label="视频" prop="media_url">
                        <el-upload
                            :action="`${requestUrl}/task/file/upload`"
                            :data="{
                                file_type: 2
                            }"
                            :multiple="false"
                            accept=".mp4"
                            :show-file-list="false"
                            :headers="{ token: token }"
                            :on-success="
                                (response, file, fileList) =>
                                    handleImgUploadSuccess(
                                        response,
                                        file,
                                        fileList,
                                        'videoForm',
                                        'vedio'
                                    )
                            "
                            :on-error="
                                (err, file, fileList) =>
                                    handleImgUploadErr(err, file, fileList, 'videoForm')
                            "
                            :before-upload="beforeVideoUpload"
                        >
                            <video
                                v-if="videoForm.media_url"
                                style="width: 100px; height: 100px"
                                fit="fill"
                                :src="videoForm.media_url"
                            />
                            <template v-if="!videoForm.media_url" #trigger>
                                <div class="uploader">
                                    <i class="el-icon-plus uploader-icon" />
                                    <span>点击上传</span>
                                </div>
                            </template>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button size="mini" @click="cancelAddVideo">取 消</el-button>
                        <el-button size="mini" type="primary" @click="confirmAddVideo">
                            确 认
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </template>
        <!-- 视频附件 -->
        <el-dialog
            v-model:visible="videoplayerVisible"
            title="视频预览"
            custom-class="sop-add-other-content-dialog"
            width="780px"
        >
            <div
                id="videoPlyer"
                style="width: 740px; height: 400px; margin: 0 auto"
            />
        </el-dialog>
    </div>
</template>
<script>
import default_2x from '@/assets/images/welcomeTextAndFile/default_2x.svg'
import emojiWhite from '@/assets/images/welcomeTextAndFile/emojiWhite.svg'
import infoImg from '@/assets/images/info.png'
import otherContent4 from '@/assets/images/welcomeTextAndFile/otherContent4@2x.png'
import otherContent3 from '@/assets/images/welcomeTextAndFile/otherContent3@2x.png'
import otherContent2 from '@/assets/images/welcomeTextAndFile/otherContent2@2x.png'
import otherContent1 from '@/assets/images/welcomeTextAndFile/otherContent1@2x.png'

import { emoji as emojiList } from '@/util/emoji'
import { getPositionForTextArea, getByteLen } from '@/util/common.js'
// import Player from 'xgplayer/dist/simple_player'
// import volume from 'xgplayer/dist/controls/volume'
// import playbackRate from 'xgplayer/dist/controls/playbackRate'

// import Player from 'xgplayer/dist/core_player.js'
// import play from 'xgplayer/dist/controls/play.js'
// import fullscreen from 'xgplayer/dist/controls/fullscreen.js'
// import progress from 'xgplayer/dist/controls/progress.js'
// import volume from 'xgplayer/dist/controls/volume.js'
// import pip from 'xgplayer/dist/controls/pip.js'
// import flex from 'xgplayer/dist/controls/flex.js'

import { Player, play, fullscreen, progress, volume, pip, flex } from 'xgplayer'
export default {
    name: 'WelcomeTextAndFile',
    components: {
        'select-variable': () =>
            import('@/components/selectVariable/selectVariable.vue')
    },
    props: {
        writeBackWelcome: {
            type: Object,
            default: function() {
                return {}
            }
        },
        allowAddWechatAppType: {
            type: Array,
            default: function() {
                return [0, 1]
            }
        },
        // 是否显示插入变量按钮
        isAddVariableBtn: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        eventsId: {
            type: [String, Number],
            default: ''
        }
    },
    emits: ['update'],
    data() {
        return {
            default_2x: default_2x,
            emojiWhite: emojiWhite,
            infoImg: infoImg,
            otherContent4: otherContent4,
            otherContent3: otherContent3,
            otherContent2: otherContent2,
            otherContent1: otherContent1,
            videoplayerVisible: false,
            player: null,
            info: {
                content: '',
                emojiPopoverVisible: false,
                other_content_list: []
            },
            curContentErr: false,
            token: '',
            // emoji
            emojiList,
            emojiTab: 'face',
            timer: null,
            // eslint-disable-next-line no-misleading-character-class
            noEmojiReg: /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[A9|AE]\u3030|\uA9|\uAE|\u3030/gi,
            // noEmojiReg: /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi,
            // 附件
            addOtherContentVisible: false,
            // 附件 网页 web_page 3
            webPageDialogVisible: false,
            webPageForm: {},
            baseWebPageForm: {
                type: 'web_page',
                title: '',
                description: '',
                url: '',
                upload_url: ''
            },
            webPageRules: {
                title: [
                    { required: true, message: '请输入网页标题', trigger: 'blur' },
                    { max: 30, message: '最长 30 个字符', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入网页描述', trigger: 'blur' },
                    { max: 100, message: '最长 100 个字符', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: '请输入网页链接', trigger: 'blur' },
                    { max: 500, message: '最长 500 个字符', trigger: 'blur' }
                ]
            },
            // 附件 小程序 we_applets 2
            wechatAppDialogVisible: false,
            wechatAppForm: {},
            baseWechatAppForm: {
                type: 'we_applets',
                upload_url: '',
                title: '',
                url: '',
                source_id: 0,
                appid: ''
            },
            wechatAppRules: {
                title: [
                    { required: true, message: '请输入小程序标题', trigger: 'blur' },
                    { max: 16, message: '最长 16 个字符', trigger: 'blur' }
                ],
                upload_url: [
                    {
                        required: true,
                        message: '请上传小程序封面',
                        trigger: 'change'
                    }
                ],
                appid: [
                    { required: true, message: '请输入小程序Appid', trigger: 'blur' },
                    { max: 32, message: '最长 32 个字符', trigger: 'blur' }
                ],
                url: [
                    {
                        required: true,
                        message: '请输入小程序Page路径',
                        trigger: 'blur'
                    },
                    { max: 200, message: '最长 200 个字符', trigger: 'blur' }
                ]
            },
            addWechatAppType: 0,
            appOptions: [],
            minipro_id: '',
            // 上传图片 'images'1
            picDialogVisible: false,
            picForm: {},
            basePicForm: {
                type: 'images',
                upload_url: ''
            },
            picRules: {
                upload_url: [
                    {
                        required: true,
                        message: '请上传图片',
                        trigger: 'change'
                    }
                ]
            },
            // 上传视频  video 4
            videoDialogVisible: false,
            videoForm: {},
            baseVideoForm: {
                type: ' video',
                upload_url: '',
                media_url: '',
                source_id: 0
            },
            videoRules: {
                media_url: [
                    {
                        required: true,
                        message: '请上传视频',
                        trigger: 'change'
                    }
                ],
                source_id: [
                    {
                        required: true,
                        message: '请上传视频',
                        trigger: 'change'
                    }
                ]
            },
            mini_info: {
                source_name: '小程序封面图',
                source_type: 'images',
                validity_start_time: '2021-06-22',
                validity_end_time: '2021-06-25'
            },
            // video_info: {
            //   source_name: '视频',
            //   source_type: '2',
            //   validity_start_time: '2021-06-22',
            //   validity_end_time: '2021-06-25'
            // },
            otherContentLoading: null,
            selectVariableValue: '',
            requestUrl: ''
        }
    },
    watch: {
        writeBackWelcome: {
            handler() {
                this.info = { ...this.writeBackWelcome }
            },
            immediate: true
        },
        'info.other_content_list.length': {
            handler: function(n, o) {
                if ((n === 0 && o === 1) || (n === 1 && o === 0)) {
                    this.$emit('update', '')
                }
            }
        }
    },
    created() {
        this.token = localStorage.getItem('token') || ''
        this.getMiniprogramList()
        console.log('ylurl===', import.meta.env.DEV)
        this.requestUrl = import.meta.env.DEV
    // console.log(this.$route)
    },
    methods: {
        addVariablePopover() {
            this.selectVariableValue = ''
            this.$refs.welcomeTextVariableSelectBlock.openPopover()
        },
        getMiniprogramList() {
            let that = this
            //   Admin.api.ajax({
            //   url: '/cw_message_group_send/get_miniprogram_list',
            //   async: true,
            //   type: 'post',
            //   data: {}
            // }, function (ret, res) {
            //     if (res.code == 0) {
            //       that.appOptions = res.data;
            //     }
            // });
            that.appOptions = []
        },
        removePic(file) {
            console.log(file)
        },
        // 附件添加和关闭
        addOtherContent() {
            if (
                this.info.other_content_list &&
                this.info.other_content_list.length &&
                this.info.other_content_list.length > 8
            ) {
                this.$message({
                    message: '添加附件不可超过9个',
                    type: 'warning'
                })
                return
            }
            this.addOtherContentVisible = !this.addOtherContentVisible
        },
        delOtherContentList(list, index) {
            list.splice(index, 1)
        },
        // 附件内容添加
        handleImgUploadSuccess(response, file, fileList, type, media_type = '') {
            console.log('上传成功=======', type, this[`${type}`], response)
            if (this[`${type}`]) {
                // this[`${type}`]["upload_url"] =
                //   "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100";
                if (media_type == 'vedio') {
                    if (response.data.source_id == undefined) {
                        this.$message({
                            message: response.data.msg,
                            type: 'error'
                        })
                        this.$nextTick(() => {
                            this.otherContentLoading.close()
                        })
                        return false
                    }
                    // this[`${type}`]["url"] = response.media_id;
                    this[`${type}`]['source_id'] = response.data.source_id
                    this[`${type}`]['media_url'] = response.data.file_url
                    this[`${type}`]['type'] = 'video'
                } else if (media_type == 'miniapp') {
                    this[`${type}`]['upload_url'] = response.data.file_url
                    this[`${type}`]['source_id'] = response.data.source_id
                    this[`${type}`]['type'] = 'we_applets'
                } else {
                    // console.log(response.data)
                    this[`${type}`]['upload_url'] = response.data.file_url
                    this[`${type}`]['source_id'] = response.data.source_id
                    // let fileType = ''
                    // if (type == 'picForm') {
                    //   fileType = 'images'
                    // } else {
                    //   fileType = 'Web_page'
                    // }
                    // this[`${type}`]['type'] = fileType
                    this[`${type}`]['type'] = type === 'picForm' ? 'images' : 'web_page'
                }
            }
            this.$nextTick(() => {
                this.otherContentLoading.close()
            })
        },
        handleImgUploadErr(err) {
            console.log(err)
            this.$nextTick(() => {
                this.otherContentLoading.close()
            })
        },
        beforeVideoUpload(file) {
            const isVideo = /\.(mp4)$/.test(file.name)
            if (!isVideo) {
                this.$message({
                    message: '上传文件只能是 mp4 视频格式!',
                    type: 'error'
                })
                return false
            }
            const self = this
            const isLt10MB = file.size / 1024 / 1024 < 10

            if (!isLt10MB) {
                self.videoForm.upload_url = ''
                self.videoForm.media_url = ''
                self.videoForm.source_id = ''
                setTimeout(function() {
                    self.$message({
                        message: '上传视频大小不能超过10MB！',
                        type: 'error'
                    })
                }, 500)
                return false
            }
            this.sopLoading()
            // self.otherContentLoading.close();
        },
        beforeImgUpload(file, type) {
            let isIMAGE = false
            const imgReg =
                type === 'wechatApp'
                    ? /\.(jpg|jpeg|png|JPG|PNG|JPEG)$/
                    : /\.(gif|jpg|jpeg|png|bmp|BMP|GIF|JPG|PNG|JPEG)$/
            const msgTxt = `上传文件只能是 ${
                type === 'wechatApp' ? 'jpg，jpeg，png' : 'jpg，jpeg，png, bmp, gif'
            } 图片格式!`
            isIMAGE = imgReg.test(file.name)
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isIMAGE) {
                this.$message({
                    message: msgTxt,
                    type: 'error'
                })
            }
            if (!isLt2M) {
                this.$message({
                    message: '上传文件大小不能超过 2MB!',
                    type: 'error'
                })
            }
            console.log(isIMAGE, file.type, isLt2M)

            if (isIMAGE && isLt2M) {
                this.sopLoading()
            }

            return isIMAGE && isLt2M
        },
        // 附件加小程序
        changeAddWechatAppType(type) {
            this.addWechatAppType = type
            this.wechatAppForm.upload_url = ''
            this.wechatAppForm.source_id = 0
        },
        addWechatApp() {
            this.addOtherContentVisible = false
            this.wechatAppForm = { ...this.baseWechatAppForm }
            this.$nextTick(() => {
                this.$refs.wechatAppForm.clearValidate()
            })
            this.wechatAppDialogVisible = true
        },
        cancelWechatApp() {
            this.wechatAppDialogVisible = false
        },
        confirmWechatApp() {
            if (this.addWechatAppType == 0) {
                // 自定义小程序
                this.$refs['wechatAppForm'].validate(valid => {
                    if (!valid) {
                        return false
                    }
                    // let i = parseInt(this.editableTabsValue);
                    if (!this.info.other_content_list) {
                        this.info.other_content_list = []
                    }
                    this.info.other_content_list.push(
                        JSON.parse(JSON.stringify(this.wechatAppForm))
                    )
                    this.wechatAppDialogVisible = false
                })
            } else {
                // 选择小程序
                if (!this.minipro_id) {
                    this.$message({
                        message: '请选择小程序',
                        type: 'error'
                    })
                    return
                }

                if (!this.wechatAppForm.upload_url) {
                    this.$message({
                        message: '请上传小程序封面图',
                        type: 'error'
                    })
                    return
                }

                let datafrom = {}
                datafrom = this.appOptions[this.minipro_id - 1]
                datafrom['upload_url'] = this.wechatAppForm.upload_url
                datafrom['source_id'] = this.wechatAppForm.source_id

                // let i = parseInt(this.editableTabsValue);
                if (!this.info.other_content_list) {
                    this.info.other_content_list = []
                }
                this.info.other_content_list.push(JSON.parse(JSON.stringify(datafrom)))
                this.wechatAppDialogVisible = false
            }
        },
        // 附件加网页
        cancelAddWebPage() {
            this.webPageDialogVisible = false
        },
        confirmAddWebPage() {
            this.$refs['webPageForm'].validate(valid => {
                if (!valid) {
                    return false
                }
                // let i = parseInt(this.editableTabsValue);
                if (!this.info.other_content_list) {
                    this.info.other_content_list = []
                }
                this.info.other_content_list.push(
                    JSON.parse(JSON.stringify(this.webPageForm))
                )
                this.webPageDialogVisible = false
            })
        },
        addWebPage() {
            this.addOtherContentVisible = false
            this.webPageForm = { ...this.baseWebPageForm }
            this.$nextTick(() => {
                this.$refs.webPageForm.clearValidate()
            })
            this.webPageDialogVisible = true
        },

        cancelAddPic() {
            this.picDialogVisible = false
        },
        confirmAddPic() {
            this.$refs['picForm'].validate(valid => {
                if (!valid) {
                    return false
                }
                // let i = parseInt(this.editableTabsValue);
                if (!this.info.other_content_list) {
                    this.info.other_content_list = []
                }
                this.info.other_content_list.push(
                    JSON.parse(JSON.stringify(this.picForm))
                )
                this.picDialogVisible = false
            })
        },
        addPic() {
            this.addOtherContentVisible = false
            this.picForm = { ...this.basePicForm }
            this.picDialogVisible = true
        },

        previewMedia(item) {
            console.log(item)
            if (item.type == 'web_page') {
                window.open(item.url)
            }
        },

        previewVideo(url) {
            // console.log('点击了dddd')
            this.videoplayerVisible = true
            setTimeout(() => {
                // console.log('font-------------dddd', document.querySelector('#videoPlyer>video'))
                if (document.querySelector('#videoPlyer>video') || this.player) {
                    // console.log('替换路由')
                    this.player.src = url
                } else {
                    let player = new Player({
                        id: 'videoPlyer',
                        url: url,
                        // controlPlugins: [volume, playbackRate],
                        controlPlugins: [play, fullscreen, progress, volume, pip, flex],
                        videoInit: true,
                        download: true,
                        playbackRate: [0.5, 0.75, 1, 1.5, 2] // 传入倍速可选数组
                        // cssFullscreen: true
                    })
                    this.player = player
                }
            }, 300)
        },

        cancelAddVideo() {
            this.videoDialogVisible = false
        },
        confirmAddVideo() {
            this.$refs['videoForm'].validate(valid => {
                if (!valid) {
                    return false
                }
                // let i = parseInt(this.editableTabsValue);
                if (!this.info.other_content_list) {
                    this.info.other_content_list = []
                }
                this.info.other_content_list.push(
                    JSON.parse(JSON.stringify(this.videoForm))
                )
                this.videoDialogVisible = false
            })
        },
        addVideo() {
            this.addOtherContentVisible = false
            this.videoForm = { ...this.baseVideoForm }
            this.videoDialogVisible = true
        },
        // 变量插入
        insertVariable(v, o) {
            let insertContent = ''
            if (o.target_type === 'SUBJECT') {
                insertContent = `&%${o.target_type}|${o.element_key}|${o.subject_id}%&`
            } else {
                insertContent = `&%${o.target_type}|${o.element_key}%&`
            }
            this.insertText(insertContent, this.info)
        },
        // 表情包插入相关
        getPositionForTextArea,
        insertText(value, item) {
            let position = document.getElementById('editContent')
            let pos = this.getPositionForTextArea(position)
            let y = position.value
            let frontString = y.substring(0, pos)
            let afterString = y.substring(pos, (item.content.length || 0))
            item.content = frontString + value + afterString
            if (this.timer) {
                clearTimeout(this.timer)
            }
            this.timer = setTimeout(() => {
                // 插入表情等表情/手势,聚焦;
                this.$nextTick(() => {
                    position.focus()
                    position.selectionStart = position.selectionEnd = pos + (value.length || 0)
                })
            }, 0)
        },
        addEmojiPopover(item) {
            let f = !item.emojiPopoverVisible
            // this.$set(this.info, 'emojiPopoverVisible', f)
            this.info.emojiPopoverVisible = f
        },
        // 失焦调后台提示
        validTextEmojiContent() {
            this.$emit('update', '')
            // 调后台接口算字节
        },
        validateLimitByteLen(rule, value, callback, limitLen) {
            let len = this.getByteLen(value)
            if (len > limitLen) {
                callback(new Error('输入内容过长'))
            } else {
                callback()
            }
        },
        getByteLen,
        sopLoading() {
            this.otherContentLoading = this.$loading({
                lock: true,
                text: '上传中'
            })
        }
    }
}
</script>
<style lang="scss">
@import './welcomeTextAndFile.scss';
</style>
