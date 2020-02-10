import * as actionTypes from "../utils/action-types";
import * as mutationTypes from "../utils/mutation-types";
import Info from "~/services/elearning/Info";
import Program from "~/services/elearning/Program";

/**
 * initial state
 */
const state = () => ({
  elearningInfo: null,
  elearningProgram: null
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING.INFO]({ commit }, elearning_id) {
    try {
      const payload = { params: { elearning_id } };
      const result = await new Info(this.$axios)[actionTypes.BASE.LIST](
        payload
      );
      console.log("[Elearning] info", result);
      // set to mutation
      commit(mutationTypes.ELEARNING.SET_ELEARNING_INFO, result);
    } catch (error) {
      console.log("[Elearning] info.error", error);
    }
  },

  async [actionTypes.ELEARNING.PROGRAM]({ commit }, payload) {
    try {
      const result = await new Program(this.$axios)[actionTypes.BASE.LIST](
        payload
      );
      console.log("[Elearning] program", result);
      // set to mutation
      commit(mutationTypes.ELEARNING.SET_ELEARNING_PROGRAM, result);
    } catch (error) {
      console.log("[Elearning] program.error", error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING.SET_ELEARNING_INFO](state, _elearningInfo) {
    console.log("SET_ELEARNING_INFO", _elearningInfo);
    state.elearningInfo = _elearningInfo;
  },

  [mutationTypes.ELEARNING.SET_ELEARNING_PROGRAM](state, _elearningProgram) {
    console.log("SET_ELEARNING_PROGRAM", _elearningProgram);
    state.elearningProgram = _elearningProgram;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
