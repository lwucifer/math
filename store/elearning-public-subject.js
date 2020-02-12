import * as actionTypes from "../utils/action-types";
import * as mutationTypes from "../utils/mutation-types";
import Subject from "~/services/elearning/Subject";

/**
 * initial state
 */
const state = () => ({
  elearningSubjects: []
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING.SUBJECT]({ commit }, params) {
    try {
      const options = { params };
      const result = await new Subject(this.$axios)[actionTypes.BASE.LIST](
        options
      );
      // set to mutation
      commit(mutationTypes.ELEARNING.SET_ELEARNING_SUBJECT, result);
    } catch (error) {
      console.log("[Elearning Subject] list.error", error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING.SET_ELEARNING_SUBJECT](state, elearningSubjects) {
    console.log("SET_ELEARNING_SUBJECT", elearningSubjects);
    state.elearningSubjects = elearningSubjects;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
