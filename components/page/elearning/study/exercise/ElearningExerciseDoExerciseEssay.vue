<template>
  <div class="e-exercise-essay">
    <div class="mb-3">
      <div class="d-flex justify-content-between mb-2">
        <div>
          Câu hỏi số
          <app-select
            v-model="questionNo"
            class="ml-3"
            :options="questionNoOpts"
            size="sm"
            @change="handleChangedQuestionNumber"
          />
        </div>
        <a
          href
          class="text-decoration-none"
          @click.prevent="handleShowListQuestion"
        >Xem danh sách câu hỏi</a>
      </div>

      <div class="e-exercise-essay__question-name bg-gray" v-html="currentExerciseQuestion.content"></div>
    </div>

    <div class="mb-15">
      <label class="d-inline-block mb-2" for="essay-answer">Câu trả lời</label>
      <app-upload
        class="mr-auto text-primary"
        style="display: inline-block; float: right;"
        @change="handleUploadAnswer"
      >
        <IconCloudUpload class="icon fill-opacity-1 body-1 mr-2" />Tải lên câu
        trả lời
      </app-upload>

      <app-input id="essay-answer" placeholder="Nhập câu trả lời" textarea v-model="answer"></app-input>
    </div>

    <div class="e-exercise-essay__bottom d-flex">
      <div class="d-flex mr-auto">
        <app-button
          size="sm"
          color="default"
          class="mr-4"
          @click.prevent="handleQuestionBack"
          :disabled="isDisableBack"
        >
          <IconArrowBack class="icon fill-opacity-1 body-1 mr-2" />Quay lại
        </app-button>
        <app-button size="sm" @click.prevent="handleQuestionContinue" :disabled="isDisableNext">
          Tiếp tục
          <IconArrowForward class="icon fill-opacity-1 body-1 ml-2" />
        </app-button>
      </div>
      <app-button size="sm" color="info" @click.prevent="modalConfirmSubmit=true">
        <!-- <app-button size="sm" color="info" @click="modalConfirmSubmit = true"> -->
        <IconSend class="icon body-1 mr-2" />Nộp bài
      </app-button>
    </div>

    <app-modal
      v-if="modalListQuestions"
      title="Danh sách câu hỏi"
      :footer="false"
      @close="modalListQuestions = false"
    >
      <ElearningExerciseListQuestions
        slot="content"
        :isAnswer="false"
        :type="EXERCISE_TYPES.CHOICE"
      />
    </app-modal>

    <app-modal-confirm
      v-if="modalConfirmSubmit"
      title="Xác nhận nộp bài"
      description="Bạn có chắc chắn muốn nộp bài?"
      @cancel="modalConfirmSubmit = false"
      @ok="handleQuestionSubmission"
      @close="modalConfirmSubmit = false"
    ></app-modal-confirm>

    <app-modal-notify
      v-if="notify.isShowNotify"
      :type="notify.type"
      :title="notify.title"
      @close="notify.isShowNotify = false"
      @ok="notify.isShowNotify = false"
    />

  </div>
</template>

<script>
import IconCloudUpload from "~/assets/svg/v2-icons/cloud_upload_24px.svg?inline";
import IconSend from "~/assets/svg/v2-icons/send_24px.svg?inline";
import IconArrowBack from "~/assets/svg/v2-icons/arrow_back_24px.svg?inline";
import IconArrowForward from "~/assets/svg/v2-icons/arrow_forward_24px.svg?inline";
import ElearningExerciseListQuestions from "~/components/page/elearning/study/exercise/ElearningExerciseListQuestions";


import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { createExerciseSubmissionReq } from "~/models/elearning/ExerciseSubmissionReq";
import { fullDateTimeSlash } from "~/utils/moment";
import { RESPONSE_SUCCESS } from "~/utils/config";
import { QUESTION_NAV, STUDY_MODE } from "~/utils/constants";
import { EXERCISE_TYPES } from "~/utils/constants";


