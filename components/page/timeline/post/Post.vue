<template>
  <div class="post">
    <div class="post__top">
      <n-link to class="post__avatar-wrapper">
        <app-avatar class="post__avatar" src="https://picsum.photos/64/64" size="lg"></app-avatar>
      </n-link>

      <div class="post__title">
        <div class="post__title-row">
          <h5 class="post__name">
            <n-link to>Hannah Phạm</n-link>
          </h5>
          <span class="post__share-for">
            <IconGlobe class="svg-icon" />
          </span>
        </div>

        <div class="post__title-row">
          <n-link class="post__time" to>30 phút</n-link>
        </div>

        <template v-if="showEdit">
          <button v-show="!edit" class="post__btn-edit" @click="edit = true">Chỉnh sửa</button>
        </template>
      </div>
    </div>

    <div class="post__post">
      <template v-if="edit">
        <textarea rows="3" class="post__edit-desc" placeholder="Thêm mô tả" v-textarea-autosize>Những người phụ nữ đang bán hàng online và đang gặp phải vấn đề liên quan đến bán lẻ và phát triển đội nhóm. Đang bị Thiếu chiến lược, thiếu kế hoạch hành động chi tiết.</textarea>
        <input type="text" placeholder="Cùng với ai?" class="post__edit-tag" />
        <input type="text" placeholder="Ở đâu?" class="post__edit-location" />

        <div class="post__edit-actions">
          <app-select class="post__edit-select" :options="shareWithOpts" v-model="shareWith">
            <IconGlobe slot="prepend" class="post__edit-select__prepend d-block"/>
          </app-select>

          <button class="post__edit-btn post__edit-btn-cancel" @click="edit = false">Huỷ</button>
          <button class="post__edit-btn post__edit-btn-done" @click="edit = false">Chỉnh sửa xong</button>
        </div>
      </template>

      <template v-else>
        <p
          class="post__post-desc"
        >Những người phụ nữ đang bán hàng online và đang gặp phải vấn đề liên quan đến bán lẻ và phát triển đội nhóm. Đang bị Thiếu chiến lược, thiếu kế hoạch hành động chi tiết.</p>
        <a href @click.prevent class="post__post-readmore">Xem thêm</a>
      </template>

      <slot name="media-content" />

      <slot />
    </div>

    <div class="post__interactive">
      <div class="post__count">
        <span>20 lượt thích</span>
        <span>6 bình luận</span>
      </div>

      <app-divider class="my-3" />

      <div class="post__actions">
        <button class="post__button active">
          <IconHeart class="svg-icon" width="2.1rem" height="1.8rem" />Thích
        </button>

        <button class="post__button">
          <IconBubble class="svg-icon" width="2.1rem" height="2rem" />Bình luận
        </button>

        <button class="post__button">
          <IconShare class="svg-icon" width="2.1rem" height="2.1rem" />Chia sẻ
        </button>
      </div>

      <app-divider class="my-3" />

      <div class="post__comment-list">
        <CommentItem>
          <CommentItem :level="2" />
          <CommentEditor reply />
        </CommentItem>
      </div>

      <CommentEditor class="post__comment-editor" />
    </div>
  </div>
</template>

<script>
import CommentItem from "~/components/page/timeline/comment/CommentItem";
import CommentEditor from "~/components/page/timeline/comment/CommentEditor";

import IconGlobe from "~/assets/svg/icons/globe.svg?inline";
import IconHeart from "~/assets/svg/icons/heart.svg?inline";
import IconBubble from "~/assets/svg/icons/bubble.svg?inline";
import IconShare from "~/assets/svg/icons/share.svg?inline";

export default {
  components: {
    CommentItem,
    CommentEditor,
    IconGlobe,
    IconHeart,
    IconBubble,
    IconShare
  },

  props: {
    showEdit: Boolean
  },

  data() {
    return {
      edit: false,
      shareWith: 0,
      shareWithOpts: [
        { value: 0, text: 'Công khai' },
        { value: 1, text: 'Bạn bè' },
        { value: 3, text: 'Chỉ mình tôi' },
      ]
    };
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/post/_post.scss";
</style>