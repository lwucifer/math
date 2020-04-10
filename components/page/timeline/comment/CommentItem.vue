<template>
  <div class="comment-item" :class="classes">
    <app-avatar
      :src="data && data.avatar && data.avatar.low ? data.avatar.low : null"
      :size="level === 2 ? 'xs' : 'sm'"
      class="comment-item__avatar"
    />

    <div class="comment-item__right">
      <div class="comment-item__right__top">
        <n-link class="comment-item__name" to>{{ data.fullname }}</n-link>

        <app-dropdown
          v-if="userId === data.comment_user_id"
          class="comment-item__menu-dropdown"
          position="left"
          open-on-click
          v-model="menuDropdown"
        >
          <button
            slot="activator"
            slot-scope="{ on }"
            v-on="on"
            class="comment-item__menu-dropdown__btn"
          >
            <IconDots class="icon" />
          </button>

          <ul class="comment-item__menu-dropdown__list">
            <li>
              <a href="javasscript:;">Chỉnh sửa bình luận</a>
            </li>
            <li>
              <a href="javasscript:;" @click.once="deleteComment">Xoá</a>
            </li>
          </ul>
        </app-dropdown>
      </div>

      <div class="comment-item__content" v-html="data.comment_content"></div>

      <div class="comment-item__actions">
        <n-link to class="comment-item__time">{{ data.created_at | moment('from') }}</n-link>

        <a href class="comment-item__action" @click.prevent>Like</a>

        <a href class="comment-item__action" @click.prevent="handleClickReply">Reply</a>
      </div>

      <transition-group
        enter-active-class="animated faster fadeIn"
        leave-active-class="animated faster fadeOut"
      >
        <CommentItem
          v-for="item in listComments"
          :key="item.id"
          :level="2"
          :post="post"
          :data="item"
          @deleted="handleDeleted"
        />
      </transition-group>

      <CommentItemReplied
        v-if="data.children && data.children.list && data.children.list.length && !childrenCommentData.page"
        :data="data.children"
        @click="getChildrenComment(data.id)"
      />

      <div v-if="isFetchingComment" class="text-center">
        <app-spin />
      </div>

      <div v-if="childrenCommentData.page && !childrenCommentData.page.last" class="text-center">
        <a
          href
          class="post__comment-more"
          @click.prevent="getChildrenComment(data.id)"
        >Xem thêm {{ numOfViewMoreChildrenComment }} bình luận ...</a>
      </div>

      <CommentEditor v-if="showReply" class="mt-3" reply @submit="postComment" />
    </div>
  </div>
</template>

<script>
import { uniqWith } from "lodash";
import CommentService from "~/services/social/comments";
import {
  SOCIAL_COMMENTS as ACTION_TYPE_SOCIAL_COMMENTS,
  BASE as ACTION_TYPE_BASE
} from "~/utils/action-types";
import { createComment } from "~/models/social/Comment";

const CommentItemReplied = () =>
  import("~/components/page/timeline/comment/CommentItemReplied");
const CommentEditor = () =>
  import("~/components/page/timeline/comment/CommentEditor");
const IconDots = () => import("~/assets/svg/icons/dots.svg?inline");

export default {
  name: "CommentItem",

  components: {
    CommentItemReplied,
    CommentEditor,
    IconDots
  },

  props: {
    level: {
      type: Number,
      default: 1 // 1 | 2
    },
    post: {
      type: Object,
      default: () => {},
      validator: value => ["post_id"].every(key => key in value)
    },
    data: {
      type: Object,
      default: () => ({}),
      validator: value =>
        [
          "avatar",
          "fullname",
          "comment_content",
          "created_at",
          "comment_user_id"
        ].every(key => key in value)
    }
  },

  data() {
    return {
      childrenCommentParams: {
        page: 1,
        limit: 10,
        parent_comment_id: this.data.id
      },
      childrenCommentData: {},
      isFetchingComment: false,
      showReply: false,
      menuDropdown: false
    };
  },

  computed: {
    classes() {
      const levelClasses = {
        "comment-item--level-2": this.level === 2
      };
      return { ...levelClasses };
    },

    listComments() {
      if ("listComments" in this.childrenCommentData) {
        return this.childrenCommentData.listComments;
      } else {
        return [];
      }
    },

    numOfViewMoreChildrenComment() {
      const { page } = this.childrenCommentData;
      return page.totalPages - page.number === 1
        ? page.totalElements - page.size * page.number
        : page.size;
    },

    userId() {
      const { $store: store = {} } = this;
      return "id" in store.state.auth.token ? store.state.auth.token.id : null;
    }
  },

  methods: {
    async getChildrenComment(id) {
      this.isFetchingComment = true;

      const getComment = await new CommentService(this.$axios)[
        ACTION_TYPE_SOCIAL_COMMENTS.LIST_CHILDREN
      ]({
        params: this.childrenCommentParams
      });

      if (getComment.success) {
        // Set to parent comment data
        const { listComments, page } = this.childrenCommentData;
        if (listComments && page) {
          const tmpListComments = [
            ...listComments,
            ...getComment.data.listComments
          ];
          this.childrenCommentData = {
            listComments: uniqWith(tmpListComments, (a, b) => a.id === b.id),
            page: getComment.data.page
          };
        } else {
          this.childrenCommentData = getComment.data;
        }

        // Set page param for the next request
        this.childrenCommentParams.page += 1;
      } else {
        this.$toasted.error(getComment.message);
      }

      this.isFetchingComment = false;
    },

    handleClickReply() {
      if (this.level === 2) {
        this.$emit("click-reply");
      } else {
        this.showReply = true;
      }
    },

    async postComment(content) {
      const commentModel = createComment(
        this.post.post_id,
        this.data.id,
        content
      );
      const doPostComment = await new CommentService(this.$axios)[
        ACTION_TYPE_BASE.ADD
      ](commentModel);

      if (doPostComment.success) {
        if (!this.childrenCommentData.page) {
          await this.getChildrenComment(this.data.id);
        } else if ("listComments" in this.childrenCommentData) {
          const { listComments } = this.childrenCommentData;
          this.childrenCommentData.listComments = [
            doPostComment.data,
            ...listComments
          ];
        } else {
          this.childrenCommentData = {
            listComments: [doPostComment.data]
          };
        }
      } else {
        this.$toasted.error(doPostComment.message);
      }
    },

    async deleteComment(event) {
      event.preventDefault();

      const doDelete = await new CommentService(this.$axios)[
        ACTION_TYPE_BASE.DELETE
      ](this.data.id);

      if (doDelete.success) {
        this.$emit("deleted", this.data.id);
      } else {
        this.$toasted.error(doDelete.message);
      }
    },

    handleDeleted(id) {
      if ("listComments" in this.childrenCommentData) {
        this.childrenCommentData.listComments = this.childrenCommentData.listComments.filter(
          comment => comment.id !== id
        );
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/comment/_comment-item.scss";
</style>