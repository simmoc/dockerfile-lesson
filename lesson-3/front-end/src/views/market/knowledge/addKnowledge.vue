<template>
    <div>
        <div
            class="head-content"
        >
            <div class="head-content-item">
                创建成员：{{
                    (eventDetail && eventDetail.member_name) ||
                        '--'
                }}
            </div>
            <div class="head-content-item">
                创建时间：{{ (eventDetail && eventDetail.create_time) || '--' }}
            </div>
            <div class="head-content-item">
                最后修改成员：{{ (eventDetail && eventDetail.member_name) || '--' }}
            </div>
            <div class="head-content-item ">
                最后修改时间：{{ (eventDetail && eventDetail.update_time) || '--' }}
            </div>
        </div>
        <page-main class="">
            <div class="search-head-wrap flex-row-between bg-color-fff p-24">
                <el-form
                    ref="ruleForm"
                    v-model="addknowInfo"
                    class="demo-ruleForm"
                    height="32px"
                    label-width="520px"
                    label-position="top"
                >
                    <el-form-item required label="知识分组">
                        <el-select
                            v-model="addknowInfo.group_id"
                            style="width:520px;"
                            el-select
                            filterable
                            :filter-method="searchGroupName"
                            default-first-option
                            :placeholder="groupName"
                            class="form-ipt-style"
                            no-match-text="no data"
                            no-data-text="no data"
                            @change="getKnowledgeGroupId"
                        >
                            <el-option
                                v-for="item in groupList"
                                :key="item.group_id"
                                :label="item.name"
                                :value="item.group_id"
                                :disabled="item.sale_script_num >= 20"
                            >
                                <div class="flex flex-justify-between flex-align-center">
                                    <span>{{ item.name }}</span>
                                    <i
                                        v-if="addGroupId == item.group_id"
                                        class="el-icon-check"
                                        style="
                                    color: #1773fa;
                                    font-size: 13px;
                                    "
                                    />
                                </div>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关键词">
                        <el-select
                            ref="selectIpt"
                            v-model="searchKeysVal"
                            v-el-select-loadmore="loadMoreTheme"
                            class="ipt-type keys-overflow-scoll"
                            el-select
                            multiple
                            placeholder="输入关键词"
                            filterable
                            remote
                            no-match-text="no data"
                            no-data-text="no data"
                            :remote-method="getKeys"
                            size="small"
                            reserve-keyword
                            default-first-option
                            clearable
                            :popper-append-to-body="false"
                            style="width:520px;"
                            allow-create
                            @change="searchKeysKnowledgeList"
                        >
                            <el-option
                                v-for="(item) in keysList"
                                :key="item.keyword_id"
                                :label="item.name"
                                :value="item.name"
                            >
                                <span
                                    style="
                                float: left;
                                width: 250px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                  "
                                    :title="item.name"
                                >
                                    {{ item.name }}
                                </span>
                            </el-option>
                            <div v-if="showActiveWord" class="active-word-absolute">
                                回车使用
                            </div>
                        </el-select>
                    </el-form-item>
                    <el-form-item required>
                        <label class="el-form-item__label">
                            <i class="color-red">*</i>
                            知识内容
                            <span class="el-form-item_label-span">
                                可添加素材数量 {{ content_arr.length }}/10
                            </span>
                        </label>
                        <CustomerMedia v-model="content_arr" :text-limit="800" />
                    </el-form-item>

                    <el-form-item class="item-button tr">
                        <el-button size="small" @click="cancelData">取 消</el-button>
                        <el-button type="primary" size="small" @click="sumitKnowdeage">提 交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </page-main>
    </div>
</template>
<script setup>
import Http from '@/util/request'
import CustomerMedia from '@/components/CustomerMedia/index.vue'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
const router = useRouter()
const route = useRoute()
const keysInfo = reactive({
    search_name: '',
    page_num: 1,
    page_size: 5
})
const addknowInfo = ref({
    group_id: '',
    keyword_arr: [],
    content_arr: []
})
const keysList = ref([])
const total_num = ref(0)
const groupList = ref([])
const content_arr = ref([])
const searchKeysVal = ref([])
const groupInfo = ref({})
const addGroupId = ref('')
const groupName = ref('')
const selectIpt = ref(null)
const showActiveWord = ref(false)
import { bounce } from '@/util/index'
const eventDetail = reactive({
    member_name: '',
    update_time: '',
    create_time: '' })
