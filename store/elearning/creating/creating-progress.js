import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Progress from "~/services/elearning/creating/Progress";

/**
 * initial state
 */
const state = () => ({
  progress: []
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_CREATING_PROGRESS]({ commit }, options) {
    try {
      const result = await new Progress(this.$axios)[actionTypes.BASE.LIST](
        options
      );
      commit(mutationTypes.SET_ELEARNING_CREATING_PROGRESS, result);
    } catch (error) {
      console.log("[Creating answers] list.error", error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.SET_ELEARNING_CREATING_PROGRESS](state, progress) {
    state.progress = progress;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
