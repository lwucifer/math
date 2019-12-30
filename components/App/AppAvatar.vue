<template functional>
  <span
    :class="[
      data.class,
      data.staticClass,
      'app-avatar',
      props.shape === 'circle' && 'app-avatar-circle',
      props.shape === 'square' && 'app-avatar-square',
      props.size === 'sm' && 'app-avatar--size-sm',
      props.size === 'lg' && 'app-avatar--size-lg',
    ]"
    :style="[
      ['px', 'rem', '%', 'em'].every(char => props.size.toString().indexOf(char) > -1) && `width: ${props.size}px; height: ${props.size}px;`,
    ]"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <img :src="props.src" :srcset="props.srcSet" :alt="props.alt" @error="props.loadError()" />
  </span>
</template>

<script>
export default {
  props: {
    shape: {
      type: String,
      default: "circle" // circle | square,
    },
    size: {
      type: [String, Number],
      default: "default" // default | xs | sm | lg | css value
    },
    src: {
      type: String
    },
    srcSet: {
      type: String
    },
    alt: {
      type: String
    },
    loadError: {
      type: Function
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-avatar.scss";
</style>