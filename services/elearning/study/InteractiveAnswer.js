import * as APIs from "~/utils/endpoints";
import BaseService from "~/services//BaseService";

export default class InteractiveAnswer extends BaseService {
  constructor($axios) {
    super($axios, APIs.STUDY_QUESTION_ADD_ANSWER);
  }

  async getAnswers(params) {
    // debugger
    const { data } = await this.$axios.request({
      url: APIs.STUDY_QUESTION_ANSWERS,
      method: "GET",
      params,
    });
    return data.data;
  }

  async addAnswerOfQuestion(params, image = "") {
    let formData = new FormData();
    formData.append("image", image);

    let options = {
      url: APIs.STUDY_QUESTION_ADD_ANSWER,
      method: "POST",
      params,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    if (image) options.data = formData;

    const { data } = await this.$axios.request(options);

    return data;
  }

  async likeAnswer(payload) {
    const { data } = await this.$axios.request({
      url: APIs.STUDY_QUESTION_LIKE_ANSWER,
      method: "POST",
      data: payload,
    });
    return data;
  }

}
