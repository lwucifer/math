import * as actionTypes from "../utils/action-types";
import * as mutationTypes from "../utils/mutation-types";
import * as APIs from "../utils/endpoints";
import Personal from "../services/account/Personal";
import Link from "../services/account/Link";
import Transactions from "../services/account/Transactions";
import Revenue from "../services/account/Revenue";
import Earning from "../services/account/Earning";
import UpdateAvatar from "../services/account/UpdateAvatar";
import UpdateCover from "../services/account/UpdateCover";
import Profile from "../services/account/Profile";
import FriendInvite from "~/services/social/Friendinvite";
import Withdrawals from "~/services/account/Withdrawals";
/**
 * initial state
 */
const state = () => ({
    personalList: {},
    transactionsList: {},
    revenueList: {},
    earningList: {},
    linkList: {},
    profileList: {},
    inviteList: {},
    withdrawalsList:{}
});

/**
 * initial getters
 */
const getters = {
    accountRole(state) {
        return state.profileList ? state.profileList.role : []
    }
};

/**
 * initial actions
 */
const actions = {
    async [actionTypes.ACCOUNT_PERSONAL.LIST]({ commit }, payload) {
        try {
            const result = await new Personal(this.$axios)[actionTypes.BASE.DETAIL](
                payload
            );
            console.log("[Personal] list", result.data);
            // set to mutation
            commit(
                mutationTypes.ACCOUNT_PERSONAL.SET_ACCOUNT_PERSONAL_LIST,
                result.data
            );
            return result;
        } catch (err) {
            console.log("[Personal] list.err", err);
            return err;
        }
    },
    async [actionTypes.ACCOUNT_PERSONAL.EDIT]({ commit }, payload) {
        try {
            const result = await new Personal(this.$axios)[
                actionTypes.BASE.EDIT_PAYLOAD
            ](payload);
            console.log("[Personal] edit", result);
            return result;
        } catch (err) {
            console.log("[Personal] edit.err", err);
            return err;
        }
    },
    async [actionTypes.ACCOUNT_PERSONAL.EDIT_EMAIL]({ commit }, payload) {
        try {
            const { data } = await this.$axios.post(APIs.CHECK_EMAIL, payload);
            return data;
        } catch (err) {
            console.log("[SYSTEM ROLE] err", err);
            return err;
        }
    },
    async [actionTypes.ACCOUNT_PERSONAL.VERIFY_OTP_EMAIL]({ commit }, payload) {
        try {
            const { data } = await this.$axios.post(APIs.VERIFY_OTP_EMAIL, payload);
            return data;
        } catch (err) {
            console.log("[SYSTEM ROLE] err", err);
            return err;
        }
    },
    async [actionTypes.ACCOUNT_PERSONAL.UPDATE_PHONE]({ commit }, payload) {
        try {
            const { data } = await this.$axios.put(APIs.UPDATE_PHONE, payload);
            return data;
        } catch (err) {
            console.log("[SYSTEM ROLE] err", err);
            return err;
        }
    },
    async [actionTypes.ACCOUNT_PERSONAL.EDIT_AVATAR]({ commit }, payload) {
        try {
            const result = await new UpdateAvatar(this.$axios)[
                actionTypes.BASE.EDIT_PAYLOAD
            ](payload);
            console.log("[Personal] edit", result);
            return result;
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
            const result = await new UpdateCover(this.$axios)[
                actionTypes.BASE.EDIT_PAYLOAD
            ](payload);
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
            console.log("[Transactions] add.err", err);
            return err;
        }
    },
    async [actionTypes.ACCOUNT_TRANSACTIONS.LIST]({ commit }, payload) {
        try {
            const result = await new Transactions(this.$axios)[actionTypes.BASE.LIST](
                payload
            );
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
    },
    async [actionTypes.ACCOUNT_WITHDRAWALS.LIST]({ commit }, payload) {
        try {
            const result = await new Withdrawals(this.$axios)[actionTypes.BASE.LIST](
                payload
            );
            console.log("[Withdrawals] list", result);
            // set to mutation
            commit(mutationTypes.ACCOUNT_WITHDRAWALS.SET_ACCOUNT_WITHDRAWALS, result);
        } catch (err) {
            console.log("[Withdrawals] list.err", err);
            return err;
        }
    },
    async [actionTypes.ACCOUNT_PROFILE.LIST]({ commit }, payload) {
        try {
            const result = await new Profile(this.$axios)[actionTypes.BASE.LIST](
                payload
            );
            commit(
                mutationTypes.ACCOUNT_PROFILE.SET_ACCOUNT_PROFILE_LIST,
                result.data
            );
        } catch (err) {
            console.log("PROFILE add.err", err);
            return err;
        }
    },
    async [actionTypes.SOCIAL_FRIEND.LIST_INVITE]({ commit }, payload) {
        try {
            const { data: result = {} } = await new FriendInvite(this.$axios)[
                actionTypes.BASE.LIST
            ](payload);
            console.log("[FriendInvite] list", result);

            // set to mutation
            commit(
                mutationTypes.SOCIAL_FRIEND.SET_SOCIAL_FRIEND_INVITE_LIST,
                result || []
            );
            return result;
        } catch (err) {
            console.log("[FriendInvite] list.err", err);
            return err;
        }
    },
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
    },
    [mutationTypes.ACCOUNT_WITHDRAWALS.SET_ACCOUNT_WITHDRAWALS](
        state,
        _withdrawalsList
    ) {
        console.log("SET_ACCOUNT_WITHDRAWALS", _withdrawalsList);
        state.withdrawalsList = _withdrawalsList;
    },
    [mutationTypes.ACCOUNT_LINK.SET_ACCOUNT_LINK_LIST](state, _linkList) {
        state.linkList = _linkList;
    },
    [mutationTypes.ACCOUNT_PROFILE.SET_ACCOUNT_PROFILE_LIST](
        state,
        _profileList
    ) {
        console.log("SET_ACCOUNT_PROFILE_LIST", _profileList);
        state.profileList = _profileList;
    },
    [mutationTypes.SOCIAL_FRIEND.SET_SOCIAL_FRIEND_INVITE_LIST](
        state,
        _inviteList
    ) {
        state.inviteList = _inviteList;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};