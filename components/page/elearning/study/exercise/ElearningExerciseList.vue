<template>
  <ol class="row e-exercise-list">
    <div v-for="item in exercises" :key="item.id" class="col-md-6">
      <ElearningExerciseListItem v-bind="{ ...item, started: item.required, status: item.result }" />
    </div>
  </ol>
</template>

<script>
import { EXERCISE_STATUS, EXERCISE_TYPES } from "~/utils/constants";
import ElearningExerciseListItem from "~/components/page/elearning/study/exercise/ElearningExerciseListItem";

const fakeExercises = [
  {
    id: 1,
    name: "Bài tập số 1",
    type: "CHOICE",
    duration: 90,
    reworks: 3,
    works: 1,
    open_time: 0,
    result: "FAILED",
    required: true
  },
  {
    id: 2,
    name: "Bài tập số 2",
    type: "CHOICE",
    duration: 90,
    reworks: 5,
    works: 1,
    open_time: 0,
    result: "PASSED",
    required: false
  },
  {
    id: 3,
    name: "Bài tập số 3",
    type: "CHOICE",
    duration: 90,
    reworks: 5,
    works: 1,
    open_time: 0,
    result: "NONE",
    required: false
  },
  {
    id: 4,
    name: "Bài tập số 4",
    type: "ESSAY",
    duration: 90,
    reworks: 5,
    works: 1,
    open_time: 0,
    result: "PENDING",
    required: false
  }
];

export default {
  components: {
    ElearningExerciseListItem
  },

  props: {
    exercises: {
      type: Array,
      default: () => fakeExercises
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/exercise/_elearning-exercise-list.scss";
</style>