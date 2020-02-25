import * as actionTypes from "../../utils/action-types";
import * as mutationTypes from "../../utils/mutation-types";
import Exercises from "~/services/elearning/creating/Exercises";

/**
 * initial state
 */
const state = () => ({
  exercises: []
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_CREATING_EXERCISES.LIST]({ commit }, payload) {
    try {
      const result = await new Exercises(this.$axios)[actionTypes.BASE.LIST](
        payload
      );
      // set to mutation
      commit(mutationTypes.ELEARNING_CREATING_EXERCISES.SET_ELEARNING_CREATING_EXERCISES_LIST, result);
    } catch (error) {
      console.log("[Creating exercises] list.error", error);
    }
  },

  async [actionTypes.ELEARNING_CREATING_EXERCISES.ADD]({ commit }, payload) {
    try {
      const result = await new Exercises(this.$axios)[actionTypes.BASE.ADD](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_ADD, result);
    } catch (error) {
      console.log("[Creating exercises] add.error", error);
    }
  },

  async [actionTypes.ELEARNING_CREATING_EXERCISES.EDIT]({ commit }, payload) {
    try {
      const result = await new Exercises(this.$axios)[actionTypes.BASE.EDIT](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_EDIT, result);
    } catch (error) {
      console.log("[Creating exercises] edit.error", error);
    }
  },
  
  async [actionTypes.ELEARNING_CREATING_EXERCISES.DELETE]({ commit }, payload) {
    try {
      const result = await new Exercises(this.$axios)[actionTypes.BASE.DELETE](
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
  [mutationTypes.ELEARNING_CREATING_EXERCISES.SET_ELEARNING_CREATING_EXERCISES_LIST](state, exercises) {
    console.log("SET_ELEARNING_CREATING_EXERCISES_LIST", exercises);
    state.exercises = exercises;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
