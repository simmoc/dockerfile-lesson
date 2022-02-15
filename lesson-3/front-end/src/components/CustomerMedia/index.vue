<template>
    <div>
        <CustomerMediaList :list="props.modelValue"
                           :event-select-show="props.eventSelectShow"
                           :events-id="props.eventsId"
                           :page-type="props.pageType"
                           :media-content-width="props.mediaContentWidth"
                           :text-limit="props.textLimit"
                           @changeSort="changeSort"
                           @deleteMedia="deleteItem"
                           @editMedia="editMedia"
        />
        <CustomerMediaButton ref="customerMediaBtn" :hidden-btns="props.hiddenBtns" :list="props.modelValue" :page-type="props.pageType" @handleConfirm="handleConfirm" />
    </div>
</template>

<script setup>
import CustomerMediaList from '@/components/CustomerMediaList/index.vue'
import CustomerMediaButton from '@/components/CustomerMedia/CustomerMediaButton.vue'
// import vxRule from '@/util/formValidate'

const props = defineProps({
    modelValue: {
        type: Array
    },
    eventSelectShow: {
        type: Boolean
    },
    eventsId: {
        type: [String, Number]
    },
    mediaContentWidth: {
        type: Number
    },
    pageType: {
        type: String,
        default: ''
    },
    textLimit: {
        type: Number
    },
    // 接收参数隐藏相应的上传按钮，全为大写，传入规则为 :hiddenBtns={TEXT: true, IMAGE: true...}
    hiddenBtns: {
        type: Array,
        default: () => []
    }
})
// const mediaList = ref([])
// watch(() => props.list, val => {
//     mediaList.value=val
// }, { immediate: true })
const customerMediaBtn = ref(null)
const mediaList = ref(props.modelValue)
watch(() => props.modelValue, val => {
    mediaList.value = JSON.parse(JSON.stringify(val))
}, {
    immediate: true,
    deep: true
})
// watch(() => mediaList.value, val => {
//     // mediaList.value = val
//     console.log(val)
//     emits('update:modelValue', val)
// }, {
//     immediate: true,
//     deep: true
// })
const editId = ref(0)
const emits = defineEmits(['update:modelValue'])
const handleConfirm = ({ type, file, isEdit }) => {
    console.log(type, file)
    if (!isEdit) {
        if (type === 'TEXT') {
            mediaList.value.push({
                type,
                content: '',
                sort: mediaList.value.length
            })
        } else {
            if (type === 'IMAGE' || type === 'VIDEO' || type === 'FILE') {
                mediaList.value.push({
                    type,
                    file_id: file.file_id,
                    sort: mediaList.value.length,
                    file_name: file.file_name,
                    file_url: file.file_url
                })
            } else {
                mediaList.value.push({
                    type,
                    ...file,
                    sort: mediaList.value.length
                })
            }
        }
    } else {
        console.log(editId)
        mediaList.value.splice(editId.value, 1, { ...file, type })
    }

    emits('update:modelValue', mediaList.value)
    console.log('content_arr', mediaList.value)
    customerMediaBtn.value.cancelDialog()

}
const changeSort = ({ newIndex, oldIndex }) => {
    mediaList.value[oldIndex].sort = newIndex
    mediaList.value[newIndex].sort = oldIndex
    emits('update:modelValue', mediaList.value)
}
const deleteItem = idx => {
    console.log('idx', idx)
    console.log(mediaList.value)
    mediaList.value.splice(idx, 1)
    emits('update:modelValue', mediaList.value)
}
const editMedia = idx => {
    editId.value = idx
    console.log('editId', idx)
    console.log('----', editId.value)
    customerMediaBtn.value.confirmText(mediaList.value[idx].type, mediaList.value[idx])
}
</script>

<style scoped lang="scss">
    .media-content{
    }
    .media-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        color: #000;
        padding: 16px 24px;
    }
.media-item-list{
    display: flex;
    justify-content: space-between;
    padding: 24px;
    margin-left: -8px;
}
    .media-item{
        width: 86px;
        height: 86px;
        box-sizing: border-box;
        background: #fff;
        border-radius: 4px;
        border: 1px solid $customer-border-color;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-left: 8px;
        .media-item-text{
            padding-top: 8px;
            font-size: 14px;
            color:#303133;
        }
        .media-item-sum{
            padding-top: 2px;
            font-size: 12px;
            color:#909399;
        }
        img{
            width: 24px;
            height:24px;
        }
    }
</style>
