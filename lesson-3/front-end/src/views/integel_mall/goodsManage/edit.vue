<template>
    <div class="pt20">
        <div class="page-scroll">
            <!-- <editPageHeader :update-info="params" /> -->
            <div
                v-if="pageType == 'edit'"
                class="head-content mt0 mr16"
            >
                <div class="head-content-item">
                    创建成员：{{
                        (params && params.creator_name) ||
                            (params && params.member_name) ||
                            '—'
                    }}
                </div>
                <div class="head-content-item">
                    创建时间：{{ (params && params.create_time) || '—' }}
                </div>
                <div class="head-content-item">
                    最后修改成员：{{ (params && params.member_name) || '—' }}
                </div>
                <div class="head-content-item ">
                    最后修改时间：{{ (params && params.update_time) || '—' }}
                </div>
            </div>
            <page-main class="mr16 mt0">
                <div>
                    <CustomerTitle title="基本信息" />
                </div>
                <el-form
                    ref="ruleForm"
                    :model="params"
                    :rules="rules"
                    size="small"
                    class="demo-ruleForm"
                    height="32px"
                    label-width="520px"
                    label-position="top"
                >
                    <el-form-item label="商品类目" prop="goods_category_id">
                        <typeSelect 
                            v-model:typeId="params.goods_category_id" 
                            v-model:goodsType="params.goods_type" 
                            :type-list="typeList"
                            :can-select="pageType == 'edit'"
                            @getTypeList="getTypeList"
                        />
                    </el-form-item>
                    <el-form-item label="商品分类" prop="goods_class_id_arr">
                        <el-row>
                            <div class="col-width">
                                <el-select
                                    v-model="params.goods_class_id_arr"
                                    el-select
                                    placeholder="请输入商品分类"
                                    no-match-text="no data"
                                    no-data-text="no data"
                                    style="width:100%"
                                    multiple
                                    clearable
                                >
                                    <el-option v-for="item in cateList" :key="item.goods_class_id" :value="item.goods_class_id" :label="item.name" />
                                </el-select>
                            </div>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="商品名称" prop="goods_title">
                        <el-row>
                            <div class="col-width">
                                <el-input v-model="params.goods_title" size="small" show-word-limit maxlength="50" placeholder="请输入商品名称" />
                            </div>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="商品副标题">
                        <el-row>
                            <div class="col-width">
                                <el-input v-model="params.goods_sub_title" size="small" show-word-limit maxlength="50" placeholder="请输入商品副标题" />
                            </div>
                        </el-row>
                    </el-form-item>
                    <el-form-item required label="商品详情页顶部图" prop="goods_img">
                        <el-row>
                            <div class="col-width">
                                <!-- {{ params.goods_img }} -->
                                <ImagesUpload v-model:url="params.goods_img" :max="9" :width="80" :height="80" />
                                <div class="mt8 c8c fs12">建议尺寸：800*800像素，你可以拖拽图片调整顺序，最多上传9张</div>
                            </div>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="商品列表图">
                        <el-row>
                            <div class="col-width">
                                <ImagesUpload :url="params.goods_thumb_img ? [params.goods_thumb_img] : []" :max="1" :width="80" :height="80" @urlChange="(url) => imgsChange('goods_thumb_img', url)" />
                                <div class="mt8 c8c fs12">建议尺寸：310*310像素，不传则默认为商品详情顶部图的第一张图</div>
                            </div>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="小程序分享标题">
                        <el-row>
                            <div class="col-width relative">
                                <el-input v-model="params.goods_share_title" size="small" show-word-limit maxlength="50" placeholder="请输入小程序分享标题" />
                                <div class="mt8 c8c fs12">该标题为分享商品时显示的标题，不填则默认为商品名称</div>
                                <div class="preview-mini pt16 pl16 pr16">
                                    <div class="mini-title show-line2 fwb fs14 c26 mb8">{{ params.goods_share_title ? params.goods_share_title : '小程序分享标题' }}</div>
                                    <div class="mini-bg-img">
                                        <img v-if="params.goods_share_img" :src="params.goods_share_img " alt="">
                                    </div>
                                    <div class="mini-birder mt16" />
                                    <div class="flex mini-icon-box flex-align-center">
                                        <img class="mini_icon" src="@/assets/images/mall/miniprogram.svg" alt="">
                                        <span class="c8c fs14 ml8">小程序</span>
                                    </div>
                                </div>
                            </div>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="小程序分享图">
                        <el-row>
                            <div class="col-width">
                                <ImagesUpload :url="params.goods_share_img ? [params.goods_share_img] : []" :max="1" :width="80" :height="80" @urlChange="(url) => imgsChange('goods_share_img', url)" />
                                <!-- <ImageUpload :width="80" :height="80" :ext="['png', 'jpg']" :size="size" :url="webPageForm.file_url" @on-success="uploadImg" @removeUrl="removeUrl" /> -->
                                <div class="mt8 c8c fs12">建议尺寸：420*336像素，不传则默认为商品详情顶部图的第一张图</div>
                            </div>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="商品订单列表图">
                        <el-row>
                            <div class="col-width">
                                <ImagesUpload :url="params.goods_order_img ? [params.goods_order_img] : []" :max="1" :width="80" :height="80" @urlChange="(url) => imgsChange('goods_order_img', url)" />
                                <!-- <ImagesUpload :max="1" :width="80" :height="80" /> -->
                                <div class="mt8 c8c fs12">建议尺寸：120*120像素，不传则默认为商品详情顶部图的第一张图</div>
                            </div>
                        </el-row>
                    </el-form-item>
                    <div class="pt8">
                        <CustomerTitle title="价格库存" />
                    </div>
                    <el-form-item required label="兑换所需积分">
                        <el-row>
                            <div class="col-width">
                                <el-input
                                    v-model.number="params.goods_score"
                                    autocomplete="off"
                                    placeholder="请输入兑换所需积分"
                                    size="small"
                                    maxlength="8"
                                    @keyup="limitNunber(params.goods_score, 'goods_score')"
                                >
                                    <template #append>
                                        <div class="tc" style="width: 27px">积分</div>
                                    </template>
                                </el-input>
                            </div>
                        </el-row>
                    </el-form-item>
                    <el-form-item required label="库存">
                        <el-row>
                            <div class="col-width">
                                <el-input
                                    v-model.number="params.goods_stock"
                                    autocomplete="off"
                                    placeholder="请输入库存"
                                    size="small"
                                    maxlength="8"
                                    @keyup="limitNunber(params.goods_stock, 'goods_stock')"
                                >
                                    <template #append>
                                        <div class="tc" style="width: 27px">件</div>
                                    </template>
                                </el-input>
                            </div>
                        </el-row>
                    </el-form-item>
                    <div class="pt8">
                        <CustomerTitle title="商品详情" />
                    </div>
                    <el-form-item label="详情图" prop="goods_details_img">
                        <el-row>
                            <div class="col-width">
                                <ImagesUpload v-model:url="params.goods_details_img" :max="10" :width="80" :height="80" />
                                <div class="mt8 c8c fs12">建议尺寸：800*高度不限，最多上传10张</div>
                            </div>
                        </el-row>
                    </el-form-item>
                    <div v-if="params.goods_type == 'arrival'" class="pt8">
                        <CustomerTitle title="其他信息" />
                    </div>
                    <el-form-item v-if="params.goods_type == 'arrival'" required label="核销时间">
                        <el-row>
                            <div class="col-width">
                                <el-radio-group v-model="params.is_validity_time_type">
                                    <el-radio label="relative_time">
                                        <span class="mr8 c26">确认兑换后</span>
                                        <!-- <el-input
                                        v-model.number="params.relative_days"
                                        :disabled="params.is_validity_time_type !== 'relative_time'"
                                        autocomplete="off"
                                        size="small"
                                        style="width: 64px"
                                        @oninput="goodsStatusParams.relative_days=goodsStatusParams.relative_days.replace(/[^\d]/g,'')"
                                    /> -->
                                        <el-input-number
                                            v-model="params.relative_days"
                                            :disabled="params.is_validity_time_type !== 'relative_time'" 
                                            :controls="false" :precision="0"
                                            :max="999" 
                                            style="width: 64px" @keyup="limitNunber(params.relative_days, 'relative_days')"
                                        />
                                        <span class="ml8 c26">天内可用</span>
                                    </el-radio><br>
                                    <el-radio label="absolute_time" class="mt16">
                                        <span class="mr8 c26">在</span>
                                        <el-date-picker
                                            v-model="absoluteTime"
                                            :disabled="params.is_validity_time_type !== 'absolute_time'"
                                            value-format="YYYY-MM-DD HH:mm:ss"
                                            type="datetimerange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                            :default-time="defaultTime"
                                            align="right"
                                            style="width: calc(100% - 74px); min-width: 340px"
                                            @change="changeTime"
                                        />
                                        <span class="ml8 c26">内可用</span>
                                    </el-radio>
                                </el-radio-group>
                            </div>
                        </el-row>
                    </el-form-item>
                    <el-row class="mt24">
                        <div class="col-width">
                            <div v-if="params.sale_status == 'on_sale'" class="alert-info flex pl16 flex-align-center">
                                <i class="el-icon-warning color-primary fs14" />
                                <div class="info-test fs14 cl26 ml8">温馨提示：提交后默认为上架状态</div>
                            </div>
                            <div v-else class="alert-info-yellow flex pl16 flex-align-center">
                                <i class="el-icon-warning warning-yellow fs14" />
                                <div class="info-test fs14 cl26 ml8">温馨提示：提交后默认为下架状态</div>
                            </div>
                            <div class="mt24 tr">
                                <el-button type="default" size="small" @click="onCancel">取消</el-button>
                                <el-button type="primary" size="small" @click="onSubmit">提交</el-button>
                            </div>
                        </div>
                    </el-row>
                </el-form>
            </page-main>
        </div>
        <CustomerDialog title="提示" :dialog-visible="backConfirm" cus-header width="480px" :confirm-fn="goBack" @cancel="backConfirm = false">
            <div>
                当前页面未保存，请确认是否关闭该页面?
            </div>
        </CustomerDialog> 
    </div>         
