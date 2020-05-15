<template>
  <div class="e-exercise-do-exercise">
    <h1
      class="heading-3 text-dark-2 mt-3 mb-4 text-center"
    >{{ currentExercise.name }} - {{ type | getExerciseTypeText }}</h1>
    <div class="text-center font-weight-semi-bold heading-5 mb-15">
      <span>
        Số câu hỏi:
        <span class="text-secondary mr-6">{{ currentExercise.questions}}</span>
      </span>

      <!-- v-if -->
      <!-- <span>
        Thời gian làm bài:
        <span class="text-secondary">50 phút</span>
      </span>-->
      <!-- v-else -->
      <span>
        Thời gian còn lại:
        <!-- countdown clock here -->
        <span class="text-secondary e-exercise-do-exercise__countdown">{{ countdown }}</span>
      </span>
    </div>
    <div v-if="!!currentExerciseQuestion">
      <ElearningExerciseDoExerciseChoice v-if="currentExerciseQuestion.type === EXERCISE_TYPES.CHOICE" :questionId="currentExerciseQuestion.id"/>
      <ElearningExerciseDoExerciseEssay v-else-if="currentExerciseQuestion.type === EXERCISE_TYPES.ESSAY" :questionId="currentExerciseQuestion.id"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import { EXERCISE_TYPES } from "~/utils/constants";
import { getCountdown_HH_MM_SS } from "~/utils/common";

import ElearningExerciseDoExerciseChoice from "~/components/page/elearning/study/exercise/ElearningExerciseDoExerciseChoice";
import ElearningExerciseDoExerciseEssay from "~/components/page/elearning/study/exercise/ElearningExerciseDoExerciseEssay";

let interval = null;

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
      EXERCISE_TYPES: Object.freeze(EXERCISE_TYPES),
      countdown: "--:--:--",
      // interval: 0,
    };
  },

  created() {
    this.setCountdown();
  },

  methods: {
    ...mapMutations("elearning/study/study-exercise", ["setStudyExerciseAutoSubmission"]),

    setCountdown() {
      let seconds = (this.currentExercise.duration || 0) * 60; // in seconds
      interval = setInterval(() => {
        console.log("[setCountdown]", seconds)
        if(seconds > 0) {
          this.countdown = getCountdown_HH_MM_SS(seconds);
          seconds -= 1;
        } else {
          // clear interval
          clearInterval(interval);

          // auto submission
          this.setStudyExerciseAutoSubmission(this.currentExercise);
        }
      }, 1000);
    }
  },

  computed: {
    ...mapState("elearning/study/study-exercise", ["currentExercise", "currentExerciseQuestion"]),

  },

  mounted() {
    // this.setCountdown();
  },

  beforeDestroy() {
    console.log("[beforeDestroy]", interval)
    clearInterval(interval);
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/exercise/_elearning-exercise-do-exercise.scss";
</style>