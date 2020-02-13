<template>
  <div class="post">
    <div class="post__top">
      <n-link to class="post__avatar-wrapper">
        <app-avatar class="post__avatar" src="https://picsum.photos/64/64" size="lg"></app-avatar>
      </n-link>

      <div class="post__title">
        <div class="post__title-row">
          <h5 class="post__name">
            <n-link to>{{ post.author.fullname }}</n-link>
          </h5>
        </div>

        <div class="post__title-row">
          <n-link class="post__time" to>{{ post.created_at | moment('from') }}</n-link>
          <span class="post__share-for" :title="post.privacy ? post.privacy.desc : ''">
            <img :src="post.privacy ? post.privacy.image : ''" alt />
            <!-- <IconGlobe class="icon" /> -->
          </span>
        </div>

        <template v-if="showEdit">
          <button v-show="!edit" class="post__btn-edit" @click="edit = true">Chỉnh sửa</button>
        </template>
      </div>

      <app-dropdown
        v-if="showMenuDropdown"
        class="post__menu-dropdown"
        position="left"
        open-on-click
        v-model="menuDropdown"
      >
        <button slot="activator" slot-scope="{ on }" v-on="on" class="post__menu-dropdown__btn">
          <IconDots class="icon" />
        </button>

        <ul class="post__menu-dropdown__list">
          <li>
            <a href>Chỉnh sửa bài viết</a>
          </li>
          <li>
            <a href @click.prevent="handleClickDelete">Xoá</a>
          </li>
        </ul>
      </app-dropdown>
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
      </template>

      <slot name="media-content" />

      <slot />
    </div>

    <div class="post__interactive">
      <div class="post__count">
        <span>{{ post.total_like }} lượt thích</span>
        <span>{{ post.total_comment }} bình luận</span>
      </div>

      <app-divider class="my-3" />

      <div class="post__actions">
        <button class="post__button" :class="{ 'active': post.is_like }" @click="handleClickLike">
          <IconHeart class="icon" width="2.1rem" height="1.8rem" />Thích
        </button>

        <button class="post__button">
          <IconBubble class="icon" width="2.1rem" height="2rem" />Bình luận
        </button>

        <button class="post__button">
          <IconShare class="icon" width="2.1rem" height="2.1rem" />Chia sẻ
        </button>
      </div>

      <app-divider class="my-3" />

      <div class="post__comment-list d-none">
        <CommentItem>
          <CommentItemReplied />
        </CommentItem>

        <CommentItem>
          <CommentItem :level="2" />

          <div class="text-center">
            <a href class="post__comment-more" @click.prevent>Xem thêm bình luận ...</a>
          </div>

          <CommentEditor reply />
        </CommentItem>
      </div>

      <CommentEditor class="post__comment-editor" />
    </div>
  </div>
</template>

<script>
import CommentItem from "~/components/page/timeline/comment/CommentItem";
import CommentItemReplied from "~/components/page/timeline/comment/CommentItemReplied";
import CommentEditor from "~/components/page/timeline/comment/CommentEditor";

import IconGlobe from "~/assets/svg/icons/globe.svg?inline";
import IconHeart from "~/assets/svg/icons/heart.svg?inline";
import IconBubble from "~/assets/svg/icons/bubble.svg?inline";
import IconShare from "~/assets/svg/icons/share.svg?inline";
import IconDots from "~/assets/svg/icons/dots.svg?inline";

export default {
  components: {
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
    showMenuDropdown: Boolean,
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
      edit: false,
      menuDropdown: false,
      shareWith: 0,
      shareWithOpts: [
        { value: 0, text: "Công khai" },
        { value: 1, text: "Bạn bè" },
        { value: 3, text: "Chỉ mình tôi" }
      ]
    };
  },

  methods: {
    handleClickDelete() {
      this.$emit("delete", this.post.post_id);
    },

    handleClickLike() {
      this.$emit("like", this.post.post_id)
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/post/_post.scss";
</style>