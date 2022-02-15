<template>
    <div>
        <div class="search-form ">
            <el-form :inline="true" :model="form" label-position="right" label-width="120px" size="small" class="search-form-margin">
                <el-form-item label="文本内容：">
                    <el-input v-model="form.search_content" placeholder="请输入文本内容" style="width:274px;"
                              @keyup.enter="onSearch"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="default" @click="onReset">重置</el-button>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <page-main class="flex flex-direction-column">
            <div class="flex">
                <div class="table-search-box">
                    <el-input v-model="search_tag_name" placeholder="请输入部门名称" size="small" class="table-search-input" @input="search($event)" />
                    <div class="table-tree">
                        <CustomerTree ref="customerTree"
                                      :data="treeData"
                                      @handle-tree-leaf-click="currentTreeLeafClick"
                        />
                    </div>
                </div>
                <div class="" style="flex-grow: 1;
    flex-shrink: 1;"
                >
                    <div class="table-top-area">
                        <div class="tr">
                            <el-button
                                v-if="showTable"
                                icon="el-icon-plus"
                                type="primary"
                                size="small"
                                data-isSet="1"
                                @click="goTo('labelSaleAdd',{ selected: JSON.stringify(node)==='{}'?'':JSON.stringify(node)})"
                            >
                                添加标签营销
                            </el-button>
                        </div>
                    </div>
                    <div
                        v-if="showTable"
                    >
                        <CustomerTable
                            :table-title="tableTitle"
                            :table-data="tableData"
                            :need-pagination="true"
                            class="customer-tree"
                            :empty-text="emptyText"
                            :class="{'is-collapse': $store.state.settings.mode === 'pc' && $store.state.settings.sidebarCollapse}"
                        >
                            <template #content="scope">
                                <div v-if="scope.data.content.length <= 34">
                                    {{ scope.data.content }}
                                </div>
                                <el-popover
                                    v-else
                                    placement="bottom"
                                    width="400"
                                    trigger="hover"
                                    popper-class="member-info-pop"
                                >
                                    <span>
                                        {{ scope.data.content }}
                                    </span>
                                    <template #reference>
                                        <div class="member-info-content">
                                            {{ scope.data.content.substring(0, 40) }}...
                                        </div>
                                    </template>
                                </el-popover>
                            </template>
                            <template #tag_arr="scope">
                                <div v-if="scope.data.tag_arr.length <= 1">
                                    <customerTag
                                        v-for="item in scope.data.tag_arr"
                                        :key="item.tag_name"
                                        :left-title="item.tag_group_name"
                                        :right-title="item.tag_name"
                                        :color="
                                            item.tag_group_type === 'HQ' ? '#409eff' : '#FF6F00'
                                        "
                                        :customer-style="{ 'margin-bottom': 0 }"
                                    />
                                </div>
                                <el-popover
                                    v-else
                                    placement="bottom"
                                    trigger="hover"
                                    popper-class="key-word-pop"
                                    height="325"
                                    width="542"
                                >
                                    <div class="member-tag-pop">
                                        <customerTag
                                            v-for="key in scope.data.tag_arr"
                                            :key="key.tag_name"
                                            :left-title="key.tag_group_name"
                                            :right-title="key.tag_name"
                                            :color="
                                                key.tag_group_type === 'HQ' ? '#409eff' : '#FF6F00'
                                            "
                                            :right-text-break="false"
                                            :right-text-auto="true"
                                        />
                                    </div>
                                    <template #reference>
                                        <div>
                                            <customerTag
                                                :left-title="scope.data.tag_arr[0].tag_group_name"
                                                :right-title="scope.data.tag_arr[0].tag_name"
                                                :color="
                                                    scope.data.tag_arr[0].tag_group_type === 'HQ'
                                                        ? '#409eff'
                                                        : '#FF6F00'
                                                "
                                                :customer-style="{ 'margin-bottom': 0 }"
                                            />
                                            <span>...</span>
                                        </div>
                                    </template>
                                </el-popover>
                            </template>
                            <el-table-column
                                label="操作"
                                prop=""
                                show-overflow-tooltip
                                fixed="right"
                                width="200px"
                            >
                                <template #default="{ row }">
                                    <el-button
                                        type="text"
                                        size="mini"
                                        @click="goTo('labelSaleEdit',{sale_script_id:row.sale_scrip_id,selected: JSON.stringify(node)})"
                                    >
                                        编辑
                                    </el-button>
                                    <el-button
                                        type="text"
                                        size="mini"
                                        @click="
                                            showConfirm(
                                                row.sale_scrip_id
                                            )
                                        "
                                    >
                                        删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </CustomerTable>
                        <customer-pagination
                            v-model:page="form.page_num"
                            v-model:limit="form.page_size"
                            :total="total"
                            :get-data="getSaleTagScriptList"
                        />
                    </div>
                    <div v-else class="table-blank">
                        <NoData>
                            <template #content>
                                <div>暂无标签，请去标签库添加标签！</div>
                            </template>
                            <template #button>
                                <el-button
                                    type="primary"
                                    size="small"
                                    @click="goTo('iframe-customer-hq_tags')"
                                >
                                    去总部标签库
                                </el-button>
                                <el-button
                                    type="primary"
                                    size="small"
                                    @click="goTo('iframe-customer-service_tags')"
                                >
                                    去服务标签库
                                </el-button>
                            </template>
                        </NoData>
                    </div>
                </div>
            </div>
        </page-main>
        <!-- 删除知识 -->
        <CustomerDialog title="提示" :dialog-visible="dialogVisible" width="400px" :confirm-fn="()=>deleteTagSaleScript(sale_script_id)" @cancel="cancelDialog">
            <div class="group_name">是否删除该标签营销?</div>
        </CustomerDialog>
    </div>
