import * as actionTypes from "../utils/action-types";
import * as mutationTypes from "../utils/mutation-types";
import { isEmpty, uniqWith, isEqual, omit } from "lodash";
import Room from "~/services/chat/Room";
import Member from "~/services/chat/Member";

/**
 * initial state
 */
const state = () => ({
  roomList: { list_room: [] },
  memberList: {},
  messageList: [],
  stateIdPush: +new Date()
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.CHAT.ROOM_LIST]({ commit, state }, payload) {
    try {
      const { data: result = {} } = await new Room(this.$axios)[
        actionTypes.BASE.LIST
      ](payload);
      console.log("[Room] list", result);
      if (result) {
        const { list_room } = result;
        commit(mutationTypes.CHAT.SET_ROOM_LIST, {
          list_room: uniqWith(
            state.roomList.list_room.concat(list_room),
            isEqual
          ),
        });
      }
      return result;
    } catch (err) {
      console.log("[Room] list.err", err);
      return err;
    }
  },
  async [actionTypes.CHAT.MEMBER_LIST]({ commit, state }, options) {
    try {
      const { data: result = {} } = await new Room(this.$axios)[
        actionTypes.BASE.GET_END
      ](options, options.id, options.end);
      console.log("[Member] list", result);
      commit(mutationTypes.CHAT.SET_MEMBER_LIST, result);
      return result;
    } catch (err) {
      console.log("[Room] list.err", err);
      return err;
    }
  },
  async [actionTypes.CHAT.MESSAGE_LIST]({ commit, state }, options) {
    try {
      const { data: result = {} } = await new Room(this.$axios)[
        actionTypes.BASE.GET_END
      ](options, options.id, options.end);
      // console.log("[Message] list", result);
      // commit(mutationTypes.CHAT.SET_MESSAGE_LIST, result);
      const messageList = result;
      if (result && state.messageList && state.messageList.length > 0 && state.messageList[0].room_id == options.id) {
        commit(mutationTypes.CHAT.SET_MESSAGE_LIST,
          state.messageList.concat(messageList)
        );
      } else {
        commit(mutationTypes.CHAT.SET_MESSAGE_LIST,
          messageList
        )
      }
      return result;
    } catch (err) {
      console.log("[Message] list.err", err);
      return err;
    }
  },
  async [actionTypes.CHAT.MESSAGE_LIST_FETCH]({ commit, state }, options) {
    try {
      const { data: result = {} } = await new Room(this.$axios)[
        actionTypes.BASE.GET_END
      ](options, options.id, options.end);
      // console.log("[Message] list", result);
      // commit(mutationTypes.CHAT.SET_MESSAGE_LIST, result);
      if (result) {
        const messageList = result;
        commit(mutationTypes.CHAT.SET_MESSAGE_LIST,
          messageList
        )
      }
      return result;
    } catch (err) {
      console.log("[Message] list.err", err);
      return err;
    }
  },
  async[actionTypes.CHAT.ROOM_DETAIL]({ commit, state }, payload) {
    try {
      const { data: result = {} } = await new Room(this.$axios)[
        actionTypes.BASE.DETAIL
      ](payload);
      console.log("[ROOM_DETAIL] list", result);
      commit(mutationTypes.CHAT.SET_ROOM_DETAIL, result);
      return result;
    } catch (err) {
      console.log("[ROOM_DETAIL] list.err", err);
      return err;
    }
  },
};
/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.CHAT.SET_ROOM_LIST](state, _roomList) {
    state.roomList = _roomList;
  },
  [mutationTypes.CHAT.SET_MEMBER_LIST](state, _memberList) {
    state.memberList = _memberList;
  },
  [mutationTypes.CHAT.SET_MESSAGE_LIST](state, _messageList) {
    state.messageList = _messageList;
  },
  [mutationTypes.CHAT.SET_ROOM_DETAIL](state, _roomDetail) {
    state.roomDetail = _roomDetail;
  },
  [mutationTypes.CHAT.SET_ID_PUSH](state, _stateIdPush) {
    state.stateIdPush = state.stateIdPush + _stateIdPush;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};