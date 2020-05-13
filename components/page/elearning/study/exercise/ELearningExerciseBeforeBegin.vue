<template>
  <div class="e-exercise-before-begin text-center">
    <h1 class="heading-3 text-dark-2 mt-3 mb-4">
      {{ currentExercise.name }} -
      {{ currentExercise.type | getExerciseTypeText }}
    </h1>
    <div class="text-center font-weight-semi-bold heading-5 mb-6">
      <span>
        Số câu hỏi:
        <span class="text-secondary mr-6">{{ currentExercise.questions }}</span>
      </span>
      <span>
        Thời gian làm bài:
        <span class="text-secondary">{{ currentExercise.duration }} phút</span>
      </span>
    </div>

    <app-button @click.prevent="handleStartDoExercise"
      >Bắt đầu làm bài</app-button
    >
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { STUDY_MODE } from "~/utils/constants";
import { RESPONSE_SUCCESS } from "../../../../../utils/config";

export default {
  computed: {
    ...mapState("elearning/study/study-exercise", ["currentExercise"])
  },

  methods: {
    ...mapMutations("event", ["setStudyMode"]),
    ...mapActions("elearning/study/study-exercise", [
      "elearningSudyExerciseQuestionList"
    ]),
    ...mapMutations("elearning/study/study-exercise", [
      "setStudyExerciseSubmission",
      "setStudyExerciseQuestionStart"
    ]),

    handleStartDoExercise() {
      console.log("[handleStartDoExercise]", this.currentExercise);
      // show doing exercise
      this.setStudyMode(STUDY_MODE.DO_EXERCISE_DOING);

      // get list question of exercise
      this.elearningSudyExerciseQuestionList({
        exercise_id: this.currentExercise.id
      }).then(res => {
        if (res.success == RESPONSE_SUCCESS) {
          // sert start question
          this.setStudyExerciseQuestionStart();
        }
      });

      // set start_time of submission
      this.setStudyExerciseSubmission({
        start_time: new Date(),
        exercise_id: this.currentExercise.id
      });
    }
  }
};
</script>
