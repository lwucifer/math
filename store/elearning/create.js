import * as actionTypes from "~/utils/action-types";
import Lesson from "~/services/elearning/creating/Lesson";

/**
 * initial state
 */
const state = () => ({
  lesson: null,
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async getLesson({ commit }, payload) {
    commit("lesson", null);
    try {
      const result = await new Lesson(this.$axios)[actionTypes.BASE.LIST](
        options
      );
      if (result.success) commit("lesson", result.data);
      return result;
    } catch (error) {
      commit("lesson", null);
    }
  },
};

/**
 * initial mutations
 */
const mutations = {
  lesson(state, lesson) {
    state.lesson = lesson;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
