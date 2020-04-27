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
// import RegisterDevice from "~/services/social/RegisterDevice";
// import Notifications from "~/services/social/notifications";

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
  detailPost: {},
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

  // commentItem: (state) => (postId, commentId) => {
  //   const [post = {}] = state.feeds.listPost.filter(
  //     (item) => item.post_id === postId
  //   );
  //   const { $commentTree = {} } = post;
  //   if ($commentTree.comments && $commentTree.comments.length) {
  //     const [comment = {}] = $commentTree.comments.filter(
  //       (item) => item.id === commentId
  //     );
  //     return comment;
  //   }
  //   return {};
  // },

  post: (state) => (id) =>
    state.feeds.listPost.find((post) => post.post_id === id),
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

      if (result.success) {
        const { listPost = [], page = {} } = result.data;
        const newListPost = listPost.map((post) => ({
          ...post,
          $commentTree: {},
        }));
        commit(mutationTypes.SOCIAL.SET_FEEDS, {
          listPost: uniqWith(
            state.feeds.listPost.concat(newListPost),
            (a, b) => a.post_id === b.post_id
          ),
          page,
        });
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
                  return {
                    ...item,
                    ...newPost,
                  };
                }
                return item;
              });
              commit(mutationTypes.SOCIAL.SET_FEEDS, {
                ...state.feeds,
                listPost: newListPost,
              });
              resolve(result);
              clearTimeout(timeout);
            }, get(payloay, "post_image", []).length * 1000);
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
              total_like: data.total_like,
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
              page: isEmpty(page) ? get(post, "$commentTree.page", {}) : page,
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

  async [actionTypes.SOCIAL.LIKE_COMMENT](
    { state, commit },
    { model = {}, postId } = {}
  ) {
    try {
      const result = await new Like(this.$axios)[actionTypes.BASE.ADD](model);

      if (result.success) {
        const { source_id } = model;
        const { total_like, type_like } = result.data;

        const newListPost = state.feeds.listPost.map((post) => {
          if (post.post_id === postId) {
            const newCommentTree = {
              ...post.$commentTree,
              comments: post.$commentTree.comments.map((comment) => {
                if (comment.id === source_id) {
                  return {
                    ...comment,
                    type_like,
                    is_like: !!type_like,
                    total_like,
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

  async [actionTypes.SOCIAL.GET_CHILD_COMMENT](
    { state, commit },
    { source_id, parent_comment_id, page } = {}
  ) {
    try {
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

  async [actionTypes.SOCIAL.DELETE_CHILD_COMMENT](
    { state, commit },
    { id, source_id, parent_comment_id } = {}
  ) {
    try {
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

  async [actionTypes.SOCIAL.LIKE_CHILD_COMMENT](
    { state, commit },
    { model = {}, postId, parentCommentId } = {}
  ) {
    try {
      const result = await new Like(this.$axios)[actionTypes.BASE.ADD](model);

      if (result.success) {
        const { source_id } = model;
        const { total_like, type_like } = result.data;

        const newListPost = state.feeds.listPost.map((post) => {
          if (post.post_id === postId) {
            const newComments = post.$commentTree.comments.map((comment) => {
              if (comment.id === parentCommentId) {
                const newChildCommentTree = {
                  ...comment.$children,
                  comments: comment.$children.comments.map((item) =>
                    item.id === source_id
                      ? {
                          ...item,
                          type_like,
                          is_like: !!type_like,
                          total_like,
                        }
                      : item
                  ),
                };
                return {
                  ...comment,
                  $children: newChildCommentTree,
                };
              }
              return comment;
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

  async [actionTypes.SOCIAL.GET_DETAIL_POST]({ state, commit }, payload) {
    try {
      const { success = false, data = {} } = await new Post(this.$axios)[
        actionTypes.BASE.DETAIL
      ](payload);

      if (success) {
        const post = {
          ...state.detailPost,
          ...data.data,
        };
        commit(mutationTypes.SOCIAL.SET_DETAIL_POST, post);
      }
      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.EDIT_DETAIL_POST]({ state, commit }, payload) {
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
              commit(mutationTypes.SOCIAL.SET_DETAIL_POST, {
                ...state.detailPost,
                ...newPost,
              });
              resolve(result);
              clearTimeout(timeout);
            }, get(payloay, "post_image", []).length * 1000);
          });
        }
      }

      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.DELETE_DETAIL_POST]({ state, commit }, payload) {
    try {
      const result = await new Post(this.$axios)[actionTypes.BASE.DELETE](
        payload
      );

      if (result.success) {
        commit(mutationTypes.SOCIAL.SET_DETAIL_POST, {});
      }

      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.LIKE_DETAIL_POST]({ state, commit }, payload) {
    try {
      const result = await new Like(this.$axios)[actionTypes.BASE.ADD](payload);

      if (result.success) {
        const { data } = result;

        commit(mutationTypes.SOCIAL.SET_DETAIL_POST, {
          ...state.detailPost,
          type_like: data.type_like,
          is_like: !!data.type_like,
          total_like: data.total_like,
        });
      }
      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.GET_COMMENT_DETAI_POST](
    { state, commit },
    payload
  ) {
    try {
      const result = await new Comment(this.$axios)[actionTypes.BASE.LIST]({
        params: payload,
      });

      if (result.success) {
        const { listParentComments = [], page = {} } = result.data;
        const post = state.detailPost;

        const newComments = [
          ...get(post, "$commentTree.comments", []),
          ...listParentComments.map((item) => ({
            ...item,
            $children: item.$children || {},
          })),
        ];

        const newCommentTree = {
          comments: uniqWith(newComments, (a, b) => a.id === b.id),
          page: isEmpty(page) ? get(post, "$commentTree.page", {}) : page,
        };

        const newPost = {
          ...post,
          $commentTree: newCommentTree,
        };

        commit(mutationTypes.SOCIAL.SET_DETAIL_POST, newPost);
      }

      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.ADD_COMMENT_DETAIL_POST](
    { state, commit },
    payload
  ) {
    try {
      const result = await new Comment(this.$axios)["postWithFormData"](
        payload
      );

      if (result.success) {
        const { data } = result;

        const newCommentTree = {
          ...(state.detailPost.$commentTree || {}),
          comments: [
            data,
            ...get(state.detailPost, "$commentTree.comments", []),
          ],
        };

        commit(mutationTypes.SOCIAL.SET_DETAIL_POST, {
          ...state.detailPost,
          total_comment: get(...state.detailPost, "total_comment", 0) + 1,
          $commentTree: newCommentTree,
        });
      }
      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.EDIT_COMMENT_DETAIL_POST](
    { state, commit },
    payload
  ) {
    try {
      const result = await new Comment(this.$axios)[
        actionTypes.BASE.EDIT_FORMDATA
      ](omit(payload, ["parent_comment_id"]));

      if (result.success) {
        const { data } = result;
        const post = state.detailPost;

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

        commit(mutationTypes.SOCIAL.SET_DETAIL_POST, {
          ...post,
          $commentTree: newCommentTree,
        });
      }
      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.DELETE_COMMENT_DETAIL_POST](
    { state, commit },
    { id } = {}
  ) {
    try {
      const result = await new Comment(this.$axios)[
        actionTypes.BASE.DELETE_PAYLOAD
      ]({
        params: { id },
      });

      if (result.success) {
        const post = state.detailPost;
        const [comment = {}] = post.$commentTree.comments.filter(
          (item) => item.id === id
        );
        const { $children = {} } = comment;
        const childrenLength = isEmpty($children)
          ? get(comment, "children.total", 0)
          : get(comment, "$children.comments", []).length;

        const newPost = {
          ...post,
          total_comment: post.total_comment - (childrenLength + 1),
          $commentTree: {
            ...post.$commentTree,
            comments: post.$commentTree.comments.filter(
              (comment) => comment.id !== id
            ),
          },
        };

        commit(mutationTypes.SOCIAL.SET_DETAIL_POST, newPost);
      }

      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.LIKE_COMMENT_DETAIL_POST](
    { state, commit },
    { model = {} } = {}
  ) {
    try {
      const result = await new Like(this.$axios)[actionTypes.BASE.ADD](model);

      if (result.success) {
        const { source_id } = model;
        const { total_like, type_like } = result.data;
        const post = state.detailPost;

        const newCommentTree = {
          ...post.$commentTree,
          comments: post.$commentTree.comments.map((comment) => {
            if (comment.id === source_id) {
              return {
                ...comment,
                type_like,
                is_like: !!type_like,
                total_like,
              };
            } else {
              return comment;
            }
          }),
        };

        const newPost = {
          ...post,
          $commentTree: newCommentTree,
        };

        commit(mutationTypes.SOCIAL.SET_FEEDS, newPost);
      }

      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.GET_CHILD_COMMENT_DETAI_POST](
    { state, commit },
    { parent_comment_id, page } = {}
  ) {
    try {
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
        const post = state.detailPost;

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

        const newPost = {
          ...post,
          $commentTree: newCommentTree,
        };

        commit(mutationTypes.SOCIAL.SET_FEEDS, newPost);
      }

      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.ADD_CHILD_COMMENT_DETAIL_POST](
    { state, commit },
    payload
  ) {
    try {
      const result = await new Comment(this.$axios)[actionTypes.BASE.ADD](
        payload
      );

      if (result.success) {
        const { parent_comment_id } = payload;
        const { data } = result;
        const post = state.detailPost;

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

        const newPost = {
          ...post,
          total_comment: post.total_comment + 1,
          $commentTree: newCommentTree,
        };

        commit(mutationTypes.SOCIAL.SET_FEEDS, newPost);
      }

      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.EDIT_CHILD_COMMENT_DETAIL_POST](
    { state, commit },
    payload
  ) {
    try {
      const result = await new Comment(this.$axios)["putWithFormData"](
        omit(payload, ["parent_comment_id"])
      );

      if (result.success) {
        const { comment_id, parent_comment_id } = payload;
        const { data } = result;
        const post = state.detailPost;

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

        const newPost = {
          ...post,
          $commentTree: newCommentTree,
        };

        commit(mutationTypes.SOCIAL.SET_FEEDS, newPost);
      }

      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.DELETE_CHILD_COMMENT_DETAIL_POST](
    { state, commit },
    { id, parent_comment_id } = {}
  ) {
    try {
      const result = await new Comment(this.$axios)[
        actionTypes.BASE.DELETE_PAYLOAD
      ]({
        params: { id },
      });

      if (result.success) {
        const post = state.detailPost;
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

        const newPost = {
          ...post,
          total_comment: post.total_comment - 1,
          $commentTree: newCommentTree,
        };

        commit(mutationTypes.SOCIAL.SET_DETAIL_POST, newPost);
      }

      return result;
    } catch (error) {
      return error;
    }
  },

  async [actionTypes.SOCIAL.LIKE_CHILD_COMMENT_DETAIL_POST](
    { state, commit },
    { model = {}, parentCommentId } = {}
  ) {
    try {
      const result = await new Like(this.$axios)[actionTypes.BASE.ADD](model);

      if (result.success) {
        const { source_id } = model;
        const { total_like, type_like } = result.data;
        const post = state.detailPost;

        const newComments = post.$commentTree.comments.map((comment) => {
          if (comment.id === parentCommentId) {
            const newChildCommentTree = {
              ...comment.$children,
              comments: comment.$children.comments.map((item) =>
                item.id === source_id
                  ? {
                      ...item,
                      type_like,
                      is_like: !!type_like,
                      total_like,
                    }
                  : item
              ),
            };
            return {
              ...comment,
              $children: newChildCommentTree,
            };
          }
          return comment;
        });

        const newCommentTree = {
          ...post.$commentTree,
          comments: newComments,
        };

        const newPost = {
          ...post,
          $commentTree: newCommentTree,
        };

        commit(mutationTypes.SOCIAL.SET_DETAIL_POST, newPost);
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

  [mutationTypes.SOCIAL.SET_DETAIL_POST](state, _detailPost) {
    state.detailPost = _detailPost;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
