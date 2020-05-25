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

        <a href class="comment-item__action" :class="likeClasses" @click.prevent="like">Like</a>

        <a href class="comment-item__action" @click.prevent="handleClickReply">Reply</a>
      </div>

      <slot name="child-comment" v-bind="{ commentTree }"></slot>

      <CommentItemReplied
        v-if="data.children && data.children.list && data.children.list.length && !commentTree.page"
        :data="data.children"
        @click="getChildComment(data.id)"
      />

      <div v-if="isFetchingComment" class="text-center">
        <app-spin />
      </div>

      <div v-if="commentTree.page && commentTree.page.last === false" class="text-center">
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
import {
  SOCIAL_COMMENTS as ACTION_TYPE_SOCIAL_COMMENTS,
  BASE as ACTION_TYPE_BASE,
  SOCIAL as ACTION_TYPE_SOCIAL
} from "~/utils/action-types";
import { createComment, editComment } from "~/models/social/Comment";
import { mapGetters } from 'vuex';

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
    ...mapGetters("auth", ["userId"]),
    
    classes() {
      const levelClasses = {
        "comment-item--level-2": this.level === 2
      };
      return { ...levelClasses };
    },

    likeClasses() {
      return {
        "comment-item__action--liked": this.data.is_like
      };
    },

    commentTree() {
      return get(this.data, "$children", {});
    },

    numOfViewMoreChildrenComment() {
      const { page = {} } = this.commentTree;
      return page.total_pages - page.number === 1
        ? page.total_elements - page.size * page.number
        : page.size;
    },

    // userId() {
    //   const { $store: store = {} } = this;
    //   return "id" in store.state.auth.token ? store.state.auth.token.id : null;
    // },

    link() {
      return this.data && this.data.comment_link
        ? JSON.parse(this.data.comment_link)
        : {};
    }
  },

  methods: {
    isEmpty,
    get,

    setIsFetchingComment(value = false) {
      this.isFetchingComment = value;
    },

    getChildComment(id) {
      this.$emit(
        "get-child-comment",
        id,
        this.post.post_id,
        get(this.commentTree, "page.number", 0) + 1,
        this.setIsFetchingComment
      );
    },

    handleClickReply() {
      if (this.level === 2) {
        this.$emit("click-reply");
      } else {
        this.showReply = true;
      }
    },

    async postComment({ content, listTags, image, link }, clearEditor) {
      const dataModel = {
        source_id: this.post.post_id,
        parent_comment_id: this.data.id,
        comment_content: content,
        list_tag: listTags,
        comment_images: image,
        comment_link: link
      };

      this.$emit("post-child-comment", dataModel, clearEditor);
    },

    editComment({
      content,
      listTags,
      image,
      link,
      isDeleteOldImg,
      listTagsDel
    }) {
      const dataModel = {
        source_id: this.post.post_id,
        comment_id: this.data.id,
        comment_content: content,
        list_tag: listTags,
        comment_images: image,
        comment_link: link,
        delete_img: isDeleteOldImg,
        list_tag_del: listTagsDel,
        parent_comment_id: this.parentComment.id
      };

      this.$emit("edit", dataModel, this.cancelEdit);
    },

    deleteComment(event) {
      event.preventDefault();

      if (this.level === 1) {
        this.$emit(
          "delete",
          {
            id: this.data.id,
            source_id: this.post.post_id
          },
          get(this.post, "$commentTree.page.number", 1)
        );
      } else {
        this.$emit(
          "delete",
          {
            id: this.data.id,
            source_id: this.post.post_id,
            parent_comment_id: this.parentComment.id
          },
          get(this.parentComment, "$children.page.number", 1)
        );
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

    like() {
      this.$emit("like", this.data.id, this.post.post_id, this.parentComment.id);
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/comment/_comment-item.scss";
</style>