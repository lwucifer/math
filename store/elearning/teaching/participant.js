import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Participant from "~/services/elearning/teaching/Participant";

/**
 * initial state
 */
const state = () => ({
  participants: [],
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_TEACHING_EXERCISE_PARTICIPANT.LIST]({ commit }, payload) {
    try {
      const result = await new Participant(this.$axios)[actionTypes.BASE.LIST](
        payload
      );
      // set to mutation
      commit(
        mutationTypes.ELEARNING_TEACHING_EXERCISE_PARTICIAPANT.SET_TEACHING_EXERCISE_PARTICIPANT_LIST,
        result
      );
    } catch (error) {
      console.log("[Teaching exercise participants] list.error", error);
    }
  },
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_TEACHING_EXERCISE_PARTICIAPANT.SET_TEACHING_EXERCISE_PARTICIPANT_LIST](state, data) {
    console.log("SET_ELEARNING_TEACHING_EXERCISE_PARTICIPANT_LIST", data);
    state.participants = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
