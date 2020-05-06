import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Exercise from "~/services/elearning/study/Exercise";

/**
 * initial state
 */
const state = () => ({
  elearningStudy: []
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
  async [actionTypes.ELEARNING_STUDY_EXERCISE.LIST_QUESTION]({ commit }, payload) {
    try {
      const result = await new Exercise(this.$axios)[actionTypes.ELEARNING_STUDY_EXERCISE.LIST_QUESTION](payload);
      console.log("[LIST_QUESTION]", result);
      // commit(mutationTypes.ELEARNING_STUDY.SET_ELEARNING_STUDY, result);

      return result;
    } catch (error) {
      console.log("[Elearning ELEARNING_STUDY_EXERCISE] LIST_QUESTION.error", error);
    }
  },

  /**
   * Get result of exercise
   * https://api.schoolly.famtechvn.com/swagger-ui.html?urls.primaryName=core-service#/study-controller/getResultExerciseUsingGET
   */
  async [actionTypes.ELEARNING_STUDY_EXERCISE.LIST_RESULT]({ commit }, payload) {
    try {
      const result = await new Exercise(this.$axios)[actionTypes.ELEARNING_STUDY_EXERCISE.LIST_RESULT](payload);
      console.log("[LIST_RESULT]", result);
      // commit(mutationTypes.ELEARNING_STUDY.SET_ELEARNING_STUDY, result);

      return result;
    } catch (error) {
      console.log("[Elearning ELEARNING_STUDY_EXERCISE] LIST_RESULT.error", error);
    }
  },

  /**
   * Get student answers for exercise
   * https://api.schoolly.famtechvn.com/swagger-ui.html?urls.primaryName=core-service#/study-controller/getAnswersUsingGET
   */
  async [actionTypes.ELEARNING_STUDY_EXERCISE.LIST_SUBMISTION]({ commit }, payload) {
    try {
      const result = await new Exercise(this.$axios)[actionTypes.BASE.LIST](payload);
      console.log("[LIST_SUBMISTION]", result);
      // commit(mutationTypes.ELEARNING_STUDY.SET_ELEARNING_STUDY, result);

      return result;
    } catch (error) {
      console.log("[Elearning ELEARNING_STUDY_EXERCISE] LIST_SUBMISTION.error", error);
    }
  },

  /**
   * Submit answers for exercise
   * https://api.schoolly.famtechvn.com/swagger-ui.html?urls.primaryName=core-service#/study-controller/submitAnswersUsingPOST
   */
  async [actionTypes.ELEARNING_STUDY_EXERCISE.ADD_SUBMISTION]({ commit }, payload) {
    try {
      const result = await new Exercise(this.$axios)[actionTypes.BASE.ADD](payload);
      console.log("[ADD_SUBMISTION]", result);
      // commit(mutationTypes.ELEARNING_STUDY.SET_ELEARNING_STUDY, result);

      return result;
    } catch (error) {
      console.log("[Elearning ELEARNING_STUDY_EXERCISE] ADD_SUBMISTION.error", error);
    }
  },

};

/**
 * initial mutations
 */
const mutations = {
  // [mutationTypes.ELEARNING_STUDY.SET_ELEARNING_STUDY](
  //   state,
  //   elearningStudy
  // ) {
  //   state.elearningStudy = elearningStudy;
  // }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
