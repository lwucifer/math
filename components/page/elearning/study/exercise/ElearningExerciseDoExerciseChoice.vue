<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-3">
      <div>
        Câu hỏi số
        <app-select v-model="questionNo" class="ml-3" :options="questionNoOpts" size="sm" />
      </div>

      <a href class="text-decoration-none ml-5">Danh sách câu hỏi</a>
    </div>

    <div class="e-exercise-choose bg-white pa-3 mb-4">
      <h3 class="e-exercise-choose__question heading-6 mb-15">Để bảo vệ mật khẩu ta phải làm gì?</h3>
      <app-radio-group
        v-model="answer"
        class="e-exercise-choose__answers d-flex flex-column align-items-start"
      >
        <app-radio>Đáp án số 1</app-radio>
        <app-radio>Đáp án số 2</app-radio>
        <app-radio>Đáp án số 3</app-radio>
        <app-radio :value="3">Đáp án số 4</app-radio>
      </app-radio-group>
    </div>

    <div class="d-flex">
      <div class="d-flex mr-auto">
        <app-button size="sm" color="default" class="mr-4">
          <IconArrowBack class="icon fill-opacity-1 body-1 mr-2" />Quay lại
        </app-button>
        <app-button size="sm">
          Tiếp tục
          <IconArrowForward class="icon fill-opacity-1 body-1 ml-2" />
        </app-button>
      </div>

      <app-button size="sm" color="info">
        <IconSend class="icon body-1 mr-2" />Nộp bài
      </app-button>
    </div>
  </div>
</template>

<script>
import IconArrowBack from "~/assets/svg/v2-icons/arrow_back_24px.svg?inline";
import IconArrowForward from "~/assets/svg/v2-icons/arrow_forward_24px.svg?inline";
import IconSend from "~/assets/svg/v2-icons/send_24px.svg?inline";

export default {
  components: {
    IconArrowBack,
    IconArrowForward,
    IconSend
  },

  data() {
    const questionNoOpts = Array.from(new Array(15)).map((item, index) => ({
      value: index + 1,
      text: index + 1
    }));

    return {
      questionNoOpts,
      questionNo: 1,
      answer: null
    };
  }
};
</script>

<style>
</style>