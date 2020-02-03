<template>
  <div class="app-tag">
    <slot />
    <i class="app-tag__close" @click="handleClose">
      <IconClose class="icon" />
    </i>
  </div>
</template>

<script>
import IconClose from "~/assets/svg/icons/close.svg?inline";

export default {
  components: {
    IconClose
  },

  methods: {
    handleClose() {
      console.log('close')
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-tag.scss";
</style>
