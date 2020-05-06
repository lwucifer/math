<template>
  <div class="page-wrap layout-default">
  <TheHeader />
    <nuxt class="page-content"/>

    <portal-target name="modal" multiple></portal-target>
  </div>
</template>

<script>
import TheHeader from "~/components/layout/header/Header"

export default {
  middleware: ["authenticated"],
  
  components: {
    TheHeader
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/layouts/_default.scss";
</style>
