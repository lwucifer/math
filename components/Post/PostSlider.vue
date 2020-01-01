<template>
  <div v-swiper:mySwiper="currentSwiperOptions" class="post-slider" v-on="$listeners">
    <div class="swiper-wrapper">
      <div class="swiper-slide post-slider-container" v-for="(item, index) in images" :key="index">
        <div
          v-if="item.type ==='video'"
          class="slider-item slider-video-item"
          @click="$emit('click-item', item, index)"
        >
          <img :src="item.src" alt />
          <button type="button" class="slider-video-item__btn">
            <IconPlayCircle />
          </button>
        </div>

        <div v-else class="slider-item" @click="$emit('click-item', item, index)">
          <img :src="item.src" alt />
        </div>
      </div>
    </div>

    <div class="swiper-button-prev">
      <IconChevronLeft />
    </div>
    <div class="swiper-button-next">
      <IconChevronRight />
    </div>
  </div>
</template>

<script>
import { assignIn } from "lodash";
import IconChevronLeft from "~/assets/svg/icons/chevron-left.svg?inline";
import IconChevronRight from "~/assets/svg/icons/chevron-right.svg?inline";
import IconPlayCircle from "~/assets/svg/icons/play-circle.svg?inline";

export default {
  components: {
    IconChevronLeft,
    IconChevronRight,
    IconPlayCircle
  },

  props: {
    images: {
      type: Array,
      required: true,
      default: () => [],
      validator: value =>
        value.every(item => ["type", "src"].every(key => key in item))
    },

    swiperOptions: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    const defaultSwiperOptions = {
      slidesPerView: "auto",
      spaceBetween: 5,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    };

    return {
      defaultSwiperOptions,
      currentSwiperOptions: assignIn(defaultSwiperOptions, this.swiperOptions)
    };
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/post/_post-slider.scss";
</style>