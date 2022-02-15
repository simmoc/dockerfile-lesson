<template>
    <div class="qr-login">
        <div v-if="settingAdmin" class="setting">
            <div class="setting-admin">
                <div class="fs36 mb40 title-color">
                    确认 {{ loginData.username }} 成为超级管理员？
                </div>
                <div class="fs24 mb40 text-color">
                    确认后，当前企业微信账号将成为超级管理员
                </div>
                <div class="">
                    <el-button style="width: 240px" @click="cancelSetAdmin">取消</el-button>
                    <el-button type="primary" style="width: 240px" @click="setAdmin">确定</el-button>
                </div>
            </div>
        </div>
        <div v-if="settingSubject" class="setting">
            <div class="setting-admin">
                <div class="fs36  mb40 title-color">
                    设置客户称呼
                </div>
                <div class="fs24 mb40 text-color">
                    需要您填写客户称呼用于配置后台或企微导购端的 客户相关页面配置，比如物业称客户为“业主”， 中介称租户为“租客”
                </div>
                <el-input v-model="subject" class="mb40" maxlength="5"
                          show-word-limit
                />
                <el-button type="primary" style="width: 100%" @click="startInit">开始初始化</el-button>
            </div>
        </div>

        <div v-if="!settingAdmin&&!settingSubject" class="login-form">
            <div class="flex ">
                <div class="login-bg-left">
                    <img src="@/assets/images/login-logo.png" alt="" class="logo-img">
                    <div class="login-title">
                        欢迎登录，微客SCRM
                    </div>
                    <div class="fs14 fw300">
                        基于企业微信的私域流量运营平台
                    </div>
                    <div class="login-content-list">
                        <div class="login-content">
                            <img src="@/assets/images/login-icon01.png" alt="" width="50" height="50">
                            <div>
                                <p class="fs18 fwb mb8">全渠道获客</p>
                                <p class="fs14 fw400 c9">多业务场景引流获客</p>
                            </div>
                        </div>
                        <div class="login-content">
                            <img src="@/assets/images/login-icon02.png" alt="" width="50" height="50">
                            <div>
                                <p class="fs18 fwb mb8">客户标签</p>
                                <p class="fs14 fw400 c9">洞察客户真实诉求</p>
                            </div>
                        </div>
                        <div class="login-content">
                            <img src="@/assets/images/login-icon03.png" alt="" width="50" height="50">
                            <div>
                                <p class="fs18 fwb mb8">运营转化</p>
                                <p class="fs14 fw400 c9">提升客户运营效率</p>
                            </div>
                        </div>
                        <div class="login-content">
                            <img src="@/assets/images/login-icon04.png" alt="" width="50" height="50">
                            <div>
                                <p class="fs18 fwb mb8">分析洞察</p>
                                <p class="fs14 fw400 c9">以数据驱动运营</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="qr-content">
                    <div v-if="componyList && componyList.length > 1" class="compony-box flex flex-align-center mb12">
                        <div class="c55flex-g0 flex-s0">选择企业：</div>
                        <el-select 
                            v-model="selectIndex"
                            placeholder="请选择企业"
                            class="width-class flex-g1 flex-s1"
                            size="small"
                            @change="ComponyChage"
                        >
                            <!-- <el-option label="事件" value="1" />
                                    <el-option label="手写" value="2" />
                                    <el-option label="其他" value="3" /> -->
                            <el-option v-for="(item, index) in componyList" :key="index" :label="item.name" :value="index" />
                        </el-select>
                    </div>
                    <div class="fs18 fwb c0">
                        {{ admin?'企业微信扫码登录':'设置超级管理员' }}
                    </div>
                    <div class="qr-code">
                        <div id="wx_reg" />
                    </div>
                    <div class="fs14 text-color fw300">
                        <div>
                            打开<span class="color-primary">企业微信</span>扫描二维码
                        </div>
                        点击『首页』-『添加』-『扫一扫』
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import store from '@/store'
import Http from '@/util/request'
const admin = ref(true)
const param = ref({})
const route = useRoute()
const router = useRouter()
const settingAdmin = ref(false)
const settingSubject = ref(false)
let loginData = reactive({})
const subject = ref('')
const accomplishInitData = ref({})
const admin_token = ref('')
// 微信会随机重定向两次
const redirectTime = ref(1)
const selectCompony = ref({})
const selectIndex = ref(0)
const componyList = ref([])
const loginParams = ref({})

import { removeItem, setItem } from '@/util/storage'
onMounted(() => {
    store.commit('user/removeMenus')
    removeItem('token')
})

const getComponyList = async() => {
    try {
        const { data } = await Http.getloginComponys()
        componyList.value = data.list || []
        selectIndex.value = 0
        selectCompony.value = componyList.value[0]

    } finally {
        getLoginParam()
    }
}

const ComponyChage = index => {
    selectCompony.value = componyList.value[index - 0]
    // 去除前一次登陆可能留下的参数
    router.push({ query: {} })
    
    // console.log('选中下标', index, selectCompony.value)
    getLoginParam()
}

