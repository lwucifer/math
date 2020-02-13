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
    access_token: null,
    firebaseToken: ""
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
            .signInWithPhoneNumber(payload.phone, payload.appVerifier)
            .then(function(confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                return confirmationResult;
            })
            .catch(function(error) {
                console.log("error", error);
                return error;
            });
    },

    [actionTypes.AUTH.VERIFY_OTP]({ dispatch, commit }, payload) {
        if (window.confirmationResult) {
            return confirmationResult
                .confirm(payload)
                .then(result => {
                    // User signed in successfully.
                    const user = result.user;
                    console.log("user", user);
                    commit(mutationTypes.AUTH.SET_FIREBASE_TOKEN, user.ma);
                    return result;
                    // ...
                })
                .catch(error => {
                    // User couldn't sign in (bad verification code?)
                    // ...
                    return error;
                });
        }
    },

    async [actionTypes.AUTH.RESET_PASSWORD_REQUEST]({ commit }, payload) {
        const result = await new auth(this.$axios).resetPasswordRequest(payload);
        return result;
    },

    async [actionTypes.AUTH.LOGOUT]({ commit }) {
        const result = await auth(this.$axios).logout();
        if (result.success) {
            commit(mutationTypes.AUTH.SET_LOGIN, result.data);
        }
    },

    async [actionTypes.AUTH.STATUS]({ commit }, payload) {
        const result = await new auth(this.$axios).status(payload);
        return result;
    },

    async [actionTypes.AUTH.FORGOT_PASSWORD]({ commit }, payload) {
        const result = await new auth(this.$axios).forgotPassword(payload);
        return result;
    },

    async [actionTypes.AUTH.CHANGE_PASSWORD]({ commit }, payload) {
        const result = await new auth(this.$axios).changePassword(payload);
        return result;
    },
    async [actionTypes.AUTH.VERIFY_EMAIL]({ commit }, payload) {
        const result = await new auth(this.$axios).verifyEmail(payload);
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
    },
    [mutationTypes.AUTH.SET_FIREBASE_TOKEN](state, _firebaseToken) {
        console.log("firebase Token", _firebaseToken);
        state.firebaseToken = _firebaseToken;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};