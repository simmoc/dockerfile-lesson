<template>
    <div class="crud-classify-tree flex flex-direction-column flex flex-justify-start">
        <div class="crud-classify-tree-head flex flex-justify-between mb24">
            <el-input
                v-model.trim="keyword"
                class="flex-1 mr8"
                placeholder="请输入内容"
                size="mini"
            >
                <template #prefix>
                    <i class="el-input__icon el-icon-search" />
                </template>
                <!-- <i slot="prefix" class="el-input__icon el-icon-search" /> -->
            </el-input>
            <el-button size="mini" @click="handleClickAdd()">新建分组</el-button>
        </div>
        <div class="crud-classify-tree-wrap flex-1">
            <!-- 前端搜索 -->
            <!-- :props="defaultProps"
      :filter-node-method="filterNode" -->
            <div
                v-show="props.isSelectAllBtn && selectAllBtnShow"
                :class="[
                    activeAll
                        ? 'tree-select-all tree-select-all-active'
                        : 'tree-select-all'
                ]"
                @click="handleClickSelectAll"
            >
                全部
            </div>
            <el-tree
                ref="filterTree"
                class="filter-tree"
                :data="ReacData.treeData"
                node-key="id"
                highlight-current
                default-expand-all
                :expand-on-click-node="false"
                :indent="8"
                :props="ReacData.treeProps"
                @node-click="handleNodeClick"
            >
                <template #default="{ node, data }">
                    <div
                        class="custom-tree-node flex-1 flex flex-justify-between"
                    >
                        <div
                            :id="node.id"
                            class="left-label"
                            :label="data.label"
                            @mouseover="
                                (e) => {
                                    return mouseenterTree(e, data)
                                }
                            "
                        >
                            <el-tooltip
                                v-if="data.isPopover"
                                popper-class="crud-classify-tree-label-popover"
                                :content="node.label"
                                placement="top-start"
                            >
                                <div class="overflow-ellipsis pr8 left-label-txt">
                                    {{ node.label }}
                                </div>
                            </el-tooltip>
                            <div v-else class="overflow-ellipsis pr8 left-label-txt">
                                {{ node.label }}
                            </div>
                            <div v-if="data.hits_num" class="mock-info-badge">
                                {{ data.hits_num > 99 ? '99+' : data.hits_num }}
                            </div>
                        </div>
                        <span
                            v-if="acitveRightHandle !== data.id"
                            class="right-operate-btn"
                            @click.stop="handleClickRightOperateBtn(data)"
                        >
                            <i class="el-icon-more fs-14" />
                        </span>
                        <el-popover
                            v-else
                            :key="data.id"
                            popper-class="crud-classify-tree-operate-popover"
                            placement="right-start"
                            trigger="hover"
                            :visible-arrow="false"
                            @hide="acitveRightHandleHide"
                        >
                            <div class="right-operate-wrap">
                                <div
                                    v-for="item in ReacData.operateList"
                                    :key="item.name"
                                    class="right-operate-item"
                                    @click.stop="handleClickOperateItem(item, data)"
                                >
                                    {{ item.name }}
                                </div>
                            </div>
                            <template #reference>
                                <span
                                    class="right-operate-btn"
                                    @click.stop="() => {}"
                                >
                                    <i class="el-icon-more fs-14" />
                                </span>
                            </template>
                        </el-popover>
                    </div>
                </template>
            </el-tree>
        </div>
        <el-dialog
            v-model="ReacData.dialog.visible"
            width="418px"
            custom-class="crud-classify-tree-dialog"
            :append-to-body="true"
            :modal-append-to-body="true"
            :destroy-on-close="true"
            :close-on-click-modal="true"
        >
            <template #title>
                <div>{{ ReacData.dialog.title }}</div>
            </template>
            <el-form
                ref="crudClassifyForm"
                size="mini"
                label-position="top"
                :model="ReacData.form"
                @submit.prevent
            >
                <el-form-item
                    label="分组名称"
                    prop="name"
                    :rules="[
                        { required: true, message: '分组名称不可为空' },
                        { max: 10, message: '长度最多 10 个字', trigger: 'blur' }
                    ]"
                >
                    <el-input
                        v-model="ReacData.form.name"
                        placeholder="请输入分组名称"
                        maxlength="10"
                        show-word-limit
                        clearable
                        @keyup.enter.prevent="dialogConfirm"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button size="mini" @click="dialogCancel">取 消</el-button>
                    <el-button size="mini" type="primary" @click="dialogConfirm">
                        确 定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { computed, watch, getCurrentInstance } from 'vue'
