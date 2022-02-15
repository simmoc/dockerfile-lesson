<template>
    <div class="menber-info-item pb24 mb16">
        <div class="mb8">
            <menberItem 
                :member-id="props.trackItem.member_id"
                :avatar="props.trackItem.qw_avatar"
                :name="props.trackItem.qw_name"
                :department-name="props.trackItem.qw_department_name"
            />
        </div>
        <el-row :gutter="8">
            <el-col :span="12" class="">
                <div class="info-row lh22 mb8 flex">
                    <span class="c55 flex-g0 flex-s0">添加来源：</span>
                    <div class="c26 flex flex-align-center flex-s1 overflow-ellipsis">
                        <span>{{ comeSource(props.trackItem.qw_add_way) || '--' }}</span>
                        <el-tooltip
                            v-if="props.trackItem.qw_add_way === 0"
                            class="box-item"
                            effect="dark"
                            content="包含直接扫描我的二维码"
                            placement="right"
                        >
                            <img src="@/assets/images/icon/question-circle.png" alt="" class="question-icon ml4">
                        </el-tooltip>
                    </div>
                </div>
                <div class="info-row lh22 mb8 flex">
                    <span class="c55 flex-g0 flex-s0">客户状态：</span>
                    <span class="c26 flex-s1 overflow-ellipsis">{{ cusRelative(props.trackItem.deleted_state) }}</span>
                </div>
                <div class="info-row lh22 mb8 flex">
                    <span class="c55 flex-g0 flex-s0">备注手机号：</span>
                    <span class="c26 flex-s1 overflow-ellipsis">{{ props.trackItem.qw_remark_mobiles || '--' }}</span>
                </div>
            </el-col>
            <el-col :span="12" class="">
                <div class="info-row lh22 mb8 flex">
                    <span class="c55 flex-g0 flex-s0">添加时间：</span>
                    <span class="c26 overflow-ellipsis">{{ props.trackItem.qw_createtime || '--' }}</span>
                </div>
                <div class="info-row lh22 mb8 flex">
                    <span class="c55 flex-g0 flex-s0">备注名：</span>
                    <span class="c26 overflow-ellipsis">{{ props.trackItem.qw_remark || '--' }}</span>
                </div>
                <div class="info-row lh22 mb8 flex">
                    <span class="c55 flex-g0 flex-s0">备注企业：</span>
                    <span class="c26 overflow-ellipsis">{{ props.trackItem.qw_remark_corp_name || '--' }}</span>
                </div>
            </el-col>
        </el-row>
        <div class="info-row lh22 flex">
            <span class="c55 flex-g0 flex-s0">备注描述：</span>
            <span class="c26 flex-g1 flex-s1">{{ props.trackItem.qw_description || '--' }}</span>
        </div>
    </div>
</template>

<script setup>
import { QW_ADD_WAY, DELETED_STATE } from '@/util/contant.js'
const props = defineProps({
    trackItem: {
        type: Object,
        default: () => {}
    }
})

const comeSource = type => {
    return QW_ADD_WAY[type]
}
const cusRelative = type => {
    return DELETED_STATE[type]
}
</script>

<style lang="scss" scoped>
.menber-info-item {
    border-bottom: 1px solid #EDEEF2;
}
.question-icon {
    width: 16px;
    height: 16px;
}
</style>