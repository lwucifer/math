<template>
  <div class="mb-4">
    <!-- <label class="d-inline-block mb-3 font-weight-bold" for="question-editor"
      >Nội dung câu hỏi</label
    > -->
    <div class="d-flex justify-content-between align-items-center">
      <label class="mb-3 font-weight-bold" for="question-editor"
        >Nội dung câu hỏi</label
      >
      <a href class="d-flex text-decoration-none mr-3">
        <IconCloudDownload24px class="icon fill-opacity-1 body-1 mr-2" />Tải
        câu hỏi</a
      >
    </div>

    <app-editor class="mb-4" id="question-editor" v-model="payload.content" />

    <div class="row">
      <div class="col-md-3">
        <label class="d-inline-block mb-3 font-weight-bold" for="answer"
          >Chọn đáp án đúng</label
        >
      </div>

      <div class="col-md-8">
        <label
          class="d-inline-block mb-3"
          style="margin-left: 1.5rem"
          for="answer-editor"
          >Nội dung đáp án</label
        >
      </div>
    </div>

    <CreateAnswerOfQuestion
      v-for="(answer, index) in get(payload, 'answers', [])"
      :key="index"
      :answer="answer"
      :index="index"
      @handleSelectAnswerTrue="handleSelectAnswerTrue"
      @handleChangeContent="handleChangeContentAnswer"
      @handleAddAnswer="handleAddAnswer"
      @handleDeleteAnswer="handleDeleteAnswer"
    />

    <div class="d-flex justify-content-end mt-5">
      <app-button
        color="default"
        outline
        class="font-weight-semi-bold mr-4 text-secondary"
        size="md"
        @click="$emit('cancel')"
        >Hủy</app-button
      >
      <app-button
        color="primary"
        class="font-weight-semi-bold"
        size="md"
        @click="handleSubmitQuestion"
        >Lưu câu hỏi</app-button
      >
    </div>
    <app-modal-confirm
      centered
      v-if="showModalConfirm"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline";
import IconCloudDownload24px from "~/assets/svg/v2-icons/cloud_download_24px.svg?inline";

import CreateAnswerOfQuestion from "~/components/page/course/create/exams/CreateAnswerOfQuestion";
import { get, isEqual } from "lodash";
import * as actionTypes from "~/utils/action-types";
import { createPayloadQuestion } from "~/models/course/AddCourse";
import { mapState } from "vuex";

export default {
  components: {
    IconTrashAlt,
    CreateAnswerOfQuestion,
    IconCloudDownload24px,
  },

  props: {
    exam: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      showModalConfirm: false,
      confirmLoading: false,
      payload: {
        exercise_id: get(this, "exam.id", ""),
        type: "CHOICE",
        content: "",
        answers: [
          {
            correct: false,
            content: "",
          },
          {
            correct: false,
            content: "",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState("elearning/create", {
      general: "general",
      lesson: "lesson",
    }),
  },

  methods: {
    handleSubmitQuestion() {
      this.showModalConfirm = true;
    },

    async handleOk() {
      this.confirmLoading = true;
      this.handleCheckAnswers();
      const payload = createPayloadQuestion(this.payload);
      const res = await this.$store.dispatch(
        `elearning/creating/creating-question/${actionTypes.ELEARNING_CREATING_QUESTIONS.ADD}`,
        payload
      );

      this.handleCancel();

      if (get(res, "success", false)) {
        this.$toasted.success("success");
        this.$emit("cancel");
        this.$store.dispatch(`elearning/create/getExams`);

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

    handleAddAnswer(index) {
      const answer = {
        correct: false,
        content: "",
      };
      if (index == this.payload.answers.length && index < 6) {
        this.payload.answers.push(answer);
      }
    },

    handleDeleteAnswer(index) {
      if (this.payload.answers.length > 2) {
        this.payload.answers.splice(index, 1);
      }
    },
    handleCheckAnswers() {
      var lastanswer = this.payload.answers.slice(-1)[0];
      const answer = {
        correct: false,
        content: "",
      };
      const check = _.isEqual(lastanswer, answer);
      if (this.payload.answers.length > 2 && check) {
        this.payload.answers.pop();
      }
    },
    get,
  },
};
</script>
