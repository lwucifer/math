import BaseService from "~/services//BaseService";
import * as APIs from "~/utils/endpoints";
import { ELEARNING_STUDY_EXERCISE } from "~/utils/action-types";

export default class Exercise extends BaseService {
  constructor($axios) {
    super($axios, APIs.STUDY_EXERCISE_SUBMISSION);
  }

  async [ELEARNING_STUDY_EXERCISE.LIST_QUESTION](params) {
    const { data } = await this.$axios.request({
      url: APIs.STUDY_EXERCISE_QUESTIONS,
      method: "GET",
      params,
    });
    return data;
  }

  async [ELEARNING_STUDY_EXERCISE.LIST_RESULT](params) {
    const { data } = await this.$axios.request({
      url: APIs.STUDY_EXERCISE_RESULT,
      method: "GET",
      params,
    });
    return data;
  }



}
