import * as APIs from "~/utils/endpoints";
import * as actionTypes from "~/utils/action-types";
import BaseService from "../../BaseService";

export default class Submission extends BaseService {
    constructor($axios) {
        super($axios, APIs.ELEARNING_TEACHING_SUBMISSION);
    }
    
    async mark(payload) {
        const { data } = await this.$axios.post(this.$api, payload);
        
        return data;
    }
}