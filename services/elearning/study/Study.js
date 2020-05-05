import * as APIs from "~/utils/endpoints";
import BaseService from "~/services//BaseService";

export default class Study extends BaseService {
  constructor($axios) {
    super($axios, APIs.STUDY_MY_ELEARNING);
  }

  async addAnswerOfQuestion(params) {
    const { data } = await this.$axios.request({
      url: APIs.STUDY_QUESTION_ADD_ANSWER,
      method: "POST",
      params,
    });
    return data;
  }
}
