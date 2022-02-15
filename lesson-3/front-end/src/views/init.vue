<template>
    <div class="qr-login">
        <div class="setting">
            <div class="setting-success">
                <div class="setting-success-title">
                    {{ loading?'系统初始化中…':(disabled?'系统初始化中':'系统初始化成功') }}
                </div>
                <div class="mb24 setting-item">
                    <div>
                        <i class="icon" :class="filterStatus(form.init_department.status)" />
                        <span>同步组织架构</span>
                    </div>
                    <div v-if="form.init_department.status==1" class="flex-1 tr">
                        {{ form.init_department.msg }}
                    </div>
                </div>
                <div class="mb24 setting-item">
                    <div>
                        <i class="icon" :class="filterStatus(form.init_customer.status)" />
                        <span>同步客户</span>
                    </div>
                    <div v-if="form.init_customer.status==1" class="flex-1 tr">
                        {{ form.init_customer.msg }}
                    </div>
                </div>
                <div class="mb24 setting-item">
                    <div>
                        <i class="icon" :class="filterStatus(form.init_group.status)" />
                        <span>同步群数据</span>
                    </div>
                    <div v-if="form.init_group.status==1" class="flex-1 tr">
                        {{ form.init_group.msg }}
                    </div>
                </div>
                <div class="mb24">
                    <i class="icon" :class="filterStatus(form.init_content.status)" />
                    <span>初始化内容库</span>
                </div>
                <div class="mb24">
                    <i class="icon" :class="filterStatus(form.init_content_group.status)" />
                    <span>初始话内容库分组</span>
                </div>
                <div class="mb24">
                    <i class="icon" :class="filterStatus(form.init_follow_type.status)" />
                    <span>初始化跟进记录类型</span>
                </div>
                <div class="mb24">
                    <i class="icon" :class="filterStatus(form.init_setting_content.status)" />
                    <span>初始化跟进记录文本</span>
                </div>
                <div class="mb24">
                    <i class="icon" :class="filterStatus(form.init_trigger_type.status)" />
                    <span>初始化触达类型</span>
                </div>
                <!--            <div class="mb24">-->
                <!--                <i class="icon" :class="filterStatus(form.init_member.status)" />-->
                <!--                <span>初始化标签</span>-->
                <!--            </div>-->
                <div class="mt24 flex flex-justify-between">
                    <el-button :disabled="!disabled" type="primary" class="icon-btn mr60" plain icon="el-icon-refresh" @click="doInit">重新初始化</el-button>
                    <el-button type="primary" :disabled="disabled" class="icon-btn" @click="goTo">开启微客之旅</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import imgLogo from '@/assets/images/logo.png'
import Http from '@/util/request'
import store from '@/store'
import { ElMessage } from 'element-plus'
// import { ElMessage } from 'element-plus'
// import { setItem } from '@/util/storage'

export default {
    name: 'Login',
    data() {
        return {
            form: {},
            imgLogo: imgLogo,
            showSuccess: false,
            disabled: false,
            loading: false,
            timer: null,
            accomplishInitData: {}
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    created() {
        this.doInit()
    },
    methods: {
        async accomplishInit() {
            let res = await Http.accomplishInit()
            if (res.code === 0) {
                this.accomplishInitData = res.data
                store.commit('user/setInit', res.data)
            }
        },
        goTo() {
            clearInterval(this.timer)
            setTimeout(() => {
                store.dispatch('user/getMenus').then(data => {
                    if (data.length === 0) {
                        ElMessage.error('暂无页面权限，请管理员配置权限')
                    } else {
                        ElMessage.success('登录成功')
                        store.dispatch('user/getSubjectName').then(() => {
                            this.$router.push('/')
                        })
                    }

                })
            }, 500)

        },
        async doInit() {
            clearInterval(this.timer)
            this.loading = true
            await Http.doInit().finally(() => {
                this.loading = false
            })
            this.initStatus()
            this.timer = setInterval(() => {
                this.initStatus()
            }, 5000)

        },
        async initStatus() {
            let res = await Http.initStatus()
            this.form = res.data
            let i = 1
            for (let key in this.form) {
                i = i && this.form[key].status
            }
            this.disabled = i === 0
            if (!this.disabled) {
                console.log('accomplishInit 开始')
                this.accomplishInit()
            }
        },
        filterStatus(status) {
            let className = ''
            switch (status) {
                case 0: className = 'el-icon-refresh';break
                case 1: className = 'el-icon-circle-check';break
                case 2: className = 'el-icon-circle-close';break
            }
            return className
        }
    }
}
</script>

<style lang="scss" scoped>
.setting {
    padding-top: 130px;
}
.logo-content {
    padding: 9px 240px;
}
.logo-img {
    width: 85px;
    height: 30px;
}
.el-form-item {
    margin-bottom: 0;
}
.setting-success {
    width: 560px;
    background-color: #fff;
    padding: 56px 40px;
    border-radius: 4px;
    color: #262626;
    margin: 0 auto;
    box-shadow: 0 20px 50px 20px rgba(23,115,250,0.10);
    .setting-success-title {
        text-align: center;
        padding-bottom: 24px;
        font-size: 24px;
    }
    .setting-success-tip,
    .setting-success-link {
        font-size: 14px;
    }
    .setting-success-link {
        border: 1px solid #d9d9d9;
        padding: 5px 12px;
        margin-top: 8px;
        margin-bottom: 48px;
    }
}
.icon {
    margin-right: 10px;
    font-size:19px;
    vertical-align: middle;
}
.el-icon-refresh {
    color: #1773fa;
    animation: rotating 2s linear infinite;
}
.el-icon-circle-check {
    color: #52c41a;
}
.el-icon-circle-close {
    color: #ff4d4f;
}
.icon-btn{
    width: 240px;
}
.setting-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .flex-1.tr{
        color:#8C8C8C;
    }
}
.qr-login{
    width: 100%;
    height: 100vh;
    background: url("../assets/images/login_bg.png") no-repeat center center;
    background-size: 100% 100%;
}
</style>
