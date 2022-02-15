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
            <div class="detail-header-class flex">
                <div class="exchange-class">
                    <div class="exchange-title">兑换信息</div>
                    <div class="exchange-content mt16">
                        兑换人昵称：
                        <span class="exchange-content-text">{{ orderDetailData.nickname || '—' }}</span>
                    </div>
                    <div class="exchange-content mt12">
                        兑换人手机号：
                        <span class="exchange-content-text">{{ orderDetailData.mobile || '—' }}</span>
                    </div>
                    <div class="exchange-content mt12">
                        兑换积分：
                        <span class="exchange-content-text">{{ orderDetailData.total_score || '—' }}</span>
                    </div>
                    <div class="exchange-content mt12">
                        核销时间：
                        <span class="exchange-content-text">
                            {{ orderDetailData.validity_start_time || '—' }}
                            至
                            {{ orderDetailData.validity_end_time || '—' }}
                        </span>
                    </div>
                </div>
                <div v-if="orderDetailData.status == 'used'" class="exchange-class">
                    <div class="exchange-title">使用信息</div>
                    <div class="exchange-content mt16 flex flex-align-center">
                        <div>核销成员：</div>
                        <div class="flex flex-align-center event-list-page">
                            <div class="icon-in-td">
                                <img
                                    v-if="orderDetailData.qw_avatar"
                                    :src="orderDetailData.qw_avatar"
                                    :alt="orderDetailData.qw_avatar"
                                >
                            </div>
                            <el-popover
                                placement="right"
                                width="436"
                                trigger="click"
                                popper-class="member-info-pop"
                            >
                                <div>
                                    <div class="member-info-header pl24">
                                        成员名片
                                    </div>
                                    <div class="member-info pl24 pr24">
                                        <img
                                            :src="orderDetailData.qw_avatar"
                                            class=""
                                        >
                                        <div class="">
                                            <div>
                                                <span
                                                    class="
                                                                    fs16
                                                                    fw400
                                                                    color-black
                                                                    mr6
                                                                "
                                                >
                                                    {{ orderDetailData.member_name }}
                                                </span>
                                                <i
                                                    class="color-primary"
                                                    :class="{
                                                        'el-icon-male': orderDetailData.qw_gender == 1 || orderDetailData.qw_gender == 0,
                                                        'el-icon-female': orderDetailData.qw_gender == 2
                                                    }"
                                                />
                                                <el-tag
                                                    v-if="orderDetailData.qw_external_position"
                                                    type="success"
                                                >
                                                    {{ orderDetailData.qw_external_position }}
                                                </el-tag>
                                            </div>
                                            <div class="pt-10 fs14">
                                                <span class="pr10">
                                                    手机号：{{ orderDetailData.member_mobile }}
                                                </span>
                                                <i
                                                    class="el-icon-document-copy"
                                                    @click="copy(orderDetailData.member_mobile)"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <ul class="pl24 pr24 pb24">
                                        <li
                                            class="
                                                            flex
                                                            member-detail-li
                                                        "
                                        >
                                            <div class="member-detail-left">
                                                对外职务
                                            </div>
                                            <div class="member-detail-right">
                                                {{ orderDetailData.qw_external_position || "—" }}
                                            </div>
                                        </li>
                                        <li
                                            class="
                                                            flex
                                                            member-detail-li
                                                        "
                                        >
                                            <div class="member-detail-left">
                                                所属部门
                                            </div>
                                            <div class="member-detail-right">
                                                {{ orderDetailData.member_department || "—" }}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <template #reference>
                                    <span class="cl-blue member-name">
                                        {{ orderDetailData.member_name }} /
                                        {{
                                            orderDetailData.member_department
                                        }}
                                    </span>
                                </template>
                            </el-popover>
                        </div>
                    </div>
                    <div class="exchange-content mt12">
                        使用时间：
                        <span class="exchange-content-text">{{ orderDetailData.verification_time || '—' }}</span>
                    </div>
                </div>
                <div v-if="orderDetailData.status == 'failure'" class="exchange-class">
                    <div class="exchange-title">失效信息</div>
                    <div class="exchange-content mt16">
                        失效时间：
                        <span class="exchange-content-text">{{ orderDetailData.failure_time || '—' }}</span>
                    </div>
                </div>
            </div>
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
                                        <div class="ml8 lh24 show-line2">{{ scope.row.goods_title || '——' }}</div>
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
        </div>
    </div>
