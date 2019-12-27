<template functional>
  <div
    class="app-divider"
    :class="[
      data.class,
      data.staticClass,
      props.direction === 'horizontal' && 'app-divider--horizontal',
      props.direction === 'vertical' && 'app-divider--vertical',
    ]"
    v-bind="data.attrs"
    v-on="listeners"
  ></div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'horizontal', // horizontal | vertical,
      validator: value => ['horizontal', 'vertical'].includes(value)
    },
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-divider.scss";
</style>