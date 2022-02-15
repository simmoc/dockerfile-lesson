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
                        v-model="startEndTimes"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        :default-time="defaultTime"
                        @change="onDateChange(startEndTimes, 'search_from_convert_time', 'search_to_convert_time')"
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
                <br>
                <el-form-item label="收货人姓名:">
                    <el-input 
                        v-model="express.search_contact_name"
                        placeholder="请输入收货人姓名"
                        class="width-class"
                    />
                </el-form-item>
                <el-form-item label="收货人手机号:">
                    <el-input 
                        v-model="express.search_contact_mobile"
                        placeholder="请输入收货人手机号"
                        class="width-class"
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
                <el-tab-pane label="待发货" name="wait_send">
                    <template #label>
                        <div class="tc flex flex-align-center">
                            <span class="page-tab">待发货</span>
                            <i class="ml4 order-circle">
                                <span class="order-num">{{ orderNum.wait_send }}</span>
                            </i>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="已发货" name="has_shipped">
                    <template #label>
                        <div class="tc flex flex-align-center">
                            <span class="page-tab">已发货</span>
                            <i class="ml4 order-circle">
                                <span class="order-num">{{ orderNum.has_shipped }}</span>
                            </i>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="已完成" name="has_completed">
                    <template #label>
                        <div class="tc flex flex-align-center">
                            <span class="page-tab">已完成</span>
                            <i class="ml4 order-circle">
                                <span class="order-num">{{ orderNum.has_completed }}</span>
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
                                <div class="overflow-ellipsis">{{ scope.row.order_no }}</div>
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
                                <div>{{ scope.row.goods_title }}</div>
                                <template #reference>
                                    <div class="ml8 lh24 show-line2">{{ scope.row.goods_title }}</div>
                                </template>
                            </el-popover>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column v-if="activeName !== 'wait_send'" prop="logistics_content" label="物流信息" min-width="240">
                    <template #default="scope">
                        <el-popover
                            :width="400"
                            trigger="click"
                        >
                            <template #reference>
                                <div>
                                    <div>{{ scope.row.logistics_content && scope.row.logistics_content[0].ftime }}</div>
                                    <div class="overflow-ellipsis">
                                        {{ scope.row.logistics_content && scope.row.logistics_content[0].context }}
                                    </div>
                                </div>
                            </template>
                            <div class="time-line-height">
                                <el-timeline>
                                    <el-timeline-item
                                        v-for="(item, index) in scope.row.logistics_content"
                                        :key="index"
                                    >
                                        {{ item.ftime }}
                                        <br>
                                        {{ item.context }}
                                    </el-timeline-item>
                                </el-timeline>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="contact_name" label="收货人姓名" min-width="102">
                    <template #default="scope">
                        <div>{{ scope.row.contact_name }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="contact_mobile" label="收货人手机号" min-width="116">
                    <template #default="scope">
                        <div>{{ scope.row.contact_mobile }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="goods_category_name" label="商品类目" min-width="90">
                    <template #default="scope">
                        <div>{{ scope.row.goods_category_name }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="total_score" label="兑换所需积分" min-width="116">
                    <template #default="scope">
                        <div>{{ scope.row.total_score }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="nickname" label="兑换人昵称" min-width="102">
                    <template #default="scope">
                        <div>{{ scope.row.nickname }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="兑换人手机号" min-width="116">
                    <template #default="scope">
                        <div>{{ scope.row.mobile }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="paid_time" label="兑换时间" min-width="167">
                    <template #default="scope">
                        <div>{{ scope.row.paid_time }}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    prop=""
                    fixed="right"
                    width="160"
                >
                    <template #default="{ row }">
                        <el-button
                            type="text"
                            size="mini"
                            @click="goToDetail(row.order_id)"
                        >
                            查看详情
                        </el-button>
                        <el-button
                            v-if="activeName == 'wait_send'"
                            type="text"
                            size="mini"
                            @click="openOrdeSend(row)"
                        >
                            发货
                        </el-button>
                        <el-button
                            v-if="activeName == 'has_shipped'"
                            type="text"
                            size="mini"
                            @click="OpenCompleteOrder(row.order_id)"
                        >
                            确认完成
                        </el-button>
                    </template>
                </el-table-column>
            </CustomerTable>
            <!-- 分页 -->
            <customer-pagination
                v-model:limit="expressParams.page_size"
                v-model:page="expressParams.page_num"
                :total="total"
                :get-data="() => getOrderData(activeName)"
            />
            <!--发货弹出框-->
            <orderDeliver
                v-model:dialog-visible="dialogvisible"
                :send-deliver-data="sendDeliverData"
                @updateDeliverStatus="updateDeliverStatus"
            />
            <!-- 确认完成 -->
            <CustomerDialog title="提示" :dialog-visible="completeDialogvisible" width="450px" :confirm-fn="getCompleteOrder" @cancel="cancelDialog">
                <div class="group_name">请确认客户是否已签收，确认完成后订单状态将更改为已完成</div>
            </CustomerDialog>
        </page-main>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Http from '@/util/request'
import orderDeliver from '@/components/orderDeliver/index.vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
// el-date-picker默认时间 '00:00:00', '23:59:59'
const defaultTime = ref([
    new Date(2000, 1, 1, 0, 0, 0),
    new Date(2000, 2, 1, 23, 59, 59)
])
// 搜索参数
const express = ref({})
// 商品名称数据存储
const treeChecked = ref({})
// 商品名称数据回显
// const selectList = ref([])
// 存储查询时间数组
const startEndTimes = ref([])
const expressParams = ref({
    page_num: 1,
    page_size: 10
})
// 条数
const total = ref(0)
// 订单数据
const tableData = ref([])
// tabs切换
const activeName = ref('wait_send')
// 快递订单统计数量
const orderNum = ref({})
// 发货弹出框
const dialogvisible = ref(false)
// 发货订单商品数据
const sendDeliverData = ref({})
// 确认完成弹窗判断
const completeDialogvisible = ref(false)
// 存储当前订单商品id
const orderId = ref(null)
// 存储商品类目
const searchCategory = ref([])
// 重置时，商品名称checed关闭
const shopNameClose = ref(false)

// 切换Tab函数
const switchTab = e => {
    console.log('切换tab页', e)
    expressParams.value.page_num = 1 
    getOrderData(e)
}
// 获取快递订单统计
const getOrderNum = async status => {
    let { data } = await Http.getOrderNum(express.value)
    orderNum.value = data
    if (JSON.stringify(express.value) != '{}') {
        for (let i in orderNum.value) {
            // console.log('orderNum', orderNum.value[i])
            // console.log('status', orderNum.value[status])
            if (orderNum.value[status] != '0') {
                getOrderData(status)
                return
            } else {
                if (orderNum.value[i] != '0') {
                    if (orderNum.value['wait_send'] != '0') {
                        activeName.value = 'wait_send'
                        getOrderData('wait_send')
                        return
                    } else if (orderNum.value['has_shipped'] != '0') {
                        activeName.value = 'has_shipped'
                        getOrderData('has_shipped')
                        return
                    } else {
                        activeName.value = 'has_completed'
                        getOrderData('has_completed')
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
const getOrderData = async e => {
    let { data } = await Http.getOrderData({
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
        search_goods_id: express.value.search_goods_id
    })
    // console.log('11111', data)
    tableData.value = data.list
    total.value = data.total_num
}
// 重置
const onReset = () => {
    // treeChecked.value = []
    // selectList.value = []
    startEndTimes.value = []
    express.value = {}
    shopNameClose.value = !shopNameClose.value
    expressParams.value.page_num = 1
    expressParams.value.page_size = 10
    activeName.value = 'wait_send'
    getOrderNum()
    getOrderData('wait_send')
}
// 查询
const onSearch = () => {
    if (JSON.stringify(treeChecked.value) != '{}') {
        // console.log('treeChecked.value', treeChecked.value)
        express.value.search_goods_id = treeChecked.value.checkGoods.goods_id
    }
    getOrderNum(activeName.value)
}
// 打开订单发货
const openOrdeSend = data => {
    sendDeliverData.value = data
    dialogvisible.value = true
    // console.log('11111', sendDeliverData.value)
}
// 取消‘确认完成’弹出框
const cancelDialog = () => {
    completeDialogvisible.value = false
}
// 确认完成打开弹窗
const OpenCompleteOrder = id => {
    // console.log('11111', id)
    orderId.value = id
    completeDialogvisible.value = true

}
// 确认完成
const getCompleteOrder = async() => {
    let res = await Http.getCompleteOrder({
        order_id: orderId.value
    })
    // console.log('2222222', res)
    if (res.code === 200) {
        ElMessage.success({
            message: '已将订单状态更改为已完成!'
        })
        completeDialogvisible.value = false
        activeName.value = 'wait_send'
        getOrderNum()
        getOrderData('wait_send')
    }
}
// 前往当前订单商品详情
const goToDetail = id => {
    router.push({
        name: 'expressOrderDetail',
        query: {
            id 
        }
    })
}
// 发货后获取到状态，重新请求数据接口
const updateDeliverStatus = status => {
    if (status) {
        activeName.value = 'wait_send'
        getOrderNum()
        getOrderData('wait_send')
    }
}
// 获取商品类目列表
const getGoodsTypes = async() => {
    let { data } = await Http.getGoodsTypes()
    searchCategory.value = data
    // console.log('11111', searchCategory.value)
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
    getOrderNum()
    getOrderData('wait_send')
    getGoodsTypes()
})
</script>

<style scoped lang="scss">
// 搜索条件头间距限制
.search-width {
    margin-left: -20px;
}
// 搜索条件宽度
.width-class {
    width:274px
}
// customerTable
.order-table {
    padding-top: 1px;
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
    border-radius: 10px;
    .order-num {
        display: inline-block;
        // width: 8px;
        // height: 18px;
        font-size: 12px;
        font-weight: 400;
        color: #ffffff;
        // line-height: 18px;
    }
}
// timeLineHeight
.time-line-height {
    height: 235px;
}
.page-tab {
    display: inline-block;
    font-size: 16px;
    font-weight: 700;
    // color: #1773fa;
    line-height: 20px;
}
</style>