</template>

<script setup>
import Http from '@/util/request'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { copy } from '@/util/index'

const route = useRoute()
// 订单商品详情数据
const orderDetailData = ref({})
// 订单商品状态
const orderStatus = ref('')

// 获取订单商品详情数据
const getOrderStoreDetail = async id  => {
    let { data } = await Http.getOrderStoreDetail({
        order_id: String(id)
    })
    orderDetailData.value = data
    // console.log('11111', orderDetailData.value)
}
// 获取订单商品状态
const getOderStatus = () => {
    if (orderDetailData.value.status === 'wait_use') {
        orderStatus.value = '待使用'
    } else if (orderDetailData.value.status === 'used') {
        orderStatus.value = '已使用'
    } else {
        orderStatus.value = '已失效'
    }
}

onMounted(async() => {
    await getOrderStoreDetail(route.query.id)
    getOderStatus()
})
</script>

<style scoped lang="scss">
/* 页面滚动条 */
.detail-scroll {
    min-height: calc(100vh - 114px) !important;
    height: calc(100vh - 114px) !important;
    overflow-y: auto;
}
.order-table {
    margin-top: -16px;
}
.img-class{ 
    width: 60px;
    height: 60px;
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
    min-height: 210px;
}
.detail-middle-class {
    position: relative;
    margin: 16px 24px;
    padding: 24px;
    background-color: #fff;
    min-height: 208px;
}

.exchange-class {
    display: inline;
    width: 390px;
    .exchange-title {
        font-size: 16px;
        font-weight: 700;
        color: #171717;
        line-height: 22px;
    }
    .exchange-content {
        font-size: 14px;
        font-weight: 400;
        color: rgba(0,0,0,0.85);
        line-height: 22px;
        .exchange-content-text {
            font-size: 14px;
            font-weight: 400;
            color: rgba(0,0,0,0.65);
            line-height: 22px;
        }
    }
}

.event-list-page {
    .cl-blue {
        color: #1773FA;
        cursor: pointer;

        &:hover {
        }
    }

    .icon-in-td {
        width: 32px;
        height: 32px;
        text-align: center;
        display: inline-block;
        margin-right: 9px;

        img {
        width: 100%;
        }
    }
}
.member-info-header {
    // width: 436px;
    height: 56px;
    line-height: 56px;
    color: #000000;
    font-size: 17px;
    // padding-bottom: 12px;
    font-weight: 700;
    border-bottom: 1px solid #ebeef5;
}
.member-info {
    display: flex;
    padding: 24px 0;
    align-items: center;
    img {
      width: 64px;
      height: 64px;
      border-radius: 4px;
      margin-right: 10px;
      vertical-align: middle;
    }
    .el-icon-male {
      margin-right: 10px;
    }
}
  .color-black {
    color: #000;
  }
  .el-icon-document-copy:hover {
    color: #409eff;
    cursor: pointer;
  }
  .member-name {
    display: inline-block;
    width: 100px;
    // overflow: hidden;
    // text-overflow: ellipsis;
    white-space: nowrap;
    color: #409eff;
    vertical-align: middle;
  }
  .member-detail-li {
    border-top: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    div {
      padding: 14px 24px;
      &:first-child {
        border-right: 1px solid #ebeef5;
      }
    }
    &:last-child {
      border-bottom: 1px solid #ebeef5;
    }
    .member-detail-left {
      width: 120px;
      background: #fafafa;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .member-detail-right{
        width: 254px;
    }
  }
</style>