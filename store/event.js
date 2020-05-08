import { STUDY_MODE } from "~/utils/constants";
/**
 * initial state
 */
const state = () => ({
  payload: null,
  studyMode: "", // defaul display video playing, options: VIDEO_PLAYING|DO_EXCERCISE|BEFORE_BEGIN -> DOING -> FINISH|DO_TEST
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  //
};

/**
 * initial mutations
 */
const mutations = {
  setStudyMode(state, _mode) {
    console.log("[setStudyMode]", _mode);
    state.studyMode = _mode;
  },
  setPayload(state, payload) {
    console.log("[setStudyPayload]", payload);
    state.payload = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
