<template>
  <div class="e-exercise-list-item text-center bg-white" :class="classes">
    <h3 class="e-exercise-list-item__name heading-5 mb-3">{{ name }}</h3>
    <div class="e-exercise-list-item__desc mb-3">
      <span class="text-primary">{{ type | getExerciseTypeText }}</span>
      <app-divider class="e-exercise-list-item__divider" direction="vertical" />
      <span class="text-gray">Thời gian làm bài:</span>
      <b class="text-dark">{{ getDurationText(duration) }}</b>
    </div>

    <app-button
      v-if="status === EXERCISE_STATUS.NONE"
      color="yellow"
      size="sm"
      @click.prevent="handleDoExercise"
      >Làm bài tập</app-button
    >

    <app-button
      v-else-if="status === EXERCISE_STATUS.FAILED"
      color="secondary"
      size="sm"
      @click.prevent="handleDoExercise"
      >Làm lại bài tập ({{ works }}/{{ reworks }})</app-button
    >

    <app-button
      v-else-if="status === EXERCISE_STATUS.PENDING"
      color="yellow"
      size="sm"
      >Chờ chấm điểm</app-button
    >

    <app-button
      v-else-if="status === EXERCISE_STATUS.PASSED"
      color="primary"
      size="sm"
      @click.prevent="handleReviewResult"
      >Xem kết quả</app-button
    >

    <span v-if="required" class="e-exercise-list-item__star">
      <IconStar class="icon" />
    </span>
  </div>
</template>

<script>
import { EXERCISE_STATUS, EXERCISE_TYPES, STUDY_MODE } from "~/utils/constants";

const IconStar = () => import("~/assets/svg/v2-icons/star_24px.svg?inline");

import { mapMutations, mapActions } from "vuex";

export default {
  components: {
    IconStar
  },

  props: {
    id: String,
    stared: Boolean,
    name: String,
    result: String,
    open_time: String,
    questions: Number,
    duration: Number,
    reworks: Number,
    works: Number,
    required: Boolean,
    status: {
      type: String,
      default: EXERCISE_STATUS.NONE,
      validator: value => Object.values(EXERCISE_STATUS).includes(value)
    },
    type: {
      type: String,
      default: EXERCISE_TYPES.CHOICE,
      validator: value => Object.values(EXERCISE_TYPES).includes(value)
    }
  },

  data() {
    return {
      EXERCISE_STATUS: Object.freeze(EXERCISE_STATUS),
      EXERCISE_TYPES: Object.freeze(EXERCISE_TYPES)
    };
  },

  computed: {
    classes() {
      return {
        "e-exercise-list-item--none": this.status === EXERCISE_STATUS.NONE,
        "e-exercise-list-item--pending":
          this.status === EXERCISE_STATUS.PENDING,
        "e-exercise-list-item--failed": this.status === EXERCISE_STATUS.FAILED,
        "e-exercise-list-item--passed": this.status === EXERCISE_STATUS.PASSED
      };
    }
  },

  methods: {
    ...mapMutations("elearning/study/study-exercise", [
      "setStudyExerciseCurrent"
    ]),
    ...mapActions("elearning/study/study-exercise", [
      "elearningSudyExerciseResultList"
    ]),

    ...mapMutations("event", ["setStudyMode"]),

    handleDoExercise() {
      console.log("[handleDoExercise]");

      // set current exercise
      this.setStudyExerciseCurrent({
        id: this.id,
        name: this.name,
        type: this.type,
        duration: this.duration,
        questions: this.questions,
        result: this.result,
        reworks: this.reworks,
        works: this.works,
        open_time: this.open_time,
      });

      // show befor begin exercise
      this.setStudyMode(STUDY_MODE.DO_EXERCISE_BEFORE_BEGIN);
    },

    handleReviewResult() {
      console.log("[handleReviewResult]");
      // get review result
      this.elearningSudyExerciseResultList({ exercise_id: this.id});
      // show review result
      this.setStudyMode(STUDY_MODE.REVIEW_EXERCISE_RESULT);
    },

    getDurationText(time) {
      if(!time) return "";

      const hour = Math.floor(time / 60);
      const minute = time % 60;
      return `${hour} giờ ${minute} phút`;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/exercise/_elearning-exercise-list-item.scss";
</style>
