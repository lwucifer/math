<template>
  <div class="e-exercise">
    <div class="e-exercise-components">
      <ElearningExerciseList v-if="studyMode == studyModeDoExercise"/>
      <ElearningExerciseBeforeBegin v-else-if="studyMode == beforeBeginMode"/>
      <ElearningExerciseDoExercise v-else-if="studyMode == doingMode"/>
      <ElearningExerciseResults v-else-if="studyMode == reviewMode"/>
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
import ElearningExerciseDoExercise from "~/components/page/elearning/study/exercise/ElearningExerciseDoExercise.vue";
import ElearningExerciseResults from "~/components/page/elearning/study/exercise/ElearningExerciseResults";

import { mapState } from "vuex";
import {STUDY_MODE} from '~/utils/constants';

export default {
  data() {
    return {
      studyModeDoExercise: STUDY_MODE.DO_EXERCISE,
      beforeBeginMode: STUDY_MODE.DO_EXERCISE_BEFORE_BEGIN,
      doingMode: STUDY_MODE.DO_EXERCISE_DOING,
      reviewMode: STUDY_MODE.REVIEW_EXERCISE_RESULT,
    }
  },

  components: {
    // icons
    IconCropLandscape,
    IconCropFree,
    // components
    ElearningExerciseList,
    ElearningExerciseBeforeBegin,
    ElearningExerciseDoExercise,
    ElearningExerciseResults
  },

  computed: {
    ...mapState("event", ['studyMode'])
  },

  watch: {
    studyMode(_newVal){
      console.log("[studyMode] watch", _newVal)
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/exercise/_elearning-exercise.scss";
</style>
