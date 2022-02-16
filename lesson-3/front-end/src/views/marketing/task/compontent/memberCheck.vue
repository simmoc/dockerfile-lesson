<template>
    <div>
        <div class="member-class">
            <el-table :data="checkData">
                <el-table-column label="成员列表">
                    <template #default="scope">
                        <span class="event-list-page">
                            <div class="icon-in-td">
                                <img 
                                    v-if="scope.row.qw_thumb_avatar"
                                    :src="scope.row.qw_thumb_avatar"
                                    :alt="scope.row.qw_thumb_avatar"
                                >
                            </div>
                            <span class="cl-blue">
                                {{ scope.row.member_name }}
                            </span>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template #default="scope">
                        <span class="event-list-page">
                            <span class="member-name">
                                {{ scope.row.parent_name }}
                            </span>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="member-pagination pt8">
                <el-pagination
                    size="small"
                    :current-page="form.page_num"
                    :page-size="form.page_size"
                    layout="total,sizes, prev, pager, next"
                    :total="total"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
    memberData: {
        type: Array
    }
})
const checkData = ref([])
const total = ref(0)
const form = ref({
    page_num: 1,
    page_size: 10
})
// 成员数据长度
function getData() {
    // if (props.memberData.length > 10) {
    total.value = props.memberData.length
    let start = (form.value.page_num - 1) * form.value.page_size
    let end = start + form.value.page_size - 1
    checkData.value = props.memberData.slice(start, end)
    // }
    // return total.value   
}
function handleCurrentChange(page) {
    form.value.page_num = page
    getData()
}
function handleSizeChange(page) {
    console.log(page)
    getData()
}
// 关闭弹窗
// function handleClose() {
//     window.opener = null
//     window.close()
// }
onMounted(() => {
    getData()
})
</script>

<style scoped lang="scss">
.member-class{
    width: 480px;
    background: #ffffff;
    border-radius: 2px;
    .member-title{
        width: 64px;
        height: 24px;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        color: rgba(0,0,0,0.85);
        margin-left: 24px;
    }
    .member-name{
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(0,0,0,0.45);
        line-height: 20px;
    }
    .event-list-page {
    .cl-blue {
      color: #1773FA;
      cursor: pointer;
  
      &:hover {
      }
    }
  
    .icon-in-td {
      width: 22px;
      height: 22px;
      text-align: center;
      display: inline-block;
      margin-right: 9px;
  
      img {
        width: 100%;
      }
    }
}
}
.member-pagination {
    text-align: right;
}
</style>