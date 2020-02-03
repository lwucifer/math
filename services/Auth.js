import * as APIs from "../utils/endpoints";
import * as actionTypes from "../utils/action-types";

export default class Auth {
    constructor($axios) {
        this.$axios = $axios;
    }

    async [actionTypes.AUTH.LOGIN](payload) {
        debugger;
        const { phone, password, firebase_token } = payload;
        const { data } = await this.$axios.post(`${APIs.LOGIN}`, {
            phone,
            password,
            firebase_token
        });

        return data;
    }

    async [actionTypes.AUTH.REGISTER](payload) {
        const { email, password } = payload;
        const { data } = await this.$axios.post(`${APIs.REGISTER}`, {
            email,
            password
        });

        return data;
    }

    async [actionTypes.AUTH.LOGOUT]() {
        const { data } = await this.$axios.post(`${APIs.LOGOUT}`);
        return data;
    }

    async [actionTypes.AUTH.SENDOTP](payload) {
        const { phone } = payload;
        const { data } = await this.$axios.post(`${APIs.SEND_OTP}`, {
            phone
        });

        return data;
    }

    async [actionTypes.AUTH.STATUS](payload) {
        debugger;
        const { phone } = payload;
        const { data } = await this.$axios.post(`${APIs.ACCOUNT_STATUS}`, {
            phone
        });

        return data;
    }
}