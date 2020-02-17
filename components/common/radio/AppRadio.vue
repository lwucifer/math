<template>
  <label class="app-radio">
    <input type="radio" class="app-radio__input" v-bind="$attrs" v-on="$listeners" />
    <span class="app-radio__decor">
      <span class="app-radio__decor__inner"></span>
    </span>

    <span class="app-radio__text">
      <slot />
    </span>
  </label>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-radio.scss";
</style>