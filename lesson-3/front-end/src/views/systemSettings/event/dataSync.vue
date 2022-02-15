<template>
    <div>
        <page-main class="flex flex-direction-column">
            <div class="dataSync-content">
                <div>
                    <p class="fs14 mb4 c3 fwb">
                        同步组织架构
                    </p>
                    <p class="fs12">
                        最近一次同步时间 {{ departmentTime }}
                    </p>
                </div>
                <div class="sync-btn" :class="{'department-disabled':departmentStatus}" @click="sync('syncDepartment','department')">
                    <i class="icon el-icon-refresh" :class="{'department-loading':departmentStatus}" /> <span class="fs14 vtm">同步企业微信</span>
                </div>
            </div>
            <div class="dataSync-content">
                <div>
                    <p class="fs14 mb4 c3 fwb">
                        同步客户
                    </p>
                    <p class="fs12">
                        最近一次同步时间 {{ customerTime||'无' }}
                    </p>
                </div>
                <div class="sync-btn" :class="{'customer-disabled':customerStatus}" @click="sync('syncCustomer','customer')">
                    <i class="icon el-icon-refresh" :class="{'customer-loading':customerStatus}" /> <span class="fs14 vtm">同步企业微信</span>
                </div>
            </div>
            <div class="dataSync-content">
                <div>
                    <p class="fs14 mb4 c3 fwb">
                        同步群数据
                    </p>
                    <p class="fs12">
                        最近一次同步时间 {{ groupTime||'无' }}
                    </p>
                </div>
                <div class="sync-btn" :class="{'group-disabled':groupStatus}" @click="sync('syncGroup','group')">
                    <i class="icon el-icon-refresh" :class="{'group-loading':groupStatus}" /> <span class="fs14 vtm">同步企业微信</span>
                </div>
            </div>
        </page-main>
    </div>
</template>

<script setup>
import Http from '@/util/request'
// import { ElMessage } from 'element-plus'
import { onMounted, onBeforeUnmount } from 'vue'
const departmentTime = ref('')
const customerTime = ref('')
const groupTime = ref('')
var timer = null
// const timer = reactive(null)
const sync = async(url, type) => {
    await Http[url]()
        .finally(() => {
            if (timer) {
                clearInterval(timer)
            }
            console.log(type)
            timer = setInterval(() => {
                getUpdateTime('department')
                getUpdateTime('customer')
                getUpdateTime('group')
            }, 1000)
        
            console.log(timer)
        })
    
}
onMounted(() => {
    if (timer) {
        clearInterval(timer)
    } else {
        timer = setInterval(() => {
            getUpdateTime('department')
            getUpdateTime('customer')
            getUpdateTime('group')
        }, 1000)
    }
})
onBeforeUnmount(() => {
    clearInterval(timer)
})
const groupStatus = ref(true)
const departmentStatus = ref(true)
const customerStatus = ref(true)
const getUpdateTime = async type => {
   
    if (!departmentStatus.value && !customerStatus.value && !groupStatus.value) {
        clearInterval(timer)
    }

    let { data } = await Http.getSyncTime({ type })
    switch (type) {
        case 'department': departmentTime.value = data.time;departmentStatus.value = data.status;break
        case 'customer': customerTime.value = data.time;customerStatus.value = data.status;break
        case 'group': groupTime.value = data.time;groupStatus.value = data.status;break
    }
}
getUpdateTime('department')
getUpdateTime('customer')
getUpdateTime('group')

</script>

<style scoped lang="scss">
    .dataSync-content{
        width:520px;
        display: flex;
        justify-content: space-between;
        border:1px solid $customer-border-color;
        padding: 14px 12px;
        margin-bottom: 8px;
        height: 60px;
        align-items: center;
    }
    .icon{
        font-size: 19px;
        vertical-align: middle;
    }
    .sync-btn{
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
        &.department-disabled,&.customer-disabled,&.group-disabled{
            cursor: not-allowed;
            color:$customer-border-color;
            border-color:$customer-border-color;
            &:hover{
                background-color: #fff;
            }
        }
    }
    .loading{
        animation: rotating 2s linear infinite;
    }
    .group-loading{
        animation: rotating 2s linear infinite;
    }
    .customer-loading{
        animation: rotating 2s linear infinite;
    }
    .department-loading{
        animation: rotating 2s linear infinite;
    }
</style>
