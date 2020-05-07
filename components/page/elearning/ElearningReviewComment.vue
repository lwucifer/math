<template>
  <div class="elearning-review-comment">
    <app-avatar
      class="elearning-review-comment__avatar mr-3"
      :src="(data && data.avatar) || 'https://picsum.photos/40/40'"
      :size="40"
    />

    <div class="elearning-review-comment__right flex-grow">
      <div class="elearning-review-comment__top d-flex-center">
        <div class="elearning-review-comment__info mr-5">
          <strong>{{ data.fullname }}</strong>
          <app-stars :stars="data.rate" :size="15" class="ml-3" />
        </div>

        <div class="d-flex-center caption ml-auto">
          <IconClock class="icon body-1 mr-2" />
          {{ [data.created, DATETIME_RECEIVE] | moment(DATETIME_DISPLAY) }}
        </div>
      </div>
      <p class="elearning-review-comment__content">{{ data.comment }}</p>
    </div>
  </div>
</template>
<script>
import { DATETIME_DISPLAY, DATETIME_RECEIVE } from "~/utils/config";
import IconClock from "~/assets/svg/design-icons/clock.svg?inline";

export default {
  components: {
    IconClock,
  },

  data() {
    return {
      DATETIME_DISPLAY,
      DATETIME_RECEIVE,
    };
  },

  props: {
    data: {
      type: Object,
      default: () => ({}),
      validator: (value) =>
        ["avatar", "fullname", "comment", "rate", "created"].every(
          (key) => key in value
        ),
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/_elearning-review-comment.scss";
</style>