export default {
  components: {
    IconSend,
    IconCloudUpload,
    IconArrowForward,
    IconArrowBack,
    ElearningExerciseListQuestions,
  },

  props: {
    questionId: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      EXERCISE_TYPES: Object.freeze(EXERCISE_TYPES),
      modalConfirmSubmit: false,
      answer: null,
      questionNo: this.questionId,
      modalListQuestions: false,
      notify: {
        type: "",
        description: "",
        isShowNotify: false
      }
    };
  },

  computed: {
    ...mapState("elearning/study/study-exercise", [
      "currentExerciseQuestion",
      "submission",
      "currentExerciseAnswers",
      "currentElearningId",
      "currentQuestionId",
      "autoSubmission",
      "currentExercise",
    ]),

    ...mapState("elearning/study/study-progress", ["progress"]),

    ...mapState("event", ["studyMode"]),

    ...mapGetters("elearning/study/study-exercise", [
      "questionNoOpts",
      "currentQuestionIndex",
      "numOfQuestion"
    ]),

    isDisableBack() {
      return this.currentQuestionIndex < 1;
    },

    isDisableNext() {
      return this.currentQuestionIndex >= this.numOfQuestion - 1;
    }
  },

  methods: {
    ...mapMutations("elearning/study/study-exercise", [
      "setStudyExerciseQuestionNav",
      "setStudyExerciseSubmission",
      "setStudyExerciseCurrentByNo"
    ]),
    ...mapActions("elearning/study/study-exercise", [
      "elearningSudyExerciseSubmissionAdd",
      "elearningSudyExerciseSubmissionList"
    ]),

    ...mapActions("elearning/study/study-progress", [
      "elearningSudyProgressList"
    ]),

    handleQuestionSubmission() {
      console.log("[handleQuestionSubmission]", this.currentExerciseQuestion);

      // this.modalConfirmSubmit = false;
      const durationCost = parseInt(
        (new Date().getTime() - this.submission.start_time.getTime()) / 1000
      ); // in seconds

      const attachments = this.submission.attachments.map(m => m.file);

      const submissionReq = createExerciseSubmissionReq({
        exercise_id: this.submission.exercise_id,
        answers: this.submission.answers,
        attachments: attachments,
        duration: durationCost, // in seconds
        start_time: fullDateTimeSlash(this.submission.start_time)
      });

      console.log("[handleQuestionSubmission] submissionReq", {
        exercise_id: this.submission.exercise_id,
        answers: this.submission.answers,
        attachments: attachments,
        duration: durationCost,
        start_time: fullDateTimeSlash(this.submission.start_time)
      });

      this.elearningSudyExerciseSubmissionAdd(submissionReq).then(res => {
        // renew list progress
        if (res.success == RESPONSE_SUCCESS) {
          this.modalConfirmSubmit = false;
          this.notify = {
            type: "success",
            title: "Chúc mừng bạn đã hoàn thành bài tập",
            isShowNotify: true,
          }
          this.reNewGetElearningProgress();
        }else {
          this.modalConfirmSubmit = false;
          this.notify = {
            type: "error",
            title: res.message,
            isShowNotify: true,
          }
        }
      });
    },

    handleQuestionBack() {
      this.setStudyExerciseQuestionNav(QUESTION_NAV.BACK);
      console.log(
        "[handleQuestionBack]",
        this.currentExerciseQuestion,
        this.currentExerciseAnswers
      );
      this.setAnswered();
    },

    handleQuestionContinue() {
      this.setStudyExerciseQuestionNav(QUESTION_NAV.NEXT);
      console.log(
        "[handleQuestionContinue]",
        this.currentExerciseQuestion,
        this.currentExerciseAnswers
      );
      this.setAnswered();
    },

    handleUploadAnswer(file) {
      console.log("[handleUploadAnswer]", file);
      this.setStudyExerciseSubmission({
        file: file ? file[0] : null,
        question_id: this.currentExerciseQuestion.id
      });
    },

    handleShowListQuestion() {
      console.log("[handleShowListQuestion]", this.submission);
      this.modalListQuestions = true;

      // this.elearningSudyExerciseSubmissionList({
      //   params: {
      //     exercise_id: this.submission.exercise_id
      //   }
      // }).then(res => {
      //   if (res.success == RESPONSE_SUCCESS) {
      //     this.modalListQuestions = true;
      //   }
      // });
    },

    handleChangedQuestionNumber(_questionIdByNav) {
      console.log("[handleChangedQuestionNumber]", _questionIdByNav);
      if(_questionIdByNav) {
        // nav to question from modal list question
        this.questionNo = _questionIdByNav;
      }
      this.setStudyExerciseCurrentByNo(this.questionNo);
      this.setAnswered();
    },

    setAnswered() {
      // set current answered you checked
      console.log("[setAnswered]", this.currentExerciseAnswers, this.currentExerciseQuestion)
      const answered = this.currentExerciseAnswers.find(
        an => an.question_id == this.currentExerciseQuestion.id
      );
      if (answered && answered.answer) {
        this.answer = answered.answer;
      } else {
        this.answer = null;
      }
    },

    reNewGetElearningProgress() {
      console.log("[reNewGetElearningProgress]", this.progress);
      const elearning_id = this.progress.id;
      this.elearningSudyProgressList({
        params: {
          elearning_id
        }
      });
    }
  },

  watch: {
    answer(_newVal, _oldVal) {
      const answers = {
        question_id: this.currentExerciseQuestion.id,
        choise_answer_id: null, // only incase choice
        answer: this.answer,
        // attach_answer_index: null,
      };
      console.log("[answer] watch", _newVal, _oldVal, answers);
      if (_newVal != _oldVal) {
        this.setStudyExerciseSubmission({ answers });
      }
    },

    currentExerciseQuestion(_newVal) {
      console.log("[currentExerciseQuestion]", _newVal);
      // set current question Option
      this.questionNo = _newVal.id;
    },

    currentQuestionId(_newVal) {
      console.log("[currentQuestionId] watch", _newVal);
      if(_newVal) {
        this.handleChangedQuestionNumber(_newVal);
        this.modalListQuestions = false;
      }
    },

    autoSubmission(_newVal) {
      console.log("[autoSubmission]", _newVal);
      // if(this.currentExercise.id == _newVal.id) {
      //   this.handleQuestionSubmission();
      // }
    }
  }
};
</script>

<style></style>
