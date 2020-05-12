<template>
  <div class="tab-qa-comment-item" :class="classes">
    <app-avatar :size="level === 1 ? 40 : 30" />

    <div class="tab-qa-comment-item__right">
      <div class="tab-qa-comment-item__top">
        <h6 class="tab-qa-comment-item__name">Brandon Simmmons</h6>
        <span class="tab-qa-comment-item__time">
          <IconAccessTime class="icon mr-2" />16:48 20/08/2019
        </span>
      </div>

      <div
        class="tab-qa-comment-item__content"
      >
        <p>Good communication, please put extra attention to detail on requests. Overall great design work, satisfied with the work, result and communication.</p>
        <img class="tab-qa-comment-item__img d-block" src="~assets/images/tmp/study-comment-demo.jpg" alt="">
      </div>
      <div class="tab-qa-comment-item__actions">
        <button class="tab-qa-comment-item__like">
          <IconThumbUp class="icon" />&nbsp;150
        </button>
        <button class="tab-qa-comment-item__reply">Phản hồi</button>
      </div>

      <slot />
    </div>
  </div>
</template>

<script>
import IconThumbUp from "~/assets/svg/v2-icons/thumb_up_24px.svg?inline";
import IconAccessTime from "~/assets/svg/v2-icons/access_time_24px.svg?inline";

export default {
  components: {
    IconThumbUp,
    IconAccessTime
  },

  props: {
    level: {
      type: Number,
      default: 1,
      validator: value => [1, 2].includes(value)
    }
  },

  computed: {
    classes() {
      return {
        'tab-qa-comment-item--level-2': this.level === 2
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/study/_tab-qa-comment-item.scss";
</style>