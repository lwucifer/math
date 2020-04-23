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
      <div v-if="!checkEditorEmpty(post.content)" v-html="post.content" class="post__post-desc"></div>
      <!-- <a href @click.prevent class="post__post-readmore">Xem thêm</a> -->

      <slot name="media-content" :link="testJSON(post.link)  ? JSON.parse(post.link) : null" />

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
          @click="!isCommentFetched && getComment()"
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
            v-for="item in commentTree.comments || []"
            :key="item.id"
            :post="post"
            :data="item"
          />

          <div class="text-center" v-if="btnCommentLoading">
            <app-spin />
          </div>

          <div class="text-center">
            <a
              v-if="commentTree.page && commentTree.page.last === false"
              href
              class="post__comment-more"
              @click.prevent="getComment"
            >Xem thêm {{ numOfViewMoreParentComment }} bình luận ...</a>
          </div>

          <div
            v-if="commentTree.comments && !commentTree.comments.length"
            class="post__comment-empty text-center text-sub"
          >Bài viết chưa có bình luận.</div>
        </div>

        <CommentEditor class="post__comment-editor my-3" @submit="postComment" />
      </template>

      <div class="text-center" v-else-if="btnCommentLoading">
        <app-spin />
      </div>
    </div>
  </div>
</template>

<script>
import { get, uniqWith } from "lodash";
import CommentService from "~/services/social/comments";
import {
  BASE as ACTION_TYPE_BASE,
  SOCIAL as ACTION_TYPE_SOCIAL
} from "~/utils/action-types";
import { checkEditorEmpty } from "~/utils/validations";
import { testJSON } from "~/utils/common";
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
      default: () => ({
        $commentTree: {}
      }),
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
      ]
    };
  },

  computed: {
    numOfViewMoreParentComment() {
      const { page = {} } = this.commentTree;
      return page.totalPages - page.number === 1
        ? page.totalElements - page.size * page.number
        : page.size;
    },

    commentTree() {
      return this.post.$commentTree || {}
    }
  },

  created() {
    this.showComment && this.getComment();
  },

  methods: {
    checkEditorEmpty,
    testJSON,

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

    async getComment() {
      this.btnCommentLoading = true;
      const getComment = await this.$store.dispatch(
        `social/${ACTION_TYPE_SOCIAL.GET_COMMENT}`,
        {
          source_id: this.post.post_id,
          page: get(this.commentTree, "page.number", 0) + 1
        }
      );

      this.btnCommentLoading = false;
      this.isCommentFetched = true;
    },

    async postComment({ content, listTags, image, link }) {
      const commentModel = createComment({
        source_id: this.post.post_id,
        comment_content: content,
        list_tag: listTags,
        comment_images: image,
        comment_link: link
      });

      const doPostComment = await this.$store.dispatch(
        `social/${ACTION_TYPE_SOCIAL.ADD_COMMENT}`,
        commentModel
      );

      if (!doPostComment.success) {
        this.$toasted.error(doPostComment.message);
      }
    },
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/post/_post.scss";
</style>