<template>
    <div class="member">
        <div class="filter">
            <el-input
                v-model="selectName"
                placeholder="请输入名称"
                clearable
                @clear="clearMember"
            >
                <template #append>
                    <el-button
                        icon="el-icon-search"
                        @click="searchNumber"
                    />
                </template>
            </el-input>
        </div>
        <el-tabs v-model="activeType" @tab-click="handleClick">
            <el-tab-pane label="客户" name="1">
                <template v-if="customInfo.customLists.length === 0">
                    <!-- noSearchMsg -->
                    <div class="no-msg">
                        {{
                            currentModel === 'default'
                                ? customInfo.nomsg
                                : customInfo.noSearchMsg
                        }}
                    </div>
                </template>
                <template v-if="customInfo.customLists.length > 0">
                    <div class="custom-list info-list">
                        <div
                            v-for="(item, index) of customInfo.customLists"
                            :key="index"
                            class="custom-item"
                            @click="selectNumber(item, 1)"
                        >
                            <div class="avar-img">
                                <img :src="item.avatar" alt="">
                            </div>
                            <div class="right">
                                <div class="name">
                                    <span>{{ item.name }}</span>
                                    <span :class="['company-name' + item.type]">
                                        {{ item.companyName }}
                                    </span>
                                </div>
                                <div v-show="item.time" class="time">
                                    添加时间{{ item.time }}
                                </div>
                            </div>
                        </div>
                        <div v-if="page > 1" class="custom-item-more">
                            <div
                                v-if="!isLoadAll"
                                class="load-more"
                                @click="getCustomList('concat')"
                            >
                                加载更多
                            </div>
                            <div v-if="isLoadAll" class="load-more">没有更多了</div>
                        </div>
                    </div>
                </template>
            </el-tab-pane>
            <el-tab-pane label="成员" name="0">
                <template v-if="memberInfo.memberList.length === 0">
                    <div class="no-msg">
                        {{
                            currentModel === 'default'
                                ? memberInfo.nomsg
                                : memberInfo.noSearchMsg
                        }}
                    </div>
                </template>
                <template v-else>
                    <div class="custom-list info-list">
                        <div
                            v-for="(item, index) of memberInfo.memberList"
                            :key="index"
                            class="custom-item"
                            @click="selectNumber(item, 1)"
                        >
                            <div class="avar-img">
                                <img :src="item.avatar" alt="">
                            </div>
                            <div class="right">
                                <div v-if="item.name" class="name">{{ item.name }}</div>
                                <!-- <div class="time" v-if="item.time">{{ item.time }}</div> -->
                            </div>
                        </div>
                        <div v-if="page > 1" class="custom-item-more">
                            <div
                                v-if="!isLoadAll"
                                class="load-more"
                                @click="getCustomList('concat')"
                            >
                                加载更多
                            </div>
                            <div v-if="isLoadAll" class="load-more">没有更多了</div>
                        </div>
                    </div>
                </template>
            </el-tab-pane>
            <el-tab-pane label="群聊" name="2">
                <template v-if="groupInfo.groupList.length === 0">
                    <div class="no-msg">
                        {{
                            currentModel === 'default'
                                ? groupInfo.nomsg
                                : groupInfo.noSearchMsg
                        }}
                    </div>
                </template>
                <template v-else>
                    <div class="custom-list info-list">
                        <div
                            v-for="(item, index) of groupInfo.groupList"
                            :key="index"
                            class="custom-item"
                            @click="selectNumber(item, 2)"
                        >
                            <!-- <div class="avar-img"></div> -->
                            <div class="right">
                                <div v-if="item.name" class="name">{{ item.name }}</div>
                                <div v-if="item.time" class="time">创建时间{{ item.time }}</div>
                            </div>
                        </div>
                        <div v-if="page > 1" class="custom-item-more">
                            <div
                                v-if="!isLoadAll"
                                class="load-more"
                                @click="getCustomList('concat')"
                            >
                                加载更多
                            </div>
                            <div v-if="isLoadAll" class="load-more">没有更多了</div>
                        </div>
                    </div>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
