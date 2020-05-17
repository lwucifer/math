<template>
  <div class="mb-4">
    <div v-if="showAddPoint">
      <!-- <label class="d-inline-block mb-3 font-weight-bold" for="question-editor"
        >Điểm</label
      >
      <app-input v-model="payload.points" /> -->
      <div>
        <label
          class="d-inline-block mb-3 font-weight-semi-bold"
          for="question-editor"
          >Điểm câu này</label
        >
        <div class="d-flex align-items-center justify-content-start mb-4">
          <app-input
            class="mb-0 mr-4 w-150 ce-input-with-unit"
            v-model="payload.points"
          >
            <template #unit><span class="text-dark">/10</span> </template>
          </app-input>

          <p class="text-primary">
            * Một bài tập hợp lệ phải có
            <strong>tổng điểm các câu hỏi là 10</strong>
          </p>
        </div>
      </div>
    </div>
    
    <label class="d-inline-block mb-3 font-weight-semi-bold" for="question-editor"
      >Nội dung câu hỏi</label
    >
    <app-editor v-model="payload.content" class="mb-4" />

    <!-- <label class="d-flex align-items-center mb-3 font-weight-semi-bold" for="question-editor"
      ><app-checkbox class="mr-2 fill-primary" checked/> Nội dung câu trả lời <span class="text-base ml-2 font-weight-normal">(không bắt buộc)</span></label
    >
    <app-editor v-model="payload.answers[0].content"  class="mb-4 ml-4"/> -->


    <!-- <label
      class="d-inline-block mb-3 font-weight-semi-bold mb-2"
      for="question-editor"
      >Nội dung câu hỏi</label
    >
    <app-editor class="mb-4" v-model="payload.content" />

    <label class="d-flex mb-3 font-weight-semi-bold" for="question-editor"
      ><app-checkbox class="mr-2" /> Nội dung câu trả lời</label
    >
    <app-editor class="ml-5" v-model="payload.answers[0].content" /> -->

    <div class="d-flex justify-content-end mt-5">
      <app-button
        color="default"
        outline
        class="font-weight-semi-bold mr-4 text-secondary"
        size="md"
        @click="$emit('cancel')"
        >Huỷ</app-button
      >
      <app-button
        color="primary"
        class="font-weight-semi-bold"
        size="md"
        @click="handleAddQuestion"
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
        points: "",
        
      },
    };
  },

  mounted() {
    console.log(this.exercise);
  },

  computed: {
    ...mapState("elearning/create", {
      general: "general",
    }),
    ...mapState("elearning/create", {
      lesson: "lesson",
    }),
    showAddPoint() {
      return (
        get(this, "exercise.category", "") === "TEST" ||
        get(this, "exercise.required", "") === true
      );
    },
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
        this.$emit("cancel");
        this.$store.dispatch(`elearning/create/getProgress`);

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
      (this.showModalConfirm = false), (this.confirmLoading = false);
    },

    get,
  },
};
</script>
