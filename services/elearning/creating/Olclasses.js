import * as APIs from "~/utils/endpoints";
import BaseService from "~/services/BaseService";

export default class Olclasses extends BaseService {
  constructor($axios) {
    super($axios, APIs.ELEARNING_CREATING_OLCLASSES);
  }

  async deleteClass(options) {
    const { data } = await this.$axios.delete(`${this.$api}`, options);
    return data;
  }
}
