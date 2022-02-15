<template>
    <div class="edit-page">
        <div
            v-if="['edit', 'detail'].includes(pageType)"
            class="edit-content-head flex flex-justify-start flex-align-center flex-align-center pl24 pr24"
        >
            <div class="edit-content-head-item">
                创建成员：{{ form.author || '—' }}
            </div>
            <div class="edit-content-head-item">
                创建时间：{{ form.create_time || '—' }}
            </div>
            <div class="edit-content-head-item">
                更新时间：{{ form.update_time || '—' }}
            </div>
        </div>
        <page-main>
            <div class="event-task-detail-wrap">
                <!-- <div class="bg-grey page-title-head pl24">
            {{ $route.meta && $route.meta.title }}
        </div> -->
                <!-- <div
                    v-if="['edit', 'detail'].includes(pageType)"
                    class="edit-content-head flex flex-justify-start flex-align-center flex-align-center pl24 pr24"
                >
                    <div class="edit-content-head-item">
                        创建成员：{{ form.author || '—' }}
                    </div>
                    <div class="edit-content-head-item">
                        创建时间：{{ form.create_time || '—' }}
                    </div>
                    <div class="edit-content-head-item">
                        更新时间：{{ form.update_time || '—' }}
                    </div>
                </div> -->
                <div class="edit-content-wrap task-event-edit-content-wrap pb24">
                    <el-form
                        ref="infoForm"
                        label-position="top"
                        label-width="80px"
                        :model="form"
                        :rules="rules"
                        size="mini"
                    >
                        <div class="list-title">
                            <div class="list-title-left">
                                <div class="list-title-left-icon mr8">1</div>
                                <div class="list-title-left-txt">基础信息</div>
                            </div>
                        </div>
                        <div class="list-content pr24">
                            <template v-if="['edit', 'add'].includes(pageType)">
                                <el-row :gutter="20">
                                    <el-col :sm="12" :md="6" :lg="6">
                                        <el-form-item label="任务名称" prop="name">
                                            <el-input
                                                v-model="form.name"
                                                maxlength="20"
                                                show-word-limit
                                                placeholder="请输入"
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :sm="12" :md="6" :lg="6">
                                        <el-form-item label="选择分组" prop="task_category_id">
                                            <el-select
                                                v-model="form.task_category_id"
                                                placeholder="请选择"
                                                style="width: 100%"
                                            >
                                                <el-option
                                                    v-for="item in groupOptions"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id"
                                                />
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :sm="24" :md="12" :lg="12">
                                        <el-form-item label="执行结束时间" prop="end_time">
                                            <span class="mr12">任务将在</span>
                                            <el-input-number
                                                v-model="form.end_time"
                                                class="mr4"
                                                style="width: 100px"
                                                placeholder="请输入"
                                                :controls="false"
                                                :step="1"
                                                :min="1"
                                                step-strictly
                                            />
                                            <el-select
                                                v-model="form.end_time_unit"
                                                placeholder="请选择"
                                                style="width: 80px"
                                                class="mr12"
                                            >
                                                <el-option
                                                    v-for="item in endTimeUnitOptions"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                                />
                                            </el-select>
                                            <span>后结束</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </template>
                            <div v-else class="list-content-detail">
                                <div class="r-title">{{ form.name || '—' }}</div>
                                <div class="r-text">
                                    <span class="color-label">选择分组：</span>
                                    <span class="color-txt mr32">
                                        {{ form.task_category_id_txt || '—' }}
                                    </span>
                                    <span>执行结束时间：</span>
                                    <span class="color-txt">执行时间将在</span>
                                    <span class="color-label">
                                        &nbsp;{{ form.end_time }}{{ form.end_time_unit_txt }}&nbsp;
                                    </span>
                                    <span class="color-txt">结束</span>
                                </div>
                            </div>
                        </div>
                        <div class="list-title">
                            <div class="list-title-left">
                                <div class="list-title-left-icon mr8">2</div>
                                <div class="list-title-left-txt">触发条件</div>
                            </div>
                        </div>
                        <div class="list-content pr24">
                            <el-row v-if="['edit', 'add'].includes(pageType)" :gutter="20">
                                <el-col :sm="24" :md="12" :lg="12">
                                    <el-form-item label="事件" prop="events_id">
                                        <div class="flex">
                                            <!-- {{ form.events_id }}+ -->
                                            <select-event
                                                v-model="form.events_id"
                                                class="mr12"
                                                @changeTaskEvent="changeTaskEvent"
                                            />
                                            <span>默认事件发生则触发任务</span>
                                        </div>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <div v-if="['detail'].includes(pageType)" class="list-content-detail">
                                <div class="r-text mb24">
                                    <span class="color-label">事件：</span>
                                    <span class="color-txt">{{ form.events_name || '—' }}</span>
                                </div>
                            </div>
                            <!-- <el-row :gutter="20" v-if="form.events_id && (['detail'].includes(pageType) )"> -->
                            <el-row v-if="showMorerule" :gutter="20">
                                <el-col :sm="24" :md="24" :lg="24">
                                    <el-form-item label="更多条件">
                                        <div class="task-combination-rule-wrap">
                                            <combination-rule
                                                ref="taskEventCombinationRule"
                                                v-model="form.task_rule_json"
                                                :disabled="['detail'].includes(pageType)"
                                                :base-combine-rules="form.task_rule_json"
                                                :events-id="form.events_id"
                                            />
                                        </div>
                                        <div v-if="isRuleErr" class="el-form-item__error">
                                            更多条件需填充完整
                                        </div>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="list-title">
                            <div class="list-title-left">
                                <div class="list-title-left-icon mr8">3</div>
                                <div class="list-title-left-txt">任务动作</div>
                            </div>
                        </div>
                        <div class="list-content pr24">
                            <el-row v-if="['edit', 'add'].includes(pageType)" :gutter="20">
                                <el-col :sm="12" :md="6" :lg="6">
                                    <el-form-item label="选择主体" prop="subject_id">
                                        <el-select
                                            v-model="form.subject_id"
                                            placeholder="请选择"
                                            style="width: 100%"
                                            :class="[
                                                'custom-subject-el-select',
                                                form.subject_id ? 'select-text' : 'select-empty'
                                            ]"
                                            @change="subjectChange"
                                        >
                                            <template #prefix>
                                                <div
                                                    v-if="form.subject_id"
                                                    class="custom-subject-el-select-input-icon flex flex-justify-center flex-align-center"
                                                >
                                                    <img
                                                        v-if="form.platform_type"
                                                        class="img"
                                                        :src="
                                                            getImageUrl(form.platform_type)
                                                        "
                                                        alt=""
                                                    >
                                                </div>
                                            </template>
                                            <el-option
                                                v-for="item in subjectOptions"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id"
                                            >
                                                <div
                                                    class="custom-subject-option flex flex-justify-start flex-align-center"
                                                >
                                                    <div class="custom-subject-option-img-wrap flex flex-align-center">
                                                        <img
                                                            v-if="item.platform_type"
                                                            class="img"
                                                            :src="
                                                                getImageUrl(item.platform_type)
                                                            "
                                                            alt=""
                                                        >
                                                    </div>
                                                    <div class="pl8">{{ item.name }}</div>
                                                </div>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :sm="12" :md="6" :lg="6">
                                    <el-form-item label="任务动作" prop="task_type">
                                        <el-select
                                            v-model="form.task_type"
                                            placeholder="请选择"
                                            style="width: 100%"
                                        >
                                            <el-option
                                                v-for="item in actionOptions"
                                                :key="item.key"
                                                :label="item.value"
                                                :value="item.key"
                                            />
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <div v-if="['detail'].includes(pageType)" class="list-content-detail">
                                <div class="r-text flex flex-justify-start flex-align-center">
                                    <span class="color-label">平台渠道：</span>
                                    <img
                                        v-if="form.platform_type"
                                        class="r-text-img"
                                        :src="
                                            getImageUrl(form.platform_type)
                                        "
                                    >
                                    <span class="color-txt mr">{{ form.subject_id_txt }}</span>
                                    <span class="color-label">任务动作：</span>
                                    <span class="color-txt">{{ form.task_type_txt }}</span>
                                    P
                                </div>
                            </div>
                            <el-row :gutter="20">
                                <el-col :sm="24" :md="12" :lg="12" class="computed-width">
                                    <el-form-item label="消息内容">
                                        <CustomerMedia
                                            v-if="['add', 'edit'].includes(pageType)"
                                            v-model="form.writeBackWelcome.other_content_list"
                                            :event-select-show="true"
                                            :events-id="form.events_id"
                                            :media-content-width="mediaBoxWidth"
                                            page-type="taskEdit"
                                            :hidden-btns="['TEXT', 'FILE']"
                                            :text-limit="800"
                                        />
                                        <CustomerMediaListElse
                                            v-if="['detail'].includes(pageType)"
                                            :list="form.writeBackWelcome.other_content_list"
                                            :check-list="true"
                                        />
                                        <!-- <welcome-text-and-file
                                            ref="welcomeTextAndFile"
                                            :write-back-welcome="form.writeBackWelcome"
                                            :allow-add-wechat-app-type="[0]"
                                            :is-add-variable-btn="true"
                                            :disabled="['detail'].includes(pageType)"
                                            :events-id="form.events_id"
                                            @update="updateWelcome"
                                        />
                                    </el-form-item> -->
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row v-if="['edit', 'add'].includes(pageType)" :gutter="20">
                                <el-col :sm="24" :md="12" :lg="12">
                                    <div class="flex flex-justify-end mt16">
                                        <el-button size="mini" @click="backToList">取消</el-button>
                                        <el-button size="mini" type="primary" @click="confirm">
                                            提交
                                        </el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-form>
                </div>
            </div>
        </page-main>
    </div>
