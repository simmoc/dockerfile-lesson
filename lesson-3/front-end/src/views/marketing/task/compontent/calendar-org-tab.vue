<template>
    <div class="selectMemberOrgTab">
        <div class="filter">
            <el-input
                v-model.trim="reacData.keyword"
                prefix-icon="el-icon-search"
                class="del-end-clear-input"
                placeholder="请输入成员名称搜索"
                clearable
                size="mini"
                @clear="clearSearchMemberKey"
                @keyup.enter="searchMemberByKey"
            />
            <el-button size="mini" type="primary" @click="searchMemberByKey">
                搜索
            </el-button>
        </div>
        <div class="selectMemberWrap">
            <div class="left">
                <div class="memberTree">
                    <template v-if="reacData.memberTreeType === 'default'">
                        <el-tree
                            ref="tree"
                            :data="reacData.treeData"
                            :default-expanded-keys="reacData.expandedKeys"
                            node-key="id"
                            :props="reacData.defaultProps"
                            :highlight-current="true"
                            :show-checkbox="props.isMultipleCheckBox"
                            check-strictly
                            render-after-expand
                            :default-expand-all="true"
                            @node-click="handleNodeClick"
                            @node-expand="handleNodeExpand"
                            @check="handleCheck"
                        >
                            <template #default="{ node, data }">
                                <span class="custom-tree-node">
                                    <template v-if="node.label && node.label.length > 12">
                                        <el-tooltip
                                            effect="dark"
                                            :content="node.label"
                                            placement="top"
                                        >
                                            <span @click.stop="customSelect(node, data)">
                                                {{ node.label.slice(0, 12) + '...' }}
                                            </span>
                                        </el-tooltip>
                                    </template>
                                    <template v-else>
                                        <span @click.stop="customSelect(node, data)">
                                            {{ node.label }}
                                        </span>
                                    </template>
                                    <img
                                        v-if="reacData.selectedMemberIds.includes(data.id)"
                                        class="selected-tick"
                                        :src="selected"
                                        alt="已选"
                                    >
                                </span>
                            </template>
                        </el-tree>
                    </template>
                    <div v-if="reacData.memberTreeType === 'search'" class="member-box">
                        <div
                            v-for="item in reacData.searchMemberResultList"
                            :key="item.id"
                            class="member-item"
                            :label="item.department_name"
                            :value="item.id"
                            @click.stop="selectSearchMember(item)"
                        >
                            <div class="tag-item-left">
                                <img
                                    :src="
                                        item.isOrg
                                            ? reacData.departmentIcon
                                            : reacData.memberIcon
                                    "
                                >
                                <el-tooltip
                                    effect="dark"
                                    :content="
                                        item.isOrg ? item.department_name : item.member_name
                                    "
                                    placement="top"
                                >
                                    <span class="tag-item-left-txt">
                                        {{ item.isOrg ? item.department_name : item.member_name }}
                                    </span>
                                </el-tooltip>
                            </div>
                            <!-- v-if="tag.isOrg" 现在要求都显示上级 -->
                            <div
                                style="
                  max-width: 30%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
                            >
                                <el-tooltip
                                    effect="dark"
                                    :content="item.parent_name"
                                    placement="top"
                                >
                                    <span class="tag-item-parent-name">
                                        {{ item.parent_name }}
                                    </span>
                                </el-tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="selectedMember">
                    <draggable
                        v-model="selectedMembers"
                        group="type"
                        :animation="300"
                        item-key="id"
                        :delay="100"
                        @start="drag = true"
                        @end="drag = false"
                    >
                        <template #item="{ element: tag, index: i }">
                            <el-tag
                                :key="tag.id"
                                size="small"
                                closable
                                class="tag-item"
                                type="info"
                                @close="handleDelMember(i)"
                            >
                                <div class="tag-item-content">
                                    <div class="tag-item-left">
                                        <!-- <img
                                            :src="
                                                tag.isOrg
                                                    ? require('@/assets/images/selectMember/department@2x.png')
                                                    : require('@/assets/images/selectMember/member@2x.png')
                                            "
                                        > -->
                                        <img
                                            :src="
                                                tag.isOrg
                                                    ? reacData.departmentIcon
                                                    : reacData.memberIcon
                                            "
                                        >
                                        <el-tooltip
                                            effect="dark"
                                            :content="
                                                tag.isOrg ? tag.department_name : tag.member_name
                                            "
                                            placement="top"
                                        >
                                            <span class="tag-item-left-txt">
                                                {{ tag.isOrg ? tag.department_name : tag.member_name }}
                                            </span>
                                        </el-tooltip>
                                    </div>
                                    <!-- v-if="tag.isOrg" 现在要求都显示上级 -->
                                    <div class="tag-item-parent-name">
                                        <el-tooltip
                                            effect="dark"
                                            :content="tag.parent_name"
                                            placement="top"
                                        >
                                            <span class="tag-item-right-txt">
                                                {{ tag.parent_name }}
                                            </span>
                                        </el-tooltip>
                                    </div>
                                </div>
                            </el-tag>
                        </template>
                    </draggable>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import draggable from 'vuedraggable'
