<template>
    <div>
        <div class="search-box pb20">
            <el-form :inline="true" :model="params" label-position="right" size="small" class="search-form-margin">
                <el-form-item label="商品名称：">
                    <el-input v-model="params.search_goods_name" placeholder="请输入商品名称" class="width-class" />
                </el-form-item>
                <el-form-item label="商品类目：" class="ml24">
                    <el-select 
                        v-model="params.search_goods_category_id"
                        placeholder="请选择商品类目"
                        class="width-class"
                    >
                        <el-option label="全部" value="" />
                        <el-option
                            v-for="item in searchCategory"
                            :key="item.goods_category_id"
                            :label="item.name"
                            :value="item.goods_category_id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="有无库存：" class="ml24">
                    <el-select v-model="params.search_goods_stock_status" placeholder="请选择库存" class="width-class">
                        <el-option label="全部" value="" />
                        <el-option label="有" value="sale" />
                        <el-option label="售罄" value="sold_out" />
                    </el-select>
                </el-form-item>
                <el-form-item label="商品状态：">
                    <el-select v-model="params.search_goods_status" placeholder="请选择商品状态" class="width-class">
                        <el-option label="全部" value="" />
                        <el-option label="上架" value="on_sale" />
                        <el-option label="下架" value="off_sale" />
                    </el-select>
                </el-form-item>
                <el-form-item class="right mr0">
                    <el-button type="default" size="small" @click="onReset">重置</el-button>
                    <el-button type="primary" size="small" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="flex pt24">
            <div class="search-tree">
                <div v-for="item in catesList" :key="item.goods_class_id" class="cate-box">
                    <div 
                        class="cate-text-box pl20" 
                        :class="[
                            params.goods_class_id == item.goods_class_id ?
                                'cate-text-active': ''
                        ]"
                        @click="getGoodsList(item.goods_class_id, item.name)"
                    >
                        {{ item.name }}
                    </div>
                </div>
            </div>
            <div class="tab-box pl16">
                <div class="cate-name-box fwb">
                    <span class="cate-name-text">{{ getCateName }}</span>
                </div>
                <!-- <CustomerTable
                    ref="goodsTable"
                    :table-data="tableData"
                    :need-select="true"
                    :reserve-selection="true"
                    :table-title="tableTitle"
                    :row-key="'goods_id'"
                    class="customer-table"
                    @handle-select="selectionChange"
                >
                    <template #goods_title="scope">
                        <div class="flex flex-align-center">
                            <img class="goods-img" :src="scope.data.goods_thumb_img" alt="商品图片">
                            <div class="goods-title ml8 lh24">
                                {{ scope.data.goods_title }}
                            </div>
                        </div>
                    </template>
                    <template #sale_status="scope">
                        <div>
                            {{ scope.data.sale_status == 'on_sale' ? '已上架' : '已下架' }}
                        </div>
                    </template>
                    <template #date="scope">
                        <div>
                            {{ showTime(scope.data) }}
                        </div>
                    </template>
                </CustomerTable> -->
                <el-table
                    ref="goodsTable"
                    :data="tableData"
                    class="goods-table"
                    :row-key="getRowKeys"
                    height="calc(100vh - 380px)"
                    :header-cell-style="{background:'#f4f4f5'}"
                    @selection-change="selectionChange"
                >
                    <el-table-column
                        type="selection"
                        min-width="60"
                        :reserve-selection="true"
                    />
                    <el-table-column label="商品名称" min-width="240">
                        <template #default="scope">
                            <div class="flex flex-align-center">
                                <img class="goods-img flex-g0 flex-s0" :src="scope.row.goods_thumb_img" alt="商品图片">
                                <el-popover
                                    :width="200"
                                    trigger="hover"
                                >
                                    <template #reference>
                                        <div class="ml8 lh24 show-line2">{{ scope.row.goods_title }}</div>
                                    </template>
                                    <div>{{ scope.row.goods_title }}</div>
                                </el-popover>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="兑换所需积分" min-width="178">
                        <template #default="scope">
                            <div>
                                {{ scope.row.goods_score }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品类目" min-width="150">
                        <template #default="scope">
                            <div>
                                {{ scope.row.category_name }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="库存" min-width="150">
                        <template #default="scope">
                            <div>
                                {{ scope.row.goods_stock }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品状态" min-width="180">
                        <template #default="scope">
                            <div>
                                {{ scope.row.sale_status == 'on_sale' ? '已上架' : '已下架' }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="核销时间" min-width="280">
                        <template #default="scope">
                            <div v-html="showTime(scope.row)" />
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import Http from '@/util/request'

// 搜索参数
const params = ref({
    goods_class_id: '',
    search_goods_name: '',
    search_goods_category_id: '',
    search_goods_stock_status: '',
    search_goods_status: ''
})
const classParams = ref({
    search_goods_name: '',
    search_goods_stock_status: '',
    search_goods_status: '',
    search_class_name: '',
    search_goods_category_id: ''
})
// 存储商品类目
const searchCategory = ref([])
// 存储商品分类名称
const getCateName = ref('')
// 商品分类存储
const catesList = ref([])
const tableData = ref([])
const emit = defineEmits(['selectGoods'])
const props = defineProps({
    echoSelectGoods: {
        type: Array,
        default: () => []
    },
    clickEdit: {
        type: Boolean,
        default: false
    }
})
const goodsTable = ref(null)

watch(() => props.clickEdit, () => {
    // let selectArr = JSON.parse(JSON.stringify(props.echoSelectGoods))
    // console.log('props.echoSelectGoods', props.echoSelectGoods)
    goodsTable.value.clearSelection()
    props.echoSelectGoods.forEach(item => {
        // console.log('2222222', item)
        goodsTable.value.toggleRowSelection(item, true)
    })
}, {
    deep: true
})

const onReset = () => {
    params.value = {
        search_goods_name: '',
        search_goods_category_id: '',
        search_goods_stock_status: '',
        search_goods_status: ''
    }
    getGoodsCates()
}

// 分页记录所选商品
function getRowKeys(row) {
    // console.log('row', row)
    return row.score_goods_id
}

// 获取商品类目
const getGoodsTypes = async() => {
    let { data } = await Http.getGoodsTypes()
    searchCategory.value = data
}

// 获取商品分类
const getGoodsCates = async() => {
    let { data } = await Http.getGoodsCates(classParams.value)
    catesList.value = data
    params.value.goods_class_id = catesList.value[0].goods_class_id
    getCateName.value = catesList.value[0].name
    getGoodsList()
}

// 获取商品列表
const getGoodsList = async(id, name)  => {
    if (id) {
        params.value.goods_class_id = id
        getCateName.value = name
    }
    let { data } = await Http.getGoodsList(params.value)
    tableData.value = data
}

// 选择商品
const selectionChange = good => {
    emit('selectGoods', good)
}

// 表格展示核销时间
const showTime = row => {
    if (row.goods_type == 'logistics') return '-'
    if (row.validity_time_type == 'relative_time') {
        return `确认兑换后${row.relative_days}天内可用`
    } else {
        return `${row.validity_start_time} 至 <br/>
        ${row.validity_end_time}`
    }
}

const onSearch = () => {
    getGoodsCates()
    getGoodsList()
}

onMounted(() => {
    getGoodsTypes()
    getGoodsCates()
    // getGoodsList()
})
</script>

<style scoped lang="scss">
.search-box {
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
}
// 搜索条件宽度
.width-class {
    width:274px
}
.search-tree {
    width: 280px;
    height: 53vh;

    overflow-y: auto;
    flex-shrink: 0;
    flex-grow: 0;
}
.goods-table {
    // margin-bottom: 24px;
    margin-top: 16px;
    // min-height: calc(100vh - 460px) !important;
    // height: calc(100vh - 460px) !important;
    // overflow-y: auto;
    width: 100%;
    // &.is-collapse{
    //     width:calc(100vw - 556px);
    // }
}
.tab-box {
    // flex-grow: 1;
    // flex-shrink: 1;
    width:calc(100% - 285px);
    border-left: 2px solid #edeef2;
}
.cate-box {
    // width: 280px;
    height: 40px;
    // background: #eef5ff;
    border-radius: 2px;
    .cate-text-box {
        font-size: 14px;
        font-weight: 400;
        color: #171717;
        line-height: 40px;
    }
    .cate-text-active{
        font-size: 14px;
        font-weight: 400;
        line-height: 40px;
        color: rgba(23, 115, 250, 1);
        background: #eef5ff;
    }
}
.goods-img {
    display: block;
    width: 60px;
    height: 60px;
}
.cate-name-box {
    height: 24px;
    font-size: 16px;
    color: #000000;
    line-height: 24px;
}
</style>