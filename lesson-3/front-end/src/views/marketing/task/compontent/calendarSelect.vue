<template>
    <div class="customer-select">
        <div>
            <div class="customer-input flex flex-align-center" @click="expand = !expand">
                <span v-if="selectList.length === 0" class="customer-placeholder">
                    请选择标签{{ treeChecked }}
                </span>
                <customerTag
                    v-for="(item, index) in selectList.slice(0, 1)"
                    :key="item.id"
                    :left-title="item.tag_group_name"
                    :right-title="item.name"
                    :show-close="true"
                    :color="item.tag_type === 'HQ' ? '#409eff' : '#FF6F00'"
                    :customer-style="{ 'margin-bottom': '10px' }"
                    @closeTag="closeTag(index, item)"
                />
                <el-tag v-if="selectList.length > 1" type="info" size="mini">
                    +{{ selectList.length - 1 }}
                </el-tag>
            </div>
            <span class="el-input__suffix">
                <span class="el-input__suffix-inner">
                    <i
                        class="el-select__caret el-input__icon el-icon-arrow-down"
                        :class="{ expand: expand }"
                    />
                </span>
            </span>
        </div>
        <el-collapse-transition>
            <div v-if="expand" class="select-content">
                <div class="select-bg">
                    <el-input
                        v-model="searchContent"
                        class="select-search"
                        placeholder="请输入"
                        @input="search($event)"
                    />
                    <div v-if="!searchContent" class="select-main">
                        <ul class="select-ul">
                            <li>
                                <div class="head-level">总部标签</div>
                                <ul>
                                    <li
                                        v-for="(tag) in hq_list"
                                        :key="tag.tag_group_id"
                                        class="flex flex-justify-between flex-align-center tag-group"
                                        @click.stop="getLeafData(tag)"
                                    >
                                        <span class="tag-name">{{ tag.tag_group_name }}</span>
                                        <i
                                            class="el-icon-arrow-right"
                                            :class="{ 'tag-checked': tag.checked }"
                                        />
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <div class="head-level">服务标签</div>
                                <ul>
                                    <li
                                        v-for="(tag) in service_list"
                                        :key="tag.tag_group_id"
                                        class="flex flex-align-center flex-justify-between tag-group"
                                        @click.stop="getLeafData(tag)"
                                    >
                                        <span class="tag-name">{{ tag.tag_group_name }}</span>
                                        <i
                                            class="el-icon-arrow-right"
                                            :class="{ 'tag-checked': tag.checked }"
                                        />
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="zw-content">
                            <li
                                v-for="(leaf) in leafNode.tag_value_arr"
                                :key="leaf.tag_id"
                                @click.stop=""
                            >
                                <el-checkbox
                                    v-model="leaf.checked"
                                    @change="
                                        getChecked(
                                            $event,
                                            leaf,
                                            leafNode.tag_group_name,
                                            leafNode.tag_type
                                        )
                                    "
                                >
                                    <span class="leaf-name">
                                        {{ leaf.name }}
                                    </span>
                                </el-checkbox>
                            </li>
                        </ul>
                    </div>
                    <div v-else class="select-search-main">
                        <ul v-if="searchTreeData.length > 0" class="select-search-ul">
                            <li v-for="(item) in searchTreeData" :key="item.id">
                                <el-checkbox
                                    v-model="item.checked"
                                    @change="
                                        getChecked($event, item, item.tag_group_name, item.tag_type)
                                    "
                                >
                                    <span class="member-name">
                                        {{ item.label }}
                                    </span>
                                </el-checkbox>
                            </li>
                        </ul>
                        <div v-else>暂无数据</div>
                    </div>
                </div>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script>
import customerTag from '../../../../components/CustomerTag/index.vue'
import { bounce } from '@/util/index'
import Http from '@/util/request'

