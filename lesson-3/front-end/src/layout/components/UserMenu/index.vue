<template>
    <div class="user">
        <el-dropdown class="user-container" @command="userCommand">
            <div class="user-wrapper">
                <el-avatar :size="24" :src="$store.state.user.qw_avatar">
                    <i v-if="!$store.state.user.qw_avatar" class="el-icon-user-solid" />
                </el-avatar>
                {{ $store.state.user.username }}
                <i class="el-icon-caret-bottom" />
            </div>
            <template #dropdown>
                <el-dropdown-menu class="user-dropdown">
                    <el-dropdown-item v-if="$store.state.settings.enableDashboard" command="dashboard">控制台</el-dropdown-item>
                    <!--                    <el-dropdown-item command="setting">个人设置</el-dropdown-item>-->
                    <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup>
import screenfull from 'screenfull'

// const reload = inject('reload')
const store = useStore()
const router = useRouter()

const isFullscreenEnable = computed(() => screenfull.isEnabled)
const isFullscreen = ref(false)

onMounted(() => {
    if (isFullscreenEnable.value) {
        screenfull.on('change', fullscreenChange)
    }
})
onBeforeUnmount(() => {
    if (isFullscreenEnable.value) {
        screenfull.off('change', fullscreenChange)
    }
})

// function fullscreen() {
//     screenfull.toggle()
// }
function fullscreenChange() {
    isFullscreen.value = screenfull.isFullscreen
}
function userCommand(command) {
    switch (command) {
        case 'dashboard':
            router.push({
                name: 'dashboard'
            })
            break
        // case 'setting':
        //     router.push({
        //         name: 'personalSetting'
        //     })
        //     break
        case 'logout':
            store.dispatch('user/logout').then(() => {
                router.push({
                    name: 'qrLogin'
                })
            })
            break
    }
}
// function pro() {
//     window.open(`https://hooray.${location.origin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin/vue3/pro`, 'top')
// }
</script>

<style lang="scss" scoped>
.user {
    display: flex;
    align-items: center;
    padding: 0 20px;
    white-space: nowrap;
}
.tools {
    margin-right: 20px;
    .item {
        margin-left: 5px;
        padding: 6px 8px;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
        vertical-align: middle;
        transition: all 0.3s;
    }
    .item-pro {
        display: inline-block;
        transform-origin: right center;
        animation: pro-text 3s ease-out infinite;
        @keyframes pro-text {
            0%,
            20% {
                transform: scale(1);
            }
            50%,
            70% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }
        .title {
            padding-left: 5px;
            font-weight: bold;
            font-size: 14px;
            background-image: linear-gradient(to right, #ffa237, #fc455d);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }
}
:deep(.user-container) {
    display: inline-block;
    height: 48px;
    line-height: 48px;
    cursor: pointer;
    .user-wrapper {
        color:#fff;
        font-size: 14px;
        .el-avatar {
            vertical-align: middle;
            margin-top: -2px;
            margin-right: 4px;
        }
    }
}
    .user-dropdown{
        padding: 0 !important;
        .el-dropdown-menu__item--divided{
            border-top:none !important;
            margin-top: 0 !important;
        }
    }
</style>
