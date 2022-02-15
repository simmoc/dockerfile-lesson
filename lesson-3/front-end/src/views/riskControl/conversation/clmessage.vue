<template>
    <div class="record">
        <div class="select-date">
            <div class="left">
                <span class="title">日期筛选</span>
                <el-date-picker
                    v-model="selectDate"
                    type="date"
                    placeholder="选择日期"
                />
            </div>
            <div class="button">
                <el-button type="primary" @click="refresh">刷新</el-button>
            </div>
        </div>
        <div class="record-content">
            <div class="record-item" />
        </div>
    </div>
</template>

<script>
import Http from '@/util/request'
// import msgTypeList from './clmessage.js'
// import clmessage from './clmessage.js'
export default {
    name: '',
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
        }
    },
    data() {
        return {
            selectDate: '',
            chatLists: [], // 聊天数据
            page: 1, // 页码
            pageSize: 10 // 页数
        }
    },
    watch: {
        chatInfo: {
            handler(val) {
                console.log('val----chatInfo', val)
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        // console.log('msgTypeList', clmessage)
    },
    methods: {
        refresh() {
            console.log('点击了更新')
            this.getMessageList()
        },
        getMessageList() {
            let { chatInfo, selectDate, staffInfo, page, pageSize } = this
            let params = {
                date: selectDate,
                type: chatInfo.chatType, // 1单聊 2群聊
                memberId: staffInfo.department_id, // 成员id
                objectId: chatInfo.id, // 聊天对象id
                page, // 页码
                pageSize // 页数
            }
            Http
                .getCustomList(params)
                .then(res => {
                    console.log('getMessageList-getMessageList', res)
                })
                .catch(error => {
                    console.log('getMessageList-getMessageList====>error', error)
                })
        }
    }
}
</script>

<style scoped lang="scss">
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
    flex: 1;
    .record-item {
    }
  }
}
</style>
