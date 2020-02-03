import * as mutationTypes from "../utils/mutation-types";
import * as actionTypes from "../utils/action-types";
import auth from "../services/Auth";

/**
 * initial state
 */
const state = () => ({
    loggedUser: null,
    accountStatus: ""
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
    async [actionTypes.AUTH.LOGIN]({ commit }, { phone_number, password, firebase_token }) {
        const result = await new auth(this.$axios).login({
            phone_number,
            password,
            firebase_token
        });
        if (result.success) {
            commit(mutationTypes.AUTH.SET_LOGIN, result);
        }
        return result;
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
    }
};

/**
 * initial mutations
 */
const mutations = {
    [mutationTypes.AUTH.SET_LOGIN](state, _loggedUser) {
        console.log("huydv", _loggedUser);
        state.loggedUser = _loggedUser;
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