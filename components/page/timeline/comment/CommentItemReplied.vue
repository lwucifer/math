<template>
  <div class="comment-item-replied">
    <app-avatar
      :src="data.list[0].avatar ? data.list[0].avatar.low : null"
      size="xs"
      class="comment-item-replied__avatar"
    />
    <span class="comment-item-replied__text">
      <span class="comment-item-replied__name">{{ data.list[0].fullname }}</span>
      <span class="comment-item-replied__status">Replied - {{ data.total }} Reply</span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
      validator: value => ["total", "list"].every(key => key in value)
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/comment/_comment-item-replied.scss";
</style>