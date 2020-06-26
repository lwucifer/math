<template>
    <div class="home-mobile text-center">
        <div class="container">
          <div class="home-mobile__logo mb-4">
            <IconLogo width="245px" height="66px"/>
          </div>

          <h4 class="home-mobile__title">Hệ thống giáo dục và đào tạo trực <span>tuyến toàn diện</span></h4>

          <div class="home-mobile__download">
            <p class="intro mb-4">Tải ứng dụng trên điện thoại</p>

            <a href="" target="_blank" class="appstore d-block mb-4"><img src="/images/appstore.png" alt=""></a>

            <a href="" target="_blank" class="d-block"><img src="/images/playstore.png" alt=""></a>
          </div>

          <div class="home-mobile__link">
            <a href="/" target="_blank">Xem Schoolly phiên bản desktop</a>
          </div>
        </div>
    </div>
</template>

<script>
import IconLogo from "~/assets/svg/logo/schoolly.svg?inline";

export default {
  name: "HomeMonbile",

  components: {
    IconLogo
  }
}
</script>

<style lang="scss">
@import "~assets/scss/components/home/_home-mobile.scss";
</style>