<template>
    <div class="customer-media-item">
        <img
            class="drag-icon"
            src="@/assets/images/knowledgeBase/drag.svg"
            alt=""
        >
        <div class="media-content" :style="{'width':mediaContentWidth+'px'}">
            <slot />
        </div>
        <i class="el-icon-delete-solid pointer"
           @click.stop="deleteItem"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    mediaContentWidth: {
        type: Number,
        default: 440
    }
})
const emit = defineEmits(['deleteItem'])
const deleteItem = () => {
    console.log(props)
    emit('deleteItem')
}
// 图片引入
// function getImageUrl(url) {
//     return new URL(url, import.meta.url).href
// }

</script>

<style scoped lang="scss">
    .customer-media-item{
        padding: 4px;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        min-height: 68px;
        border-radius: 2px;
        .drag-icon{
            margin-right: 8px;
        }
        .media-content{
            width: 440px;
            margin-right: 16px;
            flex-shrink: 1;
            border: 1px solid #D8DCE6;
            border-radius: 2px;
            background-color: #fff;

        }
        .el-icon-delete-solid{
            font-size: 18px;
            margin-right: 19px;
        }
        .task-disable-btn {
            cursor: not-allowed;
        }
    }
</style>
