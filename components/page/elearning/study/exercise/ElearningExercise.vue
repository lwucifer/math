<template>
  <div class="e-exercise">
    <div class="e-exercise-components">
      <!-- <ElearningExerciseList /> -->
      <!-- <ElearningExerciseBeforeBegin /> -->
      <ElearningExerciseDoExercise />
    </div>

    <div class="e-exercise-bottom">
      <button class="e-exercise-bottom__button" type="button">
        <IconCropLandscape class="icon" />
      </button>
      <button class="e-exercise-bottom__button" type="button">
        <IconCropFree class="icon" />
      </button>
    </div>
  </div>
</template>

<script>
import IconCropLandscape from "~/assets/svg/v2-icons/crop_landscape_24px.svg?inline";
import IconCropFree from "~/assets/svg/v2-icons/crop_free_24px.svg?inline";

import ElearningExerciseList from "~/components/page/elearning/study/exercise/ElearningExerciseList";
import ElearningExerciseBeforeBegin from "~/components/page/elearning/study/exercise/ElearningExerciseBeforeBegin";
import ElearningExerciseDoExercise from "~/components/page/elearning/study/exercise/ElearningExerciseDoExercise.vue"

export default {
  components: {
    // icons
    IconCropLandscape,
    IconCropFree,
    // components
    ElearningExerciseList,
    ElearningExerciseBeforeBegin,
    ElearningExerciseDoExercise
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/exercise/_elearning-exercise.scss";
</style>