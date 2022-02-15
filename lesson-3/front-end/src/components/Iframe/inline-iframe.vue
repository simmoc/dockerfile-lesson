<template>
    <page-main>
        <div class="mvp-inline-iframe">
            <!-- <iframe
                v-for="iframeRoute in iframes.iframeRouteList"
                :key="iframeRoute.src"
                :src="`${url}${iframeRoute.src}${iframeRoute.src.indexOf('?')!==-1?'&':'?'}token=${getItem('token')}`"
                frameborder="0"
            /> -->
            <iframe
                v-for="iframeRoute in iframes.iframeRouteList"
                :key="iframeRoute.src"
                :src="iframeUrl"
                frameborder="0"
            />
        </div>
    </page-main>
</template>

<script setup>
import { watch } from 'vue-demi'
import { useRoute } from 'vue-router'
import { getItem } from '@/util/storage'

let url = import.meta.env.VITE_APP_API_BASEURL
const iframes = ref({
    src: '',   // 当前显示iframeSrc
    iframeRouteList: []  // 所有需要换成的iframe数组
})

const iframeUrl = ref('')

const props = defineProps({
    include: {
        type: Array,
        default: () => {
            return []
        }
    }
})

const route = useRoute()

function setRouterIframeUrl(route) {
    iframes.value.src = (route.meta && route.meta.iframeSrc) || ''
}

// 群控判断
const getUrl = () => {
    let iframeRou = ''
    iframes.value.iframeRouteList.forEach(e => {
        iframeRou = e
        console.log('iframeRou', iframeRou)
        if (iframeRou.src.match(/https/g)) {
            console.log('1111111', iframeRou.src)
            iframeUrl.value = iframeRou.src
        } else {
            console.log('2222222')
            iframeUrl.value = url + iframeRou.src + (iframeRou.src.indexOf('?') !== -1 ? '&' : '?') + 'token=' + getItem('token')
        }
    })
}

onMounted(() => {
    getUrl()
}),

watch(route, n => {
    const prefixName = n.name
    console.log(n)
    setRouterIframeUrl(n)
    if (
        iframes.value.src &&
        !iframes.value.iframeRouteList.find(
            item => item.name === prefixName
        )
    ) {
        iframes.value.iframeRouteList.push({
            src: iframes.value.src,
            name: prefixName
        })
    }
}, { immediate: true })

watch(props.include, n => {
    iframes.value.iframeRouteList = iframes.value.iframeRouteList.filter(
        el => n.indexOf(el.name) !== -1
    )
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
/* 2019-4-29 09:45:45 统一项目所有iframe样式 */
.mvp-inline-iframe {
    height: calc(100vh);
    flex:1;
    // padding: 24px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    > iframe {
        width: 100%;
        flex: 1;
    }
}
</style>
