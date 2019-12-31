<template>
  <div v-swiper:mySwiper="swiperOptions" class="timeline-box-slider" v-on="$listeners">
    <div class="swiper-wrapper">
      <div class="swiper-slide timeline-box-slider-container" v-for="(item, index) in images" :key="index">
        <div v-if="item.type ==='video'" class="slider-video-item">
          <img :src="item.src" alt="">
          <button type="button" class="slider-video-item__btn">
            <IconPlayCircle />
          </button>
        </div>
        
        <img v-else :src="item.src" />
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
      validator: value => value.every(item => ['type', 'src'].every(key => key in item))
    },

    swiperOptions: {
      type: Object,
      default: () => ({
        slidesPerView: 'auto',
        spaceBetween: 5,
        slidesOffsetAfter: 40,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      })
    }
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/timeline-box/_timeline-box-slider.scss";
</style>