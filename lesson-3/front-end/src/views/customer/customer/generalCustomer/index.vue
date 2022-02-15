<template>
    <div>
        <div class="search-form">
            <div id="vennBox" class="vennBox" />
        </div>
        <!-- 泛客户 -->
    </div>
</template>

<script setup>
import anychart from 'anychart'
console.log('维恩图', anychart)
const vennData = ref([
    { x: 'A', value: 100 },
    { x: 'B', value: 100 },
    { x: 'C', value: 100 },
    { x: ['A', 'B'],	value: 20 },
    { x: ['B', 'C'], value: 20 },
    { x: ['A', 'B', 'C'], value: 20 },
    { x: 'A', value: 100 },
    { x: 'B', value: 100 },
    { x: ['A', 'B'], value: 15 }
])
// 渲染维恩图
anychart.onDocumentReady(() => {
    // let data = [{ data: vennData.value }]
    // var data = [
    //     { x: 'A', value: 100 },
    //     { x: 'B', value: 100 },
    //     { x: ['A', 'B'], value: 25 }
    // ]
 
    // create venn diagram
    var chart = anychart.venn(vennData.value)
    
    // set container id for the chart
    chart.container('vennBox')
    
    // initiate chart drawing
    chart.draw()

    // set chart title
    chart.title('维恩图')
    
    // set labels settings
    chart.labels().format('{%Name}')
})
// chart = anychart.venn(data);
</script>

<style lang="scss">
.search-form {
  padding: 24px;
  background-color: #fff;
  margin: 24px;
}
.vennBox {
    width: 100%;
    height: 654px;
}
</style>