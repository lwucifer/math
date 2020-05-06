/**
 * initial state
 */
const state = () => ({
  payload: {
    name: "",
    data: "",
  },
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  pushEvent({ commit }, payload) {
    commit("event", payload);
  },
};

/**
 * initial mutations
 */
const mutations = {
  event(state, payload) {
    state.payload = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
