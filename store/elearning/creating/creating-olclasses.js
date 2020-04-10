import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Classes from "~/services/elearning/creating/Olclasses";

/**
 * initial state
 */
const state = () => ({
  Olclasses: [],
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.CREATING_OLCLASSES.LIST]({ commit }, options) {
    try {
      const result = await new Classes(this.$axios)[actionTypes.BASE.LIST](
        options
      );
      commit(
        mutationTypes.CREATING_OLCLASSES
          .SET_CREATING_OLCLASSES_LIST,
        result
      );
      return result;
    } catch (error) {
      console.log("[Creating Olclasses] list.error", error);
    }
  },

  async [actionTypes.CREATING_OLCLASSES.DETAIL]({ commit }, Olclasses_id) {
    try {
      const result = await new Classes(this.$axios)[actionTypes.BASE.DETAIL](
        Olclasses_id
      );
      return result;
    } catch (error) {
      //
    }
    return null;
  },

  async [actionTypes.CREATING_OLCLASSES.ADD]({ commit }, payload) {
    try {
      const result = await new Classes(this.$axios)["postWithFormData"](payload);
      return result;
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_ADD, result);
    } catch (error) {
      console.log("[Creating Olclasses] add.error", error);
    }
  },

  async [actionTypes.CREATING_OLCLASSES.EDIT]({ commit }, payload) {
    try {
      const result = await new Classes(this.$axios)[actionTypes.BASE.EDIT](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_EDIT, result);
    } catch (error) {
      console.log("[Creating Olclasses] edit.error", error);
    }
  },

  async [actionTypes.CREATING_OLCLASSES.DELETE]({ commit }, payload) {
    try {
      const result = await new Classes(this.$axios)[actionTypes.BASE.DELETE](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_OLCLASSES.SET_CREATING_OLCLASSES_LIST, result);
    } catch (error) {
      console.log("[Creating Classes] delete.error", error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.CREATING_OLCLASSES
    .SET_CREATING_OLCLASSES_LIST](state, Olclasses) {
    console.log("SET_CREATING_OLCLASSES_LIST");
    state.Olclasses = Olclasses;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
