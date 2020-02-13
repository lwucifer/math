<template>
  <div class="page-wrap layout-create">
    <HeaderCreate />

    <nuxt class="page-content"/>

    <Footer />

    <portal-target name="modal" slim></portal-target>
  </div>
</template>

<script>
import HeaderCreate from "~/components/layout/header/HeaderCreate"
import Footer from "~/components/layout/footer/Footer"

export default {
  components: {
    HeaderCreate,
    Footer
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/layouts/_create.scss";
</style>
