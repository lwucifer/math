<template>
  <div class="app-spin">
    <div class="app-spin__dots">
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </div>
    <div class="app-spin__text" v-if="text && text.length">{{ text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-spin.scss";
</style>