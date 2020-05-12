<template>
  <div>
    <label class="d-inline-block mb-3 font-weight-bold" for="question-editor"
      >Nội dung câu hỏi</label
    >
    <app-editor v-model="payload.content" />
    <label class="d-inline-block mb-3 font-weight-bold" for="question-editor"
      >Nội dung câu trả lời</label
    >
    <app-editor v-model="payload.answers[0].content" />
    <div>
      <label class="d-inline-block mb-3 font-weight-bold" for="question-editor">Điểm</label>
      <app-input v-model="payload.points" />
    </div>
    <div class="d-flex justify-content-end mt-5">
      <app-button
        color="default"
        outline
        class="font-weight-semi-bold mr-4 text-secondary"
        size="sm"
        square
        @click="$emit('handleCancelAddQuestion')"
        >Huỷ bỏ</app-button
      >
      <app-button
        color="primary"
        class="font-weight-semi-bold"
        size="sm"
        square
        @click="handleAddQuestion"
        >Lưu câu hỏi</app-button
      >
    </div>
    <app-modal-confirm
      v-if="showModalConfirm"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline";
import CreateAnswerOfQuestion from "~/components/page/course/create/exercise/CreateAnswerOfQuestion";
import { get } from "lodash";
import * as actionTypes from "~/utils/action-types";
import { createPayloadQuestion } from "~/models/course/AddCourse";

export default {
  props: {
    exercise: {
      type: Object,
      default: null,
    },
  },

  data() {
    console.log(this.exercise);
    return {
      showModalConfirm: false,
      confirmLoading: false,
      payload: {
        exercise_id: get(this, "exercise.id", ""),
        type: "ESSAY",
        content: "",
        points: '',
        answers: [
          {
            correct: true,
            content: "",
          },
        ],
      },
    };
  },

  methods: {
    handleAddQuestion() {
      this.showModalConfirm = true;
    },

    async handleOk() {
      this.confirmLoading = true;

      const payload = createPayloadQuestion(this.payload);
      const res = await this.$store.dispatch(
        `elearning/creating/creating-question/${actionTypes.ELEARNING_CREATING_QUESTIONS.ADD}`,
        payload
      );

      this.handleCancel();

      if (get(res, "success", false)) {
        this.$toasted.success("success");
        this.$emit("handleRefreshQuestion");
        return;
      }
      this.$toasted.error(get(res, "message", "Có lỗi xảy ra"));
    },

    handleCancel() {
      (this.showModalConfirm = false), (this.confirmLoading = false);
    },

    get
  },
};
</script>
