<template>
    <transition name="main-sidebar">
        <div v-if="$store.state.settings.menuMode === 'side' || $store.state.settings.mode === 'mobile'" class="main-sidebar-container">
            <!--            <Logo :show-title="false" class="sidebar-logo" />-->
            <!-- 侧边栏模式（含主导航） -->

            <div class="nav">
                <template v-for="(item, index) in $store.getters['menu/routes']">
                    <div v-if="item.children && item.children.length !== 0" :key="index" :class="{
                        'item': true,
                        'active': index === $store.state.menu.headerActived,
                        'last-child':item.meta.title==='基础设置'
                    }" :title="item.meta.title" @click="switchMenu(index)"
                    >
                        <!--                        <svg-icon v-if="item.meta.icon" :name="item.meta.icon" class="icon" />-->
                        <img v-if="item.meta.icon" :src="getImageUrl(item.meta.icon)" :name="item.meta.icon" alt="" class="icon">
                        <span>{{ item.meta.title }}</span>
                    </div>
                </template>
            </div>
        </div>
    </transition>
</template>

<script setup>
import store from '@/store'
const switchMenu = inject('switchMenu')
console.log(store.getters['menu/routes'])
function getImageUrl(name) {
    return new URL(`../../../assets/images/icon/${name}.png`, import.meta.url).href
}
</script>

<style lang="scss" scoped>
// 主侧边栏动画
.main-sidebar-enter-active {
    transition: 0.3s;
}
.main-sidebar-enter-from {
    transform: translateX(-#{$g-main-sidebar-width});
}
.main-sidebar-container {
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    // firefox隐藏滚动条
    scrollbar-width: none;
    // chrome隐藏滚动条
    &::-webkit-scrollbar {
        display: none;
    }

    position: relative;
    z-index: 1;
    width: $g-main-sidebar-width;
    color: $g-main-sidebar-menu-color;
    background-color: $g-main-sidebar-bg;
    .sidebar-logo {
        transition: 0.3s;
        background-color: $g-main-sidebar-bg;
    }
    .nav {
        width: inherit;
        .item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            height: 78px;
            padding: 0 5px;
            cursor: pointer;
            transition: all 0.3s;
            &:hover {
                color: $g-main-sidebar-menu-hover-color;
                background-color: $g-main-sidebar-menu-hover-bg;
            }
            &.active {
                color: $g-main-sidebar-menu-active-color;
                background-color: $g-main-sidebar-menu-active-bg;
            }
            .icon {
                width: 20px;
                hegiht:20px;
                margin: 8px auto;
                font-size: 24px;
            }
            span {
                text-align: center;
                font-size: 12px;
                @include text-overflow(1, false);
                font-weight: 300;
            }
            &.last-child{
                position: absolute;
                bottom:0;
                left:0;
                width: 100%;
            }
        }
    }
}
</style>
