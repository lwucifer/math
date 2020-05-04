<template>
  <div class="app-spin" :class="classes">
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
    },
    color: {
      type: String,
      default: '',
      validator: value => ['', 'white'].includes(value)
    },
    size: {
      type: String,
      default: '',
      validator: value => ['', 'small'].includes(value)
    }
  },

  computed: {
    classes() {
      return {
        'app-spin--white': this.color === 'white',
        'app-spin--small': this.size === 'small'
      }
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-spin.scss";
</style>