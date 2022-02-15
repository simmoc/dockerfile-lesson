<template>
    <div>
        <page-main class="page-scroll">
            <el-row class="flex">
                <!-- 日历 -->
                <el-col :span="17">
                    <div class="calendar-class">
                        <div id="calendar" />
                    </div>
                </el-col>

                <!-- 任务总览 -->
                <el-col class="task-check pl24" :span="7">
                    <div class="mb24 btn-class">
                        <!-- <el-button type="primary" size="small" @click="goManualTask">
                            <i class="el-icon-plus mr10" />
                            新建手工任务
                        </el-button> -->
                        <div class="flex flex-justify-center">
                            <el-button size="small" class="ml12" :loading="refreshLoad" @click="onRefresh(activeName, true)">
                                <div v-if="!refreshLoad" class="flex flex-align-center">
                                    <img 
                                        :src="getImageUrl('taskRefresh')" 
                                        class="mr8" 
                                        style="width: 12px; height: 12px" 
                                    >
                                    <!-- <span>刷新</span> -->
                                    <span>刷新</span>
                                </div>
                                <span v-else>刷新</span>
                            </el-button>
                            <el-button type="primary" size="small" @click="goPlanTask">
                                <i class="el-icon-plus mr10" />
                                新建计划任务
                            </el-button>
                        </div>
                    </div>
                    <div class="tab-class">
                        <div class="tab-title pt16 pl16">
                            <span class="tab-text">任务总览</span>
                        </div>
                        <div>
                            <el-tabs v-model="activeName" class="el-tabs-button calendar-tab" @tab-click="switchTab(activeName, true)">
                                <el-tab-pane label="执行中" name="1">
                                    <template #label>
                                        <div class="tc tab-switch">
                                            <i class="el-icon-video-pause mr4" />
                                            <span>执行中</span>
                                        </div>
                                    </template>
                                    <div v-if="tabsListData.length !== 0" class="scroll-bar">
                                        <div v-for="item in tabsListData" :key="item.id" class="tab-content m8 pl16 pt10 pb10 pr16 flex flex-justify-between flex-align-center">
                                            <div>
                                                <div class="content-title mb8 pointer" @click="goDetail(item.id)">{{ item.name }}</div>
                                                <div class="flex flex-align-center mr14 mb4 flex-justify-between">
                                                    <div class="flex-1 flex flex-align-center">
                                                        <img 
                                                            :src="getImageUrl('taskStatus')" 
                                                            class="mr6"
                                                            style="width: 16px; height: 16px" 
                                                        >
                                                        <span class="content-test">任务状态：</span>
                                                        <div v-if="item.task_send_status === 1" class="flex flex-align-center">
                                                            <div class="status-circle-zero mr8" />
                                                            <div class="content-clock">下发中</div>
                                                        </div>
                                                        <div v-else class="flex flex-align-center">
                                                            <div class="status-circle-one mr8" />
                                                            <div class="content-clock">已下发</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span class="el-icon-time mr6" />
                                                    <span class="content-test">
                                                        截止时间：
                                                    </span>
                                                    <span class="content-clock">
                                                        {{ item.task_end_time }}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="flex flex-align-center">
                                                <span class="el-icon-circle-close pointer" @click="stopTaskList(item.id)" />
                                                <img 
                                                    :src="getImageUrl('goImplement')" 
                                                    class="ml8 img-class pointer" 
                                                    @click="goImplement(item.id)"
                                                >
                                            </div>
                                        </div>
                                        <div v-if="tabsListData.length % 10 === 0" class="loadMore pointer">
                                            <span @click="loadMore(activeName)">点击加载更多</span>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <NoData>
                                            <template #content>
                                                <div>暂无数据!</div>
                                            </template>
                                        </NoData>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="未开始" name="0">
                                    <template #label>
                                        <div class="tc tab-switch">
                                            <i class="el-icon-time mr6" />
                                            <span>未开始</span>
                                        </div>
                                    </template>
                                    <div v-if="tabsListData.length !== 0" class="scroll-bar">
                                        <div v-for="item in tabsListData" :key="item.id" class="tab-content m8 pl16 pr16 pt10 pb10 flex flex-justify-between flex-align-center">
                                            <div>
                                                <div class="content-title">{{ item.name }}</div>
                                                <div class="flex flex-align-center">
                                                    <span class="el-icon-time mr6" />
                                                    <span class="content-test">
                                                        开始时间：
                                                    </span>
                                                    <span class="content-clock">
                                                        {{ item.task_start_time }}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="flex flex-align-center mr14">
                                                <span class="el-icon-edit-outline pointer" @click="editManualTask(item.id)" />
                                                <span class="el-icon-delete ml8 pointer" @click="deleteTask(item.id)" />
                                            </div>
                                        </div>
                                        <div v-if="tabsListData.length % 10 === 0" class="loadMore pointer">
                                            <span @click="loadMore(activeName)">点击加载更多</span>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <NoData>
                                            <template #content>
                                                <div>暂无数据!</div>
                                            </template>
                                        </NoData>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="已结束" name="2">
                                    <template #label>
                                        <div class="tc tab-switch">
                                            <i class="el-icon-tickets mr7" />
                                            <span>已结束</span>
                                        </div>
                                    </template>
                                    <div v-if="tabsListData.length !== 0" class="scroll-bar">
                                        <div v-for="item in tabsListData" :key="item.id" class="tab-content m8 pl16 pr16 pt10 pb10 flex flex-justify-between">
                                            <div>
                                                <div class="content-title">{{ item.name }}</div>
                                                <div>
                                                    <span class="el-icon-time" />
                                                    <span class="content-test">
                                                        结束时间：
                                                    </span>
                                                    <span class="content-clock">
                                                        {{ item.task_end_time }}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="flex flex-align-center mr14">
                                                <img 
                                                    :src="getImageUrl('goImplement')" 
                                                    class="img-class pointer" 
                                                    @click="goImplement(item.id)"
                                                >
                                                <!-- <span class="el-icon-connection" @click="goImplement(item.id)" /> -->
                                            </div>
                                        </div>
                                        <div v-if="tabsListData.length % 10 === 0" class="loadMore pointer">
                                            <span @click="loadMore(activeName)">点击加载更多</span>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <NoData>
                                            <template #content>
                                                <div>暂无数据!</div>
                                            </template>
                                        </NoData>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </page-main>
        <!-- 删除任务 -->
        <calendarDialog title="提示" :dialog-button="dialogButton" :dialog-stop="dialogStop" :dialog-visible="dialogIsDelete" width="450px" :confirm-fn="()=>delTaskTabsDel(sale_script_id)" :confirm-fn-type="()=>delTaskTabsTypeDel(sale_script_id)" @cancel="dialogIsDelete = false">
            <div v-if="tabsListData[listIndex].is_repeat == '0'" class="group_name">确认删除该任务?</div>
            <div v-if="tabsListData[listIndex].is_repeat == '1'" class="group_name">这是一个重复的任务，确认删除后将同时删除以后的重复任务?</div>
        </calendarDialog>
        <!-- 终止任务 -->
        <calendarDialog title="提示" :dialog-stop="dialogStop" :dialog-button="dialogButton" :dialog-visible="dialogIsStop" width="450px" :confirm-fn="()=>delTaskTabsDel(sale_script_id)" :confirm-fn-type="()=>delTaskTabsTypeDel(sale_script_id)" @cancel="dialogIsStop = false">
            <div v-if="tabsListData[listIndex].is_repeat == '0'" class="group_name">是否终止当前任务?</div>
            <div v-if="tabsListData[listIndex].is_repeat == '1'" class="group_name">这是一个重复的任务，确认终止后将同时终止以后的重复任务?</div>
        </calendarDialog>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Http from '@/util/request'
