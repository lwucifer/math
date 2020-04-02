import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Exercise from "~/services/elearning/teaching/Exercise";

/**
 * initial state
 */
const state = () => ({
  exercises: [],
  currentExercise: {}
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_TEACHING_EXERCISE.LIST]({ commit }, payload) {
    try {
      // const result = await new Exercise(this.$axios)[actionTypes.BASE.LIST](
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
      commit(mutationTypes.ELEARNING_TEACHING_EXERCISE.SET_TEACHING_EXERCISE_LIST, result);
    } catch (error) {
      console.log("[Teaching exercises] list.error", error);
    }
  },
  
  async [actionTypes.ELEARNING_TEACHING_EXERCISE.DETAIL]({ commit }, id) {
    try {
      // const result = await new Exercise(this.$axios)[actionTypes.BASE.DETAIL](
      //   id
      // );
      const result = {
        code: "200",
        success: true,
        data: {
          id: "e698a8ea-4e12-11ea-b77f-2e728ce88125",
          type: 'CHOICE',
          title: "Bài tập toán đại số lớp 11",
          lesson_id: 11,
          elearning_id: 10,
          questions: [
            {
              id: 13,
              name: "Câu hỏi toán học",
              content: "Có bao nhiêu số tự nhiên",
              index: 1,
              point: 0.5,
              answers: [
                {
                  id: 23,
                  name: "Câu trả lời 1",
                  answer: "20 số",
                  correct: false
                },
                {
                  id: 24,
                  name: "Câu trả lời 2",
                  answer: "30 số",
                  correct: false
                },
                {
                  id: 25,
                  name: "Câu trả lời 3",
                  answer: "Vô số",
                  correct: true
                },
                {
                  id: 26,
                  name: "Câu trả lời 4",
                  answer: "25 số",
                  correct: false
                }
              ]
            },
            {
              id: 14,
              name: "Câu hỏi toán học nâng cao",
              content: "Có bao nhiêu số thập phân",
              index: 3,
              point: 0.5,
              answers: [
                {
                  id: 13,
                  name: "Câu trả lời 1",
                  answer: "12 số",
                  correct: false
                },
                {
                  id: 14,
                  name: "Câu trả lời 2",
                  answer: "130 số",
                  correct: false
                },
                {
                  id: 15,
                  name: "Câu trả lời 3",
                  answer: "23 số",
                  correct: false
                },
                {
                  id: 16,
                  name: "Câu trả lời 4",
                  answer: "Vô số",
                  correct: true
                }
              ]
            }
          ]
        },
        message: "success"
      }
      commit(mutationTypes.ELEARNING_TEACHING_EXERCISE.SET_TEACHING_EXERCISE_DETAIL, result.data)
      return result;
    } catch (error) {
      console.log("[Teaching exercise] detail.error", error);
    }
  },
  
  async [actionTypes.ELEARNING_CREATING_EXERCISES.EDIT]({ commit }, payload) {
    try {
      const result = await new Exercise(this.$axios)[actionTypes.BASE.EDIT](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_EDIT, result);
    } catch (error) {
      console.log("[Teaching exercises] edit.error", error);
    }
  },
  
  async [actionTypes.ELEARNING_CREATING_EXERCISES.DELETE]({ commit }, payload) {
    try {
      const result = await new Exercise(this.$axios)[actionTypes.BASE.DELETE](
        payload
      );
      // set to mutation
      // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_DELETE, result);
    } catch (error) {
      console.log("[Teaching exercises] delete.error", error);
    }
  }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_TEACHING_EXERCISE.SET_TEACHING_EXERCISE_LIST](state, exercises) {
    console.log("SET_ELEARNING_TEACHING_EXERCISES_LIST", exercises);
    state.exercises = exercises;
  },
  [mutationTypes.ELEARNING_TEACHING_EXERCISE.SET_TEACHING_EXERCISE_DETAIL](state, exercise) {
    console.log("SET_ELEARNING_TEACHING_EXERCISES_LIST", exercise);
    state.currentExercise = exercise;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
