<template>
    <div
        class="customer-tree-node"
    >
        <div
            class="p-l-16"
            :class="{ is_checked: node.expand && !node.tag_value_arr, 'second-level': level === 1 }"
        >
            <div
                class="customer-tree-level"
                :style="{ 'padding-left': level * 10 + 'px' }"
                @click="toggleExpand(node, level)"
            >
                <i
                    ref="icon"
                    class="el-tree-expand-icon el-icon-caret-right"
                    :class="{
                        'icon-visibility': !node.tag_value_arr,
                        expand: node.expand
                    }"
                />
                <div v-if="!node.tag_value_arr" class="node-leaf">
                    <span class="node_name">
                        {{ node.tag_group_name || node.name }}
                    </span>
                    <span class="ml-20 node_num">
                        {{ node.sale_script_num }}
                    </span>
                </div>
                <div v-else>
                    <span class="node_name">
                        {{ node.tag_group_name || node.name }}
                    </span>
                </div>
            </div>
        </div>
        <div v-for="(child, tagIndex) in node.tag_value_arr" :key="tagIndex">
            <customer-tree-node
                v-if="node.expand"
                :key="child.name || child.tag_group_name + tagIndex"
                :node="child"
                :parent="node"
                :level="level + 1"
                :index="tagIndex"
                :cancel-checked="cancelChecked"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'CustomerTreeNode',
    inject: ['RootTree'],
    props: {
        node: {
            type: Object,
            default() {
                return {}
            }
        },
        level: {
            type: Number,
            default() {
                return 1
            }
        },
        index: {
            type: Number,
            default: 0
        },
        // 上一层的数据
        parent: {
            type: Object,
            default() {
                return {}
            }
        },
        cancelChecked: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {}
    },
    computed: {
    },
    watch: {},
    created() {},
    methods: {
        async toggleExpand(node) {
            if (!node.tag_value_arr) {
                this.cancelChecked()
            }
            this.$nextTick(() => {
                node.expand = !node.expand
                if (node.expand && !node.tag_value_arr) {
                    this.RootTree.handleTreeLeafClick({
                        ...node,
                        tag_group_name: this.parent.tag_group_name,
                        tag_type: this.parent.tag_type
                    })
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
.customer-tree-node {
  color: #171717;
  .p-l-16:hover {
    background-color: #f5f7fa;
    cursor: pointer;
  }
  .p-l-16 {
    &.is_checked {
      background-color: #ebf3fe;
      color: #fff;

    }

    &.second-level {
      .node_name {
        color: #1773fa;
        border: 1px solid #1773fa;
        border-radius: 2px;
        font-size: 12px;
        padding: 1px 4px;
      }
    }
  }
  .customer-tree-level {
    padding: 15px 0;
    display: flex;
      align-items: center;

    .node-leaf {
      flex: 1;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      padding: 0 9px;
      border-radius: 2px;
      align-items: center;

      .node_name {
        display: inline-block;
        background-color: #cccccc;
        padding: 2px 8px;
        border-radius: 2px;
        color: #fff;
        max-width: 140px;
        word-break: break-all;
        line-height: 1.2;
      }

      .node_num {
        display: inline-block;
        background-color: #cccccc;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        text-align: center;
        line-height: 20px;
        color: #fff;
      }
    }
  }

  .customer-tree-node {
  }

  .icon-visibility {
    visibility: hidden;
  }

  .customer-tree-level .el-tree-expand-icon {
    transition: transform 0.3s ease-in-out;
    margin-right: 10px;
    cursor: pointer;

    &.expand {
      transform: rotate(90deg);
        &~.node-leaf {
            .node_name, .node_num {
                background-color: #1773fa;
            }
        }
    }
  }

  .node-bd {
    border: 1px solid #1773fa;
  }
}
.customer-tree-node.color-orange {
    .p-l-16 {

        &.second-level {
            .node_name {
                color: #ff6f00;
                border-color: #ff6f00;
                border-radius: 2px;
            }
        }

        &.is_checked {
            background-color: #fff8f3;

            .node-leaf {
                .node_name,
                .node_num {
                    background-color: #ff6f00;
                }
            }
        }
    }
    .customer-tree-level .el-tree-expand-icon {
        transition: transform 0.3s ease-in-out;
        margin-right: 10px;
        cursor: pointer;

        &.expand {
            transform: rotate(90deg);
            &~.node-leaf {
                .node_name, .node_num {
                    background-color:  #ff6f00;
                }
            }
        }
    }

}
</style>
