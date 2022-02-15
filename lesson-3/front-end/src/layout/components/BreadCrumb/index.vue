<template>
    <div class="custormer-breadcrumb">
        <el-breadcrumb v-if="$store.state.settings.enableBreadcrumb && $store.state.settings.mode === 'pc'"
                       separator="/"
        >
            <transition-group name="breadcrumb">
                <template v-for="(item, index) in breadcrumbList">
                    <el-breadcrumb-item v-if="index < breadcrumbList.length - 1" :key="item.path"
                                        :to="pathCompile(item.path)"
                    >
                        {{ item.title }}
                    </el-breadcrumb-item>
                    <el-breadcrumb-item v-else :key="item.path">
                        {{ item.title }}
                    </el-breadcrumb-item>
                </template>
            </transition-group>
        </el-breadcrumb>
    </div>
</template>

<script setup>
import { deepClone } from '@/util'
import { compile } from 'path-to-regexp'
const store = useStore()
const route = useRoute()
const breadcrumbList = computed(() => {
    let breadcrumbList = []
    if (store.state.settings.enableDashboard) {
        breadcrumbList.push({
            path: '/dashboard',
            title: store.state.settings.dashboardTitle
        })
    }
    if (route.meta.breadcrumbNeste) {
        console.log(route.meta.breadcrumbNeste)
        let length = route.meta.breadcrumbNeste.length
        route.meta.breadcrumbNeste.map((item, index) => {
            let tmpItem = deepClone(item)
            if (index != 0) {
                tmpItem.path = `${route.meta.breadcrumbNeste[0].path}/${item.path}`
            }
            if (index === 0) {
                breadcrumbList.push({ path: `${item.parentUrl}`, title: item.parent })
            }
            if (index !== length - 1 && item.title !== route.meta.breadcrumbNeste[length - 1].title) {
                breadcrumbList.push(tmpItem)
            }
            if (index === length - 1) {
                breadcrumbList.push(tmpItem)
            }

        })
        console.log('bread', route.meta.breadcrumbNeste)
    }
    return breadcrumbList
})

function pathCompile(path) {
    let toPath = compile(path)
    return toPath(route.params)
}
</script>

<style scoped lang="scss">
    .custormer-breadcrumb {
        padding-left: 24px;
    }
</style>
