import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Revenue from "~/services/elearning/teaching/statistic/Revenue";

/**
 * initial state
 */
const state = () => ({
    revenueList: [],
  });
  
/**
* initial getters
*/
const getters = {};

  /**
   * initial actions
   */
const actions = {
    async [actionTypes.TEACHING_STATISTIC_REVENUE.LIST]({ commit }, payload) {
        try {
          const result = await new Revenue(this.$axios)[actionTypes.BASE.LIST](
            payload
          );
          // set to mutation
          commit(mutationTypes.TEACHING_STATISTIC_REVENUE.SET_TEACHING_STATISTIC_REVENUE_LIST, result.data);
        } catch (error) {
          console.log("[Teaching statis revenue] list.error", error);
        }
      }
  };

/**
 * initial mutations
 */
  const mutations = {
    [mutationTypes.TEACHING_STATISTIC_REVENUE.SET_TEACHING_STATISTIC_REVENUE_LIST](state, data) {
      console.log("SET_TEACHING_STATISTIC_REVENUE_LIST", data);
      state.revenueList = data;
    }
  };

  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  };
  