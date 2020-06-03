import * as mutationTypes from "../utils/mutation-types";

/**
 * initial state
 */
const state = () => ({
  keyword: '',
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  //
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.KEYWORD.SEARCH_HEADER](state, _keyword) {
    state.keyword = _keyword;
    console.log('Search Header', state.keyword);
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
