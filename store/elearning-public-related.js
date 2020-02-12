import * as actionTypes from "../utils/action-types";
import * as mutationTypes from "../utils/mutation-types";
import Related from "~/services/elearning/Related";

/**
 * initial state
 */
const state = () => ({
    related: []
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING.RELATED]({ commit }, payload) {
    try {
      const result = await new Related(this.$axios)[actionTypes.BASE.LIST](
        payload
      );
      // set to mutation
      commit(mutationTypes.ELEARNING.SET_ELEARNING_RELATED, result);
    } catch (error) {
      console.log("[Elearning related] list.error", error);
    }
  },

};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING.SET_ELEARNING_RELATED](state, _related) {
    console.log("SET_ELEARNING_RELATED", _related);
    state.related = _related;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
