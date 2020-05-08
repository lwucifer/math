import { STUDY_MODE } from '~/utils/constants';
/**
 * initial state
 */
const state = () => ({
  payload: {
    name: "",
    data: "",
  },
  studyMode: STUDY_MODE.VIDEO_PLAYING, // defaul display video playing, options: VIDEO_PLAYING|DO_EXCERCISE|BEFORE_BEGIN -> DOING -> FINISH|DO_TEST
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  pushEvent({ commit }, payload) {
    commit("event", payload);
  },
};

/**
 * initial mutations
 */
const mutations = {
  event(state, payload) {
    state.payload = payload;
  },
  setStudyMode(state, _mode) {
    console.log("[setStudyMode]", _mode);
    state.studyMode = _mode;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
