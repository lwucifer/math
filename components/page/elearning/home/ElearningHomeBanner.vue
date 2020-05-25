<template>
  <div class="elearning-home-banner">
    <div class="container">
      <div class="elearning-home-banner__title">In-demand talent on demand. <span>Scholly is how.</span></div>

      <div class="elearning-home-banner__text">Scholly expertly connects professionals and agencies <span>to businesses seeking specialized talent.</span></div>

      <app-button
        size="md"
        color="primary"
        class="elearning-home-banner__btn text-white"
        nuxt
        to=""
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
@import "~/assets/scss/components/elearning/home/_elearning-home-banner.scss";
</style>