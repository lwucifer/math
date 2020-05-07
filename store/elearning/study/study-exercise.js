import Exercise from "~/services/elearning/study/Exercise";
import * as actionTypes from "~/utils/action-types";
import { RESPONSE_SUCCESS } from "~/utils/config";
import * as mutationTypes from "~/utils/mutation-types";

/**
 * initial state
 */
const state = () => ({
  questions: [],
  results: [],
  submissions: [],
  submissionAdd: {},
  elearningExercises: [],
  currentExercise: {},
});

/**
 * initial getters
 */
const getters = {};

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
          result
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
          result
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
          result
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
          result
        );
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
  },

  [mutationTypes.ELEARNING_STUDY_EXERCISE.SET_STUDY_EXERCISE_RESULT_LIST](
    state,
    _list
  ) {
    state.results = _list;
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
    console.log("[SET_STUDY_EXERCISE_CURRENT]", _curr)
    state.currentExercise = _curr;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
