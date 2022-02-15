<template>
    <div class="trend-item-content flex-g1 flex-s1">
        <div class="normal-trend flex flex-align-center flex-wrap">
            <div v-for="(item, index) in contentArr" :key="index" class="mr4 lh32" :class="['content'].includes(item.key) ? 'script-content' : ''">
                <!-- <img v-if="['member_img', 'customer_img'].includes(item.key)" :src="item.data.value" class="content-img ml4" alt=""> -->
                <el-avatar v-if="['member_img', 'customer_img'].includes(item.key)" class="mr4 block" shape="square" :size="32" :src="item.data.value || defaultAvatar" />
                <img v-if="['customer_gender'].includes(item.key) && showSexType(item.data.value)" :src="showSexType(item.data.value)" class="sex-img mr4" alt="">
                <span v-else-if="checkType(item) == 'string'">{{ item }}</span>
                <span v-else-if="['customer_type'].includes(item.key)" :class="[item.data.value == '@微信' ? 'text-green' : 'text-yellow']">{{ item.data.value }}</span>
                <!-- <span v-else-if="item.value == '@微信'" class="text-green">{{ item }}</span>
                <span v-else-if="item.value == '@企业微信'" class="text-yellow">{{ item }}</span> -->
                <customerTag
                    v-else-if="item.data.type == 'TAG'"
                    :left-title="item.data.value.group_name"
                    :right-title="item.data.value.tag_name"
                    :color=" 
                        ['tag_mark_hq', 'unmark_hq'].includes(trendItem.class_type)
                            ? '#409eff'
                            : '#FF6F00'
                    "
                    :customer-style="{ 'margin-bottom': 0, 'margin-top': 0}"
                />

                <!-- :customer-style="{ 'margin-bottom': '8px', 'margin-top': 0}" -->
                <div v-else-if="['content'].includes(item.key)" class="pt8">
                    <div v-if="item.data.value.content" class="conten-text pl8 pr8 lh22 bgf">
                        <!-- <div v-if="item.data.value.content" class="conten-text pt8 pb8 pl12 pr12 bgf"> -->
                        <p class="show-line2">{{ item.data.value.content }}</p>
                    </div>
                    <div v-if="item.data.value.file_arr && item.data.value.file_arr.length" class="flex flex-align-center flex-wrap">
                        <div v-for="mediaItem in item.data.value.file_arr" :key="mediaItem.file_id" class="media-item pointer mt8" @click.stop="previewMedia(mediaItem)">
                            <img
                                v-if="mediaItem.type !== 'VIDEO'"
                                class="cover-img"
                                :src="showImgCover(mediaItem)"
                            >
                            <video
                                v-else
                                class="cover-img"
                                fit="fill"
                                :src="mediaItem.file_url"
                            />
                            <img
                                v-if="['VIDEO', 'MINIPROGRAM', 'LINK'].includes(mediaItem.type)"
                                class="play-icon"
                                :src="imageUrl(mediaItem.type)"
                                alt="paly"
                            >
                            <div
                                v-if="['LINK', 'MINIPROGRAM', 'FILE'].includes(mediaItem.type)"
                                class="media-item-title"
                            >
                                {{
                                    mediaItem.title ||
                                        mediaItem.qw_link_title ||
                                        mediaItem.qw_miniprogram_title ||
                                        mediaItem.file_name
                                }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            <div class="el-dialog__body flex flex-justify-center">
                <el-image style="height: 100%" :src="imagesUrl" />
            </div>
        </el-dialog>
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
import { onMounted, ref } from 'vue'
import { defaultAvatar } from '@/util/contant'
const props = defineProps({
    trendItem: {
        type: Object,
        default: () => {}
    } 
})
const contentArr = ref([])

const picPlayerVisible = ref(false)
const videoplayerVisible = ref(false)
const imagesUrl = ref('')

const filterContent = async item => {
    // console.log('c初始数据', item)
    // 摘取 (key) 出来， 并把整个content_text分割为一个数组
    let temp = []
    let reg = /\((.*?)\)/g
    item.matchContentArr = []
    item.rcontent_text = item.content_text
    while ((temp = reg.exec(item.content_text))) {
        let res = temp[0].match(/\(([^)]*)\)/)
        if (item.content[res[1]]) {
            item.rcontent_text = item.rcontent_text.replace(res[0], '$')
            item.matchContentArr.push({
                key: res[1],
                data: item.content[res[1]]
            })
        }
        // console.log('执行次数')
    }

    contentArr.value = await _strToarr(item, '$', item.matchContentArr)
    // console.log('对象数组', item, contentArr.value)
}
// 将内容转化为数组，用于遍历
const _strToarr = (data, query, dataArr) => {
    let str = data.rcontent_text
    let strArr = str.split(query)
    let index = str.indexOf(query)
    let num = -1
    while (index !== -1) {
        num++
        if (!strArr[num]) {
            strArr.splice(num, 1, dataArr.shift())
        } else {
            strArr.splice(num + 1, 0, dataArr.shift())
            num++
        }
        index = str.indexOf(query, index + 1)
    }
    data.content_arr = strArr
    return Promise.resolve(strArr)
}

// 检查变量类型
const checkType = obj => {
    return typeof obj
}

const closeDialog = () => {
    picPlayerVisible.value = false
    videoplayerVisible.value = false
    imagesUrl.value = ''
}

