<template>
    <div>
        <el-table
            ref="customerTable"
            v-loading="loading" :header-cell-style="{background:'#f4f4f5'}"
            size="small"
            tooltip-effect="dark"
            :data="tableData"
            :height="height"
            style="width: 100%;margin-bottom: 24px;margin-top: 24px;"
            :summary-method="getSummaries"
            :show-summary="showSummary"
            :empty-text="emptyText"
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
            />
            <el-table-column
                v-for="(item,index) in tableTitle"
                :key="index"
                :prop="item.prop" :label="item.label"
                :header-align="headerAlign"
                :align="align"
                :width="item.width"
            >
                <template v-if="item.cusHeader" #header="scope">
                    <slot :name="item.prop" :data="scope.row" />
                </template>
                <template #default="scope">
                    <!-- slot-->
                    <slot v-if="item.type==='slot'" :name="item.prop" :data="scope.row" />
                    <!-- button-->
                    <div v-else-if="item.type==='button'">
                        <el-button type="text " @click="getClick(scope.row,item.prop)">
                            {{ scope.row[item.prop] }}
                        </el-button>
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
    // 内容为空的文本
    emptyText: {
        type: String,
        default: '暂无数据'
    },
    height: {
        type: String,
        default: null
    }
})
const customerTable = ref(null)
const selecteList = ref([])
defineExpose({ clearTableSelect, selecteList })

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
function clearTableSelect() {
    customerTable.value.clearSelection()
}

</script>

<style scoped lang="scss">
    .el-table{
        color:$customer-text-color;
    }
</style>
