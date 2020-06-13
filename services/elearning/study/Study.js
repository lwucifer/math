import * as APIs from "~/utils/endpoints";
import BaseService from "~/services//BaseService";

export default class Study extends BaseService {
  constructor($axios) {
    super($axios, APIs.STUDY_MY_ELEARNING);
  }

  async addAnswerOfQuestion(params, image = "") {
    let formData = new FormData();
    formData.append("content", params.content);
    formData.append("question_id", params.question_id);
    formData.append("image", image);

    let options = {
      url: APIs.STUDY_QUESTION_ADD_ANSWER,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    options.data = formData;

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

  async studyLesson(elearning_id, lesson_id) {
    const { data } = await this.$axios.request({
      url: `${APIs.STUDY_LESSON}/elearning/${elearning_id}/lesson/${lesson_id}/vod`,
      method: "GET",
    });
    return data;
  }
}
