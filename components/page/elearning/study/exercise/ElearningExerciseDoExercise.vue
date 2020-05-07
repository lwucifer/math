<template>
  <div class="e-exercise-do-exercise">
    <h1 class="heading-3 text-dark-2 mt-3 mb-4 text-center">1.Bài giảng đại số lớp 10 - Bài tập trắc nghiệm</h1>
    <div class="text-center font-weight-semi-bold heading-5 mb-15">
      <span>
        Số câu hỏi:
        <span class="text-secondary mr-6">5</span>
      </span>
      <span>
        Thời gian làm bài:
        <span class="text-secondary">50 phút</span>
      </span>
    </div>

    <div class="d-flex align-items-center">
      <div>
        Câu hỏi số
        <app-select v-model="questionNo" :options="questionNoOpts" size="sm" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const questionNoOpts = Array.from(new Array(15)).map((item, index) => ({
      value: index + 1,
      text: index + 1
    }));

    return {
      questionNoOpts,
      questionNo: 1
    };
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/exercise/_elearning-exercise-do-exercise.scss";
</style>