import { get, omit, uniqWith, isEmpty } from "lodash";
import * as actionTypes from "~/utils/action-types";
import * as mutationTypes from "~/utils/mutation-types";
import Post from "~/services/social/post";
import Feeds from "~/services/social/feeds";
import Like from "~/services/social/likes";
import Share from "~/services/social/shares";
import Comment from "~/services/social/comments";
import Config from "~/services/social/config";
import Label from "~/services/social/label";
// import Friend from "~/services/social/friend";
// import FriendInvite from "~/services/social/Friendinvite";
// import Photos from "~/services/social/photos";
// import SocialFollow from "~/services/social/follow";
// import TagPhotos from "~/services/social/tagPhoto";

/**
 * initial state
 */
const state = () => ({
  configs: {},
  labels: [],
  feeds: {
    listPost: [],
    page: {},
  },
});

/**
 * initial getters
 */
const getters = {
  configPrivacyLevels: (state) => get(state, "configs.privacy_levels", []),

  // commentTree: (state) => (postId, parentId) => {
  //   const [post = {}] = state.feeds.listPost.filter(
  //     (item) => item.post_id === postId
  //   );
  //   const { $commentTree = {} } = post;

  //   if (!parentId) {
  //     return $commentTree;
  //   } else {
  //     const [commentObj = {}] =
  //       $commentTree.comments && $commentTree.comments.length
  //         ? $commentTree.comments.filter((item) => item.id === parentId)
  //         : [];
  //     return commentObj.$children || {};
  //   }
  // },

  commentItem: (state) => (postId, commentId) => {
    const [post = {}] = state.feeds.listPost.filter(
      (item) => item.post_id === postId
    );
    const { $commentTree = {} } = post;
    if ($commentTree.comments && $commentTree.comments.length) {
      const [comment = {}] = $commentTree.comments.filter(
        (item) => item.id === commentId
      );
      return comment;
    }
    return {};
  },
};

/**
 * initial actions
 */
