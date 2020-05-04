import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Study from "~/services/elearning/study/Study";

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

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_STURY.LIST]({ commit }, payload) {
    try {
      const result = await new Study(this.$axios)[actionTypes.BASE.LIST](payload);
      commit(mutationTypes.ELEARNING_STUDY.SET_ELEARNING_STUDY, result);
    } catch (error) {
      console.log("[Elearning study] list.error", error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_STUDY.SET_ELEARNING_STUDY](
    state,
    elearningStudy
  ) {
    state.elearningStudy = elearningStudy;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