import moment from 'moment'
import { ElMessage } from 'element-plus'
import '@fullcalendar/core/vdom'
import calendarDialog from '@/views/marketing/task/compontent/calendarDialog.vue'
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import cnLocale from '@fullcalendar/core/locales/zh-cn'
import { onMounted, ref } from 'vue'
const router = useRouter()
// 表明切换状态
const activeName = ref('1')
const sale_script_id = ref('')
// 是否展示‘终止的三个按钮’弹出框
const dialogStop = ref(true)
// 是否展示终止弹出框
const dialogIsStop = ref(false)
// 是否展示删除弹出框
const dialogIsDelete = ref(false)
// 是否展示‘确定/取消’弹出框
const dialogButton = ref(false)
// 获取list下标
const listIndex = ref(0)
// 刷新按钮loading效果
const refreshLoad = ref(false)
// 删除为true，终止为false,判断接口所选
const dialogStopOrDelete = ref(false)
const tabsForm = ref({
    page: '1',
    page_size: '10'
})
const startTime = ref('')
const endTime = ref('')
const task_type = ref('1,2,3,4,5')
let calendarOptions = {
    height: 'auto',
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    locale: cnLocale,
    themeSystem: 'standard',
    views: {
        timeGrid: {
            slotLabelFormat: {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }
        }

    },

    dayHeaderFormat: {
        weekday: 'long'
    },
    customButtons: {
        // date_title: {
        //     text: moment().format('yyyy-MM-DD')
        // },
        prev_custom: {
            icon: 'chevron-left',
            click: () => {
                calendar.value.prev()
                // console.log('上一页', calendar.value.currentData, calendar.value.currentData.currentDate)
                
                startTime.value = showStartTime(calendar.value.currentData.currentDate)
                endTime.value = showEndTime(calendar.value.currentData.currentDate)
                // handleStatus('1', true)
                getTaskList()
            }
        },
        next_custom: {
            icon: 'chevron-right',
            click: () => {
                calendar.value.next()
                // console.log('下一页', calendar.value.currentData.currentDate)
                startTime.value = showStartTime(calendar.value.currentData.currentDate)
                endTime.value = showEndTime(calendar.value.currentData.currentDate)
                // handleStatus('1', true)
                getTaskList()
            }
        },
        // 自定义回到今天按钮
        today_customer: {
            text: '定位到今天',
            click: () => {
                calendar.value.today()
                startTime.value = showStartTime(calendar.value.currentData.currentDate)
                endTime.value = showEndTime(calendar.value.currentData.currentDate)
                getTaskList()
            }
        },
        task_type_qyqunfa: {
            text: '企业群发',
            click: function() {
                task_type.value = '3'
            }
        },
        // task_type_cyqunfa: {
        //     text: '成员群发',
        //     click: function() {
        //         task_type.value = '2'
        //     }
        // },
        task_type_cydanfa: {
            text: '成员单发',
            click: function() {
                task_type.value = '1'
            }
        },
        task_type_pyq: {
            text: '朋友圈',
            click: function() {
                task_type.value = '4,5'
            }
        }
    },
    buttonText: {
        today: '定位到今天'
    },
    headerToolbar: {
        left: 'prev_custom,title,next_custom today_customer',
        right: 'task_type_qyqunfa,task_type_cydanfa,task_type_pyq dayGridMonth,timeGridWeek'
    },
    dayMaxEventRows: 3,
    events: [],
    moreLinkClassNames: 'check-more-task',
    moreLinkContent: ' 查看更多任务...',
    displayEventTime: false,
    allDayDefault: false,
    nextDayThreshold: '01:00:00',
    eventClick: function(info) {
        // console.log('infoinfo', info.event._def.extendedProps.task_property)
        // if (info.event._def.extendedProps.task_property === 'HAND') {
        //     router.push({
        //         name: 'manualDetail',
        //         query: {
        //             title: '手工任务详情',
        //             id: info.event.id
        //         }
        //     })
        // } else {
        router.push({
            name: 'planDetail',
            query: {
                title: '计划任务详情',
                id: info.event.id
            }
        })
        // }
    }
}
const tabsListData = ref([])
const eventList = ref([])
const addListener = ref(null)
const calendar = ref(null)
onBeforeUnmount(() => {
    addListener.value = null
})
onMounted(() => {
    startTime.value = showStartTime()
    endTime.value = showEndTime()
    const calendarEl = document.getElementById('calendar')// 获取这个节点
    calendar.value = new Calendar(calendarEl, calendarOptions)
    calendar.value.render()

    // var calendar = new Calendar(calendarEl, calendarOptions)
    // calendar.render()
    handleStatus('1', true)
    getTaskList(true)

    // calendarEl.addEventListener('resize', e => {
    //     console.log('eeeee', e)
    //     var calendar = new Calendar(calendarEl, calendarOptions)
    //     calendar.render()
    // })
})
function renderCal() {
    const calendarEl = document.getElementById('calendar')// 获取这个节点
    calendarOptions.events = eventList.value
    calendar.value = new Calendar(calendarEl, calendarOptions)
    calendar.value.render()
    // 解决第一次渲染时 ，日历组件宽度计算错误问题
    setTimeout(() => {
        calendar.value.today()
    }, 500)
    // var calendar = new Calendar(calendarEl, calendarOptions)
    // calendar.render()
}
// 获取切图
function getImageUrl(name) {
    return new URL(`../../../assets/images/calendarTask/${name}.svg`, import.meta.url).href
}
// 页面刷新
const onRefresh = (e, more) => {
    refreshLoad.value = true
    document.querySelectorAll('.scroll-bar').forEach(element => {
        element.scrollTop = 0
    })
    switchTab(e, more)
}
// 切换Tab函数
const switchTab = (e, more) => {
    tabsForm.value.page = 1 
    handleStatus(e, more)
}

