import * as actionTypes from "../utils/action-types";
import * as mutationTypes from "../utils/mutation-types";
import Doc from "~/services/elearning/Doc";

/**
 * initial state
 */
const state = () => ({
  docs: []
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_CREATING_DOC.LIST]({ commit }, payload) {
    try {
      const result = await new Doc(this.$axios)[actionTypes.BASE.LIST](
        payload
      );
      // set to mutation
      commit(mutationTypes.ELEARNING_CREATING_DOC.SET_ELEARNING_CREATING_DOC_LIST, result);
    } catch (error) {
      console.log("[Creating docs] list.error", error);
    }
  },

  async [actionTypes.ELEARNING_CREATING_DOC.ADD]({ commit }, payload) {
    try {
      const result = await new Doc(this.$axios)[actionTypes.BASE.ADD](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_ADD, result);
    } catch (error) {
      console.log("[Creating docs] add.error", error);
    }
  },

  async [actionTypes.ELEARNING_CREATING_DOC.EDIT]({ commit }, payload) {
    try {
      const result = await new Doc(this.$axios)[actionTypes.BASE.EDIT](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_EDIT, result);
    } catch (error) {
      console.log("[Creating docs] edit.error", error);
    }
  },
  
  async [actionTypes.ELEARNING_CREATING_DOC.DELETE]({ commit }, payload) {
    try {
      const result = await new Doc(this.$axios)[actionTypes.BASE.DELETE](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_DELETE, result);
    } catch (error) {
      console.log("[Creating docs] delete.error", error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_CREATING_DOC.SET_ELEARNING_CREATING_DOC_LIST](state, _docs) {
    console.log("SET_ELEARNING_CREATING_DOC_LIST", _docs);
    state.docs = _docs;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};