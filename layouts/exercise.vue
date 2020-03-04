<template>
  <div class="page-wrap layout-default">
    <TheHeaderExercise />

    <nuxt class="page-content"/>

    <portal-target name="modal" slim></portal-target>
  </div>
</template>

<script>
import TheHeaderExercise from "~/components/layout/header/HeaderExercise"

export default {
  components: {
    TheHeaderExercise,
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/layouts/_default.scss";
</style>
