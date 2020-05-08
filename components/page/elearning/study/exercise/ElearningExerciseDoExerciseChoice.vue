<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-3">
      <div>
        Câu hỏi số
        <app-select v-model="questionNo" class="ml-3" :options="questionNoOpts" size="sm" />
      </div>

      <a
        href
        class="text-decoration-none ml-5"
        @click.prevent="modalListQuestions = true"
      >Danh sách câu hỏi</a>
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

      <app-button size="sm" color="info" @click="modalConfirmSubmit = true">
        <IconSend class="icon body-1 mr-2" />Nộp bài
      </app-button>
    </div>

    <app-modal v-if="modalListQuestions" title="Danh sách câu hỏi" :footer="false" @close="modalListQuestions = false">
      <ElearingExerciseListQuestions slot="content" :type="EXERCISE_TYPES.CHOICE" />
    </app-modal>

    <app-modal-confirm
      v-if="modalConfirmSubmit"
      title="Xác nhận nộp bài"
      description="Bạn có chắc chắn muốn nộp bài?"
      @cancel="modalConfirmSubmit = false"
      @ok="modalConfirmSubmit = false"
      @close="modalConfirmSubmit = false"
    ></app-modal-confirm>
  </div>
</template>

<script>
import { EXERCISE_TYPES } from "~/utils/constants";
import IconArrowBack from "~/assets/svg/v2-icons/arrow_back_24px.svg?inline";
import IconArrowForward from "~/assets/svg/v2-icons/arrow_forward_24px.svg?inline";
import IconSend from "~/assets/svg/v2-icons/send_24px.svg?inline";
import ElearingExerciseListQuestions from "~/components/page/elearning/study/exercise/ElearningExerciseListQuestions";

export default {
  components: {
    IconArrowBack,
    IconArrowForward,
    IconSend,
    ElearingExerciseListQuestions
  },

  data() {
    const questionNoOpts = Array.from(new Array(15)).map((item, index) => ({
      value: index + 1,
      text: index + 1
    }));

    return {
      EXERCISE_TYPES: Object.freeze(EXERCISE_TYPES),
      questionNoOpts,
      questionNo: 1,
      answer: null,
      modalListQuestions: false,
      modalConfirmSubmit: false
    };
  }
};
</script>

<style>
</style>