<template>
    <div class="customer-select">
        <div>
            <div class="customer-input flex flex-align-center" @click="expand = !expand">
                <span v-if="!radioCheck.name" class="customer-placeholder">
                    请选择商品{{ treeChecked }}
                </span>
                <customerTag
                    v-else
                    :left-title="radioCheck.name"
                    :right-title="radioCheck.checkGoods.goods_title"
                    :show-close="true"
                    color="#409eff"
                    :customer-style="{ 'margin-bottom': '10px' }"
                    @closeTag="closeTag()"
                />
                <!-- <el-tag v-if="selectList.length > 1" type="info" size="mini">
                    +{{ selectList.length - 1 }}
                </el-tag> -->
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
                                <div class="head-level">商品分类</div>
                                <ul>
                                    <li
                                        v-for="(tag) in hq_list"
                                        :key="tag.goods_class_id"
                                        class="flex flex-justify-between flex-align-center tag-group"
                                        @click.stop="getLeafData(tag)"
                                    >
                                        <span 
                                            class="tag-goods_title"
                                            :class="{ 'tag-goods_title-active': tag.checked }"
                                        >
                                            {{ tag.name }}
                                        </span>
                                        <i
                                            class="el-icon-arrow-right"
                                            :class="{ 'tag-checked': tag.checked }"
                                        />
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="zw-content">
                            <el-radio-group v-model="radioCheck.checkGoods" @change="getChecked">
                                <li
                                    v-for="(leaf) in leafNode.goods_list"
                                    :key="leaf.goods_id"
                                    @click.stop=""
                                >
                                    <!-- <el-radio
                                        :label="leaf.goods_title"
                                        @change="
                                            getChecked(
                                                $event,
                                                leaf,
                                                leafNode.name
                                            )
                                        "
                                    > -->
                                    <el-radio :label="leaf">
                                        <el-popover
                                            :width="210"
                                            trigger="click"
                                        >
                                            <span class="leaf-goods_title">
                                                {{ leaf.goods_title }}
                                            </span>
                                            <template #reference>
                                                <span 
                                                    class="leaf-goods_title overflow-ellipsis"
                                                    :class="{ 'leaf-goods_title-active': leaf.checked }"
                                                >
                                                    {{ leaf.goods_title }}
                                                </span>
                                            </template>
                                        </el-popover>
                                    </el-radio>
                                </li>
                            </el-radio-group>
                        </ul>
                    </div>
                    <div v-else class="select-search-main">
                        <ul v-if="searchTreeData.length > 0" class="select-search-ul">
                            <el-radio-group v-model="radioCheck.checkGoods" @change="getChecked()">
                                <li v-for="(item) in searchTreeData" :key="item.id">
                                    <!-- <el-radio
                                    
                                        @change="
                                            getChecked($event, item, item.name)
                                        "
                                    > -->
                                    <el-radio :label="item">
                                        <el-popover
                                            :width="210"
                                            trigger="click"
                                        >
                                            <span class="member-goods_title">
                                                {{ item.label }}
                                            </span>
                                            <template #reference>
                                                <span class="member-goods_title overflow-ellipsis">
                                                    {{ item.label }}
                                                </span>
                                            </template>
                                        </el-popover>
                                    </el-radio>
                                </li>
                            </el-radio-group>
                        </ul>
                        <div v-else>暂无数据</div>
                    </div>
                </div>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script>
import customerTag from '../CustomerTag/index.vue'
import { bounce } from '@/util/index'
import Http from '@/util/request'