// import { reactive } from 'node_modules/vue/dist/vue'
// import { defineExpose } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import Http from '../../util/request'
const props = defineProps({
    parentSearchParams: {
        type: Object,
        default: () => {
            return {}
        }
    },
    isSelectAllBtn: {
        type: Boolean,
        default: false
    },
    beforeAddChildren: {
        type: Function,
        default: () => {
            return true
        }
    },
    parentGetTree: {
        type: Boolean,
        default: false
    },
    parentAdd: {
        type: Boolean,
        default: false
    },
    parentReset: {
        type: Boolean,
        default: false
    }
})

// 变量声明
const route = useRoute()
const keyword = ref('')
const activeAll = ref(false)
const acitveRightHandle = ref(null)
// const filterTree = ref(null)
// const crudClassifyForm = ref(null)
const { proxy } = getCurrentInstance()
const ReacData = reactive({
    operateList: [
        {
            name: '新增子级',
            methods: params =>  addChildren(params)
        },
        {
            name: '编辑名称',
            methods: params => editCurrent(params)
        },
        {
            name: '删除',
            methods: params => delCurrentConfirm(params)
        }
    ],
    treeData: [],
    dialog: {
        visible: false,
        title: '',
        type: 'add', // add edit
        name: ''
    },
    form: {
        name: '',
        parentId: 0
    },
    activeData: null,
    treeProps: {
        label: 'name',
        children: 'childlist'
    }
})

// ========= emit ==========
const emit = defineEmits(['updatecurrenttreedata'])

// ==========watch ============
// 监听父元素调用相关方法
watch(() => [props.parentGetTree, props.parentAdd, props.parentReset, keyword.value], ([getNew, addnew, resetNew, keywordNew], [getOld, addOld, resetOld, keywordOld]) => {
    if (getNew !== getOld) {
        getTreeData()
    } else if (addnew !== addOld) {
        handleClickAdd()
    } else if (resetNew !== resetOld) {
        resetTree()
    } else if (keywordNew !== keywordOld) {
        getTreeData()
    }
})
// ========computed =============
const selectAllBtnShow = computed(() => {
    if (!props.isSelectAllBtn || keyword.value) {
        return false
    }
    let kArr = Object.keys(props.parentSearchParams)
    if (kArr.length) {
        kArr = kArr.filter(k => {
            return props.parentSearchParams[k]
        })
    }
    return ReacData.treeData && ReacData.treeData.length && !kArr.length
})

// =========生命周期===========
onMounted(() => {
    getTreeData()
})

// =========函数=============
const handleClickSelectAll = () => {
    // filterTree.value.setCurrentKey(null)
    proxy.$refs.filterTree.setCurrentKey(null)
    ReacData.activeData = {}
    activeAll.value = true
    emit('updatecurrenttreedata', { id: 'ALL', label: '全部' })
}

const isNodeIdExit = (value, key, tree) => {
    for (let i = 0; i < tree.length; i++) {
        let cur = tree[i]
        if (cur[key] == value) {
            return cur
        } else {
            if (cur.childlist && cur.childlist.length > 0) {
                let res = isNodeIdExit(value, key, cur.childlist)
                if (res) {
                    return res
                }
            }
        }
    }
}

const handleClickRightOperateBtn = data => {
    acitveRightHandle.value = data.id
}
const acitveRightHandleHide = () => {
    acitveRightHandle.value = null
}
const getQueryVariable = k => {
    return (route.query && route.query[k]) || ''
}
const mouseenterTree = (e, data) => {
    let { target } = e
    if (target.scrollWidth > target.clientWidth) {
        data.isPopover = true
    }
}
const editCurrent = data => {
    ReacData.form.id = data.id || 0
    ReacData.dialog.title = '编辑分组名称'
    ReacData.form.name = data.name
    ReacData.form.mark = 'update'
    ReacData.dialog.visible = true
}

