<template>
    <div class="organize">
        <div class="filter">
            <el-input
                v-model="keyword"
                placeholder="请输入名称"
                clearable
                @clear="clearMember"
            >
                <template #append>
                    <el-button
                        icon="el-icon-search"
                        @click="searchMember"
                    />
                </template>
            </el-input>
        </div>
        <div class="tree-data">
            <template v-if="model == 'default'">
                <el-tree
                    ref="tree"
                    :data="treeData"
                    node-key="department_id"
                    :default-expanded-keys="treeExpandData"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    @node-expand="handleNodeClick"
                />
            </template>
            <template v-if="model == 'search'">
                <div class="member-box">
                    <div
                        v-for="(item, index) of memberList"
                        :key="index"
                        class="member-item"
                        @click="selectMember(item)"
                    >
                        <span>{{ item.qw_name }}</span>
                    </div>
                </div>
            </template>
            <!-- :filter-node-method="filterNode" -->
            <!-- default-expand-all -->
        </div>
    </div>
</template>

<script>
// import http from '@/services/api/reach'
import Http from '@/util/request'
// import { getCurrentInstance } from 'vue'
// const { proxy } = getCurrentInstance()
import { ElMessage } from 'element-plus'
export default {
    name: '',
    emits: ['changeCustomerInfo'],
    data() {
        return {
            model: 'default',
            memberList: [], // 企业成员列表
            keyword: '',
            treeData: [], // 树形数据;
            chatInfo: {}, // 聊天对象信息
            treeExpandData: [1],
            defaultProps: {
                children: 'children',
                label: 'department_name'
            }
        }
    },
    created() {
        console.log(999)
        this.getGroupList()
    },
    methods: {
        handleNodeClick(data, node) {
            // 可以获取节点信息(包括id等信息);
            // parentid
            let { parentid, id, label } = data
            let departmentId = (data && data.department_id) || ''
            if (departmentId) {
                console.log('node-click', data, parentid)
                // 点击了成员;
                if (id) {
                    // 员工信息
                    // this.staffInfo = data
                    // this.chatInfo = {} // 重置客户信息;
                    this.$emit('changeCustomerInfo', { staffInfo: data, chatInfo: {} })
                    // proxy.$parent.staffInfo = data
                    // proxy.$parent.chatInfo = {} // 重置客户信息;
                    console.log('点击了成员信息', data)
                    return false
                } else {
                    // 展开才请求接口
                    console.log(node)
                    if (node.expanded || node.childNodes.length === 0) {
                        this.getMember(departmentId, label)
                        node.expanded = true
                    }

                    // if (children.length === 0) {
                    // this.getMember(departmentId, label)
                    // }
                }
            }
        },
        getGroupList() {
            // let id = _id || 1
            Http
                .getChildDepartment()
                .then(res => {
                    let data = res.data
                    this.addLabel(data)
                    this.treeData = res.data
                    if (this.treeData.length > 0) {
                        this.treeExpandData.push(this.treeData[0].department_id)
                    }

                    console.log('getGroupList---getGroupList', data)
                })
                .catch(error => {
                    ElMessage.error(error)
                })
        },
        addLabel(list, label = []) {
            list.forEach((element, index) => {
                let label1 = JSON.parse(JSON.stringify(label))
                label1.push(index)
                element.label = JSON.parse(JSON.stringify(label1))
                let children = element.children || []
                if (children.length > 0) {
                    this.addLabel(children, JSON.parse(JSON.stringify(label1)))
                }
                if (!children || children.length === 0) {
                    element.children = children
                }
            })
        },
        // 获取组成员
        getMember(id, label = []) {
            let params = { id, pageSize: 100 }
            Http
                .getMember(params)
                .then(res => {
                    let memberList = res.data.list
                    memberList.forEach(ele => {
                        ele.department_id = ele.id
                        ele.department_name = ele.qw_name
                    })
                    // var treeData = this.treeData
                    this.selectData = this.treeData
                    // this.selectData = JSON.parse(JSON.stringify(this.treeData))
                    let length = label.length
                    label.forEach((val, index) => {
                        if (index < length - 1) {
                            let selectData = this.selectData
                            let children = selectData[val].children
                            console.log('children', children)
                            this.selectData = children
                        } else {
                            let children = this.selectData[val].children
                            let joinChildren = children.concat(memberList)

                            var obj = {}
                            joinChildren = joinChildren.reduce(function(item, next) {
                                obj[next.department_id]
                                    ? ''
                                    : (obj[next.department_id] = true && item.push(next))
                                return item
                            }, [])
                            this.selectData[val].children = joinChildren
                            // this.$set(this.selectData[val], 'children', joinChildren)
                            // this.$set(this.selectData[val], 'children', children.concat(memberList))
                            // this.selectData[val].children = memberList
                        }
                    })
                    // this.$set(this.treeData[0].children[0].children[0], 'children', memberList)
                    // this.treeData[0].children[0].children[0].children = memberList
                    // console.log('treeData', )
                    console.log('getMember---getMember', res.data.list)
                })
        },
        // searchMember() {
        //     console.log('点击了搜索')
        // },
        selectMember(item) {
            this.$parent.staffInfo = Object.assign(item, {
                department_id: item.id,
                department_name: item.qw_name
            })
            this.$parent.chatInfo = {} // 重置客户信息;
        },
        searchMember() {
            let params = { keyword: this.keyword }
            Http.getMember(params).then(res => {
                this.model = 'search'
                this.memberList = res.data.list
                console.log('当前的搜索模式list', res.data.list)
            })
        },
        clearMember() {
            this.model = 'default'
            this.getGroupList()
            console.log('清空了input数据')
        }
    }
}
</script>

<style lang="scss" scoped>
.organize {
  flex: 1;
  display: flex;
  overflow: auto;
  flex-direction: column;
  .tree-data {
    flex: 1;
    margin-top: 5px;
    overflow: auto;
    .member-box {
      width: 100%;
      height: 100%;
      overflow: auto;
      .member-item {
        cursor: pointer;
        padding: 10px 5px;
        border-bottom: 1px solid #ccc;
      }
    }
  }
}
</style>
