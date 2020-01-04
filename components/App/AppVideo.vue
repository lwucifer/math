<template>
  <div class="app-video" v-on="$listeners">
    <img :src="posterSrc" alt />
    <button type="button" class="app-video__btn">
      <IconPlayCircle />
    </button>
  </div>
</template>

<script>
import IconPlayCircle from "~/assets/svg/icons/play-circle.svg?inline";

export default {
  components: {
    IconPlayCircle
  },

  props: {
    posterSrc: {
      type: String
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-video.scss";
</style>