export default {
    goods_title: 'CustomerSelect',
    components: { customerTag },
    props: {
        modelValue: {
            type: Object
        },
        treeData: {
            type: Array,
            default: () => []
        },
        editSelectList: {
            type: Array,
            default: () => []
        },
        shopNameClose: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue'],
    data() {
        return {
            expand: false,
            leafShow: false,
            selectList: [],
            searchContent: '',
            searchTreeData: [],
            hq_list: [],
            leafNode: {},
            // 单选框使用
            radioCheck: {
                goods_class_id: 0,
                name: '',
                checkGoods: {}
            }
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
        // editSelectList: {
        //     handler(val) {
        //         let arr = JSON.parse(JSON.stringify(val))
        //         this.selectList = arr
        //         this.initSetChecked(arr, 0)
        //         console.log(arr)
        //         this.selectedParentChecked()

        //         this.$emit('update:modelValue', arr)
        //     },
        //     deep: true
        // },
        shopNameClose: {
            handler() {
                this.closeTag()
                // console.error('shopNameClose', val)
                // // this.closeTag()
                // this.getTagSearch()
                // this.leafNode = {}
            }
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
            console.log(val)
            this.getTagSearch(val)
        }),
        async getTagSearch(val) {
            let { data } = await Http.getOrderStoreGoods({
                search_goods_name: val
            })
            if (val) {
                let arr = []
                if (data) {
                    data.length > 0 &&
                        data.forEach(item => {
                            item.goods_list &&
                                item.goods_list.forEach(tag => {
                                    arr.push({
                                        label: `${item.name}/${tag.goods_title}`,
                                        goods_id: tag.goods_id,
                                        goods_title: tag.goods_title,
                                        name: item.name,
                                        checked: false
                                    })
                                })
                        })
                    if (this.selectList.length > 0) {
                        this.selectList.forEach(select => {
                            arr.forEach(item => {
                                if (select.goods_id === item.goods_id) {
                                    item.checked = true
                                }
                            })
                        })
                    }

                    this.searchTreeData = arr
                }
            } else {
                this.hq_list = data
                this.selectList.forEach(item => {
                    this.changeChecked(this.hq_list, item.goods_id, true)
                })

                this.selectList.forEach(item => {
                    this.changeChecked(this.selectList, item.goods_id, true)
                })
                this.selectList.forEach(item => {
                    this.hq_list.forEach(tag => {
                        if (item.name === tag.name) {
                            tag.checked = true
                            // this.$set(tag, 'checked', true)
                        }
                    })
                })
            }
        },
        closeTag() {
            // console.log('closeTag', i, node)
            // this.selectList.splice(i, 1)
            // this.changeChecked(
            //     this.hq_list,
            //     node.goods_id,
            //     false
            // )
            this.hq_list.forEach(tag => {
                tag.checked = false
                // this.$set(tag, 'checked', false)
            })
            // this.searchTreeData.forEach(tag => {
            //     // console.log('111111tag', tag)
            //     if (node.goods_title === tag.goods_title) {
            //         tag.checked = false
            //     }
            // })
            // this.selectList.forEach(item => {
            //     this.hq_list.forEach(tag => {
            //         if (item.name === tag.name) {
            //             tag.checked = true
            //             // this.$set(tag, 'checked', true)
            //         }
            //     })
            // })

            this.radioCheck = {
                name: '',
                goods_class_id: '',
                checkGoods: {
                    goods_title: ''
                }
            }
            this.$emit('update:modelValue', this.radioCheck)
        },
        async getChecked() {
            // node.name = name
            // if (e) {
            //     this.selectList = [node]
            // } else {
            //     let i = this.getNodeKey(this.selectList, node.goods_id, 'goods_id')
            //     this.selectList.splice(i, 1)
            // }
            // this.hq_list.forEach(tag => {
            //     tag.checked = false
            //     // this.$set(tag, 'checked', false)
            // })

            // console.log('999999999999999999')
            
            await this.selectedParentChecked()
            // console.log('this.selectList', this.selectList)
            // this.$emit('update:modelValue', this.selectList)
            console.log('this.selectList', this.radioCheck)
            this.$emit('update:modelValue', this.radioCheck)
        },
        // 已选择子节点的父节点选中
        selectedParentChecked() {
            // this.selectList.forEach(item => {
            //     this.hq_list.forEach(tag => {
            //         if (item.name === tag.name) {
            //             tag.checked = true
            //             // this.$set(tag, 'checked', true)
            //         }
            //         tag.goods_list.forEach(leaf => {
            //             if (item.goods_id === leaf.goods_id) {
            //                 leaf.checked = true
            //             }
            //         })
            //     })
            // })
            this.hq_list.forEach(tag => {
                tag.checked = false
            })
            this.hq_list.forEach(tag => {
                // console.log('---------', tag, this.radioCheck)
                if (this.radioCheck.checkGoods.goods_class_id === tag.goods_class_id) {
                    this.radioCheck.goods_class_id = tag.goods_class_id
                    this.radioCheck.name = tag.name
                    tag.checked = true
                }
            })
            if (!this.radioCheck.goods_class_id) {
                this.radioCheck.name = this.radioCheck.checkGoods.name
            }
            return Promise.resolve(true)
        },
        getLeafData(node) {
            this.initSetExpand(this.hq_list, false)
            node.expand = true
            // this.$set(node, 'expand', true)
            this.leafNode = {
                name: node.name,
                goods_list: node.goods_list
            }
        },
        initSetExpand(arr, flag) {
            arr.forEach(item => {
                item.expand = false
                // this.$set(item, 'expand', false)
                if (item.goods_list && item.goods_list.length > 0) {
                    this.initSetExpand(item.goods_list, flag)
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
        changeChecked(arr, id, check, key = 'goods_id') {
            arr.forEach(item => {
                if (item[key] === id) {
                    item.checked = check
                    // this.$set(item, 'checked', check)
                } else {
                    if (item.goods_list && item.goods_list.length > 0) {
                        this.changeChecked(item.goods_list, id, check)
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
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        cursor: pointer;
        position: relative;
        // padding-right: 40px;
        // padding-left: 10px;
        padding: 0 15px;
        overflow: hidden;
        line-height: 32px;
    }

    .customer-placeholder {
        color: #c2c6ce;
        font-size: 14px;
    }

    .el-icon-arrow-down {
        transition: transform 0.3s ease-in-out;
        line-height: 32px;
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
        width: 120px;
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
        width: 280px;
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

    .tag-goods_title {
        display: inline-block;
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .tag-goods_title-active {
        display: inline-block;
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: rgba(23, 115, 250, 1);
    }

    .leaf-goods_title {
        display: inline-block;
        max-width: 210px;
        vertical-align: top;
    }
    .leaf-goods_title-active {
        display: inline-block;
        max-width: 210px;
        vertical-align: top;
        color: rgba(23, 115, 250, 1);
    }

    .tag-checked {
        color: #409eff;
    }
  .member-goods_title {
    display: inline-block;
    width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    // color: #409eff;
    vertical-align: middle;
  }
</style>
