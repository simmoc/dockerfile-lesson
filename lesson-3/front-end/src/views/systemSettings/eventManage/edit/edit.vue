<template>
    <div class="edit-page">
        <div
            v-if="['edit', 'detail'].includes(reactData.pageType)"
            class="edit-content-head flex flex-justify-start flex-align-center pl24 pr24"
        >
            <div class="edit-content-head-item">
                创建成员：{{ reactData.eventDetail.creator_name || '--' }}
            </div>
            <div class="edit-content-head-item">
                创建时间：{{ reactData.eventDetail.create_time || '--' }}
            </div>
            <div class="edit-content-head-item">
                更新时间：{{ reactData.eventDetail.update_time || '--' }}
            </div>
        </div>
        <page-main>
            <div>
                <!-- <div class="bg-grey page-title-head pl24">
            {{ $route.meta && $route.meta.title }}
        </div> -->
                <!-- <div
                v-if="['edit', 'detail'].includes(reactData.pageType)"
                class="edit-content-head flex flex-justify-start flex-align-center pl24 pr24"
            >
                <div class="edit-content-head-item">
                    创建成员：{{ reactData.eventDetail.creator_name || '--' }}
                </div>
                <div class="edit-content-head-item">
                    创建时间：{{ reactData.eventDetail.create_time || '--' }}
                </div>
                <div class="edit-content-head-item">
                    更新时间：{{ reactData.eventDetail.update_time || '--' }}
                </div>
            </div> -->
                <div class="edit-content-wrap event-edit-content-wrap pr24">
                    <el-form
                        ref="infoForm"
                        label-position="top"
                        label-width="80px"
                        :model="reactData.form"
                        :rules="reactData.rules"
                        size="mini"
                    >
                        <div class="list-title">
                            <div class="list-title-left">
                                <div class="list-title-left-icon mr8">1</div>
                                <div class="list-title-left-txt">基础信息</div>
                            </div>
                        </div>
                        <div class="list-content pl24 pr24">
                            <template v-if="['add'].includes(reactData.pageType)">
                                <el-row class="form-item-row pl24">
                                    <el-col :sm="24" :md="12" :lg="12">
                                        <el-form-item label="事件名称：" prop="event_name" required>
                                            <el-input
                                                v-model="reactData.form.event_name"
                                                placeholder="请输入"
                                                maxlength="20"
                                                clearable
                                                show-word-limit
                                            />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row class="form-item-row pl24">
                                    <el-col :sm="24" :md="12" :lg="12">
                                        <el-form-item label="事件标识：" prop="event_key" required>
                                            <el-input
                                                v-model="reactData.form.event_key"
                                                placeholder="请输入"
                                                maxlength="20"
                                                clearable
                                                show-word-limit
                                            />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </template>
                            <div v-else class="list-content-detail">
                                <div class="r-title">{{ reactData.eventDetail.event_name || '--' }}</div>
                                <div class="r-text">
                                    <span class="color-label">事件标识：</span>
                                    <span class="color-txt mr32">
                                        {{ reactData.eventDetail.event_key || '--' }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="list-title">
                            <div class="list-title-left">
                                <div class="list-title-left-icon mr8">2</div>
                                <div class="list-title-left-txt">关联主体</div>
                            </div>
                        </div>
                        <div class="list-content pl24 pr24">
                            <template v-if="['add'].includes(reactData.pageType)">
                                <el-row class="form-item-row pl24">
                                    <el-col :sm="24" :md="12" :lg="12">
                                        <el-form-item label="人" prop="mainstay.human" required>
                                            <el-select
                                                v-model="reactData.mainstay.human"
                                                placeholder="请选择"
                                                style="width: 100%"
                                                :class="[
                                                    'custom-subject-el-select',
                                                    reactData.mainstay.human ? 'select-text' : 'select-empty'
                                                ]"
                                                value-key="id"
                                                @change="onSubjectSelect"
                                            >
                                                <template #prefix>
                                                    <div
                                                        class="custom-subject-el-select-input-icon flex flex-justify-center flex-align-center"
                                                    >
                                                        <img
                                                            v-if="reactData.mainstay.human.platform_type"
                                                            class="img"
                                                            :src="
                                                                getImageUrl(reactData.mainstay.human.platform_type)
                                                            "
                                                            alt=""
                                                        >
                                                    </div>
                                                </template>
                                                <el-option
                                                    v-for="item in reactData.humanOptions"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item"
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
                                </el-row>
                                <el-row class="form-item-row pl24" :gutter="0">
                                    <el-col :sm="12" :md="6" :lg="6" class="pr24">
                                        <el-form-item label="货" prop="good" :required="false">
                                            <el-select
                                                v-model="reactData.mainstay.good"
                                                placeholder="请选择"
                                                style="width: 100%"
                                                value-key="id"
                                                @change="onSubjectSelect"
                                            >
                                                <el-option
                                                    v-for="item in reactData.goodOptions"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item"
                                                />
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :sm="12" :md="6" :lg="6">
                                        <el-form-item label="场" prop="scene" :required="false">
                                            <el-select
                                                v-model="reactData.mainstay.scene"
                                                placeholder="请选择"
                                                style="width: 100%"
                                                value-key="id"
                                                @change="onSubjectSelect"
                                            >
                                                <el-option
                                                    v-for="item in reactData.sceneOptions"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item"
                                                />
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </template>
                            <div v-else class="list-content-detail">
                                <div
                                    v-if="reactData.eventDetail.mainstay"
                                    class="r-text flex flex-justify-start flex-align-center"
                                >
                                    <span class="color-label">人：</span>
                                    <img
                                        v-if="reactData.eventDetail.mainstay.human.tag_platform_type"
                                        class="r-text-img"
                                        :src="
                                            getImageUrl(reactData.eventDetail.mainstay.human.tag_platform_type)
                                        "
                                    >
                                    <span class="color-txt mr32">
                                        {{ reactData.eventDetail.mainstay.human.name }}
                                    </span>
                                    <span class="color-label">货：</span>
                                    <span class="color-txt mr32">
                                        {{ reactData.eventDetail.mainstay.good.name || '--' }}
                                    </span>
                                    <span class="color-label">场：</span>
                                    <span class="color-txt">
                                        {{ reactData.eventDetail.mainstay.scene.name || '--' }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="list-title flex flex-justify-between">
                            <div class="list-title-left">
                                <div class="list-title-left-icon mr8">3</div>
                                <div class="list-title-left-txt">事件要素</div>
                            </div>
                            <div
                                v-if="['edit'].includes(reactData.pageType)"
                                class="doc-btn"
                                @click="goDoc"
                            >
                                <img src="@/assets/images/eventManage/doc_code.svg" alt="icon">
                                开发文档
                            </div>
                        </div>
                        <div class="list-content pl24 pr24">
                            <div class="edit-key-wrap">
                                <div class="edit-table-wrap">
                                    <el-table
                                        :data="reactData.tableData"
                                        style="width: 100%"
                                        size="mini"
                                        header-row-class-name="tag-sub-edit-table-head"
                                    >
                                        <el-table-column label="要素ID" width="180">
                                            <template #default="scope">
                                                <el-input
                                                    v-model="scope.row.element_key"
                                                    placeholder="请输入"
                                                    size="mini"
                                                    maxlength="20"
                                                    :disabled="
                                                        scope.row.is_subject_field == 1 || !!scope.row.id
                                                    "
                                                />
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="要素名称" width="180">
                                            <template #default="scope">
                                                <el-input
                                                    v-model="scope.row.element_name"
                                                    placeholder="请输入"
                                                    size="mini"
                                                    maxlength="10"
                                                    :disabled="
                                                        scope.row.is_subject_field == 1 || !!scope.row.id
                                                    "
                                                />
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="要素类型" width="120">
                                            <template #default="scope">
                                                <el-select
                                                    v-model="scope.row.element_type"
                                                    placeholder="请选择"
                                                    size="mini"
                                                    :disabled="
                                                        scope.row.is_subject_field == 1 || !!scope.row.id
                                                    "
                                                >
                                                    <el-option
                                                        v-for="item in reactData.keyTypeOptions"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                    />
                                                </el-select>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="值" min-width="280">
                                            <template #default="scope">
                                                <template v-if="scope.row.element_type === 'OPTIONS'">
                                                    <!-- <el-select v-if="scope.row.is_subject_field !== 1" -->
                                                    <el-select
                                                        v-if="
                                                            scope.row.is_subject_field !== 1 || !!scope.row.id
                                                        "
                                                        v-model="scope.row.element_option_json"
                                                        style="width: 100%"
                                                        size="mini"
                                                        multiple
                                                        filterable
                                                        allow-create
                                                        default-first-option
                                                        placeholder="请输入"
                                                        :disabled="
                                                            scope.row.is_subject_field == 1 || !!scope.row.id
                                                        "
                                                        :class="[
                                                            scope.row.is_subject_field == 1 || !!scope.row.id
                                                                ? 'not_edit'
                                                                : ''
                                                        ]"
                                                    />
                                                    <!-- <div
                        class="value-tag-wrap"
                        v-if="scope.row.is_subject_field == 1 || !!scope.row.id"
                      >
                        <el-tag
                          v-for="tag in scope.row.element_option_json"
                          size="mini"
                          type="info"
                          :key="tag"
                          effect="plain"
                        >
                          {{ tag }}
                        </el-tag>
                      </div> -->
                                                </template>
                                                <el-input
                                                    v-else
                                                    disabled
                                                    :placeholder="
                                                        reactData.keyTypePlaceholder[scope.row.element_type] || '-'
                                                    "
                                                    size="mini"
                                                />
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="操作" width="180">
                                            <template #default="scope">
                                                <div class="operate-box flex flex-justify-between">
                                                    <div class="operate-box-item">
                                                        <el-button
                                                            v-if="
                                                                scope.row.is_subject_field != 1 && !scope.row.id
                                                            "
                                                            class="fw400"
                                                            size="mini"
                                                            type="text"
                                                            @click="handleDelete(scope.$index, scope.row)"
                                                        >
                                                            删除
                                                        </el-button>
                                                    </div>
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <el-button
                                        v-if="['add', 'edit'].includes(reactData.pageType)"
                                        id="tagAddKeyBtn"
                                        size="mini"
                                        style="width: 100%; margin-top: 10px; border: 1px dashed #eee"
                                        @click="addKeyItem"
                                    >
                                        + 新增要素
                                    </el-button>
                                    <div
                                        v-if="['add', 'edit'].includes(reactData.pageType)"
                                        class="flex flex-justify-end mt24"
                                    >
                                        <el-button size="mini" @click="confirmGoBack">取消</el-button>
                                        <el-button size="mini" type="primary" @click="save">
                                            提交
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>
        </page-main>
    </div>
