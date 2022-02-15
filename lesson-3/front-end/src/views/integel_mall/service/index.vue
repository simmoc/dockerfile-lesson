<template>
    <div class="page-scroll">
        <div class="service-page search-form relative mb0">
            <!-- 总部客服 -->
            <div class="service-box p16 bdr2 mb8">
                <div class="card-header flex flex-align-center pb16">
                    <img class="card-header-icon mr8" src="@/assets/images/mall/service_icon.svg" alt="">
                    <div class="card-title fs14 c26 lh22 ">专属客服</div>
                </div>
                <div class="card-conten flex flax-alihn-center">
                    <div v-if="!serviceDataUnique.code_url" class="card-detail p12 flex bde2" @click="openSelect('', 'unique')">
                        <img class="qr-img mr8" src="@/assets/images/mall/qr_icon.svg" alt="">
                        <div class="flex flex-g1 flex-align-center flex-justify-center c8c fs14">
                            +配置活码
                        </div>
                    </div>
                    <div v-else class="card-detail p12 flex bde2" @click="openDetail(serviceDataUnique)">
                        <img class="qr-img mr8" :src="baseUrl + serviceDataUnique.code_url" alt="">
                        <div class="qr-info flex flex-direction-column flex-justify-between">
                            <div class="flex">
                                <div class="info-item lh22 fs14 mr32">
                                    <span class="inline-block c8c">规则名称: </span>
                                    <span class="inline-block c26">{{ serviceDataUnique.rule_name }}</span>
                                </div>
                                <div class="info-item lh22 fs14">
                                    <span class="inline-block c8c">分配客流规则：</span>
                                    <span class="inline-block c26">{{ showRule(serviceDataUnique.rule_type, serviceDataUnique.diversion_rule) }}</span>
                                </div>
                            </div>
                            <div class="merber-box">
                                <label class="textClass block">
                                    <span v-if="!serviceDataUnique.qw_member_list || serviceDataUnique.qw_member_list.length === 0"> -- </span>
                                    <span v-else class="event-list-page">
                                        <span v-for="(item, index) in serviceDataUnique.qw_member_list.slice(0, 2)" :key="index" class="mr16">
                                            <div class="icon-in-td">
                                                <img 
                                                    v-if="item.qw_thumb_avatar"
                                                    :src="item.qw_thumb_avatar"
                                                    :alt="item.qw_thumb_avatar"
                                                >
                                            </div>
                                            <span class="cl-blue member-name">
                                                {{ item.qw_name }} / {{ item.qw_department_arr && item.qw_department_arr[0].qw_department_name }}
                                            </span>
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div v-if="serviceDataUnique && serviceDataUnique.code_url" class="oprate-box flex flex-align-center flex-justify-around flex-direction-column ml16">
                        <img class="oprate-icon-edit" src="@/assets/images/mall/edit.svg" alt="" @click="openSelect(serviceDataUnique, 'unique')">
                        <img class="oprate-icon-close" src="@/assets/images/mall/close.svg" alt="" @click="openDelect(serviceDataUnique)">
                    </div>
                </div>
            </div>
            <!-- 总部客服 -->
            <div class="service-box p16 bdr2">
                <div class="card-header flex flex-align-center pb16">
                    <img class="card-header-icon mr8" src="@/assets/images/mall/vip_icon.svg" alt="">
                    <div class="card-title fs14 c26 lh22 ">总部客服</div>
                </div>
                <div class="card-conten flex flax-alihn-center">
                    <div v-show="!serviceDataAll.code_url" class="card-detail p12 flex bde2" @click="openSelect('', 'all')">
                        <img class="qr-img mr8" src="@/assets/images/mall/qr_icon.svg" alt="">
                        <div class="flex flex-g1 flex-align-center flex-justify-center c8c fs14">
                            +配置活码
                        </div>
                    </div>
                    <div v-show="serviceDataAll.code_url" class="card-detail p12 flex bde2" @click="openDetail(serviceDataAll)">
                        <img class="qr-img mr8" :src="baseUrl + serviceDataAll.code_url" alt="">
                        <div class="qr-info flex flex-direction-column flex-justify-between">
                            <div class="flex">
                                <div class="info-item lh22 fs14 mr32">
                                    <span class="inline-block c8c">规则名称: </span>
                                    <span class="inline-block c26">{{ serviceDataAll.rule_name }}</span>
                                </div>
                                <div class="info-item lh22 fs14">
                                    <span class="inline-block c8c">分配客流规则：</span>
                                    <span class="inline-block c26">{{ showRule(serviceDataAll.rule_type,serviceDataAll.diversion_rule) }}</span>
                                </div>
                            </div>
                            <div class="merber-box">
                                <label class="textClass block flex flex-align-end">
                                    <span v-if="!serviceDataAll.qw_member_list || !serviceDataAll.qw_member_list[0]"> -- </span>
                                    <span v-else class="event-list-page">
                                        <span v-for="(item, index) in serviceDataAll.qw_member_list.slice(0, 2)" :key="index" class="mr16">
                                            <div class="icon-in-td">
                                                <img 
                                                    v-if="item.qw_thumb_avatar"
                                                    :src="item.qw_thumb_avatar"
                                                    :alt="item.qw_thumb_avatar"
                                                >
                                            </div>
                                            <span class="cl-blue member-name">
                                                {{ item.qw_name }} / {{ item.qw_department_arr && item.qw_department_arr[0].qw_department_name }}
                                            </span>
                                        </span>
                                    </span>
                                    <div v-if=" serviceDataAll.qw_member_list && serviceDataAll.qw_member_list.length > 2">...</div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div v-if="serviceDataAll && serviceDataAll.code_url" class="oprate-box flex flex-align-center flex-justify-around flex-direction-column ml16">
                        <img class="oprate-icon-edit" src="@/assets/images/mall/edit.svg" alt="" @click="openSelect(serviceDataAll, 'all')">
                        <img class="oprate-icon-close" src="@/assets/images/mall/close.svg" alt="" @click="openDelect(serviceDataAll)">
                    </div>
                </div>
            </div>
            <!-- {{ detailVisible }} -->
            <detailPop v-model:visible="detailVisible" :detail="detail" />
        </div>
        <!-- 活码选择 -->
        <CustomerDialog :title="serviceSelectTitle" :dialog-visible="selectVisible" top="4vh" width="83%" :confirm-fn="onConfirm" @cancel="selectVisible = false">
            <seviceSelectPop v-model:select-item="selectItem" />
        </CustomerDialog>
        <!-- 详情弹窗 -->
        <CustomerDialog title="提示" :dialog-visible="deleteVisible" cus-header width="480px" :confirm-fn="onDelete" @cancel="deleteVisible = false">
            <div>
                是否确认清空配置
            </div>
        </CustomerDialog>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import Http from '@/util/request'
