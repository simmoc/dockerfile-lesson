<template>
    <div>
        <draggable v-model="dragList" :disabled="isSearch" @end="dragEnd">
            <template #item="{ element: element}">
                <div
                    class="item-class"
                    :class="{
                        'right-operate-additem':
                            (element.goods_class_id === navaticeGroupId)
                            | (element.sort === navaticeDefault)
                    }"
                    @click="handlerGroupKnowledge(element)"
                >
                    <div>
                        <img
                            v-if="!isSearch"
                            class="item-group-trag-icon"
                            src="@/assets/images/knowledgeBase/drag.svg"
                            alt=""
                        >
                        <span class="tree-group-name">
                            {{ element.name }}
                        </span>
                    </div>

                    <div>
                        <div v-if="isSearch">
                            <div
                                v-show="element.hits_num && element.goods_class_id === navaticeGroupId"
                                class="group-item-blue-radus"
                            >
                                {{ element.hits_num }}
                            </div>
                            <div
                                v-show="element.hits_num && element.goods_class_id !== navaticeGroupId"
                                class="group-item-default-radus group-item-blue-radus"
                            >
                                {{ element.hits_num }}
                            </div>
                        </div>

                        <el-popover
                            :key="element.id"
                            :visible="element.visible"
                            popper-class="crud-classify-tree-operate-popover"
                            placement="right"
                            :offset="20"
                            :popper-options="{
                                boundariesElement: 'viewport',
                                removeOnDestroy: true
                            }"
                            trigger="manual"
                        >
                            <div
                                class="right-operate-item-goods"
                                @mouseleave="element.visible = false"
                            >
                                <div class="play" @click="handlerEditName(element)">
                                    编辑名称
                                </div>
                                <div class="play" @click="handlerGroupDelete(element.goods_class_id)">
                                    删除
                                </div>
                            </div>
                            <template #reference>
                                <i class="right-oper-btn el-icon-more"
                                   @click.stop="showPop(element)"
                                />
                            </template>
                        </el-popover>
                    </div>
                </div>
            </template>
        </draggable>
        <!-- 编辑分类名称 -->
        <!-- <el-dialog :model-value="dialogVisible" width="30%">
            <template #title>
                <span class="new-group-title">编辑分类名称</span>
            </template>
            <div class="dialog-body">
                <div class="group_name">分类名称</div>
                <el-input
                    v-model="groupName"
                    autocomplete="off"
                    :maxlength="5"
                    placeholder="请输入分类名称"
                    show-word-limit
                />
            </div>
            <template #footer class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handlerGroupEdit">确 定</el-button>
            </template>
        </el-dialog> -->
        <CustomerDialog title="编辑分类名称" :dialog-visible="dialogVisible" width="400px" :confirm-fn="handlerGroupEdit" @cancel="dialogVisible = false">
            <div class="dialog-body">
                <div class="group_name">分类名称</div>
                <el-input
                    v-model="groupName"
                    autocomplete="off"
                    :maxlength="5"
                    placeholder="请输入分类名称"
                    show-word-limit
                />
            </div>
        </CustomerDialog>
        <!-- 删除分类 -->
        <!-- <el-dialog :model-value="dialogGroupDel" width="30%">
            <template #title>
                <span class="new-group-title">提示</span>
            </template>
            <div class="dialog-body">
                <div class="group_name">是否删除该商品分类</div>
            </div>
            <template #footer class="dialog-footer">
                <el-button @click="dialogGroupDel = false">取 消</el-button>
                <el-button type="primary" @click="handlerGroupDel">提 交</el-button>
            </template>
        </el-dialog> -->
        <CustomerDialog title="提示" :dialog-visible="dialogGroupDel" width="400px" :confirm-fn="handlerGroupDel" @cancel="dialogGroupDel = false">
            <div class="dialog-body">
                <div class="group_name">是否删除该商品分类</div>
            </div>
        </CustomerDialog>
    </div>
</template>
<script>
// import http from '@/services/api/knowledgeBase'
import Http from '@/util/request'
import draggable from 'vuedraggable'
import { ElMessage } from 'element-plus'

