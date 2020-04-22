import * as actionTypes from "~/utils/action-types";
import { forEach } from "lodash";

export default class BaseService {
  constructor($axios, $api) {
    this.$axios = $axios;
    this.$api = $api;
  }

  async [actionTypes.BASE.DELETE_PAYLOAD](payload) {
    const { data } = await this.$axios.delete(this.$api, payload);
    return data;
  }

  async [actionTypes.BASE.LIST](payload) {
    const { data } = await this.$axios.get(this.$api, payload);

    const result = data ? data : {};
    // console.log("[BASE.LIST] result", result);
    return result;
  }

  async [actionTypes.BASE.EDIT](id, payload) {
    // console.log("[BaseService] params", id, payload);
    const { data } = await this.$axios.put(`${this.$api}/${id}`, payload);

    return data;
  }

  async [actionTypes.BASE.ADD](payload) {
    const { data } = await this.$axios.post(this.$api, payload);

    return data;
  }

  async [actionTypes.BASE.DELETE](id) {
    const { data } = await this.$axios.delete(`${this.$api}/${id}`);
    return data;
  }

  async [actionTypes.BASE.DETAIL](id) {
    const { data } = await this.$axios.get(`${this.$api}/${id}`);

    const result = data ? data : {};

    // console.log("[BASE.DETAIL]", result);

    return result;
  }

  async [actionTypes.BASE.EDIT_PAYLOAD](payload) {
    // console.log("[BaseService] params", payload);
    const { data } = await this.$axios.put(this.$api, payload);

    return data;
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

  async putWithFormData(payload) {
    let formData = new FormData();
    forEach(payload, function(value, key) {
      formData.append(key, value);
    });
    const { data } = await this.$axios.put(this.$api, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return data;
  }
  
  async postWithRawJson(payload) {
    const { data } = await this.$axios.post(this.$api, payload, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return data;
  }
  
  async deleteWithRawJson(payload) {
    const { data } = await this.$axios.delete(this.$api, {
      headers: {
        "Content-Type": "application/json"
      },
      data: payload
    });

    return data;
  }
  
  async getWithMiddleID(payload, id, end) {
    const { data } = await this.$axios.get(`${this.$api}/${id}/${end}`, payload);

    const result = data ? data : {};

    return result;
  }
}
