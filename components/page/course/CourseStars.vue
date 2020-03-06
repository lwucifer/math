<template>
  <div class="chart-stars">
    <course-star-item
      v-for="(rate, index) in rates"
      :rate="rate"
      :key="index"
    />
  </div>
</template>

<script>
import IconStar from "~/assets/svg/icons/star.svg?inline";
import IconStarO from "~/assets/svg/icons/star-o.svg?inline";
import CourseStarItem from "~/components/page/course/CourseStarItem";

export default {
  components: {
    IconStar,
    IconStarO,
    CourseStarItem
  },

  props: {
    rates: {
      type: Array,
      default: []
    }
  },

  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course-stars.scss";
</style>
