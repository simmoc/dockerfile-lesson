<template>
    <div
        class="head-content"
    >
        <div class="head-content-item">
            创建成员：{{
                (props.updateInfo && props.updateInfo.creator_name) ||
                    (props.updateInfo && props.updateInfo.member_name) ||
                    '—'
            }}
        </div>
        <div class="head-content-item">
            创建时间：{{ (props.updateInfo && props.updateInfo.create_time) || '—' }}
        </div>
        <div class="head-content-item">
            最后修改成员：{{ (props.updateInfo && props.updateInfo.member_name) || '—' }}
        </div>
        <div class="head-content-item ">
            最后修改时间：{{ (props.updateInfo && props.updateInfo.update_time) || '—' }}
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    updateInfo: {
        type: [Object],
        defalut: []
    }
})
</script>

<style lang="scss">
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
        margin-top: 18px;
        margin-bottom: -16px;
    }
    .head-content-item {
        margin-right: 32px;
    }
</style>