export default {
    name: 'TreeDrag',
    components: {
        draggable
    },
    props: {
        modelValue: {
            type: Object
        },
        groupList: {
            type: Array
        },
        isSearch: {
            type: Boolean,
            default: () => false
        },
        getList: {
            type: Function
        },
        getGroupList: {
            type: Function
        },
        setTreeChecked: {
            type: Function
        }
    },
    emits: ['update:modelValue'],
    setup() {},
    data() {
        return {
            // 当前点击的 tree 操作
            acitveRightHandle: null,
            navaticeGroupId: null,
            dialogVisible: false, // 是否展示diglog
            groupName: '', // 分类名称
            dialogGroupDel: false,
            groupId: -1, // 分类id
            navaticeDefault: 0,
            updGroupInfo: {
                // 编辑的分类信息
                name: '',
                goods_class_id: 1
            },
            newGroupList: [],
            showNum: true,
            visible: false,
            dragList: []
        }
    },
    watch: {
        isSearch(val) {
            console.log('监听', val)
            if (val) {
                this.showNum = true
            } else {
                this.showNum = false
            }
        },
        search_group_name() {
            if (this.isSearch) {
                this.showNum = true
            } else {
                this.showNum = false
            }
        },
        groupList(val) {
            console.log('监听group', val)
            this.dragList = JSON.parse(JSON.stringify(val))
            console.log('dragList', this.dragList)
        }
    },
    mounted() {
        document.body.addEventListener('click', e => {
            let goal = Array.from(
                document.getElementsByClassName('crud-classify-tree-operate-popover')
            )
            if (!goal.includes(e.path[0])) {
                this.dragList.length > 0 &&
                    this.dragList.forEach(item => {
                        item.visible = false
                    })
            }
        })
    },
    methods: {
        showPop(node) {
            this.dragList.length > 0 &&
                this.dragList.forEach(item => {
                    item.visible = false
                })
            node.visible = true
        },
        // 点击点点点触发的方法
        handleClickRightOperateBtn(groupId) {
            this.acitveRightHandle = groupId
        },
        // 图片引入
        getImageUrl(url) {
            return new URL(url, import.meta.url).href
        },
        // 鼠标移出分类菜单事件
        handleGroupLeave() {
            this.acitveRightHandle = null
        },
        // 点击分类删除
        handlerGroupDelete(groupId) {
            this.dialogGroupDel = true
            this.groupId = groupId
        },
        // 点击确定分类删除
        handlerGroupDel() {
            // 进行判断 如果分类中有数据那不能删除
            this.delGroup()
            // Http.getGoodsList({ goods_class_id: this.groupId }).then(
            //     res => {
            //         const { data } = res
            //         console.log(data, data.length)
            //         if (data.length > 0) {
            //             ElMessage.error({
            //                 message: '当前分类下有商品，请删除组下的商品才能删除组！',
            //                 showClose: true
            //             })
            //             return
            //         }
            //         this.delGroup()
            //     },
            //     error => {
            //         console.log(error)
            //     }
            // )
        },
        // 删除分类方法
        delGroup() {
            Http.deleteGoodsCate({ goods_class_id: this.groupId }).then(
                res => {
                    if (res.code === 200) {
                        ElMessage({
                            message: '删除成功',
                            type: 'success',
                            showClose: true
                        })
                        this.dialogGroupDel = false
                        // this.$parent.getGroupListInfo()
                        this.setTreeChecked(0)
                        console.log(res)
                    }

                },
                error => {
                    ElMessage.error({
                        message: `删除失败${error}`,
                        showClose: true
                    })
                }
            )
        },
        //
        handlerEditName(data) {
            this.dialogVisible = true
            this.updGroupInfo.goods_class_id = data.goods_class_id
            this.groupName = data.name
        },
        // 点击确认 编辑
        handlerGroupEdit() {
            if (!this.groupName) {
                ElMessage({
                    message: '分类名称不能为空!',
                    type: 'warning',
                    showClose: true
                })
                return
            }
            this.updGroupInfo.name = this.groupName
            console.log(this.updGroupInfo)
            Http.editGoodsCate(this.updGroupInfo).then(
                res => {
                    if (res.msg === '当前分类已存在，请重新输入！') {
                        ElMessage({
                            message: '当前分类已存在，请重新输入！',
                            type: 'warning',
                            showClose: true
                        })
                        return
                    } else if (res.code === 200) {
                        ElMessage.success({
                            message: '操作成功'
                        })
                        this.groupName = ''
                        this.dialogVisible = false
                        // this.$parent.getGroupListInfo()
                        let i = this.dragList.findIndex(val => val.goods_class_id === this.updGroupInfo.goods_class_id)
                        // 请求分类
                        this.setTreeChecked(i)
                    }

                },
                error => {
                    console.log(error)
                }
            )
        },

        // 拖拽结束后触发
        dragEnd({ newIndex }) {
            console.log(newIndex)
            if (this.isSearch) {
                return
            }
            // 将拖拽后的sort进行排序
            const newGroupList = this.dragList.map((item, index) => {
                // 赋值排序
                item.sort = 20 - index
                return { goods_class_id: item.goods_class_id, sort: item.sort }
            })
            this.navaticeGroupId = null
            // this.navaticeDefault = 0
            // 拖拽结束后拿到当前的数据发送给后台
            Http.updateGoodsCatesSort({ goods_class_list: newGroupList }).then(
                () => {
                    // console.log(res)
                    // 获取最新列表参数 改变的是原数组不需要再次请求
                    // 发生拖拽后请求
                    // this.getGroupList()
                    this.handlerGroupKnowledge(this.dragList[newIndex])

                },
                error => {
                    console.log(error)
                }
            )
        },

        // 点击当前分类获取分类商品列表
        handlerGroupKnowledge(element) {
            // 需要赋值id 如果当前的id===选中的id就
            console.log('点击节点', element)
            this.navaticeDefault = -1
            if (element) {
                this.navaticeGroupId = element.goods_class_id
                console.log(this.navaticeGroupId)
                // 获取参数
                // 需要改变父组件 goods_class_id的值
                this.$emit('update:modelValue', element)
                console.log(element.goods_class_id)
                // 发送请求  改变父组件，list列表参数
                this.getList(element.goods_class_id)
            }
        },

        setNavaticeGroupId(val) {
            if (val) {
                this.navaticeGroupId = val
                this.navaticeDefault = -1
            } else {
                this.navaticeGroupId = -1
                this.navaticeDefault = 0
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

<style>
.crud-classify-tree-operate-popover {
  padding: 0;
  width: 84px !important;
  box-sizing: border-box;
  min-width: 84px;
  box-shadow: 0 0 5px #aaa;
}
.el-popper .popper__arrow,
.el-popper .popper__arrow::after {
  display: none;
}
</style>
