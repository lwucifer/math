<template>
  <div class="chart-stars">
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

  props: {
    five: {
      type: Number,
      default: 0
    },
    four: {
      type: Number,
      default: 0
    },
    three: {
      type: Number,
      default: 0
    },
    two: {
      type: Number,
      default: 0
    },
    one: {
      type: Number,
      default: 0
    },
  },

  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-stars.scss";
</style>