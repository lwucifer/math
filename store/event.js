import { STUDY_MODE } from "~/utils/constants";

/**
 * initial state
 */
const state = () => ({
  payload: null,
  studyMode: "", // defaul display video playing, options: VIDEO_PLAYING|DO_EXCERCISE|BEFORE_BEGIN -> DOING -> FINISH|DO_TEST
  loadingExercise: false
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
    if ([STUDY_MODE.DO_EXERCISE, STUDY_MODE.VIDEO_PLAYING, STUDY_MODE.REVIEW_EXERCISE_RESULT].includes(_mode)) {
      state.loadingExercise = true; // show spin loading when change mode, turnoff when api get done after
    }
  },
  setPayload(state, payload) {
    console.log("[setStudyPayload]", payload);
    state.payload = payload;
  },
  setExerciseLoading(state, isLoading) {
    // console.log("[setExerciseLoading]", isLoading);
    state.loadingExercise = isLoading;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
