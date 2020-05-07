import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import StudyStudent from "~/services/elearning/study/StudyStudent";
import Statistic from "~/services/elearning/study/Statistic";

/**
 * initial state
 */
const state = () => ({
  elearningStudyStudent: [],
  elearningStudyStatistic:[]
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
      console.log("[Elearning] list", result.data);
    } catch (error) {
      console.log("[Elearning study student] list.error", error);
    }
  },
  async [actionTypes.ELEARNING_STUDY_STATISTIC.LIST]({ commit }, payload) {
    try {
      const result = await new Statistic(this.$axios)[actionTypes.BASE.LIST](payload);
      commit(mutationTypes.ELEARNING_STUDY_STATISTIC.SET_ELEARNING_STUDY_STATISTIC, result.data);
      console.log("[ElearningStatistic] list", result.data);
    } catch (error) {
      console.log("[ElearningStatistic] list.error", error);
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
  },
  [mutationTypes.ELEARNING_STUDY_STATISTIC.SET_ELEARNING_STUDY_STATISTIC](
    state,
    elearningStudyStatistic
  ) {
    state.elearningStudyStatistic = elearningStudyStatistic;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
