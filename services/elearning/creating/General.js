import * as APIs from "../../../utils/endpoints";
import BaseService from "../../BaseService";
import { forEach } from "lodash";

export default class General extends BaseService {
  constructor($axios) {
    super($axios, APIs.ELEARNING_CREATING_GENERAL);
  }

  async postWithFormData(payload) {
    let formData = new FormData();
    forEach(payload, function(value, key) {
      formData.append(key, value);
    });
    const { data } = await this.$axios.post(this.$api, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return data;
  }
}
