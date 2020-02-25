import * as actionTypes from "../../utils/action-types";
import * as mutationTypes from "../../utils/mutation-types";
import Info from "~/services/elearning/school/Info";

/**
 * initial state
 */
const state = () => ({
  schoolInfo: {}
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.SCHOOL_INFO.INFO]({ commit }, params) {
    try {
      const options = { params };
      const result = await new Info(this.$axios)[actionTypes.BASE.LIST](
        options
      );
      // set to mutation
      commit(mutationTypes.SCHOOL_INFO.SET_SCHOOL_INFO, result.data);
    } catch (error) {
      console.log("[School Info] info.error", error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.SCHOOL_INFO.SET_SCHOOL_INFO](state, schoolInfo) {
    state.schoolInfo = schoolInfo;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
