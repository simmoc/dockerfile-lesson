<template>
    <div class="menber-info-item pb16 mb16">
        <div class="mb8 flex flex-align-center fs16">
            【<div class="max-group-name overflow-ellipsis" :title="props.groupInfo.qw_department_name">{{ props.groupInfo.qw_department_name }}</div>】
            <div class="max-group-name overflow-ellipsis" :title="props.groupInfo.group_name">{{ props.groupInfo.group_name }}</div>
            （<span class="color-primary">{{ props.groupInfo.count }}</span> ）
            <!-- <menberItem :member-item="props.groupInfo" /> -->
        </div>
        <el-row :gutter="8">
            <el-col :span="12" class="">
                <div class="lh32 mb8 flex flex-align-center">
                    <div class="c55 flex-g0 flex-s0">群主：</div>
                    <!-- <div class="c8c flex-s1 max-show-name">
                        <menberItem 
                            :user-id="props.groupInfo.qw_userid"
                            :avatar="props.groupInfo.qw_avatar"
                            :name="props.groupInfo.qw_name"
                            :department-name="props.groupInfo.qw_department_name"
                        />
                    </div> -->
                    <MenberItem 
                        class="table-member-card"
                        :member-id="props.groupInfo.member_id" 
                        :avatar="props.groupInfo.qw_avatar"
                        :name="props.groupInfo.qw_name"
                        :department-name="props.groupInfo.qw_department_name"
                    />
                </div>
                <div class="mb8 flex lh22">
                    <span class="c55 flex-g0 flex-s0">入群时间：</span>
                    <span class="c26 flex-s1 overflow-ellipsis">{{ props.groupInfo.create_time }}</span>
                </div>
            </el-col>
            <el-col :span="12" class="lh22">
                <div class="lh32 mb8 flex">
                    <span class="c55 flex-g0 flex-s0">是否在群内：</span>
                    <span class="c26 overflow-ellipsis">{{ props.groupInfo.is_in || '--' }}</span>
                </div>
                <div class="mb8 flex lh22">
                    <span class="c55 flex-g0 flex-s0">退群时间：</span>
                    <span class="c26 overflow-ellipsis">{{ props.groupInfo.delete_time || '--' }}</span>
                </div>
            </el-col>
        </el-row>
        <div class="flex flex-align-center lh22">
            <span class="c55 flex-g0 flex-s0">入群方式：</span>
            <span class="c26 flex-g1 flex-s1">{{ props.groupInfo.into_group.content || '--' }}</span>
        </div>
    </div>
</template>

<script setup>
// import { QW_ADD_WAY, DELETED_STATE } from '@/util/contant.js'
const props = defineProps({
    groupInfo: {
        type: Object,
        default: () => {}
    }
})

</script>

<style lang="scss" scoped>
.menber-info-item {
    border-bottom: 1px solid #EDEEF2;
}
.max-group-name {
    // max-width: 300px;
    max-width: 37%;
}
.max-show-name {
    max-width: 70%;
}
</style>