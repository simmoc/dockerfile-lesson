import store from '@/store'
import { ElMessage } from 'element-plus'
import moment from 'moment'
export function deepClone(target) {
    // 定义一个变量
    let result
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
        // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = [] // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
            // 判断如果当前的值是null的话；直接赋值为null
        } else if (target === null) {
            result = null
            // 判断如果当前的值是一个RegExp对象的话，直接赋值
        } else if (target.constructor === RegExp) {
            result = target
        } else {
            // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {}
            for (let i in target) {
                result[i] = deepClone(target[i])
            }
        }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target
    }
    // 返回最终结果
    return result
}

function hasPermission(permission) {
    if (store.state.settings.enablePermission) {
        return store.state.user.permissions.some(v => {
            return v === permission
        })
    } else {
        return true
    }
}

export function auth(value) {
    let auth
    if (typeof value === 'string') {
        auth = hasPermission(value)
    } else {
        auth = value.some(item => {
            return hasPermission(item)
        })
    }
    return auth
}

export function authAll(value) {
    const auth = value.every(item => {
        return hasPermission(item)
    })
    return auth
}
/**
 *
 * 复制函数
 * @param data 要复制的内容
 *
 * */
export function copy(data) {
    let url = data
    let oInput = document.createElement('input')
    oInput.value = url
    document.body.appendChild(oInput)
    oInput.select() // 选择对象;
    document.execCommand('Copy') // 执行浏览器复制命令
    ElMessage({
        message: '复制成功',
        type: 'success'
    })
    oInput.remove()
}
export function formatDate(date, fmt) { // author: meizz 
    var o = {
        'M+': date.getMonth() + 1, // 月份 
        'd+': date.getDate(), // 日 
        'h+': date.getHours(), // 小时 
        'm+': date.getMinutes(), // 分 
        's+': date.getSeconds(), // 秒 
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度 
        'S': date.getMilliseconds() // 毫秒 
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    return fmt
}

/**
 *
 * 拼接年月日时分秒
 * @return  时间格式为2021-10-09 14:26:12
 *
 * */
export const timestampToTime = () => {
    const date = new Date() // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const Y = date.getFullYear() + '-'
    const M =
        (date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1) + '-'
    const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    const h =
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    const m =
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    const strDate = Y + M + D + h + m + s
    return strDate
}
/**
*
* 函数节流防抖
* @param action 要防抖的函数
* @param delay 延迟多少毫秒
*
* */
export const bounce = function(action, delay = 300) {
    let timer
    return function(...arg) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            action.apply(this, arg)
        }, delay)
    }
}
/**
     *
     * @param  String type 时间类型 day week month
     * @param array rule_data  时间规则
     * @param string format  时间格式
     * @param rule_per_circle 日、月input输入时间间隔
     * @param rule_data 周、月选择时间
     * @param begin_time 任务开始时间
     * @return array 按规则取的时间
     */
