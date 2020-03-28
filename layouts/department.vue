<template>
  <div class="page-wrap layout-default">
  <!--<TheHeader />-->
  <TheHeaderepartment/>
    <nuxt class="page-content"/>

    <portal-target name="modal" multiple></portal-target>
  </div>
</template>

<script>
import TheHeader from "~/components/layout/header/Header"
import TheHeaderepartment from "~/components/layout/header/HeaderDepartment"
export default {
  components: {
    TheHeader,TheHeaderepartment
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/layouts/_default.scss";
</style>
