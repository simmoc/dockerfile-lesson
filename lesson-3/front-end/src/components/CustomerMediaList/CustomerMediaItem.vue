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
        <img v-if="props.showEdit" src="@/assets/images/knowledgeBase/edit-000.svg" alt="" class="icon-edit" @click.stop="editItem">
        <i :class="['el-icon-delete-solid', props.pageType == 'taskEdit' && props.type =='TEXT' ? 'task-disable-btn' : '']"
           @click.stop="deleteItem"
        />
    </div>
</template>

<script setup>
import { defineEmits } from 'vue'
const props = defineProps({
    showEdit: {
        type: Boolean,
        default: false

    },
    mediaContentWidth: {
        type: Number,
        default: 440
    },
    pageType: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'TEXT'
    }
})
const emit = defineEmits(['deleteItem', 'editItem'])
const deleteItem = () => {
    // 事件任务编辑，文字框不可删除
    if (props.type == 'TEXT' && props.pageType === 'taskEdit') {
        return
    }
    emit('deleteItem')
}
const editItem = () => {
    emit('editItem')
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
        .icon-edit{
            margin-right: 20px;
        }
        .task-disable-btn {
            cursor: not-allowed;
        }
    }
</style>
