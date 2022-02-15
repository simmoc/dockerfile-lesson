<template>
    <div class="flex-direction-column flex flex-1">
        <div v-if="props.tablePageContent.groupLength === 0">
            <NoData>
                <template #content>
                    <div>{{ props.tablePageContent.content }}</div>
                </template>
                <template #button>
                    <div>
                        <el-button
                            v-if="props.tablePageContent.btnContent == '去知识库'"
                            type="primary"
                            size="small"
                            @click="handleGoknow"
                        >
                            {{ props.tablePageContent.btnContent }}
                        </el-button>
                        <!-- <el-button v-else type="primary" @click="handlerNewGroup">
                            {{ props.tablePageContent.btnContent }}
                        </el-button> -->
                    </div>
                </template>
            </NoData>
        </div>

        <div v-else class="right-table flex flex-1 flex-direction-column">
            <div class="table-head right-table-header flex-row flex-row-between">
                <div class="table-head-title">
                    <span>{{ props.groupNextInfo ? props.groupNextInfo.name : '' }}</span>
                </div>
            </div>
            <CustomerTable
                :table-title="form.tableTitle"
                :table-data="props.knowledgeList"
                style="width: 100%; margin-top: -24px"
                max-height="630"
                class="table"
            >
                <template #content="scope">
                    <div v-if="scope.data.content&&scope.data.content.length < 50">
                        {{ scope.data.content }}
                    </div>
                    <el-popover
                        v-if="scope.data.content&&scope.data.content.length >= 50"
                        placement="bottom"
                        :width="400"
                        trigger="hover"
                        popper-class="member-info-pop"
                    >
                        <div class="popover-content-box">
                            {{ scope.data.content }}
                        </div>
                        <template #reference>
                            <div class="popover-content">
                                {{ scope.data.content.substring(0, 50) }} ...
                            </div>
                        </template>
                    </el-popover>
                </template>

                <template #keyword="scope">
                    <div class="keys-item-tab" @click="handlerVisbleEdit(scope.data)">
                        <div v-show="scope.data.sale_scrip_id !== form.saleScripId">
                            <div v-if="scope.data.keyword_arr&&scope.data.keyword_arr.length <= 9">
                                <el-tag
                                    v-for="(key, index) in scope.data.keyword_arr"
                                    :key="index"
                                    size="mini"
                                    effect="dark"
                                    class="item-keys-margin"
                                >
                                    {{ key.keyword_name }}
                                </el-tag>
                            </div>
                            <div v-if="scope.data.keyword_arr&&scope.data.keyword_arr.length > 9">
                                <el-tag class="item-keys-margin">
                                    {{ scope.data.keyword_arr[0].keyword_name || '' }}
                                </el-tag>
                                <el-tag class="item-keys-margin">
                                    {{ scope.data.keyword_arr[1].keyword_name || '' }}
                                </el-tag>
                                <el-tag class="item-keys-margin">
                                    {{ scope.data.keyword_arr[3].keyword_name || '' }}
                                </el-tag>
                                <el-tag class="item-keys-margin">
                                    {{ scope.data.keyword_arr[4].keyword_name || '' }}
                                </el-tag>
                                <el-tag class="item-keys-margin">
                                    {{ scope.data.keyword_arr[5].keyword_name || '' }}
                                </el-tag>
                                <el-tag class="item-keys-margin">
                                    {{ scope.data.keyword_arr[6].keyword_name || '' }}
                                </el-tag>
                                <el-tag class="item-keys-margin">
                                    {{ scope.data.keyword_arr[7].keyword_name || '' }}
                                </el-tag>
                                <el-tag class="item-keys-margin">
                                    {{ scope.data.keyword_arr[8].keyword_name || '' }}
                                </el-tag>
                                ...
                            </div>
                        </div>
                        <div v-show="scope.data.sale_scrip_id === form.saleScripId">
                            <el-select
                                v-model="form.searchKeysVal"
                                class="ipt-type keys-overflow-scoll"
                                style="width: 100%"
                                allow-create
                                el-select
                                multiple
                                filterable
                                default-first-option
                                remote
                                :remote-method="getKeys"
                                size="small"
                                no-match-text="暂无数据"
                                no-data-text="暂无数据"
                                reserve-keyword
                                :multiple-limit="form.select_reule"
                                @change="searchKeysKnowledgeList"
                            >
                                <el-option
                                    v-for="(item, index) in form.keysList"
                                    :key="item.keyword_id || index"
                                    :label="item.name"
                                    :value="item.name"
                                />
                                <div v-if="showActiveWord" class="active-word-absolute">
                                    回车使用
                                </div>
                            </el-select>
                        </div>
                    </div>
                </template>
                <el-table-column label="操作" width="190px" fixed="right">
                    <template #default="{ row }">
                        <div v-show="row.sale_scrip_id !== form.saleScripId">
                            <el-button
                                type="text"
                                size="mini"
                                @click="handleKnowledgeEdit(row)"
                            >
                                编辑
                            </el-button>
                        </div>
                        <div v-show="row.sale_scrip_id == form.saleScripId">
                            <el-button
                                type="text"
                                size="mini"
                                @click="handleKnowledgeCancel"
                            >
                                取消
                            </el-button>
                            <el-button type="text" size="mini" @click="handleKnowledgeBc">
                                保存
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </CustomerTable>
        </div>
    </div>
