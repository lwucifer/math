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
  stateIdPush: +new Date(),
  messageEmit: {},
  messageOn: {},
  messageRes: {},
  imageList: [],
  fileList: []
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
  async [actionTypes.CHAT.MESSAGE_LIST_INFINITE]({ commit, state }, options) {
    try {
      const { data: result = {} } = await new Room(this.$axios)[
        actionTypes.BASE.GET_END
      ](options, options.id, options.end);
      // console.log("[Message] list", result);
      // commit(mutationTypes.CHAT.SET_MESSAGE_LIST, result);
      return result;
    } catch (err) {
      console.log("[Message] list.err", err);
      return err;
    }
  },
  async [actionTypes.CHAT.ROOM_DETAIL]({ commit, state }, payload) {
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
  async [actionTypes.CHAT.CHANGE_ROOM_NAME]({ commit, state }, options) {
    try {
      const { data: result = {} } = await new Room(this.$axios)[
        actionTypes.BASE.GET_END_PUT
      ](options.payload, options.id, options.end);
      // console.log("[Message] list", result);
      // commit(mutationTypes.CHAT.SET_MESSAGE_LIST, result);
      if (!result.error) {
        const newRoomList = state.roomList.list_room.map(item => {
          if (item.room_id == result.id) {
            return {
              ...item,
              name: result && result.name ? result.name : ''
            }
          }
          return item
        })
        commit(mutationTypes.CHAT.SET_ROOM_LIST, {
          list_room: newRoomList
        });
      }
      return result;
    } catch (err) {
      console.log("[Message] list.err", err);
      return err;
    }
  },
  async [actionTypes.CHAT.FILE_LIST]({ commit, state }, options) {
    try {
      const { data: result = {} } = await new Room(this.$axios)[
        actionTypes.BASE.GET_END
      ](options, options.id, options.end);
      console.log("[FILE_LIST] list", result);
      commit(mutationTypes.CHAT.SET_FILE_LIST, result);
      return result;
    } catch (err) {
      console.log("[FILE_LIST] list.err", err);
      return err;
    }
  },
  async [actionTypes.CHAT.IMAGE_LIST]({ commit, state }, options) {
    try {
      const { data: result = {} } = await new Room(this.$axios)[
        actionTypes.BASE.GET_END
      ](options, options.id, options.end);
      console.log("[IMAGE_LIST] list", result);
      commit(mutationTypes.CHAT.SET_IMAGE_LIST, result);
      return result;
    } catch (err) {
      console.log("[IMAGE_LIST] list.err", err);
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
  [mutationTypes.CHAT.SET_EMIT_MESSAGE](state, _messageEmit) {
    state.messageEmit = _messageEmit;
  },
  [mutationTypes.CHAT.SET_ON_MESSAGE](state, _messageOn) {
    state.messageOn = _messageOn;
  },
  [mutationTypes.CHAT.SET_RES_EMIT](state, _messageRes) {
    state.messageRes = _messageRes;
  },
  [mutationTypes.CHAT.SET_IMAGE_LIST](state, _imageList) {
    state.imageList = _imageList;
  },
  [mutationTypes.CHAT.SET_FILE_LIST](state, _fileList) {
    state.fileList = _fileList;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};