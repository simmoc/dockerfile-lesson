<template>
    <div>
        <page-main class="page-scroll">
            <el-form
                size="small"
                label-position="top"
                :model="taskData"
                :rules="form.rules"
            >
                <div class="tagClass flex flex-align-center">
                    <CustomerTitle title="基础信息" />
                </div>
                <div>
                    <el-form-item 
                        label="任务名称" 
                        prop="name"
                    >
                        <el-input 
                            v-model="taskData.name"
                            type="text" 
                            placeholder="请输入" 
                            class="known"
                            maxlength="10"
                            show-word-limit
                        />
                    </el-form-item>
                    <el-form-item label="任务开始时间" prop="start_type">
                        <el-radio-group v-model="taskData.start_type" @change="timeChange()">
                            <el-radio label="IMMEDI">立即开始</el-radio>
                            <el-radio label="CUSTOM">
                                自定义时间
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-if="taskData.start_type == 'CUSTOM'" label="任务开始时间" prop="start_time">
                        <el-date-picker
                            v-model="taskData.start_time"
                            type="datetime"
                            format="MM-DD dddd HH:mm"
                            value-format="YYYY-MM-DD HH:mm:ss"
                            placeholder="请选择任务开始执行时间"
                            style="width: 520px"
                            :disabled-date="disabledStartDate"
                            @change="getStartTime()"
                        />
                    </el-form-item>
                    <el-form-item label="截止执行时间" prop="end_time">
                        <span class="tips-class">建议执行时长 大于 10 分钟，保证任务正常生成下发统计。</span>
                        <el-date-picker
                            v-model="taskData.end_time"
                            type="datetime"
                            format="MM-DD dddd HH:mm"
                            value-format="YYYY-MM-DD HH:mm:ss"
                            placeholder="请选择任务截止执行时间"
                            style="width: 520px"
                            :disabled-date="disabledEndDate"
                            @change="getEndTime()"
                        />
                    </el-form-item>
                    <el-form-item label="重复" prop="is_repeat">
                        <el-radio-group v-model="taskData.is_repeat" :disabled="editDisabled || nowStartDisabled">
                            <el-radio label="0">不重复</el-radio>
                            <el-radio label="1">
                                重复
                                <span v-if="route.query.type == 'add'">
                                    <span v-if="taskData.is_repeat == '1'&& repeatNum >= 0">共计该任务会重复{{ repeatNum }}次（包括当前任务）</span>
                                </span>
                                <span v-else>
                                    <span v-if="taskData.is_repeat == '1'">共计该任务会重复{{ taskData.repeat_task_num }}次（包括当前任务）</span>
                                </span>
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div v-if="taskData.is_repeat == '1'" class="repeatClass mb24 p20">
                        <el-form-item label="频率" prop="repeat_type">
                            <el-select v-model="taskData.repeat_type" placeholder="请选择" class="selectClass" :disabled="editDisabled" @change="switchRepeat(taskData.repeat_type)">
                                <el-option
                                    v-for="item in form.options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                        <div v-if="taskData.repeat_type == 'DAY'" class="selectClass flex flex-align-center">
                            每
                            <el-input v-model="taskData.repeat_space" placeholder="请输入" size="small" :disabled="editDisabled" @change="repeatTo('DAY')" />
                            日
                        </div>
                        <div v-if="taskData.repeat_type == 'WEEK'" class="selectClass flex flex-align-center">
                            <el-form-item label="每周的">
                                <el-checkbox-group v-model="taskData.repeat_node" :disabled="editDisabled" @change="repeatTo('WEEK')">
                                    <el-checkbox label="1">星期一</el-checkbox>
                                    <el-checkbox label="2">星期二</el-checkbox>
                                    <el-checkbox label="3">星期三</el-checkbox>
                                    <el-checkbox label="4">星期四</el-checkbox>
                                    <el-checkbox label="5">星期五</el-checkbox>
                                    <el-checkbox label="6">星期六</el-checkbox>
                                    <el-checkbox label="0">星期日</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </div>
                        <div v-if="taskData.repeat_type == 'MONTH'">
                            <div class="flex flex-align-center">
                                每
                                <el-select v-model="taskData.repeat_space" placeholder="请选择" size="small" :disabled="editDisabled" class="selectClass" @change="repeatTo('MONTH')">
                                    <el-option
                                        v-for="item in 12"
                                        :key="item"
                                        :value="item"
                                        :label="item"
                                    />
                                </el-select>
                                月
                            </div>
                            <ClanderCheck v-model="taskData.repeat_node" @selectMonth="selectMonth" />
                        </div>
                        <el-form-item label="重复至" prop="repeat_deadline" class="mt12">
                            <el-select v-model="taskData.repeat_deadline" placeholder="请选择" class="selectClass" :disabled="editDisabled">
                                <el-option
                                    v-for="item in ruleDate"
                                    :key="item"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                    </div>
                </div>

                <div class="tagClass flex flex-align-center">
                    <CustomerTitle title="目标对象" />
                </div>
                <div>
                    <el-form-item label="选择对象类型" prop="touch_object">
                        <el-radio-group v-model="taskData.touch_object" @change="goSwitch()">
                            <el-radio label="SINGLE">发送给客户</el-radio>
                            <el-radio label="GROUP">发送给客户群</el-radio>
                            <el-radio label="MOMENTS">发送到朋友圈</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div v-if="taskData.touch_object == 'SINGLE'">
                        <el-form-item label="筛选客户" prop="receive_type" @change="getTouchNum">
                            <el-radio-group v-model="taskData.receive_type">
                                <el-radio label="1">按条件筛选客户</el-radio>
                                <el-radio label="0">全部</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-row v-if="taskData.receive_type == '1'">
                            <el-col :span="11" class="mr24">
                                <el-form-item label="标签筛选" prop="receive_group" @change="labelChange">
                                    <calendarSelect
                                        v-model="treeChecked"
                                        :edit-select-list="selectList"
                                        @closeTag="labelChange"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="成员筛选" prop="receive_group">
                                    <calendarSelectMember
                                        input-placeholder="请选择"
                                        :write-back-selected-member-org="form.writeBackSelectedMemberOrg"
                                        :is-multiple-selected="true"
                                        :custom-input-value-fn="form.customInputValueFn"
                                        :custom-selected-fn="customSelectedFn"
                                        :touch-object="taskData.touch_object"
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
                            </el-col>
                        </el-row>
                    </div>
                    <div v-if="taskData.touch_object == 'GROUP'">
                        <label class="el-form-item__label">
                            <i class="color-red">*</i>
                            筛选群主
                        </label>
                        <el-form-item label="成员筛选" prop="receive_group">
                            <calendarSelectMember
                                input-placeholder="请选择"
                                :write-back-selected-member-org="form.writeBackSelectedMemberOrg"
                                :is-multiple-selected="true"
                                :custom-input-value-fn="form.customInputValueFn"
                                :custom-selected-fn="customSelectedFn"
                                :touch-object="taskData.touch_object"
                                @confirm="confirmChooseMember"
                            >
                                <template #default="scope">
                                    <el-input
                                        v-model="scope.data"
                                        placeholder="请选择"
                                        suffix-icon="el-icon-caret-bottom"
                                        readonly
                                        class="known"
                                    />
                                </template>
                            </calendarSelectMember>
                        </el-form-item>
                    </div>
                    <div v-if="taskData.touch_object == 'MOMENTS'">
                        <el-form-item label="可见客户" prop="receive_type" @change="getTouchNum">
                            <el-radio-group v-model="taskData.receive_type">
                                <el-radio label="1">按条件筛选客户</el-radio>
                                <el-radio label="0">全部</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-row v-if="taskData.receive_type == '1'">
                            <el-col class="mr24" :span="11">
                                <el-form-item label="标签筛选" prop="receive_group" @change="labelChange">
                                    <calendarSelect
                                        v-model="treeChecked"
                                        :edit-select-list="selectList"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="成员筛选" prop="receive_group">
                                    <calendarSelectMember
                                        :write-back-selected-member-org="form.writeBackSelectedMemberOrg"
                                        :is-multiple-selected="true"
                                        :custom-input-value-fn="form.customInputValueFn"
                                        :custom-selected-fn="customSelectedFn"
                                        :touch-object="taskData.touch_object"
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
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <div class="tagClass flex flex-align-center">
                    <CustomerTitle title="触达动作" />
                </div>
                <div v-if="taskData.touch_object != 'MOMENTS'" class="search-head-wrap">
                    <el-form-item label="触达方式" prop="task_type" @change="getTouchNum">
                        <el-radio-group v-model="taskData.task_type">
                            <el-radio label="3">企业群发</el-radio>
                            <!-- <el-radio label="2">成员群发</el-radio> -->
                            <el-radio label="1">成员单发</el-radio>
                        </el-radio-group>
                        <div v-if="route.query.type == 'add'">
                            <span v-if="taskData.touch_object != 'GROUP'">预估触达客户数：{{ taskData.can_touch_num }}，筛选客户数：{{ taskData.all_customer_num }}，不可触达数：{{ taskData.no_touch_num }}</span>
                            <span v-else>预估触达客户群数：{{ taskData.can_touch_num }}，筛选客户群数：{{ taskData.all_customer_num }}，不可触达数：{{ taskData.no_touch_num }}</span>
                        </div>
                        <div v-else>
                            <div v-if="taskData.can_touch_num >= 0">
                                <span v-if="taskData.touch_object != 'GROUP'">预估触达客户数：{{ taskData.can_touch_num }}，筛选客户数：{{ taskData.all_customer_num }}，不可触达数：{{ taskData.no_touch_num }}</span>
                                <span v-else>预估触达客户群数：{{ taskData.can_touch_num }}，筛选客户群数：{{ taskData.all_customer_num }}，不可触达数：{{ taskData.no_touch_num }}</span>
                            </div>
                            <div v-else>
                                <span v-if="taskData.touch_object != 'GROUP'">预估触达客户数：{{ taskData.select_receiver_num - taskData.no_touch_num }}，筛选客户数：{{ taskData.select_receiver_num }}，不可触达数：{{ taskData.no_touch_num }}</span>
                                <span v-else>预估触达客户群数：{{ taskData.select_receiver_num - taskData.no_touch_num }}，筛选客户群数：{{ taskData.select_receiver_num }}，不可触达数：{{ taskData.no_touch_num }}</span>
                            </div>
                        </div>
                    </el-form-item>
                    <el-row>
                        <div class="known">
                            <el-form-item required>
                                <label class="el-form-item__label">
                                    <i class="color-red">*</i>
                                    消息内容
                                    <span class="el-form-item_label-span">
                                        可添加素材数量 {{ taskData.content_arr.length }}/10
                                    </span>
                                </label>
                                <CustomerMedia v-model="taskData.content_arr" :text-limit="800" />
                            </el-form-item>
                        </div>
                    </el-row>
                    <div class="item-button tr">
                        <el-button @click="hanldeEnd">取消</el-button>
                        <el-button type="primary" :loading="submitLoad" @click="submitTask()">提交</el-button>
                    </div>
                </div>
                <div v-else class="search-head-wrap">
                    <el-form-item label="触达方式" prop="task_type">
                        <el-radio-group v-model="taskData.task_type" @change="momentSwitch">
                            <el-radio label="4">企业发表客户朋友圈</el-radio>
                            <el-radio label="5">成员发表客户朋友圈</el-radio>
                        </el-radio-group>
                        <div v-if="route.query.type == 'add'">
                            <span>预估触达客户数：{{ taskData.can_touch_num }}，筛选客户数：{{ taskData.all_customer_num }}，不可触达数：{{ taskData.no_touch_num }}</span>
                        </div>
                        <div v-else>
                            <div v-if="taskData.can_touch_num >= 0">
                                <span>预估触达客户数：{{ taskData.can_touch_num }}，筛选客户数：{{ taskData.all_customer_num }}，不可触达数：{{ taskData.no_touch_num }}</span>
                            </div>
                            <div v-else>
                                预估触达客户数：{{ taskData.select_receiver_num - taskData.no_touch_num }}，筛选客户数：{{ taskData.select_receiver_num }}，不可触达数：{{ taskData.no_touch_num }}
                            </div>
                        </div>
                    </el-form-item>
                    <el-row>
                        <div class="known">
                            <el-form-item required>
                                <label class="el-form-item__label">
                                    <i class="color-red">*</i>
                                    消息内容
                                    <span class="el-form-item_label-span">
                                        可添加素材数量 {{ taskData.content_arr.length }}/10
                                    </span>
                                </label>
                                <CustomerClander v-model="taskData.content_arr" :text-limit="800" :task-type="taskData.task_type" />
                            </el-form-item>
                        </div>
                    </el-row>
                    <div class="item-button tr">
                        <el-button @click="hanldeEnd">取消</el-button>
                        <el-button type="primary" :loading="submitLoad" @click="submitTask()">提交</el-button>
                    </div>
                </div>
            </el-form>
        </page-main>
        <!-- 取消编辑 -->
        <calendarDialog title="提示" :dialog-button="dialogButton" :dialog-visible="dialogIsTaskTabs && !dialogEdit" width="400px" :confirm-fn="()=>goTaskIndex()" @cancel="cancelDialog">
            <div class="group_name">当前页面为保存，请确认是否关闭该页面</div>
        </calendarDialog>
        <calendarDialog title="提示" :dialog-edit-text="dialogEditText" :dialog-visible="dialogIsTaskTabs && dialogEdit" width="400px" :confirm-fn="()=>editSubmit('2')" :confirm-fn-type="()=>editSubmit('1')">
            <div class="group_name">仅修改此任务，还是修改将来的所有任务?</div>
        </calendarDialog>
        <el-dialog
            v-model="dialogIsSwitch"
            title="温馨提示"
            width="400px"
            :before-close="cancelSwitch"
        >
            <span class="group_name">
                切换目标对象，会导致已编辑的触达动作内容清空。确认是否继续切换？
            </span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button size="small" @click="cancelSwitch">取消</el-button>
                    <el-button type="primary" size="small" @click="switchTarget">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import Http from '@/util/request'
