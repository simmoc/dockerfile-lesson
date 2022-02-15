<template>
    <div class="cate-manage">
        <el-row>
            <div class="col-width">
                <div class="cate-list flex flex-wrap">
                    <!-- {{ typeList }} -->
                    <div v-for="item in typeList" :key="item.goods_category_id" class="cate-item mr8 flex flex-direction-column flex-align-center mt12" :class="[item.goods_category_id == typeId ? 'cate-item-active' : '']" @click="selectCate(item)">
                        <div class="item-title c26 fs16 fwb">{{ item.name }}</div>
                        <div class="item-type c8c fs14">({{ item.type == 'arrival' ? '到店使用' : '快递发货' }})</div>
                        <div class="select-cate">
                            <i class="el-icon-check fs12 cfff" />
                            <!-- <el-icon><check /></el-icon> -->
                        </div>
                    </div>
                    <div v-if="!props.canSelect" class="cate-item mr8 flex flex-direction-column flex-align-center mt12" @click="Dialogvisible = true">
                        <div class="item-title">
                            <i class="el-icon-plus fs20 fwb c8c" />
                        </div>
                        <div class="item-type c8c fs14">商品类目</div>
                    </div>
                </div>
            </div>
        </el-row>
        <!-- <div v-else class="cate-list flex">
            <div class="cate-item mr8 flex flex-direction-column flex-align-center cate-item-active">
                <div class="item-title c26 fs16 fwb">{{ selectItem.name }}</div>
                <div class="item-type c8c fs14">({{ selectItem.type == 'arrival' ? '到店使用' : '快递发货' }})</div>
                <div class="select-cate">
                    <i class="el-icon-check fs12 cfff" />
                </div>
            </div>
        </div> -->

        <CustomerDialog title="商品类目" :dialog-visible="Dialogvisible" width="560px" :confirm-fn="onConfirm" @cancel="cancelTypeDialog">
            <draggable v-model="editTypeList" :disabled="disabled" @end="dragEnd">
                <template #item="{ element: item, index}">
                    <div class="cate-select-box">
                        <!-- <el-row v-for="(item, index) in editTypeList" :key="item.goods_category_id" class="cate-create-item flex flex-align-center mb8"> -->
                        <el-row class="cate-create-item flex flex-align-center mb8">
                            <div class="can-drag-icon flex flex-align-center flex-justify-center">
                                <img
                                    style="width: 12px; height: 12px; vertical-align: middle;"
                                    src="@/assets/images/knowledgeBase/drag.svg"
                                    alt="drag"
                                >
                            </div>
                            <div class="cate-create-input flex flex-align-center">
                                <el-input
                                    v-model="item.name"
                                    size="small"
                                    show-word-limit
                                    :maxlength="4"
                                    placeholder="请输入类目名称"
                                    class="input-with-select"
                                    style="width: 441px;"
                                >
                                    <template #prepend>
                                        <el-select 
                                            v-model="item.type" placeholder="请选择" 
                                            :disabled="item.is_exist_goods || item.is_exist_order"
                                            size="small" style="width: 120px;"
                                        >
                                            <el-option label="到店使用" value="arrival" />
                                            <el-option label="快递发货" value="logistics" />
                                        </el-select>
                                    </template>
                                </el-input>
                            </div>
                            <div class="delete-box flex flex-align-center c32 flex-justify-center" :class="[item.is_exist_goods || item.is_exist_order ? 'del-disable' : '']" @click="deleteItem(item, index)">
                                <i class="el-icon-delete-solid fs16" />
                            </div>
                        </el-row>
                    </div>
                </template>
            </draggable> 
            <!-- 添加模块 -->
            <!-- <el-row class="cate-create-item flex flex-align-center mb8">
                        <div class="can-drag-icon flex flex-align-center flex-justify-center">
                            <img
                                style="width: 12px; height: 12px; vertical-align: middle;"
                                src="@/assets/images/knowledgeBase/drag.svg"
                                alt="drag"
                            >
                        </div>
                        <div class="cate-create-input flex flex-align-center">
                            <el-input
                                v-model="addParams.name"
                                size="small"
                                placeholder=""
                                class="input-with-select"
                                style="width: 441px;"
                                @blur="addType"
                            >
                                <template #prepend>
                                    <el-select v-model="addParams.type" placeholder="" size="small" style="width: 120px;">
                                        <el-option label="到店使用" value="arrival" />
                                        <el-option label="快递发货" value="logistics" />
                                    </el-select>
                                </template>
                            </el-input>
                        </div>
                        <div class="delete-box flex flex-align-center c32 flex-justify-center ">
                            <i class="el-icon-delete-solid fs16" />
                        </div>
                    </el-row> -->
            <el-row v-if="editTypeList.length != 5" class="add-cate-btn flex flex-align-center flex-justify-center" @click="addTypeItem">
                <i class="el-icon-plus fs14" />
                <span>添加类目商品</span>
            </el-row>
        </customerdialog>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Http from '@/util/request'
