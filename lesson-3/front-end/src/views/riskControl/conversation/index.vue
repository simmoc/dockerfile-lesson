<template>
    <page-main>
        <div class="pagoda-add-layout-v1">
            <div class="pagoda-add-layout-v1__content">
                <div class="session-content">
                    <div class="group-list">
                        <aTitle title="选择企业成员" />
                        <!-- <div class="filter">
            <el-input placeholder="请输入名称" v-model="selectName">
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchNumber"
              ></el-button>
            </el-input>
          </div>
          <div class="tree-data">
            <el-tree
              :data="treeData"
              :props="defaultProps"
              :filter-node-method="filterNode"
              ref="tree"
              default-expand-all
              @node-click="handleNodeClick"
            ></el-tree>
          </div> -->
                        <organize @changeCustomerInfo="changeCustomerInfo" />
                    </div>
                    <div class="custom-list">
                        <aTitle :title="memberTitle" />
                        <member
                            ref="member"
                            :staff-info="staffInfo"
                            class="memeber-content"
                            :select-member="selectMember"
                            @selectChat="selectChat"
                            @selectNumber="selectNumber"
                        />
                    </div>
                    <!-- 群聊详情 -->
                    <div class="chat-detail">
                        <div class="chat-title">
                            <!-- {color:'red'} -->
                            <aTitle :title="chatTitle" :title-style="titleStyle" />
                        </div>
                        <test
                            ref="record"
                            style="height: calc(100% - 55px)"
                            :staff-info="staffInfo"
                            :active-type="activeType"
                            :chat-info="chatInfo"
                        />
                    </div>
                </div>
            </div>
        </div>
    </page-main>
</template>

<script>
// import http from '@/services/api/reach'
// import Http from '@/util/request'
import aTitle from './title.vue'
import organize from './organize.vue'
import member from './member.vue'
import test from './test.vue'
// let aTitle = () => import('./title.vue')
// let organize = () => import('./organize.vue')
// let member = () => import('./member.vue')
// let test = () => import('./test.vue')
// import { getCurrentInstance } from 'vue'
// const { proxy } = getCurrentInstance()
export default {
    name: '',
    components: {
        aTitle,
        member,
        test,
        organize
    },
    data() {
        return {
            activeType: '0', // 客户,
            staffInfo: {}, // 员工信息
            filterText: '', // 选择层级名称
            selectDate: '', // 选择的日期
            treeData: [], // 树形数据;
            chatInfo: {}, // 聊天对象信息
            selectData: undefined, // 选择的数据;
            defaultProps: {
                children: 'children',
                label: 'department_name'
            },
            selectMember: null
        }
    },
    computed: {
        memberTitle() {
            let title = this.staffInfo.department_name
            return title ? `【${title}】` : '未选择企业成员'
        },
        chatTitle() {
            let name = this.chatInfo.name
            return name ? `【${name}】` : '未选择聊天对象'
        },
        titleStyle() {
            let name = this.chatInfo.name
            return name ? {} : { color: 'red' }
        }
    },
    watch: {
        filterText() {
            // this.$refs.tree.filter(val)
        }
    },
    methods: {
        changeCustomerInfo({ staffInfo, chatInfo }) {
            console.log(staffInfo)
            this.staffInfo = staffInfo
            this.chatInfo = chatInfo
        },
        // 选择聊天
        selectChat(options) {
            this.chatInfo = options
        },
        selectNumber() {
            this.selectMember = null
        }
    }
}
</script>

<style scoped lang="scss">
.session-content {
  display: flex;
  width: 1200px;
  height: 600px;
  border: 1px solid #ccc;
  .group-list {
    width: 250px;
    padding: 5px;
    height: 100%;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    .tree-data {
      flex: 1;
      overflow: auto;
    }
  }
  .custom-list {
    width: 300px;
    padding: 5px;
    border-right: 1px solid #ccc;
    // display: flex;
    // flex-direction: column;
    .memeber-content {
      flex: 1;
    }
  }
  .chat-detail {
    flex: 1;
    .chat-title {
      padding: 10px;
      border-bottom: 1px solid #ccc;
    }
  }
}
.filter {
  margin-bottom: 10px;
}
</style>
