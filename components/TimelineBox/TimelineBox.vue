<template>
  <div class="timeline-box">
    <div class="timeline-box__top">
      <n-link to class="timeline-box__avatar-wrapper">
        <app-avatar class="timeline-box__avatar" src="https://via.placeholder.com/64x64" size="lg"></app-avatar>
      </n-link>

      <div class="timeline-box__title">
        <div class="timeline-box__title-row">
          <h5 class="timeline-box__name">
            <n-link to>Hannah Phạm</n-link>
          </h5>
          <span class="timeline-box__share-for">
            <IconGlobe class="svg-icon" />
          </span>
        </div>

        <div class="timeline-box__title-row">
          <n-link class="timeline-box__time" to>30 phút</n-link>
        </div>
      </div>
    </div>

    <div class="timeline-box__post">
      <p
        class="timeline-box__post-desc"
      >Những người phụ nữ đang bán hàng online và đang gặp phải vấn đề liên quan đến bán lẻ và phát triển đội nhóm. Đang bị Thiếu chiến lược, thiếu kế hoạch hành động chi tiết.</p>
      <a href @click.prevent class="timeline-box__post-readmore">Xem thêm</a>
    </div>

    <div class="timeline-box__interactive">
      <div class="timeline-box__count">
        <span>20 lượt thích</span>
        <span>6 bình luận</span>
      </div>

      <app-divider class="my-3" />

      <div class="timeline-box__actions">
        <button type="button" class="timeline-box__button active">
          <IconHeart class="svg-icon" width="2.1rem" height="1.8rem" />Thích
        </button>

        <button type="button" class="timeline-box__button">
          <IconBubble class="svg-icon" width="2.1rem" height="2rem" />Bình luận
        </button>

        <button type="button" class="timeline-box__button">
          <IconShare class="svg-icon" width="2.1rem" height="2.1rem" />Chia sẻ
        </button>
      </div>

      <app-divider class="my-3" />

      <CommentEditor class="timeline-box__comment-editor" />
    </div>
  </div>
</template>

<script>
import CommentEditor from "~/components/Comment/CommentEditor";

import IconGlobe from "~/assets/svg/icons/globe.svg?inline";
import IconHeart from "~/assets/svg/icons/heart.svg?inline";
import IconBubble from "~/assets/svg/icons/bubble.svg?inline";
import IconShare from "~/assets/svg/icons/share.svg?inline";

export default {
  components: {
    CommentEditor,
    IconGlobe,
    IconHeart,
    IconBubble,
    IconShare
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/timeline-box/_timeline-box.scss";
</style>