<template>
  <div class="page-wrap layout-exercise">
    <TheHeaderExercise />

    <nuxt class="page-content"/>

    <Footer />

    <portal-target name="modal" multiple></portal-target>
  </div>
</template>

<script>
import TheHeaderExercise from "~/components/layout/header/HeaderExercise"
import Footer from "~/components/layout/footer/Footer"

export default {
  middleware: ["authenticated", "teacher-role"],
  
  components: {
    TheHeaderExercise,
    Footer
  }
}
</script>

<style lang="scss">
  .layout-exercise {
    padding-top: 80px;
    display: flex;
    flex-direction: column;

    .page-content {
      flex-grow: 1;
    }
  }
</style>
