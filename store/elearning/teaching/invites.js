import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Invites from "~/services/elearning/teaching/OlclassInvites";

/**
 * initial state
 */
const state = () => ({
    invites: [],
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
    async [actionTypes.TEACHING_ELEARNING_INVITES.LIST]({ commit }, payload) {
        try {
            const result = await new Invites(this.$axios)[actionTypes.BASE.LIST](
                payload
            );
            // set to mutation
            commit(
                mutationTypes.TEACHING_ELEARNING_INVITES
                .SET_TEACHING_ELEARNING_INVITES_LIST,
                result.data
            );
        } catch (error) {
            console.log("[Progress] list.error", error);
        }
    },
};

/**
 * initial mutations
 */
const mutations = {
    [mutationTypes.TEACHING_ELEARNING_INVITES
        .SET_TEACHING_ELEARNING_INVITES_LIST
    ](state, data) {
        console.log("SET_TEACHING_ELEARNING_INVITES_LIST", data);
        state.invites = data;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};