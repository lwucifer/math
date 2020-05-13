import * as Service from "~/services/elearning/Create";
import { get } from "lodash";

/**
 * initial state
 */
const state = () => ({
  lesson: null,
  progress: null,
  general: null,
  lessons_lecture: [],
  chapters: [],
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async getContent({ commit, state }, options = {}) {
    if (get(state, "general.type", "") === "LECTURE") {
      const payload = {
        params: {
          elearning_id: get(state, "general.id", ""),
        },
      };
      const res = await Service.getLessonsOfLecture(this.$axios, payload);
      commit("lessons_lecture", res);
    }

    if (get(state, "general.type", "") === "COURSE") {
      const payload = {
        params: {
          elearning_id: get(state, "general.id", ""),
        },
      };
      const res = await Service.getChaptersOfElearning(this.$axios, payload);
      commit("chapters", res);
    }
  },

  async getGeneral({ commit }, options) {
    const res = await Service.getGeneral(this.$axios, options);
    commit("general", res);
  },

  async getLesson({ commit }, lesson_id) {
    const res = await Service.getLesson(this.$axios, lesson_id);
    commit("lesson", res);
  },

  async getProgress({ commit, state }, options = {}) {
    if (get(state, "general", null)) {
      const payload = {
        params: {
          elearning_id: get(state, "general.id", ""),
        },
      };
      const res = await Service.getProgress(this.$axios, payload);
      commit("progress", res);
    }
  },

  reset({ commit }) {
    commit("reset");
  },
};

/**
 * initial mutations
 */
const mutations = {
  chapters(state, data) {
    state.chapters = data;
  },

  lessons_lecture(state, data) {
    state.lessons_lecture = data;
  },

  general(state, data) {
    state.general = data;
  },

  lesson(state, data) {
    state.lesson = data;
  },

  progress(state, data) {
    state.progress = data;
  },

  reset() {
    state.lesson = null;
    state.progress = null;
    state.general = null;
    state.chapters = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