</template>

<script setup>
import typeSelect from './components/typeSelect.vue'
import { ref, onMounted } from 'vue'
import Http from '@/util/request'
import { bounce } from '@/util/index'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()

const backConfirm = ref(false)

const pageType = ref('add')
const params = ref({
    goods_category_id: '',
    goods_class_id_arr: [],
    goods_title: '',
    goods_sub_title: '',
    goods_img: [],
    goods_type: '',
    goods_stock: '',
    goods_score: '',
    goods_thumb_img: '',
    goods_share_img: '',
    goods_share_title: '',
    goods_order_img: '',
    goods_details_img: [],
    is_validity_time_type: '',
    relative_days: '',
    validity_start_time: '',
    validity_end_time: ''
})
// const copyParams = ref('')
const ruleForm = ref(null)
const defaultTime = ref([
    new Date(2000, 1, 1, 0, 0, 0),
    new Date(2000, 2, 1, 23, 59, 59)
])
// 验证方法
const rules = ref({
    goods_title: [
        {
            required: true,
            message: '请输入商品名称',
            trigger: 'blur'
        }
    ],
    goods_category_id: [
        {
            required: true,
            message: '请选择商品类目',
            trigger: 'change'
        }
    ],
    goods_class_id_arr: [
        {
            type: 'array',
            required: true,
            message: '请选择商品分类',
            trigger: 'blur'
        }
    ],
    goods_img: [
        {
            type: 'array',
            required: true,
            message: '请上传商品详情页顶部图',
            trigger: 'upload'
        }
    ],
    // goods_stock: [
    //     {
    //         required: true,
    //         message: '请输入商品库存',
    //         trigger: 'blur'
    //     }
    // ],
    // goods_score: [
    //     {
    //         required: true,
    //         message: '请输入商品兑换所需积分',
    //         trigger: 'blur'
    //     }
    // ],
    goods_details_img: [
        {
            type: 'array',
            required: true,
            message: '请上传商品详情图',
            trigger: 'change'
        }
    ]

})

