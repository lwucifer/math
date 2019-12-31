<template>
  <portal to="modal">
    <div class="app-modal" tabindex="-1" role="dialog" v-bind="$attrs" :class="componentClass">
      <div class="app-modal-overlay" @click="$emit('click-overlay')"></div>
      <div
        class="app-modal-wrapper"
        role="document"
        :style="`width: ${typeof width === 'number' ? width + 'px' : width}`"
      >
        <div class="app-modal-content">
          <slot name="header" />
          <slot />
          <slot name="footer" />
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
export default {
  inheritAttrs: false,
  
  props: {
    width: {
      type: [Number, String],
      default: 520 // number in px or css value
    },
    componentClass: {
      type: [String, Object, Array],
      default: ''
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/app/_app-modal.scss";
</style>