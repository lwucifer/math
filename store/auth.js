import * as mutationTypes from "../utils/mutation-types";
import * as actionTypes from "../utils/action-types";
import { auth } from '../services/Auth';

/**
 * initial state
 */
const state = () => ({
  loggedUser: null,
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.AUTH.LOGIN]({ commit }, { email, password }) {
    const result = await auth(this.$axios).login({ email, password });
    if(result.success) {
      commit(mutationTypes.AUTH.SET_LOGIN, result.data);
    }
  },

  async [actionTypes.AUTH.LOGOUT]({ commit }) {
    const result = await auth(this.$axios).logout();
    if(result.success) {
      commit(mutationTypes.AUTH.SET_LOGIN, result.data);
    }
  },

};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.AUTH.SET_LOGIN](state, _loggedUser) {
    state.loggedUser = _loggedUser;
  },

  [mutationTypes.AUTH.SET_LOGOUT](state) {
    state.loggedUser = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
