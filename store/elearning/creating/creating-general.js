import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import General from "~/services/elearning/creating/General";
import Vue from "vue";

/**
 * initial state
 */
const state = () => ({
  general: null
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_CREATING_GENERAL.LIST]({ commit }, options) {
    try {
      const result = await new General(this.$axios)[actionTypes.BASE.LIST](
        options
      );
      commit(
        mutationTypes.ELEARNING_CREATING_GENERAL
          .SET_ELEARNING_CREATING_GENERAL_LIST,
        result.data
      );
    } catch (error) {
      console.log("[Creating general] list.error", error);
    }
  },

  async [actionTypes.ELEARNING_CREATING_GENERAL.ADD]({ commit }, payload) {
    try {
      const result = await new General(this.$axios)["postWithFormData"](
        payload
      );
      console.log(result);
      Vue.toasted.show("Data is loaded!");
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_ADD, result);
    } catch (error) {
      console.log("[Creating general] add.error", error);
    }
  },

  async [actionTypes.ELEARNING_CREATING_GENERAL.EDIT]({ commit }, payload) {
    try {
      const result = await new General(this.$axios)[actionTypes.BASE.EDIT](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_EDIT, result);
    } catch (error) {
      console.log("[Creating general] edit.error", error);
    }
  },

  async [actionTypes.ELEARNING_CREATING_GENERAL.DELETE]({ commit }, payload) {
    try {
      const result = await new General(this.$axios)[actionTypes.BASE.DELETE](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_DELETE, result);
    } catch (error) {
      console.log("[Creating general] delete.error", error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_CREATING_GENERAL
    .SET_ELEARNING_CREATING_GENERAL_LIST](state, general) {
    state.general = general;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
