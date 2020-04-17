<template>
  <div class="post">
    <div class="post__top">
      <n-link to class="post__avatar-wrapper">
        <app-avatar
          class="post__avatar"
          :src="post.author && post.author.avatar ? post.author.avatar.medium : null"
          size="lg"
        ></app-avatar>
      </n-link>

      <div class="post__title">
        <div class="post__title-row mb-1">
          <h5 class="post__name">
            <n-link
              :to="`/account/${get(post, 'author.id', null)}`"
            >{{ get(post, 'author.fullname', '') }}</n-link>
          </h5>
        </div>

        <div class="post__title-row">
          <n-link
            v-if="post.created_at"
            class="post__time"
            to
          >{{ post.created_at | moment('from') }}</n-link>

          <span class="post__share-for" :title="post.privacy ? post.privacy.desc : ''">
            <img :src="post.privacy ? post.privacy.image : ''" alt />
            <!-- <IconGlobe class="icon" /> -->
          </span>
        </div>

        <!-- <template v-if="showEdit && userId === get(post, 'author.id', null)">
          <button v-show="!edit" class="post__btn-edit" @click="edit = true">Chỉnh sửa</button>
        </template>-->
      </div>
    </div>

    <div class="post__post">
      <template v-if="edit">
        <textarea rows="3" class="post__edit-desc" placeholder="Thêm mô tả" v-textarea-autosize>Những người phụ nữ đang bán hàng online và đang gặp phải vấn đề liên quan đến bán lẻ và phát triển đội nhóm. Đang bị Thiếu chiến lược, thiếu kế hoạch hành động chi tiết.</textarea>
        <input type="text" placeholder="Cùng với ai?" class="post__edit-tag" />
        <input type="text" placeholder="Ở đâu?" class="post__edit-location" />

        <div class="post__edit-actions">
          <app-select class="post__edit-select" :options="shareWithOpts" v-model="shareWith">
            <IconGlobe slot="prepend" class="post__edit-select__prepend d-block" />
          </app-select>

          <button class="post__edit-btn post__edit-btn-cancel" @click="edit = false">Huỷ</button>
          <button class="post__edit-btn post__edit-btn-done" @click="edit = false">Chỉnh sửa xong</button>
        </div>
      </template>

      <template v-else>
        <div class="post__post-desc" v-html="post.content"></div>
        <!-- <a href @click.prevent class="post__post-readmore">Xem thêm</a> -->

        <template v-if="post.label || (post.tags && post.tags.length)">—</template>

        <span v-if="post.label" class="text-sub font-weight-normal">
          cảm thấy {{ post.label.icon }}
          <b class="text-base">{{ post.label.des }}</b>
        </span>

        <PostTags v-if="post.tags && post.tags.length" :tags="post.tags || []" />
      </template>

      <slot name="media-content" />

      <slot />
    </div>

    <div class="post__interactive">
      <div class="post__count">
        <span>{{ post.total_like }} lượt thích</span>
        <span>{{ post.total_comment }} bình luận</span>
      </div>

      <app-divider class="mt-3 mb-0" />

      <div class="post__actions my-3">
        <button
          class="post__button"
          :class="{ 'active': post.is_like }"
          :disabled="btnLikeLoading"
          @click="handleClickLike"
        >
          <IconHeart class="icon" width="2.1rem" height="1.8rem" />Thích
        </button>

        <button
          class="post__button"
          :disabled="btnCommentLoading"
          @click="!isCommentFetched && getParentComment()"
        >
          <IconBubble class="icon" width="2.1rem" height="2rem" />Bình luận
        </button>

        <button class="post__button">
          <IconShare class="icon" width="2.1rem" height="2.1rem" />Chia sẻ
        </button>
      </div>

      <template v-if="isCommentFetched">
        <app-divider class="mt-0 mb-3" />

        <div class="post__comment-list">
          <CommentItem
            v-for="item in listParentComments"
            :key="item.id"
            :post="post"
            :data="item"
            @deleted="handleDeleted"
          />

          <div class="text-center">
            <a
              v-if="parentCommentData.page && !parentCommentData.page.last"
              href
              class="post__comment-more"
              @click.prevent="getParentComment"
            >Xem thêm {{ numOfViewMoreParentComment }} bình luận ...</a>
          </div>

          <div
            v-if="!listParentComments.length"
            class="post__comment-empty text-center text-sub"
          >Bài viết chưa có bình luận.</div>
        </div>

        <CommentEditor class="post__comment-editor mb-3" @submit="postComment" />
      </template>

      <div class="text-center" v-if="btnCommentLoading">
        <app-spin />
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "lodash";
import CommentService from "~/services/social/comments";
import { BASE as ACTION_TYPE_BASE } from "~/utils/action-types";
import { createComment } from "~/models/social/Comment";

