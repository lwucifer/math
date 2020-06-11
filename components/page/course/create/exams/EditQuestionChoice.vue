<template>
  <div class="cc-box__bg-disable">
    <label class="d-inline-block mb-3 font-weight-bold" for="question-editor"
      >Nội dung câu hỏi</label
    >

    <app-editor class="mb-4" id="question-editor" v-model="payload.content" />

    <CreateAnswerOfQuestion
      v-for="(answer, index) in get(payload, 'answers', [])"
      :key="answer.id"
      :answer="answer"
      :index="index"
      :id="get(payload,'id','')"
      @handleSelectAnswerTrue="handleSelectAnswerTrue"
      @handleChangeContent="handleChangeContentAnswer"
      @handleAddAnswer="handleAddAnswer"
      @handleDeleteAnswer="handleDeleteAnswer"
    />

    <div class="d-flex justify-content-end mt-5 mb-4">
      <app-button
        color="default"
        class="font-weight-semi-bold mr-4 text-secondary"
        outline
        size="md"
        @click="$emit('cancel')"
        >Huỷ</app-button
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
import CreateAnswerOfQuestion from "~/components/page/course/create/exercise/CreateAnswerOfQuestion";
import { get } from "lodash";
import * as actionTypes from "~/utils/action-types";
import { createPayloadQuestion } from "~/models/course/AddCourse";
import { mapState } from "vuex";

export default {
  components: {
    IconTrashAlt,
    CreateAnswerOfQuestion,
  },
  computed: {
    ...mapState("elearning/create", {
      general: "general",
      lesson: "lesson",
    }),
  },

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
      this.handleCheckAnswers();
      const payload = createPayloadQuestion(this.payload);
      const res = await this.$store.dispatch(
        `elearning/creating/creating-question/${actionTypes.ELEARNING_CREATING_QUESTIONS.EDIT}`,
        payload
      );

      this.handleCancel();

      if (get(res, "success", false)) {
        this.$toasted.success("success");
        this.$emit("cancel");
        // this.$store.dispatch(`elearning/create/getProgress`);

        if (get(this, "exercise.category", "") === "TEST") {
          this.$store.dispatch("elearning/create/getExams");
        } else {
          const lesson_id = get(this, "lesson.id", "");
          this.$store.dispatch("elearning/create/getLesson", lesson_id);
        }

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
      if (index == get(this, "payload.answers.length", 0) && index < 6) {
        let answers = this.payload.answers.concat([answer]);
        this.payload.answers = answers;
      }
    },
    handleDeleteAnswer(index) {
      if (this.payload.answers.length > 2) {
        this.payload.answers.splice(index, 1);
      } else {
        this.$toasted.error("Tối thiểu là 2 đáp án");
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
