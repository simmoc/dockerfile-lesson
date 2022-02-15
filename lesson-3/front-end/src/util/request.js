import axios from 'axios'
import service from '@/api/requestApi'
import store from '@/store'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
let instance = axios.create({
    // 设置默认根地址 和vue2  process.env.XXX不一样，可以查看vite官网
    baseURL: import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true' ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL
    // 设置请求超时设置
    // timeout: 60000,
})

const Http = {}  // 包裹请求方法的容器
// 用于存储目前状态为pending的请求标识信息
// let pendingRequest = []
// // 取消请求-请求拦截中的处理
// const CancelToken = config => {
//     // 区别请求的唯一标识，这里用方法名+请求路径
//     const requestMark = `${config.method} ${config.url}`
//     // 找当前请求的标识是否存在pendingRequest中，即是否重复请求了
//     const markIndex = pendingRequest.findIndex(item => {
//         return item.name === requestMark
//     })
//     // 存在，即重复了
//     if (markIndex > -1) {
//         // 取消上个重复的请求
//         pendingRequest[markIndex].cancel()
//         // 删掉在pendingRequest中的请求标识
//         pendingRequest.splice(markIndex, 1)
//     }
//     // （重新）新建针对这次请求的axios的cancelToken标识
//     const CancelToken = axios.CancelToken
//     const source = CancelToken.source()
//     config.cancelToken = source.token
//     // 设置自定义配置requestMark项，主要用于响应拦截中
//     config.requestMark = requestMark
//     // 记录本次请求的标识
//     pendingRequest.push({
//         name: requestMark,
//         cancel: source.cancel
//     })
//     return config
// }
// // 取消请求-响应拦截中的处理
// const CancelTokenResponse = config => {
//     // 根据请求拦截里设置的requestMark配置来寻找对应pendingRequest里对应的请求标识
//     const markIndex = pendingRequest.findIndex(item => {
//         return item.name === config.requestMark
//     })
//     // 找到了就删除该标识
//     markIndex > -1 && pendingRequest.splice(markIndex, 1)
// }
// 拦截器的添加
instance.interceptors.request.use(config => {
    // 发起请求前做些什么
    // CancelToken(config)
    let token = store.state.user.token
    // let token = ''
    if (token) {
        config.headers.token = token
    }
    return config
}, () => {
    // 请求错误
})
// 请求格式or参数的统一
for (let key in service) {
    let api = service[key] // url method
    // async 作用：避免进入回调地狱
    Http[key] = async function(
        params, // 请求参数get:url,put,post,patch(data),delete:url
        restfulParams = [], // 请求接口风格是restful的风格的，就需要单独传值加在apiUrl后面
        isFormData = false, // 标识是否是from-data请求
        config = {} // 配置参数
    ) {
        let newParams = {}
        // content-type是否是from-data的判断
        if (params && isFormData) {
            newParams = new FormData()
            for (let i in params) {
                newParams.append(i, params[i])
            }
        } else {
            newParams = params
        }
        // 不同请求的判断
        let response = {} // 请求的返回值
        if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
            try {
                response = await instance[api.method](`${api.url + (restfulParams.length > 0 ? '/' : '') + restfulParams.join('/')}`, newParams, config)
            } catch (e) {
                response = e
            }
        } else if (api.method === 'delete' || api.method === 'get') {
            config.params = newParams
            try {
                response = await instance[api.method](`${api.url + (restfulParams.length > 0 ? '/' : '') + restfulParams.join('/')}`, config)
            } catch (e) {
                response = e
            }
        }
        return response // 返回请求的响应值
    }
}

// 响应拦截器
instance.interceptors.response.use(res => {
    // CancelTokenResponse(res.config)
    // 请求成功
    if (res.data.code !== 0 && res.data.code !== 200) {
        ElMessage.error(res.data.errmsg || res.data.msg)
        // 手动返回异常,就不会执行下面的代码，可以通过finally来执行后面的操作
        return Promise.reject(res.data)
    } else if (res.data.code === 401 || res.data.code === 402) {
        ElMessage.error(res.data.errmsg || res.data.msg)
        router.push('/qrLogin')
        // 手动返回异常,就不会执行下面的代码，可以通过finally来执行后面的操作
        return Promise.reject(res.data)
    } else {
        return res.data
    }

}, err => {
    console.log(err)
    // 请求错误
})

export default Http
