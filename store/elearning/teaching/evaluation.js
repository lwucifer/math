import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Evaluation from "~/services/elearning/teaching/Evaluation";

/**
 * initial state
 */
const state = () => ({
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_TEACHING_EVALUATION.ADD]({ commit }, payload) {
    try {
      const result = await new Evaluation(this.$axios)[actionTypes.BASE.ADD](
        payload
      );
      return result;
    } catch (error) {
      console.log("[Teaching evaluation] add.error", error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
