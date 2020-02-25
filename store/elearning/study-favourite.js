import * as actionTypes from "../../utils/action-types";
import * as mutationTypes from "../../utils/mutation-types";
import Favourite from "~/services/elearning/study/Favourite";

/**
 * initial state
 */
const state = () => ({
  elearningStudyFavourite: []
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_STURY_FAVOURITE.LIST]({ commit }) {
    try {
      const result = await new Favourite(this.$axios)[actionTypes.BASE.LIST]();
      commit(
        mutationTypes.ELEARNING_STUDY_FAVOURITE
          .SET_ELEARNING_STUDY_FAVOURITE_LIST,
        result
      );
    } catch (error) {
      console.log(error);
    }
  },
  async [actionTypes.ELEARNING_STURY_FAVOURITE.ADD]({ commit }) {
    try {
      const result = await new Favourite(this.$axios)[actionTypes.BASE.ADD]();
      commit(
        mutationTypes.ELEARNING_STUDY_FAVOURITE
          .SET_ELEARNING_STUDY_FAVOURITE_ADD,
        result
      );
    } catch (error) {
      console.log(error);
    }
  },
  async [actionTypes.ELEARNING_STURY_FAVOURITE.DELETE]({ commit }) {
    try {
      const result = await new Favourite(this.$axios)[
        actionTypes.BASE.DELETE
      ]();
      commit(
        mutationTypes.ELEARNING_STUDY_FAVOURITE
          .SET_ELEARNING_STUDY_FAVOURITE_DELETE,
        result
      );
    } catch (error) {
      console.log(error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_STUDY_FAVOURITE.SET_ELEARNING_STUDY_FAVOURITE_LIST](
    state,
    elearningStudyFavourite
  ) {
    state.elearningStudyFavourite = elearningStudyFavourite;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
