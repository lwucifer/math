import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Vote from "~/services/elearning/teaching/Vote";

/**
 * initial state
 */
const state = () => ({
  votes: [],
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_TEACHING_VOTE.LIST]({ commit }, payload) {
    try {
      // const result = await new Vote(this.$axios)[actionTypes.BASE.LIST](
      //   payload
      // );
      
      const result = {
        code: "200",
        success: true,
        data: {
          content: [
            {
              "id": "2ce6bf40-25c7-46ad-a5f0-a73b6b5f3269",
              "title": "Bài tập số 1 tính bất biến của hàm số",
              "type": "CHOICE",
              "elearning_name": "Khóa học của bài tập 1",
              "lesson_name": "Bài giảng của bài tập 1",
              "participants": 10,
              "created_at": "2020-03-24 16:49:25"
            },
            {
              "id": "2ce6bf40-25c7-46ad-a5f0-a73b6b5f3268",
              "title": "Bài tập số 2",
              "type": "ESSAY",
              "elearning_name": "Khóa học của bài tập 2",
              "lesson_name": "Bài giảng của bài tập 2",
              "participants": 10,
              "created_at": "2020-03-24 16:49:25"
            },
            {
              "id": "2ce6bf40-25c7-46ad-a5f0-a73b6b5f3267",
              "title": "Bài tập số 3",
              "type": "ESSAY",
              "elearning_name": "Khóa học của bài tập 3",
              "lesson_name": "Bài giảng của bài tập 3",
              "participants": 10,
              "created_at": "2020-03-24 16:49:25"
            },
            {
              "id": "2ce6bf40-25c7-46ad-a5f0-a73b6b5f3266",
              "title": "Bài tập số 4",
              "type": "ESSAY",
              "elearning_name": "Khóa học của bài tập 4",
              "lesson_name": "Bài giảng của bài tập 4",
              "participants": 12,
              "created_at": "2020-03-24 16:49:25"
            },
            {
              "id": "2ce6bf40-25c7-46ad-a5f0-a73b6b5f3265",
              "title": "Bài tập số 5",
              "type": "CHOICE",
              "elearning_name": "Khóa học của bài tập 5",
              "lesson_name": "Bài giảng của bài tập 5",
              "participants": 25,
              "created_at": "2020-03-24 16:49:24"
            },
          ],
          "page": {
            "totalElements": 4,
            "last": true,
            "totalPages": 1,
            "size": 10,
            "number": 0,
            "first": true,
            "numberOfElements": 4
          }
        },
        "message": "success"
      }
      // set to mutation
      commit(mutationTypes.ELEARNING_TEACHING_VOTE.SET_TEACHING_VOTE_LIST, result);
    } catch (error) {
      console.log("[Teaching exercises] list.error", error);
    }
  },
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_TEACHING_VOTE.SET_TEACHING_VOTE_LIST](state, votes) {
    console.log("SET_ELEARNING_TEACHING_VOTE_LIST", votes);
    state.votes = votes;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
