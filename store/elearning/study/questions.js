import { RESPONSE_SUCCESS } from "~/utils/config";
import InteractiveQuestionService from "~/services/elearning/study/InteractiveQuestion";

/**
 * initial state
 */
const state = () => ({
  questions: null,
});

/**
 * initial getters
 */
const getters = {
  //
};

const actions = {
  async getListQuestion({ commit }, options) {
    try {
      const result = await new InteractiveQuestionService(this.$axios)["list"](
        options
      );
      if (result.success == RESPONSE_SUCCESS) {
        commit("questions", result.data);
        return;
      }
      commit("questions", null);
    } catch (error) {
      commit("questions", null);
    }
  },
};

/**
 * initial mutations
 */
const mutations = {
  questions(state, questions) {
    state.questions = questions;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
