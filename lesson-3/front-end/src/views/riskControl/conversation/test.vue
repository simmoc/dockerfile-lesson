<template>
    <div class="record">
        <div class="select-date">
            <div class="left">
                <span class="title">日期筛选</span>
                <el-date-picker
                    v-model="selectDate"
                    value-format="YYYY-MM-DD"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                    size="small"
                    @change="changeDate"
                />
            </div>
            <div class="button">
                <el-button type="primary" size="small" @click="refresh">刷新</el-button>
            </div>
        </div>
        <div class="record-content">
            <div class="im-chat-main">
                <!-- message-box 为滚动区域 -->
                <ScrollLoader @scroll-to-top="infinite">
                    <div id="message-box" class="im-chat-main-box messages">
                        <ul>
                            <li v-if="page > 1" class="im-chat-more">
                                <div
                                    v-if="!isLoadedAll"
                                    class="im-chat-more-txt"
                                    style="color: #00c587"
                                    @click="getMessageList"
                                >
                                    加载更多
                                </div>
                                <div v-if="isLoadedAll" class="im-chat-more-txt">
                                    {{ messageList.length == 0 ? '暂无数据' : '没有更多了' }}
                                </div>
                            </li>
                            <li
                                v-for="(item, index) in messageList"
                                :key="index"
                                :class="[
                                    item.from == 'true' && 'im-chat-mine',
                                    'im-chat-' + item.showType
                                ]"
                            >
                                <!-- :class="{ 'im-chat-mine': item.from == 'true' }" -->
                                <!-- 系统信息 -->
                                <template v-if="item.showType === 'system'">
                                    <div v-if="item.msgtype == 'disagree'" class="system-msg">
                                        {{
                                            activeType == 1 ? '对方' : item.name
                                        }}不同意存档会话内容,你将无法继续提供服务
                                    </div>
                                    <div v-if="item.msgtype == 'agree'" class="system-msg">
                                        {{
                                            activeType == 1 ? '对方' : item.name
                                        }}同意存档会话内容,你可以继续提供服务
                                    </div>
                                    <div v-if="item.msgtype == 'revoke'" class="system-msg">
                                        撤回了一条消息
                                    </div>
                                </template>
                                <!-- 非系统消息 -->
                                <template v-else>
                                    <div class="im-chat-user">
                                        <img :src="item.avatar" alt="头像">
                                        <div
                                            v-if="item.from == 'true'"
                                            class="message-info message-info-mine"
                                        >
                                            <i>
                                                <span>{{ item.add_time }}</span>
                                                <span v-if="item.msgtype == 'revoke'">(已撤回)</span>
                                            </i>
                                            <span v-if="item.qw_name">{{ item.qw_name }}</span>
                                        </div>
                                        <div v-if="item.from == 'false'" class="message-info">
                                            <span v-if="item.qw_name">{{ item.qw_name }}</span>
                                            <i>
                                                <span>{{ item.add_time }}</span>
                                                <span v-if="item.msgtype == 'revoke'">(已撤回)</span>
                                            </i>
                                        </div>
                                    </div>
                                    <div class="im-chat-text">
                                        <card :attributes="item" />
                                    </div>
                                </template>
                            </li>
                        </ul>
                    </div>
                </ScrollLoader>
            </div>
        </div>
    </div>
</template>

