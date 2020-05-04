<template>
  <div class="school-course-slider">
    <h3 class="school-course-slider__title" v-if="title">{{ title }}</h3>
    <div v-swiper:mySwiper="currentSwiperOptions" class="" v-on="$listeners">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(cource, index) in cources"
          :key="index"
        >
          <div class="slider-item" @click="$emit('click-item', cource, index)">
            <school-course-item :cource="cource" />
          </div>
        </div>
      </div>

      <div class="swiper-button-prev" v-if="currentSwiperOptions.navigation">
        <IconChevronLeft />
      </div>
      <div class="swiper-button-next" v-if="currentSwiperOptions.navigation">
        <IconChevronRight />
      </div>
      <div
        class="swiper-pagination"
        v-if="currentSwiperOptions.pagination"
      ></div>
    </div>
    <div class="school-course-slider__footer">
      <div class="text-center">
        <app-button
          square
          class="mt-2 school-course-slider__footer__submit-btn"
          @click="showAll"
        >
          <span class="">Xem tất cả</span>
        </app-button>
      </div>
    </div>
  </div>
</template>

<script>
import { assignIn } from "lodash";
import SchoolCourseItem from "~/components/page/school/SchoolCourseItem";
import IconChevronLeft from "~/assets/svg/icons/chevron-left.svg?inline";
import IconChevronRight from "~/assets/svg/icons/chevron-right.svg?inline";

export default {
  components: {
    IconChevronLeft,
    IconChevronRight,
    SchoolCourseItem
  },

  props: {
    cources: {
      type: Array,
      default: () => []
    },

    swiperOptions: {
      type: Object,
      default: () => {}
    },
    title: { type: String }
  },

  data() {
    const defaultSwiperOptions = {
      slidesPerView: "auto",
      spaceBetween: 5,
      // navigation: {
      //   nextEl: ".swiper-button-next",
      //   prevEl: ".swiper-button-prev"
      // },
      navigation: false,
      pagination: false,
      showName: false
    };

    return {
      defaultSwiperOptions,
      currentSwiperOptions: assignIn(defaultSwiperOptions, this.swiperOptions)
    };
  },

  methods: {
    showAll() {
      console.log("[Component] SchoolCourseSlider: click `Xem tat ca`");
      this.$emit("showAll");
    }
  },

  created() {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/school/_school-course-slider.scss";
</style>
