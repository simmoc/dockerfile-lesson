<template>
    <page-main class="">
        <div class="search-head-wrap flex-row-between bg-color-fff p-24">
            <el-form
                ref="ruleForm"
                v-model="addknowInfo"
                class="demo-ruleForm"
                height="32px"
                label-width="520px"
                label-position="top"
            >
                <el-form-item required>
                    <label class="el-form-item__label">
                        <i class="color-red">*</i>
                        标签
                        <span class="el-form-item_label-span">
                            命中标签越多，排名越靠前
                        </span>
                    </label>
                    <customerSelect
                        v-model="treeChecked"
                        :tree-data="treeData"
                        :edit-select-list="selectList"
                    />
                </el-form-item>
                <el-form-item required>
                    <label class="el-form-item__label">
                        <i class="color-red">*</i>
                        标签营销内容
                        <span class="el-form-item_label-span">
                            可添加素材数量 {{ content_arr.length }}/10
                        </span>
                    </label>
                    <CustomerMedia v-model="content_arr" :text-limit="800" />
                </el-form-item>

                <el-form-item class="item-button tr">
                    <el-button size="small" @click="cancelData">取 消</el-button>
                    <el-button type="primary" size="small" @click="sumitKnowdeage">提 交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </page-main>
</template>
<script>
import Http from '@/util/request'
// import sourceMaterial from '@/views/knowledgeBase/component/sourceMaterial/index.vue'
import customerSelect from '@/components/CustomerSelect/index.vue'
import CustomerMedia from '@/components/CustomerMedia/index.vue'
import { ElMessage } from 'element-plus'
export default {
    name: 'KnowledgeBaseAddOrEdit',
    components: {
        // sourceMaterial,
        customerSelect,
        CustomerMedia
    }, // 知识库新增
    data() {
        return {
            treeData: [
                {
                    id: '总部标签',
                    name: '总部标签',
                    childrens: [
                        {
                            id: '消费水平',
                            name: '消费水平',
                            childrens: [
                                {
                                    id: '5万元/月',
                                    name: '5万元/月',
                                    num: 4
                                }
                            ]
                        }
                    ]
                },
                {
                    id: '服务标签',
                    name: '服务标签',
                    childrens: [
                        {
                            id: '情感需求',
                            name: '情感需求',
                            childrens: [
                                {
                                    id: '缺自信',
                                    name: '缺自信',
                                    num: 4
                                }
                            ]
                        }
                    ]
                }
            ], // 树形数据;
            selectList: [],
            contentLength: 0,
            content_arr: [], // 媒体组件数组
            treeChecked: []
        }
    },
    watch: {},
    mounted() {

        this.getTagGroup()
        // 可以在这么判断没有从其  他页面中传递过来参数 就直接返回出去某一个页面
        if (this.$route.query.sale_script_id) {
            this.getSaleScriptDetail()
        }
        if (this.$route.query.selected) {
            let selected = JSON.parse(this.$route.query.selected)
            this.selectList.push({
                tag_id: selected.tag_id,
                tag_group_name: selected.tag_group_name,
                tag_type: selected.tag_type,
                name: selected.name
            })
        }
        console.log(this.$route.query.selected)
    },

    methods: {

        // 编辑-获取详情
        async getSaleScriptDetail() {
            let { data } = await Http.getSaleScriptDetail({
                sale_script_id: this.$route.query.sale_script_id
            })
            this.selectList = data.tag_arr
            data.content_arr.forEach(item => {
                if (item.type === 'LINK') {
                    let arr = item.qw_link_url.split('//')
                    item.qw_link_url = arr[1]
                    item.url = arr[0] + '//'
                }
            })
            this.content_arr = data.content_arr
            // this.$refs.welcomeTextAndFile.setEdit(data, 'knowledge_edit')
            console.log(data)
        },
        // 获取分组的下拉列表
        getTagGroup() {
            Http
                .getTagGroup()
                .then(res => {
                    console.log('res', res)
                    let data = res.data
                    console.log(data)
                })
        },
        cancelData() {
            this.$router.go(-1)
        },
        // 提交知识
        async sumitKnowdeage() {
            let tag_id_arr = []
            if (this.treeChecked.length === 0) {
                ElMessage.error('请选择标签')
                return
            }
            this.treeChecked.forEach(item => {
                tag_id_arr.push(item.tag_id)
            })

            // 2.数据校验
            if (!this.content_arr.length) {
                ElMessage.error({
                    message: '标签营销内容不能为空!'
                })
                return
            }

            let arr = JSON.parse(JSON.stringify(this.content_arr))
            arr.forEach(item => {
                if (item.type === 'LINK') {
                    item.qw_link_url = item.url + item.qw_link_url
                }
            })
            // 3.发送请求
            if (this.$route.query.sale_script_id) {
                let res = await Http.updateSaleScript({
                    content_arr: arr,
                    tag_id_arr,
                    sale_script_id: this.$route.query.sale_script_id
                })
                if (res.code === 200) {
                    ElMessage.success('编辑成功！')
                    setTimeout(() => {
                        this.$router.replace({
                            name: 'labelSale',
                            query: {
                                selected: JSON.stringify(this.treeChecked)
                            }
                        })
                    }, 500)
                }
            } else {
                let res = await Http.addSaleScript({ content_arr: arr, tag_id_arr })
                if (res.code === 200) {
                    ElMessage.success('添加成功！')
                    setTimeout(() => {
                        this.$router.replace({
                            name: 'labelSale',
                            query: {
                                selected: JSON.stringify(this.treeChecked)
                            }
                        })
                    }, 500)
                }
            }
        },

        resetForm(formName) {
            this.$refs[formName].resetFields()
        }
    }
}
</script>

<style scoped lang="scss">

    .search-head-wrap > .demo-ruleForm {
        width: 520px;
    }

    .form-ipt-style {
        width: 520px;
        height: 32px !important;
    }

    .item-button {
        display: flex;
        justify-content: flex-end;
    }
    form.el-form .el-form-item__label {
        font-size: 14px;
    }
    .el-form-item__label .el-form-item_label-span {
        width: 110px;
        height: 17px;
        opacity: 0.85;
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #909399;
        line-height: 17px;
        margin-left: 8px;
    }

    .color-red {
        color: #ff3b34;
    }

    .relative {
        position: relative;
    }
</style>
