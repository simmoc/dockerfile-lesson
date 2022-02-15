<template>
    <div class="block">
        <div
            class="customer-tag"
            :style="{ 'font-size': fontSize + 'px', ...customerStyle }"
        >
            <div class="tag-left" :style="{ 'border-color': color, color: color }">
                {{ leftTitle }}
            </div>
            <div class="tag-right" :style="{ 'background-color': color }">
                <span
                    :style="{ 'width': rightTitleWidth+'px' }"
                    :class="{
                        'tag-right-text': !rightTextAuto && !rightTextBreak,
                        'tag-right-text-wrap': !rightTextAuto && rightTextBreak,
                        'tag-right-text-auto': rightTextAuto
                    }"
                >
                    {{ rightTitle }}
                </span>
                <i v-if="props.showClose" class="el-icon-close" @click.stop="emits('closeTag')" />
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    color: {
        type: String,
        default: '#409eff'
    },
    leftTitle: {
        type: String,
        default: 'xxxx'
    },
    rightTitle: {
        type: String,
        default: 'xxxx'
    },
    rightTitleWidth: {
        type: Number
    },
    fontSize: {
        type: [String, Number],
        default: 12
    },
    showClose: {
        type: Boolean,
        default: () => false
    },
    customerStyle: {
        type: Object,
        default: () => {}
    },
    rightTextBreak: {
        type: Boolean,
        default: false
    },
    rightTextAuto: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['closeTag'])
// export default {
//     name: 'CustomerTag',
//     props: {
//         color: {
//             default: '#409eff'
//         },
//         leftTitle: {
//             default: 'xxxx'
//         },
//         rightTitle: {
//             default: 'xxxx'
//         },
//         fontSize: {
//             default: 12
//         },
//         showClose: {
//             default: () => false
//         },
//         customerStyle: {
//             default: () => {}
//         },
//         rightTextBreak: {
//             default: false
//         },
//         rightTextAuto: {
//             default: false
//         }
//     },
//     data() {
//         return {}
//     },
//     methods: {
//         closeTag() {
//             this.$emit('closeTag')
//         }
//     }
// }
</script>

<style scoped>
    .customer-tag {
        font-size: 12px;
        display: flex;
        margin-right: 8px;
        /* margin-top: 5px; */
        margin-bottom: 8px;
        height: 20px;
        line-height: 18px;
    }

    .tag-left {
        box-sizing: border-box;
        display: inline-block;
        border: 1px solid #409eff;
        color: #409eff;
        padding: 0 4px;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        max-width: 200px;
        overflow: hidden;
        word-break: break-all;
    }

    .tag-right {
        display: inline-block;
        background-color: #409eff;
        color: #fff;
        padding: 1px 4px;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        /*max-width: 200px;*/
        /*word-break: break-all;*/
    }

    .el-icon-close {
        color: #fff;
    }
    .tag-right-text {
        display: inline-block;
        max-width: 130px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
        text-align: center;
    }
    .tag-right-text-wrap {
        display: inline-block;
        max-width: 170px;
        word-break: break-all;
        text-align: center;
    }
    .tag-right-text-auto {
        display: inline-block;
        max-width: 360px;
        white-space: nowrap;
        text-align: center;
    }
</style>
