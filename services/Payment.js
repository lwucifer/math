import * as APIs from "../utils/endpoints";
import BaseService from "../BaseService";
import * as actionTypes from "~/utils/action-types";

export default class Payment extends BaseService {
    constructor($axios) {
        super($axios, null);
    }

    /**
     * Step 2: request to get hashkey
     * @param {*} payload 
     */
    async [actionTypes.PAYMENT.POST_HASHKEY](payload) {
        console.log("[Payment][POST_HASHKEY]", payload);
        const { data } = await this.$axios.post(`${APIs.PAYMENT_HASHKEY}`, payload);
        const result = data ? data : {};
        return result;
    }

    /**
     * Step 7: validate result from OnePay and update result
     * @param {*} payload 
     */
    async [actionTypes.PAYMENT.VALIDATE_TRANSACTION](payload) {
        console.log("[Payment][VALIDATE_TRANSACTION]", payload);
        const { data } = await this.$axios.post(`${APIs.PAYMENT_VALIDATE_TRANSACTION}`, payload);
        const result = data ? data : {};
        return result;
    }
    /**
     * Step 1: click buy elearning
     * @param {*} payload 
     */
    async [actionTypes.PAYMENT.POST_ORDER](payload) {
        console.log("[Payment][VALIDATE_TRANSACTION]", payload);
        const { data } = await this.$axios.post(`${APIs.PAYMENT_CREATE_ORDER}`, payload);
        const result = data ? data : {};
        return result;
    }
}
