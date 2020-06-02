import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import StudentPrivate from "~/services/elearning/teaching/StudentPrivate";

/**
 * initial state
 */
const state = () => ({
    studentPrivates: [],
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
    async [actionTypes.TEACHING_STUDENTS_PRIVATE.LIST]({ commit }, payload) {
        try {
            const result = await new StudentPrivate(this.$axios)[
                actionTypes.BASE.LIST
            ](payload);
            console.log("payload", payload)
            // set to mutation
            commit(
                mutationTypes.TEACHING_STUDENTS_PRIVATE.SET_TEACHING_STUDENTS_LIST,
                result.data
            );
            return result;
        } catch (error) {
            console.log("[Request] list.error", error);
        }
    },
};

/**
 * initial mutations
 */
const mutations = {
    [mutationTypes.TEACHING_STUDENTS_PRIVATE.SET_TEACHING_STUDENTS_LIST](
        state,
        data
    ) {
        state.studentPrivates = data;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};