<template>
    <div>
        <!-- {{ reacData.value }}* -->
        <!-- v-model="reacData.value" -->
        <SelectBlock
            ref="variableSelectBlock"
            v-model="reacData.value"
            :option-group="reacData.optionGroup"
            :filter-method="props.variableShow?filterVariableMethod:filterMethod"
            :props="reacData.defaultProps"
            popper-class="select-event-popover"
            placeholder="请选择"
            :is-input-show="props.isInputShow"
            @change="handleChangeTaskEvent"
            @changeObj="handleChangeObj"
        />
    </div>
</template>

<script setup>
import Http from '@/util/request.js'
import SelectBlock from '@/components/form/select-block.vue'
import { nextTick } from 'vue'
import { onMounted, reactive } from 'vue-demi'

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    // 点击触发器显示
    isInputShow: {
        type: Boolean,
        default: true
    },
    // 如果是插入变量
    variableShow: {
        type: Boolean,
        default: false
    },
    eventsId: {
        type: [String, Number]
    }

})

const emit = defineEmits(['changeObj', 'changeTaskEvent', 'update:modelValue'])

const reacData = reactive({
    value: '',
    defaultProps: {
        valueKey: 'id',
        labelKey: 'event_name',
        groupLabelKey: 'subject_name',
        childrenKey: 'son'
    },
    optionGroup: [],
    // for dev
    searchOptionResult: []
})
const variableSelectBlock = ref(null)

watch(() => props.modelValue, n => {
    // console.log(n, '---------------')
    reacData.value = n + ''
}, {
    immediate: true
})
watch(() => props.variableShow, n => {
    if (n) {
        reacData.defaultProps = {
            valueKey: 'element_key',
            labelKey: 'element_name',
            groupLabelKey: 'subject_name',
            childrenKey: 'son'
        }
    } else {
        reacData.defaultProps = {
            valueKey: 'id',
            labelKey: 'event_name',
            groupLabelKey: 'subject_name',
            childrenKey: 'son'
        }
    }
}, {
    immediate: true
})
watch(() => props.eventsId, n => {
    if (n) {
        getVariableOptionData()
    }
})

onMounted(() => {
    if (props.variableShow) {
        nextTick(() => {
            reacData.defaultProps = {
                valueKey: 'element_key',
                labelKey: 'element_name',
                groupLabelKey: 'subject_name',
                childrenKey: 'son'
            }
        })

        getVariableOptionData()
    }  else {
        reacData.defaultProps = {
            valueKey: 'id',
            labelKey: 'event_name',
            groupLabelKey: 'subject_name',
            childrenKey: 'son'
        }
        getOptionData()
    }
})
function openPopover() {
    variableSelectBlock.value.openPopover()
}
defineExpose({ openPopover })
function handleChangeObj(v, o) {
    // emit('update:modelValue', reacData.value)
    emit('changeObj', v, o)
}
function handleChangeTaskEvent(v) {
    emit('update:modelValue', reacData.value)
    emit('changeTaskEvent', v)
}
function getOptionData() {
    let param = {}
    Http
        .getEventsOptions(param)
        .then(res => {
            reacData.optionGroup = res.data
            // console.log(reacData.optionGroup)
        })
        .catch(() => {})
}
function getVariableOptionData() {
    console.log(props.eventsId)
    if (props.eventsId) {
        let param = {
            events_id: parseInt(props.eventsId)
        }
        Http
            .getEventsElementsOptions(param)
            .then(res => {
                reacData.optionGroup = res.data || []
            // this.$nextTick(() => {})
            })
            .catch(() => {})
    }
}
function filterVariableMethod(n) {
    return new Promise(resolve => {
        let param = {
            events_id: 1,
            keyword: n
        }
        Http
            .getEventsElementsOptions(param)
            .then(res => {
                resolve(res.data)
            })
            .catch(() => {})
    })
}
function filterMethod(n) {
    return new Promise(resolve => {
        let param = {
            keyword: n
        }
        Http
            .getEventsOptions(param)
            .then(res => {
                resolve(res.data)
            })
            .catch(() => {})
    })
}
</script>

<style lang="scss">
.select-event-popover {
  width: 400px;
  padding: 0;
}
</style>
