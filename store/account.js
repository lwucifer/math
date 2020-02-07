import * as actionTypes from "../utils/action-types";
import * as mutationTypes from "../utils/mutation-types";
import Personal from "../services/account/Personal";
import Link from "../services/account/Link";
import Transactions from "../services/account/Transactions";
import Revenue from "../services/account/Revenue";
import Earning from "../services/account/Earning";
/**
 * initial state
 */
const state = () => ({
    personalList: {},
    transactionsList: {},
    revenueList: {},
    earningList: {}
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
            const result = await new Personal(this.$axios)[actionTypes.BASE.DETAIL](
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
    async [actionTypes.ACCOUNT_PERSONAL.EDIT_PHONE]({ commit }, payload) {
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
    },
    async [actionTypes.ACCOUNT_LINK.ADD]({ commit }, payload) {
        try {
            const result = await new Link(this.$axios)[actionTypes.BASE.ADD](payload);
            console.log("[Link] add", result);
            return result;
        } catch (err) {
            console.log("[Link] add.err", err);
            return err;
        }
    },
    async [actionTypes.ACCOUNT_TRANSACTIONS.LIST]({ commit }, payload) {
        try {
            const result = await new Link(this.$axios)[actionTypes.BASE.LIST](
                payload
            );
            console.log("[Link] list", result);
            // set to mutation
            commit(
                mutationTypes.ACCOUNT_TRANSACTIONS.SET_ACCOUNT_TRANSACTIONS_LIST,
                result
            );
        } catch (err) {
            console.log("[Link] list.err", err);
            return err;
        }
    },
    async [actionTypes.ACCOUNT_REVENUE.LIST]({ commit }, payload) {
        try {
            const result = await new Revenue(this.$axios)[actionTypes.BASE.LIST](
                payload
            );
            console.log("[Revenue] list", result);
            // set to mutation
            commit(mutationTypes.ACCOUNT_REVENUE.SET_ACCOUNT_REVENUE_LIST, result);
        } catch (err) {
            console.log("[Revenue] list.err", err);
            return err;
        }
    },
    async [actionTypes.ACCOUNT_EARNING.LIST]({ commit }, payload) {
        try {
            const result = await new Earning(this.$axios)[actionTypes.BASE.LIST](
                payload
            );
            console.log("[Earning] list", result);
            // set to mutation
            commit(mutationTypes.ACCOUNT_EARNING.SET_ACCOUNT_EARNING_LIST, result);
        } catch (err) {
            console.log("[Earning] list.err", err);
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
    },
    [mutationTypes.ACCOUNT_TRANSACTIONS.SET_ACCOUNT_TRANSACTIONS_LIST](
        state,
        _transactionsList
    ) {
        console.log("SET_ACCOUNT_TRANSACTIONS_LIST", _transactionsList);
        state.transactionsList = _transactionsList;
    },
    [mutationTypes.ACCOUNT_REVENUE.SET_ACCOUNT_REVENUE_LIST](
        state,
        _revenueList
    ) {
        console.log("SET_ACCOUNT_REVENUE_LIST", _revenueList);
        state.revenueList = _revenueList;
    },
    [mutationTypes.ACCOUNT_EARNING.SET_ACCOUNT_EARNING_LIST](
        state,
        _earningList
    ) {
        console.log("SET_ACCOUNT_EARNING_LIST", _earningList);
        state.earningList = _earningList;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};