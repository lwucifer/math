<template>
  <div class="app-stars" :class="size < 16 ? 'sm' : 'lg'">
    <IconStar class="star"
      :width="size"
      :height="size"
      v-for="(i,index) in stars"
      :key="index"
    />
    <IconStarO class="star"
      :width="size"
      :height="size"
      v-for="(i,index) in unstart"
      :key="index + 'unstart'"
    />
  </div>
</template>

<script>
import IconStar from "~/assets/svg/icons/star.svg?inline";
import IconStarO from "~/assets/svg/icons/star-o.svg?inline";

export default {
  components: {
    IconStar,
    IconStarO
  },

  computed: {
    unstart: function() {
      return 5 - (this.stars)
    }
  },

  props: {
    size: {
      type: Number,
      default: 12
    },
    stars: {
      type: Number,
      default: 0
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-stars.scss";
</style>