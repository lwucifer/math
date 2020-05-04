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
import GroupDetail from "~/services/message/GroupDetail";
import MessageSendImg from "~/services/message/MessageSendImg";
import Personal from "../services/account/Personal";
import MessageType from "~/services/message/MessageType";
import MessageSendFile from "~/services/message/MessageSendFile";
import Friend from "~/services/social/friend";

/**
 * initial state
 */
const state = () => ({
    memberList: {},
    groupList: {},
    messageList: {},
    groupListDetail: {},
    messageEmit: {},
    messageOn: {},
    closeCreate: true,
    isGroupState: false,
    listMessageType: {},
    tabChat: true,
    friendList: {},
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
    async [actionTypes.MESSAGE_GROUP.EDIT_AVATAR_GROUP]({ commit }, payload) {
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
    },
    async [actionTypes.MESSAGE_GROUP.GROUP_LIST_DETAIL]({ commit }, payload) {
        try {
            const { data: result = {} } = await new GroupDetail(this.$axios)[
                actionTypes.BASE.LIST
            ](payload);
            console.log("[GroupDetail] list", result);

            // set to mutation
            commit(mutationTypes.MESSAGE_GROUP.SET_GROUP_LIST_DETAIL, result);
            if (result.room) {
                if (result.room.type == 1) {
                    commit(mutationTypes.MESSAGE_GROUP.SET_TAB_CHAT, true);
                } else {
                    commit(mutationTypes.MESSAGE_GROUP.SET_TAB_CHAT, false);
                }
            } else {
                commit(mutationTypes.MESSAGE_GROUP.SET_TAB_CHAT, true);
            }
            return result;
        } catch (err) {
            console.log("[GroupDetail] list.err", err);
            return err;
        }
    },
    async [actionTypes.MESSAGE_GROUP.MESSAGE_SEND_IMG]({ commit }, payload) {
        try {
            const result = await new MessageSendImg(this.$axios)[
                actionTypes.BASE.ADD
            ](payload);
            console.log("[MessageSendImg] post", result);
            return result;
        } catch (err) {
            console.log("[MessageSendImg] edit.err", err);
            return err;
        }
    },
    async [actionTypes.MESSAGE_GROUP.MESSAGE_SEND_FILE]({ commit }, payload) {
        try {
            const result = await new MessageSendFile(this.$axios)[
                actionTypes.BASE.ADD
            ](payload);
            console.log("[MessageSendFile] post", result);
            return result;
        } catch (err) {
            console.log("[MessageSendFile] edit.err", err);
            return err;
        }
    },
    async [actionTypes.ACCOUNT_PERSONAL.LIST]({ commit }, payload) {
        try {
            const result = await new Personal(this.$axios)[actionTypes.BASE.DETAIL](
                payload
            );
            return result;
        } catch (err) {
            console.log("[Personal Message] list.err", err);
            return err;
        }
    },
    async [actionTypes.MESSAGE_GROUP.LIST_MESSAGE_TYPE]({ commit }, payload) {
        try {
            const result = await new MessageType(this.$axios)[actionTypes.BASE.LIST](
                payload
            );
            // set to mutation
            commit(mutationTypes.MESSAGE_GROUP.SET_LIST_MESSAGE_TYPE, result);
            console.log("[MessageType] post", result);
            return result;
        } catch (err) {
            console.log("[MessageType] edit.err", err);
            return err;
        }
    },
    async [actionTypes.SOCIAL_FRIEND.LIST]({ commit }, payload) {
        try {
            const { data: result = {} } = await new Friend(this.$axios)[
                actionTypes.BASE.LIST
            ](payload);
            console.log("[SocialFriend] list", result);

            // set to mutation
            commit(mutationTypes.MESSAGE_GROUP.SET_SOCIAL_FRIEND_LIST, result || []);
            return result;
        } catch (err) {
            console.log("[SocialFriend] list.err", err);
            return err;
        }
    },
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
    },
    [mutationTypes.MESSAGE_GROUP.SET_GROUP_LIST_DETAIL](state, _groupListDetail) {
        state.groupListDetail = _groupListDetail;
    },
    [mutationTypes.MESSAGE_GROUP.SET_EMIT_MESSAGE](state, _messageEmit) {
        state.messageEmit = _messageEmit;
    },
    [mutationTypes.MESSAGE_GROUP.SET_ON_MESSAGE](state, _messageOn) {
        state.messageOn = _messageOn;
    },
    [mutationTypes.MESSAGE_GROUP.EMIT_CLOSE_FALSE](state, _close, _isGroup) {
        state.closeCreate = _close;
        state.closeCreate = _isGroup;
    },
    [mutationTypes.MESSAGE_GROUP.SET_LIST_MESSAGE_TYPE](state, _listMessageType) {
        state.listMessageType = _listMessageType;
    },
    [mutationTypes.MESSAGE_GROUP.SET_TAB_CHAT](state, _tabChat) {
        console.log("tabChat", _tabChat);
        state.tabChat = _tabChat;
    },
    [mutationTypes.MESSAGE_GROUP.SET_SOCIAL_FRIEND_LIST](state, _friendList) {
        state.friendList = _friendList;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};