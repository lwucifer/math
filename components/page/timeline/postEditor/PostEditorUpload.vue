<template>
  <div class="post-editor-upload">
    <div class="post-editor-upload__list">
      <div v-for="(image, index) in previewList" :key="index" class="post-editor-upload__list-item">
        <img :src="image" alt />
        <span class="post-editor-upload__list-item__close" @click="handleClickClose(index)">
          <IconClose class="icon" />
        </span>
      </div>
    </div>
    <div class="post-editor-upload__control" @click="handleClickControl">
      <span role="button" tabindex="0" class="post-editor-upload__button">
        <input
          v-if="input"
          ref="inputFile"
          type="file"
          accept="video/*,  video/x-m4v, video/webm, video/x-ms-wmv, video/x-msvideo, video/3gpp, video/flv, video/x-flv, video/mp4, video/quicktime, video/mpeg, video/ogv, .ts, .mkv, image/*, image/heic, image/heif"
          class="post-editor-upload__input"
          v-bind="$attrs"
          @change="handleChange"
        />
      </span>
      <IconPlus class="icon" />
    </div>
  </div>
</template>

<script>
import IconPlus from "~/assets/svg/design-icons/plus.svg?inline";
const IconClose = () => import("~/assets/svg/icons/close.svg?inline");

export default {
  inheritAttrs: false,

  components: {
    IconClose,
    IconPlus
  },

  props: {
    fileList: {
      type: Array,
      default: () => []
    },
    previewList: {
      type: Array,
      default: () => []
    },
  },

  data() {
    return {
      input: true
    }
  },

  watch: {
    previewList(newValue, oldValue) {
      if (newValue.length >= oldValue.length) {
        this.$nextTick(() => {
          this.scrollToEnd()
        })
      }
    }
  },

  methods: {
    scrollToEnd() {
      this.$el.scrollLeft = this.$el.scrollWidth;
    },

    handleChange(e) {
      this.$emit("change", e);
      this.input = false;
      const timeout = setTimeout(() => {
        this.input = true;
        clearTimeout(timeout)
      });
    },

    handleClickControl() {
      this.$refs.inputFile.click();
    },

    handleClickClose(index) {
      this.$emit("remove-item", index);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/post-editor/_post-editor-upload.scss";
</style>