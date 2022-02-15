<template>
    <div class="card-box">
        <!-- 文本 -->
        <template v-if="showType == 'text'">
            <div v-if="content.content" class="card-text">
                <div v-html="content.content" />
                <!-- {{
          content.content || `暂不支持该种类型消息${Attributes.msgName || ''}`
        }} -->
            </div>
            <div v-else class="card-text">
                {{ `暂不支持该种类型消息${attributes.msgName || ''}` }}
            </div>
        </template>
        <!-- 图片 -->
        <template v-if="showType == 'pictrue'">
            <el-image
                :style="cardStyle.imageStyle"
                :src="content.url"
                :preview-src-list="[content.url]"
            />
        </template>
        <!-- 文件 -->
        <template v-if="showType == 'filename'">
            <div>
                <a :href="content.url">{{ fileName }}</a>
            </div>
        </template>
        <!-- 图文信息 -->
        <template v-if="showType == 'news'">
            <div class="card-message">
                {{ content.corpname }}
            </div>
        </template>
        <!-- 链接 -->
        <template v-if="showType == 'web_link'">
            <div>
                <a :href="content.link_url" target="_blank">{{ content.link_url }}</a>
            </div>
        </template>
        <!-- 小程序 -->
        <template v-if="showType == 'weapp'">
            <div class="weapp-box">
                <div class="weapp-name">
                    <img class="icon" src="@/assets/images/mini.png">
                    <span>{{ content.displayname }}</span>
                </div>
                <div class="weapp-title">{{ content.title }}</div>
                <div class="weapp-desc">
                    <span>{{ content.description }}</span>
                </div>
                <div class="weapp-bottom">
                    <img class="icon" src="@/assets/images/mini.png">
                    <span>小程序</span>
                </div>
            </div>
        </template>
        <!-- 撤回 -->
        <template v-if="showType == 'revoke'">
            <!-- <span>撤回的消息</span> -->
            <Card :attributes="content" :is-revoke="true" />
        </template>
    <!-- 撤回标识 -->
    <!-- <template v-if="isRevoke">
      <img class="is-revoke" src="@/assets/images/revoke.png" />
    </template> -->
    </div>
</template>

<script>
import axios from 'axios'
import clmessage from './clmessage'
export default {
    name: 'Card',
    props: {
        attributes: {
            type: Object,
            default: () => {}
        },
        isRevoke: {
            type: Boolean,
            default: () => false
        }
    },
    data() {
        return {
            cardStyle: {
                imageStyle: {
                    maxWidth: '300px',
                    minWidth: '10px',
                    maxHeight: '300px',
                    minHeight: '10px'
                }
            }
        }
    },
    computed: {
        showType() {
            return this.attributes.showType
        },
        content() {
            return this.attributes.content || {}
        },
        fileName() {
            let content = this.content
            return clmessage.getFileName(content.url)
        }
    },
    mounted() {
        let Attributes = this.attributes
        let msgtype = Attributes.msgtype || Attributes.msg_type
        let msgInfo =
            clmessage.typeList.find(val => {
                return val.msgtype.indexOf(msgtype) > -1
            }) || {}
        let { showType } = msgInfo

        let addtionInfo =
            clmessage.addtionList.find(val => {
                return val.msgtype.indexOf(msgtype) > -1
            }) || {}
        // 消息名称;
        let msgName = addtionInfo.msg
        Attributes.msgName = msgName ? `【${msgName}】` : ''
        Attributes.showType = showType || 'text'
        // this.$set(this.attributes, 'msgName', msgName ? `【${msgName}】` : '')
        // this.$set(this.attributes, 'showType', showType || 'text')
    // this.Attributes.showType = showType || 'text'
    },
    methods: {
        // getImageUrl(url) {
        //     return new URL(url, import.meta.url).href
        // },
        // 下载文件的方法
        download(url, fileName) {
            axios
                .get(url, {
                    responseType: 'blob',
                    headers: new Headers({
                        Origin: location.origin
                    }),
                    mode: 'cors'
                })
                .then(data => {
                    const a = document.createElement('a')
                    const blob = new Blob([data], { type: 'application/octet-stream' })
                    // data指需要下载的文本或字符串内容
                    a.download = fileName
                    a.href = window.URL.createObjectURL(blob)
                    document.body.appendChild(a)
                    a.click()
                    a.remove()
                })
        }
    }
}
</script>

<style scoped lang="scss">
.weapp-box {
  width: 200px;
  .weapp-name {
    display: flex;
    align-items: center;
    span {
      font-size: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .weapp-title {
    margin: 5px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .weapp-desc {
    width: 100%;
    height: 160px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eee;
    box-sizing: border-box;
    span {
      text-align: center;
    }
  }
  .weapp-bottom {
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: 12px;
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
}
.is-revoke {
  position: absolute;
  width: 15px;
  height: 15px;
  top: -7px;
  right: -5px;
}

pre {
  white-space: nowrap;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
