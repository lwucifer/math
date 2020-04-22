import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Result from "~/services/elearning/teaching/Result";

/**
 * initial state
 */
const state = () => ({
  currentResult: {},
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_TEACHING_RESULT.DETAIL]({ commit }, payload) {
    try {
      const result = await new Result(this.$axios)[actionTypes.BASE.DETAIL](
        payload
      );
      // set to mutation
      commit(mutationTypes.ELEARNING_TEACHING_RESULT.SET_TEACHING_RESULT_DETAIL, result);
    } catch (error) {
      console.log("[Teaching results] list.error", error);
    }
  },
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_TEACHING_RESULT.SET_TEACHING_RESULT_DETAIL](state, data) {
    console.log("SET_ELEARNING_TEACHING_RESULT_DETAIL", data);
    state.currentResult = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
