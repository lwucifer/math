<template>
  <div class="ee-comments">
    <div class="ee-comment-item">
      <div class="ee-comment-item__top">
        <div class="ee-comment-item__heading">Bài tập 1</div>
        <div class="ee-comment-item__point">
          Điểm:
          <b>{{ resultRate }}</b>
        </div>
      </div>

      <div class="ee-comment-item__comment">{{ result.note }}</div>

      <div class="ee-comment-item__question-item" v-for="(s, index) in submission.length" :key="index">
        <div class="ee-comment-item__title">Câu hỏi {{ s.index }}</div>
        <app-input
          textarea
          :autosize="false"
          readonly
          :value="s.name"
        />

        <div class="ee-comment-item__title">Câu trả lời</div>
        <app-input
          textarea
          :autosize="false"
          readonly
          :value="s.student_answer"
        />
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex";
import { getExerciseResultText } from "~/plugins/filters";



export default {
  props: {
    result: {
      type: Object,
      default: () => {}
    },
    submission: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    ...mapState("elearning/study/study-exercise", ["submissions", "questions"]),

    resultRate() {
      return `${this.result.corrects}/${
        this.result.questions
      } (${getExerciseResultText(this.result.result)})`;
    }
  },


};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/exercise/_elearning-exercise-comments.scss";
</style>