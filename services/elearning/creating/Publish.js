import * as APIs from "~/utils/endpoints";
import BaseService from "~/services/BaseService";

export default class Publish extends BaseService {
  constructor($axios) {
    super($axios, APIs.ELEARNING_CREATING_PUBLISH);
  }

  async postPublish(params) {
    const { data } = await this.$axios({
      url: this.$api,
      method: "POST",
      params,
    });
    return data;
  }
}