// 自定义表单验证-数组
// function validateArray(rule, value, callback) {
//     console.log('规则', rule, value)
//     callback()
//     // if (value) 
// }
// const goods_thumb_img = ref([])
// const goods_share_img = ref([])
// const goods_order_img = ref([])

const cateParams = ref({
    search_class_name: '',
    search_goods_name: '',
    search_goods_category_id: '',
    search_goods_status: '',
    search_goods_stock_status: ''
})
const cateList = ref([])
const typeList = ref([])

const absoluteTime = ref([])

// const uploadUrl = () => {
//     let baseUrl = import.meta.env.VITE_APP_API_BASEURL
//     console.log('baseUrl', import.meta.env.VITE_APP_API_BASEURL + '/file/upload')
//     return baseUrl + '/file/upload'
// }
// 限制只能输入正整数
const limitNunber = bounce((e, key) => {
    // console.log('函数', e, key)
    let flag = new RegExp('^[0-9]([0-9])*$').test(e)
    console.log(e, flag)
    if (!flag) {
        params.value[key] = e.replace(/[^[0-9]]*/g, '')
    }
}, 100)

// 设置默认时间点
// const defaultData = () => {

// }

// 获取类目列表
const getTypeList = async() => {
    const { data } = await Http.getGoodsTypes()
    typeList.value = data || []
    if (pageType.value == 'add') {
        params.value.goods_type = typeList.value[0].type || ''
        params.value.goods_category_id = typeList.value[0].goods_category_id || ''
        nextTick(() => {
            ruleForm.value.clearValidate('goods_category_id')
        })
    }  else if (pageType.value == 'edit') { // 编辑页面只展示当前类目
        typeList.value = data.filter(item => {
            return item.goods_category_id == params.value.goods_category_id
        })
    }  
}
// 获取商品分类列表
const getCateList = async() => {
    let { data, code } = await Http.getGoodsCates(cateParams.value)
    if (code == 200) {
        cateList.value = data || []
    }

}

