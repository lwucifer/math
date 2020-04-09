<template>
  <div>
    <label class="d-inline-block mb-3" for="question-editor"
      >Nội dung câu hỏi</label
    >

    <app-editor class="mb-4" id="question-editor" v-model="payload.content" />

    <CreateAnswerOfQuestion
      v-for="(answer, index) in get(payload, 'answers', [])"
      :key="index"
      :answer="answer"
      :index="index"
      @handleSelectAnswerTrue="handleSelectAnswerTrue"
      @handleChangeContent="handleChangeContentAnswer"
    />

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
        @click="handleSubmitQuestion"
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
  components: {
    IconTrashAlt,
    CreateAnswerOfQuestion,
  },

  props: {
    question: {
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
        content: get(this, "question.content", ""),
        answers: get(this, "question.answers", []),
      },
    };
  },

  methods: {
    handleSubmitQuestion() {
      this.showModalConfirm = true;
    },

    async handleOk() {
      this.confirmLoading = true;

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
      this.showModalConfirm = false;
      this.confirmLoading = false;
    },

    handleSelectAnswerTrue(index) {
      this.payload.answers.map((answer, key) => {
        this.payload.answers[key].correct = key === index;
      });
    },

    handleChangeContentAnswer(index, value) {
      this.payload.answers[index].content = value;
    },

    get,
  },
};
</script>