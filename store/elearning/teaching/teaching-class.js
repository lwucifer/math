import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import TeachingClass from "~/services/elearning/teaching/TeachingClass";

/**
 * initial state
 */
const state = () => ({
  classes: [],
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_TEACHING_CLASS.LIST]({ commit }, payload) {
    try {
      const result = await new TeachingClass(this.$axios)[actionTypes.BASE.LIST](
        payload
      );
      // set to mutation
      commit(mutationTypes.ELEARNING_TEACHING_CLASS.SET_TEACHING_CLASS_LIST, result);
    } catch (error) {
      console.log("[Teaching classes] list.error", error);
    }
  },
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_TEACHING_CLASS.SET_TEACHING_CLASS_LIST](state, data) {
    console.log("SET_ELEARNING_TEACHING_CLASS_LIST", data);
    state.classes = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