</template>
<script setup>
import Http from '@/util/request.js'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'

// 图片引入，需要用拼接的方式
function getImageUrl(url) {
    return new URL(`../../../../assets/images/eventManage/${url}.png`, import.meta.url).href
}
// 生命周期
onMounted(() => {
    initParam(route.query)
    initPage()
    // console.log('------------', this.form)
    // 获取到路由中的groupNextInfo
    console.log(route.query.params)
})

const route = useRoute()
const router = useRouter()
const infoForm = ref(null)

// 变量
const reactData = reactive({
    pageType: 'add',
    type: '',
    id: '',
    platformOption: [],
    mainstay: {
        human: '', // 主体id
        good: '',
        scene: ''
    },
    form: {
        id: '', // 事件id
        event_name: '',
        event_key: '',
        mainstay: {
            human: '', // 主体id
            good: '',
            scene: ''
        },
        events_elements: [
            {
                element_key: '', // 事件要素id
                element_name: '',
                element_type: '',
                element_option_json: [],
                is_subject_field: '',
                subject_id: 1,
                subject_type: ''
            }
        ]
    },
    rules: {
        event_name: [
            { required: true, message: '请输入事件名称', trigger: 'blur' },
            { max: 20, message: '长度zuicha 个字符', trigger: 'blur' }
        ],
        event_key: [
            { required: true, message: '请输入事标识', trigger: 'blur' },
            { max: 20, message: '长度zuicha 个字符', trigger: 'blur' }
        ],
        'mainstay.human': [
            { required: true, message: '请选择关联主体', trigger: 'blur' }
            // { max: 20, message: '长度zuicha 个字符', trigger: 'blur' }
        ]
    },
    // 自定义要素
    tableData: [],
    keyTypeOptions: [],
    humanOptions: [],
    goodOptions: [],
    sceneOptions: [],
    keyTypePlaceholder: {
        TEXT: '文本',
        NUMBER: '数值',
        DATETIME: 'YYYY-MM-DD HH:MM:SS',
        BOOLEAN: '是/否/空值/非空'
    },
    eventDetail: {},
    isQW: false
})

