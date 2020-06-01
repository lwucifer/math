import { get } from "lodash";
import StudyStudent from "~/services/elearning/study/StudyStudent";
import Statistic from "~/services/elearning/study/Statistic";
import Archive from "~/services/elearning/study/Archive";
import Favourite from "~/services/elearning/study/Favourite";

/**
 * initial state
 */
const state = () => ({
  studying: null,
  statistic: null,
  archive: null,
  favourite: null,
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async getStudying({ commit }, options = {}) {
    try {
      const result = await new StudyStudent(this.$axios)["list"](options);
      if (get(result, "success", false)) {
        commit("studying", get(result, "data", null));
        return;
      }
      commit("studying", null);
    } catch (error) {
      commit("studying", null);
    }
  },

  async getStatistic({ commit }, options = {}) {
    try {
      const result = await new Statistic(this.$axios)["list"](options);
      if (get(result, "success", false)) {
        commit("statistic", get(result, "data", null));
        return;
      }
      commit("statistic", null);
    } catch (error) {
      commit("statistic", null);
    }
  },

  async getArchive({ commit }, options = {}) {
    try {
      const result = await new Archive(this.$axios)["list"](options);
      if (get(result, "success", false)) {
        commit("archive", get(result, "data", null));
        return;
      }
      commit("archive", null);
    } catch (error) {
      commit("archive", null);
    }
  },

  async getFavourite({ commit }, options = {}) {
    try {
      const result = await new Favourite(this.$axios)["list"](options);
      if (get(result, "success", false)) {
        commit("favourite", get(result, "data", null));
        return;
      }
      commit("favourite", null);
    } catch (error) {
      commit("favourite", null);
    }
  },
};

/**
 * initial mutations
 */
const mutations = {
  studying(state, data) {
    state.studying = data;
  },
  statistic(state, data) {
    state.statistic = data;
  },
  archive(state, data) {
    state.archive = data;
  },
  favourite(state, data) {
    state.favourite = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
