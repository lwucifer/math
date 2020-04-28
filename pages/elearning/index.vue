<template>
  <VclFacebook v-if="loading" class="bg-white" />
  <div class="container" v-else>
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
import BannerImage from "~/assets/images/tmp/timeline-slider.jpg";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import { get } from "lodash";
import { VclFacebook } from "vue-content-loading";

export default {
  components: {
    CourseSliderTab,
    VclFacebook,
  },

  async fetch({ params, query, store }) {
    await store.dispatch(
      `elearning/public/public-summary/${actionTypes.ELEARNING_PUBLIC_SUMMARY.LIST}`
    );
  },

  data() {
    return {
      loading: false,
      sliderOptions: {
        spaceBetween: 20,
        slidesPerView: 5,
        setWrapperSize: true,
        autoHeight: true,
        watchOverflow: true,
        showName: true,
      },
    };
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