// 预览
const previewMedia = item => {
    // console.log(item)
    if (item.type === 'LINK') {
        let baseUrl = item.link_url.indexOf('http') === -1 ? 'https://' : ''
        window.open(baseUrl + item.link_url)
    }
    if (item.type === 'FILE') {
        window.open(item.file_url)
    }
    // if (item.type == 'MINIPROGRAM' || item.type == 'we_applets') {
    //     whatAppPlayerVisible.value = true
    // }
    if (item.type === 'IMAGE') {
        imagesUrl.value = item.file_url
        picPlayerVisible.value = true
    }
    if (item.type === 'VIDEO') {
        imagesUrl.value = item.file_url
        videoplayerVisible.value = true
    }
}

//  性别图片路径
const showSexType = type => {
    let url = ''
    // let url = type === '男' ? 'man' : 'women'
    if (['男', 'man', 1, '1'].includes(type)) {
        url = 'man'
        return new URL(`../../../../assets/images/customer/${url}.svg`, import.meta.url).href
    } else if (['女', 'woman', 2, '2'].includes(type)) {
        url = 'women'
        return new URL(`../../../../assets/images/customer/${url}.svg`, import.meta.url).href
    }
    return ''
}
//  图片路径
const imageUrl = type => {
    return new URL(`../../../../assets/images/customer/media/${type}.svg`, import.meta.url).href
}
// 封面图片过滤
const showImgCover = item => {
    // console.log('附件封面', url, type, file_suffix, item)
    if (!item.file_url && item.type == 'LINK') {
        return new URL('../../../../assets/images/welcomeTextAndFile/default_2x.svg', import.meta.url).href
    }
    let stauffe = ''
    if (item.file_url) {
        let strarr = item.file_url.split('.')
        stauffe = strarr[strarr.length - 1]
    }
    
    if (item.type == 'FILE' && ['doc', 'docx'].includes(stauffe)) {
        let type = 'word'
        return new URL(`../../../../assets/images/customer/media/${type}.svg`, import.meta.url).href
    } else if (item.type == 'FILE' && ['pdf'].includes(stauffe)) {
        let type = 'pdf'
        return new URL(`../../../../assets/images/customer/media/${type}.svg`, import.meta.url).href
    } else if (item.type == 'FILE' && ['xlsx', 'xls'].includes(stauffe)) {
        let type = 'excel'
        return new URL(`../../../../assets/images/customer/media/${type}.svg`, import.meta.url).href
    } else if (item.type == 'FILE' && ['pptx', 'ppt'].includes(stauffe)) {
        let type = 'ppt'
        return new URL(`../../../../assets/images/customer/media/${type}.svg`, import.meta.url).href
    }
    let baseUrl = item.file_url.indexOf('http') === -1 ? 'https://' : ''
    // console.log('附件封面', item.file_url, item.type)
    return baseUrl + item.file_url
}

// const showImgCover = item => {
//     // console.log('附件封面', url, type, file_suffix, item)
//     if (!item.file_url && item.type == 'LINK') {
//         return  '../../../..//assets/images/welcomeTextAndFile/default_2x.svg'
//     }
//     let stauffe = ''
//     if (item.file_name) {
//         stauffe = item.file_name.split('.')[1]
//     }
    
//     if (item.type == 'FILE' && ['doc', 'docx'].includes(stauffe)) {
//         return '../../../..//assets/images/customer/media/word.svg'
//     } else if (item.type == 'FILE' && ['pdf'].includes(stauffe)) {
//         return '../../../..//assets/images/customer/media/pdf.svg'
//     } else if (item.type == 'FILE' && ['xlsx', 'xls'].includes(stauffe)) {
//         return '../../../..//assets/images/customer/mediaexcel.svg'
//     } else if (item.type == 'FILE' && ['pptx', 'ppt'].includes(stauffe)) {
//         return '../../../..//assets/images/customer/media/ppt.svg'
//     }
//     let baseUrl = item.file_url.indexOf('http') === -1 ? 'https://' : ''
//     return baseUrl + item.file_url
// }

onMounted(() => {
    filterContent(props.trendItem)
})
</script>

<style lang="scss">
    .content-img {
        display: block;
        width: 32px;
        height: 32px;
    }
    .sex-img {
        display: block;
        width: 14px;
        height: 14px;
    }
    .conten-text {
        border: 1px solid #d9d9d9;
    }

    .script-content {
        display: block;
        flex-basis:100%;
    }

    .media-item {
    //   width: 75px;
    //   height: 75px;
        width: 58px;
        height: 58px;
        border-radius: 2px;
        margin-right: 4px;
        overflow: hidden;
        position: relative;
        border: 1px solid #d9d9d9;

        .cover-img {
            display: block;
            width: 58px;
            height: 58px;
        }

        .play-icon {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 24px;
            height: 24px;
            z-index: 5;
            // box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.50);
        }

        .media-item-title {
            position: absolute;
            bottom: 0;
            width: 100%;
            // height: 100%;
            // display: inline-flex;
            // align-items:flex-end;
            height: 18px;
            line-height: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 12px;
            color: #fff;
            text-align: center;
            padding: 0 5px;
            background: rgba(0, 0, 0, 0.4);
            // background: linear-gradient(180deg,rgba(0,0,0,0.00), #000000);
        }
    }
    .text-yellow {
        color: #EC8132;
    }
    .text-green {
        color: #4FB65B;
    }
</style>