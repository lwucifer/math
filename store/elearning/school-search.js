import * as actionTypes from "../../utils/action-types";
import * as mutationTypes from "../../utils/mutation-types";
import Search from "~/services/elearning/school/Search";

/**
 * initial state
 */
const state = () => ({
  elearningSchoolSearch: {}
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_SCHOOL_SEARCH.LIST]({ commit }) {
    try {
      const result = await new Search(this.$axios)[actionTypes.BASE.LIST]();
      commit(
        mutationTypes.ELEARNING_SCHOOL_SEARCH.SET_ELEARNING_SCHOOL_SEARCH_LIST,
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
  [mutationTypes.ELEARNING_SCHOOL_SEARCH.SET_ELEARNING_SCHOOL_SEARCH_LIST](
    state,
    elearningSchoolSearch
  ) {
    state.elearningSchoolSearch = elearningSchoolSearch;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
