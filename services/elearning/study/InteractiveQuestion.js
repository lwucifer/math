import * as APIs from "~/utils/endpoints";
import BaseService from "~/services//BaseService";

export default class InteractiveQuestion extends BaseService {
  constructor($axios) {
    super($axios, APIs.STUDY_INTERACTIVE_QUESTION);
  }

  async addQuestion(params) {
    const { data } = await this.$axios.request({
      url: APIs.STUDY_INTERACTIVE_QUESTION_ADD,
      method: "POST",
      params,
    });
    return data;
  }
}
