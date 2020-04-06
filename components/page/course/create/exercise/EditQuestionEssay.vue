<template>
  <div>
    <label class="d-inline-block mb-3" for="question-editor"
      >Nội dung câu hỏi</label
    >
    <app-editor v-model="payload.content" />
    <label class="d-inline-block mb-3" for="question-editor"
      >Nội dung câu trả lời</label
    >
    <app-editor v-model="payload.answers[0].content" />
    <div v-if="get(exercise, 'category', '') === 'TEST'">
      <label class="d-inline-block mb-3" for="question-editor">Điểm</label>
      <app-input v-model="payload.score" />
    </div>
    <div class="d-flex justify-content-end mt-5">
      <app-button
        color="disabled"
        class="font-weight-semi-bold mr-4"
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
    question: {
      type: Object,
      default: null,
    },
    exercise: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      showModalConfirm: false,
      confirmLoading: false,
      payload: {
        id: get(this, "question.id", ""),
        type: "ESSAY",
        content: get(this, "question.content", ""),
        score: get(this, "question.score", ""),
        answers: [
          {
            correct: true,
            content: get(this, "question.answers[0].content", ""),
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

      if (get(this, "exercise.category", "") === "EXERCISE") {
        this.payload.score = "";
      }

      const payload = createPayloadQuestion(this.payload);
      const res = await this.$store.dispatch(
        `elearning/creating/creating-question/${actionTypes.ELEARNING_CREATING_QUESTIONS.EDIT}`,
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

    get,
  },
};
</script>
