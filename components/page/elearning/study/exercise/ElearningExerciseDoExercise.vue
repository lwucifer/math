<template>
  <div class="e-exercise-do-exercise">
    <h1
      class="heading-3 text-dark-2 mt-3 mb-4 text-center"
    >1.Bài giảng đại số lớp 10 - {{ getTypeText(type) }}</h1>
    <div class="text-center font-weight-semi-bold heading-5 mb-15">
      <span>
        Số câu hỏi:
        <span class="text-secondary mr-6">5</span>
      </span>

      <!-- v-if -->
      <!-- <span>
        Thời gian làm bài:
        <span class="text-secondary">50 phút</span>
      </span> -->
      <!-- v-else -->
      <span>
        Thời gian còn lại:
        <span class="text-secondary e-exercise-do-exercise__countdown">00:30:15</span>
      </span>
    </div>

    <ElearningExerciseDoExerciseChoice v-if="type === EXERCISE_TYPES.CHOICE" />
    <ElearningExerciseDoExerciseEssay v-else />
  </div>
</template>

<script>
import { EXERCISE_TYPES } from "~/utils/constants";

import ElearningExerciseDoExerciseChoice from "~/components/page/elearning/study/exercise/ElearningExerciseDoExerciseChoice";
import ElearningExerciseDoExerciseEssay from "~/components/page/elearning/study/exercise/ElearningExerciseDoExerciseEssay";

export default {
  components: {
    ElearningExerciseDoExerciseChoice,
    ElearningExerciseDoExerciseEssay
  },

  props: {
    type: {
      type: String,
      default: EXERCISE_TYPES.ESSAY,
      validator: value => Object.values(EXERCISE_TYPES).includes(value)
    }
  },

  data() {
    return {
      EXERCISE_TYPES: Object.freeze(EXERCISE_TYPES)
    };
  },

  methods: {
    getTypeText(type) {
      if (type === EXERCISE_TYPES.CHOICE) {
        return "Bài tập trắc nghiệm";
      } else if (type === EXERCISE_TYPES.ESSAY) {
        return "Bài tập tự luận";
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/exercise/_elearning-exercise-do-exercise.scss";
</style>