<script>
// import methodUtil from './methodUtil.js'
// import http from '@/services/api/reach'
import Http from '@/util/request'
import clmessage from './clmessage.js'
import ScrollLoader from './scrollLoader.vue'
import card from './card.vue'
export default {
    name: '',
    components: {
        card,
        ScrollLoader
    },
    props: {
        staffInfo: {
            type: Object,
            default: () => {
                return {}
            }
        },
        activeType: {
            type: String,
            default: () => {
                return ''
            }
        },
        chatInfo: {
            type: Object,
            default: () => {
                return {}
            }
        },
        selectMember: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            selectDate: '',
            messageList: [], // 消息列表
            page: 1, // 页码
            pageSize: 10, // 页面大小
            isLoading: false, // 是否处于加载阶段
            isLoadedAll: false, // 是否加载完成
            typeList: clmessage.typeList,
            pickerOptions: {
                disabledDate(time) {
                    let currentdate = time.getTime()
                    let minTime = Date.now() - 90 * 24 * 60 * 60 * 1000
                    return currentdate > Date.now() || currentdate < minTime
                }
            }
        }
    },
    computed: {
        messageInfo() {
            const { chatInfo, staffInfo } = this
            return {
                chatInfo,
                staffInfo
            }
        }
    },
    watch: {
        messageInfo: {
            handler(val) {
                let { chatInfo, staffInfo } = val
                if (chatInfo.id && staffInfo.id) {
                    console.log('watch---messageInfo')
                    this.getMessageList({ type: 'init' })
                } else {
                    this.initData()
                }
            },
            deep: true
            // immediate: true
        }
    // selectDate(val) {
    //   console.log('selectDate');
    //   this.getMessageList({ type: 'init' })
    //   console.log('日期发生变化', val)
    // }
    },
    created() {
        console.log('msgTypeList', clmessage)
    },
    mounted() {
        this.selectDate = this.selectMember
    },
    methods: {
        changeDate() {
            this.getMessageList({ type: 'init' })
            console.log('日期改变了', this.selectDate)
        },
        refresh() {
            console.log('点击了更新')
            // 初始化数据
            let { chatInfo, staffInfo } = this
            if (chatInfo.id && staffInfo.department_id) {
                this.selectDate = null
                this.getMessageList({ type: 'init' })
            }
        },
        isExecute() {
            let { chatInfo, staffInfo } = this
            let objectId = chatInfo.id // 聊天对象id
            let memberId = staffInfo.department_id // 成员id
            if (!objectId || !memberId) {
                return false
            }
        },
        getMessageList(options = {}) {
            // callback
            console.log('request--->getMessageList')
            if (this.isLoading) {
                return
            }
            this.isLoading = true
            // 判断是否可执行该函数;()memberId/objectId
            this.isExecute()
            // init类型初始化数据;
            let type = options.type
            if (type == 'init') {
                this.initData()
            }
            let { chatInfo, selectDate, staffInfo, page, pageSize } = this
            // 没有选择时
            if (!chatInfo.id || !staffInfo.department_id) {
                return
            }
            // selectDate =  clmessage.getFormatTime(selectDate)
            let params = {
                date: selectDate || '',
                type: chatInfo.chatType, // 1单聊 2群聊
                member_id: staffInfo.department_id, // 成员id
                object_id: chatInfo.id, // 聊天对象id
                page, // 页码
                pageSize // 页数
            }
            Http
                .getMessageList(params)
                .then(res => {
                    let {  total_page, list } = res.data
                    console.log('getMessageList-=============>', list)
                    // 倒叙排列
                    list = list.reverse()
                    list.forEach(ele => {
                        let msgInfo =
                            clmessage.typeList.find(val => {
                                return val.msgtype.indexOf(ele.msgtype) > -1
                            }) || {}
                        let { showType } = msgInfo
                        ele.showType = showType || 'text'
                    })

                    if (type != 'init') {
                        this.messageList = [...list, ...this.messageList]
                    } else {
                        console.log('初始化数据', list)
                        this.messageList = list
                        this.scrollBottom()
                    }
                    // 处理加载
                    this.page = parseInt(this.page) + 1
                    this.isLoading = false
                    console.log('this.page-----this.page', this.page)
                    if (this.page > total_page) {
                        this.isLoadedAll = true
                    }
                    options.callback && options.callback()
                })
                .catch(() => {
                    this.isLoading = false
                    // callback && callback(false)
                })
        },
        scrollBottom() {
            // 滚动到底部
            this.$nextTick(() => {
                setTimeout(() => {
                    new clmessage.AnimationScrollPosition({
                        element: '#scrollLoader-container'
                    })
                }, 100)
            })
        },
        initData() {
            this.page = 1
            this.pageSize = 10
            this.isLoading = false // 是否处于加载阶段
            this.isLoadedAll = false // 是否加载完成
            this.messageList = [] // 置空;
        },
        infinite() {
            // console.log('触顶了', done)
            // if (this.isLoading) {
            //   return
            // }
            // if (this.isLoadedAll) {
            //   done(true)
            //   this.isLoading = false
            //   return
            // }
            // this.getMessageList({
            //   callback: done
            // })
        }
    }
}
</script>

<style scoped lang="scss">
@import './clmessage.scss';
.record {
  display: flex;
  flex-direction: column;
  .select-date {
    display: flex;
    padding: 10px 20px;
    justify-content: space-between;
    .left {
      .title {
        margin-right: 10px;
        font-weight: bold;
      }
    }
  }
  .record-content {
    width: 650px;
    flex: 1;
    height: 580px;
    overflow: hidden auto;
  }
}
</style>
