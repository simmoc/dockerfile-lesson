<template>
    <div class="logo-content">
        <img :src="logo" alt="" class="logo-img">
    </div>

    <div class="setting">
        <div v-if="settingSuccess" class="setting-success">
            <div class="setting-success-title">
                实施配置成功！
            </div>
            <div class="setting-success-tip">
                客户链接已经生成，可复制链接发给客户
            </div>
            <div class="setting-success-link">
                {{ hostUrl }}/#/qrLogin
            </div>
            <el-button type="primary" style="width: 100%;" @click="copyC(hostUrl+'/#/qrLogin')">复制链接</el-button>
        </div>
        <page-main v-else class="setting-content">
            <div class="fs24 fwb c0">
                实施配置
            </div>
            <div v-if="!nextVisiable">
                <div class="pt24">
                    <CustomerTitle title="企业信息" />
                </div>
                <el-form ref="reform"
                         key="0"
                         :model="form"
                         label-width="120px"
                         label-position="top"
                         style="width: 520px;"
                         :rules="formRules"
                >
                    <el-form-item label="企业ID" required prop="corp_id">
                        <el-input v-model="form.corp_id" size="small" placeholder="请输入企业ID" />
                    </el-form-item>
                    <el-form-item label="客户联系Secret" required prop="customer_secret">
                        <el-input v-model="form.customer_secret" size="small" placeholder="请输入客户联系Secret" />
                    </el-form-item>
                    <el-form-item label="通讯录Secret" required prop="user_secret">
                        <el-input v-model="form.user_secret" size="small" placeholder="请输入通讯录Secret" />
                    </el-form-item>
                </el-form>
                <div class="mt24">
                    <!--                <el-button type="primary" style="width: 520px;" @click="goNext('before')">上一步</el-button>-->
                    <el-button type="primary" style="width: 520px;" @click="goNext">下一步</el-button>
                </div>
            </div>
            <div v-else>
                <div class="pt24">
                    <CustomerTitle title="应用信息" />
                </div>
                <el-form ref="otherRef"
                         key="1"
                         :model="form"
                         label-width="120px"
                         label-position="top"
                         style="width: 520px;"
                         :rules="formRules"
                >
                    <el-form-item label="AgentId" required prop="agent_id">
                        <el-input v-model="form.agent_id" size="small" placeholder="请输入应用AgentId" />
                    </el-form-item>
                    <el-form-item label="Secret" required prop="secret">
                        <el-input v-model="form.secret" size="small" placeholder="请输入应用Secret" />
                    </el-form-item>
                    <el-form-item label="应用主页" required>
                        <div class="flex flex-space-between">
                            <el-input v-model="form.app_index" size="small" class="flex-1 mr8" disabled
                                      placeholder="https://baidu.com/1Mhm3CZV9JrFT9unwIWy"
                            />
                            <el-button type="primary" plain size="small" @click="copyC(form.app_index)">复制</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="扫码登录回调域" required>
                        <div class="flex flex-space-between">
                            <el-input v-model="form.scan_login_redirect" size="small" class="flex-1 mr8" disabled
                                      placeholder="https://baidu.com/1Mhm3CZV9JrFT9unwIWy"
                            />
                            <el-button type="primary" plain size="small" @click="copyC(form.scan_login_redirect)">复制</el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <el-checkbox v-model="form.accomplish_app_config" @change="getCheck($event,'appConfigVisible')">已完成应用信息配置</el-checkbox>
                <div v-if="errorMsg.appConfigVisible" class="error-msg">请确认已完成配置</div>
                <div class="pt24">
                    <CustomerTitle title="设置网页授权及JS-SDK可信域名" />
                </div>
                <el-form :model="form" label-width="120px" label-position="top" style="width: 520px;">
                    <el-form-item label="OAuth2.0网页授权回调域名" required>
                        <div class="flex flex-space-between">
                            <el-input v-model="form.oauth2_domain" size="small" class="flex-1 mr8" disabled
                                      placeholder="https://baidu.com/1Mhm3CZV9JrFT9unwIWy"
                            />
                            <el-button type="primary" plain size="small" @click="copyC(form.oauth2_domain)">复制</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="调用JS-SDK、跳转小程序的可信域名" required>
                        <div class="flex flex-space-between">
                            <el-input v-model="form.js_sdk_domain" size="small" class="flex-1 mr8" disabled
                                      placeholder="https://baidu.com/1Mhm3CZV9JrFT9unwIWy"
                            />
                            <el-button type="primary" plain size="small" @click="copyC(form.js_sdk_domain)">复制</el-button>
                        </div>
                        <div class="flex flex-space-between mt8">
                            <el-input v-model="form.jump_applet_domain" size="small" class="flex-1 mr8" disabled
                                      placeholder="https://baidu.com/1Mhm3CZV9JrFT9unwIWy"
                            />
                            <el-button type="primary" plain size="small" @click="copyC(form.jump_applet_domain)">复制</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="校验域名文件" required>
                        <FileUpload :ext="['txt']" :max="1" @onSuccess="fileUploadOnSuccess" />
                        <div v-if="errorMsg.fileVisible" class="error-msg">请上传校验域名文件</div>
                        <!--                    <el-input v-model="form.name" size="small" />-->
                    </el-form-item>
                </el-form>
                <el-checkbox v-model="form.accomplish_trust_domain_config" @change="getCheck($event,'dominVisible')">已完成可信域名配置</el-checkbox>
                <div v-if="errorMsg.dominVisible" class="error-msg">请确认已完成配置</div>

                <div class="pt24">
                    <CustomerTitle title="配置到聊天工具栏" />
                </div>
                <el-form :model="form" label-width="120px" label-position="top" style="width: 520px;">
                    <el-form-item label="快捷发送" required>
                        <div class="flex flex-space-between mb8">
                            <el-input size="small" class="flex-1 mr8" disabled
                                      placeholder="快捷发送"
                            />
                            <el-button type="primary" plain size="small" @click="copyC('快捷发送')">复制</el-button>
                        </div>
                        <div class="flex flex-space-between">
                            <el-input v-model="form.chat_tool_quick_send" size="small" class="flex-1 mr8" disabled
                                      placeholder="https://baidu.com/1Mhm3CZV9JrFT9unwIWy"
                            />
                            <el-button type="primary" plain size="small" @click="copyC(form.chat_tool_quick_send)">复制</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="客户画像" required>
                        <div class="flex flex-space-between mb8">
                            <el-input size="small" class="flex-1 mr8" disabled
                                      placeholder="客户画像"
                            />
                            <el-button type="primary" plain size="small" @click="copyC('客户画像')">复制</el-button>
                        </div>
                        <div class="flex flex-space-between">
                            <el-input v-model="form.chat_tool_customer_portrait" size="small" class="flex-1 mr8" disabled
                                      placeholder="https://baidu.com/1Mhm3CZV9JrFT9unwIWy"
                            />
                            <el-button type="primary" plain size="small" @click="copyC(form.chat_tool_customer_portrait)">复制</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="微客群店" required>
                        <div class="flex flex-space-between mb8">
                            <el-input size="small" class="flex-1 mr8" disabled
                                      placeholder="微客群店"
                            />
                            <el-button type="primary" plain size="small" @click="copyC('微客群店')">复制</el-button>
                        </div>
                        <div class="flex flex-space-between">
                            <el-input v-model="form.chat_tool_weikequndian" size="small" class="flex-1 mr8" disabled
                                      placeholder="https://baidu.com/1Mhm3CZV9JrFT9unwIWy"
                            />
                            <el-button type="primary" plain size="small" @click="copyC(form.chat_tool_weikequndian)">复制</el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <el-checkbox v-model="form.accomplish_chat_tool_config" @change="getCheck($event,'chatVisible')">已完成聊天工具栏配置</el-checkbox>
                <div v-if="errorMsg.chatVisible" class="error-msg">请确认已完成配置</div>
                <div class="pt24">
                    <CustomerTitle title="客户联系接收消息服务器设置" />
                </div>
                <el-form :model="form" label-width="120px" label-position="top" style="width: 520px;">
                    <el-form-item label="URL" required>
                        <div class="flex flex-space-between">
                            <el-input v-model="form.customer_receive_message_url" size="small" class="flex-1 mr8" disabled
                                      placeholder="https://baidu.com/1Mhm3CZV9JrFT9unwIWy"
                            />
                            <el-button type="primary" plain size="small" @click="copyC(form.customer_receive_message_url)">复制</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="Token" required>
                        <div class="flex flex-space-between">
                            <el-input v-model="form.customer_receive_message_token" size="small" class="flex-1 mr8" disabled
                                      placeholder="https://baidu.com/1Mhm3CZV9JrFT9unwIWy"
                            />
                            <el-button type="primary" plain size="small" @click="copyC(form.customer_receive_message_token)">复制</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="EncodingAESKey" required>
                        <div class="flex flex-space-between">
                            <el-input v-model="form.customer_receive_message_aes_key" size="small" class="flex-1 mr8" disabled
                                      placeholder="https://baidu.com/1Mhm3CZV9JrFT9unwIWy"
                            />
                            <el-button type="primary" plain size="small" @click="copyC(form.customer_receive_message_aes_key)">复制</el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <el-checkbox v-model="form.accomplish_server_config" @change="getCheck($event,'serveVisible')">已完成服务器配置</el-checkbox>
                <div v-if="errorMsg.serveVisible" class="error-msg">请确认已完成配置</div>
                <div>
                    <el-checkbox v-model="form.setApplication" @change="getCheck($event,'setApplication')">已设置可调用应用</el-checkbox>
                    <div v-if="errorMsg.setApplication" class="error-msg">请确认已设置可调用应用</div>
                </div>
                <div class="mt24">
                    <el-button type="primary" style="width: 520px;" @click="onsubmit">完成配置</el-button>
                </div>
            </div>
        </page-main>
    </div>
