import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";

const state = () => ({
  stateTimeTable: null,
});

const actions = {
};

const mutations = {
  [mutationTypes.TIMETABLE.SET_STATE_TIMETABLE](state, _stateTimeTable) {
    state.stateTimeTable = _stateTimeTable;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
