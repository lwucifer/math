import * as actionTypes from "~/utils/action-types";
import Setting from "~/services/account/Setting";

const state = () => ({
  setting: null,
});

const actions = {
  async getSetting({ commit }, payload) {
    try {
      const result = await new Setting(this.$axios)[actionTypes.BASE.LIST](
        payload
      );
      if (result.success) {
        commit("setting", result.data);
        return;
      }
      commit("setting", null);
    } catch (err) {
      commit("setting", null);
    }
  },

  async updateSetting({ commit }, payload) {
    try {
      const result = await new Setting(this.$axios)[actionTypes.BASE.ADD](
        payload
      );
      return result;
    } catch (err) {
      console.log("ACCOUNT SETTING update.err", err);
      return err;
    }
  },
};

const mutations = {
  setting(state, data) {
    state.setting = data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
