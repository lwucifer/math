<template>
  <div class="elearning-review-comment">
    <div class="elearning-review-comment__top d-flex-center">
      <div class="elearning-review-comment__info d-flex-center mr-5">
        <app-avatar :src="data && data.avatar || 'https://picsum.photos/40/40'" :size="40" />
        <strong class="ml-3">{{ data.fullname }}</strong>
      </div>

      <div class="elearning-review-comment__right ml-auto">
        <div class="d-flex-center color-666">
          <IconClock width="14" height="14" class="mr-2" /> {{ [ data.created, DATETIME_RECEIVE] | moment(DATETIME_DISPLAY) }}
        </div>
      </div>
    </div>

    <app-stars :stars="4" :size="16" class="my-3" />
    <p class="color-666">{{ data.comment }}</p>
  </div>
</template>
<script>
import { DATETIME_DISPLAY, DATETIME_RECEIVE } from "~/utils/config";
import IconClock from "~/assets/svg/icons/clock.svg?inline";

export default {
  components: {
    IconClock
  },

  data() {
    return {
      DATETIME_DISPLAY,
      DATETIME_RECEIVE
    }
  },

  props: {
    data: {
      type: Object,
      default: () => ({}),
      validator: value =>
        [
          "avatar",
          "fullname",
          "comment",
          "rate",
          "created"
        ].every(key => key in value)
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-review-comment.scss";
</style>