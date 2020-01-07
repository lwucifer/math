import * as actionTypes from '../utils/action-types';
import * as mutationTypes from '../utils/mutation-types';
import SocialPosts from '../services/social/post';

/**
 * initial state
 */
const state = () => ({
    postsList: {},
})

/**
 * initial getters
 */
const getters = {

}

/**
 * initial actions
 */
const actions = {
    /**
     * LIST
     */
    async [actionTypes.SOCIAL_POST.LIST]({
        commit
    }, payload) {
        try {
            // const result = await new SocialPosts(this.$axios)[actionTypes.BASE.LIST](payload);
            const result = [{
                    id: 1,
                    creator: {
                        id: 1,
                        avatar: "https://picsum.photos/64/64",
                        fullname: 'Tien Dat Leo'
                    },
                    privacy: 'Day la privacy',
                    label: 'Day la label',
                    tags: [{
                        user_id: '1',
                        avatar: "https://picsum.photos/64/64",
                        fullname: 'Tien Dat Leo'
                    }],
                    checkin: {
                        lat: '11',
                        lon: '22',
                        addr: 'noi check in'
                    },
                    content: 'Day là content',
                    attachments: [{
                        id: '12',
                        creator: '1',
                        object: {

                        },
                        thumb: "https://picsum.photos/64/64",
                        url: "https://picsum.photos/64/64",
                        like: 20,
                        share: 20,
                        comments: 20,
                    }],
                    like: 20,
                    share: 20,
                    comments: 20,
                    liked: true,
                    update: '2019-01-06 14:00:00'
                },
                {
                    id: 2,
                    creator: {
                        id: 2,
                        avatar: "https://picsum.photos/64/64",
                        fullname: 'Tien Dat Leo'
                    },
                    privacy: 'Day la privacy1',
                    label: 'Day la label1',
                    tags: [{
                        user_id: '2',
                        avatar: "https://picsum.photos/64/64",
                        fullname: 'Tien Dat Leo ok'
                    }],
                    checkin: {
                        lat: '111',
                        lon: '221',
                        addr: 'noi check in1111'
                    },
                    content: 'Day là content1111',
                    attachments: [{
                        id: '123',
                        creator: '11',
                        object: {

                        },
                        thumb: "https://picsum.photos/64/64",
                        url: "https://picsum.photos/64/64",
                        like: 202,
                        share: 202,
                        comments: 202,
                    }],
                    like: 202,
                    share: 202,
                    comments: 202,
                    liked: false,
                    update: '2019-01-04 14:00:00'
                }
            ]
            console.log("[SocialPosts] list", result);
            // set to mutation
            commit(mutationTypes.SOCIAL.SET_POSTS_LIST, result);
        } catch (err) {
            console.log("[SocialPosts] list.err", err)
            return err;
        }
    },

    // /**
    //  * ADD
    //  * @param {*} param0 
    //  * @param {*} payload 
    //  */
    // async [actionTypes.FIREWALL.ADD]({
    //     commit
    // }, payload) {
    //     try {
    //         const result = await new FirewallService(this.$axios)[actionTypes.BASE.ADD](payload);
    //         console.log("[FirewallService] add", result);
    //         return result;
    //     } catch (err) {
    //         console.log("[FirewallService] add.err", err)
    //         return err;
    //     }
    // },

    // /**
    //  * EDIT
    //  * @param {*} param0 
    //  * @param {*} payload 
    //  */
    // async [actionTypes.FIREWALL.EDIT]({
    //     commit
    // }, payload) {
    //     try {
    //         const result = await new FirewallService(this.$axios)[actionTypes.BASE.EDIT](payload);
    //         console.log("[FirewallService] edit", result);
    //         return result;
    //     } catch (err) {
    //         console.log("[FirewallService] edit.err", err)
    //         return err;
    //     }
    // },

    // /**
    //  * DELETE
    //  * @param {*} param0 
    //  * @param {*} payload 
    //  */
    // async [actionTypes.FIREWALL.DELETE]({
    //     commit
    // }, payload) {
    //     try {
    //         const result = await new FirewallService(this.$axios)[actionTypes.BASE.DELETE](payload);
    //         console.log("[FirewallService] delete", result);
    //         return result;
    //     } catch (err) {
    //         console.log("[FirewallService] delete.err", err)
    //         return err;
    //     }
    // },


};

/**
 * initial mutations
 */
const mutations = {
    [mutationTypes.SOCIAL.SET_POSTS_LIST](state, _postsList) {
        state.postsList = _postsList;
    }
}



export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}