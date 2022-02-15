<template>
    <div class="mt16">
        <div class="page-scroll">
            <div class="search-form mt0 pb0 mb0">
                <el-form :inline="true" :model="params" label-position="right" label-width="120px" size="small" class="clearfix">
                    <el-form-item label="商品名称：">
                        <el-input v-model="params.search_goods_name" placeholder="请输入文本内容" style="width:274px;"
                                  @keyup.enter="onSearch"
                        />
                    </el-form-item>
                    <el-form-item label="商品类目：">
                        <el-select v-model="params.search_goods_category_id" placeholder="请选择" style="width:274px;">
                            <el-option label="全部" value="" />
                            <el-option v-for="item in typeList" :key="item.goods_category_id" :label="item.name" :value="item.goods_category_id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="有无库存：">
                        <el-select v-model="params.search_goods_stock_status" placeholder="请选择" style="width:274px;">
                            <el-option label="全部" value="" />
                            <el-option label="有" value="sale" />
                            <el-option label="售罄" value="sold_out" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品状态：">
                        <el-select v-model="params.search_goods_status" placeholder="请选择" style="width:274px;">
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
            <page-main class="mt16 mt0">
                <div class="flex">
                    <div class="table-search-box">
                        <div class="flex mb8">
                            <el-input v-model="cateParams.search_class_name" prefix-icon="el-icon-search" placeholder="请输入分类名称" size="small" class="table-search-input" @input="search($event)" />
                            <el-button size="small" @click="openCateDialog">添加分类</el-button>
                        </div>
                        <div class="tr fs12 c8c">
                            分类 {{ groupList.length }} / 20
                        </div>
                        <div class="table-tree mt8">
                            <GoodsTreeDrag
                                ref="treeDrag"
                                v-model="selectedCate"
                                :group-list="groupList"
                                :is-search="isSearch"
                                :get-list="getGoodsList"
                                :get-group-list="getCateList"
                                :set-tree-checked="setTreeChecked"
                            />
                        </div>
                    </div>
                    <div class="flex-1">
                        <div class="table-top-area flex flex-align-center flex-justify-between">
                            <div v-show="groupList.length>0">
                                <span class="fs16 c0 mr8 fwb vtm">{{ selectedCate.name }}</span>
                                <span class="fs12 c9 vtm">此分类内已有商品 {{ tableData.length }}/100</span>
                            </div>
                            <div class="tr">
                                <el-button
                                    v-if="groupList.length>0"
                                    icon="el-icon-plus"
                                    type="primary"
                                    size="small"
                                    data-isSet="1"
                                    :disabled="tableData.length > 99"
                                    @click="goTo('addGoods', { goods_class_id: params.goods_class_id, category_id: params.search_goods_category_id, pageType: 'add'})"
                                >
                                    添加商品
                                </el-button>
                            </div>
                        </div>
                        <CustomerTable
                            v-show="groupList.length>0"
                            :table-title="tableTitle"
                            :table-data="tableData"
                            :need-pagination="true"
                            class="customer-tree"
                            :class="{'is-collapse': $store.state.settings.mode === 'pc' && $store.state.settings.sidebarCollapse}"
                        > 
                            <template #sort="scope">
                                <div class="flex flex-align-center flex-space-center" :class="[isSearch ? '' : 'can-drag-icon']" style="height: 50px">
                                    <img
                                        style="width: 12px; height: 12px; margin-left: 8px;vertical-align: middle;"
                                        src="@/assets/images/knowledgeBase/drag.svg"
                                        :data-sort="scope.data.sort"
                                        alt=""
                                    >
                                </div>
                            </template>
                            <template #goods_title="scope">
                                <div class="flex flex-align-center">
                                    <img class="goods-img flex-g0 flex-s0" :src="scope.data.goods_thumb_img" alt="商品图片">
                                    <div class="goods-title ml8 lh24 show-line2">
                                        <!-- {{ scope.data.goods_title }} -->
                                        <div v-if="scope.data.goods_title.length <= 24">
                                            {{ scope.data.goods_title }}
                                        </div>
                                        <el-popover
                                            v-else
                                            placement="bottom"
                                            width="400"
                                            trigger="hover"
                                            popper-class="member-info-pop"
                                        >
                                            <div class="popover-content-box">
                                                {{ scope.data.goods_title }}
                                            </div>
                                            <template #reference>
                                                <div class="popover-content">
                                                    {{ scope.data.goods_title.substring(0, 24) }} ...
                                                </div>
                                            </template>
                                        </el-popover>
                                    </div>
                                </div>
                            </template>
                            <template #sale_status="scope">
                                <div>
                                    {{ scope.data.sale_status == 'on_sale' ? '已上架' : '已下架' }}
                                </div>
                            </template>
                            <template #date="scope">
                                <div v-html="showTime(scope.data)" />
                            </template>
                            <template #operation="scope">
                                <div>
                                    <el-button
                                        v-if="scope.data.sale_status == 'on_sale'"
                                        type="text"
                                        size="mini"
                                        @click="showHintConfirm('off_sale', scope.data, updateStatus)"
                                    >
                                        下架
                                    </el-button>
                                    <el-button
                                        v-else
                                        type="text"
                                        size="mini"
                                        @click="showStatusConfirm(scope.data)"
                                    >
                                        上架
                                    </el-button>
                                    <el-button
                                        v-if="scope.data.goods_id !== tableData[0].goods_id"
                                        type="text"
                                        size="mini"
                                        @click="goodsGoTop(scope.data.goods_id, params.goods_class_id)"
                                    >
                                        移动到顶端
                                    </el-button>
                                    <el-button
                                        type="text"
                                        size="mini"
                                        @click="goTo('editGoods', { goods_id: scope.data.goods_id, pageType: 'edit'})"
                                    >
                                        编辑
                                    </el-button>
                                    <el-button
                                        type="text"
                                        size="mini"
                                        @click="showHintConfirm('delete', scope.data, deleteGoods)"
                                    >
                                        删除
                                    </el-button>
                                </div>
                            </template>
                        </CustomerTable>
                        <div v-show="groupList.length===0" class="table-blank">
                            <div class="tc">
                                <div>请添加分类后添加商品</div>
                                <el-button size="small" type="primary" class="mt16" @click="openCateDialog">添加分类</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </page-main>
            <!-- 新建分类 -->
            <CustomerDialog title="添加分类名称" :dialog-visible="newDialogVisible" width="418px" :confirm-fn="addGroup" @cancel="cancelDialog">
                <div class="mb8">分类名称</div>
                <el-input
                    v-model="cateName"
                    autocomplete="off"
                    maxlength="5"
                    placeholder="请输入分类名称"
                    show-word-limit
                />
            </CustomerDialog>
            <!-- 上架商品 -->
            <CustomerDialog title="上架商品" :dialog-visible="stockDialogvisible" width="418px" :confirm-fn="updateStatus" @cancel="stockDialogvisible = false">
                <div class="">
                    <div class="mb8">库存:</div>
                    <el-input
                        v-model.number="goodsStatusParams.goods_stock"
                        type="number"
                        autocomplete="off"
                        placeholder="请输入分类名称"
                        size="small"
                        @keyup="limitNunber"
                    >
                        <template #append>
                            <span>件</span>
                        </template>
                    </el-input>
                </div>
            </CustomerDialog>
            <!-- 提示弹窗，可传入执行行数 -->
            <CustomerDialog :title="hintDialog.title" :dialog-visible="hintDialogvisible" width="400px" :confirm-fn="hintDialog.fn" @cancel="cancelDialog">
                <div class="group_name">{{ hintDialog.content }}</div>
            </CustomerDialog>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Http from '@/util/request'