// 单张图片变动
const imgsChange = (key, list) => {
    // console.log('获取到了数组', list)
    params.value[key] = list[0] || ''

}

// 时间选择器变动
const changeTime = () => {
    // absoluteTime = 
    if (absoluteTime.value && absoluteTime.value[0]) {
        params.value.validity_start_time = absoluteTime.value[0]
        params.value.validity_end_time = absoluteTime.value[1]
        return
    }
    params.value.validity_start_time = ''
    params.value.validity_end_time = ''
}

// 获取商品详情
const getGoodsDetail = async goods_id => {
    const { code, data } = await Http.getGoodsDetail({ goods_id: goods_id })
    if (code == 200) {
        params.value = data || {}
        params.value.goods_id = goods_id

        absoluteTime.value[0] = params.value.validity_start_time
        absoluteTime.value[1] = params.value.validity_end_time

        getTypeList()

        // 事先深拷贝拷贝对象，用于对比
        // copyParams.value = JSON.stringify(params.value)
    }
}

// 添加商品
const addGoods = async() => {
    const { code } = await Http.addGoods(params.value)
    if (code == 200) {
        ElMessage.success({ message: '添加商品成功' })
        router.push({ 
            path: '/integelMall/goodsManage/',
            query: {
                goods_id: params.value.goods_id,
                goods_class_id: route.query.goods_class_id || ''
            }
        })
    }
}
// 编辑商品
const updateGoods = async() => {
    // 去除成员信息再提交
    delete params.value.last_update_user
    delete params.value.create_member
    delete params.value.last_update_member
    delete params.value.last_update_user

    const { code } = await Http.updateGoods(params.value)
    if (code == 200) {
        ElMessage.success({ message: '编辑商品成功' })
        router.push({ 
            path: '/integelMall/goodsManage/', 
            query: {
                goods_id: params.value.goods_id,
                goods_class_id: route.query.goods_class_id
            }
        })
    }
}

