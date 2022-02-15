<template>
    <div class="person-item flex flex-align-center">
        <!-- <img v-if="props.person.pic" class="person-header mr4" :src="props.person.pic" alt=""> -->
        <el-avatar shape="square" :size="32" :src="props.person.pic || defaultAvatar" />
        <span v-if="props.person.yw_name" class="ml8 user-name mr8">{{ props.person.yw_name }}</span>
        <span v-if="showTpe(props.person.qw_type)" class="com-name mr4 fs12" :class="[showTpe(props.person.qw_type) == '微信' ? 'text-green' : 'text-yellow']">@{{ showTpe(props.person.qw_type) }}</span>
        <img v-if="showSexType(props.person.sex)" class="sex-img" :src="showSexType(props.person.sex)" alt="">
    </div>
</template>

<script setup>
import { defaultAvatar } from '@/util/contant'
const props = defineProps({
    person: {
        type: Object,
        default: () => {}
    }
})

//  性别图片路径
const showSexType = type => {
    // let url = type === '男' ? 'man' : 'woman'
    let arr = {
        '男': 'man',
        '女': 'women',
        '0': ''
    }
    if (arr[type]) {
        return new URL(`../../assets/images/customer/${arr[type]}.svg`, import.meta.url).href
    }
    return ''
}

// 客户类型
const showTpe = type => {
    if (['微信客户', '微信用户', '1', 1].includes(type)) {
        return '微信'
    } else if (['企业微信客户', '2', 2].includes(type)) {
        return props.person.qw_type_str
    } else {
        return ''
    }
}

</script>

<style lang="scss" scoped>
    .person-header {
        display: block;
        width: 32px;
        height: 32px;
    }

    .sex-img {
        display: block;
        height: 14px;
        width: 14px;
    }
    .text-yellow {
        color: #EC8132;
    }
    .text-green {
        color: #4FB65B;
    }
</style>