import GoodsTreeDrag from './GoodsTreeDrag/index.vue'
import { bounce } from '@/util/index'
import { useRoute, useRouter } from 'vue-router'
import Sortable from 'sortablejs'
import { ElMessage } from 'element-plus'

const router  = useRouter()
const route = useRoute()

// import TreeDrag from '@/components/TreeDrag/index.vue'
// 表格参数
const params = ref({
    goods_class_id: '',
    search_goods_name: '',
    search_goods_category_id: '',
    search_goods_status: '',
    search_goods_stock_status: ''
})
const tableData = ref([])
// 上下架
const goodsStatusParams = ref({
    goods_id: '',
    type: '',
    goods_stock: 0
})
const stockDialogvisible = ref(false)
const deleteParams = ref({
    goods_id: ''
})
const sortParams = ref({
    goods_class_id: '',
    goods_list: []
})

// 类目参数
const typeList = ref([])

// 分类参数
const treeDrag = ref(null)
const cateParams = ref({
    search_class_name: '',
    search_goods_name: '',
    search_goods_category_id: '',
    search_goods_status: '',
    search_goods_stock_status: ''
})
const groupList = ref([])
const  isSearch = ref(false)
const selectedCate = ref({})
const cateName = ref('')

const newDialogVisible = ref(false)
const hintDialogvisible = ref(false)
const hintDialog = ref({
    title: '提示',
    content: '',
    type: '',
    fn: () => {}
})

