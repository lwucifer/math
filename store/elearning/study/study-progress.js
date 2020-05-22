import ProgressService from "~/services/elearning/study/Progress";
import * as actionTypes from "~/utils/action-types";
import { RESPONSE_SUCCESS } from "~/utils/config";
import * as mutationTypes from "~/utils/mutation-types";

/**
 * initial state
 */
const state = () => ({
  progress: null,
  currentSession: null,
});

/**
 * initial getters
 */
const getters = {
};

const actions = {
  async [actionTypes.ELEARNING_STUDY_PROGRESS.LIST]({ commit }, payload) {
    try {
      const result = await new ProgressService(this.$axios)[
        actionTypes.BASE.LIST
      ](payload);
      if (result.success == RESPONSE_SUCCESS) {
        commit(
          mutationTypes.ELEARNING_STUDY_PROGRESS.SET_STUDY_PROGRESS_LIST,
          result.data
        );
      }
      return result;
    } catch (error) {
      //
    }
  },
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_STUDY_PROGRESS.SET_STUDY_PROGRESS_LIST](
    state,
    _list
  ) {
    state.progress = _list;
  },

  [mutationTypes.ELEARNING_STUDY_PROGRESS.SET_STUDY_PROGRESS_CURRENT_SESSION](
    state,
    _currSession
  ) {
    console.log("[SET_STUDY_PROGRESS_CURRENT_SESSION]", _currSession);
    state.currentSession = _currSession;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
