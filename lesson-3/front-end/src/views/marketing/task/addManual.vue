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
                <!-- <el-tag effect="dark">1</el-tag> -->
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
                    <el-form-item label="任务截止时间" prop="end_time">
                        <el-date-picker
                            v-model="taskData.end_time"
                            type="datetime"
                            format="MM-DD HH:mm"
                            value-format="YYYY-MM-DD HH:mm:ss"
                            placeholder="请选择任务截止时间"
                            style="width: 520px"
                            :disabled-date="disabledDate"
                            @change="getEndTime()"
                        />
                    </el-form-item>
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
                        <el-row v-if="taskData.receive_type == '1'" :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="标签筛选" prop="receive_group" @change="getTouchNum">
                                    <calendarSelect
                                        v-model="treeChecked"
                                        :edit-select-list="selectList"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="成员筛选" prop="receive_group">
                                    <selectMember
                                        ref="addMemberDialogRef"
                                        input-placeholder="请选择企微成员"
                                        :is-group="taskData.touch_object == 'GROUP'"
                                        :is-multiple-selected="true"
                                        :custom-input-value-fn="form.customInputValueFn"
                                        :custom-selected-fn="customSelectedFn"
                                        style="width: 200px"
                                        @confirm="confirmChooseMember"
                                    >
                                        <template #default="scope">
                                            <span>
                                                <el-input
                                                    v-model="scope.data"
                                                    placeholder="请选择"
                                                    suffix-icon="el-icon-caret-bottom"
                                                    readonly
                                                />
                                            </span>
                                        </template>
                                    </selectMember>
                                    <!-- <calendarSelectMember
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
                                    </calendarSelectMember> -->
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
                            <selectMember
                                ref="addMemberDialogRef"
                                input-placeholder="请选择企微成员"
                                :is-group="taskData.touch_object == 'GROUP'"
                                :is-multiple-selected="true"
                                :custom-input-value-fn="form.customInputValueFn"
                                :custom-selected-fn="customSelectedFn"
                                style="width: 200px"
                                @confirm="confirmChooseMember"
                            >
                                <template #default="scope">
                                    <span>
                                        <el-input
                                            v-model="scope.data"
                                            placeholder="请选择"
                                            suffix-icon="el-icon-caret-bottom"
                                            readonly
                                        />
                                    </span>
                                </template>
                            </selectMember>
                            <!-- <calendarSelectMember
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
                            </calendarSelectMember> -->
                        </el-form-item>
                    </div>
                    <div v-if="taskData.touch_object == 'MOMENTS'">
                        <el-form-item label="可见客户" prop="receive_type" @change="getTouchNum">
                            <el-radio-group v-model="taskData.receive_type">
                                <el-radio label="1">按条件筛选客户</el-radio>
                                <el-radio label="0">全部</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-row v-if="taskData.receive_type == '1'" :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="标签筛选" prop="receive_group" @change="getTouchNum">
                                    <calendarSelect
                                        v-model="treeChecked"
                                        :edit-select-list="selectList"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
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
                            <div v-if="taskData.can_touch_num">
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
                        <el-button type="primary" :disabled="btnOnce" @click="submitTask(route.query.id)">提交</el-button>
                    </div>
                </div>
                <div v-else class="search-head-wrap">
                    <el-form-item label="触达方式" prop="task_type" @change="getTouchNum">
                        <el-radio-group v-model="taskData.task_type">
                            <el-radio label="4">企业发表客户朋友圈</el-radio>
                            <el-radio label="5">成员发表客户朋友圈</el-radio>
                        </el-radio-group>
                        <div v-if="route.query.type == 'add'">
                            <span>预估触达客户数：{{ taskData.can_touch_num }}，筛选客户数：{{ taskData.all_customer_num }}，不可触达数：{{ taskData.no_touch_num }}</span>
                        </div>
                        <div v-else>
                            <div v-if="taskData.can_touch_num">
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
                        <el-button type="primary" :disabled="btnOnce" @click="submitTask(route.query.id)">提交</el-button>
                    </div>
                </div>
            </el-form>
        </page-main>
        <!-- 取消编辑 -->
        <CustomerDialog title="提示" :dialog-visible="dialogIsTaskTabs" width="400px" :confirm-fn="()=>goTaskIndex()" @cancel="cancelDialog">
            <div class="group_name">当前页面未保存，请确认是否关闭该页面</div>
        </CustomerDialog>
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
import { onMounted, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import calendarSelect from './compontent/calendarSelect.vue'
import calendarSelectMember from './compontent/calendar-select-member.vue'
import CustomerMedia from '@/components/CustomerMedia/index.vue'
import CustomerClander from '@/components/CustomerClander/index.vue'
import CustomerTitle from '@/components/CustomerTitle/index.vue'
import moment from 'moment'
const router = useRouter()
const route = useRoute()
const dialogIsTaskTabs = ref(false)
const treeChecked = ref([])
const selectList = ref([])
const addMemberDialogRef = ref(null)
// 切换目标对象
const dialogIsSwitch = ref(false)
// 页面初始化的时候刚点击目标对象不能出现弹窗
const swicthObject = ref(false)
// 编辑时刚点击目标对象出现弹窗
const editSwicthObject = ref(false)
// 提交,页面只能一次
const btnOnce = ref(false)
// 数组存储切换位置
const swtichTouchObject = ref([])
const taskData = ref({
    name: '',
    end_time: '',
    touch_object: '',
    receive_type: '',
    receive_group: [],
    task_type: '',
    content_arr: [],
    all_customer_num: 0,
    no_touch_num: 0,
    can_touch_num: 0,
    // 编辑时筛选数目
    select_receiver_num: 0
})
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
        touch_object: [
            { required: true, message: '选择对象类型是必填项', trigger: 'change' }
        ],
        receive_type: [
            { required: true, message: '筛选客户是必填项', trigger: 'change' }
        ],
        task_type: [
            { required: true, message: '触达方式是必填项', trigger: 'change' }
        ]
    }
})