const getLoginParam = async() => {
    // let { data } = await Http.getLoginParam()
    // param.value = data
    if (selectCompony.value.agentid) {
        param.value = selectCompony.value
    } else {
        let { data } = await Http.getLoginParam()
        param.value = data
    }
    // console.log('选中公司', selectCompony.value.origin, param.value)
    // TODO::zjm redirect_uri修改
    // let href = window.location.href
    // 将配置参数注入登录参数
    loginParams.value.appid = param.value.appid
    loginParams.value.agentid = param.value.agentid
    loginParams.value.type = param.value.type
    
    let origin = window.location.origin
    new window.WwLogin({
        'id': 'wx_reg',
        'appid': param.value.appid,
        'agentid': param.value.agentid,
        'redirect_uri': encodeURIComponent(origin + '/#/qrLogin?connect_redirect=1'),
        'state': param.value.state,
        'href': origin + '/qrload.css',
        'lang': 'zh'
    })
}
const initializeAdmin = async() => {
    let { data }  = await Http.initializeAdmin()
    admin.value = data.admin
}
const accomplishInit = async() => {
    let { data } = await Http.accomplishInit()
    accomplishInitData.value = data
}
accomplishInit()
// const qrLogin = async(code, state) => {
const qrLogin = async params => {
    let res = await Http.qrLogin(params, [], true)
    // 每次都询问下是否设置过管理员
    let { data }  = await Http.initializeAdmin()
    // 每次都询问下是否完成初始化配置
    let status = await Http.accomplishInit()
    accomplishInitData.value = status.data
    admin.value = data.admin
    if (res.code === 0) {
        if (!admin.value) { // 还没设置管理员
            settingAdmin.value = true
            loginData = res.data
            getAdminToken()
            store.commit('user/setUserData', loginData)
        } else if (!accomplishInitData.value.accomplish_init_subject) { // 未设置主体
            settingSubject.value = true
            loginData = res.data
            store.commit('user/setUserData', loginData)
        } else if (!accomplishInitData.value.accomplish_init) {
            // 未初始化
            loginData = res.data
            store.commit('user/setUserData', loginData)
            router.push({ path: '/init' })

        } else {
            store.commit('user/setUserData', { ...res.data, ...accomplishInitData.value })
            store.dispatch('user/getMenus').then(data => {
                if (data.length === 0) {
                    ElMessage.error('暂无页面权限，请管理员配置权限')
                    // 清除登录参数
                    router.push({ query: {} })
                    redirectTime.value = 1
                } else {
                    ElMessage.success('登录成功')
                    store.dispatch('user/getSubjectName').then(() => {
                        router.push({ path: route.query.redirect || '/' })
                    })
                }

            })
        }
    } else { // 登录失败的其他情况
        // 清除登录参数
        router.push({ query: {} })
        redirectTime.value = 1
    }
}
const getAdminToken = async() => {
    let { data } = await Http.getAdminToken()
    admin_token.value = data
}
const goTo = (name, query) => {
    router.push({ name, query })
}
const cancelSetAdmin = () => {
    redirectTime.value = 1
    settingAdmin.value = false
    router.push({ name: 'qrLogin' })
    getLoginParam()
}
const setAdmin = async() => {
    let res = await Http.setAdmin({ qw_userid: loginData.qw_userid, admin_token: admin_token.value }, [], true)
    if (res.code === 0) {
        settingSubject.value = true
        settingAdmin.value = false
    }
}
const startInit = async() => {
    let res = await Http.addSubject({ subject: subject.value }, [], true)
    if (res.code === 0) goTo('init')
}
watch(route, to => {
    console.log('before', redirectTime.value)
    if (to.query.code && to.query.state && redirectTime.value == 1) {

        loginParams.value.code = to.query.code
        loginParams.value.state = to.query.state
        qrLogin(loginParams.value)
        
        setItem('code', to.query.code)
        setItem('state', to.query.state)
        redirectTime.value++
        console.log('after', redirectTime.value)
    }

})
getComponyList()
// getLoginParam()
initializeAdmin()
</script>

<style lang="scss" scoped>
    .setting{
       padding-top: 130px;
    }
    .qr-login{
        width: 100%;
        height: 100vh;
        background: url("../assets/images/login_bg.png") no-repeat center center;
        background-size: 100% 100%;
    }
    .logo-content {
        padding: 9px 240px;
    }
    .login-form {
        width: 1200px;
        height: 600px;
        padding: 48px 70px;
        background-color: transparent;
        box-shadow: 5px 10px 20px 0px rgba(4,46,109,0.19);
        border-radius: 8px;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .login-bg-left{
        flex:1;
    }
    .logo-img {
        width: 103px;
        height: 40px;
        margin-bottom: 64px;
    }
    .qr-content{
        margin-top: 22px;
        // height: 460px;
        height: 495px;
        text-align: center;
        background-color: #fff;
        padding: 32px 44px;
        border-radius: 8px;
        box-shadow: 5px 10px 20px 0 rgba(4,46,109,0.33);

        .compony-box {
            box-sizing: border-box;
            width: 282px;
        }

    }
    .qr-code{
        width: 282px;
        height:282px;
        border: 1px solid $customer-border-color;
        border-radius: 2px;
        padding: 12px;
        margin-top: 22px;
        margin-bottom: 22px;
        #wx_reg{
            width: 258px;
            height:258px;

        }
    }
    .setting-admin{
        text-align: center;
        width: 700px;
        padding:80px;
        background-color: #fff;
        margin: 127px auto;
        box-shadow: 0 20px 50px 20px rgba(23,115,250,0.10);
        border-radius: 4px;
    }
    .login-title{
        font-size: 24px;
        color:#171717;
        margin-bottom: 12px;
    }
    .login-content-list{
        display: flex;
        flex-wrap: wrap;
        margin-top: 76px;
        width: 548px;
    }
    .login-content{
        background-image: linear-gradient(0deg,#fff,#f3f5f8);
        border: 2px solid #fff;
        box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 10%), -8px -8px 20px 0 #fff;
        border-radius: 4px;
        box-sizing: border-box;
        width: 250px;
        height: 98px;
        margin-right: 24px;
        margin-bottom: 24px;
        padding: 24px;
        display: flex;
        align-items: center;
        img{
            margin-right: 16px;
        }
    }

</style>
