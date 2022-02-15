<template>
    <div class="crud-classify-tree flex-column flex-row-start">
        <div class="crud-classify-tree-wrap flex-1">
            <!-- :props="defaultProps" -->
            <!-- :filter-node-method="filterNode" -->
            <!-- {{ props.selectItem.id }} -->
            <el-tree
                ref="filterTree"
                class="filter-tree"
                :data="grouList"
                node-key="id"
                highlight-current
                :current-node-key="selectItem.id"
                default-expand-all
                :expand-on-click-node="false"
                :indent="8"
                @node-click="handleNodeClick"
            >
                <template #default="{ node, data }">
                    <div
                        class="custom-tree-node flex-1 flex-justfy-between"
                    >
                        <div :id="node.id" class="left-label" :label="data.name"
                             @mouseover="(e) => {return mouseenterTree(e, data)}"
                        >
                            <el-tooltip
                                v-if="data.isPopover"
                                popper-class="crud-classify-tree-label-popover"
                                :content="node.data.name"
                                placement="top-start"
                            >
                                <div class="overflow-ellipsis pr16 left-label-txt">
                                    {{ node.data.name }}
                                </div>
                            </el-tooltip>
                            <div v-else class="overflow-ellipsis pr16 left-label-txt">
                                {{ node.data.name }}
                            </div>
                            <div v-if="data.hits_num" class="mock-info-badge">
                                {{ (data.hits_num > 99) ? '99+' : data.hits_num }}
                            </div>
                        </div>
                        <!-- <span
                            v-if="acitveRightHandle !== data.id"
                            class="right-operate-btn"
                            @click.stop="handleClickRightOperateBtn(data)"
                        >
                            <i class="el-icon-more fs-14" />
                        </span> -->
                    </div>
                </template>
            </el-tree>
        </div>
    </div>
</template>

<script setup>
import Http from '@/util/request'
import { nextTick, onMounted } from 'vue'

const props = defineProps({
    onSearch: {
        type: Array,
        default: () => []
    },
    params: {
        type: Object,
        default: () => {}
    },
    selectItem: {
        type: Object,
        default: () => {}
    }
})

const selectItem = ref({})
const filterTree = ref(null)
const grouList = ref([])
const params = ref({
    group_name: '',
    code_name: '',
    start_time: '',
    end_time: '',
    search_member_id_arr: [],
    search_department_id_arr: []
})
watch(() => props.onSearch, () => {
    // params.value = JSON.parse(JSON.stringify(props.params))
    params.value.code_name = props.params.search_name
    params.value.start_time = props.params.start_time
    params.value.end_time = props.params.end_time
    params.value.search_member_id_arr = props.params.search_member_id_arr
    params.value.search_department_id_arr = props.params.search_department_id_arr
    getTreeData()
})

const emits = defineEmits(['selectItem'])

const getTreeData = async() => {
    const { data } = await Http.getmemberGroup(params.value)
    grouList.value = data || []
    selectItem.value = grouList.value[0] || {}
    if (grouList.value[0]) {
        emits('selectItem', selectItem.value)
        console.log('分组类目', filterTree.value)
        // filterTree.value.setCurrentKey(selectItem.value.id)
        nextTick(() => {
            filterTree.value.setCurrentKey(selectItem.value.id)
        })
        // filterTree.value.setCurrentNode(selectItem.value)
    } else {
        emits('selectItem', '')
    }
}
const mouseenterTree = (e, data) => {
    let { target } = e
    if (target.scrollWidth > target.clientWidth) {
        // this.$set(data, 'isPopover', true)
        data.isPopover = true
    }
}

const handleNodeClick = data => {
    emits('selectItem', data)
    // console.log('选中节点', data, node)
}
onMounted(() => {
    getTreeData()
})
</script>

<style scoped>
/* @import url("../../../../../static/memberCode/crudClassifyTree.css"); */
</style>
<style>
.crud-classify-tree-dialog .el-dialog__body {
  padding: 24px;
  /* padding-top: 16px;
  padding-bottom: 16px; */
}

.crud-classify-tree-operate-popover {
  padding: 0;
  width: 84px !important;
  box-sizing: border-box;
  min-width: 84px;
}

/* .crud-classify-tree .el-popover.el-popper {
  padding: 0;
} */
.crud-classify-tree-operate-popover .right-operate-item {
  padding: 0 11px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 400;
  color: #171717;
  cursor: pointer;
}

.crud-classify-tree-operate-popover .right-operate-item:hover {
  background: #1773FA;
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

.crud-classify-tree .crud-classify-tree-wrap .el-tree-node.is-current > .el-tree-node__content .mock-info-badge {
  background-color: #1773fa !important;
}

.el-tree-node.is-current > .el-tree-node__content .left-label-txt,
.crud-classify-tree .crud-classify-tree-wrap .el-tree-node.is-current > .el-tree-node__content .custom-tree-node .right-operate-btn i {
  color: #1773fa !important;
}

.crud-classify-tree .crud-classify-tree-wrap .el-tree-node.is-current > .el-tree-node__content .el-tree-node__expand-icon {
  color: #1773fa;
}

.crud-classify-tree .crud-classify-tree-wrap .el-tree-node.is-current > .el-tree-node__content .el-tree-node__expand-icon.is-leaf:before {
  color: transparent;
}
</style>

<style lang="scss">
.crud-classify-tree {
    height: 100%;
    width: 100%;
    overflow: auto;
    .crud-classify-tree-wrap {
        // height: 380px;
        // overflow: auto;
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
                    box-sizing: border-box;
                    height: 20px;
                    min-width: 20px;
                    text-align: center;
                    line-height: 19px;
                    background-color: #909399;
                    border-radius: 10px;
                    color: #fff;
                    display: inline-block;
                    font-size: 12px;
                    // height: 18px;
                    // line-height: 18px;
                    padding: 0 6px;
                    padding-right: 7px;
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

