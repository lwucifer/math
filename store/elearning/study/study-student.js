import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import StudyStudent from "~/services/elearning/study/StudyStudent";

/**
 * initial state
 */
const state = () => ({
  elearningStudyStudent: []
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_STUDY_STUDENT.LIST]({ commit }, payload) {
    try {
      const result = await new StudyStudent(this.$axios)[actionTypes.BASE.LIST](payload);
      commit(mutationTypes.ELEARNING_STUDY_STUDENT.SET_ELEARNING_STUDY_STUDENT, result);
      console.log("[Elearning] list", result);
    } catch (error) {
      console.log("[Elearning study student] list.error", error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_STUDY_STUDENT.SET_ELEARNING_STUDY_STUDENT](
    state,
    elearningStudyStudent
  ) {
    state.elearningStudyStudent = elearningStudyStudent;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