// tablist接口
// 请求任务列表（右边）
const handleStatus = async(e, more) => {
    let res = await Http.taskTabList({
        execute_status: e,
        page: tabsForm.value.page,
        page_size: tabsForm.value.page_size
    })
    let taskList = res.data.list
    if (more) {
        tabsListData.value = taskList || []
    } else {
        taskList.forEach(element => {
            tabsListData.value.push(element)
        })
    }
    if (res.code === 200) {
        refreshLoad.value = false
    }
    // // console.log('tabsListData', tabsListData.value)
    // let ret = await Http.calendarData({
    //     // start_time: showStartTime(),
    //     // end_time: showEndTime(),
    //     start_time: startTime.value,
    //     end_time: endTime.value,
    //     type: task_type.value
    // })
    // if (eventList.value.length > 0) {
    //     eventList.value = []
    // }
    // ret.data.forEach(e => {
    //     // console.log('eeeee', e)
    //     let all_day_bool = ((moment(e.end_time).unix() - 1) - (moment(e.start_time).unix() - 1)) <= 86400
    //     var event = {
    //         id: e.id,
    //         title: e.name,
    //         start: moment(e.start_time).format('yyyy-MM-DD HH:mm:ss'),
    //         end: moment(e.end_time).format('yyyy-MM-DD HH:mm:ss'),
    //         extendedProps: {
    //             task_type: e.task_type,
    //             task_property: e.task_property,
    //             execute_status: e.execute_status
    //         },
    //         backgroundColor: getTaskBackground(e.task_type, e.execute_status),
    //         borderColor: '#ffffff',
    //         textColor: e.execute_status == '2' ? '#262626' : '#ffffff',
    //         allDay: all_day_bool
    //     }
    //     eventList.value.push(event)
    // })
    // console.log('events', eventList.value)
    // console.log('tabsListData', tabsListData.value)
    // calendar.value.addEventSource(eventList.value)
    // renderCal()
}

