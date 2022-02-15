<template>
    <div class="customer-media-item">
        <div class="media-content" :style="{'width':props.mediaContentWidth+'px'}">
            <slot />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    showEdit: {
        type: Boolean,
        default: false

    },
    mediaContentWidth: {
        type: Number,
        default: 440
    }
})
</script>

<style scoped lang="scss">
    .customer-media-item{
        display: flex;
        align-items: center;
        margin-top: 8px;
        // margin-bottom: 12px;
        // min-height: 68px;
        border-radius: 2px;
        .drag-icon{
            margin-right: 8px;
        }
        .media-content{
            flex:1;
            border: 1px solid #D8DCE6;
            border-radius: 2px;
            background-color: #fff;

        }
        .el-icon-delete-solid{
            margin-right: 19px;
        }
        .icon-edit{
            margin-right: 20px;
        }
    }
</style>
