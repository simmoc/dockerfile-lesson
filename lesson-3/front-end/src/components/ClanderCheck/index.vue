<template>
    <div class="mt24 mb24" :class="{ cursor: monthDisabled }">
        <span class="title-class">每月的</span>
        <div class="date-box flex flex-wrap p20 mt8" :class="{ editDisabled: monthDisabled }">
            <div   
                v-for="item in mouthDay" 
                :key="item"
                :class="['day-item', 'ml14', 'mt6', repeat_node.includes(item) ? 'day-item-selected': '']"
                @click="selectDte(item)"
            >
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const props = defineProps({
    modelValue: {
        type: Array
    }
})
const monthDisabled = ref(false)
const disabledMonth = () => {
    if (route.query.type == 'edit') {
        monthDisabled.value = true
    }
}
// console.log('props.modelValue', props.modelValue)
const mouthDay = ref([
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', 
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', 
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', 
    '31'
])
const repeat_node = ref([])
// const emit = defineEmits(['selectMonth'])
const emit = defineEmits(['update:modelValue', 'selectMonth'])

watch(() => props.modelValue, () => {
    if (props.modelValue != '') {
        repeat_node.value = props.modelValue
    }
}, {
    deep: true,
    immediate: true
})
function selectDte(item) {
    if (!repeat_node.value.includes(item)) {
        repeat_node.value.push(item)
    } else {
        repeat_node.value.splice(repeat_node.value.indexOf(item), 1)
    }

    emit('selectMonth', repeat_node.value)
    console.log('update:modelValue', repeat_node.value)
    emit('update:modelValue', repeat_node.value)
}
onMounted(() => {
    disabledMonth()
})
</script>

<style lang="scss" scoped>
.cursor {
    cursor: not-allowed;
}
.editDisabled {
    pointer-events:none;
    z-index:100;
    background:#cccccc38;
    opacity: 0.5;
}
.title-class{
    font-weight: 400;
    color: #000000;
}
.date-box {
    width: 465px;
    border: 1px solid #D9D9D9;
    .day-item{
        width: 45px;
        height: 24px;
        font-size: 14px;
        color: rgba(0,0,0,0.65);
        line-height: 24px;
        text-align: center;
        border-radius: 2px;
        &:hover{

        }
    }
    .day-item-selected{
        color: #ffffff;
        background: #1773fa;
    }
}

</style>