</template>

<script setup>
import Http from '@/util/request'
import imgLogo from '@/assets/images/logo.png'
import { copy } from '@/util/index'
import FileUpload from '@/components/FileUpload/index.vue'
import { onMounted, ref } from 'vue'
import vxRule from '@/util/formValidate'
const form = ref({
    'corp_id': '', // 企业ID
    'customer_secret': '', // 客户联系Secret
    'user_secret': '', // 通讯录Secret
    'agent_id': '', // AgentId 应用id
    'secret': '', // Secret 应用秘钥
    'app_index': 'http://127.0.0.1', // 应用主页
    'scan_login_redirect': 'https://we-customer-api.dev.freshgood.cn/operation/qr_login/test', // 扫码登陆回调域
    'accomplish_app_config': 0, // 已完成应用信息配置 值为1
    'oauth2_domain': '127.0.0.1', // oauth2网页授权回调域名
    'js_sdk_domain': '127.0.0.1', // 调用js-sdk可信回调域名
    'jump_applet_domain': '127.0.0.1', // 跳转小程序可信回调域名
    'accomplish_trust_domain_config': 0, // 已完成可信域名配置 值为1
    'customer_receive_message_url': 'http://127.0.0.1/get_work_event', // 客户联系接收消息服务器设置
    'customer_receive_message_token': 'N3HYa1w94KLZnCS75iJfvDRls0BQdcpg', // 客户联系接收消息服务器token
    'customer_receive_message_aes_key': 'qExTXr6tZuA2jdWDkJzne9h8SVmiL4HF', // 客户联系接收消息服务器EncodingAESKey
    'accomplish_server_config': 0, // 已完成服务器配置 值为1
    'chat_tool_quick_send': 'http://127.0.0.1', // 聊天工具栏快捷发送
    'chat_tool_customer_portrait': 'http://127.0.0.1', // 聊天工具栏客户画像
    'chat_tool_weikequndian': 'http://127.0.0.1', // 聊天工具栏微客群店
    'accomplish_chat_tool_config': 0, // 已完成聊天工具栏配置
    'domain_check_file': '', // 域名校验文件名
    setApplication: 0
})
const reform = ref(null)
const otherRef = ref(null)
const logo = ref(imgLogo)
const copyC = ref(copy)
const settingSuccess = ref(false)
const route = useRoute()
const router = useRouter()
const formRules = ref({
    corp_id: [vxRule(true, '', 'blur', '企业ID不可为空')],
    customer_secret: [vxRule(true, '', 'blur', '客户联系Secret不可为空')],
    user_secret: [vxRule(true, '', 'blur', '通讯录Secret不可为空')],
    agent_id: [vxRule(true, '', 'blur', 'AgentId不可为空')],
    secret: [vxRule(true, '', 'blur', 'Secret不可为空')]
})
const errorMsg = reactive({
    appConfigVisible: false,
    domianVisible: false,
    serveVisible: false,
    chatVisible: false,
    fileVisible: false,
    setApplication: false

})
const hostUrl = ref('')
const nextVisiable = ref(false)
import { ElMessage } from 'element-plus'
onMounted(() => {
    settingSuccess.value = route.query.settingSuccess
    let origin = window.location.origin
    hostUrl.value = origin
})
const goNext = () => {
    reform.value.validate(valid => {
        if (valid) {
            Http.initializeAddFirst({
                corp_id: form.value.corp_id,
                customer_secret: form.value.customer_secret,
                user_secret: form.value.user_secret
            }).then(res => {
                if (res.code === 0) {
                    nextVisiable.value = true
                } else if (res.code === 1) {
                    nextVisiable.value = true
                }
            })
        }
    })
}
const getCheck = (e, type) => {
    if (e)errorMsg[type] = false
}
const fileUploadOnSuccess = data => {
    console.log(data)
    if (data) {
        form.value.domain_check_file = data.file_url
        errorMsg.fileVisible = false
    }
}
const getInit = async() => {
    let { data }  = await Http.initialize()
    form.value.app_index = data.app_index // 应用主页
    form.value.scan_login_redirect = data.scan_login_redirect // 扫码登录回调域
    form.value.oauth2_domain = data.oauth2_domain // oauth2网页授权回调域名
    form.value.js_sdk_domain = data.js_sdk_domain // 调用js-sdk可信回调域名
    form.value.jump_applet_domain = data.jump_applet_domain // 跳转小程序可信回调域名
    form.value.customer_receive_message_url = data.customer_receive_message_url // 客户联系接收消息服务器设置
    form.value.customer_receive_message_token = data.customer_receive_message_token // 客户联系接收消息服务器token
    form.value.customer_receive_message_aes_key = data.customer_receive_message_aes_key // 客户联系接收消息服务器EncodingAESKey
    form.value.chat_tool_quick_send = data.chat_tool_quick_send // 聊天工具栏快捷发送
    form.value.chat_tool_customer_portrait = data.chat_tool_customer_portrait // 聊天工具栏客户画像
    form.value.chat_tool_weikequndian = data.chat_tool_weikequndian // 聊天工具栏微客群店
    // form.value = data
    console.log(form)

}
const onsubmit = () => {
    errorMsg.appConfigVisible = false
    errorMsg.dominVisible = false
    errorMsg.serveVisible = false
    errorMsg.chatVisible = false
    errorMsg.fileVisible = false
    errorMsg.setApplication = false

    otherRef.value.validate(valid => {
        console.log('valid')
        console.log(form.value.domain_check_file)
        if (valid) {
            if (!form.value.accomplish_app_config) { errorMsg.appConfigVisible = true;return }
            if (!form.value.domain_check_file) { errorMsg.fileVisible = true;return }
            if (!form.value.accomplish_trust_domain_config) { errorMsg.dominVisible = true;return }
            if (!form.value.accomplish_server_config) { errorMsg.serveVisible = true;return }
            if (!form.value.accomplish_chat_tool_config) { errorMsg.chatVisible = true;return }
            if (!form.value.setApplication) { errorMsg.setApplication = true;return }
            addInitialize()
        }
    })
}
const addInitialize = async() => {
    if (form.value.accomplish_app_config === 1) {
        form.value.accomplish_app_config = true
    }
    if (form.value.accomplish_chat_tool_config === 1) {
        form.value.accomplish_chat_tool_config = true
    }
    if (form.value.accomplish_server_config === 1) {
        form.value.accomplish_server_config = true
    }
    if (form.value.accomplish_trust_domain_config === 1) {
        form.value.accomplish_trust_domain_config = true
    }
    let res = await Http.addInitialize({ ...form.value })
    if (res.code === 0) {
        ElMessage.success('操作成功')
        setTimeout(() => {
            router.push({ name: router.name, query: { settingSuccess: true } })
        }, 500)
    }
}
const accomplishInit = async() => {
    let { data } = await Http.accomplishInit()
    if (data.accomplish_app_config) {
        router.replace({ name: router.name, query: { settingSuccess: true } })
    }
}
watch(route, to => {
    settingSuccess.value = to.query.settingSuccess
})
getInit()
accomplishInit()
</script>

<style lang="scss" scoped>
.setting {
    background-color: #f5f5f5;
    padding: 12px 216px;
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
    border-radius: 6px;
    color: #262626;
    margin: 318px auto;
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
    .el-form-item{
        margin-bottom: 10px;
    }
    .error-msg{
        color: var(--el-color-danger);
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
    }

</style>
