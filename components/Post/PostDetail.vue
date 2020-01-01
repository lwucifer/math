<template>
  <div class="post-detail">
    <div class="post-detail__left">
      <PostSlider :images="images" :swiperOptions="sliderOptions" />
    </div>

    <div class="post-detail__right">
      <Post />
    </div>
    
    <div class="post-detail__actions">
      <app-dropdown class="post-detail__actions-menu" align-content="left" open-on-click v-model="dropdownShow">
        <button slot="activator" type="button" class="post-detail__actions-btn">
          <IconDots />
        </button>
        
        <ul class="post-detail__actions-list">
          <li><a href="">Đặt làm ảnh đại diện</a></li>
          <li><a href="">Đặt làm ảnh bìa</a></li>
          <li><a href="">Tải ảnh xuống</a></li>
          <li><a href="">Xóa ảnh này</a></li>
        </ul>
      </app-dropdown>

      <button type="button" class="post-detail__actions-btn" @click="$emit('click-close')">
        <IconClose />
      </button>
    </div>
  </div>
</template>

<script>
import PostSlider from "~/components/Post/PostSlider";
import Post from "~/components/Post/Post";
import IconDots from "~/assets/svg/icons/dots.svg?inline";
import IconClose from "~/assets/svg/icons/close.svg?inline";

export default {
  components: {
    PostSlider,
    Post,
    IconDots,
    IconClose
  },

  props: {
    images: {
      type: Array,
      required: true,
      default: () => [],
      validator: value => value.every(item => ['type', 'src'].every(key => key in item))
    },
  },

  data() {
    return {
      dropdownShow: false,
      sliderOptions: {
        slidesPerView: 1,
        setWrapperSize: true
      }
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/post/_post-detail.scss";
</style>