<template>
    <div class="topbar-container" :class="{
        'fixed': $store.state.settings.topbarFixed,
        'shadow': scrollTop
    }"
    >
        <img src="@/assets/icons/logo.png" alt="@/assets/icons/logo.png" class="logo">
        <div class="left-box">
            <div v-if="$store.state.settings.mode === 'mobile' || (['side', 'head', 'single'].includes($store.state.settings.menuMode) && $store.state.settings.enableSidebarCollapse)" class="sidebar-collapse" :class="{'is-collapse': $store.state.settings.sidebarCollapse}" @click="$store.commit('settings/toggleSidebarCollapse')">
                <svg-icon name="toolbar-collapse" />
            </div>
        </div>
        <UserMenu />
    </div>
</template>

<script setup>
// import imgLogo from '@/assets/icons/logo.png'
// const logo = ref(imgLogo)
// import { compile } from 'path-to-regexp'
// import { deepClone } from '@/util'
import UserMenu from '../UserMenu/index.vue'

// const store = useStore()
// const route = useRoute()

// const breadcrumbList = computed(() => {
//     let breadcrumbList = []
//     if (store.state.settings.enableDashboard) {
//         breadcrumbList.push({
//             path: '/dashboard',
//             title: store.state.settings.dashboardTitle
//         })
//     }
//     if (route.meta.breadcrumbNeste) {
//         route.meta.breadcrumbNeste.map((item, index) => {
//             let tmpItem = deepClone(item)
//             if (index != 0) {
//                 tmpItem.path = `${route.meta.breadcrumbNeste[0].path}/${item.path}`
//             }
//             breadcrumbList.push(tmpItem)
//         })
//     }
//     return breadcrumbList
// })

const scrollTop = ref(0)
onMounted(() => {
    window.addEventListener('scroll', onScroll)
})
onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
})
function onScroll() {
    scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop
}
// 图片引入
// function getImageUrl(url) {
//     return new URL(url, import.meta.url).href
// }

// function pathCompile(path) {
//     let toPath = compile(path)
//     return toPath(route.params)
// }
</script>

<style lang="scss" scoped>
.topbar-container {
    position: absolute;
    z-index: 999;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $g-topbar-height;
    background-color: $g-header-bg;
    transition: 0.3s, box-shadow 0.2s;
    box-shadow: 0 0 1px 0 #ccc;
    width:100%;
    &.fixed {
        position: fixed;
        &.shadow {
            box-shadow: 0 10px 10px -10px #ccc;
        }
    }
    .left-box {
        display: flex;
        align-items: center;
        padding-right: 50px;
        overflow: hidden;
        -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 50px), transparent);
        .sidebar-collapse {
            display: flex;
            align-items: center;
            padding: 0 20px;
            height: 50px;
            cursor: pointer;
            transition: 0.3s;
            .svg-icon {
                transition: 0.3s;
            }
            &:hover .svg-icon {
                color: #5482ee;
            }
            &.is-collapse .svg-icon {
                transform: rotateZ(-180deg);
            }
            & + .el-breadcrumb {
                margin-left: 0;
            }
        }
        :deep(.el-breadcrumb) {
            margin-left: 20px;
            white-space: nowrap;
            .el-breadcrumb__item {
                display: inline-block;
                float: none;
                span {
                    font-weight: normal;
                }
                &:last-child span {
                    color: #97a8be;
                }
            }
        }
    }
}
// 面包屑动画
.breadcrumb-enter-active {
    transition: all 0.25s;
}
.breadcrumb-enter-from,
.breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(30px) skewX(-50deg);
}
    .logo{
        width: 85px;
        height:30px;
        margin-top: 4px;
        margin-left: 24px;
    }

</style>
