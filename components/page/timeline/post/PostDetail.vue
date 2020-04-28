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
          <img class="d-block mx-auto" :src="linkImage" alt />
        </div>
      </template>
    </div>

    <div class="post-detail__right">
      <slot name="post" v-bind="{ post: localPost, isParentPost }"></slot>
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
import { get } from "lodash";
import { LIKE_SOURCE_TYPES, LIKE_TYPES } from "~/utils/constants";
import {
  BASE as ACTION_TYPE_BASE,
  SOCIAL as ACTION_TYPE_SOCIAL
} from "~/utils/action-types";
import { createLike } from "~/models/social/Like";

import IconDots from "~/assets/svg/icons/dots.svg?inline";
import IconClose from "~/assets/svg/icons/close.svg?inline";
const IconChevronLeft = () =>
  import("~/assets/svg/icons/chevron-left.svg?inline");
const IconChevronRight = () =>
  import("~/assets/svg/icons/chevron-right.svg?inline");

export default {
  components: {
    IconDots,
    IconClose,
    IconChevronLeft,
    IconChevronRight
  },

  props: {
    loading: Boolean,
    isParentPost: Boolean,
    parentPost: {
      type: Object,
      required: true,
      default: () => ({})
    },
    post: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },

  data() {
    return {
      dropdownShow: false,
      localPost: {}
    };
  },

  computed: {
    userId() {
      const { $store: store = {} } = this;
      return "id" in store.state.auth.token ? store.state.auth.token.id : null;
    },

    showPrevArrow() {
      if (!this.parentPost) return;
      const index = this.parentPost.files.findIndex(
        item => item.post_id === this.post.post_id
      );
      return (
        this.parentPost.files && this.parentPost.files.length && index !== 0
      );
    },

    showNextArrow() {
      if (!this.parentPost) return;
      const index = this.parentPost.files.findIndex(
        item => item.post_id === this.post.post_id
      );
      return (
        this.parentPost.files &&
        this.parentPost.files.length &&
        index !== this.parentPost.files.length - 1
      );
    },

    linkImage() {
      if (this.isParentPost) {
        return get(this.localPost, "files[0].link.high", null);
      } else {
        return get(this.localPost, "link_image.high", null);
      }
    },
  },

  watch: {
    post(newValue) {
      this.localPost = newValue || {};
    },

    parentPost: {
      immediate: true,
      handler: function(newValue) {
        if (this.isParentPost) {
          this.localPost = newValue;
        }
      }
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
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/post/_post-detail.scss";
</style>