export default {
    name: 'CustomerSelect',
    components: { customerTag },
    props: {
        modelValue: {
            type: Array
        },
        treeData: {
            type: Array,
            default: () => []
        },
        editSelectList: {
            type: Array,
            default: () => []
        }
    },
    emits: ['update:modelValue', 'closeTag'],
    data() {
        return {
            expand: false,
            leafShow: false,
            selectList: [],
            searchContent: '',
            searchTreeData: [],
            hq_list: [],
            service_list: [],
            leafNode: {}
        }
    },
    computed: {
    },
    watch: {
        treeData: {
            handler(val) {
                let arr = JSON.parse(JSON.stringify(val))
                this.initSetChecked(arr, 0)
                if (this.$route.query.sale_script_id) {
                    this.getLeafData(arr[0].childrens[0])
                }
            },
            deep: true
        },
        editSelectList: {
            handler(val) {
                console.log('获取到父元素选中', val)
                let arr = JSON.parse(JSON.stringify(val))
                this.selectList = arr
                this.initSetChecked(arr, 0)
                console.log(arr)
                this.selectedParentChecked()
                this.$emit('update:modelValue', arr)
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        let that = this
        document.body.addEventListener('click', function(e) {
            let goal = document.getElementsByClassName('customer-select')[0]
            if (e.path.includes(goal)) {
                that.expand = true
            } else {
                that.expand = false
            }
        })
    },
    created() {
        this.getTagSearch()
    },
    methods: {
        search: bounce(function(val) {
            console.log('searchbounce val', val)
            this.getTagSearch(val)
        }),
        async getTagSearch(val) {
            let { data } = await Http.getCalendarTag({
                search_content: val
            })
            if (val) {
                let arr = []
                if (data.hq_list) {
                    data.hq_list.length > 0 &&
                        data.hq_list.forEach(item => {
                            item.tag_value_arr &&
                                item.tag_value_arr.forEach(tag => {
                                    arr.push({
                                        label: `总部标签/${item.tag_group_name}/${tag.name}`,
                                        tag_id: tag.tag_id,
                                        name: tag.name,
                                        tag_type: item.tag_type,
                                        tag_group_name: item.tag_group_name,
                                        checked: false
                                    })
                                })
                        })
                    data.service_list.length > 0 &&
                        data.service_list.forEach(item => {
                            item.tag_value_arr &&
                                item.tag_value_arr.forEach(tag => {
                                    arr.push({
                                        label: `服务标签/${item.tag_group_name}/${tag.name}`,
                                        tag_id: tag.tag_id,
                                        name: tag.name,
                                        tag_type: item.tag_type,
                                        tag_group_name: item.tag_group_name,
                                        checked: false
                                    })
                                })
                        })
                    if (this.selectList.length > 0) {
                        this.selectList.forEach(select => {
                            arr.forEach(item => {
                                if (select.tag_id === item.tag_id) {
                                    item.checked = true
                                }
                            })
                        })
                    }

                    this.searchTreeData = arr
                }
            } else {
                this.hq_list = data.hq_list
                this.service_list = data.service_list
                this.selectList.forEach(item => {
                    this.changeChecked(this.hq_list, item.tag_id, true)
                })

                this.selectList.forEach(item => {
                    this.changeChecked(this.selectList, item.tag_id, true)
                })
                this.selectList.forEach(item => {
                    this.hq_list.forEach(tag => {
                        if (item.tag_group_name === tag.tag_group_name) {
                            tag.checked = true
                            // this.$set(tag, 'checked', true)
                        }
                    })
                    this.service_list.forEach(tag => {
                        if (item.tag_group_name === tag.tag_group_name) {
                            tag.checked = true
                            // this.$set(tag, 'checked', true)
                        }
                    })
                })
            }
        },
        closeTag(i, node) {
            // console.log('tagtag', i, node)
            this.selectList.splice(i, 1)
            this.changeChecked(
                node.tag_type == 'HQ' ? this.hq_list : this.service_list,
                node.tag_id,
                false
            )
            this.hq_list.forEach(tag => {
                tag.checked = false
                // this.$set(tag, 'checked', false)
            })
            this.service_list.forEach(tag => {
                tag.checked = false
                // this.$set(tag, 'checked', false)
            })
            this.selectList.forEach(item => {
                this.hq_list.forEach(tag => {
                    if (item.tag_group_name === tag.tag_group_name) {
                        tag.checked = true
                        // console.log('232323232')
                        // this.$set(tag, 'checked', true)
                    }
                })
                this.service_list.forEach(tag => {
                    if (item.tag_group_name === tag.tag_group_name) {
                        // this.$set(tag, 'checked', true)
                        tag.checked = true
                        // console.log('454564654')
                    }
                })
            })
            console.log('closeTag', this.selectList)
            this.$emit('update:modelValue', this.selectList)
            this.$emit('closeTag')
        },
        getChecked(e, node, tag_group_name, tag_type) {
            node.tag_group_name = tag_group_name
            node.tag_type = tag_type
            if (e) {
                this.selectList.push(node)
            } else {
                let i = this.getNodeKey(this.selectList, node.tag_id, 'tag_id')
                this.selectList.splice(i, 1)
            }
            this.hq_list.forEach(tag => {
                tag.checked = false
                // this.$set(tag, 'checked', false)
            })
            this.service_list.forEach(tag => {
                tag.checked = false
                // this.$set(tag, 'checked', false)
            })
            this.selectedParentChecked()
            // console.log(this.selectList)
            console.log('getChecked', this.selectList)
            this.$emit('update:modelValue', this.selectList)
        },
        // 已选择子节点的父节点选中
        selectedParentChecked() {
            this.selectList.forEach(item => {
                this.hq_list.forEach(tag => {
                    if (item.tag_group_name === tag.tag_group_name) {
                        tag.checked = true
                        // this.$set(tag, 'checked', true)
                    }
                    tag.tag_value_arr.forEach(leaf => {
                        if (item.tag_id === leaf.tag_id) {
                            leaf.checked = true
                        }
                    })
                })
                this.service_list.forEach(tag => {
                    if (item.tag_group_name === tag.tag_group_name) {
                        tag.checked = true
                        // this.$set(tag, 'checked', true)
                    }
                    tag.tag_value_arr.forEach(leaf => {
                        if (item.tag_id === leaf.tag_id) {
                            leaf.checked = true
                        }
                    })
                })
            })
        },
        getLeafData(node) {
            this.initSetExpand(this.hq_list, false)
            this.initSetExpand(this.service_list, false)
            node.expand = true
            // this.$set(node, 'expand', true)
            this.leafNode = {
                tag_group_name: node.tag_group_name,
                tag_type: node.tag_type,
                tag_value_arr: node.tag_value_arr
            }
        },
        initSetExpand(arr, flag) {
            arr.forEach(item => {
                item.expand = false
                // this.$set(item, 'expand', false)
                if (item.tag_value_arr && item.tag_value_arr.length > 0) {
                    this.initSetExpand(item.tag_value_arr, flag)
                }
            })
        },
        initSetChecked(arr, level) {
            arr.forEach(item => {
                item.expand = false
                // this.$set(item, 'expand', false)
                if (level === 0) {
                    item.expand = true
                    // this.$set(item, 'expand', true)
                }
                if (item.childrens && item.childrens.length > 0) {
                    this.initSetChecked(item.childrens, level + 1)
                } else {
                    item.checked = false
                    // this.$set(item, 'checked', false)
                }
            })
        },
        getNodeKey(arr, val, key) {
            let num = ''
            arr.forEach((item, i) => {
                if (item[key] === val) {
                    num = i
                }
                if (item.childrens && item.childrens.length > 0) {
                    this.getNodeKey(item.childrens, val, key)
                }
            })
            return num
        },
        // 只要值相等就选中
        changeChecked(arr, id, check, key = 'tag_id') {
            arr.forEach(item => {
                if (item[key] === id) {
                    item.checked = check
                    // this.$set(item, 'checked', check)
                } else {
                    if (item.tag_value_arr && item.tag_value_arr.length > 0) {
                        this.changeChecked(item.tag_value_arr, id, check)
                    }
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
    .customer-select {
        position: relative;
    }

    .customer-input {
        height: 32px;
        min-height: 32px;
        border-radius: 4px;
        border: 1px solid #ebeef5;
        cursor: pointer;
        position: relative;
        padding-right: 40px;
        padding-left: 10px;
        overflow: hidden;
        line-height: 32px;
    }

    .customer-placeholder {
        color: #c2c6ce;
        font-size: 12px;
    }

    .el-icon-arrow-down {
        transition: transform 0.3s ease-in-out;
    }

    .el-icon-arrow-down.expand {
        transform: rotate(180deg);
    }

    .select-content {
        position: absolute;
        left: 0;
        top: 100%;
        z-index: 999;
    }

    .select-bg {
        width: 432px;
        display: inline-block;
        padding: 16px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        background-color: #fff;
        height: 279px;
    }

    .select-main {
        display: inline-block;
        background-color: #fff;
        height: 209px;
    }

    .select-search {
        width: 100%;
        margin-bottom: 10px;
    }

    .el-checkbox {
        white-space: normal;
        margin-bottom: 5px;
    }

    .select-ul {
        display: inline-block;
        width: 200px;
        font-size: 14px;
        border: 1px solid #d9d9d9;
        height: 209px;
        padding: 10px;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        box-sizing: border-box;
        position: relative;
        cursor: pointer;
        overflow-y: auto;
        overflow-x: hidden;

        ul li{
            height:28px;
        }
    }
    .select-search-ul {
    }
    .select-ul .tag-group:hover {
        background-color: #f5f7fa;
    }

    .zw-content {
        display: inline-block;
        border: 1px solid #d9d9d9;
        border-left: none;
        width: 200px;
        height: 209px;
        padding: 10px;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        box-sizing: border-box;
        vertical-align: top;
        overflow-y: auto;
        overflow-x: hidden;
        li{
            height:33px;
        }
    }

    .float-content {
        width: 180px;
        position: absolute;
        left: 190px;
        top: 10px;
    }

    .head-level {
        color: #c4c4c4;
        height:28px;
        line-height: 28px;
    }

    .select-search-main {
        border: 1px solid #d9d9d9;
        padding: 10px;
        border-radius: 2px;
        font-size: 14px;
        max-height: 209px;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .tag-name {
        display: inline-block;
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .leaf-name {
        display: inline-block;
        max-width: 150px;
        vertical-align: top;
    }

    .tag-checked {
        color: #409eff;
    }
</style>
