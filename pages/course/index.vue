<template>
  <div class="container">
    <course-slider-tab
      :elearnings="get(elearnings, 'highlight', null)"
      :swiperOptions="sliderOptions"
      title="Nổi bật"
    />
    <course-slider-tab
      :elearnings="get(elearnings, 'suggestion', [])"
      :swiperOptions="sliderOptions"
      title="Gợi ý"
      class="mt-5"
    />
    <course-slider-tab
      :elearnings="get(elearnings, 'recent', [])"
      :swiperOptions="sliderOptions"
      title="Bài giảng mới nhất"
      class="mt-5"
    />
    <div class="text-center mt-3">
      <app-button square>Xem tất cả bài giảng</app-button>
    </div>
  </div>
</template>

<script>
import CourseSliderTab from "~/components/page/course/CourseSliderTab";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import BannerImage from "~/assets/images/tmp/timeline-slider.jpg";
import { get } from "lodash";
// Import faked data
import { LESSONS, SCIENCES } from "~/server/fakedata/course/courses";

export default {
  components: {
    CourseSliderTab
  },

  async fetch({ params, query, store }) {
    await store.dispatch(
      `elearning/public/public-summary/${actionTypes.ELEARNING_PUBLIC_SUMMARY.LIST}`
    );
  },

  data() {
    return {
      isAuthenticated: true,
      lessons: LESSONS,
      sciences: SCIENCES,
      sliderOptions: {
        spaceBetween: 20,
        slidesPerView: 5,
        setWrapperSize: true,
        autoHeight: true,
        watchOverflow: true,
        showName: true
      },
      active_el: 0
    };
  },

  computed: {
    ...mapState("auth", ["loggedUser"]),
    ...mapState("elearning/public/public-summary", {
      elearnings: "elearningPublicSummary"
    })
  },

  methods: {
    get
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course.scss";
</style>
