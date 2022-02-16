<template>
    <div>
        <div class="search-form">
            <div class="search-form-margin">
                <el-form :inline="true" :model="form" label-position="right" label-width="120px" size="small">
                    <el-form-item label="成员姓名：" @keyup.enter="onSearch">
                        <el-input v-model="form.qw_name" placeholder="请输入成员姓名" style="width:274px;" />
                    </el-form-item>
                    <el-form-item label="成员邮箱：" @keyup.enter="onSearch">
                        <el-input v-model="form.qw_email" placeholder="请输入成员邮箱" style="width:274px;" />
                    </el-form-item>
                    <el-form-item label="成员手机号：" @keyup.enter="onSearch">
                        <el-input v-model="form.qw_phone" placeholder="请输入成员手机号" style="width:274px;" />
                    </el-form-item>
                    <el-form-item label="角色：">
                        <el-select v-model="form.role_id" placeholder="请选择" style="width:274px;" @change="onSearch">
                            <el-option label="全部" value="" />
                            <el-option v-for="item in checkAllList" :key="item.id"
                                       :label="item.label" :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-select v-model="form.qw_status" placeholder="请选择" style="width:274px;" @change="onSearch">
                            <el-option label="全部" value="" />
                            <el-option label="已激活" value="1" />
                            <el-option label="已禁用" value="2" />
                            <el-option label="未激活" value="4" />
                            <el-option label="退出企业" value="5" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="加入企业时间：">
                        <el-date-picker
                            v-model="form.time"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            value-format="YYYY-MM-DD"
                            prefix-icon="el-icon-time"
                            @change="onSearch"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="default" @click="onReset">重置</el-button>
                        <el-button type="primary" @click="onSearch">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <page-main class="flex flex-direction-column">
            <div class="flex">
                <div class="table-search-box">
                    <el-input v-model="qw_department_name" prefix-icon="el-icon-search" placeholder="请输入部门名称" size="small" class="table-search-input" @input="search($event)" />
                    <el-tree ref="elTree"
                             :data="departments"
                             :props="defaultProps"
                             :render-content="searchVisible?renderContent:null"
                             :default-expand-all="true"
                             class="organization-tree"
                             :expand-on-click-node="false"
                             node-key="id"
                             @node-click="handleNodeClick"
                    />
                </div>
                <div class="flex-1">
                    <div class="table-top-area">
                        <div>
                            <div class="sync-btn" :class="{'sync-disabled':status}" @click="sync('syncDepartment','department')">
                                <i class="icon el-icon-refresh" :class="{'is-loading':status}" /> <span class="fs14 vtm">同步企业微信</span>
                            </div>
                            <span class="table-top-tip">最近一次同步时间 {{ update_time }}</span>
                        </div>
                    </div>
                    <CustomerTable
                        :table-title="tableTitle"
                        :table-data="tableData"
                        :need-pagination="true"
                        class="customer-tree"
                        :class="{'is-collapse': $store.state.settings.mode === 'pc' && $store.state.settings.sidebarCollapse}"
                    >
                        <template #roles="scope">
                            <el-popover
                                v-if="scope.data.roles&&scope.data.roles.length>10"
                                placement="bottom"
                                trigger="hover"
                                popper-class="key-word-pop"
                                height="325"
                                width="542"
                            >
                                <div class="">
                                    {{ scope.data.roles }}
                                </div>
                                <template #reference>
                                    <div>
                                        <span class="mr8"> {{ scope.data.roles&&scope.data.roles.substring(0, 10) }}</span>
                                        <span>...</span>
                                    </div>
                                </template>
                            </el-popover>
                            <div v-if="scope.data.roles&&scope.data.roles.length<=10">
                                {{ scope.data.roles }}
                            </div>
                            <div v-else>-</div>
                        </template>
                        <template #qw_name="scope">
                            <div class="flex flex-align-center">
                                <img :src="scope.data.qw_thumb_avatar" alt="" class="member-avatar">
                                <span>{{ scope.data.qw_name }}</span>
                            </div>
                        </template>
                        <el-table-column
                            label="操作"
                            width="150px"
                            fixed="right"
                        >
                            <template #default="scope">
                                <div>
                                    <el-popover
                                        popper-class="crud-classify-tree-operate-popover oranization-popover"
                                        placement="top-start"
                                        :width="300"
                                        trigger="click"
                                        @show="showPopover(scope.row)"
                                    >
                                        <div>
                                            <div class="pt24 pl24 pr24 pb16">
                                                <el-input v-model="role.name"
                                                          placeholder="请输入名称"
                                                          size="small"
                                                          prefix-icon="el-icon-search"
                                                          @input="searchRole($event)"
                                                />
                                            </div>

                                            <div class="distribution-role-list" @scroll="getMoreData($event)">
                                                <div v-for="(item,index) in checkList"
                                                     :key="index"
                                                     :class="{'pop-checked':item.checked}"
                                                     @click="checkRole(item,scope.row.qw_userid)"
                                                >
                                                    <span class="is-checked">{{ item.label }}</span>
                                                    <i v-if="item.checked" class="el-icon-check" />
                                                </div>
                                            </div>
                                        </div>

                                        <template #reference>
                                            <el-button type="text">
                                                分配角色
                                            </el-button>
                                        </template>
                                    </el-popover>
                                </div>
                            </template>
                        </el-table-column>
                    </CustomerTable>
                    <customer-pagination
                        v-model:page="form.page"
                        v-model:limit="form.page_size"
                        :total="total"
                        :get-data="getSystemMembers"
                    />
                </div>
            </div>
            <customer-dialog
                ref="dialog"
                v-model:dialogVisible="dialogVisible"
                :confirm="confirm"
                @cancel="cancel"
            />
        </page-main>
    </div>
