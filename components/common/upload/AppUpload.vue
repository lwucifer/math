<template>
  <div class="app-upload">
    <div class="app-upload__list">
      <div class="app-upload__list-item">
        <img src="https://picsum.photos/100/100" alt="">
        <span class="app-upload__list-item__close">
          <IconClose class="icon" />
        </span>
      </div>
    </div>
    <div class="app-upload__control" @click="handleClickControl">
      <span role="button" tabindex="0" class="app-upload__button">
        <input type="file" ref="inputFile" class="app-upload__input" v-bind="$attrs" @input="handleInput">
      </span>
    </div>
  </div>
</template>

<script>
const IconClose = () => import('~/assets/svg/icons/close.svg?inline');

export default {
  components: {
    IconClose
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
@import "~/assets/scss/components/app/_app-upload.scss";
</style>