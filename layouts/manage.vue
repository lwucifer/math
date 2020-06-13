<template>
  <div class="page-wrap layout-manage">
    <Header />

    <nuxt class="page-content" />

    <Footer />

    <portal-target name="modal" multiple></portal-target>
  </div>
</template>

<script>
import Header from "~/components/layout/header/Header"
import Footer from "~/components/layout/footer/Footer";

export default {
  middleware: ["teacher-role"],
  
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
.layout-manage {
  display: flex;
  flex-direction: column;

  .page-content {
    flex-grow: 1;
  }
}
</style>
