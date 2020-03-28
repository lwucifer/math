<template>
  <div class="page-wrap layout-default">
  <HeaderBackHome/>
    <nuxt class="page-content"/>

    <portal-target name="modal" multiple></portal-target>
  </div>
</template>

<script>
import HeaderBackHome from "~/components/layout/header/HeaderBackHome"
export default {
  components: {
    HeaderBackHome
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/layouts/_default.scss";
</style>
