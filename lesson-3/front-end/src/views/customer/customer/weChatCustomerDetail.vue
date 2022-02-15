<template>
    <div class="customer-detail-page flex">
        <div :span="8" class="detail-part mt24 mr24 mb24 ml24 bgf bdr2">
            <div class="part-header pl24 pr24 flex flex-justify-between">
                <span class="fwb fs16">泛客户基本信息</span>
                <span>
                    <span class="c55">创建时间：</span>
                    <span class="c26">2021-08-10 14:12:34</span>
                </span>
            </div>
            <div class="detail-part-content pt16 pb16 pl24 pr24">
                <div>
                    <subjectList :select-sub-ject="selectSubJect" :sub-list="subList" @onSelect="onSelectSubject" />
                </div>
                <div class="cus-tab-box flex pt12">
                    <div 
                        v-for="pItem in personList"
                        :key="pItem.subject_data_id"
                        class="cus-tab-item pointer pl12 pr12 pt4 pb4 mr8" 
                        :class="[pItem.subject_data_id === selectPerson.subject_data_id ? 'cus-tab-active' : '']"
                        @click="onSelectPeson(pItem)"
                    > 
                        <!-- <personItem :person="pItem" /> -->
                        <personItem :person="{
                            pic: pItem.pic,
                            yw_name: pItem.yw_name || pItem.yw_id,
                            qw_type: pItem.qw_type,
                            qw_type_str: pItem.qw_type,
                            sex: pItem.sex,
                        }"
                        />
                    </div>
                </div>

                <div class="user-info">
                    <div class="info-title c26 fs16 fwb lh24 pt16 pb8">基本信息</div>
                    <div v-if="selectSubJect.tag_platform_type == 'THIRD'" class="user-info-box bgfa bdr2 p24">
                        <div class="flex flex-justify-between">
                            <div class="info-max-width flex-s1">
                                <div class="c17 fs22 lh22 fwb mb12 flex-g1 flex-s1">{{ personInfo.name }}</div>
                                <div class="mb8 max-width-info c26 overflow-ellipsis" :title="personInfo.unionID">
                                    <span class="c55 ">UnionID：</span>
                                    {{ personInfo.unionID || '--' }}
                                </div>
                                <div class="mb8 max-width-info c26 overflow-ellipsis" :title="personInfo.userID">
                                    <span class="c55">UserId：</span>
                                    {{ personInfo.userID || '--' }}
                                </div>
                            </div>
                            <div v-if="personInfo.pic" class="user-img-box flex-g0 flex-s0 p8 bgf bdr2 ml8">
                                <img :src="personInfo.pic" alt="头像">
                            </div>
                        </div>
                        <div class="mb8 flex">
                            <span class="c55 flex-g0 flex-s0">上下游名称：</span>
                            <span class="c26 overflow-ellipsis">{{ personInfo.chain_name || '--' }}</span>
                        </div>
                        <div class="mb8 flex">
                            <span class="c55  flex-g0 flex-s0">企业名称：</span>
                            <span class="c26 overflow-ellipsis">{{ personInfo.chain_company || '--' }}</span>
                        </div>
                        <div class="mb8 flex flex-align-center">
                            <span class="c55 flex-g0 flex-s0">最早添加的企微成员：</span>
                            <MenberItem 
                                class="table-member-card"
                                :member-id="personInfo.member_id" 
                                :avatar="personInfo.qw_avatar"
                                :name="personInfo.qw_name"
                                :department-name="personInfo.qw_department_name"
                            />
                        </div>
                        <div class="flex">
                            <span class="c55 flex-g0 flex-s0">添加时间：</span>
                            <span class="c26 overflow-ellipsis">{{ personInfo.create_time }}</span>
                        </div>
                    </div>
                    <div v-else-if="selectSubJect.tag_platform_type == 'BUSINESS'" class="user-info-box bgfa bdr2 p24">
                        <div class="c17 fs22 lh22 fwb mb24 flex-g1 flex-s1 mb12">{{ selectSubJect.yw_name || '--' }}</div>
                        <div class="mb8 flex">
                            <span class="c55 flex-g0 flex-s0">创建时间：</span>
                            <span class="c26 overflow-ellipsis">{{ busiData.create_time || '--' }}</span>
                        </div>
                        <div class="mb8 flex">
                            <span class="c55 flex-g0 flex-s0">更新时间：</span>
                            <span class="c26 overflow-ellipsis">{{ busiData.update_time || '--' }}</span>
                        </div>
                        <div v-for="infoItem in BUSINESSpersonInfo" :key="infoItem.name" class="mb8 flex">
                            <span class="c55 flex-g0 flex-s0">{{ infoItem.label || '--' }}：</span>
                            <span class="c26 overflow-ellipsis">{{ infoItem.content || '--' }}</span>
                        </div>
                    </div>
                </div>
                <div class="user-info">
                    <div class="info-title c26 fs16 fwb lh24 pt12 pb12">标签</div>
                    <div class="user-info-box tag-box bgfa bdr2 p24">
                        <div v-for="(tagTypeItem, tagTypeIndex) in personTags" :key="tagTypeIndex" class="flex flex-wrap">
                            <customerTag
                                v-for="(tagItem, tagIndex) in tagTypeItem"
                                :key="tagIndex"
                                :left-title="tagItem.group_name"
                                :right-title="tagItem.name"
                                :color="
                                    tagItem.tag_type === 'HQ'
                                        ? '#409eff'
                                        : '#FF6F00'
                                "
                                :customer-style="{ 'margin-bottom': '8px', 'margin-top': 0}"
                            />
                        </div>
                        <!-- <div v-if="personTags.service[0]">
                            <customerTag
                                v-for="(tagItem, tagIndex) in personTags.service"
                                :key="tagIndex"
                                :left-title="tagItem.group_name"
                                :right-title="tagItem.name"
                                :color="
                                    scope.data.tag_arr[0].tag_group_type === 'HQ'
                                        ? '#409eff'
                                        : '#FF6F00'
                                "
                                :customer-style="{ 'margin-bottom': 0 }"
                            />
                        </div> -->
                    </div>
                </div>
                <!-- 只有企微客户才展示 -->
                <div v-if="selectSubJect.tag_platform_type == 'THIRD'" class="cusromer-detail-tab mt28">
                    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                        <el-tab-pane label="跟进成员">
                            <div class="tab-pane-content p24">
                                <memberInfoBox
                                    v-for="(trackingItem, trIndex) in personTracking"
                                    :key="trIndex"
                                    :track-item="trackingItem"
                                />
                            </div>
                        </el-tab-pane>
                        <el-tab-pane v-if="groupInfoList[0]" label="客户所在群">
                            <div class="tab-pane-content p24">
                                <groupInfoBox  
                                    v-for="(groupItem, gIndex) in groupInfoList"
                                    :key="gIndex"
                                    :group-info="groupItem"
                                />
                            </div>
                        </el-tab-pane>
                        <!-- <el-tab-pane label="Role">Role</el-tab-pane>
                        <el-tab-pane label="Task">Task</el-tab-pane> -->
                    </el-tabs>
                </div>
            </div>
        </div>
        <div :span="16" class="info-part mt24 mr24 mb24 bgf bdr2">
            <div class="part-header pl24 pr24 flex flex-justify-between">
                <span class="fwb fs16">泛客户动态</span>
            </div>
            <div class="trends-box flex flex-direction-column mt16 mb16 ml24 mr24  bdr2">
                <div class="flex-s0 flex-g0 pl24 pr24 pt24 pb16" :class="[checkScroll('trendListBox') ? 'trends-search-form' : '']">
                    <div class="mb24 flex flex-align-center flex-justify-between">
                        <span class="fs16 c26 fwb">基础筛选</span>
                        <span class="color-primary pointer" @click="expandTrendParams = !expandTrendParams">{{ expandTrendParams ? '收起' : '展开' }} <i :class="[expandTrendParams ? 'el-icon-arrow-up' : 'el-icon-arrow-down']" /> </span>
                    </div>
                    <div>
                        <el-form v-show="!expandTrendParams" :inline="true" size="small" class="clearfix">
                            <el-form-item label="日期：" class="mb8 mr20">
                                <el-date-picker
                                    v-model="trendsTime"
                                    type="datetimerange"
                                    size="small"
                                    range-separator="至"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                    value-format="YYYY-MM-DD HH:mm:ss"
                                    style="width: 330px;"
                                    @change="changeTime"
                                />
                            </el-form-item>
                            <el-form-item label="主体：" class="mb8 mr20">
                                <el-select 
                                    v-model="trendsParams.subject_id"
                                    placeholder="请选择主体"
                                    class="width-class"
                                    style="width: 160px"
                                    multiple
                                    collapse-tags
                                    @change="getTrends"
                                >
                                    <el-option
                                        v-for="item in subList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    >
                                        <div
                                            class="custom-subject-option flex flex-justify-start flex-align-center"
                                        >
                                            <div class="custom-subject-option-img-wrap flex flex-align-center">
                                                <img
                                                    v-if="item.tag_platform_type"
                                                    class="select-icon-sub"
                                                    :src="
                                                        getImageUrl(item.tag_platform_type)
                                                    "
                                                    alt=""
                                                >
                                            </div>
                                            <div class="pl8">{{ item.name }}</div>
                                        </div>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="动态分组：" class="mb8 mr0">
                                <el-select 
                                    v-model="trendsParams.type"
                                    placeholder="请选择动态分组"
                                    class="width-class"
                                    style="width: 145px;"
                                    multiple
                                    collapse-tags
                                    @change="getTrends"
                                >
                                    <!-- <el-option label="事件" value="1" />
                                    <el-option label="手写" value="2" />
                                    <el-option label="其他" value="3" /> -->
                                    <el-option v-for="item in trendTypeList" :key="item.value" :label="item.key" :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div v-show="expandTrendParams" class="trends-form">
                            <div class="trend-form-item">
                                <span class="">日期：</span>
                                <el-date-picker
                                    v-model="trendsTime"
                                    type="datetimerange"
                                    size="mini"
                                    range-separator="至"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                    value-format="YYYY-MM-DD HH:mm:ss"
                                    style="width: 348px;"
                                    @change="changeTime"
                                />
                            </div>
                            <div class="mt12">
                                <div class="mb8">主体</div>
                                <el-checkbox-group v-model="trendsParams.subject_id" @change="getTrends">
                                    <el-checkbox v-for="item in subList" :key="item.id" :label="item.id">
                                        <div class="flex flex-align-center">
                                            <img
                                                v-if="item.tag_platform_type"
                                                class="select-icon-sub mr4"
                                                :src="getImageUrl(item.tag_platform_type)"
                                            >
                                            <span>{{ item.name }}</span>
                                        </div>
                                    </el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <div class="mt12">
                                <div class="mb8">动态分组</div>
                                <el-checkbox-group v-model="trendsParams.type" @change="getTrends">
                                    <el-checkbox v-for="item in trendTypeList" :key="item.value" :label="item.value">{{ item.key }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-if="trendList && trendList.length"
                    id="trendListBox"
                    v-box-loadmore="loadMoreTrend"
                    class="trend-list p24 flex-s1 flex-g1"
                >
                    <div v-for="(dateItem, dataindex) in trendList" :key="dataindex" class="trend-item">
                        <div class="time-line c26 fwb fs14 bdb pt12 pb8 mb20">
                            {{ dateItem.time }}
                        </div>
                        <el-timeline>
                            <el-timeline-item
                                v-for="(trendItem, tIndex) in dateItem.list"
                                :key="tIndex"
                                hide-timestamp
                                :timestamp="trendItem.timestamp"
                            >
                                <template #dot>
                                    <div class="time-dot-box">
                                        <!-- <img class="timeline-icon" src="@/assets/images/eventManage/THIRD.png" alt=""> -->
                                        <img class="timeline-icon" :src="showTrendIcon(trendItem.subject_type, trendItem.dynamic_type)" alt="">
                                    </div>
                                </template>
                                <template #default>
                                    <div class="trend-detail flex pl16 pr16 pt12 pb12 bdr2 ml8" @click="clickTrendEvent(trendItem.events_happen_id, trendItem.tag_subject_id)">
                                        <div class="flex-g0 flex-s0 c8c fs14 mr12 lh32">{{ timeFormat(trendItem.create_time) }}</div>
                                        <trendContent :trend-item="trendItem" />
                                    </div>
                                </template>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </div>
                <div v-else class="trend-list flex-s1 flex-g1 flex flex-align-center flex-justify-center">
                    <div class="flex flex-direction-column pt20 pb20">
                        <img class="no-trend-img" src="@/assets/images/customer/no_trend.svg" alt="暂无数据">
                        <p class="tc c55 mt32 fs14">当前筛选条件下，暂无数据，请更换条件再试试</p>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            v-model="subjectDialog.subListVisible"
            title="关联主体详情"
            width="418px"
            custom-class="event-snap-dialog"
        >
            <span>快照时间：{{ subjectDialog.dialogTime }}</span>
            <el-table
                :data="subjectDialog.dialogTableData"
                style="max-width: 100%; margin-top: 12px"
                size="mini"
                height="270"
                :show-header="true"
                border
            >
                <el-table-column
                    label="字段名称"
                    prop="name"
                    show-overflow-tooltip
                    min-width="80px"
                    class-name="table-column-name"
                >
                    <template #default="scope">
                        <span class="table-column-name-text">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="值"
                    prop="content"
                    show-overflow-tooltip
                    min-width="80px"
                >
                    <template #default="scope">
                        {{ scope.row.content }}
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

        <!-- 事件要素弹出框 -->
        <el-dialog
            v-model="eventDialog.eventVisible"
            title="事件要素"
            width="418px"
            custom-class="event-snap-dialog"
        >
            <!-- <span>快照时间：{{ eventDialog.dialogTime }}</span> -->
            <el-table
                :data="eventDialog.dialogTableData"
                style="max-width: 100%; margin-top: 12px"
                size="mini"
                height="270"
                :show-header="true"
                border
            >
                <el-table-column
                    label="字段名称"
                    prop="element_name"
                    show-overflow-tooltip
                    min-width="80px"
                    class-name="table-column-name"
                >
                    <template #default="scope">
                        <span class="table-column-name-text">{{ scope.row.element_name }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="值"
                    prop="element_content"
                    show-overflow-tooltip
                    min-width="80px"
                >
                    <template #default="scope">
                        <div v-if="scope.row.canOpen">
                            <el-button type="text" size="mini" @click="openSubjectDia">{{ scope.row.element_content || '--' }}</el-button>
                        </div>
                        <div v-else>{{ scope.row.element_content || '--' }}</div>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script setup>
import subjectList from './components/subjectList.vue'
// import personItem from './components/person.vue'
import memberInfoBox from './components/memberInfoBox.vue'
import groupInfoBox from './components/groupInfoBox.vue'
import trendContent from './components/trendContent.vue'
import { ElMessage } from 'element-plus'

import { useRoute } from 'vue-router'
import Http from '@/util/request'
import { ref, reactive, onMounted } from 'vue'
import moment from 'moment'
const route = useRoute()
const params = ref({
    yw_id: '',
    type: 2
})

const subject_id = ref('')

// 客户详情模块
const subList = ref([])
const selectSubJect = ref({})
const personList = ref([])
const selectPerson = ref({})

const personInfo = ref({})
const BUSINESSpersonInfo = ref([])
const busiData = ref({
    create_time: '',
    update_time: ''
})
const personTags = ref({})
const personTracking = ref([])

const groupInfoList = ref([])

// 客户动态模块
const trendsParams = ref({
    page: 1,
    limit: 10,
    start_time: '',
    end_time: '',
    yw_id: '',
    subject_id: [],
    show_type: 2,
    type: []
})
const trendsTime = ref([])
const expandTrendParams = ref(false)
// const subjectOption = ref([])
const trendLoading = ref(false)
const trendFinish = ref(false)
const trendList = ref([])
const trendTypeList = ref([])

const subjectDialog = reactive({
    subListVisible: false,
    dialogTableData: [],
    dialogTime: '',
    params: {
        events_happen_id: '',
        subject_id: ''
    }
})

const eventDialog = reactive({
    eventVisible: false,
    dialogTableData: [],
    dialogTime: '',
    params: {
        events_happen_id: '',
        yw_id: '',
        subject_id: ''
    }
})

// 开始时间限制今天以往时间被选择
// function disabledStartDate(time) {
//     //     const timeRange = 24 * 60 * 90 * 1000
//     //     // console.log('11111', time)
//     //     return time.getTime() < Date.now() - timeRange
//     console.log('事件选择', time)

//     // if (this.value) {
//     //     return time.getTime() < Date.now() - (1000 * 60 * 60 * 24) || time.getTime() > this.value.getTime() + (1000 * 60 * 60 * 24 * 30)
//     // } else {
//     //     return time.getTime() < Date.now() - (1000 * 60 * 60 * 24)
//     // }
// }

// 判断某个盒子是否有滚动条
const checkScroll = id => {
    let box = document.getElementById(id)
    // console.log('------', id, box)
    // return true
    if (box) {
        return (box.scrollHeight > box.clientHeight) || (box.offsetHeight > box.clientHeight)
    } else {
        return false
    }
    // return (box.scrollHeight > box.clientHeight) || (box.offsetHeight > box.clientHeight)
}

// 主体动态图片
function getImageUrl(url) {
    return new URL(`../../../assets/images/eventManage/${url}.svg`, import.meta.url).href
}

// 主体下拉选择
// const getSubjectData = () => {
//     Http
//         .getTagSubjectsKey()
//         .then(res => {
//             let result = res.data

//             let humanArr = result.filter(ele => {
//                 return ele.type === 'HUMAN'
//             })
//             if (humanArr && humanArr.length && humanArr[0] && humanArr[0].data) {
//                 subjectOption.value = humanArr[0].data
//                 // console.log('选择框', ReacData.subjectOption)
//             } else {
//                 subjectOption.value = []
//             }

//             nextTick(() => {})
//         })
//         .catch(() => {})
// }

// 获取客户详情tab
const getCustomerDetailTab = async() => {
    let { data, code } = await Http.getSujectDetailTab(params.value)
    if (code == 200) {
        subList.value = data.subject_list || []
        // selectSubJect.value = subList.value[0]
        subList.value.forEach(item => {
            if (item.id == subject_id.value) {
                selectSubJect.value = item
            }
        })

        personList.value = selectSubJect.value.user_list
        onSelectPeson(personList.value[0])
    }
}
// 切换主体tab
const onSelectSubject = item => {
    selectSubJect.value = item
    personList.value = selectSubJect.value.user_list
    selectPerson.value = personList.value[0]
    onSelectPeson(personList.value[0])
}

// 切换业务主体下的人
const onSelectPeson = item => {
    selectPerson.value = item
    customerDetail(selectPerson.value.subject_data_id)
    getCusGroupInfo(selectPerson.value.subject_data_id)
}

// 获取客户详细信息
const customerDetail = async subject_data_id => {
    const { data, code } = await Http.getSujectDetail({ subject_data_id, yw_id: params.value.yw_id })
    if (code == 200) {
        // console.log('数据99', data)
        // 企微客户
        if (selectSubJect.value.tag_platform_type == 'THIRD') {
            personInfo.value = data.info || {}
            personTracking.value = data.tracking || []
            personTags.value = data.tag || {}
        } else if (selectSubJect.value.tag_platform_type == 'BUSINESS') { // 业务客户
            BUSINESSpersonInfo.value = data.data.info || []
            busiData.value.create_time = data.data.create_time || ''
            busiData.value.update_time = data.data.update_time || ''
            personTags.value = data.data.tag || {}
            
            // console.log('业务数据', BUSINESSpersonInfo.value, data.data)
        }
    }
}

// 获取群相关信息 getSujectGroupInfo
const getCusGroupInfo = async subject_data_id => {
    const { data, code } = await Http.getSujectGroupInfo({ subject_data_id })
    if (code == 200) {
        // console.log('数据99', data)
        groupInfoList.value = data.list || []
    }
}

// 动态筛选时间选择器变动
const changeTime = () => {
    // 如果时间跨度超过90天则不给选择
    if (trendsTime.value) {
        if ((moment(trendsTime.value[1]).unix()) - (moment(trendsTime.value[0]).unix()) > 90 * 24 * 60 * 60) {
            ElMessage.error({
                message: '所选时间跨度不能超过90天'
            })
            trendsTime.value = []
            return
        }
    }

    if (trendsTime.value && trendsTime.value[0]) {
        trendsParams.value.start_time = trendsTime.value[0]
        trendsParams.value.end_time = trendsTime.value[1]
        getTrends()
        return
    }
    trendsParams.value.start_time = ''
    trendsParams.value.end_time = ''
    getTrends()
}

// 获取动态类型列表
const getTrendstypes = async() => {
    const { data } = await Http.getTrendstypes()
    trendTypeList.value = data || []
}

// 重新获取动态列表
const getTrends = () => {
    trendFinish.value = false
    trendList.value = []
    trendsParams.value.page = 1
    getTrendsList()
}

// 动态下拉加载更多
const loadMoreTrend = () => {
    if (!trendFinish.value) {
        trendsParams.value.page++
        getTrendsList()
    }
}

// 点击弹出事件要素
const clickTrendEvent = (events_happen_id, subject_id) => {
    if (events_happen_id == 0) {
        return
    }
    
    eventDialog.params.events_happen_id = events_happen_id
    eventDialog.params.subject_id = subject_id
    eventDialog.params.yw_id = params.value.yw_id
    getEventParams()

    subjectDialog.params.events_happen_id = events_happen_id
    subjectDialog.params. subject_id = subject_id
}

// 获取事件要素
const getEventParams = async() => { 
    const { data, code } = await Http.getEventParams(eventDialog.params)
    if (code == 200) {
        let list = data.event_list || []
        let showData = data.show_data
        list.unshift({
            element_content: showData.value,
            element_name: showData.name,
            type: showData.type,
            canOpen: true
        })
        eventDialog.dialogTableData = list || []
        eventDialog.eventVisible = true
    }
    
}

// 获取关联主体相关
const openSubjectDia = async() => {

    // const subjectDialog = reactive({
    //     subListVisible: false,
    //     dialogTableData: [],
    //     dialogTime: '',
    //     params: {
    //         events_happen_id: '',
    //         subject_id: ''
    //     }
    // })
    await Http
        .getSnapshot(subjectDialog.params)
        .then(res => {
            if (res.code == 200) {
                subjectDialog.dialogTime = res.data.create_time
                subjectDialog.dialogTableData = res.data.data_snap
                subjectDialog.subListVisible = true
            }
        })
        .catch(() => {})
}

// 获取关联主体相关
// async function getSnap() {
//     // let param = {
//     //     events_happen_id: events_happen_id,
//     //     subject_id: subject_id
//     // }
//     await Http
//         .getSnapshot(subjectDialog.param)
//         .then(res => {
//             subjectDialog.dialogTime = res.data.create_time
//             subjectDialog.dialogTableData = res.data.data_snap
//             subjectDialog.dialogVisible = true
//         })
//         .catch(() => {})
// }

// 获取客户动态列表
const getTrendsList = async() => {
    if (trendFinish.value) return
    trendLoading.value = true
    let { data } = await Http.getTrendsList(trendsParams.value)

    trendLoading.value = false

    // 判断当前页与后一页的动态是不是同一天的， 是同一天的则合并为一天
    if (trendsParams.value.page > 1) {
        // console.log('判断条件', trendList.value[trendList.value.length - 1], data.data[0].time)
        if (trendList.value[trendList.value.length - 1].time === data.data[0].time) {
            let tempData = JSON.parse(JSON.stringify(data.data[0]))
            // console.log('截取的数组', tempData.list)
            // .concat(tempData.list)
            tempData.list.forEach(item => {
                trendList.value[trendList.value.length - 1].list.push(item)
            })
            data.data.shift()
        }
    }
    trendList.value = trendList.value.concat(data.data)
    // console.log('客户动态列表', trendList.value[trendList.value.length - 1])
    if (trendsParams.value.page * trendsParams.value.limit >= data.count) {
        trendFinish.value = true
    }
}

// 将时间转化为时分秒
const timeFormat = time => {
    return moment(time).format('HH:mm:ss')
}

// 动态类型icon
const showTrendIcon = (subType, type) => {
    let url = ''
    if (type == 2) {
        url = 'write' 
    } else {
        url = subType
    }

    return new URL(`../../../assets/images/eventManage/${url}.svg`, import.meta.url).href
}

onMounted(() => {
    console.log(route.query.id)
    params.value.yw_id = route.query.yw_id
    trendsParams.value.yw_id = route.query.yw_id

    subject_id.value = route.query.subject_id

    // params.value.yw_id = 885
    // trendsParams.value.subject_data_id = 885
    getCustomerDetailTab()
    // getSubjectData()
    getTrends()
    getTrendstypes()
})

</script>

<style lang="scss" scoped>
.customer-detail-page {
    .detail-part {
        // width: 630px;
        width: calc(40% - 26px);
        // height: calc(100vh - 160px);
    }
    .detail-part-content {
        height: calc(100vh - 218px);
        overflow-y: auto;
    }
    .info-part {
        // width: 946px;
        width: calc(60% - 48px);
        height: calc(100vh - 160px);
        overflow-y: auto;
    }

    .part-header {
        line-height: 48px;
        border-bottom: 1px solid #d9d9d9;
    }

    .cus-tab-box {
        border-bottom: 1px solid #DCDFE6;

        .cus-tab-item {
            border: 1px solid #DCDFE6;
            border-bottom: 0;
            background-color: #fafafa;
        }
        .cus-tab-active {
            background-color: #fff;
        }
    }

    .user-info-box {
        height: 232px;
        overflow-y: auto;
        border: 1px solid rgba($color: #000000, $alpha: 0.09);

        .user-img-box {
            width: 80px;
            height: 80px;
            box-sizing: border-box;
            border: 1px solid rgba($color: #000000, $alpha: 0.15);
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .info-max-width {
            width: calc(100% - 112px);
        }
        // .max-width-info {
        //     max-width: 100%;
        // }
    }
    // .tag-box {
    //     max-height: 232px;
    //     overflow-y: auto;
    // }

    .tab-pane-content {
        border-left: 1px solid rgba(0,0,0,0.09);
        border-right: 1px solid rgba(0,0,0,0.09);
        border-bottom: 1px solid rgba(0,0,0,0.09);
    }

    // 动态部分
    .trends-box {
        border: 1px solid #d9d9d9;
        height: calc(100% - 89px);
        box-sizing: border-box;
    }
    .trends-search-form {
        box-shadow: 0 6px 6px #eee;
    }

    .time-dot-box {
        background-color: #fff;
        padding: 8px;
        .timeline-icon {
            display: block;
            width: 24px;
            height: 24px;
        }
    }
    .trend-list {
        overflow-y: auto;
    } 

    .trend-detail {
        background: rgba($color: #000000, $alpha: 0.02)
    }
    .no-trend-img {
        display: block;
        width: 340px;
        height: 244px;
    }
}
:deep(.event-snap-dialog) {
    .el-dialog__body {
        padding: 24px 24px 46px 24px;
        .table-column-name {
        background: #fafafa;
        .table-column-name-text {
            font-size: 12px;
            font-weight: bold ;
            // font-weight: 500;
            text-align: left;
            color: rgba(0, 0, 0, 0.85);
            line-height: 22px;
        }
        }
    }
}
    
</style>

<style lang="scss">
    // 选项中的主体icon
    .select-icon-sub {
        display: block;
        width: 24px;
        height: 24px;
    }
</style>