import departmentIcon from '../../../../assets/images/selectMember/department@2x.png'
import memberIcon from '../../../../assets/images/selectMember/member@2x.png'
import selected from '../../../../assets/images/selectMember/tick@2x.png'
import Http from '@/util/request.js'
import { getCurrentInstance  } from 'vue'

const props = defineProps({
    isMultipleSelected: {
        type: Boolean,
        default: true
    },
    isMultipleCheckBox: {
        type: Boolean,
        default: false
    },
    dialogVisible: {
        type: Boolean,
        default: false
    },
    param: {
        type: Object,
        default: function() {
            return {
                type: ''
            }
        }
    },
    selectedMemberOrg: {
        type: Array,
        default: function() {
            return []
        }
    },
    customSelectedFn: {
        type: Function,
        default: function() {
            return true
        }
    },
    // 筛选时必传参数
    touchObject: {
        type: String
    }
})

const reacData = reactive({
    // selectedMembers: [],
    selectedMemberIds: [],
    memberTreeType: 'default',
    memberList: [],
    keyword: '',
    treeData: [],
    defaultProps: {
        children: 'children',
        label: 'department_name',
        isLeaf: 'isLeaf'
    },
    searchMemberResultList: [],
    expandedKeys: ['d-1'],
    departmentIcon,
    memberIcon,
    selected
})
const selectedMembers = ref([])

// 抛出
defineExpose({
    selectedMembers,
    handleNodeExpand
})
const { proxy } = getCurrentInstance()
watch(() => props.selectedMemberOrg, selectedNew => {
    if (selectedNew) {
        selectedMembers.value = JSON.parse(JSON.stringify(selectedNew))
        reacData.selectedMemberIds = selectedMembers.value.map(ele => ele.id)
    }

}, { immediate: true })

onMounted(async() => {
    reacData.treeData = await getOrgList(0)
})

