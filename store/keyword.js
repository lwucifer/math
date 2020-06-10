import * as mutationTypes from "../utils/mutation-types";

/**
 * initial state
 */
const state = () => ({
  keywordSearchHeader: '',
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
    console.log('Search Header', state.keywordSearchHeader);
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