const addChildren = async data => {
    let isContinue = true
    if (props.beforeAddChildren) {
        isContinue = await props.beforeAddChildren(data)
    }
    if (isContinue) {
        ReacData.dialog.title = '新建分组名称'
        ReacData.form.name = ''
        ReacData.form.mark = 'add'
        ReacData.form.parentId = data.id || 0
        ReacData.dialog.visible = true
        nextTick(() => {
            if (proxy.$refs.crudClassifyForm) {
                proxy.$refs.crudClassifyForm.clearValidate()
            }
        })
    }
}

const delConfirm = data => {
    // 删除后回调刷新 tree 数据
    Http
        .getTaskCategoryDel({}, [data.id])
        // .getTaskCategoryDel({}, [data.id])
        .then(() => {
            getTreeData()
        })
        .catch(e => {
            console.log(e)
        })
}

const delCurrentConfirm = data => {
    // if (data.children && data.children.length) {
    ElMessageBox.confirm(
        // '当前分组下有子级分组，删除该组会把子级分组都会删除！',
        '确认是否删除该分组？',
        '提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        }
    )
        .then(() => {
            delConfirm(data)
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消删除'
            })
        })
    // } else {
    //   this.delConfirm(data)
    // }
}

const handleClickAdd = v => {
    console.log(v)
    ReacData.form = {
        name: '',
        parentId: 0,
        mark: 'add'
    }
    ReacData.dialog.type = 'add'
    ReacData.dialog.title = '新建分组名称'
    ReacData.dialog.visible = true
    nextTick(() => {
        if (proxy.$refs.crudClassifyForm) {
            proxy.$refs.crudClassifyForm.clearValidate()
        }
    })
}
const resetTree = () => {
    keyword.value = ''
    getTreeData()
}
const dialogCancel = () => {
    ReacData.dialog.visible = false
}

const dialogConfirm = () => {
    proxy.$refs.crudClassifyForm.validate(valid => {
        if (valid) {
            if (ReacData.form.mark == 'add') {
                getTaskCategoryAdd()
            }
            if (ReacData.form.mark == 'update') {
                getTaskCategoryUpdate()
            }
            ReacData.dialog.visible = false
        }
    })
}
// 修改信息
const getTaskCategoryUpdate = () => {
    Http
        .getTaskCategoryUpdate({ id: ReacData.form.id, name: ReacData.form.name })
        .then(res => {
            if (res.code == 200) {
                getTreeData()
            }
        })
        .catch(res => {
            console.log(res)
        })
}
// 添加分组
const getTaskCategoryAdd = () => {
    Http
        .getTaskCategoryAdd({ pid: ReacData.form.parentId, name: ReacData.form.name })
        .then(res => {
            if (res.code == 200) {
                if (res.data && res.data.id) {
                    ReacData.activeData = res.data
                }
                getTreeData()
            }
        })
        .catch(res => {
            console.log(res)
        })
}
const handleClickOperateItem = (item, data) => {
    item.methods(data)
}
// 前端筛选
// searchByKeyFront(v) {
// this.$refs.filterTree.filter(this.keyword);
// },

const handleNodeClick = data => {
    activeAll.value = false
    emit('updatecurrenttreedata', data)
    ReacData. activeData = JSON.parse(JSON.stringify(data))
}

