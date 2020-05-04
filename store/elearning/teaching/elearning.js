import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Elearnings from "~/services/elearning/teaching/Elearnings";
import ElearningHides from "~/services/elearning/teaching/ElearningHides";

/**
 * initial state
 */
const state = () => ({
  elearnings: [],
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.TEACHING_ELEARNINGS.LIST]({ commit }, payload) {
    try {
      const result = await new Elearnings(this.$axios)["postWithRawJson"](
        payload
      );
      commit(mutationTypes.TEACHING_ELEARNINGS.SET_TEACHING_ELEARNINGS_LIST, result);
      return result;
    } catch (error) {
      console.log("[Teaching elearning] list.error", error);
    }
  },

  async [actionTypes.TEACHING_ELEARNINGS.DELETE]({ commit }, payload) {
    try {
      const result = await new Elearnings(this.$axios)['deleteWithRawJson'](
        payload
      );
      return result;
    } catch (error) {
      console.log("[TEACHING elearning] list.error", error);
    }
  },

  async [actionTypes.TEACHING_ELEARNINGS.HIDE]({ commit }, payload) {
    try {
      const result = await new ElearningHides(this.$axios)["postWithRawJson"](
        payload
      );
      return result;
    } catch (error) {
      console.log("[Teaching elearning] list.error", error);
    }
  },
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.TEACHING_ELEARNINGS.SET_TEACHING_ELEARNINGS_LIST](state, data) {
    state.elearnings = {...data};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