const getKeyTypeOptions = async() => {
    console.log('查新增字段类型===')
    Http
        .getEventsFieldType()
        .then(res => {
            console.log('类型', res)
            reactData.keyTypeOptions = res.data || {}
        })
        .catch(e => {
            console.log(e, '错误提示')
        })
}

// 编辑或查看时获取事件信息
// const getEvenDetail = () => {
//     let obj = {
//         id: '123456', // 事件id
//         event_name: '测试事件1',
//         event_key: 'time_date',
//         mainstay: {
//             human: '1', // 主体id
//             good: '2',
//             scene: '3'
//         },
//         events_elements: [
//             {
//                 element_key: 'time', // 事件要素id
//                 element_name: '时间',
//                 element_type: 'SELECT',
//                 element_option_json: ['ceshi', 'font'],
//                 is_subject_field: '',
//                 subject_id: 1,
//                 subject_type: 1
//             }
//         ]
//     }

//     reactData.form = obj
//     reactData.mainstay = obj.mainstay
// }

// 初始化主体列表
const getSubjectlList = () => {
    Http
        .getTagSubjectsKey()
        .then(res => {
            let result = res.data

            result.forEach(item => {
                if (item.type === 'HUMAN') {
                    reactData.humanOptions = item.data || []
                    console.log('主题选择', reactData.humanOptions)
                } else if (item.type === 'GOOD') {
                    reactData.goodOptions = item.data || []
                } else if (item.type === 'SCENE') {
                    reactData.sceneOptions = item.data || []
                }
            })

            nextTick(() => {})
        })
        .catch(() => {})
}