onMounted(() => {
    let data = route.query
    if (data.group_id && data.sale_scrip_id) {
        addknowInfo.value.sale_script_id = Number(data.sale_scrip_id)
        eventDetail.member_name = data.member_name
        eventDetail.update_time = data.update_time
        eventDetail.create_time = data.create_time
        getKnowledgeDetails()
    }
    if (data.group_id) {
        addknowInfo.value.group_id = Number(data.group_id)
    }

    // 搜索选择框加入箭头图标
    var selecteIcon = document.querySelector('.keys-overflow-scoll .el-input--suffix .el-input__suffix-inner>i')
    selecteIcon.classList.add('el-icon-arrow-up')

})
const cancelData = () => {
    router.go(-1)
}
const getKnowledgeDetails = async() => {
    let routeInfo = route.query
    addknowInfo.value.group_id = Number(routeInfo.group_id)

    // 查询每个id里面包含的素材

    // 获取知识详情
    let { data } = await Http
        .getKnowledgeDetails({
            sale_script_id: routeInfo.sale_scrip_id
        })
    data.keyword_arr.forEach(item => {
        searchKeysVal.value.push(item.name)
    })
    data.content_arr.forEach(item => {
        if (item.type === 'LINK') {
            let arr = item.qw_link_url.split('//')
            item.qw_link_url = arr[1]
            item.url = arr[0] + '//'
        }
    })
    content_arr.value = data.content_arr

    // data.
    // content_arr.value=

}
const sumitKnowdeage = async() => {
    // 1.收集数据
    // 分组id  关键词数组
    if (!addknowInfo.value.group_id) {
        ElMessage.error({
            message: '添加失败,请选择分组后再进行添加!',
            type: 'error',
            showClose: true
        })
        return
    }

    // 素材内容数组
    if (!content_arr.value.length) {
        ElMessage.error({
            message: '知识库素材不能为空!',
            type: 'error',
            showClose: true
        })
        return
    }
    let arr = JSON.parse(JSON.stringify(content_arr.value))
    arr.forEach(item => {
        if (item.type === 'LINK') {
            item.qw_link_url = item.url + item.qw_link_url
        }
    })
    addknowInfo.value.content_arr = arr
    // 2.数据校验
    // 3.发送请求
    searchKeysVal.value.forEach(item => {
        addknowInfo.value.keyword_arr.push({ name: item })
    })
    let res = ''
    if (route.query.group_id && route.query.sale_scrip_id) {
        res = await Http.updateKnowledge(addknowInfo.value)
    } else {
        res = await Http.addKnowledgeSpeech(addknowInfo.value)

    }
    if (res.code === 200) {
        ElMessage.success({
            message: '提交成功'
        })
        router.replace({
            name: 'knowledgeBaseList',
            query: {
                group_id: route.query.group_id
            }
        })
    }
    // 跳转知识库列表页面

}
const searchGroupName = val => {
    groupInfo.value.search_group_name = val
    getGroupList()
}
const getKeys = bounce(val => {
    if (val.length > 5) {
        selectIpt.value.query = val.substring(0, 5)
    }
    if (val) {
        classGetKeysList(val)
    } else {
        showActiveWord.value = false
        keysInfo.page_num = 1
        keysList.value = []
        classGetKeysList()
    }
})
const searchKeysKnowledgeList = () => {
    showActiveWord.value = false
}
const getKnowledgeGroupId = () => {
    addGroupId.value = addknowInfo.value.group_id
    // 重置下拉框 请求分组列表
    searchGroupName('')
}
const getGroupList = async() => {
    let { data } = await Http.getGroupList(groupInfo.value)
    groupList.value = data
}
const loadMoreTheme = () => {
    keysInfo.page_num = ++keysInfo.page_num
    if (total_num.value > keysList.value.length) {
        classGetKeysList()
    }
}
const classGetKeysList = async keyVal => {
    let { data } = await Http.getKeywordList({
        search_name: keyVal,
        page_num: keysInfo.page_num
    })
    if (keyVal) {
        keysList.value = []
        keysList.value = data.list
        let idx = keysList.value.findIndex(val =>  val.name === keyVal)

        if (idx === -1) {
            showActiveWord.value = true
        }

    } else {
        keysList.value = [...keysList.value, ...data.list]
    }

    total_num.value = data.total_num
}
classGetKeysList()
getGroupList()
</script>

<style scoped lang="scss">

    .search-head-wrap > .demo-ruleForm {
        width: 520px;
    }

    .form-ipt-style {
        width: 520px;
        height: 32px !important;
    }

    .item-button {
        display: flex;
        justify-content: flex-end;
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

    .color-red {
        color: #ff3b34;
    }

    .relative {
        position: relative;
    }
    .active-word-absolute{
        position: absolute;
        right: 20px;
        top: 16px;
        color:#979798;
        font-size: 12px;
    }
    .head-content {
        box-sizing: border-box;
        padding-left: 24px;
        padding-right: 24px;
        height: 60px;
        line-height: 60px;
        display: flex;
        justify-content: flex-start;
        background: #EDEEF2;
        margin-left: 24px;
        margin-right: 24px;
        margin-top: 18px;
        margin-bottom: -24px;
    }
    .head-content .head-content-item {
        margin-right: 32px;
    }
</style>