import { ElMessage } from 'element-plus'
import detailPop from './components/codeDetail.vue'
import seviceSelectPop from './components/seviceSelectPop.vue'

// const shaow = ref(true)

const baseUrl = import.meta.env.VITE_APP_API_BASEURL
const serviceDataUnique = ref({
    customer_service_code_id: null,
    customer_service_type: 'unique',
    member_code_id: null,
    code_name: '',
    code_url: '',
    rule_name: '',
    rule_type: '1',
    diversion_rule: '',
    add_people_number_limit: '',
    scans_number_limit: '',
    is_long_term: '',
    begin_time: null,
    end_time: null,
    is_pass: '',
    member_code_rule_id: null,
    qw_member_list: []
})
const serviceDataAll = ref({
    customer_service_code_id: null,
    customer_service_type: 'all',
    member_code_id: null,
    code_name: '',
    code_url: '',
    rule_name: '',
    rule_type: '1',
    diversion_rule: '',
    add_people_number_limit: '',
    scans_number_limit: '',
    is_long_term: '',
    begin_time: null,
    end_time: null,
    is_pass: '',
    member_code_rule_id: null,
    qw_member_list: []
})
const selectVisible = ref(false)
const deleteVisible = ref(false)

const deleteParams = ref({
    customer_service_code_id: '',
    member_code_id: ''
})
const serviceSelectTitle = ref('选择专属客服')

const selectItem = ref({})
// const addType = ref('')

const detailVisible = ref(false)
const detail = ref({})

// 打开活码详情
const openDetail = item => {
    detail.value = item
    detailVisible.value = true
}

const openSelect = (item, type) => {
    if (item) {
        selectItem.value = {
            member_code_id: item.member_code_id,
            type: item.customer_service_type
        }
    } else {
        selectItem.value = {
            member_code_id: '',
            type: type
        }
    }
    
    serviceSelectTitle.value = (type == 'all' ? '选择总部客服' : '选择专属客服')
    // console.log('-----', selectItem.value, item)
    selectVisible.value = true
    // console.log('测试', selectVisible.value)
}

