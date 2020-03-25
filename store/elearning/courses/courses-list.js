import * as actionTypes from "../../../utils/action-types";
import * as mutationTypes from "../../../utils/mutation-types";
import CoursesList from "~/services/elearning/courses/list";

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
  async [actionTypes.ELEARNING_COURSES.LIST]({ commit }, payload) {
    try {
      const { data: result = {} } = await new CoursesList(this.$axios)[
        actionTypes.BASE.LIST
      ](payload);
      console.log("[CoursesList] list", result);

      // set to mutation
      commit(mutationTypes.ELEARNING_COURSES.SET_COURSES_LIST, result);
      return result;
    } catch (err) {
      console.log("[CoursesList] list.err", err);
      return err;
    }
  },
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_COURSES.SET_COURSES_LIST](state, _list) {
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
