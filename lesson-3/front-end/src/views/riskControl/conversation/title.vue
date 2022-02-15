<template>
    <div class="title" :style="titleStyle">{{ title }}</div>
</template>

<script>
export default {
    name: '',
    props: {
        title: {
            type: String,
            default: () => {
                return '标题'
            }
        },
        titleStyle: {
            type: Object,
            default: () => {
                return {}
            }
        }
    }
}
</script>

<style lang="scss">
.title {
  padding: 10px 5px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
