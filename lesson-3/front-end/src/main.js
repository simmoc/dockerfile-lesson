import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import store from './store'
app.use(store)

import router from './router'
app.use(router)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import locale from 'element-plus/lib/locale/lang/zh-cn'

app.use(ElementPlus, {
    locale,
    size: store.state.settings.elementSize
})

import globalProperties from '@/util/global.properties'
globalProperties(app)

// 自定义指令
import directive from '@/util/directive'
directive(app)

// 加载 svg 图标
import 'virtual:svg-icons-register'

// 页面单独样式
import '@/assets/styles/compontent/task-element-variables.scss'
// 全局样式
import '@/assets/styles/globals.scss'
// 重置样式
import '@/assets/styles/base.scss'
import '@/assets/styles/element-variables.scss'

// 日程插件样式
import '@/assets/styles/calendar.scss'

app.mount('#app')
