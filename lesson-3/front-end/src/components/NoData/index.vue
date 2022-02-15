<template>
    <div class="right-con">
        <div class="con-title">
            <slot name="content" />
        </div>
        <div>
            <slot name="button" />
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.right-con {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20%;
  .con-title {
    height: 44px;
    line-height: 44px;
  }
}
</style>