// 提交页面
const onSubmit = () => {
    // 验证表单
    ruleForm.value.validate((valid, object) => {
        console.log(valid, object)
        if (valid) {
            // alert('submit!')
        } else {
            console.log('error submit!!')
            return false
        }
    })
    // 验证表单
    for (let key in params.value) {
        // console.log(key, Object.prototype.toString.call(params.value[key]), rules.value[key])
        if (Object.prototype.toString.call(params.value[key]) === '[object Array]' && rules.value[key]) {
            if (!params.value[key][0]) {
                ElMessage.warning(rules.value[key][0].message)
                return
            }
        } else if (rules.value[key]) {
            if (!params.value[key]) {
                ElMessage.warning(rules.value[key][0].message)
                return
            }
        }
    }
    // 到店商品过期时间验证
    console.log(params.value.goods_type, params.value.is_validity_time_type, params.value.validity_start_time)
    if (params.value.goods_type == ' arrival') {
        if (!params.value.is_validity_time_type) { 
            ElMessage.warning('请选择核销时间并填入日期')
            return
        }
        if (params.value.is_validity_time_type == 'relative_time' && !params.value.relative_days) {
            ElMessage.warning('请选择核销时间天数')
            return
        } else if (params.value.is_validity_time_type == 'absolute_time' && !params.value.validity_start_time) {
            ElMessage.warning('请选择核销开始与结束时间')
            return
        }
    }

    if (pageType.value == 'add') {
        addGoods()
    } else if (pageType.value == 'edit') {
        updateGoods()
    }
}

const onCancel = () => {
    // ElMessageBox.confirm(
    //     '当前页面未保存，请确认是否关闭该页面?',
    //     '提示',
    //     {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //     }
    // ).then(() => {
    //     router.go(-1)
    // })
    backConfirm.value = true
}

const goBack = () => {
    // router.go(-1)
    router.push({ 
        path: '/integelMall/goodsManage/',
        query: {
            goods_class_id: route.query.goods_class_id || ''
        }
    })
}

onMounted(() => {
    pageType.value = route.query.pageType || ''
    getCateList()

    if (pageType.value == 'add') {
        params.value.goods_class_id_arr[0] = route.query.goods_class_id - 0
        getTypeList()
    } else if (pageType.value == 'edit') {
        // console.log(1)
        getGoodsDetail(route.query.goods_id)
    }
})
</script>

<style lang="scss" scoped>
    .page-scroll {
        min-height: calc(100vh - 144px) !important;
        height: calc(100vh - 144px) !important;
        overflow-y: auto;
    }

    .col-width {
        width: 520px;
    }

    .alert-info {
        line-height: 32px;
        border: 1px solid #1773FA;
        border-radius: 2px;
        background-color: rgba(23,115,250,0.1);
    }

    .alert-info-yellow {
        line-height: 32px;
        border: 1px solid #FFE58F;
        border-radius: 2px;
        background-color: #FFFBE6;

        .warning-yellow {
            color: #FAAD14;
        }
    }

    // 小程序预览
    .preview-mini {
        position: absolute;
        top: -26px;
        right: -260px;
        border: 1px solid #E7E7E7;
        border-radius: 2px;

        .mini-title {
            width: 210px;
        }

        .mini-bg-img {
            width: 210px;
            height: 168px;
            background-color: #F7F8FA;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }

        .mini-birder {
            border-top: 1px solid #E7E7E7;
        }

        .mini-icon-box {
            height: 28px;
            line-height: 28px;
            color: #B2B2B2;
            .mini-icon {
                width: 14px;
                height: 16px;
            }
        }
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
        margin-top: 18px;
        // margin-bottom: -16px;
    }
    .head-content-item {
        margin-right: 32px;
    }
</style>

<style lang="scss">
    .el-form-item--small .el-form-item__content {
        line-height: 22px;
    }
</style>