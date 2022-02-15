<template>
    <div class="mt16">
        <div class="page-scroll">
            <div
                v-if="route.query.pageType == 'edit'"
                class="head-content"
            >
                <div class="head-content-item">
                    创建成员：{{ (rotation.creator_name) || '—' }}
                </div>
                <div class="head-content-item">
                    创建时间：{{ (rotation.create_time) || '—' }}
                </div>
                <div class="head-content-item">
                    最后修改成员：{{ (rotation.update_name) || '—' }}
                </div>
                <div class="head-content-item ">
                    最后修改时间：{{ (rotation.update_time) || '—' }}
                </div>
            </div>
            <page-main class="mt0">
                <el-form
                    size="small"
                    label-position="top"
                    label-width="520px"
                    :model="rotation"
                    :rules="rules"
                >
                    <el-form-item label="轮播图名称" prop="name">
                        <div class="width-box-class">
                            <el-input v-model="rotation.name" maxlength="20" show-word-limit placeholder="请输入轮播图名称" />
                        </div>
                    </el-form-item>
                    <el-form-item label="轮播图类型" prop="type">
                        <div class="width-box-class">
                            <el-select v-model="rotation.type" style="width:100%" placeholder="请选择轮播图类型">
                                <el-option
                                    v-for="item in bannerType"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key"
                                />
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="轮播图展示时间" prop="start_time">
                        <div class="width-box-class">
                            <el-date-picker
                                v-model="startEndTimes"
                                value-format="YYYY-MM-DD HH:mm:ss"
                                :default-time="defaultTime"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right"
                                style="width: 100%"
                                @change="onDateChange"
                            />
                        </div>
                    </el-form-item>
                    <el-form-item label="首页轮播图" prop="banner_img">
                        <div class="width-box-class">
                            <ImagesUpload :url="rotation.banner_img ? [rotation.banner_img] : []" :max="1" :width="80" :height="80" @urlChange="(url) => imgsChange('banner_img', url)" />
                            <div class="mt8 c8c fs12 lh22">建议尺寸：800*248像素</div>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="rotation.type == 'associated_mini_program'" label="小程序名称" prop="mini_program_title">
                        <div class="width-box-class">
                            <el-input v-model="rotation.mini_program_title" maxlength="30" show-word-limit placeholder="请输入小程序名称" />
                        </div>
                    </el-form-item>
                    <el-form-item v-if="rotation.type == 'associated_mini_program'" label="小程序Appid：" prop="app_id">
                        <div class="width-box-class">
                            <el-input v-model="rotation.app_id" maxlength="32" show-word-limit placeholder="请输入小程序Appid" />
                        </div>
                    </el-form-item>
                    <el-form-item v-if="rotation.type == 'associated_mini_program'" label="小程序Page路径：" prop="page_url">
                        <div class="width-box-class">
                            <el-input v-model="rotation.page_url" maxlength="200" show-word-limit placeholder="请输入小程序Page路径" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" />
                        </div>
                    </el-form-item>
                    <el-form-item v-if="rotation.type != 'associated_mini_program'" label="详情页首图" prop="detail_img_first">
                        <div class="width-box-class">
                            <ImagesUpload v-model:url="rotation.detail_img_first" :max="10" :width="80" :height="80" />
                            <div class="mt8 c8c fs12 lh22">建议尺寸：800*高度不限，最多上传10张</div>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="rotation.type == 'associated_goods'" label="详情页尾图" prop="detail_img_last">
                        <div class="width-box-class">
                            <ImagesUpload v-model:url="rotation.detail_img_last" :max="10" :width="80" :height="80" />
                            <div class="mt8 c8c fs12 lh22">建议尺寸：800*高度不限，最多上传10张</div>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="rotation.type == 'associated_goods'">
                        <div class="width-box-class mt24">
                            <label class="el-form-item__label">
                                <i class="color-red">*</i>
                                关联商品
                            </label>
                            <div v-if="relationGoods.length != 0">
                                <draggable v-model="relationGoods" @end="dragEnd">
                                    <template #item="{ element: item, index }">
                                        <rolationGoodsItem
                                            @deleteItem="deleteItem(index)"
                                        >
                                            <div class="flex flex-align-center ml8 mt8 mb8 mr12">
                                                <img class="goods-img flex-g0 flex-s0" :src="item.goods_thumb_img || item.thumb_img">
                                                <div class="goods-content ml8 lh24">
                                                    <el-popover
                                                        :width="200"
                                                        trigger="hover"
                                                    >
                                                        <template #reference>
                                                            <div class="goods-title overflow-ellipsis">{{ item.goods_title || item.title }}</div>
                                                        </template>
                                                        <div>{{ item.goods_title || item.title }}</div>
                                                    </el-popover>
                                                    <div class="flex flex-justify-between goods-score-status">
                                                        <div>{{ item.goods_score || item.score }} 积分</div>
                                                        <div>{{ item.sale_status == 'on_sale' ? '已上架' : '已下架' }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </rolationGoodsItem>
                                    </template>
                                </draggable>
                            </div>
                            <el-button type="primary" style="width: 100%;" :disabled="relationGoods.length > 100" @click="relationGood()">
                                <i class="el-icon-plus" />
                                添加商品
                            </el-button>
                        </div>
                    </el-form-item>
                    <div class="width-box-class mt24">
                        <div class="mt24 tr">
                            <el-button type="default" size="small" @click="onCancel">取消</el-button>
                            <el-button type="primary" size="small" @click="onSubmit">提交</el-button>
                        </div>
                    </div>
                </el-form>
            </page-main>
            <!-- 关联商品 -->
            <!-- <CustomerDialog title="添加商品" :dialog-visible="selectVisible" width="83%" :custom-confirm="true" @cancel="dialogCancel">
                <template #text>
                    <span class="mr24 select-goods">
                        当前已选择 <span class="select-goods-text">{{ relationGoods.length }}</span> 件商品
                    </span>
                </template>
                <template #confirm>
                    <el-button type="primary" size="small" @click="onConfirm()">确认</el-button>
                </template>
                <addGoods 
                    :echo-select-goods="echoSelectGoods"
                    :click-edit="clickEdit"
                    @selectGoods="selectGoods" 
                />
            </CustomerDialog> -->
            <el-dialog
                v-model="selectVisible"
                title="添加商品"
                width="83%"
                top="3vh"
                :before-close="dialogCancel"
            >
                <addGoods 
                    :echo-select-goods="echoSelectGoods"
                    :click-edit="clickEdit"
                    @selectGoods="selectGoods" 
                />
                <template #footer>
                    <span class="mr24 select-goods">
                        当前已选择 <span class="select-goods-text">{{ dialogRelationGoods.length }}</span> 件商品
                    </span>
                    <span class="dialog-footer">
                        <el-button size="small" @click="dialogCancel">取消</el-button>
                        <el-button type="primary" size="small" @click="onConfirm">确认</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
import { nextTick, onMounted } from 'vue'
import Http from '@/util/request'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import addGoods from './compontent/addGoods.vue'
import draggable from 'vuedraggable'

const route = useRoute()
const router = useRouter()

// 参数获取&详情数据
const rotation = ref({
    name: '',
    type: 'not_associated_goods',
    banner_img: '',
    start_time: '',
    end_time: '',
    mini_program_title: '',
    associated_mini_program: '',
    app_id: '',
    page_url: '',
    detail_img_first: [],
    detail_img_last: [],
    associated_goods_data: []
})
// 轮播图类型存储
const bannerType = ref([])
// 存储查询时间数组
const startEndTimes = ref([])
// 存储所传的关联商品
const relationGoods = ref([])
// 存储dialog点击确定的商品
const dialogRelationGoods = ref([])
// 回显所选商品
const echoSelectGoods = ref({})
const rules = ref({
    name: [
        { required: true, message: '轮播图名称不能为空', trigger: 'blur' }
    ],
    type: [
        { required: true, message: '轮播图类型不能为空', trigger: 'change' }
    ],
    start_time: [
        { required: true, message: '轮播图时间不能为空', trigger: 'change' }
    ],
    mini_program_title: [
        { required: true, message: '小程序名称不能为空', trigger: 'blur' }
    ],
    app_id: [
        { required: true, message: '小程序Appid不能为空', trigger: 'blur' }
    ],
    page_url: [
        { required: true, message: '小程序Page路径不能为空', trigger: 'blur' }
    ],
    banner_img: [
        { required: true, message: '首页轮播图不能为空', trigger: 'blur' }
    ],
    detail_img_first: [
        { type: 'array', required: true, message: '详情页首图不能为空', trigger: 'blur' }
    ]
})
const clickEdit = ref(false)
const selectVisible = ref(false)
// el-date-picker默认时间 '00:00:00', '23:59:59'
const defaultTime = ref([
    new Date(2000, 1, 1, 0, 0, 0),
    new Date(2000, 2, 1, 23, 59, 59)
])
// 判断点击确定、取消和弹窗关闭按钮，来确定是否接受商品传值
// const checkValue = ref(false)

// 获取轮播图类型
const getBannertype = async() => {
    let { data } = await Http.getBannertype()
    bannerType.value = data
}

// 时间选择
const onDateChange = () => {
    if (startEndTimes.value && startEndTimes.value[0]) {
        rotation.value.start_time = startEndTimes.value[0]
        rotation.value.end_time = startEndTimes.value[1]
        return
    }
    rotation.value.start_time = ''
    rotation.value.end_time = ''
}

// 提交
const onSubmit = async() => {
    // console.log('relationGoods.value', relationGoods.value)
    if (relationGoods.value.length > 0 && rotation.value.type == 'associated_goods') {
        rotation.value.associated_goods_data = []
        relationGoods.value.forEach((element, i) => {
            rotation.value.associated_goods_data[i] = {}
            rotation.value.associated_goods_data[i].goods_class_id = element.goods_class_id
            rotation.value.associated_goods_data[i].sort = element.sort
            rotation.value.associated_goods_data[i].score_goods_id = element.score_goods_id
        })
    } else {
        relationGoods.value = []
    }
    // console.log('rotation.value', rotation.value.associated_goods_data)

    // 查看是否未填写数据
    if (rotation.value.name == '' || rotation.value.type == '' || rotation.value.start_time == '' || rotation.value.banner_img == '') {
        ElMessage.warning({
            message: '您有选项未填写，请填写完毕再提交'
        })
        return
    } else if (rotation.value.type == 'not_associated_goods') {
        if (JSON.stringify(rotation.value.detail_img_first) == '[]') {
            ElMessage.warning({
                message: '您有选项未填写，请填写完毕再提交'
            })
            return
        }
    } else if (rotation.value.type == 'associated_goods') {
        if (JSON.stringify(rotation.value.detail_img_first) == '[]' || JSON.stringify(rotation.value.associated_goods_data) == '[]') {
            ElMessage.warning({
                message: '您有选项未填写，请填写完毕再提交'
            })
            return
        }
    } else {
        if (rotation.value.mini_program_title == '' || rotation.value.app_id == '' || rotation.value.page_url == '') {
            ElMessage.warning({
                message: '您有选项未填写，请填写完毕再提交'
            })
            return
        }
    }
    
    rotation.value.associated_goods_data = JSON.stringify(rotation.value.associated_goods_data)
    if (route.query.pageType == 'add') {
        let res = await Http.addBanner(rotation.value)
        if (res.code === 200) {
            ElMessage.success({
                message: '新增成功'
            })
            router.push({
                name: 'rotationManage'
            })
        }
    } else {
        let res = await Http.updateBannerEdit(rotation.value)
        if (res.code === 200) {
            ElMessage.success({
                message: '修改成功'
            })
            router.push({
                name: 'rotationManage'
            })
        }
    }
}

// 页面取消
const onCancel = () => {
    router.push({
        name: 'rotationManage'
    })
}

// 拖拽操作
const dragEnd = () => {
    // relationGoods
    relationGoods.value.forEach((item, index) => {
        relationGoods.value[index].sort = 200 - index
    })
}

// 获取详情
const getBannerDetail = async id => {
    let { data } = await Http.getBannerDetail({
        id
    })
    if (!data.detail_img_last) {
        data.detail_img_last = []
    }
    if (!data.detail_img_first) {
        data.detail_img_first = []
    }
    if (data.type == 'associated_goods') {
        relationGoods.value = data.associated_goods_data
        // console.log('relationGoods.value', relationGoods.value)
    }
    rotation.value = data
    startEndTimes.value.push(rotation.value.start_time, rotation.value.end_time)
    // console.log('getBannerDetail', rotation.value)
}

// 单张图片变动
const imgsChange = (key, list) => {
    // console.log('获取到了数组', list)
    rotation.value[key] = list[0] || ''

}

// 存储所传商品,检测商品数量
const selectGoods = goods => {
    dialogRelationGoods.value = goods
    // relationGoods.value =  dialogRelationGoods.value
    if (relationGoods.value.length > 100) {
        ElMessage.warning({
            message: '当前关联商品数量超过100件，请减少至100件商品!'
        })
        return
    }
    // console.log('选择商品时候传过来的数据', dialogRelationGoods.value)
}

// 确定，关闭弹窗
const onConfirm = () => {
    relationGoods.value =  dialogRelationGoods.value
    selectVisible.value = false
    // console.log('点击确认')
}

// 删除关联商品
const deleteItem = index => {
    relationGoods.value.splice(index, 1)
    // console.log('relationGoods', relationGoods.value)
}

// 点击关联商品按钮：打开弹窗
const relationGood = () => {
    selectVisible.value = true
    echoSelectGoods.value = relationGoods.value

    // setTimeout(() => {
    //     clickEdit.value = !clickEdit.value
    // }, 500)
    nextTick(() => {
        clickEdit.value = !clickEdit.value
    })
    // console.log('echoSelectGoods', echoSelectGoods.value)
}

// 弹窗取消
const dialogCancel = () => {
    // relationGoods.value = []
    // console.log('取消的relationGoods', relationGoods.value)
    selectVisible.value = false
}

onMounted(() => {
    getBannertype()
    if (route.query.pageType == 'edit') {
        getBannerDetail(route.query.banner_id)
    }
})
</script>

<style scoped lang="scss">
.width-box-class {
    width: 520px;
}
.detail-box {
    margin-top: 16px;
}
.width-class {
    width:520px
}
.color-red {
    color: #ff3b34;
}
// 顶部编辑人员信息
.head-content {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 24px;
    padding-right: 24px;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: flex-start;
    background: #EDEEF2;
    margin-left: 24px;
    margin-right: 24px;
    // margin-top: 18px;
    // margin-bottom: -16px;
}
.head-content-item {
    margin-right: 32px;
}
.select-goods {
    font-size: 14px;
    font-weight: 400;
    color: #606266;
    line-height: 14px;
    .select-goods-text {
        color: rgba(23, 115, 250, 1);
    }
}
.goods-img {
    // display: block;
    width: 44px;
    height: 44px;
    // line-height: 44px;
}
.goods-title {
    max-width: 155px;
    font-size: 14px;
    font-weight: 400;
    color: #000000;
    line-height: 20px;
}
.goods-score-status {
    font-size: 12px;
    font-weight: 400;
    color: #1C1F23;
    opacity: 0.6;
    line-height: 17px;
}
.goods-content {
    width: 100%;
}
</style>