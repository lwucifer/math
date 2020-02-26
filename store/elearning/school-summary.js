import * as actionTypes from "../../utils/action-types";
import * as mutationTypes from "../../utils/mutation-types";
import Summary from "~/services/elearning/school/Summary";

/**
 * initial state
 */
const state = () => ({
  elearningSchoolSummary: {}
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_SCHOOL_SUMMARY.LIST]({ commit }) {
    try {
      const result = await new Summary(this.$axios)[actionTypes.BASE.LIST]();
      commit(
        mutationTypes.ELEARNING_SCHOOL_SUMMARY
          .SET_ELEARNING_SCHOOL_SUMMARY_LIST,
        result
      );
    } catch (error) {
      console.log(error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_SCHOOL_SUMMARY.SET_ELEARNING_SCHOOL_SUMMARY_LIST](
    state,
    elearningSchoolSummary
  ) {
    state.elearningSchoolSummary = elearningSchoolSummary;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
