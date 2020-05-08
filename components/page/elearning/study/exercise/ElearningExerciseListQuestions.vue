<template>
  <ol class="e-exercise-list-questions">
    <ElearningExerciseListQuestionsItem v-bind="$props"/>
    <ElearningExerciseListQuestionsItem v-bind="$props"/>
    <ElearningExerciseListQuestionsItem v-bind="$props"/>
    <ElearningExerciseListQuestionsItem v-bind="$props"/>
    <ElearningExerciseListQuestionsItem v-bind="$props"/>
  </ol>
</template>

<script>
import { EXERCISE_TYPES } from "~/utils/constants";
import ElearningExerciseListQuestionsItem from "~/components/page/elearning/study/exercise/ElearningExerciseListQuestionsItem.vue";

export default {
  components: {
    ElearningExerciseListQuestionsItem
  },

  props: {
    type: {
      type: String,
      default: EXERCISE_TYPES.ESSAY,
      validator: value => Object.values(EXERCISE_TYPES).includes(value)
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/exercise/_elearning-exercise-list-questions.scss";
</style>