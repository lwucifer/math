<template>
  <div class="post-detail">
    <div class="post-detail__left">
      <!-- <app-video
        v-if="item.type === 'video'"
        :posterSrc="item.src"
        @click="$emit('click-item', item, index)"
      ></app-video>

      <div v-else class="slider-item" @click="$emit('click-item', item, index)">
        <img :src="item.src" alt />
      </div>-->
      <app-spin v-if="loading"></app-spin>

      <template v-else>
        <a v-if="showPrevArrow" href class="post-detail__prev" @click.prevent="handleClickPrev">
          <IconChevronLeft />
        </a>

        <a v-if="showNextArrow" href class="post-detail__next" @click.prevent="handleClickNext">
          <IconChevronRight />
        </a>

        <div class="post-detail__media">
          <img class="d-block mx-auto" :src="localPost.link_image && localPost.link_image.high" alt />
        </div>
      </template>
    </div>

    <div class="post-detail__right">
      <PostDetailPost
        show-edit
        show-comment
        :post="localPost"
        @delete="deletePost"
        @like="likePost"
      />
    </div>

    <div class="post-detail__actions">
      <app-dropdown
        class="post-detail__actions-menu"
        position="right"
        open-on-click
        v-model="dropdownShow"
      >
        <button
          slot="activator"
          slot-scope="{ on }"
          type="button"
          class="post-detail__actions-btn"
          v-on="on"
        >
          <IconDots />
        </button>

        <ul class="post-detail__actions-list">
          <li>
            <a href>Đặt làm ảnh đại diện</a>
          </li>
          <li>
            <a href>Đặt làm ảnh bìa</a>
          </li>
          <li>
            <a href>Tải ảnh xuống</a>
          </li>
          <li>
            <a href>Xóa ảnh này</a>
          </li>
        </ul>
      </app-dropdown>

      <button type="button" class="post-detail__actions-btn" @click="$emit('click-close')">
        <IconClose />
      </button>
    </div>
  </div>
</template>

<script>
import { LIKE_SOURCE_TYPES, LIKE_TYPES } from "~/utils/constants";
import { BASE as ACTION_TYPE_BASE } from "~/utils/action-types";
import { createLike } from "~/models/social/Like";
import LikesService from "~/services/social/likes";

import PostDetailPost from "./PostDetailPost";
import IconDots from "~/assets/svg/icons/dots.svg?inline";
import IconClose from "~/assets/svg/icons/close.svg?inline";
import IconChevronLeft from "~/assets/svg/icons/chevron-left.svg?inline";
import IconChevronRight from "~/assets/svg/icons/chevron-right.svg?inline";

export default {
  components: {
    PostDetailPost,
    IconDots,
    IconClose,
    IconChevronLeft,
    IconChevronRight
  },

  props: {
    loading: Boolean,
    parentPost: {
      type: Object,
      default: () => ({}),
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
    },
    post: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      dropdownShow: false,
      localPost: this.post
    };
  },

  computed: {
    userId() {
      const { $store: store = {} } = this;
      return "id" in store.state.auth.token ? store.state.auth.token.id : null;
    },

    showPrevArrow() {
      const index = this.parentPost.files.findIndex(
        item => item.post_id === this.post.post_id
      );
      return (
        this.parentPost.files && this.parentPost.files.length && index !== 0
      );
    },

    showNextArrow() {
      const index = this.parentPost.files.findIndex(
        item => item.post_id === this.post.post_id
      );
      return (
        this.parentPost.files &&
        this.parentPost.files.length &&
        index !== this.parentPost.files.length - 1
      );
    }
  },

  watch: {
    post(newValue) {
      this.localPost = newValue;
    }
  },

  methods: {
    handleClickPrev() {
      const index = this.parentPost.files.findIndex(
        item => item.post_id === this.post.post_id
      );
      const prevPost = this.parentPost.files[index - 1];

      if (prevPost) {
        this.$emit("click-prev", prevPost.post_id, this.parentPost);
      }
    },

    handleClickNext() {
      const index = this.parentPost.files.findIndex(
        item => item.post_id === this.post.post_id
      );
      const nextPost = this.parentPost.files[index + 1];

      if (nextPost) {
        this.$emit("click-next", nextPost.post_id, this.parentPost);
      }
    },

    deletePost(...args) {
      this.$emit("delete", ...args);
    },

    /**
     * Like a POST
     */
    async likePost(id, cb) {
      const likeModel = createLike(id, LIKE_SOURCE_TYPES.POST, LIKE_TYPES.LIKE);
      const { success = false, data = {} } = await new LikesService(
        this.$axios
      )[ACTION_TYPE_BASE.ADD](likeModel);

      if (success) {
        this.localPost = {
          ...this.localPost,
          type_like: data.type_like,
          is_like: !!data.type_like,
          total_like: !!data.type_like
            ? (this.localPost.total_like += 1)
            : (this.localPost.total_like -= 1)
        };

        if (this.parentPost.post_id === this.post.post_id) {
          this.$emit("parent-post-liked", this.localPost);
        }
      }

      // Have to run cb
      cb();
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/post/_post-detail.scss";
</style>