</template>
<script setup>
import http from '@/util/request'
import { onMounted, reactive } from 'vue'
import NoData from '@/components/NoData/index.vue'
import CustomerTable from '@/components/CustomerTable/index.vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
// const { proxy } = getCurrentInstance()
const showActiveWord = ref(false)
const form = reactive({
    total_num: 0,
    saleScripId: -1,
    searchKeysVal: [],
    select_reule: 99,
    keysInfo: {
        page_num: 1
    },
    keysList: [],
    tableTitle: [
        {
            label: '内容',
            prop: 'content',
            type: 'slot'
        },
        {
            label: '关键词',
            prop: 'keyword',
            type: 'slot'
        }
    ]
})
const props = defineProps({
    tablePageContent: {
        type: Object,
        default() {
            return {
                groupLength: 0
            }
        }
    },
    knowledgeList: {
        type: Array
    },
    groupNextInfo: {
        type: Object
    }
    // keysList: {
    //     type: Array
    // }
})
const router = useRouter()
const emit = defineEmits(['getGroupListInfo'])
// function loadMoreTheme() {
//     // console.log(form.keysInfo.page_num)
//     form.keysInfo.page_num = ++form.keysInfo.page_num
//     if (form.total_num > form.keysList.length) {
//         classGetKeysList()
//     }
// }
function getKeys(keyVal) {
    // if (!keyVal) {
    //   return
    // }
    // 在它下面的第一个子节点后面插入值
    // if (keyVal.length > 5) {
    //     this.$refs.keysRef.query = keyVal.substring(0, 5)
    // }
    console.log('keyVal', keyVal)
    // console.log('this.$refs.keysRef', this.$refs.keysRef)
    form.keysInfo.page_num = 1
    form.keysList = []
    if (keyVal) {
        let idx = form.keysList.findIndex(val => { val.name === val })
        if (idx === -1) {
            showActiveWord.value = true
        }
    }
    classGetKeysList(keyVal)
    // this.$refs.keysRef.query = ''
}
// 编辑，点击跳转到编辑知识页，仅修改关键词
function handleKnowledgeEdit(data) {
    router.push({
        name: 'marketing-reply_Edit',
        query: {
            group_id: props.groupNextInfo.group_id,
            page_no: 1,
            from_page: 'reply',
            form_title: '编辑推荐回复',
            eventDetail: JSON.stringify(data)
        }
    })
}
// 公共的请求关键字列表方法
function classGetKeysList(keyVal) {
    // 1.发送请求
    http
        .getKeywordList({
            search_name: keyVal,
            page_num: form.keysInfo.page_num
        })
        .then(
            res => {
                const { data } = res
                console.warn('data', data)
                if (!data.list.length) {
                    return
                }
                if (keyVal) {
                    form.keysList = data.list
                } else {
                    form.keysList = [...form.keysList, ...data.list]
                }

                form.total_num = data.total_num
                // 分组中查找关键字 动态渲染

                console.warn('form.keysList', form.keysList)
            },
            error => {
                console.log(error)
            }
        )
}
function handlerVisbleEdit(row) {
    form.searchKeysVal = []
    row.keyword_arr.forEach(item => {
        form.searchKeysVal.push(item.keyword_name)
    })
    console.log(form.searchKeysVal)
    form.saleScripId = row.sale_scrip_id
    classGetKeysList()
}
function handleKnowledgeCancel() {
    // console.log('处理函数', e)
    form.saleScripId = -1
}
function handleKnowledgeBc() {
    // 单数组去重
    const keyword_arr = []
    form.searchKeysVal.forEach(item => {
        keyword_arr.push({
            name: item
        })
    })
    http
        .updateKnowledgeKeys({ keyword_arr, sale_script_id: form.saleScripId })
        .then(
            res => {
                console.log(res)
                if (res.msg == 'OK') {
                    form.saleScripId = -1
                    // 刷新页面  获取知识列表
                    emit('getGroupListInfo')
                }
            },
            error => {
                console.log(error)
            }
        )
}
function searchKeysKnowledgeList() {
    // console.log(form.searchKeysVal, this.$refs.keysRef)
    if (form.searchKeysVal[form.searchKeysVal.length - 1].length > 5) {
        form.searchKeysVal.pop()
        ElMessage.error({
            message: '关键词字符长度最多为5个!'
        })
    }
    showActiveWord.value = false
    // this.$refs.keysRef.query = ''
}
// 去知识库
function handleGoknow() {
    router.push({
        name: 'knowledgeBaseList',
        query: {
            type: 'go-knowledgeBaseList',
            group_id: props.groupNextInfo.group_id,
            page_no: 1,
            from_page: 'replyList',
            form_title: '添加分分组'
        }
    })
}
// 点击创建分组
// function handlerNewGroup() {
//     console.log('proxy.$parent', proxy.$parent)
//     proxy.$parent.handlerNewGroup(true)
// }
onMounted(() => {
    document.body.addEventListener('click', e => {
        let goal = document.getElementsByClassName('table')[0]
        // console.log('eeeee', e)
        if (!e.path.includes(goal)) {
            handleKnowledgeCancel()
        }
    })
})
</script>

