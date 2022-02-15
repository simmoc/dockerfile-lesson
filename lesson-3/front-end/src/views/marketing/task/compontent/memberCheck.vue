<template>
    <el-dialog
        :model-value="props.visible"
        title="成员列表"
        width="500px"
        :before-close="onClose"
    >
        <div class="container">
            <div 
                v-for="(item, index) in dataSource" 
                :key="index"
                class="list-item relative" 
            >
                <div class="show-content flex flex-justify-between flex-align-center">
                    <div class="flex flex-align-center color-primary">
                        <el-avatar class="flex-s0 mr6" shape="square" :size="32" :src="item.qw_avatar" />
                        <span>{{ item.qw_name || '--' }}</span>
                    </div>
                    <div>{{ item.qw_parentname || '--' }}</div>
                </div>
                <MenberItem 
                    class="member-item"
                    :member-id="item.id" 
                    :avatar="item.qw_avatar"
                    :name="item.qw_name"
                    :department-name="item.qw_parentname"
                />
            </div>
        </div>
        <div class="member-pagination pt8">
            <el-pagination
                size="small"
                :current-page="pageNum"
                :page-size="pageSize"
                layout="total,sizes, prev, pager, next"
                :total="total"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
            />
        </div>
    </el-dialog>
</template>

<script setup>
import Http from '@/util/request.js'

const props = defineProps({
    id: {
        type: Number,
        default: () => 0
    },
    visible: {
        type: Boolean,
        default: () => false
    }
})

watch(() => props.id, newval => {
    if (newval) {
        getOptionMemberList()
    }
}, { immediate: true, deep: true })

const emit = defineEmits(['onClose'])
const onClose = () => emit('onClose')
const total = ref(0)
const pageNum = ref(1)
const pageSize = ref(10)
const dataSource = ref([])

const getOptionMemberList = async() => {
    const body = {
        task_filtrate_group_id: props.id,
        page: pageNum.value,
        page_size: pageSize.value
    }
    const res = await Http.getOptionMemberList(body)

    if (res.data) {
        total.value = res.data.count
        dataSource.value = res.data.list
    }
}

const handleCurrentChange = num => {
    pageNum.value = num
    getOptionMemberList()
}
const handleSizeChange = size => {
    pageSize.value = size
    getOptionMemberList()
}

</script>

<style scoped lang="scss">
    .container {
        margin-top: -24px;
    }

    .list-item {
        min-height: 56px;
        border-bottom: 1px solid #F0F0F0;

        .show-content, .member-item {
            width: 100%;
            height: 100%;
            min-height: 56px;
        }
        .member-item {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 100;
            opacity: 0;
        }
    }
    
    .member-pagination {
        text-align: right;
    }
</style>