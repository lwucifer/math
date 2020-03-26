import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import SocialPosts from "~/services/social/post";
import Likes from "~/services/social/likes";
import Shares from "~/services/social/shares";
import Comments from "~/services/social/comments";
import Config from "~/services/social/config";
import Label from "~/services/social/label";
import Friend from "~/services/social/friend";
import FriendInvite from "~/services/social/Friendinvite";

/**
 * initial state
 */
const state = () => ({
    posts: {},
    likesList: {},
    sharesList: {},
    commentsList: {},
    mediasList: {},
    notificationsList: {},
    configs: {},
    labels: [],
    friendList: {},
    inviteList: {}
});

/**
 * initial getters
 */
const getters = {
    configPrivacyLevels: state =>
        state.configs.privacy_levels ? state.configs.privacy_levels : []
};

/**
 * initial actions
 */
const actions = {
    async [actionTypes.SOCIAL_POST.LIST]({ commit }, payload) {
        try {
            const { data: result = {} } = await new SocialPosts(this.$axios)[
                actionTypes.BASE.LIST
            ](payload);
            console.log("[SocialPosts] list", result);

            // set to mutation
            commit(mutationTypes.SOCIAL.SET_POSTS_LIST, result);
            return result;
        } catch (err) {
            console.log("[SocialPosts] list.err", err);
            return err;
        }
    },

    async [actionTypes.SOCIAL_POST.ADD]({ commit }, payload) {
        try {
            const data = await new SocialPosts(this.$axios)[
                actionTypes.BASE.ADD
            ](payload);
            console.log("[SocialPosts] add", data);
            return data;
        } catch (err) {
            console.log("[SocialPosts] add.err", err);
            return err;
        }
    },

    async [actionTypes.SOCIAL_LIKES.LIST]({ commit }, payload) {
        try {
            // const result = await new Likes(this.$axios)[actionTypes.BASE.LIST](payload);
            const result = [{
                    id: "0",
                    avatar: "https://picsum.photos/2560/1440",
                    fullname: "Dat Leo",
                    timestamp: "2019-01-04 14:00:00"
                },
                {
                    id: "1",
                    avatar: "https://picsum.photos/2560/1440",
                    fullname: "Dat Leo 1",
                    timestamp: "2019-01-04 14:00:00"
                },
                {
                    id: "2",
                    avatar: "https://picsum.photos/2560/1440",
                    fullname: " Nguyen Dat Leo",
                    timestamp: "2019-01-04 14:00:00"
                }
            ];
            console.log("[Likes] list", result);
            // set to mutation
            commit(mutationTypes.SOCIAL.SET_SOCIAL_LIKES_LIST, result);
        } catch (err) {
            console.log("[Likes] list.err", err);
            return err;
        }
    },

    async [actionTypes.SOCIAL_SHARES.LIST]({ commit }, payload) {
        try {
            // const result = await new Shares(this.$axios)[actionTypes.BASE.LIST](payload);
            const result = [{
                    id: "0",
                    avatar: "https://picsum.photos/2560/1440",
                    fullname: "Dat Leo",
                    timestamp: "2019-01-04 14:00:00"
                },
                {
                    id: "1",
                    avatar: "https://picsum.photos/2560/1440",
                    fullname: "Dat Leo 1",
                    timestamp: "2019-01-04 14:00:00"
                },
                {
                    id: "2",
                    avatar: "https://picsum.photos/2560/1440",
                    fullname: " Nguyen Dat Leo",
                    timestamp: "2019-01-04 14:00:00"
                }
            ];
            console.log("[Shares] list", result);
            // set to mutation
            commit(mutationTypes.SOCIAL.SET_SOCIAL_SHARES_LIST, result);
        } catch (err) {
            console.log("[Shares] list.err", err);
            return err;
        }
    },

    async [actionTypes.SOCIAL_COMMENTS.LIST]({ commit }, payload) {
        try {
            // const result = await new Comments(this.$axios)[actionTypes.BASE.LIST](payload);
            const result = [{
                    id: "0",
                    creator: "Dat Leo",
                    comment: "Day la comment 1",
                    likes: 20,
                    replies: 21,
                    liked: true,
                    timestamp: "2019-01-04 14:00:00"
                },
                {
                    id: "1",
                    creator: "Dat Leo fake",
                    comment: "Day la comment 11",
                    likes: 201,
                    replies: 212,
                    liked: true,
                    timestamp: "2019-01-04 14:00:00"
                },
                {
                    id: "2",
                    creator: "Dat Leo fake 2",
                    comment: "Day la comment 12",
                    likes: 120,
                    replies: 121,
                    liked: true,
                    timestamp: "2019-01-04 14:00:00"
                }
            ];
            console.log("[Comment] list", result);
            // set to mutation
            commit(mutationTypes.SOCIAL.SET_SOCIAL_COMMENTS_LIST, result);
        } catch (err) {
            console.log("[Comment] list.err", err);
            return err;
        }
    },

    async [actionTypes.SOCIAL_MEDIAS.LIST]({ commit }, payload) {
        try {
            // const result = await new Comments(this.$axios)[actionTypes.BASE.LIST](payload);
            const result = [{
                    id: "1",
                    creator: "Dat Leo",
                    type: "image",
                    thumd: "https://picsum.photos/2560/1440",
                    url: "https://picsum.photos/2560/1440"
                },
                {
                    id: "2",
                    creator: "Dat Leo 1",
                    type: "image",
                    thumd: "https://picsum.photos/2560/1440",
                    url: "https://picsum.photos/2560/1440"
                },
                {
                    id: "3",
                    creator: "Dat Leo 1",
                    type: "video",
                    thumd: "https://picsum.photos/2560/1440",
                    url: "https://picsum.photos/2560/1440"
                }
            ];
            console.log("[Medias] list", result);
            // set to mutation
            commit(mutationTypes.SOCIAL.SET_SOCIAL_MEDIAS_LIST, result);
        } catch (err) {
            console.log("[Medias] list.err", err);
            return err;
        }
    },

    async [actionTypes.SOCIAL_NOTIFICATIONS.LIST]({ commit }, payload) {
        try {
            // const result = await new Comments(this.$axios)[actionTypes.BASE.LIST](payload);
            const result = [{
                    id: "1",
                    creator: "Dat Leo",
                    type: "image",
                    thumd: "https://picsum.photos/2560/1440",
                    url: "https://picsum.photos/2560/1440"
                },
                {
                    id: "2",
                    creator: "Dat Leo 1",
                    type: "image",
                    thumd: "https://picsum.photos/2560/1440",
                    url: "https://picsum.photos/2560/1440"
                },
                {
                    id: "3",
                    creator: "Dat Leo 1",
                    type: "video",
                    thumd: "https://picsum.photos/2560/1440",
                    url: "https://picsum.photos/2560/1440"
                }
            ];
            console.log("[Medias] list", result);
            // set to mutation
            commit(mutationTypes.SOCIAL.SET_SOCIAL_NOTIFICATIONS_LIST, result);
        } catch (err) {
            console.log("[Medias] list.err", err);
            return err;
        }
    },

    async [actionTypes.SOCIAL_CONFIG.LIST]({ commit }, payload) {
        try {
            const { data: result = {} } = await new Config(this.$axios)[
                actionTypes.BASE.LIST
            ](payload);
            console.log("[SocialConfig] list", result);

            // set to mutation
            commit(mutationTypes.SOCIAL.SET_SOCIAL_CONFIG_LIST, result);
        } catch (err) {
            console.log("[SocialConfig] list.err", err);
            return err;
        }
    },

    async [actionTypes.SOCIAL_LABEL.LIST]({ commit }, payload) {
        try {
            const { data: result = {} } = await new Label(this.$axios)[
                actionTypes.BASE.LIST
            ](payload);
            console.log("[SocialLabel] list", result);

            // set to mutation
            commit(
                mutationTypes.SOCIAL.SET_SOCIAL_LABEL_LIST,
                result.list_icon || []
            );
            return result;
        } catch (err) {
            console.log("[SocialLabel] list.err", err);
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
            commit(
                mutationTypes.SOCIAL.SET_SOCIAL_FRIEND_LIST,
                result.listFriend || []
            );
            return result;
        } catch (err) {
            console.log("[SocialFriend] list.err", err);
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
                mutationTypes.SOCIAL.SET_SOCIAL_FRIEND_INVITE_LIST,
                result.listInvite || []
            );
            return result;
        } catch (err) {
            console.log("[FriendInvite] list.err", err);
            return err;
        }
    }
};

