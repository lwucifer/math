import * as mutationTypes from "../utils/mutation-types";
import * as actionTypes from "../utils/action-types";
import auth from "../services/Auth";
import { setToken, setAccessToken } from "../utils/auth";
import { authFire } from "../services/firebase/FirebaseInit";

/**
 * initial state
 */
const state = () => ({
    accountStatus: "",
    token: null,
    access_token: null
});

/**
 * initial getters
 */
const getters = {
    isAuthenticated(state, getters, rootState) {
        return !!state.token;
    },
    token(state) {
        return state.token;
    },
    accessToken(state) {
        return state.access_token;
    }
};

/**
 * initial actions
 */
const actions = {
    async [actionTypes.AUTH.LOGIN]({ commit }, { phone, email, password, g_recaptcha_response }) {
        const result = await new auth(this.$axios).login({
            phone,
            email,
            password,
            g_recaptcha_response
        });
        if (result.success) {
            console.log("Login [REPONSE]", result);
            commit(mutationTypes.AUTH.SET_TOKEN, result.data);
            commit(mutationTypes.AUTH.SET_ACCESS_TOKEN, result.data.access_token);
        }
        return result;
    },

    async [actionTypes.AUTH.REGISTER]({ commit }, payload) {
        const result = await new auth(this.$axios).register(payload);
        // if (result.success) {
        //     console.log("Login [REPONSE]", result);
        //     commit(mutationTypes.AUTH.SET_TOKEN, result.data);
        //     commit(mutationTypes.AUTH.SET_ACCESS_TOKEN, result.data.access_token);
        // }
        return result;
    },

    [actionTypes.AUTH.SENDOTP]({ dispatch, commit }, payload) {
        console.log("VERIFY_WITH_PHONE", payload);
        return authFire
            .signInWithPhoneNumber(payload.phone, payload.g_recaptcha_response)
            .then(result => {
                console.log("auth.signInWithPhoneNumber.result", result);
                // dispatch(actionTypes.USERS.VERIFY, result.verificationId);
            })
            .catch(err => {
                console.log("auth.signInWithPhoneNumber.catch", err);
            });
    },

    async [actionTypes.AUTH.LOGOUT]({ commit }) {
        const result = await auth(this.$axios).logout();
        if (result.success) {
            commit(mutationTypes.AUTH.SET_LOGIN, result.data);
        }
    },

    async [actionTypes.AUTH.STATUS]({ commit }, { phone }) {
        const result = await new auth(this.$axios).status({ phone });
        if (result.success) {
            commit(mutationTypes.AUTH.SET_ACCOUNT_STATUS, result.data);
        }
    },

    async [actionTypes.AUTH.FORGOT_PASSWORD]({ commit }, { firebase_token, password }) {
        const result = await new auth(this.$axios).forgotPassword({
            firebase_token,
            password
        });
        if (result.success) {
            commit(mutationTypes.AUTH.SET_ACCOUNT_STATUS, result.data);
        }
        return result;
    },

    async [actionTypes.AUTH.CHANGE_PASSWORD]({ commit }, { oldPass, newPass, verify_new_pass }) {
        const result = await new auth(this.$axios).changePassword({
            oldPass,
            newPass,
            verify_new_pass
        });
        return result;
    }
};

/**
 * initial mutations
 */
const mutations = {
    [mutationTypes.AUTH.SET_TOKEN](state, token) {
        const renewToken = Object.assign({}, state.token, token);
        state.token = renewToken;
        setToken(renewToken);
    },

    [mutationTypes.AUTH.SET_ACCESS_TOKEN](state, access_token) {
        state.access_token = access_token;
        setAccessToken(access_token);
    },

    [mutationTypes.AUTH.SET_LOGOUT](state) {
        state.loggedUser = null;
    },

    [mutationTypes.AUTH.SET_ACCOUNT_STATUS](state, _status) {
        console.log("huydv", _status);
        state.accountStatus = _status;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};