const goSwitch = () => {
    swtichTouchObject.value.push(taskData.value.touch_object)
    console.log('swtichTouchObject', swtichTouchObject.value)
    if (editSwicthObject.value) {
        swicthObject.value = true
    }
    if (!swicthObject.value) {
        swicthObject.value = true
    } else {
        dialogIsSwitch.value = true
    } 
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
}
const cancelSwitch = () => {
    for (let i =  1; i < swtichTouchObject.value.length; i++) {
        swtichTouchObject.value.slice(i, swtichTouchObject.value.length - 1)
        taskData.value.touch_object = swtichTouchObject.value[0]
    }
    dialogIsSwitch.value = false
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
function confirmChooseMember(r) {
    // console.log('rrrrr', r)
    form.writeBackSelectedMemberOrg = r
    let select_members = []
    if (r && Array.isArray(r)) {
        r.map(ele => {
            select_members.push(ele.id)
        })
    }
    if (addMemberDialogRef.value) {
        addMemberDialogRef.value.dialogVisible = false
    }
    if (route.query.type == 'edit' && !taskData.value.receive_group[0]) {
        taskData.value.receive_group.push({})
    }
    taskData.value.receive_group[0].select_members = select_members
    getTouchNum()
}
// 页面取消
function hanldeEnd() {
    dialogIsTaskTabs.value = true
}
// 取消修改任务弹出框(确认)
const goTaskIndex = () => {
    router.push({
        name: 'calendar'
    })
}
// 取消修改任务弹出框(取消)
const cancelDialog = () => {
    dialogIsTaskTabs.value = false
}
// 提交
const submitTask = async id => {

    // 处理媒体组件数据
    const { mediaList, content } = await paramsFormat(taskData.value.content_arr)
    if (content == '' && mediaList == '') {
        ElMessage.error('请输入要发送的消息内容和对应附件')
        return
    }
    if (content == '' && taskData.value.touch_object == 'MOMENTS' && taskData.value.task_type == '5') {
        ElMessage.error('成员发客户朋友圈任务需发送文本，文本内容未填写')
        return
    }
    if (route.query.type == 'add') {
        if (route.query.title == '手工任务') {
            taskData.value.task_property = 'HAND'
            taskData.value.is_repeat = '0'
            if (taskData.value.receive_type == 'GROUP') {
                // console.log('11111')
                taskData.value.receive_type = '1'
            }
            if (taskData.value.name == '') {
                ElMessage.error('任务名称为空，请设置任务名称')
                return
            }
            if (taskData.value.task_type == '') {
                ElMessage.error('目标对象未选择，请选择目标对象')
                return
            }
            if (taskData.value.end_time == '') {
                ElMessage.error('任务截止时间未选择，请选择任务截止时间')
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
        btnOnce.value = true
        
        let params = taskData.value
        params.content = content
        params.annex_content_json = mediaList
        let res = await Http.addHandTask(params)
        if (res.code === 200) {
            ElMessage.success({
                message: '提交成功'
            })
            router.push({
                name: 'calendar'
            })
        }
    } else {
        let tag_ids = []
        if (taskData.value.name == '') {
            ElMessage.error('任务名称为空，请设置任务名称')
            return
        }
        if (taskData.value.task_type == '') {
            ElMessage.error('目标对象未选择，请选择目标对象')
            return
        }
        if (taskData.value.end_time == '') {
            ElMessage.error('任务截止时间未选择，请选择任务截止时间')
            return
        }
        if (JSON.stringify(taskData.value.receive_group) != '[]') {
            if (treeChecked.value.length == 0) {
                taskData.value.receive_group[0].tag_ids = tag_ids
            } else {
                treeChecked.value.forEach(element => {
                    tag_ids.push(element.tag_id)
                    taskData.value.receive_group[0].tag_ids = tag_ids
                })
            }
            if ((!form.writeBackSelectedMemberOrg || !form.writeBackSelectedMemberOrg[0])  && treeChecked.value.length == 0) {
                ElMessage.error('条件组都为空，请选择一种条件')
                return
            }
        }

        // 点击一次提交按钮，置灰，防止重复点击
        btnOnce.value = true

        let params = taskData.value
        console.log('params', params)
        params.id = id
        params.content = content
        params.annex_content_json = mediaList
        let res = await Http.handUpdateTaskSave(params)
        if (res.code === 200) {
            ElMessage.success({
                message: '修改成功'
            })
            router.push({
                name: 'calendar'
            })
        }
    }
}
// 编辑时获取任务数据
const getEditDetail = async id => {
    let { data } = await Http.handEditOrDetailTask({ id })
    taskData.value = data

    // getTouchNum()

    taskData.value.content_arr = mediaResFormat(data)
    selectList.value = data.receive_group[0].tag_arr
    form.writeBackSelectedMemberOrg = data.receive_group[0].select_members_info
    // console.log('form.writeBackSelectedMemberOrg', form.writeBackSelectedMemberOrg)
    // console.error('selectList.value', selectList.value)
}
// 媒体组件格式化
const paramsFormat = list => {
    let mediaList = []
    let content = ''
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
// 预估触达数量统计
const getTouchNum = async() => {
    // console.log('treeChecked.value.length', treeChecked.value.length)
    if (taskData.value.name == '' || taskData.value.task_type == '') {
        // console.log('111111')
        taskData.value.all_customer_num = 0,
        taskData.value.no_touch_num = 0,
        taskData.value.can_touch_num = 0
        return
    } else if (taskData.value.receive_type == '1' && treeChecked.value.length == '0' && JSON.stringify(taskData.value.receive_group[0].select_members) == '{}') {
        // console.log('222222', treeChecked.value)
        taskData.value.all_customer_num = 0,
        taskData.value.no_touch_num = 0,
        taskData.value.can_touch_num = 0
        return
    } else {
        let params = {}
        if (route.query.title == '手工任务') {
            params.task_property = 'HAND'
        }
        if (taskData.value.touch_object == 'GROUP') {
            taskData.value.receive_type = '1'
            // console.log('11111111', taskData.value.receive_type)
        }
        if (treeChecked.value != '') { 
            let tag_ids = []
            treeChecked.value.forEach(element => { 
                tag_ids.push(element.tag_id)
                console.log('tag_ids', tag_ids, element.tag_id)     
            })
            if (route.query.type == 'edit' && !taskData.value.receive_group[0]) {
                taskData.value.receive_group.push({})
            }
            taskData.value.receive_group[0].tag_ids = tag_ids  
        }
        if (taskData.value.receive_type == '') {
            ElMessage.error('筛选客户未选择，请筛选客户')
            return
        }
        // console.log('4444444', JSON.stringify(taskData.value.receive_group[0].tag_ids))
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
const getEndTime = () => {
    const timRange = 24 * 60 * 60 * 1000
    // console.log('valuevalue', (new Date() - 1) + timRange)
    if ((moment(taskData.value.end_time).unix() * 1000) - 1 < (new Date() - 1) + timRange) {
        ElMessage.error({
            message: '所选任务截止时间时长小于当前时间24小时，请选择超越当前时间24小时的时长!'
        })
        taskData.value.end_time = ''
        return
    }
}
// 截止时间限制今天以往时间被选择
const disabledDate = time => {
    const timeRange = 24 * 60 * 60 * 1000
    let date = Date.now()
    const maxTime = new Date().getTime() + timeRange * 30
    return time.getTime() < date + timeRange || time.getTime() > maxTime
}
onMounted(async() => {
    if (route.query.type == 'edit') {
        await getEditDetail(route.query.id)
        editSwicthObject.value = true
        swtichTouchObject.value.push(taskData.value.touch_object)
    }
    // console.error('路由', route.query)
    if (route.query.type == 'add') {
        taskData.value.content_arr[0] = {
            type: 'TEXT',
            content: ''
        }
        taskData.value.receive_group[0] = {}
    }
    // window.addEventListener('beforeunload', alert('是否直接从浏览器中关闭此页面'))
})
// onBeforeUnmount(() => {

//     // window.onbeforeunload = function() {
//     //     console.log('浏览器页面上点击关闭')
//     // }
//     // window.onunload = function() {
//     //     window.alert('谢谢光临')
//     // }
// })

</script>

<style scoped lang="scss">
.page-scroll {
    min-height: calc(100vh - 144px) !important;
    height: calc(100vh - 144px) !important;
    overflow-y: auto;
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