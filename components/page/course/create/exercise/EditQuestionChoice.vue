<template>
  <div class="cc-box__bg-disable">
    <!-- <label class="d-inline-block mb-3 font-weight-bold" for="question-editor"
      >Nội dung câu hỏi</label
    > -->
    <div class="d-flex justify-content-between align-items-center">
      <label class="mb-3 font-weight-semi-bold" for="question-editor"
        >Nội dung câu hỏi</label
      >
      <!-- UI Upload File
      <div v-if="isUpload" class="d-flex align-items-center">
        <div>{{fileRaw.name}}</div>
        <div class="text-sub ml-2" style="font-size: 11px;">{{ fileRaw.size | fileSizeFilter}}</div>
        <button class="ml-2" @click="handleCloseUpload">
          <IconCloseSquare/>
        </button>
      </div>
      <app-upload
        @change="handleUpload"
        class="text-primary"
        style="display: inline-block;"
        :multiple="false"
        v-else
      >
        <div class="d-flex align-items-center">
          <IconCloudDownload24px class="icon fill-opacity-1 body-1 mr-2" />
          Tải lên câu hỏi
        </div>
      </app-upload>
      -->
    </div>

    <app-editor class="mb-4" id="question-editor" v-model="payload.content" />

    <CreateAnswerOfQuestion
      v-for="(answer, index) in get(payload, 'answers', [])"
      :key="answer.id"
      :answer="answer"
      :index="index"
      :id="get(payload, 'id', '')"
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
      description="Bạn có chắc chắn là muốn lưu thay đổi này?"
    />
  </div>
</template>

<script>
import IconTrashAlt from "~/assets/svg/design-icons/trash-alt.svg?inline";
import IconCloudDownload24px from "~/assets/svg/v2-icons/cloud_download_24px.svg?inline";
import IconCloseSquare from "~/assets/svg/icons/close-square.svg?inline";

import CreateAnswerOfQuestion from "~/components/page/course/create/exercise/CreateAnswerOfQuestion";
import { get, cloneDeep } from "lodash";
import * as actionTypes from "~/utils/action-types";
import { createPayloadQuestion } from "~/models/course/AddCourse";
import { mapState } from "vuex";

export default {
  components: {
    IconTrashAlt,
    CreateAnswerOfQuestion,
    IconCloudDownload24px,
    IconCloseSquare,
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
        answers: cloneDeep(get(this, "question.answers", [])),
      },
      fileRaw: {
        name: "",
        size: "",
        file: "",
      },
      isUpload: false,
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
        const lesson_id = get(this, "lesson.id", "");
        this.$store.dispatch("elearning/create/getLesson", lesson_id);

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
    handleUpload(data) {
      this.isUpload = true;
      this.fileRaw.name = data[0].name;
      this.fileRaw.size = data[0].size;
    },
    handleCloseUpload() {
      this.isUpload = false;
      this.fileRaw = {};
    },
    get,
  },
};
</script>
