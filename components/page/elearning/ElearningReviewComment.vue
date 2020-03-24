<template>
  <div class="elearning-review-comment">
    <div class="elearning-review-comment__top d-flex-center">
      <div class="elearning-review-comment__info d-flex-center mr-5">
        <app-avatar src="https://picsum.photos/40/40" :size="40" />
        <strong class="ml-3">Tomothy Webb</strong>
      </div>

      <div class="elearning-review-comment__right ml-auto">
        <div class="d-flex-center color-666">
          <IconClock width="14" height="14" class="mr-2" />16:48 20/08/2019
        </div>
      </div>
    </div>

    <app-stars :stars="4" :size="16" class="mt-4 mb-3" />
    <p class="color-666">Bài giảng rất hay</p>
  </div>
</template>
<script>
import IconClock from "~/assets/svg/icons/clock.svg?inline";

export default {
  components: {
    IconClock
  },

  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-review-comment.scss";
</style>