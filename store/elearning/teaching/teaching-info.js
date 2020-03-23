import * as actionTypes from "../../../utils/action-types";
import * as mutationTypes from "../../../utils/mutation-types";
import Info from "~/services/elearning/teaching/Info";

/**
 * initial state
 */
const state = () => ({
  elearningInfo: {}
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_INFO.INFO]({ commit }, params) {
    try {
      const options = { params };
      const result = await new Info(this.$axios)[actionTypes.BASE.LIST](
        options
      );
      // set to mutation
      commit(mutationTypes.ELEARNING_INFO.SET_ELEARNING_INFO, result.data);
    } catch (error) {
      console.log("[Elearning Info] info.error", error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_INFO.SET_ELEARNING_INFO](state, elearningInfo) {
    state.elearningInfo = elearningInfo;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
