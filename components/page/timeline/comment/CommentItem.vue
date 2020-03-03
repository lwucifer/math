<template>
  <div class="comment-item" :class="classes">
    <app-avatar
      :src="data && data.avatar && data.avatar.low ? data.avatar.low : null"
      :size="level === 2 ? 'xs' : 'sm'"
      class="comment-item__avatar"
    />

    <div class="comment-item__right">
      <div class="comment-item__name">
        <n-link to>{{ data.fullname }}</n-link>
      </div>

      <div class="comment-item__content" v-html="data.comment_content"></div>

      <div class="comment-item__actions">
        <n-link to class="comment-item__time">{{ data.created_at | moment('from') }}</n-link>

        <a href class="comment-item__action" @click.prevent>Like</a>

        <a href class="comment-item__action" @click.prevent>Reply</a>
      </div>

      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    level: {
      type: Number,
      default: 1 // 1 | 2
    },
    data: {
      type: Object,
      default: () => ({}),
      validator: value =>
        ["avatar", "fullname", "comment_content", "created_at"].every(
          key => key in value
        )
    }
  },

  computed: {
    classes() {
      const levelClasses = {
        "comment-item--level-2": this.level === 2
      };
      return { ...levelClasses };
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/comment/_comment-item.scss";
</style>