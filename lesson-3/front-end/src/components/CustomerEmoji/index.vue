<template>
    <el-collapse-transition>
        <div
            class="emoji-popover-wrap"
        >
            <el-tabs v-model="emojiTab">
                <el-tab-pane
                    v-for="(emojiGroup, emojiIndex) in emojiList"
                    :key="emojiIndex"
                    :name="emojiGroup.label"
                    style="height: 200px"
                >
                    <template #label>
                        <span class="emoji-tab-label">
                            {{ emojiGroup.name }}
                        </span>
                    </template>
                    <div class="emoji-box">
                        <div
                            v-for="(subItem, subIndex) in emojiGroup.value"
                            :key="subIndex"
                            @click.stop="insertText(subItem)"
                        >
                            <span>{{ subItem }}</span>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-collapse-transition>
</template>

<script setup>
import { emoji }  from '@/util/emoji.js'
const emojiTab = ref('face')
const emojiList = ref(emoji)
const emits = defineEmits(['insertEmoji'])
const  insertText = value => {
    console.log(value)
    emits('insertEmoji', value)
    // if (item.content.length === 800) {
    //     return
    // }
    // let position = document.getElementById(`editContent`)
    // let pos = this.getPositionForTextArea(position)
    // let y = position.value
    // let frontString = y.substring(0, pos)
    // let afterString = y.substring(pos, item.content.length)
    // item.content = frontString + value + afterString
    // if (this.timer) {
    //     clearTimeout(this.timer)
    // }
    // this.timer = setTimeout(() => {
    //     // 插入表情等表情/手势,聚焦;
    //     this.$nextTick(() => {
    //         position.focus()
    //         position.selectionStart = position.selectionEnd = pos + value.length
    //     })
    // }, 0)
}
</script>

<style scoped lang="scss">
    .emoji-popover-wrap {
        width: 100%;
        background-color: #fff;
        .el-tabs__nav-scroll {
            margin: 0 16px;
        }
        .el-tabs__content {
            left: 12px !important;
        }
    }

    .emoji-popover-wrap .emoji-popover-head {
        position: relative;
        height: 10px;
    }

    .emoji-popover-wrap .popover-head-close {
        position: absolute;
        right: -0px;
        top: -10px;
        padding: 3px;
        cursor: pointer;
    }

    .emoji-popover-wrap .emoji-box {
        white-space: break-spaces;
        display: flex;
        flex-wrap: wrap;
    }

    .emoji-popover-wrap .emoji-box div {
        font-size: 19px;
        width: 29px;
        height: 29px;
        text-align: center;
        margin: 10px 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
