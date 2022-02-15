<template>
    <div class="data-page">
        <div class="data-page-top flex flex-justify-between pt20">
            <div class="left-chart bgf chart-panel flex1">
                <!-- <div class="page-title title-text mb8">你好， admin</div> -->
                <div class="page-chart1-info flex flex-align-end mt16 mb16">
                    你的企业人数已达到了&ensp;<span class="title-text"> 1,450 </span> &ensp;人， 客户群总人数已达&ensp;<span class="title-text">450</span>&ensp;人
                </div>
                <div class="chart1-radio flex flex-justify-between flex-align-center mt8 mb8">
                    <el-radio-group v-model="chart1Params.acIndex" size="small" @change="chart1Change">
                        <el-radio :label="0">新增客户数</el-radio>
                        <el-radio :label="1">聊天客户数</el-radio>
                        <el-radio :label="2">流失客户数</el-radio>
                    </el-radio-group>
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content=""
                    >   
                        <template #content>
                            <div style="line-height: 20px">
                                新增客户数<br>
                                新增客户数：成员每天新添加的客户数量。<br>
                                新增客户群人数：客户群每天新入群客户数量（不包含员工）。<br>
                                活动新增客户<br>
                                活动新增客户数：通过任务裂变活动添加的客户数量。<br>
                                活动新增客户群人数：通过群裂变活动新增的客户群人数。<br>
                                聊天客户数<br>
                                聊天客户数：向员工主动发送过消息的客户数。<br>
                                聊天客户群数：有发过消息的客户群数量（包含所有群成员）。<br>
                                流失客户数<br>
                                流失客户数：客户删除企业员工和员工删除客户的总数（未去重）。<br>
                                退群人数：客户群退群的客户数量（不包含员工）。
                            </div>
                        </template>
                        <div class="tool-tip text-blue">
                            统计说明
                            <el-icon><arrow-right-bold /></el-icon>
                        </div>
                    </el-tooltip>
                </div>
                <div id="chart1" class="line-chart" />
            </div>
            <div class="right-chart bgf chart-panel flex1">
                <div class="chart-panel-title">场景来源趋势</div>
                <div class="chart2-types flex flex-justify-end mt16 mb16">
                    <el-radio-group v-model="chart2Params.acIndex" size="small" @change="chart2Change">
                        <el-radio-button :label="0">新增用户</el-radio-button>
                        <el-radio-button :label="1">活跃用户</el-radio-button>
                        <el-radio-button :label="2">打开次数</el-radio-button>
                        <el-radio-button :label="3">页面访问次数</el-radio-button>
                        <el-radio-button :label="4">次均停留时长</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="chart2-content flex">
                    <div class="check-list mr8">
                        <el-checkbox-group v-model="chart2Params.checkList" @change="updataDate">
                            <el-checkbox size="small" label="扫描活码" />
                            <el-checkbox size="small" label="长按图片识别" />
                            <el-checkbox size="small" label="小程序" />
                            <el-checkbox size="small" label="公众号" />
                        </el-checkbox-group>
                    </div>
                    <div style="flex-grow: 1; flex-shrink: 1">
                        <div id="chart2" class="line-chart" />
                    </div>
                </div>
            </div>
        </div>
        <div class="row-chart-panel mt16 bgf">
            <div class="row-chart-title">
                客户属性
            </div>
            <div class="flex">
                <div class="chart-box flex1 mr16">
                    <div class="chart-box-title mb8">性别比例</div>
                    <div id="pie1" class="pie-chart" />
                </div>
                <div class="chart-box flex1" style="width: 49%">
                    <div class="chart-box-title mb8">会员比例</div>
                    <div id="pie2" class="pie-chart" />
                </div>
            </div>
        </div>
        <div class="row-chart-panel mt16 bgf">
            <div class="row-chart-title">
                新老客看板
            </div>
            <div class="humens-total-list flex mb16 mt16 ml16">
                <div 
                    v-for="(item, index) in newOldBord" :key="index" 
                    class="mr32 flex flex-align-center" 
                    :class="newOldParams.acIndex == index ? 'total-item-active' : 'total-item'"
                    @click="newOldChange(index)"
                >
                    <!-- {{}} -->
                    <div class="item-info mr16">
                        <div class="item-title fs20 mb8 c6">{{ item.name }}</div>
                        <div class="item-value fs28 mb8" :class="[newOldParams.acIndex == index ? 'text-blue' : 'c3']">{{ item.info.value }}</div>
                        <div class="item-hint fs12 c9">较前一周：{{ item.info.lastWeek > 0 ? '+' : '-' }}{{ item.info.lastWeek }}%</div>
                    </div>
                    <div :id="'newOldsmall' + index" class="item-chart" />
                </div>
            </div>
            <div class="chart-part-title mb16 fs16 flex flex-align-center">
                <span class="blue-dot mr8" />
                成交人数
            </div>
            <div class="flex border-box">
                <div class="flex1 bdr-dash mr16" style="width: 70%">
                    <div id="newOldLine" class="line-chart" />
                </div>
                <div class="chart-box flex1" style="width: 29%">
                    <div id="newOldPie" class="line-chart" />
                </div>
            </div>
        </div>
        <div class="row-chart-panel mt16 bgf">
            <div class="row-chart-title flex">
                <div class="mr8">复购看板</div>
                <el-tooltip
                    class="item"
                    effect="dark"
                    content=""
                >   
                    <template #content>
                        <div style="line-height: 20px">
                            复购人数：所选时段内在本店内成交2次及以上的顾客数<br>
                            复购新客：所选时段内成交的新顾客中，有过2次及以上成交的新客数量<br>
                            复购老客：所选时段内成交的老顾客中，有过2次及以上成交的老客数量<br>
                            复购率：所选时段内最近一期的复购人数/成交人数<br>
                            新客复购率：所选时段内最近一期复购新客/成交新客人数<br>
                            老客复购率：所选时段内最近一期复购老客/成交老客人数
                        </div>
                    </template>
                    <div class="tool-tip" style="font-size: 22px;">
                        <i class="el-icon-question" />
                    </div>
                </el-tooltip>
            </div>
            <div class="humens-total-list flex mb16 mt16 ml16">
                <div 
                    v-for="(item, index) in repeatList" :key="index" 
                    class="mr32 flex flex-align-center" 
                    :class="reapeatParams.acIndex == index ? 'total-item-active' : 'total-item'"
                    @click="repeatChange(index)"
                >
                    <!-- {{}} -->
                    <div class="item-info mr16">
                        <div class="item-title fs20 mb8 c6">{{ item.name }}</div>
                        <div class="item-value fs28 mb8" :class="[reapeatParams.acIndex == index ? 'text-blue' : 'c3']">{{ item.info.value }}</div>
                        <div class="item-hint fs12 c9">较前一周：{{ item.info.lastWeek > 0 ? '+' : '-' }}{{ item.info.lastWeek }}%</div>
                    </div>
                    <div :id="'repeatsmall' + index" class="item-chart" />
                </div>
                <div class="total-item mr32 flex flex-align-center">
                    <div class="item-info mr16">
                        <div class="item-title fs20 mb8 c6">复购率(%)</div>
                        <div class="item-value fs28 mb8 c3">4.30</div>
                        <div class="item-hint fs12 c9">新客：+3.32%</div>
                        <div class="item-hint fs12 c9">老客：+4.22%</div>
                    </div>
                    <div class="item-chart" style="border: 0" />
                    <!-- <div :id="'repeatLine' + item" class="item-chart" /> -->
                </div>
            </div>
            <div class="chart-part-title mb16 flex fs16 flex-align-center">
                <span class="blue-dot mr8" />
                复购人数
            </div>
            <div class="flex">
                <div class="flex1 bdr-dash mr16" style="width: 100%">
                    <div id="repeatLine" class="line-chart" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { chart1, chart2, pie1, pie2, newOldBord, newOldPie, repeatList } from './data'
