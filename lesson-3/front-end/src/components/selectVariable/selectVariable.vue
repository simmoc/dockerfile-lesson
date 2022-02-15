<template>
    <div>
        <!-- 变量选择in: {{ value }} -->
        <!-- {{ value }}+{{ taskVariable }}= -->
        <select-block
            ref="variableSelectBlock"
            v-model="value"
            :option-group="optionGroup"
            :filter-method="filterMethod"
            :props="defaultProps"
            popper-class="select-variable-popover"
            placeholder="请选择"
            :is-input-show="isInputShow"
            :disabled="disabled"
            @change="handleChangeTaskVariable"
            @changeObj="handleChangeObj"
        />
    </div>
</template>

<script>
// 业务组件 用来做变量选择
import Http from '@/util/request.js'
export default {
    name: 'SelectVariable',
    components: {
        'select-block': () => import('@/components/form/select-block.vue')
    },
    model: {
        prop: 'taskVariable',
        event: 'changeTaskVariable'
    },
    props: {
        taskVariable: {
            type: [String, Number],
            default: ''
        },
        // 点击触发器显示
        isInputShow: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        eventsId: {
            type: [String, Number],
            default: ''
        }
    },
    emits: ['changeObj', 'changeTaskVariable', 'updata:taskVariable'],
    data() {
        return {
            value: '',
            defaultProps: {
                valueKey: 'element_key',
                labelKey: 'element_name',
                groupLabelKey: 'subject_name',
                childrenKey: 'son'
            },
            optionGroup: []
        }
    },
    computed: {},
    watch: {
        taskVariable: {
            async handler(n) {
                this.value = n
            },
            immediate: true
        },
        eventsId: {
            handler() {
                this.getOptionData()
            },
            immediate: true
        }
    },
    created() {
        this.getOptionData()
    },
    mounted() {},
    methods: {
        openPopover() {
            this.$refs.variableSelectBlock.openPopover()
        },
        handleChangeObj(v, o) {
            this.$emit('changeObj', v, o)
            this.$emit('updata:taskVariable', v)
        },
        handleChangeTaskVariable(v) {
            this.$emit('changeTaskVariable', v)
        },
        getOptionData() {
            if (this.eventsId) {
                let param = {
                    events_id: parseInt(this.eventsId)
                }
                Http
                    .getEventsElementsOptions(param)
                    .then(res => {
                        this.optionGroup = res.data || []
                        // console.log('时间问题', this.optionGroup)
                        this.$nextTick(() => {})
                    })
                    .catch(() => {})
            }
        },
        filterMethod(n) {
            return new Promise(resolve => {
                // mock
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
    }
}
</script>

<style lang="scss">
.select-variable-popover {
  width: 400px;
  padding: 0;
}
</style>
