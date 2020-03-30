<template>
  <div class="page-wrap layout-default">
  <TheHeaderClient/>
    <nuxt class="page-content"/>

    <portal-target name="modal" multiple></portal-target>
  </div>
</template>

<script>
import TheHeaderClient from "~/components/layout/header/HeaderClient"
export default {
  components: {
    TheHeaderClient
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/layouts/_default.scss";
</style>