const chart1Params = ref({
    activeItem: {},
    acIndex: 0
})

const chart2Params = ref({
    activeItem: {},
    acIndex: 0,
    checkList: ['扫描活码', '长按图片识别', '小程序', '公众号']
})

const newOldParams = ref({
    acIndex: 0,
    activeItem: {}
})
const reapeatParams = ref({
    acIndex: 0,
    activeItem: {}
})

onMounted(() => {
    nextTick(() => {
        // console.log('线形图1', chart1[0].date, chart1[0].list)
        chart1Params.value.activeItem = chart1[0]
        renderLineChart(chart1[0].date, chart1[0].list, 'chart1')

        chart2Params.value.activeItem = chart2[0]
        // console.log('线形图2', chart2Params.value.activeItem.date, chart2Params.value.activeItem.list)
        renderLegendChart(chart2Params.value.activeItem.date, chart2Params.value.activeItem.list, chart2Params.value.checkList, 'chart2')

        // 渲染性别比例饼图
        // console.log('饼图数据', pie1.data)
        renderPieChart(pie1.data, 'pie1')
        // 会员比例饼图
        renderPieChart(pie2.data, 'pie2')

        // 渲染新老会员线形图
        // console.log('新老看板', newOldBord[0].date, newOldBord[0].list)
        renderLineChart(newOldBord[0].date, newOldBord[0].list, 'newOldLine')
        // 渲染新老会员饼图
        renderPieChart(newOldPie.data, 'newOldPie')
        // 渲染新老会员小图
        newOldBord.forEach((item, index) => {
            let chartItem = JSON.parse(JSON.stringify(item))
            chartItem.list[0].areaStyle = {}
            renderAreaChart(chartItem.date, chartItem.list, 'newOldsmall' + index)
        })

        // console.log('充足看板', repeatList[0].date, repeatList[0].list)
        // 渲染新老会员线形图
        renderLineChart(repeatList[0].date, repeatList[0].list, 'repeatLine')
        // 渲染重复看板-小图
        repeatList.forEach((item, index) => {
            let chartItem = JSON.parse(JSON.stringify(item))
            chartItem.list[0].areaStyle = {}
            renderAreaChart(chartItem.date, chartItem.list, 'repeatsmall' + index)
        })
    })
})

