<template>
    <div class="table-content">
        <div class="tree-header">已有关键词 / 全部 数字数量</div>
        <div class="tree-scoll" style="max-height: 600px; overflow: auto">
            <div
                v-for="item in props.groupList"
                :key="item.group_id"
                class="tree-body"
                :class="{
                    'right-operate-additem':
                        item.group_id === form.navaticeGroupId || item.sort === form.navaticeDefault
                }"
                @click="handlerGroupKnowledge(item)"
            >
                <div class="body-left overflow-ellipsis">{{ item.name }}</div>
                <div v-if="!props.isSearch || form.showNum" class="body-right">
                    {{ item.keyword_num }}/{{ item.sale_script_num }}
                </div>
                <div v-else class="body-right">
                    <div
                        v-show="item.hit_num && item.group_id === form.navaticeGroupId"
                        class="group-item-blue-radus"
                    >
                        {{ item.hit_num }}
                    </div>
                    <div
                        v-show="item.hit_num && item.group_id !== form.navaticeGroupId"
                        class="group-item-default-radus group-item-blue-radus"
                    >
                        {{ item.hit_num }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
// import { getCurrentInstance } from 'vue'

// const { proxy } = getCurrentInstance()
const props = defineProps({
    groupList: {
        type: Array
    },
    searchGroupName: {
        type: String,
        defualt: () => ''
    },
    isSearch: {
        type: Boolean,
        defualt: () => false
    },
    searchKeysVal: {
        type: Array,
        defualt: () => []
    }
})
const emit = defineEmits(['updateGroupInfo', 'getKnowledgeList'])
const form = reactive({
    navaticeGroupId: null,
    navaticeDefault: 0,
    showNum: true
})
defineExpose({
    setNavaticeGroupId
})
watch(() => props.isSearch, val => {
    console.log('监听isSearch', val)
    if (val) {
        form.showNum = false
    } else {
        form.showNum = true
    }
})
watch(() => props.searchGroupName, val => {
    console.log('监听searchGroupName', val) 
    if (form.isSearch) {
        form.showNum = false
    } else {
        form.showNum = true
    }

})
// 点击当前分组获取分组知识列表
function handlerGroupKnowledge(element) {
    form.navaticeDefault = -1
    form.navaticeGroupId = element.group_id
    // 获取参数
    // 需要改变父组件 group_id的值
    emit('updateGroupInfo', element)
    // 发送请求  改变父组件，list列表参数
    emit('getKnowledgeList', { group_id: element.group_id })
}
function setNavaticeGroupId(val) {
    if (val) {
        form.navaticeGroupId = val
        form.navaticeDefault = -1
    } else {
        form.navaticeGroupId = -1
        form.navaticeDefault = 0
    }
}
</script>
<style lang="scss" scoped>
.table-content {
  width: 297px !important;
  padding-right: 16px;
  border-right: 1px solid #ebeef5;
  margin-right: 16px;
}
.table-content > .tree-header {
  text-align: right;
  font-size: 12px;
  color: #171717;
  opacity: 0.45;
  margin-bottom: 8px;
  margin-top: 8px;
}
.table-content > .tree-scoll .tree-body {
  display: flex;
  justify-content: space-between;
}
.table-content > .tree-scoll .tree-body .body-left {
  height: 40px;
  line-height: 40px;
  padding: 0px 10px;
  width: 220px;
}
.table-content > .tree-scoll .tree-body .body-right {
  height: 40px;
  line-height: 40px;
  padding: 0px 10px;
  color: #1773fa;
  position: relative;
}
.right-operate-additem {
  color: rgba(23, 115, 250, 1);
  background: #eef5ff;
  border-radius: 2px;
}
.group-item-blue-radus {
  display: inline-block;
  position: absolute;
  top: 10px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  opacity: 1;
  background: #1773fa;
  border-radius: 50%;
  right: 16px;
  color: #fff;

  text-align: center;
}
.group-item-default-radus {
  background: #999999;
}
</style>