// 打开删除弹窗
const openDelect = item => {
    if (!item.customer_service_code_id) {
        // ElMessage.warning('')
        return
    }
    deleteParams.value.customer_service_code_id = item.customer_service_code_id
    deleteParams.value.member_code_id = item.member_code_id
    deleteVisible.value = true
    // console.log('东方红首付款')
    // detailVisible.value = false
    // if (detail.value.member_code_id == item.member_code_id && detail.value.customer_service_code_id == item.customer_service_code_id) {
    //     detail.value = {}
    // }
}
// 获取客服信息
const getServiceData = async() => {
    // serviceDataUnique.value = {}
    // serviceDataAll.value = {}
    const { data } = await Http.getSeviceList()
    if (Object.prototype.toString.call(data.unique_data) === '[object Array]') {
        serviceDataUnique.value =  {
            customer_service_code_id: null,
            customer_service_type: 'unique',
            member_code_id: null,
            code_name: '',
            code_url: '',
            rule_name: '',
            rule_type: '1',
            diversion_rule: '',
            add_people_number_limit: '',
            scans_number_limit: '',
            is_long_term: '',
            begin_time: null,
            end_time: null,
            is_pass: '',
            member_code_rule_id: null,
            qw_member_list: []
        }
    } else {
        serviceDataUnique.value = data.unique_data || {}
    }

    if (Object.prototype.toString.call(data.all_data) === '[object Array]') {
        serviceDataAll.value =  {
            customer_service_code_id: null,
            customer_service_type: 'all',
            member_code_id: null,
            code_name: '',
            code_url: '',
            rule_name: '',
            rule_type: '1',
            diversion_rule: '',
            add_people_number_limit: '',
            scans_number_limit: '',
            is_long_term: '',
            begin_time: null,
            end_time: null,
            is_pass: '',
            member_code_rule_id: null,
            qw_member_list: []
        }
    } else {
        serviceDataAll.value = data.all_data || {}
    }
    // serviceDataUnique.value = data.unique_data.code_url ? data.unique_data : {}
    // serviceDataAll.value = data.all_data.code_url ? data.all_data : {}

    console.log('重新请求后参数', data.unique_data, data.all_data)
    detailVisible.value = false
    return Promise.resolve(true)
}

// 分流额规则限制
const showRule = (type, rule) => {
    if (type == '2') {
        let arr = ['客户数限制', '随机']
        return arr[rule - 1]
    } else {
        return '—'
    }
}

const onConfirm = async() => {
    if (!selectItem.value.member_code_id) {
        ElMessage.warning('请选择活码后再提交')
        return
    }
    const { code } = await Http.setSevice(selectItem.value)
    if (code == 200) {
        ElMessage.success('设置客服成功')
        selectVisible.value = false
        setTimeout(() => {
            window.location.reload()
        }, 300)
        // await getServiceData()
    }
}

const onDelete = async() => {
    // let params = {
    //     customer_service_code_id: item,
    //     member_code_id: ''
    // }
    const { code } = await Http.deleteSevice(deleteParams.value)
    if (code == 200) {
        ElMessage.success('删除成功')
        getServiceData()
    }
    deleteVisible.value = false
}

onMounted(() => {
    getServiceData()
})
</script>
<style lang="scss">
.service-page {
    min-height: calc(100vh - 154px);
}
.service-box {
    border: 1px solid rgba($color: #000000, $alpha: 0.15);
    width: 520px;
    .card-header-icon {
        display: block;
        width: 16px;
        height: 16px;
    }

    .qr-img {
        display: block;
        width: 64px;
        height: 64px;
    }

    .oprate-icon-edit {
        display: block;
        width: 24px;
    }
    .oprate-icon-close {
        display: block;
        width: 20px;
    }

    .card-detail {
        width: 448px;
        border: 1px solid rgba($color: #000000, $alpha: 0.1);
        background-color: #FAFAFA;
        cursor: pointer;
    }
}

.event-list-page {
    .cl-blue {
      color: #409eff;
      cursor: pointer;
  
      &:hover {
      }
    }
  
    .icon-in-td {
      width: 22px;
      height: 22px;
      text-align: center;
      display: inline-block;
      margin-right: 9px;
  
      img {
        width: 100%;
      }
    }
}
.member-name {
    display: inline-block;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #409eff;
    vertical-align: middle;
}
</style>