/**
 * initial mutations
 */
const mutations = {
    [mutationTypes.SOCIAL.SET_POSTS_LIST](state, _posts) {
        state.posts = _posts;
    },

    [mutationTypes.SOCIAL.SET_SOCIAL_LIKES_LIST](state, _likesList) {
        state.likesList = _likesList;
    },

    [mutationTypes.SOCIAL.SET_SOCIAL_SHARES_LIST](state, _sharesList) {
        state.sharesList = _sharesList;
    },

    [mutationTypes.SOCIAL.SET_SOCIAL_COMMENTS_LIST](state, _commentsList) {
        state.commentsList = _commentsList;
    },

    [mutationTypes.SOCIAL.SET_SOCIAL_MEDIAS_LIST](state, _mediasList) {
        state.mediasList = _mediasList;
    },

    [mutationTypes.SOCIAL.SET_SOCIAL_NOTIFICATIONS_LIST](
        state,
        _notificationsList
    ) {
        state.notificationsList = _notificationsList;
    },

    [mutationTypes.SOCIAL.SET_SOCIAL_CONFIG_LIST](state, _configs) {
        state.configs = _configs;
    },

    [mutationTypes.SOCIAL.SET_SOCIAL_LABEL_LIST](state, labels) {
        state.labels = labels;
    },
    [mutationTypes.SOCIAL.SET_SOCIAL_FRIEND_LIST](state, _friendList) {
        state.friendList = _friendList;
    },
    [mutationTypes.SOCIAL.SET_SOCIAL_FRIEND_INVITE_LIST](state, _inviteList) {
        state.inviteList = _inviteList;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};