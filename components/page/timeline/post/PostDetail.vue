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
        <a href="" class="post-detail__prev" @click.prevent @click="handleClickPrev">
          <IconChevronLeft />
        </a>

        <a href="" class="post-detail__next" @click.prevent @click="handleClickNext">
          <IconChevronRight />
        </a>

        <div class="post-detail__media">
          <img :src="post.attachments[0].thumb" alt />
        </div>
      </template>
    </div>

    <div class="post-detail__right">
      <Post
        show-edit
        :fullname="post.creator && post.creator.fullname"
        :updated="post.updated"
        :likes="post.likes"
        :comments="post.comments"
        :content="post.content"
      />
    </div>

    <div class="post-detail__actions">
      <app-dropdown
        class="post-detail__actions-menu"
        align-content="left"
        open-on-click
        v-model="dropdownShow"
      >
        <button slot="activator" type="button" class="post-detail__actions-btn">
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
import Post from "./Post";
import IconDots from "~/assets/svg/icons/dots.svg?inline";
import IconClose from "~/assets/svg/icons/close.svg?inline";
import IconChevronLeft from "~/assets/svg/icons/chevron-left.svg?inline";
import IconChevronRight from "~/assets/svg/icons/chevron-right.svg?inline";

export default {
  components: {
    Post,
    IconDots,
    IconClose,
    IconChevronLeft,
    IconChevronRight
  },

  props: {
    loading: Boolean,
    post: {
      type: Object,
      validator: value =>
        ["id", "creator", "updated", "likes", "comments", "content"].every(
          key => key in value
        )
    },
  },

  data() {
    return {
      dropdownShow: false
    };
  },

  methods: {
    handleClickPrev() {
      this.$emit('click-prev')
    },

    handleClickNext() {
      this.$emit('click-next')
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/post/_post-detail.scss";
</style>