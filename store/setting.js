import * as actionTypes from "../utils/action-types";
import * as mutationTypes from "../utils/mutation-types";
import Setting from "~/services/account/Setting";

const state = () => ({
  settings: {}
})

const actions = {
  async [actionTypes.ACCOUNT_SETTING.LIST]({ commit }, payload) {
    try {
      const result = await new Setting(this.$axios)[actionTypes.BASE.LIST](
        payload
      );
      commit(
        mutationTypes.ACCOUNT_SETTING.SET_ACCOUNT_SETTING_LIST,
        result.data
      );
    } catch (err) {
      console.log("ACCOUNT SETTING list.err", err);
      return err;
    }
  },
  async [actionTypes.ACCOUNT_SETTING.UPDATE]({ commit }, payload) {
    try {
      const result = await new Setting(this.$axios)[actionTypes.BASE.ADD](
        payload
      );
      return result
    } catch (err) {
      console.log("ACCOUNT SETTING update.err", err);
      return err;
    }
  },
}
const mutations = {
  [mutationTypes.ACCOUNT_SETTING.SET_ACCOUNT_SETTING_LIST](
    state,
    data
  ) {
    state.settings = data;
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};