<template>
  <div class="page-wrap layout-default">
    <TheHeaderManager />

    <nuxt class="page-content"/>

    <portal-target name="modal" slim></portal-target>
  </div>
</template>

<script>
import TheHeaderManager from "~/components/layout/header/HeaderManager"

export default {
  components: {
    TheHeaderManager,
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/layouts/_default.scss";
</style>