// 请求任务列表（日历）isMounted： 是否是初始化
async function getTaskList(isMounted) {
    let ret = await Http.calendarData({
        // start_time: showStartTime(),
        // end_time: showEndTime(),
        start_time: startTime.value,
        end_time: endTime.value,
        type: task_type.value
    })
    if (eventList.value.length > 0) {
        // 清除之前的任务， 防止任务叠加
        eventList.value.forEach(item => {
            let event =  calendar.value.getEventById(item.id)
            event.remove()
        })
        eventList.value = []
    }
    ret.data.forEach(e => {
        // console.log('eeeee', e)
        let all_day_bool = ((moment(e.end_time).unix() - 1) - (moment(e.start_time).unix() - 1)) <= 86400
        var event = {
            id: e.id,
            title: e.name,
            start: moment(e.start_time).format('yyyy-MM-DD HH:mm:ss'),
            end: moment(e.end_time).format('yyyy-MM-DD HH:mm:ss'),
            extendedProps: {
                task_type: e.task_type,
                task_property: e.task_property,
                execute_status: e.execute_status
            },
            backgroundColor: getTaskBackground(e.task_type, e.execute_status),
            borderColor: '#ffffff',
            textColor: e.execute_status == '2' ? '#262626' : '#ffffff',
            allDay: all_day_bool
        }
        eventList.value.push(event)
    })
    if (isMounted) {
        renderCal()
    } else {
        calendar.value.addEventSource(eventList.value)
    }
}
function getTaskBackground(type, status) {
    let color = ''
    switch (type) {
        case '1':
            // 成员单发
            if (status != '2') {
                color = '#00c657'
            } else {
                color = '#A0FABB'
            }
            break
        // case '2':
        //     // 成员群发
        //     color = '#ff6f00'
        //     break
        case '3':
            // 企业群发
            if (status != '2') {
                color = '#1773fa'
            } else {
                color = '#BADFFF'
            }
            break
        case '4':
            // 企业群发到朋友圈
            if (status != '2') {
                color = '#ffbe00'
            } else {
                color = '#fff4a3'
            }
            break
        case '5':
            // 成员群发到朋友圈
            if (status != '2') {
                color = '#ffbe00'
            } else {
                color = '#fff4a3'
            }
            break

    }
    return color
}
// Tabs加载更多
const loadMore = () => {
    tabsForm.value.page = ++tabsForm.value.page
    handleStatus(activeName.value, false)
}
// 删除任务按钮
const deleteTask = id => {
    dialogStopOrDelete.value = true
    dialogStop.value = false
    sale_script_id.value = String(id)
    tabsListData.value.forEach((e, i) => {
        if (e.id === id) {
            listIndex.value = i
            if (tabsListData.value[listIndex.value].is_repeat == '1') {
                dialogButton.value = false
            } else {
                dialogButton.value = true
            }
        }
    })
    dialogIsDelete.value = true
}
// 终止任务按钮
const stopTaskList = id => {
    dialogStopOrDelete.value = false
    sale_script_id.value = String(id)
    tabsListData.value.forEach((e, i) => {
        if (e.id === id) {
            // console.log('eeeeeeeee', e)
            listIndex.value = i
            if (tabsListData.value[listIndex.value].is_repeat == '1') {
                dialogButton.value = false
            } else {
                dialogButton.value = true
            }
        }
    })
    dialogIsStop.value = true
}
// 删除\终止任务弹出框(删除将来所有任务 && 终止将来所有任务)
const delTaskTabsDel = async id => {
    // console.log('tabsListData.value', i)
    if (dialogStopOrDelete.value && tabsListData.value[listIndex.value].is_repeat == '0') {
        // if (tabsListData.value[listIndex.value].task_property == 'PLAN') {
        let res = await Http.deleteTabsTask({
            id
        })
        if (res.code === 200) {
            dialogIsDelete.value = false
            ElMessage.success('删除成功')
            switchTab('0', true)
        }
        // } else {
        //     let res = await Http.deleteHandTabsTask({
        //         id
        //     })
        //     if (res.code === 200) {
        //         dialogIsDelete.value = false
        //         ElMessage.success('删除成功')
        //         switchTab('0', true)
        //     }
        // }
    }
    if (dialogStopOrDelete.value && tabsListData.value[listIndex.value].is_repeat == '1') {
        // if (tabsListData.value[listIndex.value].task_property == 'PLAN') {
        let res = await Http.deleteTabsTask({
            id,
            type: 2
        })
        if (res.code === 200) {
            dialogIsDelete.value = false
            ElMessage.success('删除成功')
            switchTab('0', true)
        }
        // } 
        // else {
        //     let res = await Http.deleteHandTabsTask({
        //         id,
        //         type: 2
        //     })
        //     if (res.code === 200) {
        //         dialogIsDelete.value = false
        //         ElMessage.success('删除成功')
        //         switchTab('0', true)
        //     }
        // }
    }
    if (!dialogStopOrDelete.value && tabsListData.value[listIndex.value].is_repeat == '0') {
        // if (tabsListData.value[listIndex.value].task_property == 'PLAN') {
        let res = await Http.stopTabsTask({
            id
        })
        if (res.code === 200) {
            dialogIsStop.value = false
            ElMessage.success('终止成功')
            switchTab('1', true)
        }
        // } else {
        //     let res = await Http.stopHandTabsTask({
        //         id
        //     })
        //     if (res.code === 200) {
        //         dialogIsStop.value = false
        //         ElMessage.success('终止成功')
        //         switchTab('1', true)
        //     }
        // }
    }
    if (!dialogStopOrDelete.value && tabsListData.value[listIndex.value].is_repeat == '1') {
        // if (tabsListData.value[listIndex.value].task_property == 'PLAN') {
        let res = await Http.stopTabsTask({
            id,
            type: 2
        })
        if (res.code === 200) {
            dialogIsStop.value = false
            ElMessage.success('终止成功')
            switchTab('1', true)
        }
        // } else {
        //     let res = await Http.stopHandTabsTask({
        //         id,
        //         type: 2
        //     })
        //     if (res.code === 200) {
        //         dialogIsStop.value = false
        //         ElMessage.success('终止成功')
        //         switchTab('1', true)
        //     }
        // }
    }
}
// 删除任务弹出框(仅删除当前任务)
const delTaskTabsTypeDel = async id => {
    if (dialogStopOrDelete.value && tabsListData.value[listIndex.value].is_repeat == '1') {
        // if (tabsListData.value[listIndex.value].task_property == 'PLAN') {
        let res = await Http.deleteTabsTask({
            id,
            type: 1
        })
        if (res.code === 200) {
            dialogIsDelete.value = false
            ElMessage.success('删除成功')
            switchTab('0', true)
        }
        // } else {
        //     let res = await Http.deleteTabsTask({
        //         id,
        //         type: 1
        //     })
        //     if (res.code === 200) {
        //         dialogIsDelete.value = false
        //         ElMessage.success('删除成功')
        //         switchTab('0', true)
        //     }
        // }
    }
    // console.log('1111111')
    if (!dialogStopOrDelete.value && tabsListData.value[listIndex.value].is_repeat == '1') {
        // console.log('333333')
        // if (tabsListData.value[listIndex.value].task_property == 'PLAN') {
        let res = await Http.stopTabsTask({
            id,
            type: 1
        })
        if (res.code === 200) {
            dialogIsStop.value = false
            ElMessage.success('终止成功')
            switchTab('1', true)
        }
        // } else {
        //     let res = await Http.stopHandTabsTask({
        //         id,
        //         type: 1
        //     })
        //     if (res.code === 200) {
        //         dialogIsStop.value = false
        //         ElMessage.success('终止成功')
        //         switchTab('1', true)
        //     }
        // }
    }
}
// 新建手工任务
// function goManualTask() {
//     router.push({
//         name: 'manualAdd',
//         query: {
//             title: '手工任务',
//             type: 'add'
//         }
//     })
// }
// 编辑任务,接口返回取一字段判别任务类型
function editManualTask(id) {
    // if (taskType == 'HAND') {
    //     router.push({
    //         name: 'editHandTask',
    //         query: {
    //             title: '手工任务',
    //             id,
    //             type: 'edit'
    //         }
    //     })
    // } 
    // else {
    router.push({
        name: 'editPlanTask',
        query: {
            title: '计划任务',
            id,
            type: 'edit'
        }
    })
    // }
}
// 新建计划任务
function goPlanTask() {
    router.push({
        name: 'planAdd',
        query: {
            title: '计划任务',
            type: 'add'
        }
    })
}
// 只有执行中、已结束状态任务可以看到按钮，点击跳转
// 执行任务详情
function goImplement(id) {
    tabsListData.value.forEach((e, i) => {
        if (e.id === id) {
            listIndex.value = i
        }
    })
    router.push({
        name: 'ImplementDetail',
        query: {
            id,
            is_repeat: tabsListData.value[listIndex.value].is_repeat,
            task_property: tabsListData.value[listIndex.value].task_property
        }
    })
}