// import methodUtil from './methodUtil.js'
// import http from '@/services/api/reach'
import Http from '@/util/request'
import { ElMessage } from 'element-plus'
export default {
    name: '',
    props: {
        staffInfo: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    emits: ['selectChat', 'selectNumber'],
    data() {
        return {
            page: 1, // 页码;
            isLoadAll: false, // 是否加载完数据
            isloading: false,
            currentModel: 'default', // 正常模式,搜索模式
            selectName: '',
            activeType: '1', // 1-客户 0-成员 2-群聊
            customInfo: {
                nomsg: '该成员未添加外部客户',
                noSearchMsg: '未搜索到客户',
                customLists: []
            }, // 客户信息,
            memberInfo: {
                nomsg: '该成员暂未加成员',
                noSearchMsg: '未搜索到成员',
                memberList: []
            }, //
            groupInfo: {
                nomsg: '该成员无创建群聊',
                noSearchMsg: '未搜索到群聊',
                groupList: []
            }, // 群聊
            typeDataInfo: {
                1: {
                    name: 'customInfo',
                    list: 'customLists'
                },
                0: {
                    name: 'memberInfo',
                    list: 'memberList'
                },
                2: {
                    name: 'groupInfo',
                    list: 'groupList'
                }
            }
        }
    },
    watch: {
        staffInfo: {
            handler(val) {
                console.log('员工信息发生变化', val)
                if (val.department_id) {
                    this.activeType = '1'
                    this.initMember()
                    this.getCustomList() // 获取用户列表
                }
            },
            immediate: true,
            deep: true
        },
        activeType: {
            handler(val) {
                this.$parent.activeType = val
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        initMember() {
            console.log('initMember', 1111111)
            this.page = 1
            // this.activeType = "1";
            this.isloading = false
            this.isLoadAll = false
            this.customInfo.customLists = []
            this.memberInfo.memberList = []
            this.groupInfo.groupList = []
            // this.$set(this.customInfo, 'customLists', [])
            // this.$set(this.memberInfo, 'memberList', [])
            // this.$set(this.groupInfo, 'groupList', [])
        },
        handleClick() {
            console.log('切换tab')
            this.selectName = ''
            this.initMember()
            this.getCustomList()
            // this.$emit('selectChat', {})
            // console.log(tab, event, this.activeType)
        },
        // 搜索成员
        searchNumber() {
            this.initMember()
            this.getCustomList()
            console.log('selectName', this.selectName)
        },
        // 获取成员列表;
        getCustomList(type) {
            let { activeType, selectName, staffInfo, page } = this
            if (!staffInfo.department_id) {
                return false
            }
            if (this.isloading) {
                return
            }
            this.isloading = true
            let params = {
                page,
                id: (staffInfo && staffInfo.department_id) || '',
                type: activeType,
                keyword: selectName
            }
            console.log('getCustomList', params)
            Http
                .getCustomList(params)
                .then(res => {
                    this.currentModel = selectName ? 'search' : 'default'
                    let { list, total_page } = res.data
                    console.log('当前的列表数据', res)
                    list.forEach(ele => {
                        // let { type, corp_name, qw_create_time } = ele
                        if (ele.type) {
                            ele.companyName = ele.type == 1 ? '@微信' : `@${ele.corp_name}`
                        }
                        ele.time = this.getFormatTime(ele.qw_create_time)
                    })
                    this.page++
                    this.isloading = false
                    console.log('this.page', this.page)
                    if (this.page > total_page) {
                        this.isLoadAll = true
                    }
                    let dataInfo = this.typeDataInfo[activeType]
                    console.log(dataInfo)
                    let oldData = this[dataInfo.name][dataInfo.list]
                    if (type == 'concat') {
                        this[dataInfo.name][dataInfo.list] = [...oldData, ...list]
                    } else {
                        this[dataInfo.name][dataInfo.list] = list
                    }
                })
                .catch(() => {
                    this.isloading = false
                    if (activeType === '1') {
                        this.customInfo.customLists = []
                    } else if (activeType === '0') {
                        this.memberInfo.memberList = []
                    } else if (activeType === '2') {
                        this.groupInfo.groupList = []
                    }
                    ElMessage.error('本功能需要开通成员会话存档，请联系企业微信管理员帮助你完成会话存档开启')
                })
        },
        clearMember() {
            this.selectName = ''
            this.initMember()
            this.getCustomList()
            console.log('清空了input数据')
        },
        // 选择群聊;
        selectNumber(item, chatType) {
            // methodUtil.$emit('selectNumber')
            this.$emit('selectNumber')
            this.$emit('selectChat', {
                ...item,
                chatType
            })
        },
        getFormatTime(time) {
            if (!time) {
                return ''
            }
            let datatime = parseInt(`${time}000`)
            let date = new Date(datatime)
            var year = date.getFullYear() // 获取系统的年；
            var month = date.getMonth() + 1 // 获取系统月份，由于月份是从0开始计算，所以要加1
            var day = date.getDate() // 获取系统日
            var hour = date.getHours() // 获取系统时间
            var minute = date.getMinutes() // 分
            var second = date.getSeconds() // 秒
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`
        }
    }
}
</script>

<style scoped lang="scss">
.filter {
  margin-bottom: 10px;
}
.custom-list {
  height: 450px;
  overflow: auto;
  .custom-item {
    padding: 10px 0px;
    display: flex;
    cursor: pointer;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .name {
      font-size: inherit;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .avar-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
      // background-color: aqua;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .right {
      width: 100%;
      min-height: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .company-name1 {
          color: #5ec75d;
        }
        .company-name2 {
          color: #eda15b;
        }
      }
      .time {
        font-size: inherit;
      }
    }
  }
  .custom-item-more {
    display: flex;
    justify-content: center;
    .load-more {
      text-align: center;
      padding: 10px 20px;
      cursor: pointer;
    }
  }
}
</style>
