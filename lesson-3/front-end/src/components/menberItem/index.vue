<template>
    <div class="member-item-box inline-block">
        <el-popover
            placement="right"
            width="300"
            trigger="click"
            @show="onShow"
        >
            <div>
                <div class="member-info-header c0 fs16 lh22 fwb pl24 pr24 pt16 pb16">
                    成员名片
                </div>
                <div class="member-info pl24 pr60 pt16">
                    <div class="member-mian-info flex flex-align-center pb12">
                        <el-avatar class="mr12" shape="square" :size="48" :src="memberData.qw_avatar || defaultAvatar" />
                        <!-- <img
                            :src="memberData.qw_avatar"
                            class="member-img mr12"
                        > -->
                        <div class="flex flex-align-center">
                            <span class="fs16 fwb c26 mr4">{{ memberData.qw_name || '--' }}</span>
                            <span v-if="memberData.corp_name" class="corp-name fs12 mr6 color-warning">@{{ memberData.corp_name }}</span>
                            <img class="sex-img" :src="showSexType(memberData.qw_gender)" alt="">
                        </div>
                    </div>
                    <div class="info-row flex flex-align-center mb16 mt16">
                        <div class="row-label flex flex-align-center">
                            <img class="info-row-icon mr8" src="@/assets/images/customer/phone.svg" alt="">
                            <span class="c55">手机</span>
                        </div>
                        <div class="row-value flex flex-align-center">
                            <span>{{ memberData.qw_phone || '--' }}</span>
                            <i
                                class="el-icon-document-copy fs16 ml8"
                                @click="copy(memberData.qw_phone)"
                            />
                        </div>
                    </div>
                    <div class="info-row flex flex-align-center mb16">
                        <div class="row-label flex flex-align-center">
                            <img class="info-row-icon mr8" src="@/assets/images/customer/email.svg" alt="">
                            <span class="c55">邮箱</span>
                        </div>
                        <div class="row-value flex flex-align-center">
                            <span>{{ memberData.qw_email || '--' }}</span>
                        </div>
                    </div>
                    <div class="info-row flex flex-align-start mb16">
                        <div class="row-label flex flex-align-center">
                            <img class="info-row-icon mr8" src="@/assets/images/customer/ognization.svg" alt="">
                            <span class="c55">部门</span>
                        </div>
                        <div v-if="memberData.department" class="row-value lh22">
                            <p v-for="(item, i) in memberData.department" :key="i" class="mb8"> 
                                {{ item }}
                            </p>
                        </div>
                    </div>
                    <div v-if="memberData.chain_name" class="info-row flex flex-align-center mb16">
                        <div class="row-label flex flex-align-center">
                            <img class="info-row-icon mr8" src="@/assets/images/customer/link_icon.svg" alt="">
                            <span class="c55">上下游</span>
                        </div>
                        <div class="row-value flex flex-align-center">
                            <span>{{ memberData.chain_name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <template #reference>
                <div class="merberItem flex flex-align-center">
                    <el-avatar class="flex-s0" shape="square" :size="32" :src="props.avatar || defaultAvatar" />
                    <!-- <img v-if="props.avatar" class="merber-header mr4" :src="props.avatar"> -->
                    <div class="ml8 color-primary max-show-width overflow-ellipsis" :title="`${props.name} / ${props.departmentName}`">
                        {{ props.name || '--' }}
                        {{ props.departmentName ? ` / ${props.departmentName}` : '' }}
                    </div>
                </div>
            </template>
        </el-popover>
    </div>
</template>

<script setup>
import { ref, toRaw } from 'vue'
import http from '@/util/request'
import { copy } from '@/util/index'
import { defaultAvatar } from '@/util/contant'

const props = defineProps({
    memberId: {
        type: [String, Number],
        default: () => ''
    },
    avatar: {
        type: String,
        default: () => ''
    },
    name: {
        type: String,
        default: () => ''
    },
    departmentName: {
        type: String,
        default: () => ''
    }
})
// 成员信息
let memberData = ref({})

//  获取成员信息
const getMemberData = async() => {
    try {
        if (!props.memberId) return false 
        const { data } = await http.getMemberData({ member_id: props.memberId })
        memberData.value = data
    } catch (err) {
        console.log('getMemberData error', err)
    }
}
//  弹出窗显示事件
const onShow = () => {
    if (JSON.stringify(toRaw(memberData.value)) === '{}') {
        getMemberData()
    }
}

//  性别图片路径
// const showSexType = type => {
//     let url = type === '1' ? 'man' : 'women'
//     return new URL(`../../assets/images/customer/${url}.svg`, import.meta.url).href
// }
const showSexType = type => {
    let url = ''
    if (['男', 'man', 1, '1'].includes(type)) {
        url = 'man'
        return new URL(`../../assets/images/customer/${url}.svg`, import.meta.url).href
    } else if (['女', 'woman', 2, '2'].includes(type)) {
        url = 'women'
        return new URL(`../../assets/images/customer/${url}.svg`, import.meta.url).href
    }
    return ''
}

</script>

<style lang="scss">
    .el-popover {
        padding: 0 !important;
    }

    // .merber-header {
    //     display: block;
    //     width: 32px;
    //     height: 32px;
    // }

    .member-info-header {
        border-bottom: 1px solid #D9D9D9;
    }

    .member-mian-info {
        margin-right: -36px;
        border-bottom: 1px solid #D9D9D9;
        .member-img {
            // display: block;
            // width: 48px;
            // height: 48px;
            border-radius: 4px;
            // border: 1px solid #D9D9D9;
        }

        .sex-img {
            display: block;
            width: 12px;
            height: 12px; 
        }
    }

    .info-row {
        line-height: 22px;
        .row-label {
            width: 82px;

            .info-row-icon {
                display: block;
                width: 16px;
                height: 16px;
            }
        }
    }

    .el-icon-document-copy:hover {
        color: #409eff;
        cursor: pointer;
    }
    .member-item-box {
        width: 100%;
    }
    .merberItem {
        height: 100%;

        .max-show-width {
            max-width: 100%;
        }
    }
</style>