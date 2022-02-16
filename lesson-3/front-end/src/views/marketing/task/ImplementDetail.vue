<template>
    <div>
        <page-main class="page-scroll">
            <div v-if="implmentData.task_send_status === 1" class="task-status mb24 flex flex-align-center pl18">
                <i class="el-icon-warning mr12" />
                <span class="task-status-text">任务下发中，请稍后再看详情。</span>
            </div>
            <div>
                <div class="flex flex-align-center flex-justify-center titleClass">
                    <div class="titleName" @click="backToDetail(route.query.id)">{{ implmentData.task_name }}</div>
                    <repeatTimeCheck 
                        v-if="route.query.is_repeat =='1'"
                        :time-data="timeData"
                        @check-time="checkTime"
                    />
                </div>
                <br>
                <div class="mb24 flex flex-justify-start">
                    <div>
                        <label class="textClass">目标客户数：</label>
                        <span>{{ implmentData.customer_num }}</span>
                    </div>
                    <div v-if="implmentData.task_send_status === 1" class="ml24 flex flex-align-center">
                        <label class="textClass">任务状态：</label>
                        <div class="status-circle-zero mr8" />
                        <span>{{ implmentData.task_status }}</span>
                    </div>
                    <div v-else class="ml24">
                        <label class="textClass">任务状态：</label>
                        <span>{{ implmentData.task_status }}</span>
                    </div>
                    <div class="ml24">
                        <label class="textClass">发送对象类型：</label>
                        <span>{{ implmentData.touch_object_txt }}</span>
                    </div>
                    <div class="ml24">
                        <label class="textClass">触达方式：</label>
                        <span>{{ implmentData.task_type_txt }}</span>
                    </div>
                    <div class="ml24">
                        <label class="textClass">任务截止时间：</label>
                        <span>{{ implmentData.end_time }}终止</span>
                    </div>
                </div>
            </div>
            <el-form
                size="small"
                :model="implmentData"
            >
                <el-form-item label="执行时间" prop="ImplementDate">
                    <el-date-picker
                        v-model="form.formData.ImplementDate"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="YYYY-MM-DD"
                        @change="handleChangeDate"
                    />
                </el-form-item>
                <el-row>
                    <el-form-item label="成员筛选" prop="memberCheck">
                        <calendarSelectMember
                            :write-back-selected-member-org="form.writeBackSelectedMemberOrg"
                            :is-multiple-selected="true"
                            :custom-input-value-fn="form.customInputValueFn"
                            :custom-selected-fn="customSelectedFn"
                            @confirm="confirmChooseMember"
                        >
                            <template #default="scope">
                                <el-input
                                    v-model="scope.data"
                                    placeholder="请选择"
                                    suffix-icon="el-icon-caret-bottom"
                                    readonly
                                />
                            </template>
                        </calendarSelectMember>
                    </el-form-item>
                    <el-form-item label="状态搜索" prop="status" class="ml24">
                        <el-select v-model="form.formData.status" placeholder="请选择">
                            <el-option
                                v-for="item in form.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    <div class="ml24">
                        <el-button @click="handleReset">重置</el-button>
                        <el-button type="primary" @click="handleSearch">查询</el-button>
                    </div>
                </el-row>
            </el-form>
            <div class="pb16">
                <span style="float: left">
                    <label class="textClass">送达率：</label>
                    <span>{{ implmentData.delivery_rate }}</span>
                    <label class="textClass ml24">
                        计算明细
                        <el-popover
                            placement="right"
                            :width="384"
                            trigger="hover"
                        >
                            <template #reference>
                                <el-icon class="el-icon-date" />
                            </template>
                            <div class="flex flex-direction-column p8">
                                <div class="flex-1 textClass">说明：送达率=触达客户数/目标客户数</div>
                                <div v-if="implmentData.touch_object == 'GROUP'" class="mt12">
                                    <div>
                                        <label class="flex-1 popoverClass">已送达客户群次：</label>
                                        <span>{{ implmentData.delivery_count }}</span>
                                        <label class="flex-1 popoverClass ml16">未送达客户群次：</label>
                                        <span>{{ implmentData.no_delivery_count }}</span>
                                    </div>
                                    <div class="mt12">
                                        <label class="flex-1 popoverClass">已送达客户群数：</label>
                                        <span>{{ implmentData.delivery_num }}</span>
                                        <label class="flex-1 popoverClass ml16">未送达客户群数：</label>
                                        <span>{{ implmentData.no_delivery_num }}</span>
                                    </div>
                                </div>
                                <div v-if="implmentData.touch_object == 'SINGLE'" class="mt12">
                                    <div>
                                        <label class="flex-1 popoverClass">已送达客户次：</label>
                                        <span>{{ implmentData.delivery_count }}</span>
                                        <label class="flex-1 popoverClass ml16">未送达客户次：</label>
                                        <span>{{ implmentData.no_delivery_count }}</span>
                                    </div>
                                    <div class="mt12">
                                        <label class="flex-1 popoverClass">已送达客户数：</label>
                                        <span>{{ implmentData.delivery_num }}</span>
                                        <label class="flex-1 popoverClass ml16">未送达客户数：</label>
                                        <span>{{ implmentData.no_delivery_num }}</span>
                                    </div>
                                </div>
                                <div v-if="implmentData.touch_object == 'MOMENTS'" class="mt12">
                                    <div>
                                        <label class="flex-1 popoverClass">已送达客户人次：</label>
                                        <span>{{ implmentData.delivery_count }}</span>
                                        <label class="flex-1 popoverClass ml16">未送达客户人次：</label>
                                        <span>{{ implmentData.no_delivery_count }}</span>
                                    </div>
                                    <div class="mt12">
                                        <label class="flex-1 popoverClass">已送达客户人数：</label>
                                        <span>{{ implmentData.delivery_num }}</span>
                                        <label class="flex-1 popoverClass ml16">未送达客户人数：</label>
                                        <span>{{ implmentData.no_delivery_num }}</span>
                                    </div>
                                </div>
                            </div>
                        </el-popover>
                    </label>
                </span>
                <span v-if="implmentData.touch_object == 'MOMENTS'" style="float: right">
                    <label class="textClass">总点赞数：</label>
                    <span>{{ implmentData.all_give_num }}</span>
                    <label class="textClass ml32">总客户评论数：</label>
                    <span>{{ implmentData.all_evaluate_num }}</span>
                </span>
            </div>
            <div class="relative implement-list">
                <!-- <div v-if="implmentData.task_send_status === 1" class="no-data-box">
                    <img 
                        :src="getImageUrl('implementNoData')"
                        class="img-class"
                    >
                    <div>暂无数据</div>
                </div> -->
                <CustomerTable
                    :table-data="implmentData.list"
                    :height=" implmentData.list ? null: '450px'"
                    :class="relative"
                    :need-pagination="true"
                >
                    <el-table-column prop="group_name" label="成员名称">
                        <template #default="scope">
                            <div class="flex flex-align-center event-list-page">
                                <div class="icon-in-td">
                                    <img
                                        v-if="scope.row.qw_thumb_avatar"
                                        :src="scope.row.qw_thumb_avatar"
                                        :alt="scope.row.qw_thumb_avatar"
                                    >
                                </div>
                                <el-popover
                                    placement="right"
                                    width="400"
                                    trigger="click"
                                    popper-class="member-info-pop"
                                >
                                    <div class="member-info-header">
                                        成员名片
                                    </div>
                                    <div class="member-info">
                                        <img
                                            :src="scope.row.qw_thumb_avatar"
                                            class=""
                                        >
                                        <div class="">
                                            <div>
                                                <span
                                                    class="
                                                                    fs16
                                                                    fw400
                                                                    color-black
                                                                "
                                                >
                                                    {{ scope.row.qw_name }}
                                                </span>
                                                <i
                                                    class="color-primary"
                                                    :class="{
                                                        'el-icon-male': scope.row.qw_gender == 1 || scope.row.qw_gender == 0,
                                                        'el-icon-female': scope.row.qw_gender == 2
                                                    }"
                                                />
                                                <el-tag
                                                    v-if="scope.row.qw_position"
                                                    type="success"
                                                >
                                                    {{ scope.row.qw_position }}
                                                </el-tag>
                                            </div>
                                            <div class="pt-10 fs14">
                                                <span class="pr10">
                                                    手机号：{{ scope.row.qw_phone }}
                                                </span>
                                                <i
                                                    class="el-icon-document-copy"
                                                    @click="copy(scope.row.qw_phone)"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <ul>
                                        <li
                                            class="
                                                            flex
                                                            member-detail-li
                                                        "
                                        >
                                            <div class="member-detail-left ">
                                                对外职务
                                            </div>
                                            <div class="member-detail-right">
                                                {{ scope.row.qw_external_position || "-" }}
                                            </div>
                                        </li>
                                        <li
                                            class="
                                                            flex
                                                            member-detail-li
                                                        "
                                        >
                                            <div class="member-detail-left">
                                                所属部门
                                            </div>
                                            <div class="member-detail-right">
                                                {{ scope.row.department_name || "-" }}
                                            </div>
                                        </li>
                                        <li
                                            class="
                                                            flex
                                                            member-detail-li
                                                        "
                                        >
                                            <div class="member-detail-left">
                                                邮箱
                                            </div>
                                            <div class="member-detail-right">
                                                {{ scope.row.qw_email || "-" }}
                                            </div>
                                        </li>
                                        <li
                                            class="
                                                            flex
                                                            member-detail-li
                                                        "
                                        >
                                            <div class="member-detail-left">
                                                座机
                                            </div>
                                            <div class="member-detail-right">
                                                {{ scope.row.qw_phone || "-" }}
                                            </div>
                                        </li>
                                        <li
                                            class="
                                                            flex
                                                            member-detail-li
                                                        "
                                        >
                                            <div class="member-detail-left">
                                                地址
                                            </div>
                                            <div class="member-detail-right">
                                                {{ scope.row.qw_address || "-" }}
                                            </div>
                                        </li>
                                    </ul>
                                    <template #reference>
                                        <span class="cl-blue member-name">
                                            {{ scope.row.qw_name }} /
                                            {{
                                                scope.row.department_name
                                            }}
                                        </span>
                                    </template>
                                </el-popover>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="group_date" label="最近执行时间">
                        <template #default="scope">
                            <div>{{ scope.row.exe_time }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="group_status" label="执行状态">
                        <template #header>
                            <div>
                                <span>执行状态</span>
                                <el-tooltip placement="top">
                                    <template #content>
                                        因企业微信的限制，每个成员每天只能对同一个客户、同
                                        <br>一个客户群群发一次消息，因此当同一个客户或客户群同
                                        <br>一天存在下发任务时，可发送目标数与目标下发数存在出
                                        <br>入，未执行完状态的三个数字（0/160/200）分别表示，
                                        <br>已发送目标数/可发送目标数/任务目标数。
                                    </template>
                                    <i class="el-icon-question ml6" />
                                </el-tooltip>
                            </div>
                        </template>
                        <template #default="scope">
                            <div>
                                <span v-if="scope.row.exe_status_txt == '未执行完'">{{ scope.row.exe_status_txt }}({{ scope.row.send_num }}/{{ scope.row.can_num }}/{{ scope.row.all_num }})</span>
                                <span v-else-if="scope.row.exe_status_txt == '下发失败'">
                                    {{ scope.row.exe_status_txt }}
                                    <el-tooltip placement="top">
                                        <template #content>
                                            成员与客户不是好友关系，或者当天成员
                                            <br>对应的客户额度均已用光，就会导致发送失败
                                        </template>
                                        <i class="el-icon-question" />
                                    </el-tooltip>
                                </span>
                                <span v-else>{{ scope.row.exe_status_txt }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="success_rate" label="送达率">
                        <template #default="scope">
                            <div>{{ scope.row.delivery_rate }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="success_members" :label="getLabelSuccess()">
                        <template #default="scope">
                            <div>{{ scope.row.send_success_num }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="fail_members" :label="getLabelFail()">
                        <template #default="scope">
                            <div>{{ scope.row.send_fail_can_num }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="implmentData.touch_object == 'MOMENTS'" prop="fail_members" label="点赞数">
                        <template #default="scope">
                            <div>{{ scope.row.give_num }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="implmentData.touch_object == 'MOMENTS'" prop="fail_members" label="客户评论数">
                        <template #default="scope">
                            <div>{{ scope.row.evaluate_num }}</div>
                        </template>
                    </el-table-column>
                </CustomerTable>
                <customer-pagination
                    v-model:page="form.formData.page"
                    v-model:limit="form.formData.page_size"
                    :total="total"
                    :get-data="() => Implement(route.query.id)"
                />
            </div>
        </page-main>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import moment from 'moment'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import http from '@/util/request'
import calendarSelectMember from './compontent/calendar-select-member.vue'
import repeatTimeCheck from './compontent/repeatTimeCheck.vue'

const route = useRoute()
const router = useRouter()
const total = ref(0)
const weekDate = ref('')
// 时间筛选器数据
const timeData = ref([])
// 执行详情数据
const implmentData = ref({})
const form = reactive({
    writeBackSelectedMemberOrg: [],
    customInputValueFn: param => {
        return getShowStr(param, 3) || ''
    },
    formData: {
        page: 1,
        page_size: 10,
        ImplementDate: [],
        status: '',
        id: '',
        member: []
    },
    options: [
        {
            value: '1',
            label: '下发失败'
        },
        {
            value: '2',
            label: '未执行'
        },
        {
            value: '3',
            label: '未执行完'
        },
        {
            value: '4',
            label: '已执行'
        }
    ],
    tableData: []
})
function getShowStr(arr, len) {
    return `${arr
        .slice(0, len)
        .map(ele => ele['member_name'] || ele['department_name'])
        .join('，')}${arr.length > len ? '...' : ''}`
}
function customSelectedFn(data, len) {
    const maxLen = 200
    if (len >= maxLen) {
        ElMessage({
            message: `最多支持客户人数${maxLen}人`,
            type: 'error'
        })
        return false
    } else {
        return true
    }
}
// popover 复制
function copy(data) {
    let url = data
    let oInput = document.createElement('input')
    oInput.value = url
    document.body.appendChild(oInput)
    oInput.select() // 选择对象;
    document.execCommand('Copy') // 执行浏览器复制命令
    ElMessage({
        message: '复制成功',
        type: 'success'
    })
    oInput.remove()
}
// 获取切图
// function getImageUrl(name) {
//     return new URL(`../../../assets/images/calendarTask/${name}.svg`, import.meta.url).href
// }
// 请求详情数据
const Implement = async id => {
    form.formData.id = id
    let params = form.formData
    if (route.query.task_property == 'PLAN') {
        let res = await http.getImplementDetail(params)
        if (res.code === 200) {
            implmentData.value = res.data
            total.value = res.data.count
        }
        // console.log('Implement', data)
        
    } else {
        let res = await http.getHandImplementDetail(params)
        // console.log('Implement', data)
        if (res.code === 200) {
            implmentData.value = res.data
            total.value = res.data.count
        }
    }
}
const handleSearch = () => {
    Implement(route.query.id)
}
// 执行时间拼接
function handleChangeDate(arr = []) {
    form.formData.exe_start_time = arr[0]
    form.formData.exe_end_time = arr[1]
    handleSearch()
}
// 成员搜索
const confirmChooseMember = r => {
    form.writeBackSelectedMemberOrg = r
    let member_id = []
    if (r && Array.isArray(r)) {
        r.map(ele => {
            member_id.push(ele.id)
        })
        form.formData.member = member_id
        handleSearch()
    }
}
// 重置
const handleReset = () => {
    form.formData = {}
    form.formData.page = 1
    form.formData.page_size = 10
    form.writeBackSelectedMemberOrg = []
    Implement(route.query.id)
}
// 返回当前任务的任务详情
const backToDetail = id => {
    // if (implmentData.value.task_property == 'HAND') {
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
// 时间筛选器
const getCheckTime = async id => {
    let { data } = await http.getImplementTime({ id })
    data.list.forEach((item, index) => {
        getWeek(item.change_time)
        data.list[index].showTime = moment(item.change_time).format(`MM-DD ${weekDate.value} HH:mm`)
    })
    timeData.value = data.list
    // console.log('getCheckTime', timeData.value)
}
const checkTime = item => {
    // console.log('checkTime', item)
    Implement(item.id)
    router.push({
        name: 'ImplementDetail',
        query: {
            id: item.id,
            is_repeat: implmentData.value.is_repeat
        }
    })
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
const getLabelSuccess = () => {
    let a = ''
    if (implmentData.value.touch_object == 'MOMENTS') {
        a = '已送达客户人数'
        return a 
    } if (implmentData.value.touch_object == 'SINGLE') {
        a = '已送达客户数'
        return a 
    } else {
        a = '已送达客户群数'
        return a
    }
}
const getLabelFail = () => {
    let a = ''
    if (implmentData.value.touch_object == 'MOMENTS') {
        a = '未送达客户人数'
        return a 
    } if (implmentData.value.touch_object == 'SINGLE') {
        a = '未送达客户数'
        return a 
    } else {
        a = '未送达客户群数'
        return a
    }
}
onMounted(() => {
    Implement(route.query.id)
    if (route.query.is_repeat == '1') {
        // console.log('11111111')
        getCheckTime(route.query.id)
    }
})
</script>

<style scoped lang="scss">
.page-scroll {
    min-height: calc(100vh - 144px) !important;
    height: calc(100vh - 144px) !important;
    overflow-y: auto;
}
.img-class {
    width: 400px;
    height: 264px;
}
.task-status {
    width: 395px;
    height: 40px;
    background: #fffbe6;
    border: 1px solid #ffe58f;
    border-radius: 2px;
    .task-status-text {
        font-size: 14px;
        font-weight: 400;
        color: #262626;
    }
}
// .timeCheck {
//     margin: auto;
// }
.titleClass {
    position: relative;
    .titleName {
        position: absolute;
        left: 0;
        color: #1773FA;
        font-weight: 500;
        font-size: 18px;
        &:hover{
            cursor: pointer;
            text-decoration: underline;
        }
    }
}
.status-circle-zero {
    // display: inline-block;
    width: 16px;
    height: 16px;
    background: #bfbfbf;
    border-radius: 50%;
}
.textClass {
    color: #171717;
    font-size: 14px;
}
.popoverClass {
    color: #000000;
    font-size: 14px;
}
.event-list-page {
    .cl-blue {
      color: #1773FA;
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
  .member-info-header {
    width: 400px;
    padding-bottom: 12px;
    border-bottom: 1px solid #ebeef5;
  }
  .member-info {
    display: flex;
    padding: 24px 0;
    align-items: center;
    img {
      width: 64px;
      height: 64px;
      border-radius: 4px;
      margin-right: 10px;
      vertical-align: middle;
    }
    .el-icon-male {
      margin-right: 10px;
    }
  }
  .color-black {
    color: #000;
  }
  .el-icon-document-copy:hover {
    color: #409eff;
    cursor: pointer;
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
  .member-detail-li {
    border-top: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    div {
      padding: 14px 24px;
      &:first-child {
        border-right: 1px solid #ebeef5;
      }
    }
    &:last-child {
      border-bottom: 1px solid #ebeef5;
    }
    .member-detail-left {
      width: 120px;
      background: #fafafa;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .member-detail-right{
        width: 254px;
    }
  }
  .no-data-box {
      position: absolute;

  }
</style>