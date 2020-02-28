import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Category from "~/services/elearning/public/Category";
import { get } from "lodash";

/**
 * initial state
 */
const state = () => ({
  elearningPublicCategory: []
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_PUBLIC_CATEGORY.LIST]({ commit }, params) {
    try {
      const options = { params };
      const result = await new Category(this.$axios)[actionTypes.BASE.LIST](
        options
      );
      // set to mutation
      commit(
        mutationTypes.ELEARNING_PUBLIC_CATEGORY
          .SET_ELEARNING_PUBLIC_CATEGORY_LIST,
        result
      );
    } catch (error) {
      console.log("[Elearning Summary] list.error", error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_PUBLIC_CATEGORY.SET_ELEARNING_PUBLIC_CATEGORY_LIST](
    state,
    elearningPublicCategory
  ) {
    state.elearningPublicCategory = get(elearningPublicCategory, "data", []);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