// 第一个图变化
function chart1Change(e) {
    // console.log(e)
    // chart1Change.
    chart1Params.value.activeItem = chart1[e]
    renderLineChart(chart1Params.value.activeItem.date, chart1Params.value.activeItem.list, 'chart1')

}

// 第二个线形图变化
function chart2Change(e) {
    chart2Params.value.activeItem = chart2[e]
    let c2title = ''
    if (e == 4) { 
        c2title = '单位(秒)'
    }
    renderLegendChart(chart2Params.value.activeItem.date, chart2Params.value.activeItem.list, chart2Params.value.checkList, 'chart2', c2title)
}
// 更新线性图第二个线形图
function updataDate() {
    // console.log('变化', e)
    let chartDom = document.getElementById('chart2')
    let nowChart = echarts.getInstanceByDom(chartDom) // 获取dom上的echart实例
    nowChart.dispatchAction({ type: 'legendAllSelect' })
    nowChart.dispatchAction({ type: 'legendInverseSelect' })
    chart2Params.value.checkList.forEach(item => {
        nowChart.dispatchAction({
            type: 'legendSelect',
            // 图例名称
            name: item
        })
    })
}

// 新老图切换
function newOldChange(index) {
    newOldParams.value.activeItem = newOldBord[index]
    newOldParams.value.acIndex = index
    renderLineChart(newOldParams.value.activeItem.date,  newOldParams.value.activeItem.list, 'newOldLine')
}

// 重复看板切换
function repeatChange(index) {
    reapeatParams.value.activeItem = repeatList[index]
    reapeatParams.value.acIndex = index
    renderLineChart(reapeatParams.value.activeItem.date,  reapeatParams.value.activeItem.list, 'repeatLine')
}

// 渲染图
function renderLineChart(dateData, serieData, idName, option = {}) {
    let chartDom = document.getElementById(idName)

    let nowChart = echarts.getInstanceByDom(chartDom) // 获取dom上的echart实例
    console.log(nowChart)
    if (nowChart) {
        // console.log('获取到实例', nowChart)
        echarts.dispose(nowChart)
    } // 销毁echarts实例

    let myChart = echarts.init(chartDom)

    // myChart.clear()
    let legenArr = serieData.map(item => {
        return item.name
    })

    // 如果是传入的option
    if (option.tooltip) {
        option && myChart.setOption(option)
        return
    }

    option = {
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '5%',
            right: '4%',
            bottom: '3%',
            top: '12%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: dateData
        },
        yAxis: {
            type: 'value'
        },
        legend: {
            data: legenArr
        },
        series: serieData
    }

    option && myChart.setOption(option)
}

