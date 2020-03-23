import * as actionTypes from "../utils/action-types";
import * as mutationTypes from "../utils/mutation-types";
import GroupAddMember from "~/services/message/GroupAddMember";
import GroupAvatar from "~/services/message/GroupAvatar";
import GroupName from "~/services/message/GroupName";
import Group from "~/services/message/Group";
import GroupMember from "~/services/message/GroupMember";
import GroupLeave from "~/services/message/GroupLeave";
import GroupRemoveMember from "~/services/message/GroupRemoveMember";
import GroupNotification from "~/services/message/GroupNotification";
import Message from "~/services/message/Message";

/**
 * initial state
 */
const state = () => ({
    memberList: {},
    groupList: {},
    messageList: {},
    groupListType: [],
    chatListType: []
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
    async [actionTypes.MESSAGE_GROUP.ADD_MEMBER]({ commit }, payload) {
        try {
            const result = await new GroupAddMember(this.$axios)[
                actionTypes.BASE.ADD
            ](payload);
            console.log("[AddMember] add", result);
            return result;
        } catch (err) {
            console.log("[AddMember] add.err", err);
            return err;
        }
    },
    async [actionTypes.MESSAGE_GROUP.EDIT_AVATAR]({ commit }, payload) {
        try {
            const result = await new GroupAvatar(this.$axios)[
                actionTypes.BASE.EDIT_PAYLOAD
            ](payload);
            console.log("[GroupAvatar] edit", result);
            return result;
        } catch (err) {
            console.log("[GroupAvatar] edit.err", err);
            return err;
        }
    },
    async [actionTypes.MESSAGE_GROUP.EDIT_NAME]({ commit }, payload) {
        try {
            const result = await new GroupName(this.$axios)[
                actionTypes.BASE.EDIT_PAYLOAD
            ](payload);
            console.log("[GroupName] edit", result);
            return result;
        } catch (err) {
            console.log("[GroupName] edit.err", err);
            return err;
        }
    },
    async [actionTypes.MESSAGE_GROUP.CREATE_GROUP]({ commit }, payload) {
        try {
            const result = await new Group(this.$axios)[actionTypes.BASE.ADD](
                payload
            );
            console.log("[Group] add", result);
            return result;
        } catch (err) {
            console.log("[Group] add.err", err);
            return err;
        }
    },
    async [actionTypes.MESSAGE_GROUP.GROUP_LIST]({ commit }, payload) {
        try {
            const { data: result = {} } = await new Group(this.$axios)[
                actionTypes.BASE.LIST
            ](payload);
            // console.log("[Group] list", result);

            // set to mutation
            commit(mutationTypes.MESSAGE_GROUP.SET_GROUP_LIST, result);
            return result;
        } catch (err) {
            console.log("[Group] list.err", err);
            return err;
        }
    },
    async [actionTypes.MESSAGE_GROUP.MEMBER_LIST]({ commit }, payload) {
        try {
            const { data: result = {} } = await new GroupMember(this.$axios)[
                actionTypes.BASE.LIST
            ](payload);
            // console.log("[GroupMember] list", result);

            // set to mutation
            commit(mutationTypes.MESSAGE_GROUP.SET_MEMBER_LIST, result);
            return result;
        } catch (err) {
            console.log("[GroupMember] list.err", err);
            return err;
        }
    },
    async [actionTypes.MESSAGE_GROUP.GROUP_LEAVE]({ commit }, payload) {
        try {
            const result = await new GroupLeave(this.$axios)[
                actionTypes.BASE.EDIT_PAYLOAD
            ](payload);
            // console.log("[GroupLeave] edit", result);
            return result;
        } catch (err) {
            console.log("[GroupLeave] edit.err", err);
            return err;
        }
    },
    async [actionTypes.MESSAGE_GROUP.GROUP_REMOVE_MEMBER]({ commit }, payload) {
        try {
            const result = await new GroupRemoveMember(this.$axios)[
                actionTypes.BASE.EDIT_PAYLOAD
            ](payload);
            // console.log("[GroupRemoveMember] edit", result);
            return result;
        } catch (err) {
            console.log("[GroupRemoveMember] edit.err", err);
            return err;
        }
    },
    async [actionTypes.MESSAGE_GROUP.GROUP_NOTIFICATION]({ commit }, payload) {
        try {
            const result = await new GroupNotification(this.$axios)[
                actionTypes.BASE.EDIT_PAYLOAD
            ](payload);
            // console.log("[GroupNotification] edit", result);
            return result;
        } catch (err) {
            console.log("[GroupNotification] edit.err", err);
            return err;
        }
    },
    async [actionTypes.MESSAGE_GROUP.MESSAGE_LIST]({ commit }, payload) {
        try {
            const { data: result = {} } = await new Message(this.$axios)[
                actionTypes.BASE.LIST
            ](payload);
            console.log("[Message] list", result);

            // set to mutation
            commit(mutationTypes.MESSAGE_GROUP.SET_MESSAGE_LIST, result);
            return result;
        } catch (err) {
            console.log("[Message] list.err", err);
            return err;
        }
    }
};

/**
 * initial mutations
 */
const mutations = {
    [mutationTypes.MESSAGE_GROUP.SET_MEMBER_LIST](state, _memberList) {
        state.memberList = _memberList;
    },
    [mutationTypes.MESSAGE_GROUP.SET_GROUP_LIST](state, _groupList) {
        state.groupList = _groupList;
    },
    [mutationTypes.MESSAGE_GROUP.SET_MESSAGE_LIST](state, _messageList) {
        state.messageList = _messageList;
    },
    [mutationTypes.MESSAGE_GROUP.SET_GROUP_LIST_TYPE](state, _groupListType) {
        state.groupListType = _groupListType;
    }
    // [mutationTypes.MESSAGE_GROUP.SET_CHAT_LIST_TYPE](state, _chatListType) {
    //     state.chatListType = _chatListType;
    // }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};