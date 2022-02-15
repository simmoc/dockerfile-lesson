<template>
    <div class="order-page">
        <div class="search-form">
            <el-form label-width="120px" :inline="true" size="small" class="clearfix">
                <el-form-item label="订单编号:">
                    <el-input 
                        v-model="express.search_order_no"
                        placeholder="请输入订单编号"
                        class="width-class"
                        @keyup.enter="onSearch"
                    />
                </el-form-item>
                <el-form-item label="商品名称:">
                    <OrderSelect
                        v-model="treeChecked" 
                        :shop-name-close="shopNameClose"
                        class="width-class"
                    />
                </el-form-item>
                <el-form-item label="兑换时间:">
                    <el-date-picker
                        v-model="convertTimes"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        :default-time="defaultTime"
                        @change="onDateChange(convertTimes, 'search_from_convert_time', 'search_to_convert_time')"
                    />
                </el-form-item>
                <el-form-item label="商品类目:">
                    <el-select 
                        v-model="express.search_goods_category_id"
                        placeholder="请输入商品类目"
                        class="width-class"
                    >
                        <el-option
                            v-for="item in searchCategory"
                            :key="item.goods_category_id"
                            :label="item.name"
                            :value="item.goods_category_id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="兑换人昵称:">
                    <el-input 
                        v-model="express.search_customer_nickname"
                        placeholder="请输入兑换人昵称"
                        class="width-class"
                    />
                </el-form-item>
                <el-form-item label="兑换人手机号:">
                    <el-input 
                        v-model="express.search_customer_mobile"
                        placeholder="请输入兑换人手机号"
                        class="width-class"
                    />
                </el-form-item>
                <el-form-item label="可用开始时间:">
                    <el-date-picker
                        v-model="fromBeginTimes"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        :default-time="defaultTime"
                        @change="onDateChange(fromBeginTimes, 'search_from_begin_to_use_time', 'search_to_begin_to_use_time')"
                    />
                </el-form-item>
                <el-form-item label="可用结束时间:">
                    <el-date-picker
                        v-model="fromEndTimes"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        :default-time="defaultTime"
                        @change="onDateChange(fromEndTimes, 'search_from_end_to_use_time', 'search_to_end_to_use_time')"
                    />
                </el-form-item>
                <el-form-item label="使用时间:">
                    <el-date-picker
                        v-model="verificationTimes"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        :default-time="defaultTime"
                        @change="onDateChange(verificationTimes, 'search_from_verification_time', 'search_to_verification_time')"
                    />
                </el-form-item>
                <el-form-item class="right mr0">
                    <el-button type="default" size="small" @click="onReset">重置</el-button>
                    <el-button type="primary" size="small" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <page-main>
            <el-tabs v-model="activeName" @tab-click="switchTab(activeName)">
                <el-tab-pane label="待使用" name="wait_use">
                    <template #label>
                        <div class="tc flex flex-align-center">
                            <span class="page-tab">待使用</span>
                            <i class="ml4 order-circle">
                                <span class="order-num">{{ orderNum.wait_use || '0' }}</span>
                            </i>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="已使用" name="used">
                    <template #label>
                        <div class="tc flex flex-align-center">
                            <span class="page-tab">已使用</span>
                            <i class="ml4 order-circle">
                                <span class="order-num">{{ orderNum.used || '0' }}</span>
                            </i>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="已失效" name="failure">
                    <template #label>
                        <div class="tc flex flex-align-center">
                            <span class="page-tab">已失效</span>
                            <i class="ml4 order-circle">
                                <span class="order-num">{{ orderNum.failure || '0' }}</span>
                            </i>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
            <CustomerTable 
                :table-data="tableData"
                :need-pagination="true"
                class="order-table"
            >
                <el-table-column prop="order_no" label="订单编号" min-width="120">
                    <template #default="scope">
                        <el-popover
                            :width="200"
                            trigger="hover"
                        >
                            <template #reference>
                                <div class="overflow-ellipsis">{{ scope.row.order_no || '—' }}</div>
                            </template>
                            <div>{{ scope.row.order_no }}</div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="goods_title" label="商品名称" min-width="240">
                    <template #default="scope">
                        <div class="flex flex-align-center">
                            <img :src="scope.row.order_goods_img" class="img-class flex-g0 flex-s0">
                            <el-popover
                                :width="200"
                                trigger="hover"
                            >
                                <template #reference>
                                    <div class="ml8 lh24 show-line2">{{ scope.row.goods_title || '—' }}</div>
                                </template>
                                <div>{{ scope.row.goods_title }}</div>
                            </el-popover>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="goods_category_name" label="商品类目" min-width="90">
                    <template #default="scope">
                        <div>{{ scope.row.goods_category_name || '—' }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="total_score" label="兑换所需积分" min-width="116">
                    <template #default="scope">
                        <div>{{ scope.row.total_score || '—' }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="nickname" label="兑换人昵称" min-width="102">
                    <template #default="scope">
                        <div>{{ scope.row.nickname || '—' }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="兑换人手机号" min-width="116">
                    <template #default="scope">
                        <div>{{ scope.row.mobile || '—' }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="validity_start_time" label="核销时间" min-width="200">
                    <template #default="scope">
                        <div v-if="scope.row.validity_start_time">
                            {{ scope.row.validity_start_time }} 至
                            <br>
                            {{ scope.row.validity_end_time }}
                        </div>
                        <div v-else>{{ '—' }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="paid_time" label="兑换时间" min-width="160">
                    <template #default="scope">
                        <div>{{ scope.row.paid_time || '—' }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="verification_time" label="使用时间" min-width="160">
                    <template #default="scope">
                        <div v-if="activeName == 'used'">{{ scope.row.verification_time || '—' }}</div>
                        <div v-else>{{ '—' }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="validity_end_time" label="失效时间" min-width="160">
                    <template #default="scope">
                        <div v-if="activeName == 'failure'">{{ scope.row.validity_end_time || '—' }}</div>
                        <div v-else>{{ '—' }}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    prop=""
                    fixed="right"
                    width="120"
                >
                    <template #default="{ row }">
                        <el-button
                            type="text"
                            size="mini"
                            @click="goToDetail(row.order_id)"
                        >
                            查看详情
                        </el-button>
                    </template>
                </el-table-column>
            </CustomerTable>
            <!-- 分页 -->
            <customer-pagination
                v-model:limit="expressParams.page_size"
                v-model:page="expressParams.page_num"
                :total="total"
                :get-data="() => getOrderStorelist(activeName)"
            />
        </page-main>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Http from '@/util/request'
import { useRouter } from 'vue-router'

const router = useRouter()
// el-date-picker默认时间 '00:00:00', '23:59:59'
const defaultTime = ref([
    new Date(2000, 1, 1, 0, 0, 0),
    new Date(2000, 2, 1, 23, 59, 59)
])
// 搜索参数
const express = ref({})
// 存储查询兑换时间数组
const convertTimes = ref([])
// 存储查询可用开始时间数组
const fromBeginTimes = ref([])
// 存储查询可用结束时间数组
const fromEndTimes = ref([])
// 存储查询使用时间数组
const verificationTimes = ref([])
// 商品名称数据存储
const treeChecked = ref({})
// 商品名称数据回显
// const selectList = ref({
//     goods_class_id: 0,
//     name: '',
//     checkGoods: {}
// })
// 重置时，商品名称checed关闭
const shopNameClose = ref(false)

const expressParams = ref({
    page_num: 1,
    page_size: 10
})
// 条数
const total = ref(0)
// 订单数据
const tableData = ref([])
// tabs切换
const activeName = ref('wait_use')
// 快递订单统计数量
const orderNum = ref({})
// 存储商品类目
const searchCategory = ref([])

// 切换Tab函数
const switchTab = e => {
    expressParams.value.page_num = 1 
    getOrderStorelist(e)
}
// 获取快递订单统计
const getOrderStoretotal = async status => {
    let { data } = await Http.getOrderStoretotal(express.value)
    orderNum.value = data
    // console.log('11111', orderNum.value)
    if (JSON.stringify(express.value) != '{}') {
        for (let i in orderNum.value) {
            // console.log('11111', orderNum.value[i])
            if (orderNum.value[status] != '0') {
                getOrderStorelist(status)
                return
            } else {
                if (orderNum.value[i] != '0') {
                    if (orderNum.value['wait_use'] != '0') {
                        activeName.value = 'wait_use'
                        getOrderStorelist('wait_use')
                        return
                    } else if (orderNum.value['used'] != '0') {
                        activeName.value = 'used'
                        getOrderStorelist('used')
                        return
                    } else {
                        activeName.value = 'failure'
                        getOrderStorelist('failure')
                        return
                    }
                } else {
                    tableData.value = []
                    total.value = 0
                }
            }
        }
    }
}
// 获取快递订单列表
const getOrderStorelist = async e => {
    let { data } = await Http.getOrderStorelist({
        order_status: e,
        page_num: expressParams.value.page_num,
        page_size: expressParams.value.page_size,
        search_order_no: express.value.search_order_no,
        search_goods_name: express.value.search_goods_name,
        search_goods_category_id: express.value.search_goods_category_id,
        search_customer_nickname: express.value.search_customer_nickname,
        search_customer_mobile: express.value.search_customer_mobile,
        search_contact_name: express.value.search_contact_name,
        search_contact_mobile: express.value.search_contact_mobile,
        search_from_convert_time: express.value.search_from_convert_time,
        search_to_convert_time: express.value.search_to_convert_time,
        search_from_begin_to_use_time: express.value.search_from_begin_to_use_time,
        search_to_begin_to_use_time: express.value.search_to_begin_to_use_time,
        search_from_end_to_use_time: express.value.search_from_end_to_use_time,
        search_to_end_to_use_time: express.value.search_to_end_to_use_time,
        search_from_verification_time: express.value.search_from_verification_time,
        search_to_verification_time: express.value.search_to_verification_time,
        search_goods_id: express.value.search_goods_id
    })
    // console.log('11111', data)
    tableData.value = data.list
    total.value = data.total_num
}
// 重置
const onReset = () => {
    // selectList.value = {
    //     goods_class_id: 0,
    //     name: '',
    //     checkGoods: {}
    // }
    express.value = {}
    expressParams.value.page_num = 1
    expressParams.value.page_size = 10
    activeName.value = 'wait_use'
    convertTimes.value = []
    fromBeginTimes.value = []
    fromEndTimes.value = []
    verificationTimes.value = []
    shopNameClose.value = !shopNameClose.value
    getOrderStoretotal()
    getOrderStorelist('wait_use')
}
// 查询
const onSearch = () => {
    // console.log('treeChecked.value', treeChecked.value)
    if (JSON.stringify(treeChecked.value) != '{}') {
        // console.log('treeChecked.value.checkGoods', treeChecked.value.checkGoods)
        express.value.search_goods_id = treeChecked.value.checkGoods.goods_id
    }
    getOrderStoretotal(activeName.value)
}
// 前往当前订单商品详情
const goToDetail = id => {
    router.push({
        name: 'storeOrderDetail',
        query: {
            id 
        }
    })
}
// 获取商品类目列表
const getGoodsTypes = async() => {
    let { data } = await Http.getGoodsTypes()
    searchCategory.value = data
    console.log('11111', data)
}
// 时间查询
const onDateChange = (times, start, end) => {
    if (times && times[0]) {
        express.value[start] = times[0]
        express.value[end] = times[1]
        return
    }
    express.value[start] = ''
    express.value[end] = ''
}

onMounted(() => {
    getOrderStoretotal()
    getOrderStorelist('wait_use')
    getGoodsTypes()
})
</script>

<style scoped lang="scss">
// 搜索条件宽度
.width-class {
    width:274px
}
// customerTable
.order-table {
    padding-top: 0;
    // margin-top: -8px;
}
.img-class{ 
    width: 60px;
    height: 60px;
}
// tabs的订单数量
.order-circle {
    display: inline-block;
    // width: 20px;
    // height: 20px;
    padding: 0 7px;
    line-height: 20px;
    background: #f56c6c;
    border-radius: 4em;
    .order-num {
        display: inline-block;
        // width: 8px;
        // height: 18px;
        font-size: 12px;
        font-weight: 400;
        color: #ffffff;
        line-height: 18px;
    }
}
// timeLineHeight
.time-line-height {
    height: 235px;
}
.page-tab {
    font-size: 16px;
    font-weight: 700;
    // color: #1773fa;
    line-height: 20px;
}
</style>