const tableTitle = ref([
    {
        label: '排序',
        prop: 'sort',
        type: 'slot',
        width: 50
    },
    {
        label: '商品名称',
        prop: 'goods_title',
        width: 240,
        type: 'slot'
    },
    {
        label: '兑换所需积分',
        prop: 'goods_score',
        width: 120
    },
    {
        label: '商品类目',
        prop: 'category_name',
        width: 120
    }, 
    {
        label: '库存',
        prop: 'goods_stock',
        width: 100
    }, 
    {
        label: '商品状态',
        prop: 'sale_status',
        type: 'slot',
        width: 100
    }, 
    {
        label: '核销时间',
        prop: 'date',
        type: 'slot'
    },
    {
        label: '操作',
        prop: 'operation',
        fixed: 'right',
        type: 'slot',
        width: 230
    }
])
// 限制只能输入正整数
const limitNunber = e => {
    let flag = new RegExp('^[0-9]([0-9])*$').test(e.target.value)
    // console.log(e.target.value, flag)
    if (!flag) {
        e.target.value = e.target.value.replace(/[^[0-9]]*/g, '')
    }

}

// 获取商品分类列表
const getCateList = async cb => {
    let { data, code } = await Http.getGoodsCates(cateParams.value)
    if (code == 200) {
        groupList.value = data || []
        // params.value.goods_class_id = data[0].goods_class_id
        // getGoodsList()
        if (cb) { 
            cb() 
        } else {
            // 从编辑页返回时选取默认的类目
            if (route.query && route.query.goods_class_id) {
                let checkIndex = {}
                groupList.value.forEach((item, index) => {
                    if (item.goods_class_id == route.query.goods_class_id) {
                        checkIndex = index
                    }
                })
                treeDrag.value.handlerGroupKnowledge(groupList.value[checkIndex])
                // router.push({ 
                //     query: {}
                // })
                return
            }
            treeDrag.value.handlerGroupKnowledge(groupList.value[0])
        }
    }
}

// 获取类目列表
const getTypeList = async() => {
    let { data, code } = await Http.getGoodsTypes()
    if (code == 200) {
        typeList.value = data || []
        // console.log('类目列表', data)
    }
}

// 获取商品列表
const getGoodsList = async goods_class_id => {
    if (goods_class_id) {
        params.value.goods_class_id = goods_class_id
        tableData.value = []    
    }
    if (!params.value.goods_class_id) {
        return
    }
    let { data, code } = await Http.getGoodsList(params.value)
    if (code == 200) {
        tableData.value = data || []
        // console.log('商品列表', data)
    }
}

