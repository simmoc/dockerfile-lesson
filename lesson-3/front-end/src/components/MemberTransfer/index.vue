// 选择多个添加人
<template>
    <div>
        <div class="member-content" @click.self="handleOpenDialog">
            <div
                v-for="item in form.selectedList"
                :key="item.id"
                class="selected-member"
                @click="handleDelete(item)"
            >
                <span v-if="type === '素材'">{{ item.title }}</span>
                <span v-else>{{ item.name }}</span>
                <i class="el-tag__close el-icon-close" />
            </div>
        </div>
        <el-dialog
            v-model="form.dialogMemberVisible"
            width="70%"
            append-to-body
            :title="`选择${title}`"
        >
            <!-- 查询条件 -->
            <el-form v-model="form.formData" class="el-form-reset" inline size="small">
                <el-form-item
                    :label="`${props.title}`"
                    prop="keyword"
                    label-position="left"
                    label-width="70px"
                >
                    <el-input
                        v-if="type === '素材'"
                        v-model="form.formData.title[0]"
                        :placeholder="`请输入${props.title}`"
                        class="formdata-title"
                    />
                    <el-input
                        v-else
                        v-model="form.formData.keyword"
                        :placeholder="`请输入${props.title}`"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                </el-form-item>
            </el-form>
            <CustomerTable
                ref="selectMemberTable"
                :table-data="form.tableData"
                @handleSelect="selectionChange"
            >
                <el-table-column type="selection" width="55" />
                <el-table-column
                    v-if="type === '素材'"
                    :label="`${props.title}`"
                    prop="title"
                />
                <el-table-column
                    v-else
                    :label="`${props.title}`"
                    prop="name"
                />
            </CustomerTable>
            <!-- 分页 -->
            <customer-pagination
                v-model:limit="form.page_size"
                v-model:page="form.formData.page"
                :total="form.formData.totalDataNum"
                :get-data="getList"
            />
            <template #footer>
                <el-button @click="oncancle">取 消</el-button>
                <el-button type="primary" @click="handleConfirm">确 定</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import http from '@/util/request'
defineExpose({ clearSearch })
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    members: {
        type: Array
    }
})
const selectMemberTable = ref(null)
const emit = defineEmits(['selectedList', 'clearValidate'])
const form = reactive({
    dialogMemberVisible: false,
    formData: {
        title: [],
        keyword: '',
        page: 1,
        page_size: 10,
        totalDataNum: 0
    },
    tableData: [],
    selectedList: [],
    selectedList1: [],
    selectedIdList: []
})
function handleSearch() {
    form.formData.page = 1
    form.formData.page_size = 10
    getList()
}
function clearSearch() {
    form.selectedList = []
    form.selectedList1 = []
    form.selectedIdList = []
    // console.warn('selectMemberTable.value', selectMemberTable.value)
    if (selectMemberTable.value && selectMemberTable.value.selecteList[0]) {
        selectMemberTable.value.clearTableSelect()
    }
}
function getList() {
    const params = form.formData
    if (props.type === '素材') {
        http
            .getProposalTitleList(params)
            .then(res => {
                form.tableData = res.data.list || []
                form.formData.totalDataNum = res.data.count || 0
            })
            .catch(() => {})
    } else {
        http
            .getAddMember(params)
            .then(res => {
                form.tableData = res.data.list || []
                form.formData.totalDataNum = res.data.total_num || 0
            })
            .catch(() => {})
    }
}
// pageSize 改变时会触发
// function handleSizeChange(val) {
//     form.formData.page_size = val
//     refreshTableData()
// }
// 刷新表格数据，重置回第一页
// function refreshTableData() {
//     form.formData.page = 1
//     getList()
// }
// currentPage 改变时会触发
// function handleCurrentChange(val) {
//     form.formData.page = val
//     getList()
// }
function handleOpenDialog() {
    form.dialogMemberVisible = true
    emit('clearValidate')
}
function selectionChange(selection) {
    form.selectedList1 = selection
    form.selectedIdList = selection.map(row => row.id)
    emit('clearValidate')
}
function handleDelete(obj) {
    form.selectedList.forEach((item, index) => {
        if (item.id === obj.id) {
            form.selectedList.splice(index, 1)
            form.selectedIdList.splice(index, 1)
        }
    })
    // 获取的数据不会同步关联dialog里面的数据
    // if (!obj.isGetData) {
    //     this.$refs.memberTable.toggleRowSelection(obj)
    // }
    emit('selectedList', form.selectedIdList)
}
function handleConfirm() {
    form.dialogMemberVisible = false
    form.selectedList = form.selectedList1
    emit('selectedList', form.selectedIdList)
    emit('clearValidate')
}
function oncancle() {
    form.selectedIdList = []
    form.dialogMemberVisible = false
    emit('selectedList', [])
    emit('clearValidate')
}
// 初始化数据
function onInitial() {
    form.formData.title = []
    form.formData.keyword = ''
    handleSearch()
}
onInitial()
</script>
<style scoped lang="scss">
.member-content {
  min-height: 32px;
  width: 200px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  border-radius: 4px;
}
.selected-member {
  display: inline-block;
  background-color: #c1c3c6;
  color: #fff;
  border-radius: 3px;
  padding: 0 5px;
  margin: 3px;
  cursor: pointer;
}
.transfer-cont {
  display: flex;
  padding: 10px 0;
  border-top: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  .member-list {
    width: 50%;
    min-height: 200px;
    padding: 10px;
    border-right: 1px solid #dcdfe6;
    .search-cont {
      display: flex;
      input {
        border-radius: 4px 0 0 4px;
      }
      button {
        border-radius: 0 4px 4px 0;
      }
    }
  }
  .selected-list {
    padding: 10px;
    .selected-member {
      display: block;
    }
  }
  .select-member {
    display: block;
    background-color: #00c587;
    color: #fff;
    border-radius: 3px;
    padding: 0 5px;
    margin: 5px 0;
    cursor: pointer;
  }
}
</style>
