<template>
    <div id="scrollLoader-container" class="container-main">
        <div v-if="topLoading" class="loading">
            <!-- <a-spin :spinning="topLoading" /> -->
        </div>
        <div style="overflow-x: hidden">
            <slot />
        </div>
    </div>
</template>

<script>
// scrollLoader.vue
// 滚动加载组件
export default {
    name: 'ScrollLoader',

    props: {
        // 给slot传一个最小值，保证一开始能出现滚动条
        minHeight: {
            type: Number,
            default: 800
        }
    },
    data() {
        return {
            topLoading: false,
            bottonLoading: false,

            stopTopLoading: false, // 是否停止传播滚动到顶部事件
            stopBottonLoading: false // 是否停止传播滚动到底部事件
        }
    },
    computed: {
        realMinHeight() {
            return this.minHeight + 30
        }
    },
    mounted() {
        this.listenScroll()
    },

    methods: {
        listenScroll() {
            var me = this
            var topDone = stopTopLoading => {
                me.topLoading = false
                if (stopTopLoading) me.stopTopLoading = true
            }
            // var bottonDone = stopBottonLoading => {
            //     me.bottonLoading = false
            //     if (stopBottonLoading) me.stopBottonLoading = true
            // }
            setTimeout(function() {
                var scrollContainer = document.getElementById('scrollLoader-container')
                scrollContainer.onscroll = function() {
                    if (scrollContainer.scrollTop <= 0 && !me.stopTopLoading) {
                        if (me.topLoading) return
                        me.topLoading = true
                        me.$emit('scroll-to-top', topDone)
                    }
                }
            }, 50)
        }
    }
}
</script>
<style lang="scss" scoped>
.container-main {
  width: 100%;
  margin: 0 auto;
  overflow: auto;
  overflow-x: hidden;
  padding: 0;
}

.loading {
  width: 100%;
  // height: 40px;
  position: relative;
  overflow: hidden;
  text-align: center;
  margin: 5px 0;
  color: #999;
  font-size: 13px;
}

.loading-icon {
  color: #707070;
}
</style>
