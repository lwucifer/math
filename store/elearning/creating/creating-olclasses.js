import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Classes from "~/services/elearning/creating/Olclasses";
import Invitations from "~/services/elearning/creating/OlclassesInvitations";
import Invite from "~/services/elearning/creating/OlclassesInvite";
import Block from "~/services/elearning/creating/OlclassesBlock";
import Lesson from "~/services/elearning/creating/OlclassesLesson";

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
      console.log("[Creating Olclasses] list.error", error);
    }
    return null;
  },

  async [actionTypes.CREATING_OLCLASSES.ADD]({ commit }, payload) {
    try {
      const result = await new Classes(this.$axios)["postWithRawJson"](payload);
      return result;
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

  async [actionTypes.CREATING_OLCLASSES.DELETE]({ commit }, options) {
    try {
      const result = await new Classes(this.$axios)["deleteWithRawJson"](options);
      return result;
    } catch (error) {
      console.log("[Creating Olclasses] delete.error", error);
    }
  },

  async [actionTypes.CREATING_OLCLASSES.INVITATIONS]({ commit }, options) {
    try {
      const result = await new Invitations(this.$axios)[actionTypes.BASE.LIST](
        options
      );
      commit(
        mutationTypes.CREATING_OLCLASSES
          .SET_CREATING_OLCLASSES_INVITATIONS_LIST,
        result
      );
      return result;
    } catch (error) {
      console.log("[Creating Olclasses] list.error", error);
    }
  },

  async [actionTypes.CREATING_OLCLASSES.INVITE]({ commit }, options) {
    try {
      const result = await new Invite(this.$axios)['postWithRawJson'](
        options
      );
      return result;
    } catch (error) {
      console.log("[Creating Olclasses] list.error", error);
    }
  },
  
  async [actionTypes.CREATING_OLCLASSES.BLOCK]({ commit }, options) {
    try {
      const result = await new Block(this.$axios)['postWithRawJson'](
        options
      );
      return result;
    } catch (error) {
      console.log("[Creating Olclasses] list.error", error);
    }
  },
  
  async [actionTypes.CREATING_OLCLASSES.UNBLOCK]({ commit }, options) {
    try {
      const result = await new Block(this.$axios)['deleteWithRawJson'](
        options
      );
      return result;
    } catch (error) {
      console.log("[Creating Olclasses] list.error", error);
    }
  },

  // Lesson attendances
  async [actionTypes.CREATING_OLCLASSES_LESSON.LIST]({ commit }, options) {
    try {
      const result = await new Classes(this.$axios)[actionTypes.BASE.LIST](
        options
      );
      commit(
        mutationTypes.CREATING_OLCLASSES_LESSON
          .SET_CREATING_OLCLASSES_ATTENDANCES,
        result
      );
      return result;
    } catch (error) {
      console.log("[Creating Olclasses] list.error", error);
    }
  },
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.CREATING_OLCLASSES.SET_CREATING_OLCLASSES_LIST](state, _Olclasses) {
    state.Olclasses = _Olclasses;
  },
  [mutationTypes.CREATING_OLCLASSES.SET_CREATING_OLCLASSES_INVITATIONS_LIST](state, _Olclasses) {
    state.Olclasses = _Olclasses;
  },
  [mutationTypes.CREATING_OLCLASSES_LESSON.SET_CREATING_OLCLASSES_ATTENDANCES](state, _Olclasses) {
    state.Olclasses = _Olclasses;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
