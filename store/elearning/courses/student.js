import * as actionTypes from "../../../utils/action-types";
import * as mutationTypes from "../../../utils/mutation-types";
import Student from "~/services/elearning/courses/student";

/**
 * initial state
 */
const state = () => ({
  list: {},
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_COURSES.STUDENT]({ commit }, payload) {
    try {
      const { data: result = {} } = await new Student(this.$axios)[
        actionTypes.BASE.LIST
      ](payload);
      console.log("[Student] list", result);

      // set to mutation
      commit(mutationTypes.ELEARNING_COURSES.SET_COURSES_STUDENT, result);
      return result;
    } catch (err) {
      console.log("[Student] list.err", err);
      return err;
    }
  },
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_COURSES.SET_COURSES_STUDENT](state, _list) {
    state.list = _list;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
