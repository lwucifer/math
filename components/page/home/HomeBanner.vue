<template>
  <div class="home-banner">
    <div class="container">
      <div class="home-banner__title">Học tập mọi lúc, mọi nơi <span>với Schoolly.</span></div>

      <div class="home-banner__text">Nền tảng học tập trực tuyến toàn diện dành cho<span> học sinh, giáo viên, nhà trường và các đơn vị giáo dục.</span></div>

      <app-button
        size="md"
        color="primary"
        class="home-banner__btn text-white"
        nuxt
        to="/auth/signup"
        >Tạo tài khoản</app-button>
    </div>
  </div>
</template>

<script>
import BannerImage from "~/assets/svg/images/elearing-home-banner.svg?inline";

export default {
  components: {
    BannerImage
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/home/_home-banner.scss";
</style>