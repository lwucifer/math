import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Excercise from "~/services/elearning/creating/Excercise";

/**
 * initial state
 */
const state = () => ({
  excercises: []
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_CREATING_EXCERCISES.LIST]({ commit }, payload) {
    try {
      const result = await new Excercise(this.$axios)[actionTypes.BASE.LIST](
        payload
      );
      commit(
        mutationTypes.ELEARNING_CREATING_EXCERCISES
          .SET_ELEARNING_CREATING_EXERCISES_LIST,
        result
      );
      return result;
    } catch (error) {
      console.log("[Creating exercises] list.error", error);
    }
  },

  async [actionTypes.ELEARNING_CREATING_EXCERCISES.ADD]({ commit }, payload) {
    try {
      const result = await new Excercise(this.$axios)[actionTypes.BASE.ADD](
        payload
      );
      return result;
    } catch (error) {
      console.log("[Creating exercises] add.error", error);
    }
  },

  async [actionTypes.ELEARNING_CREATING_EXCERCISES.EDIT]({ commit }, payload) {
    try {
      const result = await new Excercise(this.$axios)[actionTypes.BASE.EDIT](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_EDIT, result);
    } catch (error) {
      console.log("[Creating exercises] edit.error", error);
    }
  },

  async [actionTypes.ELEARNING_CREATING_EXCERCISES.DELETE](
    { commit },
    payload
  ) {
    try {
      const result = await new Excercise(this.$axios)[actionTypes.BASE.DELETE](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_DELETE, result);
    } catch (error) {
      console.log("[Creating exercises] delete.error", error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_CREATING_EXCERCISES
    .SET_ELEARNING_CREATING_EXERCISES_LIST](state, excercises) {
    state.excercises = excercises;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
