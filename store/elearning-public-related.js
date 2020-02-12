import * as actionTypes from "../utils/action-types";
import * as mutationTypes from "../utils/mutation-types";
import Related from "~/services/elearning/Related";

/**
 * initial state
 */
const state = () => ({
  elearningRelated: []
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING.RELATED]({ commit }, params) {
    try {
      const options = { params };
      const result = await new Related(this.$axios)[actionTypes.BASE.LIST](
        options
      );
      // set to mutation
      commit(mutationTypes.ELEARNING.SET_ELEARNING_RELATED, result);
    } catch (error) {
      console.log("[Elearning related] list.error", error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING.SET_ELEARNING_RELATED](state, elearningRelated) {
    console.log("SET_ELEARNING_RELATED", elearningRelated);
    state.elearningRelated = elearningRelated;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};