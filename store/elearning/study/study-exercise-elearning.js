import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import { RESPONSE_SUCCESS } from "~/utils/config";
import ExerciseElearning from "~/services/elearning/study/ExerciseElearning";
import { get } from "lodash";

/**
 * initial state
 */
const state = () => ({
  exerciseElearnings: {},
});

/**
 * initial getters
 */
const getters = {
  //
};

const actions = {
  /**
   * Get elearnings that have exercise/test of student
   *
   */
  async [actionTypes.ELEARNING_STUDY_EXERCISE_ELEARNING.LIST](
    { commit },
    payload
  ) {
    try {
      // const result = await new ExerciseElearning(this.$axios)[
      //   actionTypes.BASE.LIST
      //   ](payload);
      const result = {
        "code": "200",
        "success": true,
        "data": {
          "content": [
            {
              "id": "28f5e3b3-48ab-42e0-b838-cb0c17bbaaa8",
              "name": "sdsdfsdf",
              "type": "COURSE",
              "exercises": 1,
              "not_submit": 12,
              "passed": 11,
              "failed": 0,
              "pending": 1,
              "created": "2020-05-29 04:00:12"
            },
            {
              "id": "28f5e3b3-48ab-42e0-b838-cb0c17bbaaa8",
              "name": "sdsdfsdf",
              "type": "COURSE",
              "exercises": 1,
              "not_submit": 12,
              "passed": 11,
              "failed": 0,
              "pending": 1,
              "created": "2020-05-29 04:00:12"
            },
            {
              "id": "28f5e3b3-48ab-42e0-b838-cb0c17bbaaa8",
              "name": "sdsdfsdf",
              "type": "LECTURE",
              "exercises": 1,
              "not_submit": 12,
              "passed": 11,
              "failed": 0,
              "pending": 1,
              "created": "2020-05-29 04:00:12"
            },
            {
              "id": "28f5e3b3-48ab-42e0-b838-cb0c17bbaaa8",
              "name": "bài giảng bảng cửu chương",
              "type": "LECTURE",
              "exercises": 1,
              "not_submit": 12,
              "passed": 11,
              "failed": 0,
              "pending": 1,
              "created": "2020-05-29 04:00:12"
            },
          ],
          "page": {
            "total_elements": 7,
            "last": true,
            "total_pages": 1,
            "size": 10,
            "number": 0,
            "first": true,
            "number_of_elements": 7
          }
        },
        "message": "success"
      }
      if (result.success == RESPONSE_SUCCESS) {
        commit(
          mutationTypes.ELEARNING_STUDY_EXERCISE_ELEARNING
            .SET_ELEARNING_STUDY_EXERCISE_ELEARNING_LIST,
          result.data
        );
      }
    } catch (error) {
      console.log(
        "[Elearning ELEARNING_STUDY_EXERCISE_ELEARNING] LIST_ELEARNING.error",
        error
      );
    }
  },
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_STUDY_EXERCISE_ELEARNING.SET_ELEARNING_STUDY_EXERCISE_ELEARNING_LIST](state, data) {
    console.log("SET_ELEARNING_EXERCISE_ELEARNING_LIST", data);
    state.exerciseElearnings = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
