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

    <div
      class="text-center font-weight-semi-bold heading-5 mb-6"
      v-if="currentExercise.open_time"
    >
      <span>
        Thời gian mở đề:
        <span class="text-secondary">{{
          currentExercise.open_time | fullDateTimeSlash
        }}</span>
      </span>
    </div>

    <app-button @click.prevent="handleStartDoExercise" v-if="isShowBtnStart"
      >Bắt đầu làm bài</app-button
    >
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { STUDY_MODE } from "~/utils/constants";
import { RESPONSE_SUCCESS } from "../../../../../utils/config";
import { fullDateTimeSlash } from "~/utils/moment";

export default {
  computed: {
    ...mapState("elearning/study/study-exercise", ["currentExercise"]),

    isShowBtnStart() {
      if (!this.currentExercise.open_time) return true;
      const openTime = fullDateTimeSlash(this.currentExercise.open_time);

      console.log("[isShowBtnStart]", this.currentExercise, openTime, new Date());
      return new Date().getTime() >= new Date(openTime).getTime();
    }
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
