<template>
  <div class="page-wrap layout-exercise">
    <TheHeaderExercise />

    <nuxt class="page-content"/>

    <portal-target name="modal" multiple></portal-target>
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
  .layout-exercise {
    padding-top: 80px;
    display: flex;
    flex-direction: column;

    .page-content {
      flex-grow: 1;
    }
  }
</style>
