import * as actionTypes from "../utils/action-types";
import * as mutationTypes from "../utils/mutation-types";
import { isEmpty, uniqWith, isEqual, omit } from "lodash";
import Room from "~/services/chat/Room";

/**
 * initial state
 */
const state = () => ({
    roomList: { listMessage: [], page: {} },
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
    async [actionTypes.CHAT.ROOM_LIST]({ commit }, payload) {
        try {
            const { data: result = {} } = await new Room(this.$axios)[
                actionTypes.BASE.LIST
            ](payload);
            console.log("[Room] list", result);
            if (result.success) {
                commit(mutationTypes.CHAT.SET_ROOM_LIST, {
                    listMessage: uniqWith(
                        state.groups.listMessage.concat(listMessage),
                        isEqual
                    ),
                    page,
                });
            }
            return result;
        } catch (err) {
            console.log("[Room] list.err", err);
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
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};