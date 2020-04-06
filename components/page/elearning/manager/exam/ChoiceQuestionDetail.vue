<template>
  <div class="question-detail">
    <!--<div class="question" v-html="get(row, 'question_name', '')"></div>-->
    <div class="question--content mb-3" v-html="content"></div>
    <div class="question--options">
      <p style="line-height: 2.4rem;">Đáp án:</p>
      <div class="options__detail row">
        <div class="option__item col-md-6">
          <span class="option__key">A: </span> <p class="answer-wrapper" v-html="' Đáp án 01Đáp án 01Đáp án 01Đáp án 01 Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01Đáp án 01'"></p>
        </div>
        <div class="option__item col-md-6">
          <span class="option__key">B: </span><p class="answer-wrapper" v-html="'Đáp án 02'"></p>
        </div>
        <div class="option__item col-md-6">
          <span class="option__key">C: </span><p class="answer-wrapper" v-html="'Đáp án 03'"></p>
        </div>
        <div class="option__item col-md-6">
          <span class="option__key">D: </span><p class="answer-wrapper" v-html="'Đáp án 04'"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      options: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/scss/components/elearning/_elearning-choice-question.scss";
</style>