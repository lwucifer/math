<template>
  <div class="comment-item" :class="classes">
    <app-avatar
      :src="data && data.avatar && data.avatar.low ? data.avatar.low : null"
      :size="level === 2 ? 'xs' : 'sm'"
      class="comment-item__avatar"
    />

    <div class="comment-item__right">
      <div class="comment-item__name">
        <n-link to>{{ data.fullname }}</n-link>
      </div>

      <div class="comment-item__content" v-html="data.comment_content"></div>

      <div class="comment-item__actions">
        <n-link to class="comment-item__time">{{ data.created_at | moment('from') }}</n-link>

        <a href class="comment-item__action" @click.prevent>Like</a>

        <a href class="comment-item__action" @click.prevent>Reply</a>
      </div>

      <CommentItemReplied
        v-if="data.childrent && data.childrent.list.length && !listComments.length"
        :data="data.childrent"
        @click="getChildrenComment(data.id)"
      />

      <CommentItem v-for="item in listComments" :key="item.id" :level="2" :data="item" />

      <div class="text-center">
        <a
          v-if="childrenCommentData.page && !childrenCommentData.page.last"
          href
          class="post__comment-more"
          @click.prevent="getChildrenComment(data.id)"
        >Xem thêm {{ numOfViewMoreChildrenComment }} bình luận ...</a>
      </div>

      <div class="text-center" v-if="isFetchingComment">
        <app-spin />
      </div>
    </div>
  </div>
</template>

<script>
import CommentService from "~/services/social/comments";
import { SOCIAL_COMMENTS as ACTION_TYPE_SOCIAL_COMMENTS } from "~/utils/action-types";

const CommentItemReplied = () =>
  import("~/components/page/timeline/comment/CommentItemReplied");

export default {
  name: "CommentItem",

  components: {
    CommentItemReplied
  },

  props: {
    level: {
      type: Number,
      default: 1 // 1 | 2
    },
    data: {
      type: Object,
      default: () => ({}),
      validator: value =>
        ["avatar", "fullname", "comment_content", "created_at"].every(
          key => key in value
        )
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
      isFetchingComment: false
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
        ? page.totalElements % page.size
        : page.size;
    }
  },

  methods: {
    async getChildrenComment(id) {
      console.log("getChildrenComment", id);
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
          this.childrenCommentData = {
            listComments: [...listComments, ...getComment.data.listComments],
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
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/comment/_comment-item.scss";
</style>