</template>

<script setup>
import Http from '@/util/request'
import { bounce } from '@/util/index'
import { ElMessage } from 'element-plus'
import { onMounted, onBeforeUnmount, getCurrentInstance, nextTick } from 'vue'
const { proxy } = getCurrentInstance()
const dialogVisible = ref(false)
const searchVisible = ref(false)
const form = ref({
    role_id: '',
    qw_name: '',
    qw_email: '',
    qw_phone: '',
    qw_status: '',
    qw_department_id: '',
    time: [],
    page: 1,
    page_size: 10
})
const role = ref({
    name: '',
    page: 1,
    page_size: 10
})
const tableTitle = ref([
    {
        label: '成员姓名',
        prop: 'qw_name',
        width: 100,
        type: 'slot'
    },
    {
        label: '成员邮箱',
        prop: 'qw_email',
        width: 170
    },
    {
        label: '手机号',
        prop: 'qw_phone',
        width: 100
    },
    {
        label: '部门',
        prop: 'department',
        width: 220
    },
    {
        label: '角色',
        prop: 'roles',
        width: 200,
        type: 'slot'
    },
    {
        label: '状态',
        prop: 'status',
        width: 80
    },
    {
        label: '加入企业时间',
        prop: 'create_time',
        width: 150
    }
])
const tableData = ref([])
const departments = ref([])
const qw_department_name = ref('')
const defaultProps = ref({
    children: 'children',
    label: 'qw_department_name'
})
const total = ref(0)
const checkList = ref([])
const checkAllList = ref([])
const update_time = ref('')
const roleCount = ref(0)
let timer = ref(null)
const memberRole = ref('')
onMounted(() => {
    getSyncTime()
    if (timer.value) {
        clearInterval(timer.value)
    } else {
        timer.value = setInterval(() => {
            getSyncTime()
        }, 1000)
    }

})
onBeforeUnmount(() => {
    if (timer.value) {
        clearInterval(timer.value)
    }
})
const renderContent = (h, { node, data }) => {
    return h(
        'span',
        {
            class: 'custom-tree-node'
        },
        h('span', null, node.label),
        h(
            'span',
            null,
            searchVisible.value || qw_department_name.value
                ? h(
                    'span',
                    {
                        class: 'custom-tree-node-num'
                    },
                    data.member_count
                )
                : null
        )
    )
}
const onReset = () => {
    form.value = {
        role_id: '',
        qw_name: '',
        qw_email: '',
        qw_phone: '',
        qw_status: '',
        qw_department_id: '',
        time: [],
        page: 1,
        page_size: 10
    }
    qw_department_name.value = ''
    memberRole.value = ''
    onSearch()

}
const status = ref(true)
const onSearch = () => {

    getSystemMembers()
    getSystemDepartments()
}
const handleNodeClick = data => {
    console.log(data)
    form.value.qw_department_id = data.qw_department_id
    getSystemMembers()
}
const cancel = () => {
    dialogVisible.value = false
}
const confirm = () => {
}
const getData = () => {
    let { page, page_size, qw_name, qw_email, qw_phone, qw_status, time, qw_department_id, role_id } = form.value
    let start_time = time && time.length > 0 ? time[0] : '',
        letend_time = time && time.length > 0 ? time[1] : ''
    searchVisible.value = qw_name || qw_email || qw_phone || qw_status || (time && time.length > 0) || role_id
    return {
        page, page_size, qw_name, qw_email, qw_phone, qw_status,
        start_time,
        letend_time,
        qw_department_id,
        role_id
    }
}
const getSystemMembers = async() => {
    let formData = getData()
    let { data } = await Http.systemMembers(formData)
    tableData.value = data.list
    total.value = data.count
}
const getSystemDepartments = async() => {
    let formData = getData()
    let { data } = await Http.systemDepartments({
        qw_department_name: qw_department_name.value,
        ...formData
    })
    departments.value = data
    nextTick(() => {
        console.log(proxy.$refs.elTree)
        if (departments.value[0]) proxy.$refs.elTree.setCurrentKey(departments.value[0].id)
    })

}
const search = bounce(() =>  getSystemDepartments())
const systemAllRoles = async() => {
    let { data } = await Http.systemRoles({
        page: 1,
        page_size: 200
    })
    data.list.forEach(item => {
        checkAllList.value.push({
            label: item.name,
            id: item.id,
            checked: false
        })
    })
}
systemAllRoles()
const systemRoles = async memberRoles => {
    let { data } = await Http.systemRoles({
        page: role.value.page,
        page_size: role.value.page_size,
        name: role.value.name
    })
    roleCount.value = data.count
    if (role.value.page === 1)checkList.value = []
    data.list.forEach(item => {
        checkList.value.push({
            label: item.name,
            id: item.id,
            checked: false
        })
    })
    if (memberRoles) {
        let roles = memberRoles && memberRoles.split(',')
        roles && roles.forEach(item => {
            checkList.value.forEach(node => {
                if (item === node.label) {
                    node.checked = true
                }
            })
        })
    }

}
const searchRole = bounce(() =>  {
    role.value.page = 1
    checkList.value = []
    return systemRoles()
})
const getMoreData = e => {
    let scrollHeight = e.target.scrollHeight
    let scrollTop = e.target.scrollTop
    if (checkList.value.length === roleCount.value) return
    console.log(scrollTop)
    if (scrollHeight >= scrollTop + 150) {
        role.value.page++
        systemRoles(memberRole.value)
    }
}
const checkRole = (item, member_id) => {
    // item.checked = !item.checked
    let form = {
        member_ids: [member_id],
        role_id: item.id
    }
    if (item.checked) {
        roleDrop(form).then(() => {
            item.checked = !item.checked
        })
    } else {
        roleAllocate(form).then(() => {
            item.checked = !item.checked
        })
    }
}
const roleAllocate = async form => {
    return new Promise(resolve => {
        Http.roleAllocate(form).then(res => {
            if (res.code === 0) {
                ElMessage.success(res.data)
                getSystemMembers()
                resolve()
            }

        })

    })

}
const roleDrop = async form => {
    return new Promise(resolve => {
        Http.roleDrop(form).then(res => {
            if (res.code === 0) {
                ElMessage.success(res.data)
                getSystemMembers()
                resolve()
            }

        })

    })
}
const getSyncTime = async() => {
    if (!status.value) {
        clearInterval(timer.value)
    }
    let { data } = await Http.getSyncTime({ type: 'department' })
    update_time.value = data.time
    status.value = data.status
}
const sync = async url => {
    let res = await Http[url]().finally(() => {
    })
    if (res.code === 0) {
        ElMessage.success(res.data)
        timer.value = setInterval(() => {
            getSyncTime()
        }, 1000)
    }

}
const showPopover = data => {
    role.value.name = ''
    role.value.page = 1
    memberRole.value = data.roles
    systemRoles(data.roles)
}

