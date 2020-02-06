import * as actionTypes from "../utils/action-types";
import * as mutationTypes from "../utils/mutation-types";
import Personal from "../services/account/Personal";
import Link from "../services/account/Link";
/**
 * initial state
 */
const state = () => ({
    personalList: {}
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
    async [actionTypes.ACCOUNT_PERSONAL.LIST]({ commit }, payload) {
        try {
            const result = await new Personal(this.$axios)[actionTypes.BASE.LIST](
                payload
            );
            console.log("[Personal] list", result);
            // set to mutation
            commit(mutationTypes.ACCOUNT_PERSONAL.SET_ACCOUNT_PERSONAL_LIST, result);
        } catch (err) {
            console.log("[Personal] list.err", err);
            return err;
        }
    },
    async [actionTypes.ACCOUNT_PERSONAL.EDIT_AVATAR]({ commit }, payload) {
        try {
            const result = await new Personal(this.$axios)[actionTypes.BASE.EDIT](
                payload
            );
            console.log("[Personal] edit", result);
        } catch (err) {
            console.log("[Personal] edit.err", err);
            return err;
        }
    },
    async [actionTypes.ACCOUNT_PERSONAL.DELETE_AVATAR]({ commit }, payload) {
        try {
            const result = await new Personal(this.$axios)[actionTypes.BASE.DELETE](
                payload
            );
            console.log("[Personal] delete", result);
            return result;
        } catch (err) {
            console.log("[Personal] delete.err", err);
            return err;
        }
    },
    async [actionTypes.ACCOUNT_PERSONAL.EDIT_COVER]({ commit }, payload) {
        try {
            const result = await new Personal(this.$axios)[actionTypes.BASE.EDIT](
                paload
            );
            console.log("[Personal] edit", result);
            return result;
        } catch (err) {
            console.log("[Personal] edit.err", err);
            return err;
        }
    },
    async [actionTypes.ACCOUNT_PERSONAL.DELETE_COVER]({ commit }, payload) {
        try {
            const result = await new Personal(this.$axios)[actionTypes.BASE.DELETE](
                payload
            );
            console.log("[Personal] delete", result);
            return result;
        } catch (err) {
            console.log("[Personal] delete.err", err);
            return err;
        }
    },
    async [actionTypes.ACCOUNT_LINK.LIST]({ commit }, payload) {
        try {
            const result = await new Link(this.$axios)[actionTypes.BASE.LIST](
                payload
            );
            console.log("[Link] list", result);
            // set to mutation
            commit(mutationTypes.ACCOUNT_LINK.SET_ACCOUNT_LINK_LIST, result);
        } catch (err) {
            console.log("[Link] list.err", err);
            return err;
        }
    }
};

/**
 * initial mutations
 */
const mutations = {
    [mutationTypes.ACCOUNT_PERSONAL.SET_ACCOUNT_PERSONAL_LIST](
        state,
        _personalList
    ) {
        console.log("SET_ACCOUNT_PERSONAL_LIST", _personalList);
        state.personalList = _personalList;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};