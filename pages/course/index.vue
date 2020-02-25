<template>
  <div class="container">
    <course-slider-tab
      :lessons="highlight"
      :sciences="sciences"
      :swiperOptions="sliderOptions"
      title="Nổi bật"
    />
    <course-slider-tab
      :lessons="suggestion"
      :sciences="sciences"
      :swiperOptions="sliderOptions"
      title="Gợi ý"
      class="mt-5"
    />
    <course-slider-tab
      :lessons="recent"
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
    console.log("get earning summary");
    await store.dispatch(
      `elearning/public-summary/${actionTypes.ELEARNING_PUBLIC_SUMMARY.LIST}`
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
    ...mapState("elearning/public-summary", ["elearningPublicSummary"]),
    highlight() {
      return get(this.elearningPublicSummary, "highlight", []);
    },
    suggestion() {
      return get(this.elearningPublicSummary, "suggestion", []);
    },
    recent() {
      return get(this.elearningPublicSummary, "recent", []);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/course/_course.scss";
</style>