getSystemMembers()
getSystemDepartments()
</script>

<style scoped lang="scss">
    .search-form {
        padding: 24px;
        background-color: #fff;
        margin: 16px 24px 24px 24px;
    }

    .table-search-box {
        width: 296px;
        flex-grow: 0;
        flex-shrink: 0;
        border-right: 1px solid #edeef2;
        padding-right: 16px;
        margin-right: 16px;
        height: inherit;
    }

    .table-search-input {
        margin-bottom: 24px;
    }

    .table-top-tip {
        color: #8c8c8c;
        font-size: 12px;
        margin-left: 8px;
        line-height: 32px;
    }

    .distribution-role-list {
        max-height:150px;
        overflow-y: auto;
        & > div {
            font-size: 12px;
            cursor: pointer;
            padding: 6px 24px;
            margin-bottom: 2px;
            &.pop-checked{
                background-color: #f5f7fa;
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
        &.sync-disabled{
            cursor: not-allowed;
            color:$customer-border-color;
            border-color:$customer-border-color;
            &:hover{
                background-color: #fff;
            }
        }
    }
    .is-loading{
        animation: rotating 2s linear infinite;
    }
    .member-avatar{
        width: 32px;
        height: 32px;
        border-radius: 4px;
        margin-right: 6px;
    }

</style>
