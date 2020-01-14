<template>
  <div class="post-image" :class="classes">
    <div v-if="images.length > 1" class="post-image-grid">
      <div class="post-image-item" v-for="item in images" :key="item.id" @click="$emit('click-item', item)">
        <div class="post-image-item__container">
          <app-video v-if="item.type === 'video'" :posterSrc="item.src"></app-video>
          <img v-else :src="item.src" alt />
        </div>
      </div>
    </div>

    <div v-else class="post-image-item">
      <app-video v-if="images[0].type === 'video'" :posterSrc="images[0].src"></app-video>
      <img v-else :src="images[0].src" alt />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => []
    },
    mainImagePosition: {
      type: String,
      default: "" //  '' | 'top' | 'left' - available when images.legth == 3 | 4
    }
  },

  computed: {
    classes() {
      return {
        "post-image-has-grid": this.images.length >= 2,
        "post-image-grid-5-items": this.images.length >= 5,
        "post-image-grid-4-items": this.images.length === 4,
        "post-image-grid-3-items": this.images.length === 3,
        "post-image-grid-2-items": this.images.length === 2
      };
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/post/_post-image.scss";
</style>