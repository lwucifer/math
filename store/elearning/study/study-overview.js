import * as actionTypes from "../../../utils/action-types";
import * as mutationTypes from "../../../utils/mutation-types";
import Overview from "~/services/elearning/study/Overview";

/**
 * initial state
 */
const state = () => ({
    archives: [],
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
    async [actionTypes.ELEARNING_STURY_OVERVIEW.LIST]({ commit }, options) {
        console.log('ELEARNING_STURY_OVERVIEW.LIST');
        try {
            const result = await new Overview(this.$axios)[actionTypes.BASE.LIST](
                options
            );
            commit(
                mutationTypes.ELEARNING_STUDY_OVERVIEW.SET_ELEARNING_STUDY_OVERVIEW,
                result.data
            );
        } catch (error) {
            console.log(error);
        }
    },
};

/**
 * initial mutations
 */
const mutations = {
    [mutationTypes.ELEARNING_STUDY_ARCHIVE.SET_ELEARNING_STUDY_OVERVIEW](
        state,
        _overview
    ) {
        state._overview = _overview;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};