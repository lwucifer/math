import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Search from "~/services/elearning/public/Search";

/**
 * initial state
 */
const state = () => ({
  Lessons: [],
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_PUBLIC_SEARCH.DETAIL]({ commit }, id) {
    try {
      const result = await new Search(this.$axios)['getIDWithPayload'](
        id.userId, {params: {size: 9999}}
      );
      commit(
        mutationTypes.ELEARNING_PUBLIC_SEARCH
          .SET_ELEARNING_PUBLIC_SEARCH_DETAIL,
        result
      );
      return result;
    } catch (error) {
      //
    }
    return null;
  },
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_PUBLIC_SEARCH
    .SET_ELEARNING_PUBLIC_SEARCH_DETAIL](state, lessons) {
    console.log("SET_ELEARNING_PUBLIC_SEARCH_DETAIL");
    state.Lessons = lessons;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
