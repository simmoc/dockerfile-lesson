<template>
    <div class="customer-title">
        <span class="vtm">
            {{ title }}
        </span>
        <img src="./customerTitle.png" alt="" class="title-img">
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '标题'
        }
    }
}
</script>

<style scoped>
    .customer-title {
        font-size: 16px;
        font-weight: 500;
        color:#171717;
        padding-bottom: 16px;
    }

    .title-img {
        width: 61px;
        height: 12px;
        vertical-align: middle;
    }
</style>
