<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-3">
      <div>
        Câu hỏi số
        <app-select v-model="questionNo" class="ml-3" :options="questionNoOpts" size="sm" />
      </div>

      <a
        href
        class="text-decoration-none ml-5"
        @click.prevent="modalListQuestions = true"
      >Danh sách câu hỏi</a>
    </div>

    <div class="e-exercise-choose bg-white pa-3 mb-4">
      <h3 class="e-exercise-choose__question heading-6 mb-15" v-html="currentExerciseQuestion.content"></h3>
      <app-radio-group
        v-model="answer"
        class="e-exercise-choose__answers d-flex flex-column align-items-start"
      >
        <app-radio
          v-for="(ans, index) in currentExerciseQuestion.answers"
          :key="index"
          :value="ans.id"
        >{{ ans.content }}</app-radio>
        <!-- <app-radio>Đáp án số 2</app-radio>
        <app-radio>Đáp án số 3</app-radio>
        <app-radio :value="3">Đáp án số 4</app-radio>-->
      </app-radio-group>
    </div>

    <div class="d-flex">
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

      <app-button size="sm" color="info" @click.prevent="handleQuestionSubmission">
      <!-- <app-button size="sm" color="info" @click="modalConfirmSubmit = true"> -->
        <IconSend class="icon body-1 mr-2" />Nộp bài
      </app-button>
    </div>

    <app-modal v-if="modalListQuestions" title="Danh sách câu hỏi" :footer="false" @close="modalListQuestions = false">
      <ElearingExerciseListQuestions slot="content" :type="EXERCISE_TYPES.CHOICE" />
    </app-modal>

    <app-modal-confirm
      v-if="modalConfirmSubmit"
      title="Xác nhận nộp bài"
      description="Bạn có chắc chắn muốn nộp bài?"
      @cancel="modalConfirmSubmit = false"
      @ok="modalConfirmSubmit = false"
      @close="modalConfirmSubmit = false"
    ></app-modal-confirm>
  </div>
</template>

<script>
import { EXERCISE_TYPES } from "~/utils/constants";
import IconArrowBack from "~/assets/svg/v2-icons/arrow_back_24px.svg?inline";
import IconArrowForward from "~/assets/svg/v2-icons/arrow_forward_24px.svg?inline";
import IconSend from "~/assets/svg/v2-icons/send_24px.svg?inline";
import ElearingExerciseListQuestions from "~/components/page/elearning/study/exercise/ElearningExerciseListQuestions";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { QUESTION_NAV } from "~/utils/constants";
import { createExerciseSubmissionReq } from "~/models/elearning/ExerciseSubmissionReq";
import { fullDateTimeSlash } from "~/utils/moment";

export default {
  components: {
    IconArrowBack,
    IconArrowForward,
    IconSend,
    ElearingExerciseListQuestions
  },

  data() {
    // const questionNoOpts = Array.from(new Array(15)).map((item, index) => ({
    //   value: index + 1,
    //   text: index + 1
    // }));

    return {
      // questionNoOpts,
      // EXERCISE_TYPES: Object.freeze(EXERCISE_TYPES),
      // questionNoOpts,
      questionNo: 1,
      answer: null,
      modalListQuestions: false,
      modalConfirmSubmit: false
    };
  },

  computed: {
    ...mapState("elearning/study/study-exercise", [
      "currentExerciseQuestion",
      "submission"
    ]),

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
      "setStudyExerciseSubmission"
    ]),
    ...mapActions("elearning/study/study-exercise", [
      "elearningSudyExerciseSubmissionAdd"
    ]),

    handleQuestionBack() {
      console.log("[handleQuestionBack]", this.currentExerciseQuestion);
      this.setStudyExerciseQuestionNav(QUESTION_NAV.BACK);
    },

    handleQuestionContinue() {
      console.log("[handleQuestionContinue]", this.currentExerciseQuestion);
      this.setStudyExerciseQuestionNav(QUESTION_NAV.NEXT);
    },

    handleQuestionSubmission() {
      console.log("[handleQuestionSubmission]", this.currentExerciseQuestion);
      const durationCost = parseInt(
        (new Date().getTime() - this.submission.start_time.getTime()) / 1000
      ); // in seconds

      const submissionReq = createExerciseSubmissionReq({
        exercise_id: this.submission.exercise_id,
        answers: this.submission.answers,
        attachments: null,
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
    }
  },

  watch: {
    answer(_newVal, _oldVal) {
      const answers = {
        question_id: this.currentExerciseQuestion.id,
        choise_answer_id: this.answer,
        answer: null, // only in case essay
        attach_answer_index: null // only in case essay
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