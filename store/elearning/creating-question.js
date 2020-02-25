import * as actionTypes from "../../utils/action-types";
import * as mutationTypes from "../../utils/mutation-types";
import Question from "~/services/elearning/creating/Question";

/**
 * initial state
 */
const state = () => ({
  questions: []
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_CREATING_QUESTIONS.LIST]({ commit }, payload) {
    try {
      const result = await new Question(this.$axios)[actionTypes.BASE.LIST](
        payload
      );
      // set to mutation
      commit(mutationTypes.ELEARNING_CREATING_QUESTIONS.SET_ELEARNING_CREATING_QUESTIONS_LIST, result);
    } catch (error) {
      console.log("[Creating Question] list.error", error);
    }
  },

  async [actionTypes.ELEARNING_CREATING_QUESTIONS.ADD]({ commit }, payload) {
    try {
      const result = await new Question(this.$axios)[actionTypes.BASE.ADD](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_ADD, result);
    } catch (error) {
      console.log("[Creating Question] add.error", error);
    }
  },

  async [actionTypes.ELEARNING_CREATING_QUESTIONS.EDIT]({ commit }, payload) {
    try {
      const result = await new Question(this.$axios)[actionTypes.BASE.EDIT](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_EDIT, result);
    } catch (error) {
      console.log("[Creating Question] edit.error", error);
    }
  },
  
  async [actionTypes.ELEARNING_CREATING_QUESTIONS.DELETE]({ commit }, payload) {
    try {
      const result = await new Question(this.$axios)[actionTypes.BASE.DELETE](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_DELETE, result);
    } catch (error) {
      console.log("[Creating Question] delete.error", error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_CREATING_QUESTIONS.SET_ELEARNING_CREATING_QUESTIONS_LIST](state, questions) {
    console.log("SET_ELEARNING_CREATING_QUESTIONS_LIST", questions);
    state.questions = questions;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
