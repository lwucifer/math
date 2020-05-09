import Exercise from "~/services/elearning/study/Exercise";
import * as actionTypes from "~/utils/action-types";
import { RESPONSE_SUCCESS } from "~/utils/config";
import * as mutationTypes from "~/utils/mutation-types";
import { QUESTION_NAV } from "~/utils/constants";

/**
 * initial state
 */
const state = () => ({
  questions: [],
  result: {},
  submissions: [],
  submissionAdd: {},
  elearningExercises: [],
  currentExercise: {},
  currentExerciseQuestion: null,
  currentExerciseAnswers: [],
  submission: {
    exercise_id: '',
    start_time: '',
    duration: 0,
    answers: [],
    attachments: [],
  }
});

/**
 * initial getters
 */
const getters = {
  numOfQuestion: (state) => {
    return state.questions ? state.questions.length : 0;
  },
  currentQuestionIndex: (state) => {
    return state.questions.findIndex(item => item.id == state.currentExerciseQuestion.id);
  },
  questionNoOpts: state => {
    const questionNoOpts = !state.questions ? [] : state.questions.map(item => {
      return {
        value: item.id,
        text: item.index
      }
    });
    console.log("[questionNoOpts]", questionNoOpts, state.questions)
    return questionNoOpts;
  },
};

