import * as actionTypes from "../../../utils/action-types";
import * as mutationTypes from "../../../utils/mutation-types";
import OnlineClass from "~/services/elearning/teaching/OnlineClass";

/**
 * initial state
 */
const state = () => ({
  teachingOnlineClass: []
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.TEACHING_ONLINE_CLASS.LIST]({ commit }, params) {
    try {
      const options = { params };
      const result = await new OnlineClass(this.$axios)[actionTypes.BASE.LIST](
        options
      );
      // set to mutation
      commit(mutationTypes.TEACHING_ONLINE_CLASS.SET_TEACHING_ONLINE_CLASS_LIST, result);
    } catch (error) {
      console.log("[OnlineClass] list.error", error);
    }
  },

  async [actionTypes.TEACHING_ONLINE_CLASS.ADD]({ commit }, payload) {
    try {
      const result = await new OnlineClass(this.$axios)[actionTypes.BASE.ADD](
        payload
      );
      // set to mutation
      // commit(mutationTypes.TEACHING_ONLINE_CLASS.SET_TEACHING_ONLINE_CLASS_LIST, result);
    } catch (error) {
      console.log("[OnlineClassOnlineClass] add.error", error);
    }
  },

  async [actionTypes.TEACHING_ONLINE_CLASS.EDIT]({ commit }, payload) {
    try {
      const result = await new OnlineClass(this.$axios)[actionTypes.BASE.EDIT](
        payload
      );
      // set to mutation
      // commit(mutationTypes.TEACHING_ONLINE_CLASS.SET_TEACHING_ONLINE_CLASS_LIST, result);
    } catch (error) {
      console.log("[OnlineClassOnlineClass] edit.error", error);
    }
  },

  async [actionTypes.TEACHING_ONLINE_CLASS.DELETE]({ commit }, payload) {
    try {
      const result = await new OnlineClass(this.$axios)[actionTypes.BASE.DELETE](
        payload
      );
      // set to mutation
      // commit(mutationTypes.TEACHING_ONLINE_CLASS.SET_TEACHING_ONLINE_CLASS_LIST, result);
    } catch (error) {
      console.log("[OnlineClassOnlineClass] delete.error", error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.TEACHING_ONLINE_CLASS.SET_TEACHING_ONLINE_CLASS_LIST](state, schoolOnlineClass) {
    console.log("SET_TEACHING_ONLINE_CLASS_LIST", schoolOnlineClass);
    state.schoolOnlineClass = schoolOnlineClass;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