// 编辑查看界面时获取事件详情
const getEventDetail = () => {

    let form = {
        events_id: reactData.form.id
    }

    Http
        .getEventsUpdateData(form)
        .then(res => {
            console.log(res)
            reactData.eventDetail = res.data || {}
            reactData.tableData = res.data.events_elements
        })
        .catch(() => {})
}

// 主体选择事件
const onSubjectSelect = item => {
    console.log(item)
    if (item.type === 'HUMAN') {
        reactData.form.mainstay.human = item.id
        // 主体变更- 返回icon
        let fid = item.subject_id
        let fArr = reactData.humanOptions.filter(ele => {
            return ele.id === fid
        })
        if (fArr && fArr[0]) {
            reactData.mainstay.human.platform_type = fArr[0].platform_type
            // console.log('主题选择： ', fArr[0])
        }
    } else if (item.type === 'GOOD') {
        reactData.form.mainstay.good = item.id
    } else {
        reactData.form.mainstay.scene = item.id
    }

    // 选择主体时，将按顺序将人，货，场插入替换到对应的前三列
    let hasItem = false
    let hasHuman = false
    let hasGood = false
    // console.log('表格', this.tableData)
    for (let i = 0; i < reactData.tableData.length; i++) {
        // console.log('选中 主体', item.type, reactData.tableData[i].subject_type)
        if (reactData.tableData[i].subject_type === 'HUMAN') hasHuman = true
        if (reactData.tableData[i].subject_type === 'GOOD') hasGood = true
        if (reactData.tableData[i].subject_type === item.type) {
            // console.log('替换了')
            let obj = {
                element_key: item.key_field.name,
                element_name: item.key_field.label,
                element_type: item.key_field.type,
                element_option_json: item.key_field.options,
                is_subject_field: 1,
                subject_id: item.id,
                subject_type: item.type
            }
            hasItem = true
            reactData.tableData.splice(i, 1, obj)
        }
    }

    // 新插入要素时注意位置。根据人，货，场顺序
    if (!hasItem) {
        let obj = {
            element_key: item.key_field.name,
            element_name: item.key_field.label,
            element_type: item.key_field.type,
            element_option_json: item.key_field.options,
            is_subject_field: 1,
            subject_id: item.id,
            subject_type: item.type
        }
        if (item.type === 'HUMAN') {
            reactData.tableData.unshift(obj)
        } else if (hasHuman && hasGood) {
            reactData.tableData.splice(2, 0, obj)
        } else if (hasHuman && !hasGood) {
            reactData.tableData.splice(1, 0, obj)
        } else if (!hasHuman && hasGood) {
            reactData.tableData.splice(1, 0, obj)
        } else {
            reactData.tableData.unshift(obj)
        }

        // console.log('111111111111', this.tableData[0].element_option_json)
    }
}
const handleDelete = i => {
    reactData.tableData.splice(i, 1)
}

