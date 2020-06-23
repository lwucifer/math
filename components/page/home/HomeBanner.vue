<template>
  <div class="home-banner">
    <div class="container">
      <div class="home-banner__title">In-demand talent on demand. <span>Schoolly is how.</span></div>

      <div class="home-banner__text">Schoolly expertly connects professionals and agencies <span>to businesses seeking specialized talent.</span></div>

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