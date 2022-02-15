<template>
    <div class="sub-box">
        <div class="sub-list pr8 mr8 flex">
            <div v-for="item in props.subList" 
                 :key="item" 
                 class="sub-item flex p16 bdr2 mr12 pointer" 
                 :class="[props.selectSubJect.id == item.id ? 'sub-item-active' : '']"
                 @click="selectItem(item)"
            >
                <img class="item-img mr12" :src="showSubType(item.tag_platform_type)" alt="企微">
                <div class="item-info flex flex-direction-column flex-justify-between">
                    <div class="c8c">{{ item.name }}</div>
                    <div v-if="item.tag_platform_type == 'THIRD'" class="flex flex-align-center">
                        <!-- <img class="user-header mr4" :src="item.pic" alt="头像"> -->
                        <el-avatar class="mr4" shape="square" :size="22" :src="item.pic || defaultAvatar" />
                        <span class="fwb fs12 mr4 max-name-width overflow-ellipsis">{{ item.yw_name }}</span>
                        <span class="yellow-text text-yellow fs12 mr4">@{{ item.name }}</span>
                        <img class="sex-img" :src="showSexType(item.sex)" alt="">
                    </div>
                    <div v-else class="flex flex-align-center">
                        <div class="fwb fs12 mr8 max-name-width overflow-ellipsis">{{ item.yw_name }}</div>
                        <i class="el-icon-document-copy copy-icon c99" @click="onCopy(item.yw_name)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { copy } from '@/util/index'
import { defaultAvatar } from '@/util/contant'

const props = defineProps({
    subList: {
        type: Array,
        default: () => []
    },
    selectSubJect: {
        type: Object,
        default: () => {}
    }
})
const emits = defineEmits(['update:selectSubJect', 'onSelect'])
// const defaultHead = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

const selectItem = item => {
    // emits('update:selectSubJect', item)
    emits('onSelect', item)
}
//  性别图片路径
const showSexType = type => {
    let url = ''
    // let url = type === '男' ? 'man' : 'women'
    if (['男', 'man', 1, '1'].includes(type)) {
        url = 'man'
        return new URL(`../../../../assets/images/customer/${url}.svg`, import.meta.url).href
    } else if (['女', 'woman', 2, '2'].includes(type)) {
        url = 'women'
        return new URL(`../../../../assets/images/customer/${url}.svg`, import.meta.url).href
    }
    return ''
}

const showSubType = type => {
    return new URL(`../../../../assets/images/eventManage/${type}.svg`, import.meta.url).href
}
const onCopy = str => {
    copy(str)
}

onMounted(() => {
    // props.menberItem = {
    //     name: '陈东方',
    //     sex: 1,
    //     quet: '百果园'
    // }
})

</script>

<style lang="scss">
    .sub-box {
        max-width: 100%;
        overflow-x: auto;
        // box-shadow: -4px 0 4px #e2e2e2 inset;
    }
    .sub-item {
        // width: 238px;
        flex-grow: 0;
        flex-shrink: 0;
        height: 80px;
        border: 1px solid #D9D9D9;

        .item-img {
            display: block;
            width: 48px;
            height: 48px;
        }
        .user-header {
            display: block;
            width: 22px;
            height: 22px;
        }
        .sex-img {
            display: block;
            width: 14px;
            height: 14px;
        }

        .copy-icon {
            font-size: 14px;
        }
    }
    .max-name-width {
        max-width: 116px;
    }
    .sub-item-active {
        border-color: #1773FA;
    }
    .text-yellow {
        color: #EC8132;
    }
</style>