const checkTableValue = () => {
    console.log('校验开始')
    // 校验表格
    let len = reactData.tableData.length
    let checkRes = true
    let idArr = []
    let nameArr = []
    for (let i = 0; i < len; i++) {
        let ele = reactData.tableData[i]
        if (
            ele.element_key &&
            ele.element_name &&
            ((ele.element_type === 'OPTIONS' &&
                ele.element_option_json &&
                ele.element_option_json.length) ||
                ele.element_type !== 'OPTIONS')
        ) {
            let isSameId = idArr.includes(ele.element_key)
            let isSameName = nameArr.includes(ele.element_name)
            if ((isSameId || isSameName) && ele.is_subject_field != 1) {
                ElMessage({
                    message: `要素${
                        isSameId ? 'ID' : isSameName ? '名称' : ''
                    }重复，请重新输入`,
                    type: 'warning'
                })
                checkRes = false
                break
            } else {
                idArr.push(ele.element_key)
                nameArr.push(ele.element_name)
            }
            continue
        } else {
            checkRes = false
            let nothasId = !ele.element_key
            let nothasName = !ele.element_name
            if (nothasId || nothasName) {
                ElMessage({
                    message: `${
                        nothasId ? '要素ID' : nothasName ? '要素名称' : ''
                    }不可为空，请输入`,
                    type: 'warning'
                })
            } else {
                ElMessage({
                    message: '选项存在空值，请重新输入',
                    type: 'warning'
                })
            }
            break
        }
    }
    console.log('校验结束', checkRes)
    return checkRes
}

const save = async() => {
    if (reactData.pageType === 'edit') {
        let checkTableRes = checkTableValue()
        if (checkTableRes) {
            // 调后台接口
            reactData.form.events_elements = reactData.tableData

            Http
                .getEventsUpdate(reactData.form)
                .then(res => {
                    console.log(res)
                    router.push({
                        path: '/event/eventManage'
                    })
                })
                .catch(() => {})
            // console.log('调后台接口====', reactData.tableData)
        }
    } else if (reactData.pageType === 'add') {
        console.log(infoForm.value, '**********')
        // let valid = await this.$refs['infoForm'].validate() 
        // console.log('valid', valid)
        infoForm.value.validate(valid => {
            console.log(valid, '===========')
            if (valid) {
                let checkTableRes = checkTableValue()
                if (checkTableRes) {
                    // 调后台接口
                    reactData.form.events_elements = reactData.tableData

                    Http
                        .getEventsAdd(reactData.form)
                        .then(res => {
                            console.log(res)

                            router.push({
                                path: '/event/eventManage'
                            })
                        })
                        .catch(e => {
                            ElMessage({
                                message: e,
                                type: 'warning'
                            })
                        })

                }
            }
            // }
            return
        })
    }
}

