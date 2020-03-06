import * as APIs from "../../utils/endpoints";
import BaseService from "../BaseService";
import { SOCIAL_COMMENTS as ACTION_TYPE_SOCIAL_COMMENTS } from "~/utils/action-types";

export default class Comments extends BaseService {
    constructor($axios) {
        super($axios, APIs.COMMENTS);
    }

    async [ACTION_TYPE_SOCIAL_COMMENTS.LIST_CHILDREN](payload) {
        const { data } = await this.$axios.get(`${this.$api}/children`, payload);
        const result = data ? data : {};
        return result;
    }
}
