<template>
    <div class="mt16">
        <div class="detail-scroll">
            <div class="head-content">
                <div class="head-content-item">
                    订单编号：{{ orderDetailData.order_no || '—' }}
                </div>
                <div class="head-content-item">
                    兑换时间：{{ orderDetailData.paid_time || '—' }}
                </div>
                <div class="head-content-item">
                    商品类目：{{ orderDetailData.goods_category_name || '—' }}
                </div>
            </div>

            <el-row class="detail-header-class flex">
                <el-col :span="7">
                    <div v-if="orderDetailData.status == 'wait_send'" class="business-class">
                        <div class="business-title">等待商家发货</div>
                        <div class="business-content mt16">用户已确认兑换，请尽快发货。</div>
                        <el-button type="primary" size="small" class="mt40" @click="openOrdeSend()">发货</el-button>
                    </div>
                    <div v-if="orderDetailData.status == 'has_shipped'" class="business-class">
                        <div class="business-title">平台已发货，等待交易成功</div>
                        <div class="business-content mt16">用户收货后，交易将自动完成。</div>
                        <el-button type="primary" size="small" class="mt40" @click="OpenCompleteOrder()">确认完成</el-button>
                    </div>
                    <div v-if="orderDetailData.status == 'has_completed'" class="business-class">
                        <div class="business-title">交易完成</div>
                        <div class="business-content mt16">用户已收货，请查收。</div>
                    </div>
                </el-col>

                <el-col :span="7">
                    <div class="receiving-class pl16">
                        <div class="receiving-title">收货人信息</div>
                        <div class="receiving-content flex mt16">
                            收货人姓名：
                            <div class="receiving-content-text">{{ orderDetailData.contact_name || '—' }}</div>
                        </div>
                        <div class="receiving-content flex mt12">
                            收货人手机号：
                            <div class="receiving-content-text">{{ orderDetailData.contact_mobile || '—' }}</div>
                        </div>
                        <div class="receiving-content mt12 flex flex-align-start">
                            <div class="flex-g0 flex-s0">收货地址：</div>
                            <div class="receiving-content-text flex-g1 flex-s1">
                                {{ orderDetailData.province || '—' }}
                                {{ orderDetailData.city || '—' }}
                                {{ orderDetailData.area || '—' }}
                                {{ orderDetailData.address || '—' }}
                            </div>
                        </div>
                    </div>
                </el-col>
            
                <el-col :span="5">
                    <div class="exchange-class">
                        <div class="exchange-title">兑换信息</div>
                        <div class="exchange-content flex mt16">
                            兑换人昵称：
                            <div class="exchange-content-text">{{ orderDetailData.nickname || '—' }}</div>
                        </div>
                        <div class="exchange-content flex mt12">
                            兑换人手机号：
                            <div class="exchange-content-text">{{ orderDetailData.mobile || '—' }}</div>
                        </div>
                        <div class="exchange-content flex mt12">
                            兑换积分：
                            <div class="exchange-content-text">{{ orderDetailData.total_score || '—' }}</div>
                        </div>
                    </div>
                </el-col>

                <el-col :span="5">
                    <div v-if="orderDetailData.status != 'wait_send'" class="exchange-class">
                        <div class="exchange-title">配送信息</div>
                        <div class="exchange-content flex mt16">
                            配送方式：
                            <div class="exchange-content-text">快递</div>
                        </div>
                        <div class="exchange-content flex mt12">
                            发货时间：
                            <div class="exchange-content-text">{{ orderDetailData.ship_time || '—' }}</div>
                        </div>
                        <div class="exchange-content flex mt12">
                            运单号：
                            <div class="exchange-content-text">{{ orderDetailData.logistics_com_name || '—' }} {{ orderDetailData.logistics_no || '—' }}</div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <!-- </div> -->

            <div class="detail-middle-class">
                <CustomerTable
                    :table-data="[orderDetailData]"
                    class="order-table"
                >
                    <el-table-column prop="goods_title" label="商品名称">
                        <template #default="scope">
                            <div class="flex flex-align-center">
                                <img :src="scope.row.order_goods_img" class="img-class flex-g0 flex-s0">
                                <el-popover
                                    :width="200"
                                    trigger="hover"
                                >
                                    <template #reference>
                                        <div class="ml8 lh24 show-line2">{{ scope.row.goods_title }}</div>
                                    </template>
                                    <div>{{ scope.row.goods_title }}</div>
                                </el-popover>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="total_score" label="兑换所需积分">
                        <template #default="scope">
                            <div>{{ scope.row.total_score }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="num" label="数量">
                        <div>x1</div>
                    </el-table-column>
                    <el-table-column prop="status" label="发货状态">
                        <div>{{ orderStatus }}</div>
                    </el-table-column>
                </CustomerTable>
                <div class="paid-integral">
                    <span class="paid-integral-text">实付积分：</span>
                    <span class="paid-integral-num">{{ orderDetailData.total_score || '—' }} 积分</span>
                </div>
            </div>
            <div class="detail-footer-class flex flex-align-center">
                <div class="get-send-status flex flex-align-start">
                    <div class="send-status tc">
                        <i class="el-icon-success" />
                        <div class="mt8">待发货</div>
                        <div class="mt4 time-color">{{ orderDetailData.paid_time || '—' }}</div>
                    </div>
                    <div class="box-line" :class="orderDetailData.status != 'wait_send' ? 'box-line-blue' : ''" />
                    <div class="send-status tc">
                        <i v-if="orderDetailData.status != 'wait_send'" class="el-icon-success" />
                        <i v-else class="order-circle">
                            <span class="order-num">2</span>
                        </i>
                        <div class="mt8">平台发货</div>
                        <div v-if="orderDetailData.status != 'wait_send'" class="mt4 time-color">{{ orderDetailData.ship_time || '—' }}</div>
                    </div>
                    <div class="box-line" :class="orderDetailData.status == 'has_completed' ? 'box-line-blue' : ''" />
                    <div class="send-status tc">
                        <i v-if="orderDetailData.status == 'has_completed'" class="el-icon-success" />
                        <i v-else class="order-circle">
                            <span class="order-num">3</span>
                        </i>
                        <div class="mt8">交易完成</div>
                        <div v-if="orderDetailData.status == 'has_completed'" class="mt4 time-color">{{ orderDetailData.completed_time || '—' }}</div>
                    </div>
                </div>
                <div class="send-logistics mr24">
                    <div class="logistics-status">
                        <span v-if="orderDetailData.status == 'has_shipped' || orderDetailData.status == 'has_completed'" class="logistics-status-text">物流状态：</span>
                        <span v-if="orderDetailData.status == 'has_shipped'" class="logistics-status-content">运输中</span>
                        <span v-if="orderDetailData.status == 'has_completed'" class="logistics-status-content">已签收</span>
                    </div>
                    <div class="time-line-box mt12">
                        <el-timeline>
                            <el-timeline-item
                                v-for="(item, index) in orderDetailData.logistics_content"
                                :key="index"
                            >
                                {{ item.ftime }}
                                <br>
                                {{ item.context }}
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </div>
            </div>
            <!--发货弹出框-->
            <orderDeliver
                v-model:dialog-visible="dialogvisible"
                :send-deliver-data="orderDetailData"
                @updateDeliverStatus="updateDeliverStatus"
            />
            <!-- 确认完成 -->
            <CustomerDialog title="提示" :dialog-visible="completeDialogvisible" width="450px" :confirm-fn="getCompleteOrder" @cancel="cancelDialog">
                <div class="group_name">请确认客户是否已签收，确认完成后订单状态将更改为已完成</div>
            </CustomerDialog>
        </div>
    </div>
</template>

<script setup>
import Http from '@/util/request'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
// 订单商品详情数据
const orderDetailData = ref({})
// 订单商品状态
const orderStatus = ref('')
// 发货弹出框
const dialogvisible = ref(false)
// 确认完成弹窗判断
const completeDialogvisible = ref(false)

// 获取订单商品详情数据
const getOrderDetail = async id  => {
    let { data } = await Http.getOrderDetail({
        order_id: String(id)
    })
    orderDetailData.value = data
    // console.log('11111', orderDetailData.value)
}
// 获取订单商品状态
const getOderStatus = () => {
    if (orderDetailData.value.status === 'wait_send') {
        orderStatus.value = '待发货'
    } else if (orderDetailData.value.status === 'has_shipped') {
        orderStatus.value = '已发货'
    } else {
        orderStatus.value = '已完成'
    }
}
// 打开订单发货
const openOrdeSend = () => {
    dialogvisible.value = true
}
// 发货后获取到状态，重新请求数据接口
const updateDeliverStatus = async status => {
    if (status) {
        await getOrderDetail(route.query.id)
        getOderStatus()
    }
}
// 取消‘确认完成’弹出框
const cancelDialog = () => {
    completeDialogvisible.value = false
}
// 确认完成打开弹窗
const OpenCompleteOrder = () => {
    completeDialogvisible.value = true
}
// 确认完成
const getCompleteOrder = async() => {
    let res = await Http.getCompleteOrder({
        order_id: route.query.id
    })
    // console.log('2222222', res)
    if (res.code === 200) {
        ElMessage.success({
            message: '已将订单状态更改为已完成!'
        })
        completeDialogvisible.value = false
        await getOrderDetail(route.query.id)
        getOderStatus()
    }
}

onMounted(async() => {
    await getOrderDetail(route.query.id)
    getOderStatus()
})
</script>

<style scoped lang="scss">
/* 页面滚动条 */
.detail-scroll {
    min-height: calc(100vh - 130px) !important;
    height: calc(100vh - 130px) !important;
    overflow-y: auto;
}
.order-table {
    margin-top: -16px;
}
.img-class{ 
    width: 60px;
    height: 60px;
}
.time-color {
    font-size: 14px;
    font-weight: 400;
    color: #8c8c8c;
    line-height: 20px;
}
.paid-integral {
    display: flex;
    float: right;
    padding-top: 8px;
    .paid-integral-text {
        font-size: 14px;
        font-weight: 700;
        color: rgba(0,0,0,0.85);
        line-height: 20px;
    }
    .paid-integral-num {
        font-size: 16px;
        font-weight: 700;
        color: #ff3c34;
        line-height: 22px;
    }
}
// 顶部编辑人员信息
.head-content {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 24px;
    padding-right: 24px;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: flex-start;
    background: #EDEEF2;
    margin-left: 24px;
    margin-right: 24px;
    // margin-top: 16px;
    margin-bottom: -16px;
}
.head-content-item {
    margin-right: 32px;
}

.detail-header-class {
    position: relative;
    margin: 16px 24px;
    padding: 24px;
    background-color: #fff;
    min-height: 198px;
}
.detail-middle-class {
    position: relative;
    margin: 16px 24px;
    padding: 24px;
    background-color: #fff;
    min-height: 208px;
}
.detail-footer-class {
    position: relative;
    margin: 16px 24px;
    // padding-right: 24px;
    padding-bottom: 24px;
    background-color: #fff;
    min-height: 186px;
}

.business-class {
    // display: inline;
    min-width: 224px;
    .business-title {
        font-size: 20px;
        font-weight: 700;
        color: #262626;
        line-height: 28px;
    }
    .business-content {
        font-size: 16px;
        font-weight: 400;
        color: #555555;
        line-height: 22px;
    }
}

.receiving-class {
    // display: inline;
    max-width: 234px;
    // margin-left: 8vw;
    border-left: 2px solid rgba(0,0,0,0.06);
    .receiving-title {
        font-size: 16px;
        font-weight: 700;
        color: #171717;
        line-height: 22px;
    }
    .receiving-content {
        min-width: 240px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(0,0,0,0.85);
        line-height: 22px;
    }
    .receiving-content-text {
        min-width: 138px;
        // display: inline;
        flex-wrap: wrap;
        font-size: 14px;
        font-weight: 400;
        color: rgba(0,0,0,0.65);
        line-height: 22px;
    }
}

.exchange-class {
    // display: inline;
    // margin-left: 8vw;
    .exchange-title {
        font-size: 16px;
        font-weight: 700;
        color: #171717;
        line-height: 22px;
    }
    .exchange-content {
        min-width: 274px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(0,0,0,0.85);
        line-height: 22px;
        .exchange-content-text {
            // min-width: 176px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(0,0,0,0.65);
            line-height: 22px;
        }
    }
}

.get-send-status {
    width: 50%;
    margin-left: 24px;
    margin-top: 26px;
    .send-status {
        width: 130px;
        .order-circle {
            display: inline-block;
            width: 32px;
            height: 32px;
            line-height: 32px;
            background: #bfbfbf;
            border-radius: 4em;
            .order-num {
                width: 9px;
                height: 22px;
                font-size: 16px;
                font-weight: 400;
                color: #ffffff;
                line-height: 22px;
            }
        }
    }
    .box-line {
        // width: 9vw;
        width: 20%;
        margin-top: 15px;
        margin-right: -24px;
        margin-left: -24px;
        border-top: 2px solid #f0f0f0;
    }
    .box-line-blue {
        border-color: #1773fa;
    }
}

.send-logistics {
    width: 50%;
    padding-top: 24px;
    margin-left: 5%;
    .logistics-status {
        .logistics-status-text {
            font-size: 14px;
            font-weight: 400;
            color: rgba(0,0,0,0.85);
            line-height: 22px;
        }
        .logistics-status-content {
            font-size: 14px;
            font-weight: 400;
            color: #1773fa;
            line-height: 22px;
        }
    }
}

.time-line-box {
    width: 100%;
    height: 160px;
}
</style>