import * as actionTypes from "../utils/action-types";
import * as mutationTypes from "../utils/mutation-types";
import SocialPosts from "../services/social/post";
import Likes from "../services/social/likes";
import Shares from "../services/social/shares";
import Comments from "../services/social/comments";

/**
 * initial state
 */
const state = () => ({
    postsList: {},
    likesList: {},
    sharesList: {},
    commentsList: {},
    mediasList: {},
    notificationsList: {}
});

/**
 * initial getters
 */
const getters = {};

/**
 * initial actions
 */
const actions = {
    /**
     * LIST
     */
    async [actionTypes.SOCIAL_POST.LIST]({ commit }, payload) {
        try {
            // const result = await new SocialPosts(this.$axios)[actionTypes.BASE.LIST](payload);
            const result = [{
                    id: 1,
                    creator: {
                        id: 1,
                        avatar: "https://picsum.photos/64/64",
                        fullname: "Nguyen Tien Dat"
                    },
                    privacy: "public",
                    label: "",
                    tags: [{
                        user_id: "1",
                        avatar: "https://picsum.photos/66/66",
                        fullname: "Dat Tien Nguyen"
                    }],
                    checkin: {
                        lat: "21.034338",
                        lon: "105.796278",
                        addr: "247 Cầu Giấy"
                    },
                    content: "Những người phụ nữ đang bán hàng online và đang gặp phải vấn đề liên quan đến bán lẻ và phát triển đội nhóm. Đang bị Thiếu chiến lược, thiếu kế hoạch hành động chi tiết.",
                    attachments: [{
                            id: "123",
                            creator: "11",
                            object: "image",
                            thumb: "https://picsum.photos/1024/768",
                            url: "https://picsum.photos/1024/768",
                            likes: 202,
                            share: 202,
                            comments: 202
                        },
                        {
                            id: "124",
                            creator: "11",
                            object: "image",
                            thumb: "https://picsum.photos/1920/1080",
                            url: "https://picsum.photos/1920/1080",
                            likes: 202,
                            share: 202,
                            comments: 202
                        },
                        {
                            id: "125",
                            creator: "11",
                            object: "image",
                            thumb: "https://picsum.photos/2560/1440",
                            url: "https://picsum.photos/2560/1440",
                            likes: 202,
                            share: 202,
                            comments: 202
                        }
                    ],
                    likes: 20,
                    share: 20,
                    comments: 20,
                    liked: true,
                    updated: "2019-01-06 14:00:00"
                },
                {
                    id: 2,
                    creator: {
                        id: 2,
                        avatar: "https://picsum.photos/64/64",
                        fullname: "Lê Văn Đạt"
                    },
                    privacy: "public",
                    label: "a",
                    tags: [{
                        user_id: "2",
                        avatar: "https://picsum.photos/64/64",
                        fullname: "Nguyen Tien Dat"
                    }],
                    checkin: {
                        lat: "111",
                        lon: "221",
                        addr: "noi check in1111"
                    },
                    content: "Day là content1111",
                    attachments: [{
                            id: "123",
                            creator: "11",
                            object: "image",
                            thumb: "https://picsum.photos/1024/768",
                            url: "https://picsum.photos/1024/768",
                            likes: 202,
                            share: 202,
                            comments: 202
                        },
                        {
                            id: "124",
                            creator: "11",
                            object: "image",
                            thumb: "https://picsum.photos/1920/1080",
                            url: "https://picsum.photos/1920/1080",
                            likes: 202,
                            share: 202,
                            comments: 202
                        },
                        {
                            id: "125",
                            creator: "11",
                            object: "image",
                            thumb: "https://picsum.photos/2560/1440",
                            url: "https://picsum.photos/2560/1440",
                            likes: 202,
                            share: 202,
                            comments: 202
                        }
                    ],
                    likes: 202,
                    share: 202,
                    comments: 202,
                    liked: false,
                    updated: "2019-01-04 14:00:00"
                }
            ];
            // console.log("[SocialPosts] list", result);
            // set to mutation
            commit(mutationTypes.SOCIAL.SET_POSTS_LIST, result);
        } catch (err) {
            // console.log("[SocialPosts] list.err", err)
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
    }
};

/**
 * initial mutations
 */
const mutations = {
    [mutationTypes.SOCIAL.SET_POSTS_LIST](state, _postsList) {
        state.postsList = _postsList;
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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};