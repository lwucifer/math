<template>
  <div class="chart-stars">
    <div class="star">
      <strong class="mr-2">{{ get(voting, "vote1_rate.votes", 0) }}</strong>
      <IconStar />
      <div class="chart">
        <div
          :style="'width: ' + get(voting, 'vote1_rate.percent', 0) + '%'"
        ></div>
      </div>
      <span class="text-gray"
        >{{ get(voting, "vote1_rate.percent", 0) }} %</span
      >
    </div>
    <div class="star">
      <strong class="mr-2">{{ get(voting, "vote2_rate.votes", 0) }}</strong>
      <IconStar />
      <div class="chart">
        <div
          :style="'width: ' + get(voting, 'vote2_rate.percent', 0) + '%'"
        ></div>
      </div>
      <span class="text-gray"
        >{{ get(voting, "vote2_rate.percent", 0) }} %</span
      >
    </div>
    <div class="star">
      <strong class="mr-2">{{ get(voting, "vote3_rate.votes", 0) }}</strong>
      <IconStar />
      <div class="chart">
        <div
          :style="'width: ' + get(voting, 'vote3_rate.percent', 0) + '%'"
        ></div>
      </div>
      <span class="text-gray"
        >{{ get(voting, "vote3_rate.percent", 0) }} %</span
      >
    </div>
    <div class="star">
      <strong class="mr-2">{{ get(voting, "vote4_rate.votes", 0) }}</strong>
      <IconStar />
      <div class="chart">
        <div
          :style="'width: ' + get(voting, 'vote4_rate.percent', 0) + '%'"
        ></div>
      </div>
      <span class="text-gray"
        >{{ get(voting, "vote4_rate.percent", 0) }} %</span
      >
    </div>
    <div class="star">
      <strong class="mr-2">{{ get(voting, "vote5_rate.votes", 0) }}</strong>
      <IconStar />
      <div class="chart">
        <div
          :style="'width: ' + get(voting, 'vote5_rate.percent', 0) + '%'"
        ></div>
      </div>
      <span class="text-gray"
        >{{ get(voting, "vote5_rate.percent", 0) }} %</span
      >
    </div>
  </div>
</template>

<script>
import IconStar from "~/assets/svg/icons/star.svg?inline";
import { get } from "lodash";

export default {
  components: {
    IconStar,
  },

  props: {
    voting: {},
  },

  methods: { get },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-stars.scss";
</style>
