import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Submission from "~/services/elearning/teaching/Submission";

// faked data
const LIST = [
  {
    id: "submission6bf40-25c7-46ad-a5f0-a73b6b5f3269",
    student: "Nguyễn Văn A",
    class: "6B",
    times: 5,
    timestamp: "2020-03-24 16:49:25",
    questions: 30,
    corrects: 20,
    mark: 7.8,
    result: 1
  },
  {
    id: "2ce6bf40-25c7-46ad-a5f0-a73b6b5f3268",
    student: "Nguyễn Văn B",
    class: "6B",
    times: 5,
    timestamp: "2020-03-24 16:49:25",
    questions: 30,
    corrects: 20,
    mark: 9.0,
    result: 1
  },
  {
    id: "2ce6bf40-25c7-46ad-a5f0-a73b6b5f3267",
    student: "Nguyễn Văn A",
    class: "6B",
    times: 5,
    timestamp: "2020-04-24 17:49:25",
    questions: 30,
    corrects: 20,
    mark: 7.0,
    result: 1
  },
  {
    id: "2ce6bf40-25c7-46ad-a5f0-a73b6b5f3266",
    student: "Nguyễn Văn A",
    class: "6B",
    times: 5,
    timestamp: "2020-03-24 16:49:25",
    questions: 30,
    corrects: 20,
    mark: 7.8,
    result: 1
  },
]

/**
 * initial state
 */
const state = () => ({
  submissions: [],
  currentSubmission: {}
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.ELEARNING_TEACHING_SUBMISSION.LIST]({ commit }, payload) {
    try {
      // const result = await new Submission(this.$axios)[actionTypes.BASE.LIST](
      //   payload
      // );
      
      const result = {
        code: "200",
        success: true,
        data: {
          content: LIST,
          page: {
            totalElements: 4,
            last: true,
            totalPages: 1,
            size: 10,
            number: 0,
            first: true,
            numberOfElements: 4
          }
        },
        message: "success"
      }
      // set to mutation
      commit(mutationTypes.ELEARNING_TEACHING_SUBMISSION.SET_TEACHING_SUBMISSION_LIST, result);
    } catch (error) {
      console.log("[Teaching submission] list.error", error);
    }
  },
  
  async [actionTypes.ELEARNING_TEACHING_SUBMISSION.DETAIL]({ commit }, id) {
    try {
      // const result = await new Submission(this.$axios)[actionTypes.BASE.DETAIL](
      //   id
      // );
      const result = {
        code: "200",
        success: true,
        data: {
          id: "submitssione698a8ea-4e12-11ea-b77f-2e728ce88125",
          student: 'Nguyễn Đức Anh',
          class: "6B",
          start_time: "2020-03-24 16:49:25",
          duration: "3600",
          timestamp: "2020-03-24 18:49:25",
          questions: 50,
          corrects: 34,
          mark: 8.6,
          note: "Bài làm tốt",
          to_passed: false,
          result: 1,
          contents: [
            {
              question_id: "14525255252",                                    // mã câu hỏi
              question_name: "Tên câu hỏi",                              // tên câu hỏi
              student_answer: "Câu trả lời học sinh",                              // câu trả lời của học viên
              correct_answer: "Câu trả lời đúng",                               // câu trả lời đúng
            }
          ]
        },
        message: "success"
      }
      commit(mutationTypes.ELEARNING_TEACHING_SUBMISSION.SET_TEACHING_SUBMISSION_DETAIL, result.data);
      return result;
    } catch (error) {
      console.log("[Teaching submission] detail.error", error);
    }
  },
  
  // async [actionTypes.ELEARNING_CREATING_EXERCISES.EDIT]({ commit }, payload) {
  //   try {
  //     const result = await new Exercise(this.$axios)[actionTypes.BASE.EDIT](
  //       payload
  //     );
  //     // set to mutation
  //     // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_EDIT, result);
  //   } catch (error) {
  //     console.log("[Teaching exercises] edit.error", error);
  //   }
  // },
  
  // async [actionTypes.ELEARNING_CREATING_EXERCISES.DELETE]({ commit }, payload) {
  //   try {
  //     const result = await new Exercise(this.$axios)[actionTypes.BASE.DELETE](
  //       payload
  //     );
  //     // set to mutation
  //     // commit(mutationTypes.CREATING_ANSWER.SET_CREATING_ANSWER_DELETE, result);
  //   } catch (error) {
  //     console.log("[Teaching exercises] delete.error", error);
  //   }
  // }
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.ELEARNING_TEACHING_SUBMISSION.SET_TEACHING_SUBMISSION_LIST](state, submissions) {
    console.log("SET_ELEARNING_TEACHING_SUBMISSION_LIST", submissions);
    state.submissions = submissions;
  },
  
  [mutationTypes.ELEARNING_TEACHING_SUBMISSION.SET_TEACHING_SUBMISSION_DETAIL](state, submission) {
    console.log("SET_ELEARNING_TEACHING_SUBMISSION_DETAIL", submission);
    state.currentSubmission = submission;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
