import * as APIs from "../utils/endpoints";
import * as actionTypes from "../utils/action-types";

export default class Auth {
    constructor($axios) {
        this.$axios = $axios;
    }

    async [actionTypes.AUTH.LOGIN](payload) {
        // debugger;
        const { phone, email, password, g_recaptcha_response } = payload;
        const { data } = await this.$axios.post(`${APIs.LOGIN}`, {
            phone,
            email,
            password,
            g_recaptcha_response
        });

        return data;
    }

    async [actionTypes.AUTH.REGISTER](payload) {
        const { data } = await this.$axios.post(`${APIs.REGISTER}`, payload);
        return data;
    }

    async [actionTypes.AUTH.LOGOUT]() {
        const { data } = await this.$axios.post(`${APIs.LOGOUT}`);
        return data;
    }

    // async [actionTypes.AUTH.SENDOTP](payload) {
    //     const { data } = await this.$axios.post(
    //         `${APIs.REGISTER_VALIDATE}`,
    //         payload
    //     );

    //     return data;
    // }

    async [actionTypes.AUTH.STATUS](payload) {
        const { data } = await this.$axios.post(
            `${APIs.REGISTER_VALIDATE}`,
            payload
        );

        return data;
    }

    async [actionTypes.AUTH.FORGOT_PASSWORD](payload) {
        // debugger;
        const { firebase_token, password } = payload;
        const { data } = await this.$axios.post(`${APIs.FORGOT_PASSWORD}`, {
            firebase_token,
            password
        });

        return data;
    }

    async [actionTypes.AUTH.CHANGE_PASSWORD](payload) {
        // debugger;
        const { oldPass, newPass, verify_new_pass } = payload;
        const { data } = await this.$axios.post(`${APIs.CHANGE_PASSWORD}`, {
            oldPass,
            newPass,
            verify_new_pass
        });

        return data;
    }
}