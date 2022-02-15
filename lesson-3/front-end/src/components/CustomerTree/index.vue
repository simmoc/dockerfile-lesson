<template>
    <div>
        <div v-if="treeData.length>0">
            <div v-for="(item, index) in treeData" :key="index">
                <CustomerTreeNode
                    ref="customerTreeNode"
                    :node="item"
                    :level="0"
                    :index="index"
                    class="custom-tree"
                    :class="{'color-orange':index===1}"
                    :cancel-checked="()=>cancelLeafChecked(false)"
                />
            </div>
        </div>
        <div v-else class="no-data">
            暂无数据
        </div>
    </div>
</template>

<script>
import CustomerTreeNode from './customerTreeNode.vue'
// todoList
// 需要缓存数据做筛选功能
export default {
    name: 'CustomerTree',
    components: { CustomerTreeNode },
    provide() {
        return {
            'RootTree': {
                handleTreeLeafClick: this.handleTreeLeafClick
            }
        }
    },
    props: {
        data: {
            type: Array,
            default: () => []
        },
        select: {
            type: Boolean,
            default: true
        }
    },
    emits: ['handle-tree-leaf-click', 'handle-tree-click'],
    data() {
        return {
            treeData: []
        }
    },
    watch: {
        data: {
            handler(val) {
                let arr = JSON.parse(JSON.stringify(val))
                if (arr.length > 0) {
                    this.initExpand(arr, 0)
                }
                this.treeData = arr
            },
            deep: true
        }
    },
    methods: {
        handleTreeLeafClick(data) {
            this.$emit('handle-tree-leaf-click', data)
        },
        initExpand(arr, level, i) {
            arr.forEach(item => {
                item.expand = false
                if (level === 0) {
                    // 初始化第一层是默认展开
                    item.expand = true
                }
                if (item.tag_value_arr && item.tag_value_arr.length > 0) {
                    this.initExpand(item.tag_value_arr, level + 1, i)
                } else {
                    item.expand = false
                }
            })
        },
        /**
         * 循环节点
         *
         * @param arr 循环的节点
         * @param fn 执行函数
         * @param parent 当前节点的父节点
         */
        recursiveNode(arr, fn, parent) {
            arr.forEach(item => {
                if (item.tag_value_arr && item.tag_value_arr.length > 0) {
                    this.recursiveNode(item.tag_value_arr, fn, item)
                } else {
                    fn(item, parent)
                }
            })
        },

        /**
         * 取消节点选中
         *
         * @param expand 选中状态
         */
        cancelLeafChecked(expand) {
            this.recursiveNode(this.treeData, item => {
                item.expand = expand
            })
        },
        /**
         * 设置选中
         *
         * @param node 当前节点
         * @param expand 当前节点设置是否展开
        * */
        selectItem(node, expand) {
            this.$nextTick(() => {
                this.recursiveNode(this.treeData, (item, parent) => {
                    if (item.tag_id === node.tag_id) {
                        item.expand = expand
                        parent.expand = expand
                        this.handleTreeLeafClick({
                            ...node,
                            tag_group_name: parent.tag_group_name,
                            tag_type: parent.tag_type
                        })
                    }
                })
            })
        }
    }
}
</script>

<style scoped lang="scss">
    .tree-list {
        padding-left: 24px;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.5;
        color: #606266;
        height: 0;
        overflow: hidden;
    }

    .el-icon-caret-right,
    .el-icon-caret-bottom {
        color: #606266;
        padding-right: 10px;
        cursor: pointer;
    }
    .custom-tree{
        border-top: 2px solid $customer-primary-color;
    }
    .custom-tree.color-orange {
        border-top: 2px solid $customer-warming-color;
    }
    .no-data{
        height:400px;
        display: flex;
        align-items: center;
        justify-content: center;
        color:$customer-sub-color;
    }
</style>
