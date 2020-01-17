<template>
  <div class="app-skeleton animation">
    <div class="app-skeleton__header">
      <div class="app-skeleton__avatar"></div>
      <div>
        <div class="app-skeleton__paragraph app-skeleton__paragraph--name"></div>
        <div class="app-skeleton__paragraph app-skeleton__paragraph--sub"></div>
      </div>
    </div>

    <div class="app-skeleton__content">
      <div class="app-skeleton__paragraph"></div>
      <div class="app-skeleton__paragraph"></div>
      <div class="app-skeleton__paragraph"></div>

      <div class="app-skeleton__media mt-4"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "~/assets/scss/components/app/_app-skeleton";
</style>