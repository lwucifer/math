<template>
  <div class="chart-stars">
    <div class="star">
      <strong class="mr-2">5</strong>
      <IconStarO v-if="five < 100" />
      <IconStar v-else />
      <div class="chart">
        <div :style="'width: ' + five + '%'"></div>
      </div>
      <span>{{five}} %</span>
    </div>
    <div class="star">
      <strong class="mr-2">4</strong>
      <IconStarO v-if="four < 100" />
      <IconStar v-else />
      <div class="chart">
        <div :style="'width: ' + four + '%'"></div>
      </div>
      <span>{{four}} %</span>
    </div>
    <div class="star">
      <strong class="mr-2">3</strong>
      <IconStarO v-if="three < 100" />
      <IconStar v-else />
      <div class="chart">
        <div :style="'width: ' + three + '%'"></div>
      </div>
      <span>{{three}} %</span>
    </div>
    <div class="star">
      <strong class="mr-2">2</strong>
      <IconStarO v-if="two < 100" />
      <IconStar v-else />
      <div class="chart">
        <div :style="'width: ' + two + '%'"></div>
      </div>
      <span>{{two}} %</span>
    </div>
    <div class="star">
      <strong class="mr-2">1</strong>
      <IconStarO v-if="one < 100" />
      <IconStar v-else />
      <div class="chart">
        <div :style="'width: ' + one + '%'"></div>
      </div>
      <span>{{one}} %</span>
    </div>
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