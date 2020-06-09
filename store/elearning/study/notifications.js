import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Notifications from "~/services/elearning/study/Notifications";
import { isEmpty, uniqWith, omit } from "lodash";

/**
 * initial state
 */
const state = () => ({
    notis: [
        {   
            id: 1,
            type: 'E-LEARNING',
            name: 'Ngọc Trinh',
            image: 'https://s3.cloud.cmctelecom.vn/dev-image-schoolly/avatar/14/low/5c6e7804-514d-48f0-b82f-63258b0b47fe.jpg',
            content: '“Du lịch Dubai với Trinh”',
            title: 'đã bày tỏ cảm xúc đến bài viết mà bạn được gắn thẻ:',
            timestamp: '15 phút trước',
            read: true
        },
        {   
            id: 2,
            type: 'MXH',
            name: 'Ngọc Trinh',
            image: 'https://s3.cloud.cmctelecom.vn/dev-image-schoolly/avatar/14/low/5c6e7804-514d-48f0-b82f-63258b0b47fe.jpg',
            content: '“Du lịch Dubai với Trinh”',
            title: 'đã bày tỏ cảm xúc đến bài viết mà bạn được gắn thẻ:',
            timestamp: '15 phút trước',
            read: true
        },
        {   
            id: 3,
            type: 'E-LEARNING',
            name: 'Ngọc Trinh',
            image: 'https://s3.cloud.cmctelecom.vn/dev-image-schoolly/avatar/14/low/5c6e7804-514d-48f0-b82f-63258b0b47fe.jpg',
            content: '“Du lịch Dubai với Trinh”',
            title: 'đã bày tỏ cảm xúc đến bài viết mà bạn được gắn thẻ:',
            timestamp: '15 phút trước',
            read: false
        }
    ],
    notiUnread: 0,
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
    async [actionTypes.HEADER_NOTIFICATIONS.LIST]({ state, commit }, payload) {
        try {
            const result = await new Notifications(this.$axios)[
                actionTypes.BASE.LIST
              ](payload);
            commit(mutationTypes.SOCIAL_NOTI.SET_SOCIAL_NOTIFICATIONS_LIST, result.data );
        } catch (err) {
            console.log("[Notifications] list.err", err);
            return err;
        }
    },

    async [actionTypes.HEADER_NOTIFICATIONS.DETAIL_LIST]({ state, commit }, payload) {
        try {
            const result = await new Notifications(this.$axios)[
                actionTypes.BASE.DETAIL
              ](payload);
            commit(mutationTypes.SOCIAL_NOTI.SET_SOCIAL_NOTIFICATIONS_LIST, result.data );
        } catch (err) {
            console.log("[Notifications] list.err", err);
            return err;
        }
    },

    async [actionTypes.HEADER_NOTIFICATIONS.CHECK_IS_READ_NOTIFICATION]({ state, commit }, payload) {
        try {
            const result = await new Notifications(this.$axios)[
                actionTypes.BASE.LIST
              ](payload);
            commit(mutationTypes.HEADER_NOTI.SET_NOTIFICATIONS_LIST, result.data );
        } catch (err) {
            console.log("[Notifications] list.err", err);
            return err;
        }
    },
};

/**
 * initial mutations
 */
const mutations = {
    [mutationTypes.HEADER_NOTI.SET_NOTIFICATIONS_LIST](state, _notis) {
        console.log("[state.notis]", _notis);
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