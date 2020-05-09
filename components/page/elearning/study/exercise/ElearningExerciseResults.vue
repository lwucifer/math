<template>
  <div class="e-exercise-results">
    <h1
      class="heading-3 text-dark-2 mt-3 mb-4 text-center"
    >{{ result.name }} - {{ result.type | getExerciseTypeText }}</h1>

    <div class="text-center font-weight-semi-bold heading-5 mb-15">
      <template v-if="status === EXERCISE_STATUS.PASSED">
        Kết quả làm bài:
        <span class="text-primary">{{ resultRate }}</span>
      </template>

      <template v-else>
        <span>
          Kết quả làm bài:
          <span class="text-secondary mr-6">{{ resultRate }}</span>
        </span>
        <span>
          Số lần làm còn lại:
          <span class="text-secondary">{{ result.reworks - result.works}}</span>
        </span>
      </template>

      <!-- <span class="d-inline-flex align-items-center text-primary">
        <IconCheckCircleOutline class="icon heading-3 fill-opacity-1 mr-3" />
        <b>Nộp bài thành công</b>
      </span> -->
    </div>

    <div class="e-exercise-results__pane mb-4">
      <div class="row">
        <div class="col-5">Thời gian bắt đầu làm bài</div>
        <div class="col-7">{{ result.start_time | getDateTimeFullText }}</div>
      </div>
      <div class="row">
        <div class="col-5">Tổng thời gian làm bài</div>
        <div class="col-7">{{ result.working_time }} giây</div>
      </div>
      <div class="row">
        <div class="col-5">Số câu hỏi</div>
        <div class="col-7">{{ result.questions }}</div>
      </div>
      <div class="row">
        <div class="col-5">Số đáp án đúng</div>
        <div class="col-7">{{ result.corrects }}</div>
      </div>
      <div class="row">
        <div class="col-5">Bỏ qua</div>
        <div class="col-7">{{ result.ignores }}</div>
      </div>
    </div>

    <div class="text-center">
      <app-button v-if="status === EXERCISE_STATUS.PASSED">Xem đáp án</app-button>
      <app-button v-else-if="status === EXERCISE_STATUS.FAILED && reworks">Làm lại bài tập</app-button>
    </div>
  </div>
</template>

<script>
import { EXERCISE_TYPES, EXERCISE_STATUS } from "~/utils/constants";
import { getExerciseResultText } from '~/plugins/filters';

import { mapState } from 'vuex';
const IconCheckCircleOutline = () =>
  import("~/assets/svg/v2-icons/check_circle_outline_24px.svg?inline");

export default {
  components: {
    IconCheckCircleOutline
  },

  props: {
    // reworks: Number,
    // type: {
    //   type: String,
    //   default: EXERCISE_TYPES.ESSAY,
    //   validator: value => Object.values(EXERCISE_TYPES).includes(value)
    // },
    status: {
      type: String,
      default: EXERCISE_STATUS.NONE,
      validator: value => Object.values(EXERCISE_STATUS).includes(value)
    }
  },

  data() {
    return {
      EXERCISE_STATUS: Object.freeze(EXERCISE_STATUS),
      EXERCISE_TYPES: Object.freeze(EXERCISE_TYPES)
    };
  },

  computed: {
    ...mapState("elearning/study/study-exercise", [
      "result",
    ]),

    resultRate() {
      return `${this.result.corrects}/${this.result.questions} (${getExerciseResultText(this.result.result)})`
    }

  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/exercise/_elearning-exercise-results.scss";
</style>