<template>
  <div class="page-wrap layout-manage">
    <TheHeaderManager />

    <nuxt class="page-content" />

    <Footer />

    <portal-target name="modal" multiple></portal-target>
  </div>
</template>

<script>
import TheHeaderManager from "~/components/layout/header/HeaderManager";
import Footer from "~/components/layout/footer/Footer";

export default {
  middleware: ["authenticated", "teacher-role"],
  
  components: {
    TheHeaderManager,
    Footer
  }
};
</script>

<style lang="scss">
.layout-manage {
  padding-top: 80px;
  display: flex;
  flex-direction: column;

  .page-content {
    flex-grow: 1;
  }
}
</style>
