<template>
  <div class="page-wrap layout-create">
    <nuxt class="page-content"/>

    <Footer />

    <portal-target name="modal" multiple></portal-target>
  </div>
</template>

<script>
  import Footer from "~/components/layout/footer/Footer"

  export default {

    middleware: ["authenticated", "teacher-role"],
    
    components: {
      Footer
    }
  }
</script>

<style lang="scss">
  @import "~/assets/scss/layouts/_create.scss";
</style>