const PostTags = () => import("~/components/page/timeline/post/PostTags.vue");
const CommentItem = () =>
  import("~/components/page/timeline/comment/CommentItem");
const CommentItemReplied = () =>
  import("~/components/page/timeline/comment/CommentItemReplied");
const CommentEditor = () =>
  import("~/components/page/timeline/comment/CommentEditor");

import IconGlobe from "~/assets/svg/icons/globe.svg?inline";
import IconHeart from "~/assets/svg/icons/heart.svg?inline";
import IconBubble from "~/assets/svg/icons/bubble.svg?inline";
import IconShare from "~/assets/svg/icons/share.svg?inline";
import IconDots from "~/assets/svg/icons/dots.svg?inline";

export default {
  components: {
    PostTags,
    CommentItem,
    CommentItemReplied,
    CommentEditor,
    IconGlobe,
    IconHeart,
    IconBubble,
    IconShare,
    IconDots
  },

  props: {
    showEdit: Boolean,
    comments: {
      type: Number,
      default: 0
    },
    content: {
      type: String,
      default: ""
    },
    post: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      edit: false,
      menuDropdown: false,
      btnLikeLoading: false,
      btnCommentLoading: false,
      isCommentFetched: false,
      shareWith: 0,
      shareWithOpts: [
        { value: 0, text: "Công khai" },
        { value: 1, text: "Bạn bè" },
        { value: 3, text: "Chỉ mình tôi" }
      ],
      parentCommentParams: {
        page: 1,
        limit: 10
      },
      parentCommentData: {}
    };
  },

  computed: {
    listParentComments() {
      return this.parentCommentData.listParentComments || [];
    },

    numOfViewMoreParentComment() {
      const { page } = this.parentCommentData;
      return page.totalPages - page.number === 1
        ? page.totalElements % page.size
        : page.size;
    },

    userId() {
      const { $store: store = {} } = this;
      return "id" in store.state.auth.token ? store.state.auth.token.id : null;
    }
  },

  // created() {
  //   this.getParentComment();
  // },

  watch: {
    post(newValue, oldValue) {
      if (newValue.post_id !== oldValue.post_id) {
        this.resetFetchCommentData();
        this.getParentComment();
      }
    }
  },

  methods: {
    get,

    resetFetchCommentData() {
      this.parentCommentData = {};
      this.parentCommentParams = {
        page: 1,
        limit: 10
      };
    },

    handleClickDelete() {
      this.$emit("delete", this.post.post_id);
    },

    handleClickLike() {
      const cb = () => {
        this.btnLikeLoading = false;
      };
      this.$emit("like", this.post.post_id, cb);
      this.btnLikeLoading = true;
    },

    async getParentComment() {
      this.btnCommentLoading = true;

      const getComment = await new CommentService(this.$axios)[
        ACTION_TYPE_BASE.LIST
      ]({
        params: { ...this.parentCommentParams, source_id: this.post.post_id }
      });

      if (getComment.success) {
        // Set to parent comment data
        const { listParentComments, page } = this.parentCommentData;
        if (listParentComments && page) {
          this.parentCommentData = {
            listParentComments: [
              ...listParentComments,
              ...getComment.data.listParentComments
            ],
            page: getComment.data.page
          };
        } else {
          this.parentCommentData = getComment.data;
        }

        // Set page param for the next request
        this.parentCommentParams.page += 1;
      } else {
        this.$toasted.error(getComment.message);
      }

      this.btnCommentLoading = false;
      this.isCommentFetched = true;
    },

    async postComment({ content, listTags, image, link }) {
      const formData = new FormData();
      const commentModel = createComment({
        source_id: this.post.post_id,
        comment_content: content,
        list_tag: listTags,
        comment_images: image,
        comment_link: link
      });

      for (const key in commentModel) {
        const value = commentModel[key];
        if (value === null || value === undefined) continue;
        // Check whether field is an array
        formData.append(
          key,
          Array.isArray(value) ? JSON.stringify(value) : value
        );
      }

      const doPostComment = await new CommentService(this.$axios)[
        ACTION_TYPE_BASE.ADD
      ](formData);

      if (doPostComment.success) {
        const timeout = setTimeout(
          () => {
            if ("listParentComments" in this.parentCommentData) {
              const { listParentComments } = this.parentCommentData;
              this.parentCommentData.listParentComments = [
                doPostComment.data,
                ...listParentComments
              ];
            } else {
              this.parentCommentData = {
                listParentComments: [doPostComment.data]
              };
            }
            
            clearTimeout(timeout);
          },
          image ? 1000 : 0
        );
      } else {
        this.$toasted.error(doPostComment.message);
      }
    },

    handleDeleted(id) {
      if ("listParentComments" in this.parentCommentData) {
        this.parentCommentData.listParentComments = this.parentCommentData.listParentComments.filter(
          comment => comment.id !== id
        );
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/post/_post.scss";
</style>