<style lang="scss" scoped>
.right {
  margin-top: 24px;
}
.flex-column .left {
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
}
// .right-con {
//   display: block;
//   position: absolute;
//   left: 50%;
//   top: 20%;
//   text-align: center;
//   .con-title {
//     height: 44px;
//     line-height: 44px;
//   }
// }
.right-table .right-table-header {
  font-size: 20px;
  font-weight: bold;
  height: 40px;
  color: #000;
}
// .right-table {
//   width: calc(100vw - 570px);
// }

.item-keys-margin {
  margin-right: 8px;
}
.keys-item-tab {
  min-height: 28px;
  line-height: 28px;
}
.popover-content-box {
  max-height: 300px;
  overflow: auto;
}
// :deep(.el-tag) {
//   color: #fff;
//   opacity: 0.8;
//   background: #1773fa;
//   border-radius: 4px;
//   font-size: 12px;
//   font-weight: 400;
// }
// :deep(.el-tag.el-tag--info .el-tag__close) {
//   opacity: 1;
//   background: #fff;
//   color: #1773fa;
//   margin-right: 5px;
// }
.table-head-title {
  font-size: 16px;
//   padding-top: 5px;
  line-height: 32px;
}
.active-word-absolute{
        position: absolute;
        right: 20px;
        top: 16px;
        color:#979798;
        font-size: 12px;
    }
</style>
