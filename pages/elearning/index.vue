<template>
  <div class="elearning-homepage">
    <!-- <ElearingHomeBanner /> -->

    <!-- Old -->
    <div class="container" v-if="!elearnings">Loading...</div>
    <div class="container" v-else>
      <course-slider-tab
        :elearnings="get(elearnings, 'highlight', null)"
        :swiperOptions="sliderOptions"
        title="Nổi bật"
      />
      <course-slider-tab
        :elearnings="get(elearnings, 'suggestion', null)"
        :swiperOptions="sliderOptions"
        title="Gợi ý"
        class="mt-5"
      />
      <course-slider-tab
        :elearnings="get(elearnings, 'recent', null)"
        :swiperOptions="sliderOptions"
        title="Bài giảng mới nhất"
        class="mt-5"
      />
      <!-- <div class="text-center mt-3">
        <app-button square>Xem tất cả bài giảng</app-button>
      </div> -->
    </div>
  </div>
</template>

<script>
import { get } from "lodash";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";

import ElearingHomeBanner from "~/components/page/elearning/home/ElearningHomeBanner.vue"


import CourseSliderTab from "~/components/page/course/CourseSliderTab";

export default {
  components: {
    CourseSliderTab,
    ElearingHomeBanner
  },

  async fetch({ params, query, store }) {
    await store.dispatch(
      `elearning/public/public-summary/${actionTypes.ELEARNING_PUBLIC_SUMMARY.LIST}`
    );
  },

  mounted() {
    this.$store.dispatch(
      `elearning/public/public-summary/${actionTypes.ELEARNING_PUBLIC_SUMMARY.LIST}`
    );
  },

  updated() {
    console.log(this.elearnings)
  },

  data() {
    return {
      sliderOptions: {
        spaceBetween: 20,
        slidesPerView: 5,
        setWrapperSize: true,
        autoHeight: false,
        watchOverflow: true,
        showName: true,
      },
    };
  },

  updated() {
    console.log(this.elearnings);
  },

  computed: {
    ...mapState("elearning/public/public-summary", {
      elearnings: "elearnings",
    }),
  },

  methods: {
    get,
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course.scss";
</style>
