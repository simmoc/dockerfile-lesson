<template>
    <div class="customer-table">
        <el-table
            ref="customerTable"
            v-loading="loading" 
            :header-cell-style="{background:'#f4f4f5'}"
            size="small"
            tooltip-effect="dark"
            :data="tableData"
            :max-height="maxHeight"
            :height="height"
            style="width: 100%;margin-bottom: 16px;margin-top: 16px;"
            :summary-method="getSummaries"
            :show-summary="showSummary"
            :empty-text="emptyText"
            :row-key="getRowKeys"
            @selection-change="handleSelectionChange"
        >
            <el-table-column v-if="needIndex"
                             type="index"
                             :index="typeIndex"
                             width="50"
                             label="序号"
                             header-align="center" align="center"
            />
            <el-table-column
                v-if="needSelect"
                type="selection"
                width="55"
                :selectable="checkSelectable"
                :reserve-selection="reserveSelection"
            />
            <el-table-column
                v-for="(item,index) in tableTitle"
                :key="index"
                :prop="item.prop" :label="item.label"
                :header-align="headerAlign"
                :align="align"
                :fixed="item.fixed"
                :width="item.width"
                :min-width="item.minWidth"
            >
                <template v-if="item.cusHeader" #header="scope">
                    <slot :name="item.prop" :data="scope.row" />
                </template>
                <template #default="scope">
                    <!-- slot-->
                    <slot v-if="item.type==='slot'" :name="item.prop" :data="scope.row" :width="item.width" />
                    <!-- button-->
                    <div v-else-if="item.type==='button'">
                        <el-button type="text " @click="getClick(scope.row,item.prop)">
                            {{ scope.row[item.prop] }}
                        </el-button>
                    </div>

                    <div v-else-if="item.type === 'tooltip'">
                        <template v-if="scope.row[item.prop]">
                            <span v-if="getTextWidth(scope.row[item.prop]) < item.width - 20">
                                {{ scope.row[item.prop] }}
                            </span>
                            <el-tooltip v-else :content="scope.row[item.prop]" placement="bottom" effect="light">
                                <span class="overflow-ellipsis" style="display: inline-block; width: 100%;">{{ scope.row[item.prop] }}</span>
                            </el-tooltip>
                        </template>
                        <template v-else>
                            <div>--</div>
                        </template>
                    </div>

                    <!-- popover-->
                    <div v-else-if="item.type==='popover'">
                        <el-popover
                            placement="top-start"
                            title=""
                            width="300"
                            trigger="hover"
                        />
                    </div>
                    <!-- merge-->
                    <div v-else-if="item.type==='merge'">
                        {{ scope.row[item.prop] }}/{{ scope.row[item.mergeProp] }}
                    </div>
                    <div v-else-if="scope.row[item.prop]===''">-</div>
                    <div v-else>{{ scope.row[item.prop] }}</div>
                </template>
            </el-table-column>
            <slot />
        </el-table>
    </div>
</template>

<script setup>
import { getTextWidth } from '@/util'
const props = defineProps({
    /*
      * 表格头
      * */
    tableTitle: {
        type: Array,
        default: () => []
    },
    /*
    * 表格数据
    * */
    tableData: {
        type: Array,
        default: () => []
    },
    /*
    * 是否显示loading
    * */
    loading: {
        type: Boolean,
        default: false
    },
    /*
   * 是否需要用到select选项
   * */
    needSelect: {
        type: Boolean,
        default: false
    },
    /*
   * 是否需要用到序号
   * */
    needIndex: {
        type: Boolean,
        default: false
    },
    /*
   * 表格标题的水平方向
   * */
    headerAlign: {
        type: String,
        default: 'left'
    },
    /*
   * 表格数据的水平方向
   * */
    align: {
        type: String,
        default: 'left'
    },
    /*
   * 是否需要分页
   * */
    needPagination: {
        type: Boolean,
        default: true
    },
    // 是否显示表格合计行
    showSummary: {
        type: Boolean,
        default: false
    },
    // select禁用
    checkSelectable: {
        type: Function,
        default: null
    },
    getSummaries: {
        type: Function,
        default: null
    },
    maxHeight: {
        type: [String, Number],
        default: null
    },
    height: {
        type: [String, Number],
        default: null
    },
    // 内容为空的文本
    emptyText: {
        type: String,
        default: '暂无数据'
    },
    // 复选框回显保留数据
    reserveSelection: {
        type: Boolean,
        default: false
    },
    // 使用复选，考虑回显，传的key
    rowKey: {
        type: String,
        default: ''
    }
})
const customerTable = ref(null)
const selecteList = ref([])
defineExpose({ clearTableSelect, selecteList, handleToggleRowSelection })

const emit = defineEmits(['handleClick', 'handleSelect'])
function typeIndex(index) {
    return index + (props.page - 1) * parseInt(props.page_size) + 1
}
function getClick(data, prop) {
    emit('handleClick', { data, prop })
}
function handleSelectionChange(data) {
    selecteList.value = data
    emit('handleSelect', data)
}
// 切换当前列选中
function handleToggleRowSelection(row, select) {
    customerTable.value.toggleRowSelection(row, select)
}
function clearTableSelect() {
    customerTable.value.clearSelection()
}
function getRowKeys(row) {
    return row.id
}

</script>

<style scoped lang="scss">
    .customer-table {
        :deep(.el-table thead) {
            height: 54px;
        }
    }
    .el-table{
        color:$customer-text-color;
    }
</style>