// 搜索分类
const search = bounce(() =>  {
    selectedCate.value = {}
    // cateParams.value.search_keyword_id_arr = []
    getCateList()
})

// 激活树选中
const setTreeChecked = i => {
    params.value.search_class_name = ''
    cateParams.value.search_group_name = ''
    getCateList(() => {
        treeDrag.value.handlerGroupKnowledge(groupList.value[i])
    })
}

// 更改商品顺序
const updateGoodsSort = async() => {
    // sortParams.value.goods_list = arr
    sortParams.value.goods_class_id = params.value.goods_class_id

    let { code, msg } = await Http.updateGoodsSort(sortParams.value)
    if (code == 200) {
        ElMessage.success({ message: '操作成功' })
        tableData.value = []
        getGoodsList()
        return
    }
    ElMessage.warning({ message: msg })
}

// 拖拽商品
const drag = disabled => {
    // console.log('禁止拖动', disabled)
    const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
    Sortable.create(el, {
        disabled: disabled,
        ghostClass: 'sortable-ghost',
        handle: '.can-drag-icon',
        setData: function(dataTransfer) {
            dataTransfer.setData('Text', '')
        },
        onEnd: ({ newIndex, oldIndex }) => {
            let arr = []
            // 更换数组元素位置
            let nowArr = JSON.parse(JSON.stringify(tableData.value))
            nowArr = swapArray(nowArr, newIndex, oldIndex)
            // console.log('更改顺序', newIndex, oldIndex, nowArr)

            nowArr.forEach((item, index) => {
                arr.push({ goods_id: item.goods_id, sort: 200 - index })
            })
            sortParams.value.goods_list = arr
            updateGoodsSort()
            // console.log(updateGoodsSort(arr))
        }
    })
}

// 数组元素移动位置
function swapArray(arr, newIndex, oldIndex) {
    let item = JSON.parse(JSON.stringify(arr[oldIndex]))
    arr.splice(oldIndex, 1)
    arr.splice(newIndex, 0, item)
    return arr
}

// 打开添加分类
const openCateDialog = () => {
    console.log('分类长度', groupList.value.length)
    if (groupList.value.length >= 20) {
        ElMessage.warning('当前分类已有20个，不可添加')
        return
    }
    newDialogVisible.value = true
}

const cancelDialog = () => {
    cateName.value = ''
    newDialogVisible.value = false
    hintDialogvisible.value = false
}
const addGroup = async() => {
    if (!cateName.value) {
        ElMessage.error('分类名称不能为空')
        return
    }
    // 请求接口
    let res = await Http.adddGoodsCate({ name: cateName.value })
    if (res.code === 200) {
        ElMessage.success('添加成功!')
        cancelDialog()
        // this.isNewGrpup = true
        cateName.value = ''
        params.value.search_goods_name = ''
        cateParams.value.search_class_name = ''
        getCateList(() => {
            treeDrag.value.handlerGroupKnowledge(groupList.value[groupList.value.length - 1])
        })
    }

}

// 表格展示核销时间
const showTime = row => {
    if (row.goods_type == 'logistics') return '-'
    if (row.validity_time_type == 'relative_time') {
        return `确认兑换后${row.relative_days}天内可用`
    } else {
        return `${row.validity_start_time} 至<br /> ${row.validity_end_time}`
    }
}

// 打开上架商品
const showStatusConfirm = row => {
    console.log(row)
    goodsStatusParams.value.goods_id = row.goods_id || ''
    goodsStatusParams.value.goods_stock = row.goods_stock || 0
    goodsStatusParams.value.type = 'on_sale'
    stockDialogvisible.value = true
}
// 上下架商品
const updateStatus = async() => {
    let { code, msg } = await Http.updataGoodsStatus(goodsStatusParams.value)
    if (code == 200) {
        cancelDialog()
        stockDialogvisible.value = false
        ElMessage.success({ message: '操作成功' })
        getGoodsList()
        
        return
    }
    ElMessage.warning({ message: msg })
    // console.log(code)
}

