<template>
  <div
    v-if="isEdit"
    :class="{ 'comment-item-edit': true, 'comment-item-edit--level-2': level === 2 }"
  >
    <CommentEditor mode="edit" :initialValues="data" :reply="level === 2" @submit="editComment" />
    <a
      class="caption text-sub comment-item-edit__cancel"
      href="javascript:;"
      @click.prevent="cancelEdit"
    >Huỷ</a>
  </div>

  <div v-else class="comment-item" :class="classes">
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
              <a href="javasscript:;" @click="switchToEdit">Chỉnh sửa bình luận</a>
            </li>
            <li>
              <a href="javasscript:;" @click.once="deleteComment">Xoá</a>
            </li>
          </ul>
        </app-dropdown>
      </div>

      <div class="comment-item__content" v-html="data.comment_content"></div>

      <div v-if="data.comment_image && data.comment_image.medium" class="comment-item__image">
        <img class="d-block" :src="data.comment_image.medium" alt />
      </div>

      <app-content-box
        v-if="!isEmpty(link)"
        tag="a"
        target="_blank"
        class="mb-3"
        size="sm"
        :href="link.url"
        :image="link.image"
        :title="link.title"
        :desc="link.description"
        :meta-footer="link.siteName"
      />

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
          v-for="item in commentTree.comments || []"
          :key="item.id"
          :level="2"
          :post="post"
          :parentComment="data"
          :data="item"
        />
      </transition-group>

      <CommentItemReplied
        v-if="data.children && data.children.list && data.children.list.length && !commentTree.page"
        :data="data.children"
        @click="getChildComment(data.id)"
      />

      <div v-if="isFetchingComment" class="text-center">
        <app-spin />
      </div>

      <div v-if="commentTree.page && !commentTree.page.last" class="text-center">
        <a
          href
          class="post__comment-more"
          @click.prevent="getChildComment(data.id)"
        >Xem thêm {{ numOfViewMoreChildrenComment }} bình luận ...</a>
      </div>

      <CommentEditor v-if="showReply" class="mt-3" reply @submit="postComment" />
    </div>
  </div>
</template>

<script>
import { get, uniqWith, isEmpty } from "lodash";
import CommentService from "~/services/social/comments";
import {
  SOCIAL_COMMENTS as ACTION_TYPE_SOCIAL_COMMENTS,
  BASE as ACTION_TYPE_BASE,
  SOCIAL as ACTION_TYPE_SOCIAL
} from "~/utils/action-types";
import { createComment, editComment } from "~/models/social/Comment";

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
      default: () => ({}),
      validator: value => ["post_id"].every(key => key in value)
    },
    parentComment: {
      type: Object,
      default: () => ({})
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
      isFetchingComment: false,
      showReply: false,
      menuDropdown: false,
      // Edit comment data
      isEdit: false,
      editData: {}
    };
  },

  computed: {
    classes() {
      const levelClasses = {
        "comment-item--level-2": this.level === 2
      };
      return { ...levelClasses };
    },

    commentTree() {
      return get(this.data, "$children", {});
    },

    numOfViewMoreChildrenComment() {
      const { page } = this.commentTree;
      return page.totalPages - page.number === 1
        ? page.totalElements - page.size * page.number
        : page.size;
    },

    userId() {
      const { $store: store = {} } = this;
      return "id" in store.state.auth.token ? store.state.auth.token.id : null;
    },

    link() {
      return this.data && this.data.comment_link
        ? JSON.parse(this.data.comment_link)
        : {};
    }
  },

  methods: {
    isEmpty,
    get,

    async getChildComment(id) {
      this.isFetchingComment = true;

      const doGet = await this.$store.dispatch(
        `social/${ACTION_TYPE_SOCIAL.GET_CHILD_COMMENT}`,
        {
          source_id: this.post.post_id,
          parent_comment_id: id,
          page: get(this.commentTree, "page.number", 0) + 1
        }
      );

      this.isFetchingComment = false;
    },

    handleClickReply() {
      if (this.level === 2) {
        this.$emit("click-reply");
      } else {
        this.showReply = true;
      }
    },

    async postComment({ content, listTags, image, link }) {
      const commentModel = createComment({
        source_id: this.post.post_id,
        parent_comment_id: this.data.id,
        comment_content: content,
        list_tag: listTags,
        comment_images: image,
        comment_link: link
      });

      const doPostComment = await this.$store.dispatch(
        `social/${ACTION_TYPE_SOCIAL.ADD_CHILD_COMMENT}`,
        commentModel
      );
    },

    async editComment({
      content,
      listTags,
      image,
      link,
      isDeleteOldImg,
      listTagsDel
    }) {
      const commentModel = editComment({
        source_id: this.post.post_id,
        comment_id: this.data.id,
        comment_content: content,
        list_tag: listTags,
        comment_images: image,
        comment_link: link,
        delete_img: isDeleteOldImg,
        list_tag_del: listTagsDel,
        parent_comment_id: this.parentComment.id
      });

      const doEdit =
        this.level === 1
          ? await this.$store.dispatch(
              `social/${ACTION_TYPE_SOCIAL.EDIT_COMMENT}`,
              commentModel
            )
          : await this.$store.dispatch(
              `social/${ACTION_TYPE_SOCIAL.EDIT_CHILD_COMMENT}`,
              commentModel
            );

      if (doEdit.success) {
        this.cancelEdit();
      } else {
        this.$toasted.error(doEdit.message);
      }
    },

    async deleteComment(event) {
      event.preventDefault();

      const doDelete =
        this.level === 1
          ? await this.$store.dispatch(
              `social/${ACTION_TYPE_SOCIAL.DELETE_COMMENT}`,
              { id: this.data.id, source_id: this.post.post_id }
            )
          : await this.$store.dispatch(
              `social/${ACTION_TYPE_SOCIAL.DELETE_CHILD_COMMENT}`,
              {
                id: this.data.id,
                source_id: this.post.post_id,
                parent_comment_id: this.parentComment.id
              }
            );

      if (doDelete.success) {
        this.level === 1
          ? await this.$store.dispatch(
              `social/${ACTION_TYPE_SOCIAL.GET_COMMENT}`,
              {
                source_id: this.post.post_id,
                page: get(this.post, "$commentTree.page.number", 1)
              }
            )
          : await this.$store.dispatch(
              `social/${ACTION_TYPE_SOCIAL.GET_CHILD_COMMENT}`,
              {
                source_id: this.post.post_id,
                parent_comment_id: this.parentComment.id,
                page: get(this.parentComment, "$children.page.number", 1)
              }
            );
      } else {
        this.$toasted.error(doDelete.message);
      }
    },

    switchToEdit() {
      this.editData = this.post;
      this.isEdit = true;
    },

    cancelEdit() {
      this.isEdit = false;
      this.editData = {};
      this.menuDropdown = false;
    },
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/comment/_comment-item.scss";
</style>