import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import InteractiveAnnouncement from "~/services/elearning/teaching/InteractiveAnnouncement";
/**
 * initial state
 */
const state = () => ({
    listAnnouncement: [],
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
    async [actionTypes.TEACHING_INTERACTIVE_ANNOUNCEMENT.LIST]({ commit },
        payload
    ) {
        try {
            const result = await new InteractiveAnnouncement(this.$axios)[
                actionTypes.BASE.LIST
            ](payload);
            // set to mutation
            commit(
                mutationTypes.TEACHING_INTERACTIVE_ACCOUNCEMENT
                .SET_TEACHING_INTERACTIVE_ACCOUNCEMENT_LIST,
                result.data
            );
            return result;
        } catch (error) {
            console.log("[TEACHING_INTERACTIVE_ACCOUNCEMENT] list.error", error);
        }
    },
    async [actionTypes.TEACHING_INTERACTIVE_ANNOUNCEMENT.ADD]({ commit }, payload) {
        try {
          const result = await new InteractiveAnnouncement(this.$axios)[actionTypes.BASE.ADD](
            payload
          );
          return result;
        } catch (error) {
          console.log("[TEACHING_INTERACTIVE_ACCOUNCEMENT] delete.error", error);
        }
    },
    async [actionTypes.TEACHING_INTERACTIVE_ANNOUNCEMENT.DELETE]({ commit }, payload) {
        try {
          const result = await new InteractiveAnnouncement(this.$axios)['deleteWithRawJson'](
            payload
          );
          return result;
        } catch (error) {
          console.log("[TEACHING elearning] list.error", error);
        }
      }
};

/**
 * initial mutations
 */
const mutations = {
    [mutationTypes.TEACHING_INTERACTIVE_ACCOUNCEMENT
        .SET_TEACHING_INTERACTIVE_ACCOUNCEMENT_LIST
    ](state, data) {
        console.log("SET_TEACHING_INTERACTIVE_ACCOUNCEMENT_LIST", data);
        state.listAnnouncement = data;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};