// 进入当前任务的任务详情
const goDetail = id => {
    tabsListData.value.forEach(e => {
        if (e.id === id) {
            // console.log('eeeeeeeee', e)
            // listIndex.value = i
            // if (tabsListData.value[listIndex.value].task_property == 'HAND') {
            //     router.push({
            //         name: 'manualDetail',
            //         query: {
            //             id: id
            //         }
            //     })  
            // } else {
            router.push({
                name: 'planDetail',
                query: {
                    id: id
                }
            })
            // }
        }
    })
}
function showStartTime(data) {
    let now = data || new Date()
    let nowMonth = now.getMonth() // 当前月
    let nowYear = now.getFullYear() // 当前年
    let monthEndDate = new Date(nowYear, nowMonth, 0)
    return moment(monthEndDate).format('yyyy-MM-DD')
}

function showEndTime(data) {
    let now = data || new Date()
    let nowMonth = now.getMonth() // 当前月
    let nowYear = now.getFullYear() // 当前年
    let monthEndDate = new Date(nowYear, nowMonth + 1, 0)
    return moment(monthEndDate).format('yyyy-MM-DD')
}

</script>

<style scoped lang="scss">
.page-scroll {
    min-height: calc(100vh - 152px) !important;
    height: calc(100vh - 152px) !important;
    overflow-y: auto;
}
.img-class {
    width: 18px;
    height: 18px;
}
.calendar-class{
    // width: 70%;
    flex-grow: 1;
    // #calendar{
    //     .fc .fc-col-header-cell-cushion{
    //         padding: 16px 4px;
    //     }
    // }
}
.task-check {
    // min-width: 300px;
    .btn-class{
    float: right;
    }
    .tab-class{
        // width: 30%;
        // width: 413px;
        height: 664px;
        flex-grow: 0;
        border: 1px solid #d9d9d9;
        margin-top: 55px;
        // display: table;
        zoom: 1;
        .tab-title{
            height: 54px;
            font-size: 16px;
            font-weight: 500;
            background: linear-gradient(171deg,#33abfd, #1773fa 89%);
            .tab-text{
                font-weight: 500;
                color: #ffffff;
            }
        }
        .tab-switch{
            width: 100%;
            // width: 117px;
            // display: table-cell;
            // flex: 1;
        }
        .scroll-bar{
            overflow-y: scroll;
            height: 544px;
            .loadMore{
                width: 100%;
                height: 30px;
                text-align: center;
                &:hover{
                    cursor: pointer;
                }
            }
            .tab-content{
                // overflow-x: hidden;
                // overflow-y: scroll;
                // height: 105px;
                border: 1px solid #D9D9D9;
                .content-title{
                    // height: 24px;
                    line-height: 24px;
                    font-size: 16px;
                    font-weight: 500;
                    color: rgba(0,0,0,0.85);
                    overflow: hidden;      /*溢出隐藏*/
                    white-space: nowrap;	/*规定文本不进行换行*/
                    text-overflow: ellipsis;	/*当对象内文本溢出时显示省略标记（...）*/
                }
                .content-test{
                    min-width: 70px;
                    height: 22px;
                    line-height: 22px;
                    font-size: 14px;
                    font-weight: 400;
                    color: #4a4a4a;
                }
                .status-circle-zero {
                    width: 16px;
                    height: 16px;
                    background: #bfbfbf;
                    border-radius: 50%;
                }
                .status-circle-one {
                    width: 16px;
                    height: 16px;
                    background: #00c657;
                    border-radius: 50%;
                }
                .content-clock{
                    width: 82px;
                    height: 22px;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 22px;
                    color: #262626;
                }
            }
        }
    }
}

</style>