function handleCheck(node, checked) {
    handleCheckMember(checked)
}
// 多选check操作，更新选中营运点成员
function handleCheckMember(checked) {
    selectedMembers.value = checked.checkedNodes
}
// 单选选中节点
function handleSelectMember(data) {
    let curLen = selectedMembers.value.length
    // console.log('1111', data, curLen)
    // let d = props.customSelectedFn(data, curLen)
    if (!props.customSelectedFn(data, curLen)) {
        return
    }
    // console.log('2222', reacData.selectedMemberIds, data.id, props.isMultipleSelected)
    if (!reacData.selectedMemberIds.includes(data.id)) {
        if (props.isMultipleSelected) {
            selectedMembers.value.push(data)
            reacData.selectedMemberIds.push(data.id)
        } else {
            selectedMembers.value = []
            reacData.selectedMemberIds = []
            nextTick(() => {
                selectedMembers.value = [data]
                reacData.selectedMemberIds = [data.id]
            })
        }
    }
}
// 已选中营运点成员 删除
function handleDelMember(i) {
    selectedMembers.value.splice(i, 1)
    reacData.selectedMemberIds.splice(i, 1)
}
async function customSelect(node, data) {
    let idI = reacData.selectedMemberIds.indexOf(data.id)
    if (idI == -1) {
        handleSelectMember(data)
        proxy.$refs.tree.setCurrentKey(data.id)
    } else {
        handleDelMember(idI)
    }
}
async function handleNodeExpand(data, node) {

    if (!data.isLeaf) {
        // 判断部门节点 子节点 是否已请求过
        if (node.childNodes && node.childNodes.length) {
            return
        }

        let isNextOrg = data.isNextOrg
        let key = node.key

        let child = []
        // 判断部门节点 子节点 是部门还是成员 data.isNextOrg
        if (isNextOrg) {
            child = await getOrgList(key)
        } else {
            child = await getMember(key)
        }
        if (child && child.length) {
            proxy.$refs.tree.updateKeyChildren(key, child)
        }
    }

}
// 获取部门
// 左侧树节点点击
async function handleNodeClick(data, node) {
    console.log(data)
    // 点击成员节点 保存右侧
    if (!data.isOrg) {
        if (!props.isMultipleCheckBox) {
            handleSelectMember(data)
        }
        return
    }
    // 判断部门节点 子节点 是否已请求过
    if (node.childNodes && node.childNodes.length) {
        return
    }

    let isNextOrg = data.isNextOrg
    let key = node.key

    let child = []
    // 判断部门节点 子节点 是部门还是成员 data.isNextOrg
    if (isNextOrg) {
        child = await getOrgList(key)
    } else {
        child = await getMember(key)
    }
    if (child && child.length) {
        console.log('请求children===', child)
        proxy.$refs.tree.updateKeyChildren(key, child)
        reacData.expandedKeys = [data.id]
    }
}
function clearSearchMemberKey() {
    reacData.keyword = ''
    // 数据还原
    reacData.memberTreeType = 'default'
}
// 关键字搜索成员
async function searchMemberByKey() {
    if (reacData.keyword) {
        reacData.memberTreeType = 'search'
        let list = await getMember()
        reacData.searchMemberResultList = [...list]
    } else {
        reacData.memberTreeType = 'default'
        reacData.treeData = await getOrgList(0)
    }
}
async function selectSearchMember(item) {
    reacData.keyword = item.department_name
    reacData.memberTreeType = 'default'
    // 通过成员反向查树节点
    reacData.treeData = await getOrgList(0)
    reacData.expandedKeys = [item.id]
    handleSelectMember(item)
}
// 获取成员
async function getMember(id) {
    return new Promise(resolve => {
        reacData.member_data = []
        let params = {}
        params.id = id || ''
        params.keyword = reacData.keyword || ''
        params.touch_object = props.touchObject || ''
        // console.log('touchObject', props.touchObject)
        Http.getDepartmentMemberList(params).then(res => {
            reacData.member_data = res.data
            resolve(res.data)
            console.log('得到结果', reacData.department_data)
        })
    })
}
// 获取部门
async function getOrgList(id) {
    return new Promise(resolve => {
        // var params = { qw_parentid: id }
        let params = {}
        params.qw_parentid = id
        params.touch_object = props.touchObject || ''
        Http.getCalendarDepartment(params).then(res => {
            reacData.department_data = res.data
            resolve(reacData.department_data)
        })
    })
}

</script>

<style scoped lang="scss">
@import url('./calendar-org-tab.scss');
.del-end-clear-input
  .el-input__icon.el-input__validateIcon.el-icon-circle-close {
  display: none;
}
</style>
