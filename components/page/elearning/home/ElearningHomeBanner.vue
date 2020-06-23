<template>
  <div class="elearning-home-banner">
    <div class="container">
      <div class="row">
        <div class="col-md-7 align-self-center py-5">
          <h1 class="elearning-home-banner__title">
            <div>In-demand talent on demand.</div>Schoolly is how.
          </h1>

          <p
            class="elearning-home-banner__subtitle"
          >Schoolly expertly connects professionals and agencies <span>to businesses seeking specialized talent.</span></p>
        </div>

        <div class="col-md-5 align-self-end">
          <BannerImage class="elearning-home-banner__img" />
        </div>
      </div>
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

<style lang="scss" scoped>
@import "~/assets/scss/components/elearning/home/_elearning-home-banner.scss";
</style>