const state = () => ({
  authUser: null,
});

const actions = {
  async nuxtServerInit({ commit }) {
    // get auth info from session
  //   const options = {
  //     method: 'GET',
  //     url: '/auth/info',
  //   };

  //   const res = await this.$axios(options);

  //   if (res.data.authUser) {
  //     commit('setUser', res.data.authUser);
  //   } else {
  //     commit('setUser', null);
  //   }
  },

  
};

const getters = {};

const mutations = {
  setUser(state, user) {
    state.authUser = user;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
