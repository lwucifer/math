import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Notifications from "~/services/notification/notifications";
import { uniqWith } from "lodash";

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
            if (state.notis.listNotification) {
                const listNotification = result.data.listNotification.map((noti) => ({
                    ...noti,
                }));
                commit(mutationTypes.SOCIAL_NOTI.SET_SOCIAL_NOTIFICATIONS_LIST, {
                    ...state.notis,
                    listNotification: uniqWith(
                        state.notis.listNotification.concat(listNotification),
                        (a, b) => a.id === b.id
                    ),
                });
            } else {
                commit(
                    mutationTypes.SOCIAL_NOTI.SET_SOCIAL_NOTIFICATIONS_LIST,
                    result.data
                );
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