<template>
  <div class="e-exercise-essay">
    <div class="mb-3">
      <div class="d-flex justify-content-between mb-2">
        <span>Câu hỏi</span>
        <a href class="text-decoration-none">In câu hỏi</a>
      </div>

      <div class="e-exercise-essay__question-name" v-html="currentExerciseQuestion.content"></div>
    </div>

    <div class="mb-15">
      <label class="d-inline-block mb-2" for="essay-answer">Câu trả lời</label>
      <app-input id="essay-answer" placeholder="Nhập câu trả lời" textarea v-model="answer"></app-input>
    </div>

    <div class="e-exercise-essay__bottom d-flex">
      <!-- <app-button class="mr-auto" color="default" size="sm" @click.prevent="handleUploadAnswer">
        <IconCloudUpload class="icon fill-opacity-1 body-1 mr-2" />Tải lên câu trả lời
      </app-button> -->
      <app-upload class="mr-auto" color="default" @change="handleUploadAnswer">
          <IconCloudUpload class="icon fill-opacity-1 body-1 mr-2" />Tải lên câu trả lời
      </app-upload>

      <app-button size="sm" color="info" @click.prevent="handleQuestionSubmission">
      <!-- <app-button size="sm" color="info" @click="modalConfirmSubmit = true"> -->
        <IconSend class="icon body-1 mr-2" />Nộp bài
      </app-button>
    </div>

    <app-modal-confirm
      v-if="modalConfirmSubmit"
      title="Xác nhận nộp bài"
      description="Bạn có chắc chắn muốn nộp bài?"
      @cancel="modalConfirmSubmit = false"
      @ok="handleQuestionSubmission"
      @close="modalConfirmSubmit = false"
    ></app-modal-confirm>
  </div>
</template>

<script>
import IconCloudUpload from "~/assets/svg/v2-icons/cloud_upload_24px.svg?inline";
import IconSend from "~/assets/svg/v2-icons/send_24px.svg?inline";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { createExerciseSubmissionReq } from "~/models/elearning/ExerciseSubmissionReq";
import { fullDateTimeSlash } from "~/utils/moment";

export default {
  components: {
    IconSend,
    IconCloudUpload
  },

  data() {
    return {
      modalConfirmSubmit: false,
      answer: '',
    };
  },

  computed: {
    ...mapState("elearning/study/study-exercise", [
      "currentExerciseQuestion",
      "submission"
    ]),

  },

  methods: {
    ...mapMutations("elearning/study/study-exercise", [
      "setStudyExerciseSubmission"
    ]),
    ...mapActions("elearning/study/study-exercise", [
      "elearningSudyExerciseSubmissionAdd"
    ]),

    handleQuestionSubmission() {
      console.log("[handleQuestionSubmission]", this.currentExerciseQuestion);

      // this.modalConfirmSubmit = false;
      const durationCost = parseInt(
        (new Date().getTime() - this.submission.start_time.getTime()) / 1000
      ); // in seconds

      const submissionReq = createExerciseSubmissionReq({
        exercise_id: this.submission.exercise_id,
        answers: this.submission.answers,
        attachments: this.submission.attachments,
        duration: durationCost, // in seconds
        start_time: fullDateTimeSlash(this.submission.start_time)
      });

      console.log("[handleQuestionSubmission] submissionReq", {
        exercise_id: this.submission.exercise_id,
        answers: this.submission.answers,
        duration: durationCost,
        start_time: fullDateTimeSlash(this.submission.start_time)
      });
      
      this.elearningSudyExerciseSubmissionAdd(submissionReq);
    },

    handleUploadAnswer(file) {
      console.log("[handleUploadAnswer]", file);
      this.setStudyExerciseSubmission({ attachments: file });
    }
  },

  watch: {
    answer(_newVal, _oldVal) {
      const answers = {
        question_id: this.currentExerciseQuestion.id,
        choise_answer_id: null, // only incase choice
        answer: this.answer, 
        attach_answer_index: 1 
      };
      console.log("[answer] watch", _newVal, _oldVal, answers);
      if (_newVal != _oldVal) {
        this.setStudyExerciseSubmission({ answers });
      }
    }
  }

};
</script>

<style>
</style>