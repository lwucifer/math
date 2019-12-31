<template>
  <div class="page-wrap layout-default">
    <TheHeader />

    <nuxt class="page-content"/>

    <portal-target name="modal" slim></portal-target>
  </div>
</template>

<script>
import TheHeader from "~/components/TheHeader/TheHeader"

export default {
  components: {
    TheHeader,
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/layouts/_default.scss";
</style>
