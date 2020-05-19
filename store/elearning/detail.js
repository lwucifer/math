import * as Service from "~/services/elearning/Detail";
import { get } from "lodash";

/**
 * initial state
 */
const state = () => ({
  info: null,
  lectures_of_teacher: null,
  lectures_related: null,
  teacher: null,
  program: null,
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async getTeacher({ commit, state }, options = {}) {
    if (get(state, "info.teacher.id", "")) {
      const payload = {
        params: {
          teacher_id: get(state, "info.teacher.id", ""),
        },
      };
      const res = await Service.getTeacher(this.$axios, payload);
      commit("teacher", res);
    }
    commit("teacher", null);
  },

  async getProgram({ commit, state }, options = {}) {
    if (get(state, "info.id", "")) {
      const payload = {
        params: {
          elearning_id: get(state, "info.id", ""),
          token: "true",
        },
      };
      const res = await Service.getProgram(this.$axios, payload);
      commit("program", res);
    }
    commit("program", null);
  },

  async getInfo({ commit, state }, options = {}) {
    const res = await Service.getInfo(this.$axios, options);
    commit("info", res);
  },

  async getLectureOfTeacher({ commit, state }, options = {}) {
    if (get(state, "info.teacher.id", "")) {
      const payload = {
        params: {
          teacher_id: get(state, "info.teacher.id", ""),
        },
      };
      const res = await Service.getLecturesOfTeacher(this.$axios, payload);
      commit("lectures_of_teacher", res);
    }
    commit("lectures_of_teacher", null);
  },

  async getLecturesRelated({ commit, state }, options = {}) {
    if (get(state, "info.id", "")) {
      const payload = {
        params: {
          elearning_id: get(state, "info.id", ""),
          token: "true",
        },
      };
      const res = await Service.getLecturesRelated(this.$axios, payload);
      commit("lectures_related", res);
    }
    commit("lectures_related", null);
  },
};

/**
 * initial mutations
 */
const mutations = {
  teacher(state, data) {
    state.teacher = data;
  },

  program(state, data) {
    state.program = data;
  },

  info(state, data) {
    state.info = data;
  },

  lectures_of_teacher(state, data) {
    state.lectures_of_teacher = data;
  },

  lectures_related(state, data) {
    state.lectures_related = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