// 打开提示 可以传入点击确定的函数
// type: 类型； row: 表格列数据； fn：点击确定执行函数
const showHintConfirm = (type, row, fn) => {
    if (type == 'delete' && row.sale_status == 'on_sale') {
        deleteParams.value.goods_id = row.goods_id
        hintDialog.value.content = '该商品处于上架状态，是否删除该商品'
    } else if (type == 'delete' && row.sale_status !== 'on_sale') {
        deleteParams.value.goods_id = row.goods_id
        hintDialog.value.content = '是否删除该商品'
    } else if (type == 'off_sale') {
        hintDialog.value.content = '是否确认下架商品'
        goodsStatusParams.value.type = 'off_sale'
        goodsStatusParams.value.goods_stock = row.goods_stock
        goodsStatusParams.value.goods_id = row.goods_id
    }
    hintDialog.value.fn = fn
    hintDialogvisible.value = true
}

// 商品移动到顶端
const goodsGoTop = async(goods_id, goods_class_id) => {
    let { code, msg } = await Http.topGoodsSort({ goods_id: goods_id, goods_class_id: goods_class_id })
    if (code == 200) {
        ElMessage.success({ message: '操作成功' })
        getGoodsList()
        return
    }
    ElMessage.error({ message: msg })
}

// 删除商品
const deleteGoods = async() => {
    let { code, msg } = await Http.deleteGoods(deleteParams.value)
    if (code == 200) {
        ElMessage.success({ message: '操作成功' })
        getGoodsList()
        cancelDialog()
        return
    }
    ElMessage.error({ message: msg })
}

const onReset = () => {
    params.value.search_goods_name = ''
    params.value.search_goods_category_id = ''
    params.value.search_goods_status = ''
    params.value.search_goods_stock_status = ''
    cateParams.value.search_goods_name = ''
    cateParams.value.search_goods_category_id = ''
    cateParams.value.search_goods_status = ''
    cateParams.value.search_goods_stock_status = ''
    isSearch.value = false
    tableTitle.value = [
        {
            label: '排序',
            prop: 'sort',
            type: 'slot',
            width: 50
        },
        {
            label: '商品名称',
            prop: 'goods_title',
            width: 240,
            type: 'slot'
        },
        {
            label: '兑换所需积分',
            prop: 'goods_score',
            width: 120
        },
        {
            label: '商品类目',
            prop: 'category_name',
            width: 120
        }, 
        {
            label: '库存',
            prop: 'goods_stock',
            width: 100
        }, 
        {
            label: '商品状态',
            prop: 'sale_status',
            type: 'slot',
            width: 100
        }, 
        {
            label: '核销时间',
            prop: 'date',
            type: 'slot'
        },
        {
            label: '操作',
            prop: 'operation',
            fixed: 'right',
            type: 'slot',
            width: 230
        }
    ]
    drag(false)
    // getGoodsList()
    getCateList() 
}