const getTreeData = async() => {
    let params = {}
    if (keyword.value) {
        params.search_name = keyword.value
    }
    if (props.parentSearchParams.code_name) {
        params.task_key = props.parentSearchParams.code_name
    } else {
        params.task_key = ''
    }

    try {
        let res = await Http.getTaskCategory(params)
        ReacData.treeData = res.data
        let back_tree_id = getQueryVariable('back_tree_id')
        let back_table_page_no =
            getQueryVariable('back_table_page_no') || 1
        if (ReacData.treeData.length <= 0) {
            emit(
                'updatecurrenttreedata',
                ReacData.treeData,
                back_table_page_no
            )
            return
        }
        let cd = null
        let backTreeId =
            (ReacData.activeData ? ReacData.activeData.id : back_tree_id) || ''
        let isN = isNodeIdExit(backTreeId, 'id', ReacData.treeData)
        nextTick(() => {
            // console.log('树节点', filterTree.value.setCurrentKey)
            // filterTree.value.setCurrentKey('')
            // 有选中 或 第一次页面加载带 back_tree_id 回显
            // console.log('handleClickSelectAll', props.isSelectAllBtn, selectAllBtnShow.value)
            if (isN && backTreeId) {
                proxy.$refs.filterTree.setCurrentKey(backTreeId)
                cd = proxy.$refs.filterTree.getCurrentNode()
                // filterTree.value.setCurrentKey(backTreeId)
                // cd = filterTree.value.getCurrentNode()
                activeAll.value = false
            } else if (props.isSelectAllBtn && selectAllBtnShow.value) {
                // console.log('出啊法律')
                handleClickSelectAll()
                return
            } else if (!cd) {
                // 默认第一个
                cd = ReacData.treeData[0]
                // filterTree.value.setCurrentKey(cd.id)
                proxy.$refs.filterTree.setCurrentKey(cd.id)
            }
            // console.log('第一个节点', cd)
            cd = JSON.parse(JSON.stringify(cd))
            delete cd.childlist
            ReacData.activeData = cd
            cd.keyword = keyword.value
            emit('updatecurrenttreedata', cd, back_table_page_no)
        })
    } catch (e) {
        console.log(e)
    }
}
defineExpose({ getTreeData, resetTree, handleClickAdd })
</script>

<style lang="scss">
.crud-classify-tree {
    height: 100%;
    width: 100%;
    overflow: hidden;
    .crud-classify-tree-wrap {
        height: calc(100% - 60px);
        overflow: auto;
        .tree-select-all {
            opacity: 1;
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            color: rgba(0, 0, 0, 0.65);
            line-height: 25px;
            margin-bottom: 8px;
            cursor: pointer;
            padding-left: 8px;
        }
        .tree-select-all-active {
            background-color: #eef5ff !important;
            color: #1773fa;
        }
        .custom-tree-node {
            align-items: center;
            width: 100%;
            overflow: hidden;
            .left-label {
                line-height: 26px;
                font-size: 14px;
                color: #606266;
                display: flex;
                align-items: center;
                width: calc(100% - 30px);
                overflow: hidden;

                .mock-info-badge {
                    background-color: #909399;
                    border-radius: 10px;
                    color: #fff;
                    display: inline-block;
                    font-size: 12px;
                    height: 18px;
                    line-height: 18px;
                    padding: 0 6px;
                    text-align: center;
                    white-space: nowrap;
                    border: 1px solid #fff;
                }
            }
            .right-operate-btn {
                padding: 0 4px 0 2px;
                cursor: pointer;
                i {
                color: #c4c4c4;
                }
            }
        }
    }
}

</style>

<style>
.flex flex-justify-between {
  display: flex;
  justify-content: space-between;
}
.crud-classify-tree-dialog .el-dialog__body {
  padding: 24px;
}
.crud-classify-tree-operate-popover {
  padding: 0;
  width: 84px !important;
  box-sizing: border-box;
  min-width: 84px;
}
.crud-classify-tree-operate-popover .right-operate-item {
  padding: 0 11px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 400;
  color: #171717;
  cursor: pointer;
}
.crud-classify-tree-operate-popover .right-operate-item:hover {
  background: #1773fa;
  color: #fff;
}
.crud-classify-tree-label-popover .left-label-txt {
  padding-right: 6px;
  font-weight: 400;
}
.el-tree-node.is-current > .el-tree-node__content {
  background-color: #eef5ff !important;
  color: #1773fa;
}
.crud-classify-tree
  .crud-classify-tree-wrap
  .el-tree-node.is-current
  > .el-tree-node__content
  .mock-info-badge {
  background-color: #1773fa !important;
}
.el-tree-node.is-current > .el-tree-node__content .left-label-txt,
.crud-classify-tree
  .crud-classify-tree-wrap
  .el-tree-node.is-current
  > .el-tree-node__content
  .custom-tree-node
  .right-operate-btn
  i {
  color: #1773fa !important;
}
.crud-classify-tree
  .crud-classify-tree-wrap
  .el-tree-node.is-current
  > .el-tree-node__content
  .el-tree-node__expand-icon {
  color: #1773fa;
}
.crud-classify-tree
  .crud-classify-tree-wrap
  .el-tree-node.is-current
  > .el-tree-node__content
  .el-tree-node__expand-icon.is-leaf::before {
  color: transparent;
}
</style>