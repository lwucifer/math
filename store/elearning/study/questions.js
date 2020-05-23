import { RESPONSE_SUCCESS } from "~/utils/config";
import InteractiveQuestionService from "~/services/elearning/study/InteractiveQuestion";
import { get } from "lodash";

/**
 * initial state
 */
const state = () => ({
  questions: {
    content: [],
    page: {},
  },
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
    state.questions.page = get(questions, "page", null);
    if (get(questions, "page.number", 0) > 0) {
      state.questions.content = state.questions.content.concat(
        get(questions, "content", [])
      );
    } else {
      state.questions.content = get(questions, "content", []);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
