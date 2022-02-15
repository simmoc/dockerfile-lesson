<template>
    <page-main>
        <div class="notfound">
            <img src="@/assets/images/404.png" alt="">
            <!--        <svg-icon name="404" />-->
            <div class="content">
                <h1 class="page-lose">404</h1>
                <div class="desc">抱歉，你访问的页面不存在</div>
            </div>
        </div>
    </page-main>
</template>

<script>
export default {
    beforeRouteLeave(to, from, next) {
        clearInterval(this.inter)
        next()
    },
    data() {
        return {
            inter: null,
            countdown: 5
        }
    },
    mounted() {
        // this.inter = setInterval(() => {
        //     this.countdown--
        //     if (this.countdown == 0) {
        //         clearInterval(this.inter)
        //         this.goBack()
        //     }
        // }, 1000)
    },
    methods: {
        goBack() {
            this.$router.push('/')
        }
        // // 图片引入
        // getImageUrl(url) {
        //     return new URL(url, import.meta.url).href
        // }
    }
}
</script>

<style lang="scss" scoped>
.notfound {
    display: flex;
    align-items: center;
    width:850px;
    margin: 24px;
    @include position-center(xy);
    .svg-icon {
        width: 400px;
        height: 400px;
    }
    img{
        width: 438px;
        height:268px;
        margin-right: 120px;
    }
    .content {
        h1.page-lose {
            margin: 0;
            font-size: 56px;
            color: #000;
        }
        .desc {
            margin: 16px 0 30px;
            font-size: 16px;
            color: #8C8C8C;
        }
    }
}
</style>
