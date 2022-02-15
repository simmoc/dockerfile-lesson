<template>
    <div>
        <page-main class="page-scroll">
            <div>
                <div>
                    <label class="titleClass">{{ taskDetailData.name }}</label>
                    <el-button v-if="taskDetailData.is_show_button === 1" size="small" class="ml12" @click="goImplement(route.query.id)">查看执行详情</el-button>
                </div>
                <div v-if="taskDetailData.touch_object === 'SINGLE'">
                    <div>
                        <div class="mt16">
                            <label class="textClass">
                                发送对象类型：
                                <span class="content">{{ taskDetailData.touch_object_txt }}</span>
                            </label>
                            <label class="textClass ml32">
                                筛选客户：
                                <span class="content">{{ taskDetailData.receive_type_txt }}</span>
                            </label>
                        </div>
                        <div v-if="taskDetailData.receive_type == '1'" class="mt16 flex flex-align-center">
                            <div class="textClass flex flex-align-center">
                                <div>标签筛选：</div>
                                <div v-if="selectList.length === 0" class="labelBox"> -- </div>
                                <div v-if="selectList.length === 1" class="labelBox">
                                    <customerTag
                                        v-for="item in selectList"
                                        :key="item.tag_group_id"
                                        :left-title="item.tag_group_name"
                                        :right-title="item.name"
                                        :color="item.tag_type === 'HQ' ? '#409eff' : '#FF6F00'"
                                        :customer-style="{ 'margin-bottom': '10px' }"
                                    />
                                </div>
                                <el-popover
                                    v-if="selectList.length > 1"
                                    placement="bottom"
                                    trigger="hover"
                                    popper-class="key-word-pop"
                                    width="542"
                                >
                                    <div class="member-tag-pop">
                                        <customerTag
                                            v-for="item in selectList"
                                            :key="item.tag_group_id"
                                            :left-title="item.tag_group_name"
                                            :right-title="item.name"
                                            :color="
                                                item.tag_type === 'HQ' ? '#409eff' : '#FF6F00'
                                            "
                                            :right-text-break="false"
                                            :right-text-auto="true"
                                        />
                                    </div>
                                    <template #reference>
                                        <div class="flex flex-align-end">
                                            <div>
                                                <customerTag
                                                    :left-title="selectList[0].tag_group_name"
                                                    :right-title="selectList[0].name"
                                                    :color="
                                                        selectList[0].tag_type === 'HQ' ? '#409eff' : '#FF6F00'
                                                    "
                                                    :customer-style="{ 'margin-bottom': 0 }"
                                                />
                                            </div>
                                            <div>...</div>
                                        </div>
                                    </template>
                                </el-popover>
                            </div>
                            <div class="textClass ml32 flex flex-align-center">
                                <div>成员：</div>
                                <div v-if="memberData.length === 0"> -- </div>
                                <div v-else-if="0 < memberData.length && memberData.length <= 3" class="event-list-page">
                                    <span v-for="(item, index) in memberData" :key="index">
                                        <div class="icon-in-td">
                                            <img 
                                                v-if="item.qw_thumb_avatar"
                                                :src="item.qw_thumb_avatar"
                                                :alt="item.qw_thumb_avatar"
                                            >
                                        </div>
                                        <span class="cl-blue member-name">
                                            {{ item.member_name }} / {{ item.parent_name }}
                                        </span>
                                    </span>
                                </div>
                                <el-popover 
                                    v-else
                                    width="400"
                                    trigger="click"
                                >
                                    <memberCheck
                                        :member-data="memberData"
                                    />
                                    <template #reference>
                                        <span class="event-list-page">
                                            <span v-for="(item, index) in memberThree" :key="index">
                                                <div class="icon-in-td">
                                                    <img 
                                                        v-if="item.qw_thumb_avatar"
                                                        :src="item.qw_thumb_avatar"
                                                        :alt="item.qw_thumb_avatar"
                                                    >
                                                </div>
                                                <span class="cl-blue member-name">
                                                    {{ item.member_name }} / {{ item.parent_name }} ...
                                                </span>
                                            </span>
                                        </span>
                                    </template>
                                </el-popover>
                            </div>
                        </div>
                    </div>
                    <div class="mt24">
                        <p class="otherTitleClass">其他信息</p>
                        <div class="mt8 otherTitle flex  flex-direction-column p20">
                            <p class="flex-1 textClass">
                                触达方式：
                                <span class="content">{{ taskDetailData.task_type_txt }}</span>
                            </p>
                            <p class="flex-1 textClass">预估触达客户数：{{ taskDetailData.select_receiver_num - taskDetailData.no_touch_num }}，筛选客户数：{{ taskDetailData.select_receiver_num }}，不可触达数：{{ taskDetailData.no_touch_num }}</p>
                            <div class="flex-1">
                                <label class="textClass">
                                    任务开始时间：
                                    <span class="content">{{ taskDetailData.start_time }}</span>
                                </label>
                                <label class="textClass ml32">
                                    任务截止时间：
                                    <span class="content">{{ taskDetailData.end_time }}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="taskDetailData.touch_object === 'GROUP'">
                    <div>
                        <div class="mt16">
                            <label class="textClass">
                                发送对象类型：
                                <span class="content">{{ taskDetailData.touch_object_txt }}</span>
                            </label>
                            <label class="textClass">
                                筛选客户群：
                                <span class="content">{{ taskDetailData.receive_type_txt }}</span>
                            </label>
                        </div>
                        <div v-if="taskDetailData.receive_type == '1'" class="mt16">
                            <label class="textClass">
                                成员(群主)筛选：
                                <span v-if="0 < memberData.length && memberData.length <= 3" class="event-list-page">
                                    <span v-for="(item, index) in memberData" :key="index">
                                        <div class="icon-in-td">
                                            <img 
                                                v-if="item.qw_thumb_avatar"
                                                :src="item.qw_thumb_avatar"
                                                :alt="item.qw_thumb_avatar"
                                            >
                                        </div>
                                        <span class="cl-blue member-name">
                                            {{ item.member_name }} / {{ item.parent_name }}
                                        </span>
                                    </span>
                                </span>
                                <el-popover 
                                    v-else
                                    width="400"
                                    trigger="click"
                                >
                                    <memberCheck
                                        :member-data="memberData"
                                    />
                                    <template #reference>
                                        <span class="event-list-page">
                                            <span v-for="(item, index) in memberThree" :key="index">
                                                <div class="icon-in-td">
                                                    <img 
                                                        v-if="item.qw_thumb_avatar"
                                                        :src="item.qw_thumb_avatar"
                                                        :alt="item.qw_thumb_avatar"
                                                    >
                                                </div>
                                                <span class="cl-blue member-name">
                                                    {{ item.member_name }} / {{ item.parent_name }} ...
                                                </span>
                                            </span>
                                        </span>
                                    </template>
                                </el-popover>
                            </label>
                        </div>
                    </div>
                    <div class="mt24">
                        <p class="otherTitleClass">其他信息</p>
                        <div class="mt8 otherTitle flex  flex-direction-column p20">
                            <p class="flex-1 textClass">
                                触达方式：
                                <span class="content">{{ taskDetailData.task_type_txt }}</span>
                            </p>
                            <p class="flex-1 textClass">预估触达客户群数：{{ taskDetailData.select_receiver_num - taskDetailData.no_touch_num }}，筛选客户群数：{{ taskDetailData.select_receiver_num }}，不可触达数：{{ taskDetailData.no_touch_num }}</p>
                            <div class="flex-1">
                                <label class="textClass">
                                    任务开始时间：
                                    <span class="content">{{ taskDetailData.start_time }}</span>
                                </label>
                                <label class="textClass ml32">
                                    任务截止时间：
                                    <span class="content">{{ taskDetailData.end_time }}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="taskDetailData.touch_object === 'MOMENTS'">
                    <div>
                        <div class="mt16">
                            <label class="textClass">
                                发送对象类型：
                                <span class="content">{{ taskDetailData.touch_object_txt }}</span>
                            </label>
                            <label class="textClass">
                                筛选客户：
                                <span class="content">{{ taskDetailData.receive_type_txt }}</span>
                            </label>
                        </div>
                    </div>
                    <div v-if="taskDetailData.receive_type == '1'" class="mt16 flex flex-align-center">
                        <div class="textClass flex flex-align-center">
                            <div>标签筛选：</div>
                            <div v-if="selectList.length === 0" class="labelBox"> -- </div>
                            <div v-if="selectList.length === 1" class="labelBox">
                                <customerTag
                                    v-for="item in selectList"
                                    :key="item.tag_group_id"
                                    :left-title="item.tag_group_name"
                                    :right-title="item.name"
                                    :color="item.tag_type === 'HQ' ? '#409eff' : '#FF6F00'"
                                    :customer-style="{ 'margin-bottom': '10px' }"
                                />
                            </div>
                            <el-popover
                                v-if="selectList.length > 1"
                                placement="bottom"
                                trigger="hover"
                                popper-class="key-word-pop"
                                width="542"
                            >
                                <div class="member-tag-pop">
                                    <customerTag
                                        v-for="item in selectList"
                                        :key="item.tag_group_id"
                                        :left-title="item.tag_group_name"
                                        :right-title="item.name"
                                        :color="
                                            item.tag_type === 'HQ' ? '#409eff' : '#FF6F00'
                                        "
                                        :right-text-break="false"
                                        :right-text-auto="true"
                                    />
                                </div>
                                <template #reference>
                                    <div class="flex flex-align-center">
                                        <div class="labelBox">
                                            <customerTag
                                                :left-title="selectList[0].tag_group_name"
                                                :right-title="selectList[0].name"
                                                :color="
                                                    selectList[0].tag_type === 'HQ' ? '#409eff' : '#FF6F00'
                                                "
                                                :customer-style="{ 'margin-bottom': 0 }"
                                            />
                                        </div>
                                        <div>...</div>
                                    </div>
                                </template>
                            </el-popover>
                        </div>
                        <div class="textClass ml32 flex flex-align-center">
                            <div>成员：</div>
                            <div v-if="memberData.length === 0"> -- </div>
                            <div v-else-if="0 < memberData.length && memberData.length <= 3" class="event-list-page">
                                <span v-for="(item, index) in memberData" :key="index">
                                    <div class="icon-in-td">
                                        <img 
                                            v-if="item.qw_thumb_avatar"
                                            :src="item.qw_thumb_avatar"
                                            :alt="item.qw_thumb_avatar"
                                        >
                                    </div>
                                    <span class="cl-blue member-name">
                                        {{ item.member_name }} / {{ item.parent_name }}
                                    </span>
                                </span>
                            </div>
                            <el-popover 
                                v-else
                                width="400"
                                trigger="click"
                            >
                                <memberCheck
                                    :member-data="memberData"
                                />
                                <template #reference>
                                    <span class="event-list-page">
                                        <span v-for="(item, index) in memberThree" :key="index">
                                            <div class="icon-in-td">
                                                <img 
                                                    v-if="item.qw_thumb_avatar"
                                                    :src="item.qw_thumb_avatar"
                                                    :alt="item.qw_thumb_avatar"
                                                >
                                            </div>
                                            <span class="cl-blue member-name">
                                                {{ item.member_name }} / {{ item.parent_name }} ...
                                            </span>
                                        </span>
                                    </span>
                                </template>
                            </el-popover>
                        </div>
                    </div>
                    <div class="mt24">
                        <p class="otherTitleClass">其他信息</p>
                        <div class="mt8 otherTitle flex flex-direction-column p20">
                            <p class="flex-1 textClass">
                                触达方式：
                                <span class="content">{{ taskDetailData.task_type_txt }}</span>
                            </p>
                            <p class="flex-1 textClass">预估触达客户数：{{ taskDetailData.select_receiver_num - taskDetailData.no_touch_num }}，筛选客户数：{{ taskDetailData.select_receiver_num }}，不可触达数：{{ taskDetailData.no_touch_num }}</p>
                            <div class="flex-1">
                                <label class="textClass">
                                    任务开始时间：
                                    <span class="content">{{ taskDetailData.start_time }}</span>
                                </label>
                                <label class="textClass ml32">
                                    任务截止时间：
                                    <span class="content">{{ taskDetailData.end_time }}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt24 search-head-wrap">
                    <label class="otherTitleClass">消息内容</label>
                    <div>
                        <CustomerMediaList
                            :list="content_arr"
                            :check-list="true"
                        />
                    </div>
                </div>
            </div>
        </page-main>
    </div>
