<template>
  <div class="chart-stars">
    <div class="star" v-for="item in rates" :key="item.rate">
      <strong class="mr-2">{{ item.rate }}</strong>
      <IconStar />
      <div class="chart">
        <div :style="'width: ' + item.percent + '%'"></div>
      </div>
      <span class="text-gray">{{ item.percent }} %</span>
    </div>
  </div>
</template>

<script>
import IconStar from "~/assets/svg/icons/star.svg?inline";

export default {
  components: {
    IconStar,
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
    rates: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-stars.scss";
</style>