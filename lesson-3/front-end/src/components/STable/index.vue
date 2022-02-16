<template>
    <div class="s-table">
        <ul class="table-tree table-head">
            <li v-for="(item) in props.tableTitle"
                :key="item.label"
                :style="item.width>0?'flex:0 0 '+item.width+'px':'flex:1'"
            >
                <span>{{ item.label }}</span>
            </li>
        </ul>
        <ul v-if="tableData&&tableData.length>0">
            <!--第一列-->
            <li v-for="(item) in tableData" :key="item.title"
                class="table-tree"
            >
                <div :style="tableTitle[0].width?'flex:0 0 '+tableTitle[0].width+'px':'flex:1'" style="display: flex;align-items: center;">
                    <el-checkbox v-if="item.type==='check'">{{ item.title }}</el-checkbox>
                    <span v-else>{{ item.title }}</span>
                </div>
                <ul v-if="tableData||tableData.length>0">
                    <!--第二列-->
                    <li v-for="(sub,index) in item.children" :key="sub+index"
                        class="table-tree"
                    >
                        <div :style="tableTitle[1].width?'flex:0 0 '+tableTitle[1].width+'px':'flex:1'">
                            <el-checkbox v-model="sub.checked" :disabled="disabled" @change="visiteChange(sub)">{{ sub.title }}</el-checkbox>
                            <i v-if="sub.describe" class="el-icon-question" />
                        </div>
                        <!--第三列-->
                        <div :style="{'flex':`0 0 ${clientWidth-tableTitle[0].width-tableTitle[1].width-tableTitle[3].width+'px'}`}">
                            <el-checkbox v-for="(leaf,leafIndex) in sub.children"
                                         :key="leafIndex"
                                         v-model="leaf.checked"
                                         :disabled="!sub.checked||disabled"
                                         @change="getLeafChecked(sub.children,sub)"
                            >
                                {{ leaf.title }}
                                <el-popover
                                    v-if="leaf.describe"
                                    placement="top-start"
                                    title=""
                                    width="200"
                                    trigger="hover"
                                    :content="leaf.describe"
                                >
                                    <template #reference>
                                        <i class="el-icon-question" />
                                    </template>
                                </el-popover>
                            </el-checkbox>
                        </div>
                        <!--第四列 全选-->
                        <div :style="{flex:`0 0 100px`}" @click.prevent>
                            <el-checkbox v-model="sub.checkAll" :disabled="disabled" @click="getChecked(sub)" />
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { defineExpose } from 'vue'
// const { expose } = useContext()
const clientWidth = ref(0)
const props = defineProps({
    checkedAllVal: {
        type: Object,
        default: () => {
        }
    },
    tableData: {
        type: Array,
        default: () => []
    },
    tableTitle: {
        type: Array,
        default: () => []
    },
    disabled: {
        type: Boolean,
        default: false
    }
})
onMounted(() => {
    setTimeout(() => {
        clientWidth.value = document.getElementsByClassName('s-table')[0].offsetWidth - 1
    }, 300)

})
const getLeafChecked = (nodes, node) => {
    // eslint-disable-next-line no-unused-vars
    let checkNum = 0
    nodes.forEach(item => {
        if (item.checked) checkNum++
    })
    if (checkNum === nodes.length) {
        node.leafChecked = true
    } else {
        node.leafChecked = false
    }
    visiteChange(node)
}

const visiteChange = node => {
    console.log('全选中')
    // 处理全选的选中逻辑
    if (node.children.length === 0) {
        node.checkAll = node.checked

    } else {
        if (!node.checked) {
            node.leafChecked = false
            node.children.forEach(item => {
                item.checked = false
            })
            node.checkAll = node.leafChecked
        } else {
            node.checkAll = node.leafChecked
        }
    }

}
defineExpose({
    getLeafChecked, visiteChange
})
const getChecked = nodes => {
    nodes.checkAll = !nodes.checkAll
    nodes.checked = nodes.checkAll
    nodes.leafChecked = nodes.checkAll
    nodes.children.forEach(item => {
        item.checked = nodes.checkAll
    })
}
</script>

<style scoped lang="scss">

    .w-25 {
        width: 25%;
    }

    .table-head {
        color:#262626;
        li {
            border-bottom: 1px solid #EBEEF5;
            border-right: 1px solid #EBEEF5;
            box-sizing: border-box;
            background-color: rgb(244, 244, 245);
            padding: 10px;
            font-weight: bold;

        }

        li:last-child {
            border-right: none
        }
    }

    li {
        div {
            box-sizing: border-box;
            border-bottom: 1px solid #EBEEF5;
            border-right: 1px solid #EBEEF5;
            padding: 10px;
        }
    }

    .table-tree {
        display: flex;
        width: 100%;
        color:#555;
        li {
            flex: 1;

            div {
                border-bottom: 1px solid #EBEEF5;
                border-right: 1px solid #EBEEF5;
            }

        }

    }

    .table-tree:last-child {
        div:last-child {
            border-right: none;
        }
    }

    .s-table {
        width: 100%;
        font-size: 14px;
        color: #909399;
        border: 1px solid #EBEEF5;
        border-bottom: none;
        margin-bottom: 20px;
        margin-top: 20px;

    }
    .el-icon-question{
        color:#555;
    }
</style>
