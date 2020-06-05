import * as actionTypes from "../../../utils/action-types";
import * as mutationTypes from "../../../utils/mutation-types";
import Overview from "~/services/elearning/study/Overview";

/**
 * initial state
 */
const state = () => ({
    overview: {
        lectures: 35,
        courses: 49,
        complete_rate: 98,
        medium_score: 8.5
    },
    timeTable: [
        {
            object_id: "039dd1a0-12e6-41a1-ad5d-59c052ec9a1e",
            type: "Học online",
            content: "Phòng học số 3",
            time: "15:30 - 16:30",
        },
        {
            object_id: "039dd1a0-12e6-41a1-ad5d-59c052ec9a2e",
            type: "Làm bài kiểm tra",
            content: "Phòng học số 3",
            time: "15:30 - 16:30",
        },
        {
            object_id: "039dd1a0-12e6-41a1-ad5d-59c052ec9a3e",
            type: "Làm bài kiểm tra",
            content: "Phòng học số 3",
            time: "15:30 - 16:30",
        }
    ],
    deadline: [
        {
            excercise_id: "039dd1a0-12e6-41a1-ad5d-59c052ec9a0e",
            title: "Bài kiểm tra chất lượng số 1",
            date: "21/12/2022",
            status: 1
        },
        {
            excercise_id: "039dd1a0-12e6-41a1-ad5d-59c052ec9a0b",
            title: "Bài kiểm tra chất lượng số 2",
            date: "21/12/2022",
            status: 0
        },
        {
            excercise_id: "039dd1a0-12e6-41a1-ad5d-59c052ec9a0y",
            title: "Bài kiểm tra chất lượng số 3",
            date: "21/12/2022",
            status: 1
        }
    ]
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
    async [actionTypes.ELEARNING_STURY_OVERVIEW.LIST]({ commit }, payload) {
        console.log('ELEARNING_STURY_OVERVIEW.LIST');
        try {
            const result = await new Overview(this.$axios)[
                actionTypes.ELEARNING_STURY_OVERVIEW.OVERVIEW_BASE_SERVICE
            ](payload);
            commit(
                mutationTypes.ELEARNING_STUDY_OVERVIEW.SET_ELEARNING_STUDY_OVERVIEW,
                result.data
            );
        } catch (error) {
            console.log(error);
        }
    },

    async [actionTypes.ELEARNING_STURY_OVERVIEW.TIME_TABLE]({ commit }, payload) {
        console.log('ELEARNING_STURY_OVERVIEW.LIST');
        try {
            const result = await new Overview(this.$axios)[
                actionTypes.ELEARNING_STURY_OVERVIEW.TIME_TABLE_BASE_SERVICE
            ](payload);
            commit(
                mutationTypes.ELEARNING_STUDY_OVERVIEW.SET_ELEARNING_STUDY_TIME_TABLE,
                result.data
            );
        } catch (error) {
            console.log(error);
        }
    },

    async [actionTypes.ELEARNING_STURY_OVERVIEW.DEADLINE]({ commit }, payload) {
        console.log('ELEARNING_STURY_OVERVIEW.LIST');
        try {
            const result = await new Overview(this.$axios)[
                actionTypes.ELEARNING_STURY_OVERVIEW.DEADLINE_BASE_SERVICE
            ](payload);
            commit(
                mutationTypes.ELEARNING_STUDY_OVERVIEW.SET_ELEARNING_STUDY_DEADLINE,
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
    [mutationTypes.ELEARNING_STUDY_OVERVIEW.SET_ELEARNING_STUDY_OVERVIEW](state, _data) {
        state.overview = _data;
    },
    [mutationTypes.ELEARNING_STUDY_OVERVIEW.SET_ELEARNING_STUDY_TIME_TABLE](state, _data) {
        state.timeTable = _data;
    },
    [mutationTypes.ELEARNING_STUDY_OVERVIEW.SET_ELEARNING_STUDY_DEADLINE](state, _data) {
        state.deadline = _data;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};