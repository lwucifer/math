import * as actionTypes from "../utils/action-types";
import * as mutationTypes from "../utils/mutation-types";
import Elearning from "~/services/study/Elearning";
import { MY_ELEARNING } from '@/server/fakedata/elearning/myElearning';

/**
 * initial state
 */
const state = () => ({
  myCourses: []
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.STUDY.ELEARNING]({ commit }, params) {
    commit(mutationTypes.STUDY.SET_STUDY_ELEARNING_LIST, MY_ELEARNING);
    // try {
    //   const options = { params };
    //   const result = await new Elearning(this.$axios)[actionTypes.BASE.LIST](
    //     options
    //   );
    //   // set to mutation
    //   commit(mutationTypes.STUDY.SET_STUDY_ELEARNING_LIST, result);
    // } catch (error) {
    //   console.log("[Study Elearning] list.error", error);
    // }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.STUDY.SET_STUDY_ELEARNING_LIST](state, _myCourses) {
    console.log("SET_STUDY_ELEARNING_LIST", _myCourses);
    state.myCourses = _myCourses;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
