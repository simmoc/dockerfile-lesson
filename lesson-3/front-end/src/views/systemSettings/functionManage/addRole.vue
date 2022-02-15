<template>
    <page-main>
        <div v-if="$route.query.type!=='checked'" class="title">
            <CustomerTitle :title="基本配置" />
        </div>
        <div v-if="$route.query.type==='checked'" class="title">
            <div class="fs16 c0 fwb">
                {{ $route.query.name }}
            </div>
        </div>
        <el-form v-if="$route.query.type!=='checked'"
                 ref="refForm"
                 :model="form"
                 label-width="120px"
                 label-position="top"
                 style="width:520px;"
                 :rules="formRules"
        >
            <el-form-item label="角色名称" prop="name">
                <el-input v-model="form.name" size="small" show-word-limit maxlength="20" />
            </el-form-item>
        </el-form>
        <div v-if="$route.query.type!=='checked'" class="title">
            <CustomerTitle title="权限配置" />
        </div>
        <STable
            ref="stable"
            :table-title="tableTitle2"
            :table-data="authorityOption"
            :show-check="false"
            :checked-all-val="checkedAllVal"
            :disabled="$route.query.type==='checked'"
            @checkAll="checkAll"
        />
        <div v-if="$route.query.type!=='checked'" class="mt20 tr">
            <el-button size="small" @click="router.go(-1)">取消</el-button>
            <el-button type="primary" size="small" @click="submit">确定</el-button>
        </div>
    </page-main>
</template>

<script setup>
import STable from '@/components/STable/index.vue'
import Http from '@/util/request'
import vxRule from '@/util/formValidate'
// import {goTo} from '@/composables/router'
import { ref, onMounted } from 'vue'
import CustomerTitle from '@/components/CustomerTitle/index.vue'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
const tableTitle2 = ref([
    {
        label: '模块',
        prop: 'title',
        width: '200'
    },
    {
        label: '访问权限',
        prop: 'title1',
        width: '300'
    },
    {
        label: '功能权限',
        prop: 'title'
    },
    {
        label: '全选',
        prop: 'checkAll',
        width: '100'
    }
])
const form = ref({})
const authorityOption = ref([])
const checkedAllVal = ref({
    menuKey: false,
    menuButtonKey: false
})
const stable = ref(null)
const router = useRouter()
const route = useRoute()
const formRules = ref({
    name: [vxRule(true, '', 'blur', '角色名称不可为空')]
})
const refForm = ref(null)
const submit = () => {
    refForm.value.validate(valid => {
        if (valid) {
            let getSelected = []
            authorityOption.value.forEach(item => {
                if (item.children.length > 0) {
                    item.children.forEach(child => {
                        if (child.checked) getSelected.push({
                            route: child.route,
                            access: child.access
                        })
                        if (child.children.length > 0) {
                            child.children.forEach(g => {
                                if (g.checked) getSelected.push({
                                    route: g.route,
                                    access: g.access
                                })
                            })
                        }
                    })
                }
            })
            if (route.query.id) {
                roleEdit(getSelected)
            } else {
                addRoles(getSelected)
            }

        }
    })
}
onMounted(() => {
    authority()
    if (route.query.id) {
        form.value.name = route.query.name
    }
})
const addRoles = async authority => {
    let res = await Http.addRoles({
        name: form.value.name,
        authority
    })
    if (res.code === 0) {
        ElMessage.success('添加成功！')
        setTimeout(() => {
            router.go(-1)
        }, 500)
    }
}
const roleEdit = async authority => {
    let res = await Http.roleEdit({
        id: route.query.id,
        name: form.value.name,
        authority
    })
    if (res.code === 0) {
        ElMessage.success('编辑成功！')
        setTimeout(() => {
            router.go(-1)
        }, 500)
    }
}
const authority = async() => {
    let { data } = await Http.authority()
    authorityOption.value = data
    authorityOption.value.forEach(item => {
        item.checked = false
        item.checkAll = false
        if (route.query.name === '超级管理员') {
            item.checked = true
            item.checkAll =  true
        }
        if (item.children.length > 0) {
            item.children.forEach(child => {
                child.checked = false
                child.checkAll = false
                if (route.query.name === '超级管理员') {
                    child.checked = true
                    child.checkAll =  true
                }
                if (child.children.length > 0) {
                    child.children.forEach(g => {
                        g.checked = false
                        if (route.query.name === '超级管理员') {
                            g.checked = true
                        }
                    })
                }
            })

        }
    })
    console.log('authorityOption', authorityOption)
    if (route.query.id) {
        authorityRole(route.query.id)

    }
    console.log(data)
}
const checkAll = () => {
}
const authorityRole = async id => {
    let { data } = await Http.authorityRole({ role_id: id })
    if (data.length > 0) {
        await nextTick()
        data.forEach(node => {
            authorityOption.value.forEach(item => {
                if (item.children.length > 0) {
                    item.children.forEach(child => {
                        if (child.route == node.route) {
                            child.checked = true
                            stable.value.visiteChange(child)
                        }
                        if (child.children.length > 0) {

                            child.children.forEach(g => {
                                if (g.route == node.route) {
                                    g.checked = true
                                    stable.value.getLeafChecked(child.children, child)
                                }
                            })

                        }
                    })
                }
            })
        })
        console.log(authorityOption.value)
    }
}

</script>

<style scoped>
    .title {
        display: flex;
        justify-content: space-between;
    }

    .mt20 {
        margin-top: 20px;
    }
</style>
