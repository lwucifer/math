<template>
  <div class="post-editor-upload">
    <div class="post-editor-upload__list">
      <div class="post-editor-upload__list-item">
        <img src="https://picsum.photos/100/100" alt="">
        <span class="post-editor-upload__list-item__close">
          <IconClose class="icon" />
        </span>
      </div>
    </div>
    <div class="post-editor-upload__control" @click="handleClickControl">
      <span role="button" tabindex="0" class="post-editor-upload__button">
        <input type="file" ref="inputFile" class="post-editor-upload__input" v-bind="$attrs" @input="handleInput">
      </span>
      <IconPlus class="icon" />
    </div>
  </div>
</template>

<script>
import IconPlus from "~/assets/svg/design-icons/plus.svg?inline";
const IconClose = () => import('~/assets/svg/icons/close.svg?inline');

export default {
  components: {
    IconClose,
    IconPlus
  },

  methods: {
    handleInput(e) {
      console.log('handleInput', e)
    },

    handleClickControl() {
      this.$refs.inputFile.click()
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/post-editor/_post-editor-upload.scss";
</style>