// import GoodsTreeDrag from './GoodsTreeDrag/index.vue'
// import { bounce } from '@/util/index'
// import { useRouter } from 'vue-router'
import draggable from 'vuedraggable'
import { ElMessage } from 'element-plus'
const props = defineProps({
    typeList: {
        type: [Array],
        defalut: []
    },
    typeId: {
        type: [String, Number],
        defalut: ''
    },
    goodsType: {
        type: [String],
        defalut: ''
    },
    canSelect: {
        type: [Boolean],
        defalut: true
    },
    disabled: {
        type: [Boolean],
        defalut: false
    }
})

const editTypeList = ref([])

const emit = defineEmits(['update:typeId', 'update:goodsType', 'getTypeList'])
// const modelValue = ref('1')
const Dialogvisible = ref(false)
const selectItem = ref({})

// const addParamsShow = ref(false)
// const addParams = ref({
//     name: '',
//     type: 'arrival'
// })

// ===========监听
watch(() => props.typeList, newVal => {
    editTypeList.value = JSON.parse(JSON.stringify(newVal))
    // 编辑时展示的一个类目
    editTypeList.value.forEach(item => {
        if (item.goods_category_id == props.typeId) {
            selectItem.value = item
        }
    })
}, {
    deep: true,
    immediate: true
})

const selectCate = item => {
    emit('update:typeId', item.goods_category_id)
    emit('update:goodsType', item.type)
    // modelValue.value = item
}
const addTypeItem = () => {
    if (editTypeList.value.length == 5) {
        ElMessage.warning({ message: '最多添加5个类目' })
        return
    }
    let item = {
        name: '',
        sort: 0,
        type: 'arrival',
        goods_category_id: ''
    }
    editTypeList.value.push(item)
}

const deleteItem = (item, index) => {
    if (item.is_exist_goods || item.is_exist_order) {
        return
    }
    editTypeList.value.splice(index, 1)
}
// 完成添加类目
// const addType = async() => {
//     if (!addParams.value.name) {
//         ElMessage.warning({ message: '请输入类目名称' })
//         return
//     }
//     const { code, msg } = await Http.addGoodsType(addParams.value)
//     if (code == 200) {
//         emit('getTypeList', true)
//         addParamsShow.value = false
//         ElMessage.success({ message: '添加成功' })
//     } else {
//         ElMessage.error({ message: msg })
//     }
// }

const dragEnd = () => {

}

const onConfirm = async() => {
    // let varryfi = true
    for (let i = 0; i < editTypeList.value.length; i++) {
        // 按顺序排列sort
        editTypeList.value[i].sort = 200 - i
        if (!editTypeList.value[i].name) {

            ElMessage.warning({ message: '请填写类目名称再进行保存' })
            return
        }
    }

    const { code } = await Http.updateGoodsTypes({ goods_category_list: editTypeList.value })
    if (code == 200) {
        Dialogvisible.value = false
    }
    emit('getTypeList', true)
}
const cancelTypeDialog = () => {
    Dialogvisible.value = false
    editTypeList.value = JSON.parse(JSON.stringify(props.typeList))
}
console.log(props)
</script>

<style lang="scss" scoped>
.col-width {
    width: 520px;
}
.cate-item {
    width: 120px;
    height: 64px;
    padding-top: 10px;
    border: 1px solid #bfbfbf;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
    .item-title {
        margin-bottom: 2px;
        line-height: 22px;
    }
    .item-type {
        line-height: 20px;
    }
    .select-cate {
        display: none;
    }
}
.cate-list  {
    margin-top: -12px;
}
.cate-list .cate-item-active {
    border-color: #1773FA;
    color: #1773FA;

    .item-title {
       color: #1773FA !important;
    }
    .item-type {
       color: #1773FA !important;
       opacity: 0.65;
    }

    .select-cate {
        display: block;
        height: 0;
        width: 0;
        position: absolute;
        bottom: 0;
        right: 0;
        border: 15px solid #1773FA;
        border-color: transparent #1773FA #1773FA transparent;

        i {
            position: absolute;
            top: 0px;
            right: -13px;
        }
    }
}

.del-disable {
    opacity: 0.6;
    cursor: not-allowed !important;
}

.cate-create-item {
    height: 40px;
    background-color: #f5f5f5;
    .can-drag-icon {
        height: 40px;
        width: 30px;
        cursor: pointer;
    }

    .delete-box{
        width: 40px;
        height: 40px;
        cursor: pointer;
    }
}

.add-cate-btn {
    height: 32px;
    border: 1px dashed #bfbfbf;
    line-height: 32px;
    cursor: pointer;
    border-radius: 2px;
}

</style>
<style lang="scss">
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>