<template>
    <div v-if="visible && props.detail.code_name" class="detail-pop bgf bdr4">
        <div class="detail-heder flex flex-justify-between flex-align-center pt16 pb16 pl24 pr24">
            <div class="flex">
                <div class="detail-title pr16">成员活码规则</div>
                <span class="link-btn color-primary" @click="goEdit">去编辑 ></span>
            </div>
            <i class="el-icon-close fs16 c8c pointer" @click="closePop" />
        </div>
        <div class="detail-content p24">
            <div class="code-detail p16 bdr2">
                <div class="flex">
                    <img class="code-img mr16" :src="baseUrl + props.detail.code_url" alt="">
                    <div class="flex flex-direction-column flex-justify-between">
                        <div class="info-row lh22 fs14">
                            <span class="info-label c8c">规则名称：</span>
                            <span class="info-value c26">{{ props.detail.rule_name }}</span>
                        </div>
                        <div class="info-row lh22 fs14">
                            <span class="info-label c8c">类型：</span>
                            <span class="info-value c26">{{ props.detail.rule_type == 2 ? '多成员' : '单成员' }}</span>
                        </div>
                        <div class="info-row lh22 fs14">
                            <span class="info-label c8c">分配客流规则：</span>
                            <span class="info-value c26">{{ showRule(props.detail.rule_type,props.detail.diversion_rule) }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex mt12">
                    <div class="info-row lh22 fs14 mr32">
                        <span class="info-label c8c">单客户扫码次数上限：</span>
                        <span class="info-value color-primary">{{ showNumber(props.detail.scans_number_limit) }}</span>
                    </div>
                    <div class="info-row lh22 fs14">
                        <span class="info-label c8c">单客户添加人数上限：</span>
                        <span class="info-value color-primary">{{ showNumber(props.detail.add_people_number_limit) }}</span>
                    </div>
                </div>
                <div class="info-row lh22 fs14 mt12">
                    <span class="info-label c8c">活码有效时间：</span>
                    <span class="info-value c26">{{ dateValidityShow(props.detail) }}</span>
                </div>
            </div>
            <div class="user-list mt32">
                <div class="user-total flex flex-align-center">
                    <span class="c26 fs14 mr8 fwb">配置成员</span>
                    <span class="c8c fs12 mr4">共</span>
                    <span class="fs14 color-primary mr4">{{ props.detail.qw_member_list.length || 0 }}</span>
                    <span class="c8c fs12">条</span>
                </div>
                <div class="user-list-scroll">
                    <div v-for="item in props.detail.qw_member_list" :key="item.qw_name" class="user-item flex flex-align-center flex-justify-between pt12 pb12">
                        <div class="user-img flex flex-align-center">
                            <img :src="item.qw_thumb_avatar" class="mr8" alt="">
                            <span class="color-primary fs14">{{ item.qw_name }}</span>
                        </div>
                        <div class="user-dep fs12 c8c">
                            <span v-for="(depItem, depIndex) in item.qw_department_arr" :key="depItem.department_link" class="mr8">
                                {{ depItem.department_link }}
                                <span v-show="depIndex !== item.qw_department_arr.length - 1">，</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
    detail: {
        type: Object,
        default: () => {}
    },
    visible: {
        type: Boolean,
        default: false
    }
})
const router = useRouter()
const baseUrl = import.meta.env.VITE_APP_API_BASEURL
const emits = defineEmits(['update:visible'])

// 分流额规则限制
const showRule = (type, rule) => {
    if (type == '2') {
        let arr = ['客户数限制', '随机']
        return arr[rule - 1]
    } else {
        return '—'
    }
}
// const showRule = (type, rule) => {
//     if (type == '2') {
//         let arr = ['客户数限制', '随机']
//         return arr[rule - 1]
//     } else {
//         return '—'
//     }
// }
// 数字展示
const showNumber = str => {
    if (str === '' || str === null || str == '0' || str == undefined) {
        return '—'
    } else {
        return str
    }
}

// 活码有效期限制
const dateValidityShow = item => {
    if (item.is_long_term == 1) {
        return '长期有效'
    } else {
        return item.begin_time + ' - ' + item.end_time
    }
}

// 前往活码编辑
const goEdit = () => {
    localStorage.setItem('menberEditParams', props.detail.jump_url)
    // router.meta.iframeSrc = `/member_code/detail?${window.localStorage.getItem('menberEditParams')}&token=${window.localStorage.getItem('token')}`
    setTimeout(() => {
        router.push({
            path: '/serviceManage/serviceList/memberCodeEdit',
            query: {
                params: props.detail.jump_url
            }
        })
    }, 300)
}

// 关闭弹窗
const closePop = () => {
    let status = false
    emits('update:visible', status)
    // console.log('update 不陈宫')
}
</script>

<style lang="scss">
.detail-pop {
    position: absolute;
    top: 24px;
    left: 570px;
    width: 480px;
    box-shadow: 0px 12px 48px 16px rgba(0,0,0,0.03), 0px 9px 28px 0px rgba(0,0,0,0.05), 0px 6px 16px -8px rgba(0,0,0,0.08);
    .detail-heder {
        border-bottom: 1px solid #e3e3e3;
    }
    .code-img {
       display: block;
       width: 90px;
       height: 90px; 
    }
    .code-detail {
        border: 1px solid #e3e3e3;
        background-color: #fafafa;
    }

    .user-list-scroll {
        max-height: 320px;
        margin-right: -12px;
        overflow-y: scroll;
    }
    .user-item {
        border-bottom: 1px solid #e8e8e8;
    }
    .user-img {
        img {
            display: block;
            width: 32px;
            height: 32px;
        }
    }
    .user-dep {
        width: 228px;
    }
}
.link-btn {
    color: #1773FA;
    cursor: pointer;
}
.pointer {
    cursor: pointer;
}
</style>
