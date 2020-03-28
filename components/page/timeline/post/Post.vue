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
              :to="`/account/${post.author.id}`"
            >{{ post.author && post.author.fullname ? post.author.fullname : '' }}</n-link>

            <span v-if="post.label" class="text-sub font-weight-normal">
              cảm thấy {{ post.label.icon }}
              <b class="text-base">{{ post.label.des }}</b>
            </span>

            <PostTags v-if="post.tags && post.tags.length" :tags="post.tags || []" />
          </h5>
        </div>

        <div class="post__title-row">
          <n-link class="post__time" to>{{ post.created_at | moment('from') }}</n-link>
          <span class="post__share-for" :title="post.privacy ? post.privacy.desc : ''">
            <img :src="post.privacy ? post.privacy.image : ''" alt />
            <!-- <IconGlobe class="icon" /> -->
          </span>
        </div>
      </div>

      <app-dropdown
        v-if="showMenuDropdown"
        class="post__menu-dropdown"
        position="right"
        open-on-click
        v-model="menuDropdown"
      >
        <button slot="activator" slot-scope="{ on }" v-on="on" class="post__menu-dropdown__btn">
          <IconDots class="icon" />
        </button>

        <ul class="post__menu-dropdown__list">
          <li>
            <a href @click.prevent="$emit('edit', post)">Chỉnh sửa bài viết</a>
          </li>
          <li>
            <a href @click.prevent="handleClickDelete">Xoá</a>
          </li>
        </ul>
      </app-dropdown>
    </div>

    <div class="post__post">
      <div class="post__post-desc" v-html="post.content"></div>
      <!-- <a href @click.prevent class="post__post-readmore">Xem thêm</a> -->

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

        <button class="post__button" @click="$emit('share', post)">
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
    showMenuDropdown: Boolean,
    showComment: Boolean,
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
      default: () => {},
      validator: value =>
        [
          "post_id",
          "author",
          "created_at",
          "total_like",
          "total_comment",
          "content",
          "privacy"
        ].every(key => key in value)
    }
  },

  data() {
    return {
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
        limit: 10,
        source_id: this.post.post_id
      },
      parentCommentData: {},
      childrenCommentData: {}
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
    }
  },

  created() {
    this.showComment && this.getParentComment();
  },

  methods: {
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
        params: this.parentCommentParams
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

    async postComment(content) {
      const commentModel = createComment(this.post.post_id, null, content);
      const doPostComment = await new CommentService(this.$axios)[
        ACTION_TYPE_BASE.ADD
      ](commentModel);

      if (doPostComment.success) {
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