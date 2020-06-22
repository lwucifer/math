<template>
  <div>
    <ol class="row e-exercise-list">
      <div v-for="item in elearningExercises" :key="item.id" class="col-md-6">
        <ElearningExerciseListItem
          v-bind="{ ...item, started: item.required, status: item.result }"
        />
      </div>
    </ol>
    <p class="row e-exercise-note">* Dấu sao là bài tập bắt buộc</p>
  </div>
</template>

<script>
import { EXERCISE_STATUS, EXERCISE_TYPES } from "~/utils/constants";
import ElearningExerciseListItem from "~/components/page/elearning/study/exercise/ElearningExerciseListItem";

import { mapState } from "vuex";

export default {
  components: {
    ElearningExerciseListItem
  },

  computed: {
    ...mapState("elearning/study/study-exercise", ["elearningExercises"])
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/exercise/_elearning-exercise-list.scss";
</style>
