<template>
  <div class="page-wrap layout-default">
    <TheHeader />

    <nuxt class="page-content"/>

    <Footer />

    <portal-target name="modal" multiple></portal-target>
  </div>
</template>

<script>
import TheHeader from "~/components/layout/header/Header"
import Footer from "~/components/layout/footer/Footer"

export default {
  components: {
    TheHeader,
    Footer
  }
}

</script>

<style lang="scss">
@import "~/assets/scss/layouts/_default.scss";
</style>
