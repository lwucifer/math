import * as actionTypes from "../../../utils/action-types";
import * as mutationTypes from "../../../utils/mutation-types";
import Lesson from "~/services/elearning/creating/Lesson";

/**
 * initial state
 */
const state = () => ({
  lessons: []
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_CREATING_LESSONS.LIST]({ commit }, payload) {
    try {
      const result = await new Lesson(this.$axios)[actionTypes.BASE.LIST](
        payload
      );
      // set to mutation
      commit(mutationTypes.ELEARNING_CREATING_LESSONS.SET_ELEARNING_CREATING_LESSONS_LIST, result);
    } catch (error) {
      console.log("[Creating Lesson] list.error", error);
    }
  },

  async [actionTypes.ELEARNING_CREATING_LESSONS.ADD]({ commit }, payload) {
    try {
      const result = await new Lesson(this.$axios)[actionTypes.BASE.ADD](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_ADD, result);
    } catch (error) {
      console.log("[Creating Lesson] add.error", error);
    }
  },

  async [actionTypes.ELEARNING_CREATING_LESSONS.EDIT]({ commit }, payload) {
    try {
      const result = await new Lesson(this.$axios)[actionTypes.BASE.EDIT](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_EDIT, result);
    } catch (error) {
      console.log("[Creating Lesson] edit.error", error);
    }
  },
  
  async [actionTypes.ELEARNING_CREATING_LESSONS.DELETE]({ commit }, payload) {
    try {
      const result = await new Lesson(this.$axios)[actionTypes.BASE.DELETE](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_DELETE, result);
    } catch (error) {
      console.log("[Creating Lesson] delete.error", error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_CREATING_LESSONS.SET_ELEARNING_CREATING_LESSONS_LIST](state, lessons) {
    console.log("SET_ELEARNING_CREATING_LESSONS_LIST", lessons);
    state.lessons = lessons;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
