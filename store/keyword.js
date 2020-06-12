import * as mutationTypes from "../utils/mutation-types";

/**
 * initial state
 */
const state = () => ({
  keywordSearchHeader: '',
  checkRouteClearKeyword: ''
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
    state.keywordSearchHeader = _keyword;
    console.log('Search Header mutations', state.keywordSearchHeader);
  },

  [mutationTypes.KEYWORD.CHECK_ROUTE_CLEAR_KEYWORK](state, _route) {
    state.checkRouteClearKeyword = _route;
    console.log('state.checkRouteClearKeyword mutations', state.checkRouteClearKeyword);
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