// const getWidth = () => {
//     if (reactData.info && reactData.info.sub_plat_type !== 'BUSINESS') {
//         return
//     }
//     if (reactData.timer) {
//         return
//     }
//     reactData.timer = setTimeout(() => {
//         let d = document.querySelector('#subject-edit-page-main').clientWidth
//         console.log(d)
//         // reactData.isWidthEnough = !!(d > 1088);
//         reactData.isWidthEnough = !!(d > 1220)
//         reactData.timer = null
//     }, 300)
// }
// table方法
const addKeyItem = () => {
    let newItem = {
        element_name: '',
        element_type: 'TEXT', // "BOOLEAN" "OPTIONS"
        element_key: '', // 要素id
        element_option_json: [],
        is_subject_field: '0', // 0表示不是主体字段，1是主体字段
        subject_id: '0',
        subject_type: ''
    }
    // if (reactData.keyTypeOptions && reactData.keyTypeOptions.length) {
    //   newItem.element_type = reactData.keyTypeOptions[0].value
    // }
    reactData.tableData.push(newItem)
    nextTick(() => {
        document.getElementById('tagAddKeyBtn').scrollIntoView()
    })
}

// const handleChangeVisiable = (i, r, v) => {
//     r.status = v
// }

// const handleChangeIndex = (i, r, gap) => {
//     let [a, b] = [reactData.tableData[i], reactData.tableData[i + gap]]
//     reactData.tableData[i] = b
//     reactData.tableData[i + gap] = a
//     reactData.tableData = JSON.parse(JSON.stringify(reactData.tableData))
// }

// const getBaseData = () => {
//     let param = {
//         sub_id: reactData.id,
//         type: reactData.type
//     }
//     console.log('查table 历史数据====', param)
//     let data = {
//         subject_info: {
//             id: 1, // 事件id
//             event_name: '测试事件名称',
//             event_key: 'order',
//             mainstay: {
//                 human: 1,
//                 good: 2,
//                 scene: 3
//             }
//         },
//         events_elements: [
//             {
//                 element_key: 'businessID',
//                 element_name: '业务id',
//                 element_type: 'TEXT',
//                 status: '1', // 1显示 0 隐藏
//                 is_sys: '1', // 1 不能换顺序
//                 weigh: 1,
//                 element_option_json: [],
//                 is_subject_field: 1
//             },
//             {
//                 element_key: 'mobile',
//                 element_name: '手机',
//                 element_type: 'TEXT',
//                 status: '1',
//                 is_sys: '1',
//                 weigh: 2,
//                 element_option_json: [],
//                 is_subject_field: 1
//             },
//             {
//                 element_key: 'unionID',
//                 element_name: 'unionID',
//                 element_type: 'SELECT',
//                 status: '0',
//                 is_sys: '1',
//                 weigh: 3,
//                 element_option_json: [
//                     '一二三四五六七八九一二三四五六七八九一二三四五六七八九',
//                     'b',
//                     'a',
//                     '一二三'
//                 ],
//                 is_subject_field: 1
//             }
//         ],
//         keyTypeOptions: []
//     }
//     reactData.tableData = data.events_elements
//     //   // @前
//     let info = data.subject_info
//     reactData.form = Object.assign({}, info)
// }

// 跳转前往文档
const goDoc = () => {
    // 避免hash路由
    let url = import.meta.env.VITE_APP_API_BASEURL + '/events/apidoc/' + reactData.id
    window.open(url)
}

const initPage = () => {
    getKeyTypeOptions()
    if (reactData.pageType !== 'add') {
        getEventDetail()
    }
}

const initParam = param => {
    reactData.pageType = (param && param.type) || 'add'
    reactData.type = (param && param.type) || ''
    reactData.id = (param && param.id) || ''
    reactData.form.id = (param && param.id) || ''
    // 数据重置
    // reactData.isQW = false
    // reactData.form = { ...reactData.baseInfo }
    // reactData.isWidthEnough = false
    reactData.timer = null
    reactData.tableData = []
    getSubjectlList()
    console.log('页面类型：', reactData.pageType)
}
const confirmGoBack = () => {

    ElMessageBox.confirm('当前页面未保存，确定离开当前页面吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
        .then(() => {
            window.history.go(-1)
        })
        .catch(() => {})
}

</script>

<style lang="scss" scoped>
@import '@/assets/styles/pageCommonStyle/edit.scss';
@import './edit.scss';
// .tag-sub-edit-table-head {
//     background-color: rgb(244, 244, 245) !important;
// }
</style>
<style lang="scss">
@import '@/assets/styles/cusstyle/custom-subject.scss';
.tag-sub-edit-table-head {
    th.el-table__cell {
        background-color: rgb(244, 244, 245) !important;
    }
}
</style>