</template>

<script setup>
import http from '@/util/request'
import moment from 'moment'
import { useRouter, useRoute } from 'vue-router'
import CustomerMediaList from '@/components/CustomerMediaList/index.vue'
import memberCheck from './compontent/memberCheck.vue'
import { onMounted } from 'vue'

const router = useRouter()
const route = useRoute()
// 每周频率时间
const repeatDate = ref([])
const weekDate = ref('')
const content_arr = ref([])
const taskDetailData = ref({})
// 成员数据
const memberData = ref([])
// 成员数量大于三出省略号点击
const memberThree = ref([])
// 回显Tag数据
const selectList = ref ([])
function goImplement(id) {
    // 只有执行中、已结束状态任务可以看到按钮，点击跳转
    router.push({
        name: 'ImplementDetail',
        query: {
            id: id,
            is_repeat: taskDetailData.value.is_repeat
        }
    })
}
onMounted(() => {
    manualDetailInfo(route.query.id)
})
// 获取手工详情数据
const manualDetailInfo = async id => {
    let { data } = await http.handEditOrDetailTask({ id })
    taskDetailData.value = data
    console.log('taskDetailData.value', taskDetailData.value)

    if (JSON.stringify(taskDetailData.value.receive_group) != '[]') {
        if (taskDetailData.value.receive_group[0].tag_arr) {
            selectList.value = taskDetailData.value.receive_group[0].tag_arr
        }
        if (taskDetailData.value.receive_group[0].select_members_info) {
            memberData.value = taskDetailData.value.receive_group[0].select_members_info
            if (memberData.value.length > 3) {
                memberThree.value = memberData.value.slice(0, 3)
            }
        }
    }

    // 处理知识内容数据
    content_arr.value = mediaResFormat(data)

    // 时间戳格式处理
    getWeek(taskDetailData.value.start_time)
    taskDetailData.value.start_time = moment(taskDetailData.value.start_time).format(`MM-DD ${weekDate.value} HH:mm`)
    getWeek(taskDetailData.value.end_time)
    taskDetailData.value.end_time = moment(taskDetailData.value.end_time).format(`MM-DD ${weekDate.value} HH:mm`)

    // 任务重复至时间
    getWeek(taskDetailData.value.repeat_deadline)
    taskDetailData.value.repeat_deadline = moment(taskDetailData.value.repeat_deadline).format(`MM-DD ${weekDate.value} HH:mm`)

    if (JSON.stringify(taskDetailData.value.repeat_node) != 'null') {
        // console.log(131545444)
        repeatWeek(taskDetailData.value.repeat_node)
    }
}
// 处理接口知识内容数据
const mediaResFormat = response => {
    // let content = ''
    let mediaList = []
    // 回显文字内容
    if (response.content) {
        let obj = {
            type: 'TEXT',
            content: response.content
        }
        mediaList.push(obj)
    }
    // 媒体内容回显
    // if (!response.annex_content_json[0]) return
            
    // console.log('处理前数据', response.annex_content_json)
    if (response.annex_content_json && response.annex_content_json.length) {
        let arr = response.annex_content_json
        // list.forEach((item, index) => {
        for (let i = 0; i < arr.length; i++) {
            let newItem = {}
            let urlArr = ''
            switch (arr[i].type) {
                case 'images':
                    newItem.type = 'IMAGE'
                    newItem.file_id = arr[i].source_id
                    newItem.sort = i
                    newItem.file_url = arr[i].upload_url
                    break
                case 'web_page':
                    newItem.type = 'LINK'
                    newItem.sort = i
                    newItem.file_id = arr[i].source_id
                    newItem.qw_link_title = arr[i].title
                    newItem.file_url = arr[i].upload_url
                    newItem.qw_link_desc = arr[i].description
                    // 链接回显
                    urlArr = arr[i].url.split('://')
                    newItem.qw_link_url = urlArr[1]
                    newItem.url = urlArr[0] + '://'
                    break
                case 'we_applets':
                    newItem.type = 'MINIPROGRAM'
                    newItem.sort = i
                    newItem.file_id = arr[i].source_id
                    newItem.qw_miniprogram_title = arr[i].title
                    newItem.qw_miniprogram_appid = arr[i].appid
                    newItem.qw_miniprogram_page = arr[i].url
                    newItem.file_url = arr[i].upload_url
                    break
                case 'video':
                    newItem.sort = i
                    newItem.type = 'VIDEO'
                    newItem.file_id = arr[i].source_id
                    newItem.title = arr[i].title || ''
                    newItem.file_url = arr[i].media_url 
                    break
                case 'FILE':
                    newItem = arr[i]
                    break
            }
            mediaList.push(newItem)
        }
    }
    console.log('回显数据', mediaList)
    // return Promise.resolve({ content: content, mediaList: mediaList })
    return mediaList
}
// moment插件返回周几时间戳错误，重新处理
function getWeek(date) {
    let week = moment(date).day()
    switch (week) {
        case 1:
            return weekDate.value = '周一'
        case 2:
            return weekDate.value = '周二'
        case 3:
            return weekDate.value = '周三'
        case 4:
            return weekDate.value = '周四'
        case 5:
            return weekDate.value = '周五'
        case 6:
            return weekDate.value = '周六'
        case 0:
            return weekDate.value = '周日'
    }
}
// 详情返回每周的频率
function repeatWeek(date) {
    let week = date
    // console.log('week', date)
    let day = []
    week.forEach(element => {
        switch (element) {
            case '1':
                return day.push('星期一')
            case '2':
                return day.push('星期二')
            case '3':
                return day.push('星期三')
            case '4':
                return day.push('星期四')
            case '5':
                return day.push('星期五')
            case '6':
                return day.push('星期六')
            case '7':
                return day.push('星期日')
            default:
                return day.push(element)
        } 
    })
    repeatDate.value = day.join('; ')
    console.log('week', repeatDate.value, repeatDate.value.length)
}
</script>

<style scoped lang="scss">
.page-scroll {
    min-height: calc(100vh - 144px) !important;
    height: calc(100vh - 144px) !important;
    overflow-y: auto;
}
.labelBox {
    display: inline-block;
}

.search-head-wrap {
    width: 520px;
}
.titleClass {
    color: #000000;
    font-weight: 500;
    font-size: 18px;
}
.otherTitleClass {
    color: #000000;
    font-weight: 500;
    font-size: 16px;
}
.otherTitle {
    width: 520px;
    height: 128px;
    border:1px solid #FAFAFA;
    background-color: #FAFAFA;
}
.textClass {
    color: #171717;
}
.content{
    width: 70px;
    height: 18px;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    color: #4a4a4a;
}
.event-list-page {
    .cl-blue {
      color: #409eff;
      cursor: pointer;
  
      &:hover {
      }
    }
  
    .icon-in-td {
      width: 22px;
      height: 22px;
      text-align: center;
      display: inline-block;
      margin-right: 9px;
  
      img {
        width: 100%;
      }
    }
}
.member-name {
    display: inline-block;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #409eff;
    vertical-align: middle;
  }
</style>