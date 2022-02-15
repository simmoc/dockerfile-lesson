<template>
    <page-main>
        <div class="title">
            <span>角色列表</span>
            <el-button type="primary" size="mini" @click="goTo('addRole')">+ 新建角色</el-button>
        </div>
        <CustomerTable
            :table-title="tableTitle"
            :table-data="tableData"
            :need-pagination="true"
        >
            <el-table-column
                label="操作"
                width="300px"
            >
                <template #default="scope">
                    <div>
                        <el-button type="text" @click="goTo('checkRole',{id:scope.row.id,name:scope.row.name,type:'checked'})">
                            查看权限
                        </el-button>
                        <div class="el-button el-button--text el-button--large" @click="getClick(scope.row.id,scope.row.member_count)">
                            <selectMember
                                ref="addMemberDialogRef"
                                :write-back-selected-member-org="writeBackSelectedMemberOrg"
                                :params="{'touch_object': 'ALL_MEMBER'}"
                                @confirm="confirmChooseMember($event,scope.$index)"
                            >
                                <template #default>
                                    <span>关联成员</span>
                                </template>
                            </selectMember>
                        </div>

                        <el-button v-if="scope.row.name!=='超级管理员'" type="text" @click="goTo('editRole',{id:scope.row.id,name:scope.row.name,type:'edit'})">
                            编辑
                        </el-button>
                        <el-button v-if="scope.row.name!=='超级管理员'" type="text" @click="handleDeleteRole(scope.row.id)">
                            删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </CustomerTable>
        <customer-pagination
            v-model:page="page"
            v-model:limit="page_size"
            :total="total"
            :get-data="getData"
        />
        <!-- 删除知识 -->
        <CustomerDialog title="提示" :dialog-visible="dialogVisible" width="400px" :confirm-fn="deleteRole" @cancel="cancelDialog">
            <div class="group_name">是否删除该角色?</div>
        </CustomerDialog>
    </page-main>
</template>

<script setup>
import Http from '@/util/request'
import { ElMessage } from 'element-plus'
// import { goTo } from '@/composables/router'
import selectMember from '@/components/select-member/select-member.vue'
const addMemberDialogRef = ref(null)
const router = useRouter()
const tableTitle = ref([
    {
        label: '角色名称',
        prop: 'name'
    },
    {
        label: '关联成员数',
        prop: 'member_count'
    },
    {
        label: '最后修改时间',
        prop: 'update_time'
    }
])
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const page_size = ref(10)
const form = reactive({ })
const dialogVisible = ref(false)
const selectId = ref('')
let writeBackSelectedMemberOrg = ref([])
const isEdit = ref(false)
const goTo = (name, query) => {
    router.push({ name, query })
}
const getData = async() => {
    let { data } = await Http.systemRoles({ page: page.value, page_size: page_size.value })
    tableData.value = data.list
    total.value = data.count
}
const handleDeleteRole = id => {
    dialogVisible.value = true
    selectId.value = id

}
const deleteRole = async() => {
    let res = await Http.deleteRole({ id: selectId.value }, [], true)
    if (res.code === 0) {
        ElMessage.success(res.data)
        dialogVisible.value = false
        getData()
    }
    console.log(res)
}
const cancelDialog = () => {
    dialogVisible.value = false
}
const confirmChooseMember = (r, index) => {
    console.log(r)
    writeBackSelectedMemberOrg.value = r
    var member_id = []
    var department_id = []
    console.log(index)
    if (writeBackSelectedMemberOrg && Array.isArray(r)) {
        writeBackSelectedMemberOrg.value.map(ele => {
            if (ele.isOrg) {
                department_id.push(ele.id)
            } else {
                member_id.push(ele.id)
            }
        })
    }
    form.member_ids = member_id
    form.department_ids = department_id
    roleAllocate(form)
}
const getClick = (data, member_count) => {
    form.role_id = data
    isEdit.value = member_count > 0
    roleMember(form.role_id)
}
const roleMember = async role_id => {
    let res = await Http.roleMember({ role_id })
    if (res.code === 0) {
        writeBackSelectedMemberOrg.value = res.data
        console.log(writeBackSelectedMemberOrg)
    }
}
const roleAllocate = async form => {
    let res = await Http.editRoleMember(form)
    if (res.code === 0) {
        ElMessage.success(res.data)
        getData()
    }

}
getData()
</script>

<style scoped>
.title{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
    .select-member-btn{
        display: inline-block;
        position: relative;
    }
    .select-member{
        width: 100%;
        height: 100%;
        position: absolute;
        left:0;
        top:0;
        opacity: 0;
        z-index: 99;
    }
</style>
