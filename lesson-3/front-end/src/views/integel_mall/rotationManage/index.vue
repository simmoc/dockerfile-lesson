<template>
    <div class="rotation-box">
        <div class="search-form">
            <el-form label-width="150px" :inline="true" size="small" :model="rotation" class="clearfix">
                <el-form-item label="轮播图名称：" class="mr20">
                    <el-input 
                        v-model="rotation.name"
                        placeholder="请输入轮播图名称"
                        class="width-class"
                    />
                </el-form-item>
                <el-form-item label="轮播图类型：" class="mr20">
                    <el-select 
                        v-model="rotation.type"
                        placeholder="请选择轮播图类型"
                        class="width-class"
                    >
                        <el-option
                            v-for="item in bannerType"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="轮播图开始时间：" class="mr20">
                    <el-date-picker
                        v-model="startTimes"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        :default-time="defaultTime"
                        @change="onDateChange(startTimes, 'start_time_s', 'start_time_e')"
                    />
                </el-form-item>
                <el-form-item label="轮播图结束时间：" class="mr20">
                    <el-date-picker
                        v-model="EndTimes"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        :default-time="defaultTime"
                        @change="onDateChange(EndTimes, 'end_time_s', 'end_time_e')"
                    />
                </el-form-item>
                <el-form-item class="right mr0">
                    <el-button type="default" size="small" @click="onReset">重置</el-button>
                    <el-button type="primary" size="small" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <page-main class="rotation-list">
            <div class="flex flex-align-center flex-justify-between">
                <div class="explain-test">轮播图管理列表</div>
                <el-button type="primary" size="small" @click="goTo('addRotation', {pageType: 'add'})">
                    <i class="el-icon-plus mr8" />
                    添加轮播图
                </el-button>
            </div>
            <CustomerTable
                :table-data="tableData"
                :need-pagination="true"
                class="order-table"
            > 
                <el-table-column label="排序" min-width="60"> 
                    <template #default="scope">
                        <div class="can-drag-icon flex flex-align-center flex-space-center" style="height: 50px">
                            <img
                                style="width: 12px; height: 12px; margin-left: 8px;vertical-align: middle;"
                                src="@/assets/images/knowledgeBase/drag.svg"
                                :data-sort="scope.row.sort"
                                alt=""
                            >
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="轮播图名称" min-width="350">
                    <template #default="scope">
                        <div>
                            {{ scope.row.name }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="轮播图类型" min-width="200">
                    <template #default="scope">
                        <div>
                            {{ showType(scope.row.type) }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="轮播图展示时间" min-width="240">
                    <template #default="scope">
                        <div>
                            {{ scope.row.start_time }} 至 <br>
                            {{ scope.row.end_time }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="首页轮播图" min-width="110">
                    <template #default="scope">
                        <div class="goods-img">
                            <img 
                                :src="scope.row.banner_img" 
                                alt="轮播图首页"
                                @click="openPreview(scope.row.banner_img)"
                            >
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="关联小程序" min-width="170">
                    <template #default="scope">
                        <div>
                            {{ scope.row.mini_program_title || '—' }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="详情页首图" min-width="162">
                    <template #default="scope">
                        <div v-if="scope.row.detail_img_first && scope.row.detail_img_first[0]" class="flex flex-align-end">
                            <div class="goods-img">
                                <img
                                    :src="scope.row.detail_img_first[0]"
                                    alt="详情页首图" 
                                    @click="openPreview(scope.row.detail_img_first)"
                                >
                            </div>
                            <div v-if="scope.row.detail_img_first.length > 1" class="ml6">...</div>
                        </div>
                        <div v-else>—</div>
                    </template>
                </el-table-column>
                <el-table-column label="详情页尾图" min-width="110">
                    <template #default="scope">
                        <div v-if="scope.row.detail_img_last && scope.row.detail_img_last[0]" class="flex flex-align-end">
                            <div class="goods-img">
                                <img
                                    :src="scope.row.detail_img_last[0]"
                                    alt="详情页尾图" 
                                    @click="openPreview(scope.row.detail_img_last)"
                                >
                            </div>
                            <div v-if="scope.row.detail_img_last.length > 1" class="ml6">...</div>
                        </div>
                        <div v-else>—</div>
                    </template>
                </el-table-column>
                
                <el-table-column
                    label="操作"
                    prop=""
                    fixed="right"
                    width="100"
                >
                    <template #default="{ row }">
                        <el-button
                            type="text"
                            size="mini"
                            @click="goTo('editRotation', { banner_id: row.banner_id, pageType: 'edit'})"
                        >
                            编辑
                        </el-button>
                        <el-button
                            type="text"
                            size="mini"
                            @click="OpenCompleteOrder(row.banner_id)"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </CustomerTable>
            <!-- 分页 -->
            <customer-pagination
                v-model:limit="rotation.page_size"
                v-model:page="rotation.page"
                :total="total"
                :get-data="getBannerList"
            />
        </page-main>
        <!-- 图片预览 -->
        <el-dialog
            :model-value="imageDialogVisble"
            title="图片预览"
            custom-class="sop-add-other-content-dialog"
            width="960px"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            @close="closeDialog"
        >
            <div class="image-dialog flex flex-align-center" :class="[detailImg.length > 1 ? 'flex-justify-between' : 'flex-justify-center']">
                <div v-if="detailImg.length > 1" class="image-dialog-circular tc" @click="switchImg(-1)">
                    <i class="el-icon-arrow-left" />
                </div>
                <div class="image-box">
                    <img :src="detailImg[detailImgIndex]" alt="">
                </div>
                <!-- <el-image style="height: 100%;" class="flex-g1" :src="detailImg[detailImgIndex]" /> -->
                <div v-if="detailImg.length > 1" class="image-dialog-circular tc" @click="switchImg(1)">
                    <i class="el-icon-arrow-right" />
                </div>
            </div>
        </el-dialog>
        <!-- 删除 -->
        <CustomerDialog title="提示" :dialog-visible="deleteDialogvisible" width="450px" :confirm-fn="deleteBanner" @cancel="cancelDialog">
            <div class="group_name">是否删除该轮播图</div>
        </CustomerDialog>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Http from '@/util/request'
import { ElMessage } from 'element-plus'
import Sortable from 'sortablejs'
import { useRouter } from 'vue-router'

const router  = useRouter()

// 搜索参数
const rotation = ref({
    page: 1,
    page_size: 10,
    name: '',
    type: '',
    start_time_s: '',
    start_time_e: '',
    end_time_s: '',
    end_time_e: ''
})
// el-date-picker默认时间 '00:00:00', '23:59:59'
const defaultTime = ref([
    new Date(2000, 1, 1, 0, 0, 0),
    new Date(2000, 2, 1, 23, 59, 59)
])
// 条数
const total = ref(0)
// 存储查询开始时间数组
const startTimes = ref([])
// 存储查询结束时间数组
const EndTimes = ref([])
// 轮播图类型存储
const bannerType = ref([])
const tableData = ref([])
// const detailImgUrl = ref('')
const detailImg = ref([])
const detailImgIndex = ref(0)
const imageDialogVisble = ref(false)
// 存储商品排序
const sortParams = ref([])
// ‘删除’弹窗判断
const deleteDialogvisible = ref(false)
// 存储当前轮播图id
const bannerId = ref(null)

// 重置
const onReset = () => {
    startTimes.value = []
    EndTimes.value = []
    rotation.value = {}
    drag(false)
    getBannerList()
}

// 查询
const onSearch = () => {
    drag(true)
    getBannerList()
}
// 获取轮播图列表
const getBannerList = async() => {
    let { data } = await Http.getBannerList(rotation.value)
    tableData.value = data.list
    total.value = data.total_num
    console.log('tableData.value', tableData.value)
}

const showType = type => {
    let obj = {
        associated_mini_program: '关联小程序',
        associated_goods: '关联商品',
        not_associated_goods: '不关联商品'
    }
    return obj[type]
}

// 获取轮播图类型
const getBannertype = async() => {
    let { data } = await Http.getBannertype()
    bannerType.value = data
}

// image dialog关闭
const closeDialog = () => {
    imageDialogVisble.value = false
    // imagesUrl.value = ''
}

// 打开图片预览
const openPreview = images => {
    detailImg.value = []
    if (typeof images == 'string') {
        detailImg.value[0] = images
    } else {
        detailImg.value = images
    }
    detailImgIndex.value = 0
    imageDialogVisble.value = true
}

// 点击切换获取详情页
const switchImg = i => {
    // console.log(detailImg.value[detailImgIndex.value], detailImgIndex.value)
    if (detailImgIndex.value == 0 && i == -1) {
        ElMessage.warning('已经是第一张')
        return
    } else if (detailImgIndex.value == (detailImg.value.length - 1) && i == 1) {
        ElMessage.warning('已经是最后一张')
        return
    }
    detailImgIndex.value += i
}

// 时间查询
const onDateChange = (times, start, end) => {
    if (times && times[0]) {
        rotation.value[start] = times[0]
        rotation.value[end] = times[1]
        return
    }
    rotation.value[start] = ''
    rotation.value[end] = ''
}

// 更改商品顺序
const updateBannerSort = async() => {

    let { code, msg } = await Http.updateBannerSort({
        banner_data: sortParams.value
    })
    if (code == 200) {
        ElMessage.success({ message: '操作成功' })
        tableData.value = []
        getBannerList()
        return
    }
    ElMessage.warning({ message: msg })
}

// 拖拽商品
const drag = disabled => {
    // console.log('禁止拖动', disabled)
    const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
    // console.log('elelel', el)
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
                arr.push({ id: item.id, sort: 100 - index })
            })
            sortParams.value = arr
            updateBannerSort()
            // console.log(updateBannerSort(arr))
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
const goTo = (name, query) => {
    router.push({ name, query })
}
// 取消‘删除’弹出框
const cancelDialog = () => {
    deleteDialogvisible.value = false
}
// ‘删除’打开弹窗
const OpenCompleteOrder = id => {
    // console.log('11111', id)
    bannerId.value = id
    deleteDialogvisible.value = true
}

// 删除完成
const deleteBanner = async() => {
    let res = await Http.deleteBanner({
        id: bannerId.value
    })
    // console.log('2222222', res)
    if (res.code === 200) {
        ElMessage.success({
            message: '已删除该轮播图!'
        })
        deleteDialogvisible.value = false
        getBannerList()
    }
}

onMounted(() => {
    getBannerList()
    getBannertype()
    drag(false)
})
</script>

<style lang="scss" scoped>
.rotation-box {
    min-height: calc(100vh - 113px);
}
// 搜索条件头间距限制
.search-width {
    margin-left: -27px;
}
// 搜索条件宽度
.width-class {
    width:274px
}
.rotation-list {
    min-height: 500px;
}
.order-table {
    margin-top: -4px;
}
.explain-test {
    font-size: 16px;
    font-weight: 500;
    color: #000000;
    line-height: 24px;
}
.goods-img {
    display: block;
    width: 60px;
    height: 60px;
    overflow: hidden;
    img {
        height: 100%;
        width: auto;
    }
}
.image-box {
    // height: 650px;
    width: 800px;
    overflow: hidden;
    max-height: 650px;
    img {
        width: 100%;
        height: auto;
    }
}
.image-dialog-circular {
    width: 30px;
    height: 30px;
    line-height: 30px;
    background: #8c8c8c;
    border-radius: 4em;
    flex-grow: 0;
    flex-shrink: 0;
}
</style>
