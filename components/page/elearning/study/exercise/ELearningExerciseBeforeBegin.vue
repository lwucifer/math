<template>
  <div class="e-exercise-before-begin text-center">
    <h1 class="heading-3 text-dark-2 mt-3 mb-4">
      {{ currentExercise.name }} - {{ currentExercise.type }}
    </h1>
    <div class="text-center font-weight-semi-bold heading-5 mb-6">
      <span>Số câu hỏi: <span class="text-secondary mr-6">5</span></span>
      <span
        >Thời gian làm bài:
        <span class="text-secondary"
          >{{ currentExercise.duration }} phút</span
        ></span
      >
    </div>

    <app-button @click.prevent="handleStartDoExercise"
      >Bắt đầu làm bài</app-button
    >
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { STUDY_MODE } from "~/utils/constants";

export default {
  computed: {
    ...mapState("elearning/study/study-exercise", ["currentExercise"])
  },

  methods: {
    ...mapMutations("event", ["setStudyMode"]),

    handleStartDoExercise() {
      console.log("[handleStartDoExercise]", this.currentExercise);
      // show doing exercise
      this.setStudyMode(STUDY_MODE.DO_EXERCISE_DOING);
    }
  }
};
</script>
