import auth from './auth.js'

const state = () => ({
  authUser: null,
});

const actions = {
  async nuxtServerInit({ commit }) {
    console.log("[nuxtServerInit] context", this.$fireMess);

  },

  onAuthStateChanged({ commit }) {
    console.log("[onAuthStateChanged]")
  }


};

const getters = {};

const mutations = {
  // setUser(state, user) {
  //   state.authUser = user;
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