const actions = {
  /**
   * Get questions and answers for exercise
   * https://api.schoolly.famtechvn.com/swagger-ui.html?urls.primaryName=core-service#/study-controller/getQuestionsUsingGET
   */
  async [actionTypes.ELEARNING_STUDY_EXERCISE.LIST_QUESTION](
    { commit },
    payload
  ) {
    try {
      const result = await new Exercise(this.$axios)[
        actionTypes.ELEARNING_STUDY_EXERCISE.LIST_QUESTION
      ](payload);
      console.log("[LIST_QUESTION]", result);
      if (result.success == RESPONSE_SUCCESS) {
        commit(
          mutationTypes.ELEARNING_STUDY_EXERCISE
            .SET_STUDY_EXERCISE_QUESTION_LIST,
          result.data
        );
      }

      return result;
    } catch (error) {
      console.log(
        "[Elearning ELEARNING_STUDY_EXERCISE] LIST_QUESTION.error",
        error
      );
    }
  },

  /**
   * Get result of exercise
   * https://api.schoolly.famtechvn.com/swagger-ui.html?urls.primaryName=core-service#/study-controller/getResultExerciseUsingGET
   */
  async [actionTypes.ELEARNING_STUDY_EXERCISE.LIST_RESULT](
    { commit },
    payload
  ) {
    try {
      const result = await new Exercise(this.$axios)[
        actionTypes.ELEARNING_STUDY_EXERCISE.LIST_RESULT
      ](payload);
      console.log("[LIST_RESULT]", result);
      if (result.success == RESPONSE_SUCCESS) {
        commit(
          mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_RESULT_LIST,
          result.data
        );
      }

      return result;
    } catch (error) {
      console.log(
        "[Elearning ELEARNING_STUDY_EXERCISE] LIST_RESULT.error",
        error
      );
    }
  },

  /**
   * Get student answers for exercise
   * https://api.schoolly.famtechvn.com/swagger-ui.html?urls.primaryName=core-service#/study-controller/getAnswersUsingGET
   */
  async [actionTypes.ELEARNING_STUDY_EXERCISE.LIST_SUBMISTION](
    { commit },
    payload
  ) {
    try {
      const result = await new Exercise(this.$axios)[actionTypes.BASE.LIST](
        payload
      );
      console.log("[LIST_SUBMISTION]", result);
      if (result.success == RESPONSE_SUCCESS) {
        commit(
          mutationTypes.ELEARNING_STUDY_EXERCISE
            .SET_STUDY_EXERCISE_SUBMISSION_LIST,
          result.data
        );
      }

      return result;
    } catch (error) {
      console.log(
        "[Elearning ELEARNING_STUDY_EXERCISE] LIST_SUBMISTION.error",
        error
      );
    }
  },

  /**
   * Submit answers for exercise
   * https://api.schoolly.famtechvn.com/swagger-ui.html?urls.primaryName=core-service#/study-controller/submitAnswersUsingPOST
   */
  async [actionTypes.ELEARNING_STUDY_EXERCISE.ADD_SUBMISTION](
    { commit },
    payload
  ) {
    try {
      const result = await new Exercise(this.$axios)[actionTypes.BASE.ADD](
        payload
      );
      console.log("[ADD_SUBMISTION]", result);
      if (result.success == RESPONSE_SUCCESS) {
        commit(
          mutationTypes.ELEARNING_STUDY_EXERCISE
            .SET_STUDY_EXERCISE_SUBMISSION_ADD,
          result.data
        );
        return result;
      }

      return result;
    } catch (error) {
      console.log(
        "[Elearning ELEARNING_STUDY_EXERCISE] ADD_SUBMISTION.error",
        error
      );
    }
  },

  /**
   * Get exercise list of e-learning
   * https://api.schoolly.famtechvn.com/swagger-ui.html?urls.primaryName=core-service#/study-controller/getElearningExerciseUsingGET
   */
  async [actionTypes.ELEARNING_STUDY_EXERCISE.LIST_ELEARNING_EXERCISE](
    { commit },
    payload
  ) {
    try {
      const result = await new Exercise(this.$axios)[
        actionTypes.ELEARNING_STUDY_EXERCISE.LIST_ELEARNING_EXERCISE
      ](payload);
      console.log("[LIST_ELEARNING_EXERCISE]", result);
      if (result.success == RESPONSE_SUCCESS) {
        commit(
          mutationTypes.ELEARNING_STUDY_EXERCISE
            .SET_STUDY_ELEARNING_EXERCISE_LIST,
          result.data
        );
      }

      return result;
    } catch (error) {
      console.log(
        "[LIST_ELEARNING_EXERCISE] error",
        error
      );
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_QUESTION_LIST](
    state,
    _list
  ) {
    state.questions = _list;
    state.currentExerciseQuestion = (_list && _list.length > 0) ? _list[0] : null; // set current question is the first

    // reset submission state
    state.submission = {
      ...state.submission,
      // exercise_id: '',
      // start_time: new Date(),
      duration: 0,
      answers: [],
      attachments: [],
    }

    // reset answer
    state.currentExerciseAnswers = [];

  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_RESULT_LIST](
    state,
    _list
  ) {
    state.result = _list;
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_SUBMISSION_LIST](
    state,
    _list
  ) {
    state.submissions = _list;
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_SUBMISSION_ADD](
    state,
    _submissionAdd
  ) {
    state.submissionAdd = _submissionAdd;
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_ELEARNING_EXERCISE_LIST](
    state,
    _list
  ) {
    state.elearningExercises = _list;
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_CURRENT](
    state,
    _curr
  ) {
    console.log("[SET_STUDY_EXERCISE_CURRENT", _curr);
    state.currentExercise = _curr;
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_CURRENT_BY_NO](
    state,
    _questionId
  ) {
    const currQuestion = state.questions.find(item => item.id == _questionId);
    if(currQuestion){
      state.currentExerciseQuestion = currQuestion;
    }
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_QUESTION_NAV](
    state,
    _nav
  ) {
    console.log("[SET_STUDY_EXERCISE_QUESTION_NAV]", _nav);
    const currQuestionIndex = state.questions.findIndex(item => item.index == state.currentExerciseQuestion.index);
    if(currQuestionIndex != -1) {
      if(_nav == QUESTION_NAV.NEXT){
        state.currentExerciseQuestion = state.questions[currQuestionIndex + 1];
      } else if(_nav == QUESTION_NAV.BACK) {
        state.currentExerciseQuestion = state.questions[currQuestionIndex - 1];
      }
    }
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_SUBMISSION](
    state,
    _submission
  ) {
    console.log("[SET_STUDY_EXERCISE_SUBMISSION]", _submission);
    const updatedAnswer = _submission.answers;
    const updatedStartTime = _submission.start_time;
    const updatedExerciseId = _submission.exercise_id;
    const updatedAttachments = _submission.attachments;
    const updatedQuestionId = _submission.question_id;
    
    if(!!updatedStartTime){
      state.submission = {...state.submission, start_time: updatedStartTime}
    }
    if(!!updatedExerciseId){
      state.submission = {...state.submission, exercise_id: updatedExerciseId}
    }
    if(!!updatedAnswer){
      let currAnsers = [...state.submission.answers];
      const currAnswerIndex =  currAnsers.findIndex(item => item.question_id == updatedAnswer.question_id);
      if(currAnswerIndex == -1){
        currAnsers = [...currAnsers, updatedAnswer];
      }else {
        currAnsers[currAnswerIndex] = updatedAnswer;
      }
      state.submission = { ...state.submission, answers: currAnsers };
      state.currentExerciseAnswers = [...state.submission.answers];
    }

    // update attachment files
    const preAttachments = [...state.submission.attachments];
    if(!!updatedQuestionId){
      const uploadAttachBeforeIndex = preAttachments.findIndex(at => at.question_id == updatedQuestionId);
      if(uploadAttachBeforeIndex != -1) {
        preAttachments[uploadAttachBeforeIndex] = _submission;
      }else {
        preAttachments.push(_submission);
      }

      state.submission = {...state.submission, attachments: preAttachments}

      // update attach_answer_index in state.submission.answers
      const prevAnswers = state.submission.answers;
      const attachQuestionIndex = prevAnswers.findIndex(at => at.question_id == updatedQuestionId);
      if(attachQuestionIndex != -1){
        const attachFileIndex = state.submission.attachments.findIndex(a => a.question_id == updatedQuestionId);
        prevAnswers[attachQuestionIndex].attach_answer_index = attachFileIndex + 1; // base 1
        state.submission.answers = prevAnswers;
      }
    }else {
      preAttachments.push(null);
    }

    console.log("[SET_STUDY_EXERCISE_SUBMISSION] state.submission", state.submission);
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
