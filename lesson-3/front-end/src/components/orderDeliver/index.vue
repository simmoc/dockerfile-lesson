<template>
    <div class="dialog-class">
        <CustomerDialog title="订单发货" width="638px" top="7vh" :dialog-visible="props.dialogVisible" :custom-confirm="true" @cancel="cancelTypeDialog">
            <CustomerTable
                :table-data="[props.sendDeliverData]"
                class="order-table"
            >
                <el-table-column prop="goods_title" label="商品名称" min-width="320">
                    <template #default="scope">
                        <div class="flex flex-align-center">
                            <img :src="scope.row.order_goods_img" class="img-class">
                            <div class="ml8 lh24 show-line2">{{ scope.row.goods_title }}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="total_score" label="兑换所需积分" min-width="150">
                    <template #default="scope">
                        <div>{{ scope.row.total_score }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="num" label="数量" min-width="120">
                    <div>x1</div>
                </el-table-column>
            </CustomerTable>
            <div>
                <CustomerTitle title="收货人信息" />
                <div class="mt4 message-class">
                    收货人: 
                    <span class="message-content-class">{{ props.sendDeliverData.contact_name }}</span>
                    <i class="copy-icon el-icon-document-copy ml9" @click="copy(props.sendDeliverData.contact_name)" />
                </div>
                <div class="mt12 message-class">
                    手机号码: 
                    <span class="message-content-class">{{ props.sendDeliverData.contact_mobile }}</span>
                    <i class="copy-icon el-icon-document-copy ml9" @click="copy(props.sendDeliverData.contact_mobile)" />
                </div>
                <div class="mt12 message-class">
                    收货地址: 
                    <span class="message-content-class">
                        {{ props.sendDeliverData.province }}
                        {{ props.sendDeliverData.city }}
                        {{ props.sendDeliverData.area }}
                        {{ props.sendDeliverData.address }}
                    </span>
                    <i class="copy-icon el-icon-document-copy ml9" @click="copy(`${props.sendDeliverData.province} ${props.sendDeliverData.city} ${props.sendDeliverData.area} ${props.sendDeliverData.address}`)" />
                </div>
            </div>

            <div class="mt24">
                <CustomerTitle title="物流信息" />
                <el-form
                    ref="ruleForm"
                    size="small"
                    label-position="top"
                    :model="formData"
                    :rules="rules"
                >
                    <el-form-item label="物流公司" prop="logistics_com" class="logistics-select">
                        <el-select 
                            v-model="formData.logistics_com" 
                            filterable
                            :loading="loading"
                            style="width: 100%" 
                            placeholder="请选择一个物流公司"
                        >
                            <el-option
                                v-for="item in deliverData"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="物流单号" prop="logistics_no" class="mb0"> 
                        <el-input v-model="formData.logistics_no" placeholder="请输入真实有效的物流单号" />
                        <div class="logistics_input mt8">* 请仔细填写物流公司及物流单号</div>
                    </el-form-item>
                </el-form>
            </div>

            <template #confirm>
                <el-button type="primary" size="small" @click="sendOrderGoods()">发货</el-button>
            </template>
        </CustomerDialog>
    </div>
</template>

<script setup>
import Http from '@/util/request'
import { ElMessage } from 'element-plus'
import { onMounted } from 'vue'
import { copy } from '@/util/index'

const formData = ref({
    logistics_no: '',
    logistics_com: ''
})
const deliverData = ref({})
const rules = ref({
    logistics_com: [
        { required: true, message: '物流公司是必选项', trigger: ['blur', 'change'] }
    ],
    logistics_no: [
        { required: true, message: '物流单号是必填项', trigger: 'blur' }
    ]
})
// 收货地址信息存储
// const orderAddress = ref('')
// 设置物流规则
const ruleForm = ref(null)
// 物流搜索加载
const loading = ref(false)

const props = defineProps({
    dialogVisible: {
        type: Boolean,
        default: false
    },
    sendDeliverData: {
        type: Object,
        default: function() {
            return {}
        }
    }
})
const emit = defineEmits(['update:dialogVisible', 'updateDeliverStatus'])

const cancelTypeDialog = () => {
    emit('update:dialogVisible', false)
}
// 获取物流公司
const getOrderExpressCode = async() => {
    let { data } = await Http.getOrderExpressCode()
    deliverData.value = data
    // console.log('11111', deliverData.value)
}

// 发货
const sendOrderGoods = async() => {
    let params = {}
    if (formData.value.logistics_no == '' || formData.value.logistics_com == '') {
        ElMessage.warning({
            message: '请填写物流信息！'
        })
        changeRules()
        return
    }
    params.order_id = props.sendDeliverData.order_id
    params.logistics_no = formData.value.logistics_no
    params.logistics_com = formData.value.logistics_com
    let res = await Http.sendOrderGoods(params)
    // console.log('11111', res)
    if (res.code === 200) {
        ElMessage.success({
            message: '发货成功!'
        })
        formData.value.logistics_no = ''
        formData.value.logistics_com = ''
        emit('update:dialogVisible', false)
        emit('updateDeliverStatus', true)
    }
}

const changeRules = async() => {
    // 验证表单
    let ruleTyle = true
    ruleForm.value.validate((valid, object) => {
        console.log(valid, object)
        if (valid) {
            console.log('subimt')
        } else {
            console.log('error submit!!')
            ruleTyle = false
            return false
        }
    })
    if (!ruleTyle) return
}

onMounted(async() => {
    // orderAddress.value = `${props.sendDeliverData.province} ${props.sendDeliverData.city} ${props.sendDeliverData.area} ${props.sendDeliverData.address}`
    await getOrderExpressCode() 
})
</script>

<style scoped lang="scss">
.order-table {
    margin-top: -16px;
}
.img-class{ 
    width: 60px;
    height: 60px;
}
.message-title-class {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0,0,0,0.85);
    line-height: 22px;
    .message-content-class {
        color: rgba(0,0,0,0.65);
    }
}
.logistics_input {
    font-size: 12px;
    font-weight: 400;
    color: #8c8c8c;
    line-height: 17px;
}
.copy-icon {
    cursor: pointer;
    &:hover {
        color: #1773FA;
    }
}
</style>