const actions = {
  async [actionTypes.SOCIAL.GET_CONFIGS]({ commit }, payload) {
    try {
      const result = await new Config(this.$axios)[actionTypes.BASE.LIST](
        payload
      );
      // set to mutation
      commit(mutationTypes.SOCIAL.SET_CONFIGS, result.data);
      return result;
    } catch (err) {
      return err;
    }
  },

  async [actionTypes.SOCIAL.GET_LABELS]({ commit }, payload) {
    try {
      const result = await new Label(this.$axios)[actionTypes.BASE.LIST](
        payload
      );
      // set to mutation
      commit(
        mutationTypes.SOCIAL.SET_LABELS,
        get(result, "data.list_icon", [])
      );
      return result;
    } catch (err) {
      return err;
    }
  },

  async [actionTypes.SOCIAL.GET_FEEDS]({ state, commit }, payload) {
    try {
      const result = await new Feeds(this.$axios)[actionTypes.BASE.LIST](
        payload
      );

      if (state.feeds.listPost) {
        const listPost = result.data.listPost.map((post) => ({
          ...post,
          $commentTree: {},
        }));
        commit(mutationTypes.SOCIAL.SET_FEEDS, {
          ...state.feeds,
          listPost: uniqWith(
            state.feeds.listPost.concat(listPost),
            (a, b) => a.post_id === b.post_id
          ),
        });
      } else {
        commit(mutationTypes.SOCIAL.SET_FEEDS, result.data);
      }
      return result;
    } catch (err) {
      return err;
    }
  },

  async [actionTypes.SOCIAL.ADD_POST]({ state, commit }, payload) {
    try {
      const formData = new FormData();

      for (const key in payload) {
        // Check whether field is an array
        if (key === "post_image") {
          const values = payload[key];
          for (let i = 0; i < values.length; i++) {
            formData.append(key, values[i]);
          }
        } else {
          formData.append(
            key,
            Array.isArray(payload[key])
              ? JSON.stringify(payload[key])
              : payload[key]
          );
        }
      }

      const result = await new Post(this.$axios)[actionTypes.BASE.ADD](
        formData
      );

      if (result.success) {
        const newPost = {
          ...result.data,
          $commentTree: {},
        };

        return new Promise((resolve) => {
          const timeout = setTimeout(() => {
            commit(mutationTypes.SOCIAL.SET_FEEDS, {
              ...state.feeds,
              listPost: [newPost, ...get(state, "feeds.listPost", [])],
            });
            resolve(result);
            clearTimeout(timeout);
          }, payload.post_image.length * 1000);
        });
      }
      return result;
    } catch (err) {
      return err;
    }
  },

  async [actionTypes.SOCIAL.EDIT_POST]({ state, commit }, payload) {
    try {
      const formData = new FormData();

      for (const key in payload) {
        // Check whether field is an array
        if (key === "post_image") {
          const values = payload[key];
          for (let i = 0; i < values.length; i++) {
            formData.append(key, values[i]);
          }
        } else {
          formData.append(
            key,
            Array.isArray(payload[key])
              ? JSON.stringify(payload[key])
              : payload[key]
          );
        }
      }

      const result = await new Post(this.$axios)[actionTypes.BASE.EDIT_PAYLOAD](
        formData
      );

      if (result.success) {
        const {
          success: getDetailSuccess = false,
          data: newPost = {},
        } = await new Post(this.$axios)[actionTypes.BASE.DETAIL](
          payload.post_id
        );

        if (getDetailSuccess) {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => {
              const newListPost = state.feeds.listPost.map((item) => {
                if (item.post_id === payload.post_id) {
                  return newPost;
                }
                return item;
              });
              commit(mutationTypes.SOCIAL.SET_FEEDS, {
                ...state.feeds,
                listPost: newListPost,
              });
              resolve(result);
              clearTimeout(timeout);
            }, payload.post_image.length * 1000);
          });
        }
      }

      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.DELETE_POST]({ state, commit }, payload) {
    try {
      const result = await new Post(this.$axios)[actionTypes.BASE.DELETE](
        payload
      );

      if (result.success) {
        const newListPost = state.feeds.listPost.filter(
          (item) => item.post_id !== payload
        );
        commit(mutationTypes.SOCIAL.SET_FEEDS, {
          ...state.feeds,
          listPost: newListPost,
        });
      }

      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.LIKE_POST]({ state, commit }, payload) {
    try {
      const result = await new Like(this.$axios)[actionTypes.BASE.ADD](payload);

      if (result.success) {
        const { data } = result;
        const newListPost = state.feeds.listPost.map((item) => {
          if (item.post_id === payload.source_id) {
            return {
              ...item,
              type_like: data.type_like,
              is_like: !!data.type_like,
              total_like: !!data.type_like
                ? item.total_like + 1
                : item.total_like - 1,
            };
          }
          return item;
        });

        commit(mutationTypes.SOCIAL.SET_FEEDS, {
          ...state.feeds,
          listPost: newListPost,
        });
      }
      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.SHARE]({ state, commit }, payload) {
    try {
      const result = await new Share(this.$axios)[actionTypes.BASE.ADD](
        payload
      );

      if (result.success) {
        const { success, data: newPost = {} } = await new Post(this.$axios)[
          actionTypes.BASE.DETAIL
        ](result.data.post_id);

        if (success) {
          commit(mutationTypes.SOCIAL.SET_FEEDS, {
            ...state.feeds,
            listPost: [newPost, ...state.feeds.listPost],
          });
        }
      }
      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.GET_COMMENT]({ state, commit }, payload) {
    try {
      const result = await new Comment(this.$axios)[actionTypes.BASE.LIST]({
        params: payload,
      });

      if (result.success) {
        const { listParentComments = [], page = {} } = result.data;

        const newListPost = state.feeds.listPost.map((post) => {
          if (post.post_id === payload.source_id) {
            const newComments = [
              ...get(post, "$commentTree.comments", []),
              ...listParentComments.map((item) => ({
                ...item,
                $children: item.$children || {},
              })),
            ];

            const newCommentTree = {
              comments: uniqWith(newComments, (a, b) => a.id === b.id),
              page,
            };

            return {
              ...post,
              $commentTree: newCommentTree,
            };
          } else {
            return post;
          }
        });

        commit(mutationTypes.SOCIAL.SET_FEEDS, {
          ...state.feeds,
          listPost: newListPost,
        });
      }

      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.ADD_COMMENT]({ state, commit }, payload) {
    try {
      const result = await new Comment(this.$axios)["postWithFormData"](
        payload
      );

      if (result.success) {
        const { source_id } = payload;
        const { data } = result;

        const newListPost = state.feeds.listPost.map((post) => {
          if (post.post_id === source_id) {
            const newCommentTree = {
              ...post.$commentTree,
              comments: [data, ...get(post, "$commentTree.comments", [])],
            };
            return {
              ...post,
              total_comment: post.total_comment + 1,
              $commentTree: newCommentTree,
            };
          } else {
            return post;
          }
        });

        commit(mutationTypes.SOCIAL.SET_FEEDS, {
          ...state.feeds,
          listPost: newListPost,
        });
      }
      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.EDIT_COMMENT]({ state, commit }, payload) {
    try {
      const result = await new Comment(this.$axios)["putWithFormData"](
        omit(payload, ["parent_comment_id"])
      );

      if (result.success) {
        const { source_id, comment_id } = payload;
        const { data } = result;

        const newListPost = state.feeds.listPost.map((post) => {
          if (post.post_id === source_id) {
            const newCommentTree = {
              ...post.$commentTree,
              comments: post.$commentTree.comments.map((comment) => {
                if (comment.id === comment_id) {
                  return {
                    ...comment,
                    ...data,
                  };
                } else {
                  return comment;
                }
              }),
            };

            return {
              ...post,
              $commentTree: newCommentTree,
            };
          } else {
            return post;
          }
        });

        commit(mutationTypes.SOCIAL.SET_FEEDS, {
          ...state.feeds,
          listPost: newListPost,
        });
      }

      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.DELETE_COMMENT]({ state, commit }, payload) {
    try {
      const { id, source_id } = payload;
      const result = await new Comment(this.$axios)[
        actionTypes.BASE.DELETE_PAYLOAD
      ]({
        params: { id },
      });

      if (result.success) {
        const newListPost = state.feeds.listPost.map((post) => {
          if (post.post_id === source_id) {
            // debugger;
            const [comment = {}] = post.$commentTree.comments.filter(
              (item) => item.id === id
            );
            const { $children = {} } = comment;
            const childrenLength = isEmpty($children)
              ? get(comment, "children.total", 0)
              : get(comment, "$children.comments", []).length;

            return {
              ...post,
              total_comment: post.total_comment - (childrenLength + 1),
              $commentTree: {
                ...post.$commentTree,
                comments: post.$commentTree.comments.filter(
                  (comment) => comment.id !== id
                ),
              },
            };
          } else {
            return post;
          }
        });

        commit(mutationTypes.SOCIAL.SET_FEEDS, {
          ...state.feeds,
          listPost: newListPost,
        });
      }

      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.GET_CHILD_COMMENT]({ state, commit }, payload) {
    try {
      const { source_id, parent_comment_id, page } = payload;
      const result = await new Comment(this.$axios)[
        actionTypes.SOCIAL_COMMENTS.LIST_CHILDREN
      ]({
        params: {
          parent_comment_id,
          page,
        },
      });

      if (result.success) {
        const { listComments = [], page = {} } = result.data;

        const newListPost = state.feeds.listPost.map((post) => {
          if (post.post_id === source_id) {
            const newComments = post.$commentTree.comments.map((comment) => {
              if (comment.id === parent_comment_id) {
                const newChildComments = [
                  ...get(comment, "$children.comments", []),
                  ...listComments,
                ];

                const newChildCommentTree = {
                  comments: uniqWith(newChildComments, (a, b) => a.id === b.id),
                  page,
                };

                return {
                  ...comment,
                  $children: newChildCommentTree,
                };
              } else {
                return comment;
              }
            });

            const newCommentTree = {
              ...post.$commentTree,
              comments: newComments,
            };

            return {
              ...post,
              $commentTree: newCommentTree,
            };
          } else {
            return post;
          }
        });

        commit(mutationTypes.SOCIAL.SET_FEEDS, {
          ...state.feeds,
          listPost: newListPost,
        });
      }

      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.ADD_CHILD_COMMENT]({ state, commit }, payload) {
    try {
      const result = await new Comment(this.$axios)[actionTypes.BASE.ADD](
        payload
      );

      if (result.success) {
        const { source_id, parent_comment_id } = payload;
        const { data } = result;

        const newListPost = state.feeds.listPost.map((post) => {
          if (post.post_id === source_id) {
            const newComments = post.$commentTree.comments.map((comment) => {
              if (comment.id === parent_comment_id) {
                const newChildCommentTree = {
                  ...comment.$children,
                  comments: [data, ...get(comment, "$children.comments", [])],
                };
                return {
                  ...comment,
                  $children: newChildCommentTree,
                };
              } else {
                return comment;
              }
            });

            const newCommentTree = {
              ...post.$commentTree,
              comments: newComments,
            };

            return {
              ...post,
              total_comment: post.total_comment + 1,
              $commentTree: newCommentTree,
            };
          } else {
            return post;
          }
        });

        commit(mutationTypes.SOCIAL.SET_FEEDS, {
          ...state.feeds,
          listPost: newListPost,
        });
      }

      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.EDIT_CHILD_COMMENT]({ state, commit }, payload) {
    try {
      const result = await new Comment(this.$axios)["putWithFormData"](
        omit(payload, ["parent_comment_id"])
      );

      if (result.success) {
        const { source_id, comment_id, parent_comment_id } = payload;
        const { data } = result;

        const newListPost = state.feeds.listPost.map((post) => {
          if (post.post_id === source_id) {
            const newComments = post.$commentTree.comments.map((comment) => {
              if (comment.id === parent_comment_id) {
                const newChildCommentTree = {
                  ...comment.$children,
                  comments: comment.$children.comments.map((item) =>
                    item.id === comment_id ? { ...item, ...data } : item
                  ),
                };
                return {
                  ...comment,
                  $children: newChildCommentTree,
                };
              } else {
                return comment;
              }
            });

            const newCommentTree = {
              ...post.$commentTree,
              comments: newComments,
            };

            return {
              ...post,
              $commentTree: newCommentTree,
            };
          } else {
            return post;
          }
        });

        commit(mutationTypes.SOCIAL.SET_FEEDS, {
          ...state.feeds,
          listPost: newListPost,
        });
      }

      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.DELETE_CHILD_COMMENT]({ state, commit }, payload) {
    try {
      const { id, source_id, parent_comment_id } = payload;
      const result = await new Comment(this.$axios)[
        actionTypes.BASE.DELETE_PAYLOAD
      ]({
        params: { id },
      });

      if (result.success) {
        const newListPost = state.feeds.listPost.map((post) => {
          if (post.post_id === source_id) {
            const newComments = post.$commentTree.comments.map((comment) => {
              if (comment.id === parent_comment_id) {
                const newChildCommentTree = {
                  ...comment.$children,
                  comments: comment.$children.comments.filter(
                    (item) => item.id !== id
                  ),
                };
                return {
                  ...comment,
                  $children: newChildCommentTree,
                };
              } else {
                return comment;
              }
            });

            const newCommentTree = {
              ...post.$commentTree,
              comments: newComments,
            };

            return {
              ...post,
              total_comment: post.total_comment - 1,
              $commentTree: newCommentTree,
            };
          } else {
            return post;
          }
        });

        commit(mutationTypes.SOCIAL.SET_FEEDS, {
          ...state.feeds,
          listPost: newListPost,
        });
      }

      return result;
    } catch (error) {
      return error;
    }
  },
};

/**
 * initial mutations
 */
const mutations = {
  [mutationTypes.SOCIAL.SET_CONFIGS](state, _configs) {
    state.configs = _configs;
  },

  [mutationTypes.SOCIAL.SET_LABELS](state, _labels) {
    state.labels = _labels;
  },

  [mutationTypes.SOCIAL.SET_FEEDS](state, _feeds) {
    state.feeds = _feeds;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
