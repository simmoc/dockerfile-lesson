/*
 * @Author: your name
 * @Date: 2021-03-03 09:55:46
 * @LastEditTime: 2021-03-03 10:10:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \we_customer_operation\src\views\reach\sessionArchiving\record.js
 */
const getFileName = filePath => {
    let lastSlashIndex = filePath.lastIndexOf('/')
    // 解码;
    return decodeURIComponent(filePath.slice(lastSlashIndex + 1))
}
const typeList = [
    { msgtype: 'text', showType: 'text' }, // 文本
    { msgtype: 'image', showType: 'pictrue' }, // 图片
    { msgtype: 'revoke', showType: 'revoke' }, // 撤回消息
    { msgtype: 'agree/disagree', showType: 'system' }, // 同意会话聊天内容
    { msgtype: 'voice', showType: 'filename' }, // 语音消息
    { msgtype: 'news', showType: 'news' }, // 卡片消息
    { msgtype: 'emotion', showType: 'pictrue' }, // 表情消息
    { msgtype: 'video', showType: 'filename' }, // 视频消息
    { msgtype: 'file', showType: 'filename' }, // 文件
    { msgtype: 'link', showType: 'web_link' }, // 链接
    { msgtype: 'weapp', showType: 'weapp' } // 小程序消息
]

const addtionList = [
    { msgtype: 'location', msg: '位置消息' }, // 位置
    { msgtype: 'card', msg: '名片消息' }, // 名片
    { msgtype: 'chatrecord', msg: '会话记录消息' }, // 会话记录消息
    // ChatRecordText/ ChatRecordFile/ ChatRecordImage/ ChatRecordVideo
    // / ChatRecordLink/ ChatRecordLocation/ ChatRecordMixed
    { msgtype: 'ChatRecord', msg: '会话记录消息item' }, // 会话记录消息item()
    { msgtype: 'todo', msg: '待办消息' }, // 待办消息
    { msgtype: 'vote', msg: '投票消息' }, // 投票消息
    { msgtype: 'collect', msg: '填表消息' }, // 填表消息
    { msgtype: 'redpacket', msg: '红包消息' }, // 红包消息
    { msgtype: 'meeting', msg: '会议邀请消息' }, // 会议邀请消息
    { msgtype: 'change', msg: '切换企业日志' }, // 切换企业日志 (未找到对应的msgtype)
    { msgtype: 'docmsg', msg: '在线文档消息' }, // 在线文档消息
    { msgtype: 'markdown', msg: 'MarkDown格式消息' }, // MarkDown格式消息
    { msgtype: 'calendar', msg: '日程消息' }, // 日程消息
    { msgtype: 'markdown', msg: 'MarkDown格式消息' }, // MarkDown格式消息
    { msgtype: 'mixed', msg: '混合消息' }, // 混合消息
    { msgtype: 'meeting_voice_call', msg: '音频存档消息' }, // 音频存档消息
    { msgtype: 'voip_doc_share', msg: '音频共享文档消息' }, // 音频共享文档消息
    { msgtype: 'external_redpacket', msg: '互通红包消息' } // 互通红包消息
]

const getFormatTime = time => {
    if (!time) {
        return ''
    }
    let datatime = parseInt(`${time}000`)
    let date = new Date(datatime)
    var year = date.getFullYear() // 获取系统的年；
    var month = date.getMonth() + 1 // 获取系统月份，由于月份是从0开始计算，所以要加1
    var day = date.getDate() // 获取系统日
    var hour = date.getHours() // 获取系统时间
    var minute = date.getMinutes() // 分
    var second = date.getSeconds() // 秒
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

class AnimationScrollPosition {
    constructor(option = {}) {
        this.defaultConfig = {
            position: {},
            type: 'bottom',
            runtime: 300,
            speed: 10,
            element: null
        }
        let { position, runtime, speed, element } = this.defaultConfig
        this.element = document.querySelector(option.element || element) // 当前的元素
        console.log('option.element', option.element)
        if (!option.element || !this.element) {
            console.warn('element is required')
            return
        }
        this.position = option.position || position // 滚动位置;
        this.runtime = option.runtime || runtime // 运行时间;
        this.speed = option.speed || speed // 定时器间隔;
        this.thisScrolltop = this.element.scrollTop // 滚动的起点;
        // this.scrollHeight = this.element.scrollHeight;
        this.position.y = this.position.y || this.element.scrollHeight // 滚动的y轴坐标
        this.distance = Math.abs(this.position.y - this.thisScrolltop) // 滚动距离;
        this.diffDistance = 0 // 距离目标点的距离
        this.delayt = this.thisScrolltop // 滚动Y轴坐标
        // 步长;
        this.step = this.distance / (this.runtime / this.speed)
        this.upOrDown = this.thisScrolltop > this.position.y // 判断当前是up/down;
        this.timer = null // 定时器名称;
        this.startTime = Date.now()
        this.endTime = Date.now()
        // 初始化
        this.init()
    }
    init() {
        this.timer = setInterval(() => {
            // step(步长),delayt(当前元素所处位置),滚动方向(up/down);
            let { step, delayt, upOrDown } = this
            // false为down，true为up
            this.endTime = Date.now()
            this.delayt = upOrDown ? delayt - step : delayt + step
            this.diffDistance = Math.abs(this.position.y - this.delayt)
            // 终止条件;
            if (this.diffDistance < this.step) {
                clearInterval(this.timer)
                this.delayt = this.position.y
            }
            if (this.endTime - this.startTime > 10 * 1000) {
                clearInterval(this.timer)
            }
            this.element.scrollTo(0, this.delayt)
        }, this.speed)
    }
}
export default {
    getFileName,
    getFormatTime,
    typeList,
    addtionList,
    AnimationScrollPosition
}