</template>

<script setup>
import Http from '@/util/request'
import { bounce } from '@/util/index'
import { nextTick, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import NoData from '@/components/NoData/index.vue'
import CustomerTree from '@/components/CustomerTree/index.vue'
import CustomerDialog from '@/components/CustomerDialog/index.vue'
import { ElMessage } from 'element-plus'
const router = useRouter()
const route = useRoute()
let  form = ref({
    search_content: '',
    page_num: 1,
    page_size: 10
})
const emptyText = ref('')
const tableTitle = ref([
    {
        label: '内容',
        prop: 'content',
        type: 'slot',
        width: 500
    },
    {
        label: '标签',
        prop: 'tag_arr',
        type: 'slot',
        width: 500
    }
])
let tableData = ref([])
const search_tag_name = ref('')
const total = ref(0)
let treeData = ref([])
const customerTree = ref(null)
let dialogVisible = ref(false)
const showTable = ref(true)
const node = ref({})// 暂存点击的tree-node
const selected = ref({})// 暂存点击的tree-node
const sale_script_id = ref('')
onMounted(() => {
    selected.value = route.query.selected
        ? JSON.parse(route.query.selected)[0]
        : {}
    getTagScriptList()
})
const cancelDialog = () => {
    dialogVisible.value = false
}
const getTagScriptList = async() => {
    treeData.value = []
    let { data } = await Http.getTagScriptList({
        search_content: form.value.search_content,
        search_tag_name: search_tag_name.value
    })
    if (data.hq_list) {
        treeData.value.push({
            id: '总部标签',
            name: '总部标签',
            tag_value_arr: data.hq_list
        })
    }
    if (data.service_list) {
        treeData.value.push({
            id: '服务标签',
            name: '服务标签',
            tag_value_arr: data.service_list
        })
    }
    console.log(treeData.value)
    // 二级标签都没有的话，就显示让他们去添加标签
    if (data.hq_list.length === 0 && data.service_list.length === 0) {
        showTable.value = false
    }
    console.log('111', node.value)
    if (node.value.tag_id) {
        nextTick(() => {
            customerTree.value.selectItem(node.value, true, true)
        })
    } else {
        // 没有点击过，只是搜索的话，就默认选中第一个
        if (search_tag_name.value || form.value.search_content) {
            let node = null
            if (data.hq_list && data.hq_list.length > 0) {
                node = data.hq_list[0].tag_value_arr[0]
            } else if (data.service_list && data.service_list.length > 0) {
                node = data.service_list[0].tag_value_arr[0]
            }
            console.log(111, node)
            if (node) {
                nextTick(() => {
                    customerTree.value.selectItem(node, true, true)
                })
            }

        } else {
            if (JSON.stringify(selected.value) !== '{}') {
                // 如果点击过就缓存下他的node值
                nextTick(() => {
                    customerTree.value.selectItem(selected.value, true, true)
                })
            }
        }
    }

}

const onReset = () => {
    form.value = {
        search_content: '',
        tag_id: '',
        page_num: 1,
        page_size: 10
    }
    search_tag_name.value = ''
    getTagScriptList()
    tableData.value = []
    node.value = {}
    router.replace({ name: 'labelSale' })

}
const onSearch = () => {
    getTagScriptList()
}
const search = bounce(() =>  getTagScriptList())
const getSaleTagScriptList = async() => {
    tableData.value = []
    let res = await Http.getSaleTagScriptList({
        page_num: form.value.page_num,
        page_size: form.value.page_size,
        search_content: form.value.search_content,
        tag_id: form.value.tag_id
    })
    if (res.code === 200) {
        tableData.value = res.data.list
        total.value = res.data.total_num
        if (tableData.value.length === 0) {
            emptyText.value = '暂无数据'
        } else {
            emptyText.value = '请选择左侧标签'
        }
    }

}
const goTo = (name, query) => {
    console.log(query)
    router.push({ name, query })
}
const currentTreeLeafClick = val => {
    node.value = val
    form.value.tag_id = val.tag_id
    getSaleTagScriptList()
}
const showConfirm = arg => {
    dialogVisible.value = true
    console.log(arg)
    sale_script_id.value = arg
}
const deleteTagSaleScript = async sale_script_id => {
    let res = await Http.deleteTagSaleScript({
        sale_script_id
    })
    if (res.code === 200) {
        dialogVisible.value = false
        ElMessage.success('删除成功')
        getTagScriptList()
    }

}
</script>

<style scoped lang="scss">
    .search-form {
        padding: 24px;
        background-color: #fff;
        margin: 24px;
    }

    .table-search-box {
        width: 296px;
        flex-grow: 0;
        flex-shrink: 0;
        border-right: 1px solid #edeef2;
        padding-right: 16px;
        margin-right: 16px;
    }
    .table-tree{
        max-height: 600px;
        overflow-y: auto;
    }

    .table-search-input {
        margin-bottom: 24px;
    }

    .table-top-tip {
        color: #8c8c8c;
        font-size: 12px;
        margin-left: 8px;
    }

    /*.customer-tree {*/
    /*    width: calc(100vw - 700px);*/
    /*    &.*/
    /*}*/

    .distribution-role-list {
        max-height:150px;
        overflow-y: auto;
        & > div {
            margin-top: 8px;
            font-size: 12px;
            cursor: pointer;

            &:first-child {
                margin-top: 22px;
            }

            .el-icon-check {
                margin-left: 8px;
            }
        }
    }

    .pd12 {
        padding: 12px;
    }

    .icon{
        font-size: 19px;
        vertical-align: middle;
    }
    .sync-btn{
        display: inline-block;
        width: 146px;
        height: 32px;
        background: #ffffff;
        border: 1px solid $customer-primary-color;
        border-radius: 2px;
        color: $customer-primary-color;
        text-align: center;
        padding: 4px 18px;
        cursor: pointer;
        &:hover{
            background-color: #e8f1ff;
        }
    }
    // .table-blank {
    //     height: 600px;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    // }

</style>
