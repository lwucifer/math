<template>
  <div>
    <label class="d-inline-block mb-3" for="question-editor"
      >Nội dung câu hỏi</label
    >

    <app-editor class="mb-4" id="question-editor" v-model="payload.content" />

    <CreateAnswerOfQuestion
      v-for="(answer, index) in get(payload, 'questions', [])"
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
        >Huỷ bỏ</app-button
      >
      <app-button color="primary" class="font-weight-semi-bold" size="sm" square
        >Lưu câu hỏi</app-button
      >
    </div>
  </div>
</template>

<script>
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline";
import CreateAnswerOfQuestion from "~/components/page/course/create/exercise/CreateAnswerOfQuestion";
import { get } from "lodash";

export default {
  components: {
    IconTrashAlt,
    CreateAnswerOfQuestion
  },

  props: {
    exercise: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      payload: {
        exercise_id: get(this, "exercise.id", ""),
        type: "CHOICE",
        content: "",
        questions: [
          {
            correct: false,
            content: "",
            index: "A"
          },
          {
            correct: false,
            content: "",
            index: "B"
          },
          {
            correct: false,
            content: "",
            index: "C"
          },
          {
            correct: false,
            content: "",
            index: "D"
          }
        ]
      }
    };
  },

  methods: {
    handleSelectAnswerTrue(index) {
      this.payload.questions.map((answer, key) => {
        this.payload.questions[key].correct = key === index;
      });
    },

    handleChangeContentAnswer(index, value) {
      this.payload.questions[index].content = value;
    },

    get
  }
};
</script>