const onSearch = () => {
    // groupInfo.value.search_keyword_id_arr = searchKeysVal.value
    // groupInfo.value.search_content = knowledgeInfo.search_content
    // groupInfo.value.get_sale_script_num = 1
    cateParams.value.search_goods_name = params.value.search_goods_name
    cateParams.value.search_goods_category_id = params.value.search_goods_category_id
    cateParams.value.search_goods_status = params.value.search_goods_status
    cateParams.value.search_goods_stock_status = params.value.search_goods_stock_status

    if (params.value.search_goods_name || params.value.search_goods_status || params.value.search_goods_stock_status || params.value.search_goods_category_id) {
        isSearch.value = true
        drag(true)

        tableTitle.value = [
            {
                label: '排序',
                prop: 'sort',
                type: 'slot',
                width: 50
            },
            {
                label: '商品名称',
                prop: 'goods_title',
                width: 240,
                type: 'slot'
            },
            {
                label: '兑换所需积分',
                prop: 'goods_score',
                width: 120
            },
            {
                label: '商品类目',
                prop: 'category_name',
                width: 120
            }, 
            {
                label: '库存',
                prop: 'goods_stock',
                width: 100
            }, 
            {
                label: '商品状态',
                prop: 'sale_status',
                type: 'slot',
                width: 100
            }, 
            {
                label: '核销时间',
                prop: 'date',
                type: 'slot'
            },
            {
                label: '操作',
                prop: 'operation',
                fixed: 'right',
                type: 'slot',
                width: 230
            }
        ]
    } else {
        isSearch.value = false
        drag(false)
        tableTitle.value = [
            {
                label: '排序',
                prop: 'sort',
                type: 'slot',
                width: 50
            },
            {
                label: '商品名称',
                prop: 'goods_title',
                width: 240,
                type: 'slot'
            },
            {
                label: '兑换所需积分',
                prop: 'goods_score',
                width: 120
            },
            {
                label: '商品类目',
                prop: 'category_name',
                width: 120
            }, 
            {
                label: '库存',
                prop: 'goods_stock',
                width: 100
            }, 
            {
                label: '商品状态',
                prop: 'sale_status',
                type: 'slot',
                width: 100
            }, 
            {
                label: '核销时间',
                prop: 'date',
                type: 'slot'
            },
            {
                label: '操作',
                prop: 'operation',
                fixed: 'right',
                type: 'slot',
                width: 230
            }
        ]
    }
    getGoodsList()
    getCateList() 
}

const goTo = (name, query) => {
    router.push({ name, query })
}

onMounted(() => {
    getTypeList()
    getCateList()
    drag(false)
    // document.body.addEventListener('click', e => {
    //     let goal = document.getElementsByClassName('table')[0]
    //     // console.log('eeeee', e)
    //     if (!e.path.includes(goal)) {
    //         keysInfo.search_name = ''
    //     }
    // })
    // // 搜索选择框加入箭头图标
    // var selecteIcon = document.querySelector('.keys-overflow-scoll .el-input--suffix .el-input__suffix-inner>i')
    // selecteIcon.classList.add('el-icon-arrow-up')

})
</script>
<style lang="scss">
    .table-search-box {
        width: 296px;
        flex-grow: 0;
        flex-shrink: 0;
        border-right: 1px solid #edeef2;
        padding-right: 16px;
        margin-right: 16px;
    }
    .table-tree{
        // height: 600px;
        // overflow-y: auto;
    }

    .table-search-input {
        margin-right: 8px;
    }

    .table-top-tip {
        color: #8c8c8c;
        font-size: 12px;
        margin-left: 8px;
    }

    .goods-img {
        display: block;
        width: 60px;
        height: 60px;
    }

    .customer-tree {
        width: calc(100vw - 693px);
        &.is-collapse{
            width:calc(100vw - 556px);
        }
    }

    .distribution-role-list {
        max-height:150px;
        overflow-y: auto;
        & > div {
            margin-top: 8px;
            font-size: 12px;
            cursor: pointer;

            &:first-child {
                margin-top: 22px;
            }

            .el-icon-check {
                margin-left: 8px;
            }
        }
    }

    .pd12 {
        padding: 12px;
    }

    .icon{
        font-size: 19px;
        vertical-align: middle;
    }
    .sync-btn{
        display: inline-block;
        width: 146px;
        height: 32px;
        background: #ffffff;
        border: 1px solid $customer-primary-color;
        border-radius: 2px;
        color: $customer-primary-color;
        text-align: center;
        padding: 4px 18px;
        cursor: pointer;
        &:hover{
            background-color: #e8f1ff;
        }
    }
    .item-tag-content{
        margin-right: 8px;
    }
    .table-blank {
        height: 600px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>