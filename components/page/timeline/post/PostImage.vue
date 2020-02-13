<template>
  <div class="post-image" :class="classes">
    <div v-if="images.length > 1" class="post-image-grid">
      <a
        v-for="item in images"
        :key="item.id"
        :href="`${location}/post?photo_id=${item.id}`"
        class="post-image-item"
        @click.prevent="handleClickImage(item)"
      >
        <div class="post-image-item__container">
          <app-video v-if="item.type === 'video'" :posterSrc="item.thumb"></app-video>
          <img v-else :src="item.thumb" alt />
        </div>
      </a>
    </div>

    <a v-else class="post-image-item" :href="`${location}/post?photo_id=${images[0].id}`" @click.prevent="handleClickImage(images[0])">
      <app-video v-if="images[0].object === 'video'" :posterSrc="images[0].thumb"></app-video>
      <img v-else :src="images[0].thumb" alt />
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      location: process.browser ? window.location.origin : ''
    }
  },

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
  },

  methods: {
    handleClickImage(image) {
      this.$emit('click-item', image)
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/post/_post-image.scss";
</style>