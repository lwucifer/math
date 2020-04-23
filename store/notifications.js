import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Notifications from "~/services/notification/notifications";
import { isEmpty } from "lodash";

/**
 * initial state
 */
const state = () => ({
    notis: {
        listNotification: [],
        page: {},
    },
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
    async [actionTypes.SOCIAL_NOTIFICATIONS.LIST]({ state, commit }, payload) {
        try {
            const result = await new Notifications(this.$axios)[
                actionTypes.BASE.LIST
            ](payload);
            console.log("[Notifications] list", result);
            if (result.success && !isEmpty(result.data)) {
                const { page, listNotification } = result.data;
                commit(mutationTypes.SOCIAL_NOTI.SET_SOCIAL_NOTIFICATIONS_LIST, {
                    listNotification: state.notis.listNotification.concat(
                        listNotification
                    ),
                    page,
                });
            }
            return result;
        } catch (err) {
            console.log("[Notifications] list.err", err);
            return err;
        }
    },
    async [actionTypes.SOCIAL_NOTIFICATIONS.REGISTER_DEVICE]({ commit },
        payload
    ) {
        try {
            const data = await new RegisterDevice(this.$axios)[actionTypes.BASE.ADD](
                payload
            );
            console.log("[RegisterDevice] add", data);
            return data;
        } catch (err) {
            console.log("[RegisterDevice] add.err", err);
            return err;
        }
    },
    async [actionTypes.SOCIAL_NOTIFICATIONS.READ_NOTIFICATION]({ state, commit },
        payload
    ) {
        try {
            const result = await new Notifications(this.$axios)[
                actionTypes.BASE.EDIT_PAYLOAD
            ](payload);
            console.log("[Notifications] edit", result);
            if (result.success) {
                // const { data } = result;
                const newlistNotification = state.notis.listNotification.map((item) => {
                    if (item.id.toString() === payload.notifications) {
                        return {
                            ...item,
                            is_read: 1,
                        };
                    }
                    return item;
                });

                commit(mutationTypes.SOCIAL_NOTI.SET_SOCIAL_NOTIFICATIONS_LIST, {
                    ...state.notis,
                    listNotification: newlistNotification,
                });
            }
            return result;
        } catch (err) {
            console.log("[Notifications] edit.err", err);
            return err;
        }
    },
};

/**
 * initial mutations
 */
const mutations = {
    [mutationTypes.SOCIAL_NOTI.SET_SOCIAL_NOTIFICATIONS_LIST](state, _notis) {
        state.notis = _notis;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};