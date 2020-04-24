import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import TeachingClass from "~/services/elearning/teaching/TeachingClass";

/**
 * initial state
 */
const state = () => ({
  classes: [],
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_TEACHING_CLASS.LIST]({ commit }, payload) {
    try {
      // const result = await new TeachingClass(this.$axios)[actionTypes.BASE.LIST](
      //   payload
      // );
      const result = {
        "code": "200",
        "success": true,
        "data": {
          "content": [
            {
              id: 'id class 1',
              name: 'class 1',
            },
            {
              id: 'id class 2',
              name: 'class 2',
            }
          ],
          "pageable": {
            "sort": {
              "unsorted": false,
              "sorted": true,
              "empty": false
            },
            "page_number": 0,
            "page_size": 10,
            "offset": 0,
            "paged": true,
            "unpaged": false
          },
          "last": true,
          "total_pages": 1,
          "total_elements": 2,
          "first": true,
          "sort": {
            "unsorted": false,
            "sorted": true,
            "empty": false
          },
          "number_of_elements": 2,
          "size": 10,
          "number": 0,
          "empty": true
        },
        "message": "success"
      }
      // set to mutation
      commit(mutationTypes.ELEARNING_TEACHING_CLASS.SET_TEACHING_CLASS_LIST, result);
    } catch (error) {
      console.log("[Teaching classes] list.error", error);
    }
  },
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_TEACHING_CLASS.SET_TEACHING_CLASS_LIST](state, data) {
    console.log("SET_ELEARNING_TEACHING_CLASS_LIST", data);
    state.classes = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