</template>

<script>
import Http from '@/util/request.js'
import CustomerMedia from '@/components/CustomerMedia/index.vue'
import { ElMessage } from 'element-plus'
import CustomerMediaListElse from '@/components/CustomerMediaList/index.vue'
// import { userRouter } from 'vue-router'
// const router = userRouter()
export default {
    name: 'EventTaskUpdate',
    components: {
        'combination-rule': () =>
            import('@/components/combinationRule/combinationRule.vue'),
        'select-event': () => import('@/components/selectEvent/selectEvent.vue'),
        CustomerMedia,
        CustomerMediaListElse
        //   'select-variable': () =>
        //     import('../components/selectVariable/selectVariable.vue'),
        // 'welcome-text-and-file': () =>
        //     import('@/components/welcome-text-and-file/welcomeTextAndFile.vue'),
    },
    props: {},
    data() {
        // const validateWriteBackWelcome = (rule, value, callback) => {
        //     console.log('测试长度，', value)
        //     // if (
        //     //   (value.content && value.content.length) ||
        //     //   (value.other_content_list && value.other_content_list.length)
        //     // )
        //     if (value.content.length) {
        //         callback()
        //     } else {
        //         callback(new Error('消息内容不可为空'))
        //     }
        // }
        return {
            // add edit detail
            pageType: 'add',
            id: '',
            form: {
                end_time: '',
                end_time_unit: 'HOURS',
                events_id: '',
                name: '',
                task_category_id: '',
                end_time_type: 1,
                writeBackWelcome: {
                    content: '',
                    emojiPopoverVisible: false,
                    other_content_list: []
                },
                task_rule_json: {}
            },
            endTimeUnitOptions: [
                {
                    label: '小时',
                    value: 'HOURS'
                },
                {
                    label: '天',
                    value: 'DAY'
                }
            ],
            rules: {
                name: [
                    { required: true, message: '请输入任务名称', trigger: 'blur' },
                    { max: 20, message: '长度最长20个字符', trigger: 'blur' }
                ],
                task_category_id: [
                    { required: true, message: '请选择分组', trigger: ['blur', 'change'] }
                ],
                events_id: [
                    { required: true, message: '请选择事件', trigger: ['blur', 'change'] }
                ],
                subject_id: [
                    { required: true, message: '请选择主体', trigger: 'blur' }
                ],
                task_type: [
                    { required: true, message: '请选择任务动作', trigger: 'blur' }
                ],
                end_time: [
                    {
                        required: true,
                        message: '请选择输入结束时间',
                        trigger: 'blur'
                    }
                ]
                // writeBackWelcome: [
                //     {
                //         required: true,
                //         validator: validateWriteBackWelcome,
                //         trigger: 'blur'
                //     }
                // ]
            },
            subjectOptions: [],
            groupOptions: [],
            actionOptions: [],
            isRuleErr: false,
            mediaBoxWidth: 720
        }
    },
    computed: {
        // 是否展示更多条件
        showMorerule() {
            if (this.form.events_id && ['edit', 'add'].includes(this.pageType)) {
                return true
            } else if (
                this.form.events_id &&
                ['detail'].includes(this.pageType) &&
                this.form.task_rule_json.length !== 0
            ) {
                return true
            }
            return false
        }
    },
    watch: {},
    mounted() {
        console.log('路由', this.$route)
        if (this.$route && this.$route.query) {
            this.id = this.$route.query.id || ''
            this.pageType = this.$route.query.type || 'add'
        }
        if (['add'].includes(this.pageType)) {
            this.form.end_time_unit =
                this.endTimeUnitOptions[0] && this.endTimeUnitOptions[0].value
            // 添加时主动添加一个文本框
            this.form.writeBackWelcome.other_content_list[0] = {
                type: 'TEXT',
                content: ''
            }
        }
        if (['detail', 'edit'].includes(this.pageType)) {
            this.getTaskEventForm()
        }
        if (['add', 'edit'].includes(this.pageType)) {
            this.getGroupOptions()
            this.getSubjectOptions()
            this.getAcionOptions()
        }

        // console.log('计算实际宽度', document.querySelector('.computed-width').offsetWidth)
        // 计算媒体组件宽度
        this.mediaBoxWidth = document.querySelector('.computed-width').offsetWidth - 98
    },
    methods: {
        // 图片引入，需要用拼接的方式
        getImageUrl(url) {
            return new URL(`../../../../assets/images/eventManage/${url}.svg`, import.meta.url).href
        },
        // 主体变更
        subjectChange() {
            let fid = this.form.subject_id
            let fArr = this.subjectOptions.filter(ele => {
                return ele.id === fid
            })
            if (fArr && fArr[0]) {
                // this.$set(this.form, 'platform_type', fArr[0].platform_type)
                this.form.platform_type = fArr[0].platform_type
            }
        },
        // 触发条件 事件变更，多条件清空
        changeTaskEvent(events_id) {
            this.form.events_id = events_id
            let rJson =
                this.$refs.taskEventCombinationRule &&
                this.$refs.taskEventCombinationRule.combineRules

            // console.log('oooooooooo', this.$refs.taskEventCombinationRule.combineRules)
            if (rJson && rJson.rule_set && rJson.rule_set.length) {
                this.$confirm('变更事件会导致更多条件清空，请确认是否变更？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.form.task_rule_json = {}
                    })
                    .catch(() => {})
            }
        },
        async confirm() {
            // 消息回写
            // this.updateWelcome()
            
            // 处理媒体组件数据
            const { mediaList, content } = await this.paramsFormat(this.form.writeBackWelcome.other_content_list)
            // const res = await this.paramsFormat(this.form.writeBackWelcome.other_content_list)
            // console.log('------------------', res)
            // this.form.writeBackWelcome.content = content
            // this.form.writeBackWelcome.other_content_list = mediaList

            // if (this.$refs.welcomeTextAndFile.curContentErr) {
            //     return
            // }
            if (!content) {
                ElMessage.warning('消息内容不可为空')
                // ElMessage({
                //     message,
                //     type: 'error'
                // })
                return
            }
            // 规则
            // 条件有误
            if (document.querySelector('.rule-box-tip-txt')) {
                return
            }

            // console.log('媒体组件参数', this.$refs.taskEventCombinationRule)
            console.log('旧媒体组件参数', this.form.writeBackWelcome.other_content_list)
            // console.log('huahua', this.form.task_rule_json)
            if (this.$refs.taskEventCombinationRule) {
                let task_rule_json = this.$refs.taskEventCombinationRule.combineRules
                if (document.querySelector('.rule-item-err')) {
                    this.$message.error('更多条件需填充完整')
                    return
                }
                // this.$set(this.form, 'task_rule_json', task_rule_json)
                this.form.task_rule_json = task_rule_json
                console.log(task_rule_json, '条件-----------')
            }

            this.$refs['infoForm'].validate(valid => {
                if (valid) {
                    this.$confirm('确认提交内容？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                        .then(() => {
                            let params = this.form
                            // params.content = this.form.writeBackWelcome.content
                            // params.annex_content_json = this.form.writeBackWelcome.other_content_list
                            params.content = content
                            params.annex_content_json = mediaList
                            
                            console.log('save====', params)

                            if (this.pageType == 'add') {
                                Http
                                    .addTaskAdd(params)
                                    .then(() => {
                                        // 调后台保存上一页，回调返回上一页
                                        this.$router.push({
                                            name: 'eventTask',
                                            query: {
                                                back_tree_id: this.form.task_category_id
                                            }
                                        })
                                        // this.$router.go(-1)
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                            } else {
                                Http
                                    .updateTask(params)
                                    .then(() => {
                                        // 调后台保存上一页，回调返回上一页
                                        this.$router.push({
                                            name: 'eventTask'
                                        })

                                        // console.log()
                                        // this.$router.go(-1)
                                    })
                                    .catch(() => {})
                            }
                        })
                        .catch(() => {})
                } else {
                    return false
                }
            })
        },
        // 媒体组件格式化
        paramsFormat(list) {
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
        },

        mediaResFormat(response) {
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
        },
        backToList() {
            this.$confirm('当前页面未保存，确定离开当前页面吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$router.go(-1)
                })
                .catch(() => {})
        },
        updateWelcome() {
            let content = this.$refs.welcomeTextAndFile.info
            // this.$set(this.form, 'writeBackWelcome', content)
            this.form.writeBackWelcome = content
        },
        // 获取详情数据
        async getTaskEventForm() {
            Http
                .getUpdateTask({ id: this.$route.query.id })
                .then(res => {
                    res.data.author = res.data.creator_name
                    // res.data.events_id_txt = res.data.task_category_name
                    res.data.subject_id_txt = res.data.subject_name
                    res.data.task_category_id_txt = res.data.task_category_name
                    res.data.task_type_txt = res.data.task_type_name
                    res.data.task_rule_json = res.data && res.data.task_rule_json
                    res.data.task_type = parseInt(res.data.task_type)

                    // 处理多媒体组件
                    const mediaList = this.mediaResFormat(res.data)
                    res.data.writeBackWelcome = {
                        content: res.data.content,
                        content_id: res.data.task_content_id,
                        emojiPopoverVisible: false,
                        other_content_list: mediaList
                    }
                    // res.data.writeBackWelcome = {
                    //     content: res.data.content,
                    //     content_id: res.data.task_content_id,
                    //     emojiPopoverVisible: false,
                    //     other_content_list: res.data.annex_content_json
                    // }
                    let resForm = res.data
                    // 处理结束时间单位
                    let end_time_unit_txt = this.endTimeUnitOptions.filter(ele => {
                        return ele.value === resForm.end_time_unit
                    })
                    // this.$set(
                    //     resForm,
                    //     'end_time_unit_txt',
                    //     (end_time_unit_txt[0] && end_time_unit_txt[0].label) || ''
                    // )
                    resForm.end_time_unit_txt = (end_time_unit_txt[0] && end_time_unit_txt[0].label) || ''
                    // 处理多条件规则
                    let taskRuleJSON = resForm.task_rule_json || {}
                    if (
                        Object.keys(taskRuleJSON) &&
                        Object.keys(taskRuleJSON).length &&
                        taskRuleJSON.rule_set &&
                        taskRuleJSON.rule_set.length
                    ) {
                        let ruleSet = taskRuleJSON.rule_set
                        ruleSet = ruleSet.map(ele => {
                            if (ele.type === 'SINGLE') {
                                if (ele.field_type !== 'OPTIONS') {
                                    let [params0 = '', params1 = ''] = ele.params || []
                                    ele.params = [params0, params1]
                                }
                                return ele
                            } else if (
                                ele.type === 'GROUP' &&
                                ele.rule_set &&
                                ele.rule_set.length
                            ) {
                                let gRuleSet = ele.rule_set.map(gele => {
                                    let [gparams0 = '', gparams1 = ''] = gele.params || []
                                    gele.params = [gparams0, gparams1]
                                    return gele
                                })
                                ele.rule_set = gRuleSet
                                return ele
                            }
                        })
                        console.log(ruleSet)
                    }
                    // this.$set(resForm, 'task_rule_json', taskRuleJSON)
                    resForm.task_rule_json = taskRuleJSON
                    this.form = resForm
                    console.log(this.form, '******************')
                })
                .catch(() => {})
        },
        // 选择分组 下拉
        getGroupOptions() {
            Http
                .getListSon()
                .then(res => {
                    this.groupOptions = res.data || []
                })
                .catch(() => {})
        },
        // 主体 下拉
        getSubjectOptions() {
            Http
                .getTagSubject()
                .then(res => {
                    this.subjectOptions = res.data || []
                    if (this.subjectOptions.length && ['add'].includes(this.pageType)) {
                        // this.$set(
                        //     this.form,
                        //     'subject_id',
                        //     this.subjectOptions[0] && this.subjectOptions[0].id
                        // )
                        // this.$set(
                        //     this.form,
                        //     'platform_type',
                        //     this.subjectOptions[0] && this.subjectOptions[0].platform_type
                        // )
                        this.form.subject_id = this.subjectOptions[0] && this.subjectOptions[0].id
                        this.form.platform_type = this.subjectOptions[0] && this.subjectOptions[0].platform_type
                    }
                })
                .catch(() => {})
        },
        // 任务动作下拉
        getAcionOptions() {
            Http
                .getTaskType()
                .then(res => {
                    this.actionOptions = res.data || []
                    if (this.actionOptions.length && ['add'].includes(this.pageType)) {
                        // this.$set(
                        //     this.form,
                        //     'task_type',
                        //     this.actionOptions[0] && this.actionOptions[0].key
                        // )
                        this.form.task_type = this.actionOptions[0] ? this.actionOptions[0].key : ''
                    }
                })
                .catch(() => {})
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/pageCommonStyle/edit.scss';
.task-event-edit-content-wrap {
  .r-title {
    opacity: 1;
    font-size: 22px;
    font-weight: 500;
    text-align: left;
    color: #171717;
    line-height: 30px;
    letter-spacing: 1px;
    margin-bottom: 12px;
  }
  .list-content-detail {
    .r-text {
      .r-text-img {
        width: 20px;
        margin-right: 4px;
      }
      span {
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: rgba(0, 0, 0, 0.85);
        line-height: 22px;
      }
      .color-label {
        color: rgba(0, 0, 0, 0.85);
      }
      .color-txt {
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
  .task-combination-rule-wrap {
    background: #f9fafb;
  }
}
</style>
<style lang="scss">
.custom-subject-el-select .el-input--mini .el-input__inner {
  padding-left: 38px;
}
.select-empty.custom-subject-el-select .el-input--mini .el-input__inner {
  padding-left: 15px;
}
.custom-subject-el-select .el-input--prefix .el-input__inner {
    padding-left: 38px !important;
}
.custom-subject-el-select-input-icon,
.custom-subject-option .custom-subject-option-img-wrap {
  width: 20px;
  height: 100%;
  img {
    width: 20px;
  }
}
.custom-subject-el-select-input-icon {
  margin-left: 8px;
  margin-right: 8px;
}
</style>