import moment from 'moment'
import { getRuleDatetime } from '@/util/index'
// import moment from 'moment'
import { reactive, ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import calendarDialog from '@/views/marketing/task/compontent/calendarDialog.vue'
import calendarSelect from './compontent/calendarSelect.vue'
import calendarSelectMember from './compontent/calendar-select-member.vue'
import CustomerMedia from '@/components/CustomerMedia/index.vue'
import CustomerClander from '@/components/CustomerClander/index.vue'
import CustomerTitle from '@/components/CustomerTitle/index.vue'
import ClanderCheck from '@/components/ClanderCheck/index.vue'
import { bounce } from '@/util/index'
const router = useRouter()
const route = useRoute()
// 切换重复频率,防止携带
const stopSwitch = ref([])
// 重复至选择任务周期
const ruleDate = ref([])
// 时间星期几命名
const weekDate = ref('')
const treeChecked = ref([])
const selectList = ref([])
const editParams = ref({})
const dialogEdit = ref(false)
const dialogEditText = ref(false)
const dialogButton = ref(false)
// 编辑页时候禁止更改重复
const editDisabled = ref(false)
// 立即开始禁选
const nowStartDisabled = ref(false)
// const weekDate = ref('')
const dialogIsTaskTabs = ref(false)
// 重复任务数量，接口请求获得
const repeatNum = ref(0)
// 提交页面只能一次
// const btnOnce = ref(false)
// 切换目标对象
const dialogIsSwitch = ref(false)
// 页面初始化的时候刚点击目标对象不能出现弹窗
const swicthObject = ref(false)
// 编辑时刚点击目标对象出现弹窗
const editSwicthObject = ref(false)
// 提交loading
const submitLoad = ref(false)
const taskData = ref({
    name: '',
    end_time: '',
    start_time: '',
    touch_object: '',
    receive_type: '',
    task_type: '',
    is_repeat: '',
    repeat_type: '',
    repeat_deadline: '',
    repeat_space: '',
    receive_group: [],
    repeat_node: [],
    content_arr: [],
    all_customer_num: 0,
    no_touch_num: 0,
    can_touch_num: 0,
    // 编辑时筛选数目
    select_receiver_num: 0,
    // 编辑时重复数量
    repeat_task_num: 0,
    start_type: ''
}) 
// 数组存储切换位置
const swtichTouchObject = ref([])
// const datePick = ref('')
const form = reactive({
    taskTitle: '',
    manualTask: '',
    planTask: '',
    writeBackSelectedMemberOrg: [],
    customInputValueFn: param => {
        return getShowStr(param, 3) || ''
    },
    rules: {
        name: [
            { required: true, message: '任务名称是必填项' },
            { max: 10, message: '任务名称长度仅为10个字', trigger: 'blur' }
        ],
        end_time: [
            { required: true, message: '任务截止执行时间是必填项', trigger: 'blur' }
        ],
        start_type: [
            { required: true, message: '任务开始时间是必选项', trigger: 'change' }
        ],
        touch_object: [
            { required: true, message: '选择对象类型是必填项', trigger: 'change' }
        ],
        receive_type: [
            { required: true, message: '筛选客户是必填项', trigger: 'change' }
        ],
        task_type: [
            { required: true, message: '触达方式是必填项', trigger: 'change' }
        ],
        is_repeat: [
            { required: true, message: '任务是否重复是必填项', trigger: 'blur' }
        ]
    },
    options: [
        {
            value: 'DAY',
            label: '按日重复'
        },
        {
            value: 'WEEK',
            label: '按周重复'
        },
        {
            value: 'MONTH',
            label: '按月重复'
        }
    ]
})

const goSwitch = () => {
    // console.log('editSwicthObject', editSwicthObject.value)
    if (editSwicthObject.value) {
        swicthObject.value = true
    }
    // console.log('swicthObject', swicthObject.value)
    if (!swicthObject.value) {
        swicthObject.value = true
    } else {
        dialogIsSwitch.value = true
    } 
    swtichTouchObject.value.push(taskData.value.touch_object)
}
const switchTarget = () => {
    swtichTouchObject.value = []
    swtichTouchObject.value.push(taskData.value.touch_object)
    // taskData.value.receive_type = ''
    taskData.value.content_arr = []
    // taskData.value.receive_group[0] = {}
    // form.writeBackSelectedMemberOrg = []
    // console.log('receive_group', taskData.value.receive_group)
    // taskData.value.task_type = ''
    // taskData.value.all_customer_num = 0
    // taskData.value.no_touch_num = 0
    // taskData.value.can_touch_num = 0
    // taskData.value.select_receiver_num = 0
    dialogIsSwitch.value = false
    getTouchNum()
}
const cancelSwitch = () => {
    for (let i =  1; i < swtichTouchObject.value.length; i++) {
        swtichTouchObject.value.slice(i, swtichTouchObject.value.length - 1)
        taskData.value.touch_object = swtichTouchObject.value[0]
    }
    dialogIsSwitch.value = false
}
const momentSwitch = () => {
    taskData.value.content_arr = []
    getTouchNum()
}
const labelChange = () => {
    // console.log('1111111')
    getTouchNum()
}

// // 控制选择离当前时间20h以后
const getStartTime = () => {
    // const timeRange = 20 * 60 * 60 * 1000 // 20小时
    // if ((moment(taskData.value.start_time).unix() * 1000) - 1 < (new Date() - 1) + timeRange) {
    //     ElMessage.error({
    //         message: '所选任务时长小于当前时间，请选择超越当前时长20小时的时长!'
    //     })
    //     taskData.value.start_time = ''
    //     return
    // }
    if ((moment(taskData.value.start_time).unix() * 1000) - 1 < (new Date() - 1)) {
        ElMessage.error({
            message: '所选任务开始时长小于当前时间，请重新选择大于当前时长的任务开始时间!'
        })
        taskData.value.start_time = ''
        return
    }
    repeatTo(taskData.value.repeat_type)
}
const getEndTime = () => {
    // const timeHour = 1 * 60 * 60 * 1000 // 一小时
    // console.log('valuevalue', (moment(taskData.value.end_time).unix() * 1000) - 1 < ((moment(taskData.value.start_time).unix() * 1000) - 1) + timeHour)
    // if ((moment(taskData.value.end_time).unix() * 1000) - 1 < ((moment(taskData.value.start_time).unix() * 1000) - 1) + timeHour) {
    //     ElMessage.error({
    //         message: '所选任务截止时长小于任务开始时间，请选择超越任务开始时间1小时的时长!'
    //     })
    //     taskData.value.end_time = ''
    //     return
    // }
    const timeMinute = 1 * 60 * 1000 // 一分钟
    if ((moment(taskData.value.end_time).unix() * 1000) - 1 < (new Date() - 1)) {
        ElMessage.error({
            message: '所选任务截止时长小于当前时间，请重新选择大于当前时长的任务截止时间!'
        })
        taskData.value.end_time = ''
        return true
    }
    if ((moment(taskData.value.end_time).unix() * 1000) - 1 < ((moment(taskData.value.start_time).unix() * 1000) - 1) + timeMinute) {
        ElMessage.error({
            message: '所选任务截止时长小于任务开始时间，请选择超越任务开始时间1分钟以上的时长!'
        })
        taskData.value.end_time = ''
        return true
    }
}
// 切换任务开始时间时的时间变化
const timeChange = () => {
    if (taskData.value.start_type == 'CUSTOM') {
        taskData.value.end_time = ''
        if (route.query.type == 'add') {
            taskData.value.is_repeat = '0'
        } else {
            taskData.value.is_repeat = '1'
        }
    }
    if (taskData.value.start_type == 'IMMEDI') {
        taskData.value.start_time = ''
        taskData.value.end_time = ''
    }
}
// 开始时间限制今天以往时间被选择
function disabledStartDate(time) {
    const timeRange = 24 * 60 * 60 * 1000
    // console.log('11111', time)
    return time.getTime() < Date.now() - timeRange
}
// 最多一个月时间间隔
function disabledEndDate(time) {
    const timeRange = 24 * 60 * 60 * 1000
    const minTime = Date.now() - timeRange
    // let minTime = new Date(taskData.value.start_time).getTime()
    // console.log('1111', minTime)
    const maxTime = minTime + timeRange * 30
    return time.getTime() < minTime || time.getTime() > maxTime
}
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
// 切换重复频率
const switchRepeat = type => {
    // stopSwitch.value.push(type)
    // console.log('切换前的stopSwitch.value', stopSwitch.value)
    // for (let i = 1; i < stopSwitch.value.length; i++) {
    //     if (stopSwitch.value[i - 1] != stopSwitch.value[i]) {
    //         taskData.value.repeat_node = []
    //         stopSwitch.value = []
    //         taskData.value.repeat_deadline = ''
    //         console.log('切换后的taskData.value.repeat_node', taskData.value.repeat_node)
    //         repeatTo(type)
    //     } else {
    //         repeatTo(type)
    //     }
    // }
    taskData.value.repeat_node = []
    stopSwitch.value = []
    taskData.value.repeat_deadline = ''
    taskData.value.repeat_space = ''
    // console.log('切换后的taskData.value.repeat_node', taskData.value.repeat_node)
    repeatTo(type)
}
// 重复至选项处理
const repeatTo = type => {
    ruleDate.value = []
    // console.log('type', type)
    let { start_time, repeat_space, repeat_node } = taskData.value
    if ((type == 'DAY' || type == 'MONTH') && repeat_space == '') {
        return
    }
    // console.log('taskData.value', repeat_space, repeat_node, start_time)
    ruleDate.value = getRuleDatetime(type, repeat_space, repeat_node, start_time, 'MM-DD dddd HH:mm')
    // console.log('ruleDate', ruleDate.value)
}
// 月份选择组件获取值
function selectMonth(arr) {
    taskData.value.repeat_node = arr
    // console.log('taskData.value.repeat_node', taskData.value.repeat_node, arr)
    repeatTo('MONTH')
}
// 页面取消
function hanldeEnd() {
    dialogButton.value = true
    dialogEdit.value = false
    dialogIsTaskTabs.value = true   
}
// 页面取消修改任务弹出框(确认)
const goTaskIndex = () => {
    router.push({
        name: 'calendar'
    })
}
// 页面取消修改任务弹出框(取消)
const cancelDialog = () => {
    dialogIsTaskTabs.value = false
}
// 编辑的提交
const editSubmit = bounce(async check => {
    let start = ''
    // 处理媒体组件数据
    const { mediaList, content } = await paramsFormat(taskData.value.content_arr)

    let tag_ids = []
    if (treeChecked.value.length == 0 && JSON.stringify(taskData.value.receive_group) != '[]') {
        taskData.value.receive_group[0].tag_ids = tag_ids
    } else {
        treeChecked.value.forEach(element => {
            tag_ids.push(element.tag_id)
            taskData.value.receive_group[0].tag_ids = tag_ids
        })
    }
    if (taskData.value.receive_type == '1') {
        if ((!form.writeBackSelectedMemberOrg || !form.writeBackSelectedMemberOrg[0])  && treeChecked.value.length == 0) {
            ElMessage.error('条件组都为空，请选择一种条件')
            return
        }
    }
    if (taskData.value.name == '') {
        ElMessage.error('任务名称为空，请设置任务名称')
        return
    }
    if (taskData.value.touch_object == '') {
        ElMessage.error('目标对象未选择，请选择目标对象')
        return
    }
    if (taskData.value.task_type == '') {
        ElMessage.error('触达动作方式未选择，请选择触达动作方式')
        return
    }
    let end = getEndTime()
    if (start || end) return

    // 点击一次提交按钮，置灰，防止重复点击
    // btnOnce.value = true
        
    editParams.value = taskData.value
    editParams.value.update_type = check
    editParams.value.id = route.query.id
    editParams.value.content = content
    editParams.value.annex_content_json = mediaList
    let res = ''
    submitLoad.value = true
    dialogIsTaskTabs.value = false
    try {
        res = await Http.updateTaskSave(editParams.value)
        // console.error('res', res)
        if (res.code === 200) {
            ElMessage.success({
                message: '修改成功'
            })
            router.push({
                name: 'calendar'
            })
        }
    } finally {
        submitLoad.value = false
    }

})
// 提交
const submitTask = bounce(async() => {
    // 处理媒体组件数据
    const { mediaList, content } = await paramsFormat(taskData.value.content_arr)
    if (content == '' && mediaList == '') {
        ElMessage.error('请输入要发送的消息内容和对应附件')
        return
    }
    if (taskData.value.start_type == '') {
        ElMessage.error('请选择任务开始时间')
        return
    }
    // 立即开始是后端传的开始时间
    if (taskData.value.start_type == 'IMMEDI' && !taskData.value.end_time) {
        ElMessage.error('请填写任务时间')
        return
    }
    if (taskData.value.start_type == 'CUSTOM' && (!taskData.value.start_time || !taskData.value.end_time)) {
        ElMessage.error('请填写任务时间')
        return
    }
    let end = getEndTime()
    if (end) return
    // if (content == '' && taskData.value.touch_object == 'MOMENTS' && taskData.value.task_type == '5') {
    //     ElMessage.error('成员发客户朋友圈任务需发送文本，文本内容未填写')
    //     return
    // }
    if (route.query.type == 'add') {
        if (route.query.title == '计划任务') {
            taskData.value.task_property = 'PLAN'
            if (taskData.value.touch_object == 'GROUP') {
                taskData.value.receive_type = '1'
                // console.log('22222222', taskData.value.receive_type)
            }
            if (taskData.value.repeat_space == '') {
                taskData.value.repeat_space = '1'
            }
            if (taskData.value.name == '') {
                ElMessage.error('任务名称为空，请设置任务名称')
                return
            }
            if (taskData.value.task_type == '') {
                ElMessage.error('目标对象未选择，请选择目标对象')
                return
            }
            if (taskData.value.receive_type == '') {
                ElMessage.error('筛选客户未选择，请筛选客户')
                return
            }
        }
        let tag_ids = []
        if (JSON.stringify(taskData.value.receive_group) != '[]') {
            if (treeChecked.value.length == 0) {
                // console.log('123', treeChecked.value)
                taskData.value.receive_group[0].tag_ids = tag_ids
            } else {
                treeChecked.value.forEach(element => {
                    tag_ids.push(element.tag_id)
                    taskData.value.receive_group[0].tag_ids = tag_ids
                })
            }
            if (JSON.stringify(taskData.value.receive_group[0]) == '{}' && taskData.value.receive_type == '1') {
                ElMessage.error('条件组都为空，请选择一种条件')
                return
            }
        }

        // 点击一次提交按钮，置灰，防止重复点击
        // btnOnce.value = true
        
        getTouchNum()
        let params = taskData.value
        params = taskData.value
        params.content = content
        params.annex_content_json = mediaList
        let res = ''
        submitLoad.value = true
        try {
            res = await Http.addTask(params)
            if (res.code === 200) {
                ElMessage.success({
                    message: '提交成功'
                })
                router.push({
                    name: 'calendar'
                })
            }
            // if (res.code === 400) {
            //     submitLoad.value = false
            // }
        } finally {
            submitLoad.value = false
        }
    } 
    if (route.query.type == 'edit') {
        if (taskData.value.is_repeat == '1') {
            dialogEditText.value = true
            dialogIsTaskTabs.value = true
            dialogEdit.value = true
        } else {
            editSubmit('1')
        }
    } 
})
// 编辑时获取任务数据
const getEditDetail = async id => { 
    // 编辑时重复框禁止使用
    editDisabled.value = true

    let { data } = await Http.editOrDetailTask({ id })
    taskData.value = data
    // console.log('can_touch_num', taskData.value.can_touch_num)
    // getTouchNum()
    if (taskData.value.is_repeat == '1') {
        getTaskRepeatNum()
    }

    // 任务重复至时间
    getWeek(taskData.value.repeat_deadline)
    taskData.value.repeat_deadline = moment(taskData.value.repeat_deadline).format(`MM-DD ${weekDate.value} HH:mm`)
    // console.error(taskData.value.repeat_deadline)

    taskData.value.content_arr = mediaResFormat(data)

    if (JSON.stringify(taskData.value.receive_group) != '[]') {
        if (taskData.value.receive_group[0].tag_arr) {
            selectList.value = taskData.value.receive_group[0].tag_arr
        }
        if (taskData.value.receive_group[0].select_members_info) {
            form.writeBackSelectedMemberOrg = taskData.value.receive_group[0].select_members_info
        }
    }
    // console.log('taskData.value', taskData.value)
    // console.log('form.writeBackSelectedMemberOrg', form.writeBackSelectedMemberOrg)
}
// moment插件返回周几时间戳错误，重新处理
function getWeek(date) {
    let week = moment(date).day()
    switch (week) {
        case 1:
            return weekDate.value = '星期一'
        case 2:
            return weekDate.value = '星期二'
        case 3:
            return weekDate.value = '星期三'
        case 4:
            return weekDate.value = '星期四'
        case 5:
            return weekDate.value = '星期五'
        case 6:
            return weekDate.value = '星期六'
        case 0:
            return weekDate.value = '星期日'
    }
}
// 媒体组件格式化
const paramsFormat = list => {
    let mediaList = []
    let content = ''
    console.log('初始化前参数', list)
    if (!list.length) Promise.resolve({ mediaList: mediaList, content: content })
    console.log('初始化前参数', list)

    list.forEach(item => {
        let newItem = {}
        switch (item.type) {
            case 'IMAGE':
                newItem.type = 'images'
                newItem.source_id = item.file_id
                newItem.upload_url = item.file_url
                break
            case 'VIDEO':
                newItem.type = 'video'
                newItem.source_id = item.file_id
                newItem.media_url = item.file_url
                newItem.title = item.title
                break
            case 'LINK':
                newItem.type = 'web_page'
                newItem.file_id = item.file_id
                newItem.upload_url = item.file_url
                // 拼接链接
                newItem.url = item.url + item.qw_link_url
                newItem.title = item.qw_link_title
                newItem.description = item.qw_link_desc
                // newItem.url = item.url
                break
            case 'MINIPROGRAM':
                newItem.type = 'we_applets'
                newItem.appid = item.qw_miniprogram_appid
                newItem.source_id = item.file_id
                newItem.title = item.qw_miniprogram_title
                newItem.url = item.qw_miniprogram_page
                newItem.upload_url = item.file_url
                break
            case 'FILE':
                newItem = item
                break
            case 'TEXT':
                content = content + item.content
                break

        }
        if (JSON.stringify(newItem) !== '{}') {
            mediaList.push(newItem)
        }
    })
    // 倒转数组
    // mediaList.reverse()
    return Promise.resolve({ mediaList: mediaList, content: content })
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
            
    console.log('处理前数据', response.annex_content_json)
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
// 获取任务重复数量（包括当前任务）
const getTaskRepeatNum = async() => {
    if (taskData.value.repeat_space == '' && taskData.value.repeat_type == 'WEEK') {
        taskData.value.repeat_space = '1'
    }
    if (taskData.value.start_time == '' || taskData.value.end_time == '') {
        ElMessage.error('任务时间未填写，请填写任务时间')
        return
    }
    let params = {}
    params.start_time = taskData.value.start_time
    params.end_time = taskData.value.end_time
    params.repeat_type = taskData.value.repeat_type
    params.repeat_space = taskData.value.repeat_space
    params.repeat_node = taskData.value.repeat_node
    params.repeat_deadline = taskData.value.repeat_deadline
    let { data } = await Http.getTaskRepeatNum(params)
    // console.error('data', data)
    repeatNum.value = data.num
}
// 预估触达数量统计
const getTouchNum = async() => {
    console.log('xx标签有没有进来？')
    if (taskData.value.start_type == '') {
        ElMessage.warning('请选择任务开始时间')
        return
    }
    // 立即开始是后端传的开始时间
    if (taskData.value.start_type == 'IMMEDI' && !taskData.value.end_time) {
        ElMessage.error('请填写任务时间')
        return
    }
    if (taskData.value.start_type == 'CUSTOM' && (!taskData.value.start_time || !taskData.value.end_time)) {
        ElMessage.error('请填写任务时间')
        return
    }
    if (taskData.value.name == '' || taskData.value.task_type == '') {
        taskData.value.all_customer_num = 0,
        taskData.value.no_touch_num = 0,
        taskData.value.can_touch_num = 0
        return
    } else if (taskData.value.receive_group == '' && JSON.stringify(treeChecked.value) == '[]' && JSON.stringify(taskData.value.receive_group[0].select_members) == '{}') {
        taskData.value.all_customer_num = 0,
        taskData.value.no_touch_num = 0,
        taskData.value.can_touch_num = 0
        return
    } else {
        let params = {}
        if (route.query.title == '计划任务') {
            params.task_property = 'PLAN'
        }
        if (taskData.value.task_type == '') {
            taskData.value.task_type = '3'
        }
        if (taskData.value.touch_object == 'GROUP') {
            taskData.value.receive_type = '1'
            // console.log('11111111', taskData.value.receive_type)
        }
        console.log('treeChecked', treeChecked.value)
        let tag_ids = []
        if (treeChecked.value != '') { 
            treeChecked.value.forEach(element => { 
                tag_ids.push(element.tag_id)
                // console.log('tag_ids', tag_ids, element.tag_id)     
            })
            if (route.query.type == 'edit' && !taskData.value.receive_group[0]) {
                taskData.value.receive_group.push({})
            }
            // console.log('tag_ids', taskData.value.receive_group[0])  
            taskData.value.receive_group[0].tag_ids = tag_ids
        } else {
            console.log('tag_ids', taskData.value.receive_group[0]) 
            taskData.value.receive_group[0].tag_ids = tag_ids
        }
        if (taskData.value.receive_type == '') {
            ElMessage.error('筛选客户未选择，请筛选客户')
            return
        }
        // console.log('taskData.value.receive_group', taskData.value.receive_group[0].tag_ids)
        params.start_type = taskData.value.start_type
        params.touch_object = taskData.value.touch_object
        params.task_type = taskData.value.task_type
        params.start_time = taskData.value.start_time
        params.receive_type = taskData.value.receive_type
        params.receive_group = taskData.value.receive_group
        let { data } = await Http.getTouchNum(params)
        taskData.value.all_customer_num = data.all_customer_num
        taskData.value.no_touch_num = data.no_touch_num
        taskData.value.can_touch_num = data.can_touch_num
    }
}

watch(() => taskData.value, () => {
    if (taskData.value.repeat_deadline != '' && taskData.value.is_repeat != '0') {
        getTaskRepeatNum()
    }
}, {
    immediate: true,
    deep: true
})
watch(() => taskData.value.start_type, () => {
    if (taskData.value.start_type == 'IMMEDI') {
        nowStartDisabled.value = true
        taskData.value.is_repeat = '0'
    } else {
        nowStartDisabled.value = false
    }
}, {
    immediate: true,
    deep: true
})

function confirmChooseMember(r) {
    console.log('rrrrr', r)
    form.writeBackSelectedMemberOrg = r
    let select_members = []
    if (r && Array.isArray(r)) {
        r.map(ele => {
            // console.log('eleele', ele)
            select_members.push(ele.id)
        })
    }
    if (route.query.type == 'edit' && !taskData.value.receive_group[0]) {
        taskData.value.receive_group.push({})
    }
    // console.log('select_members', taskData.value.receive_group[0].select_members)  
    if (JSON.stringify(r) != '[]') {
        taskData.value.receive_group[0].select_members = select_members
    } else {
        taskData.value.receive_group[0].select_members = []
    }
    getTouchNum()
}
onMounted(async() => {
    if (route.query.type == 'edit') {
        await getEditDetail(route.query.id)
        editSwicthObject.value = true
        swtichTouchObject.value.push(taskData.value.touch_object)
    }
    if (route.query.type == 'add') {
        taskData.value.content_arr[0] = {
            type: 'TEXT',
            content: ''
        }
        taskData.value.receive_group[0] = {}
    }
})
</script>

<style scoped lang="scss">
.page-scroll {
    position: relative;
    min-height: calc(100vh - 144px) !important;
    height: calc(100vh - 144px) !important;
    overflow-y: auto;
    .tips-class {
        position: absolute;
        top: -27px;
        left: 102px;
        font-size: 14px;
        font-weight: 400;
        color: #f5222d;
        line-height: 22px;
    }
}
.search-head-wrap{
    width: 520px;
}
.color-red {
    color: #ff3b34;
}
.known {
    width: 520px
}
.tagClass {
    .numClass{
        width: 20px;
        height: 20px;
        background: #1773fa;
        border-radius: 50%;
        position: relative;
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: center;
        color: #ffffff;
        line-height: 20px;
    }
    .textClass{
        font-weight: 600;
        color: #171717;
    }
}
.repeatClass{
    width: 520px;
    border: 1px solid #D9D9D9;
}
.selectClass{
    width: 100%;
    box-sizing: border-box;
}
form.el-form .el-form-item__label {
    font-size: 14px;
}
.el-form-item__label .el-form-item_label-span {
    width: 110px;
    height: 17px;
    opacity: 0.85;
    font-size: 12px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #909399;
    line-height: 17px;
    margin-left: 8px;
}
</style>