// 渲染线形图2 (legend位置变化)
function renderLegendChart(dateData, serieData, legenArr, idName, title = '') {
    // let chartDom = document.getElementById(idName)
    // console.log('---------2', chartDom, idName)
    // let yaxis = {
    //     type: 'category'
    // }
    // let yaxisVlue = {
    //     type: 'value'
    // }
    let titleShow = !!title
    console.log('标题是否展示', titleShow)
    let option = {
        title: {
            text: title,
            show: titleShow,
            left: '4%',
            textStyle: {
                fontSize: 14
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '5%',
            right: '4%',
            bottom: '14%',
            top: '12%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: dateData
        },
        yAxis: {
            type: 'value'
        },
        legend: {
            data: legenArr,
            bottom: '3%'
        },
        series: serieData
    }
    // 调用线性图渲染
    renderLineChart([], [], idName, option)
}
// 渲染饼图
function renderPieChart(serieData, idName) {
    
    let option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: 'center',
            right: '2%',
            orient: 'vertical',
            formatter: name => {
                // console.log(name)
                // return 'Legend ' + name
                let nowItem = serieData.filter(item => {
                    return item.name == name
                })
                return `${name}    ${nowItem[0].value} 人 `
            }
        },
        series: [
            {
                name: '',
                type: 'pie',
                // radius: '60%',
                radius: ['40%', '80%'],
                left: '-30%',
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 0,
                    borderColor: '#fff',
                    borderWidth: 1
                },
                label: {
                    show: true,
                    position: 'inner',
                    formatter: '{d}%'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '24'
                        // fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: serieData
            }
        ]
    }

    renderLineChart([], [], idName, option)
    // option && myChart.setOption(option)
}

// renderAreaChart()

// 渲染线形面积图
function renderAreaChart(dateData, serieData, idName) {
    let option = {
        tooltip: {
            trigger: 'axis',
            show: false
        },
        grid: {
            left: '0',
            right: '4%',
            bottom: '5%',
            top: '4%'
        },
        xAxis: {
            type: 'category',
            data: dateData,
            show: false
        },
        yAxis: {
            type: 'value',
            show: false,
            scale: true
        },
        series: serieData
    }
    renderLineChart([], [], idName, option)
}

</script>

<style lang="scss">
.data-page {
    padding: 0 20px;
    padding-bottom: 50px;

     .left-chart {
        width: 50%;
        margin-right: 15px;
        font-size: 16;
        .title-text {
            font-size: 24px;
        }
    }
    .right-chart {
        width: 49%;
        .check-list {
            width: 130px;
            overflow: hidden;
        }
    }

    .line-chart {
        width: 100%;
        height: 300px;
        border: 1px dashed #e2e2e2;
        padding-top: 15px;
    }
    .chart-panel {
        padding: 20px;
        background: #fff;
        border-radius: 5px;
        .chart-panel-title {
            // font-weight: 700;
            // font-size: 18px;
            font-size: 24px;
            line-height: 50px;
            border-bottom: 1px solid #f0f2f5;
        }
        
    }
    .row-chart-panel {
        padding: 20px;
        border-radius: 5px;

        .row-chart-title {
            // font-weight: 700;
            font-size: 24px;
            line-height: 50px;
            // border-bottom: 1px solid #f0f2f5;
        }

        .pie-chart {
            border: 1px dashed #e2e2e2;
            // padding-top: 15px;
            // padding: 15px;
            width: 100%;
            height: 360px;
        }
        .chart-box {
            width: 50%;
        }
        .chart-box-title {
            font-size: 18px;
            line-height: 50px;
            color: #888;
        }
    }

    .humens-total-list {
        border-radius: 5px;
        .total-item {
            padding: 16px;
            background-color: #f8f8f8;
            cursor: pointer;
        }

        .total-item-active {
            padding: 16px;
            background-color: #ecf9ff;
            cursor: pointer;
        }

        .item-chart {
            height: 80px;
            width: 160px;
            border: 1px dashed #e2e2e2;
        }
    }
}
.text-blue {
    color: #1773fa;
}
.bdr-dash {
    border-right: 1px dashed #f2f2f2;
}
.blue-dot {
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background-color: #1773fa;
}
</style>