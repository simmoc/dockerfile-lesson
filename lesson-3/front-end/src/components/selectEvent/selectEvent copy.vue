<template>
    <div>
        <!-- 事件选择in: {{ value }} -->
        <SelectBlock
            v-model="value"
            :option-group="optionGroup"
            :filter-method="filterMethod"
            :props="defaultProps"
            popper-class="select-event-popover"
            placeholder="请选择"
            @change="handleChangeTaskEvent"
            @changeObj="handleChangeObj"
        />
    </div>
</template>
<script>
import Http from '@/util/request.js'
import SelectBlock from '@/components/form/select-block.vue'
// import { defineEmits } from 'vue'
// import { }
// import SelectBlock from '../form/select-block.vue'
export default {
    name: 'SelectEvent',
    components: {
        SelectBlock: SelectBlock
        // 'select-block': () => import('@/components/form/select-block.vue')
    },
    model: {
        prop: 'taskEvent',
        event: 'changeTaskEvent'
    },
    props: {
        taskEvent: {
            type: [String, Number],
            default: ''
        }
    },
    emits: ['changeObj', 'changeTaskEvent'],
    // setup(props, { emit }) {
    //     console.log(props)
    //     // defineEmits(['changeObj', 'changeTaskEvent'])
    //     const handleChangeObj = (v, o) => {
    //         // this.$emit('changeObj', v, o)
    //         emit('changeObj', v, o)
    //     }
    //     const handleChangeTaskEvent = v => {
    //         // this.$emit('changeTaskEvent', v)
    //         emit('changeTaskEvent', v)
    //     }
    //     return {
    //         emit,
    //         handleChangeObj,
    //         handleChangeTaskEvent

    //     }
    // },
    data() {
        return {
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
        }
    },
    computed: {},
    watch: {
        taskEvent: {
            async handler(n) {
                this.value = n
            },
            immediate: true
        }
    },
    // created() {
    //     this.getOptionData()
    // },
    mounted() {
        this.getOptionData()
    },
    methods: {
        handleChangeObj(v, o) {
            this.$emit('changeObj', v, o)
        },
        handleChangeTaskEvent(v) {
            this.$emit('changeTaskEvent', v)
        },
        getOptionData() {
            let param = {}
            Http
                .getEventsOptions(param)
                .then(res => {
                    this.optionGroup = res.data
                })
                .catch(() => {})
        },
        filterMethod(n) {
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
    }
}
</script>

<style lang="scss">
.select-event-popover {
  width: 400px;
  padding: 0;
}
</style>
