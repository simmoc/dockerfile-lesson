<template>
    <div class="list-control">
        <div class="list-pagination">
            <el-pagination
                small
                :current-page="props.page"
                :page-size="props.limit"
                layout="total,sizes, prev, pager, next, jumper"
                :total="props.total"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
            />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    page: { // 页码
        type: Number,
        default: 1
    },
    limit: { // 每页大小
        type: Number,
        default: 10
    },
    total: { // 总条数
        type: Number,
        default: 0
    },
    getData: { // 执行的function
        type: Function,
        default: () => {
        }
    }
})
const emit = defineEmits(['update:page', 'update:limit'])
const handleCurrentChange = page => {
    console.log(page)
    emit('update:page', page)
    props.getData()
}
const handleSizeChange = size => {
    emit('update:page', 1)
    emit('update:limit', size)
    props.getData()
}
</script>

<style scoped lang="scss">
    .list-control {
        display: flex;
        align-items: center;
        margin-top: 24px;
        .list-pagination {
            flex: 1;
            text-align: right;
        }

    }

</style>