export const getRuleDatetime = function(type, rule_per_circle, rule_data, begin_time, format) {
    // console.log('111111', begin_time)
    var result_datetime_array = []
    let reg = /^\+?[1-9][0-9]*$/
    if (begin_time == '') {
        ElMessage.warning({
            message: '任务开始时间未填写，请填写任务开始时间!'
        })
        return
    }
    console.log('正则测试', reg.test(rule_per_circle))
    if (!reg.test(rule_per_circle) && rule_per_circle != '') {
    // if (rule_per_circle < 1 && rule_per_circle != '') {
        ElMessage.warning({
            message: '请填写正确间隔时长!'
        })
        return
    }
    switch (type) {
        case 'DAY':
        {
            for (let i = 0; i < 50; i++) {
                let timeItem = moment(begin_time).add(i * rule_per_circle, 'day').format(format)
                timeItem = timeItem.replace(/\s[\S]+\s/, function(res) {
                    switch (res) {
                        case ' Monday ': return ' 星期一 '
                        case ' Tuesday ': return ' 星期二 '
                        case ' Wednesday ': return ' 星期三 '
                        case ' Thursday ': return ' 星期四 '
                        case ' Friday ': return ' 星期五 '
                        case ' Saturday ': return ' 星期六 '
                        case ' Sunday ': return ' 星期日 '
                    }
                })
                
                let obj = {
                    label: timeItem,
                    value: moment(begin_time).add(i * rule_per_circle, 'day').format('YYYY-MM-DD HH:mm:ss')
                }
                result_datetime_array[i] = obj
            }
            break
        }
        case 'WEEK':
        {
            let j = 0
            let count = 0
            if (!rule_data[0]) {
                return
            }
            do {
                rule_data.some(value => {
                    if (count < 50) {
                        // console.log('时间', new Date(begin_time) / 1000 - 1 > moment(moment(begin_time).add(j, 'weeks').weekday(value).format('YYYY-MM-DD HH:mm:ss')).unix() - 1)
                        if (new Date(begin_time) / 1000 - 1 > moment(moment(begin_time).add(j, 'weeks').weekday(value).format('YYYY-MM-DD HH:mm:ss')).unix() - 1) {
                            count--
                            result_datetime_array.splice(0, 1)
                            return
                        }
                        let timeItem = moment(begin_time).add(j, 'weeks').weekday(value).format(format)
                        timeItem = timeItem.replace(/\s[\S]+\s/, function(res) {
                            switch (res) {
                                case ' Monday ': return ' 星期一 '
                                case ' Tuesday ': return ' 星期二 '
                                case ' Wednesday ': return ' 星期三 '
                                case ' Thursday ': return ' 星期四 '
                                case ' Friday ': return ' 星期五 '
                                case ' Saturday ': return ' 星期六 '
                                case ' Sunday ': return ' 星期日 '
                            }
                        })
                        let obj = {
                            label: timeItem,
                            value: moment(begin_time).add(j, 'weeks').weekday(value).format('YYYY-MM-DD HH:mm:ss')
                        }
                        result_datetime_array.push(obj)
                        count++
                    }
                })
                j++
            } while (result_datetime_array.length < 50)
            break
        }
        case 'MONTH':
        {
            let i = 0
            let count2 = 0
            if (!rule_data[0]) {
                return
            }
            do {
                rule_data.some(value => {
                    if (count2 < 50) {
                        if (new Date(begin_time) / 1000 - 1 > moment(moment(begin_time).add(i * rule_per_circle, 'months').date(value).format('YYYY-MM-DD HH:mm:ss')).unix() - 1) {
                            count2--
                            result_datetime_array.splice(0, 1)
                            return
                        }
                        // console.log('valuevaluevalue', value, i)
                        let timeItem = moment(begin_time).add(i * rule_per_circle, 'months').date(value).format(format)
                        timeItem = timeItem.replace(/\s[\S]+\s/, function(res) {
                            switch (res) {
                                case ' Monday ': return ' 星期一 '
                                case ' Tuesday ': return ' 星期二 '
                                case ' Wednesday ': return ' 星期三 '
                                case ' Thursday ': return ' 星期四 '
                                case ' Friday ': return ' 星期五 '
                                case ' Saturday ': return ' 星期六 '
                                case ' Sunday ': return ' 星期日 '
                            }
                        })
                        let obj = {
                            label: timeItem,
                            value: moment(begin_time).add(i * rule_per_circle, 'months').date(value).format('YYYY-MM-DD HH:mm:ss')
                        }
                        result_datetime_array.push(obj)
                        count2++
                    }
                })
                i++
            } while (result_datetime_array.length < 50)
            break
        }
    }
    return result_datetime_array
}

/**
*
* 获取字符串的长度
* @param str 字符串
*
* */
export const getStrLength = str => {
    let len = str.length
    let realLen = 0
    let charCode = -1
    for (let i = 0; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) {
            realLen += 1
        } else {
            realLen += 2
        }
    }
    return realLen
}

/**
*
* 获取字符串的宽度
* @param text 字符串
* @param font 字符串 The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana")
* */
export const getTextWidth = text => {
    let canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
    let context = canvas.getContext('2d')
    context.font = '14px Helvetica'
    let metrics = context.measureText(text)
    return metrics.width
}
