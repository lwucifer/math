<template>
  <div class="comment-item" :class="classes">
    <app-avatar src="https://picsum.photos/40/40" :size="level === 2 ? 'xs' : 'sm'" class="comment-item__avatar" />

    <div class="comment-item__right">
      <div class="comment-item__name">
        <n-link to>Beth Russell</n-link>
      </div>

      <div
        class="comment-item__content"
      >Khóa học này dành cho người mới bắt đầu thiết kế đồ họa và cho bất kỳ ai muốn tìm hiểu bộ sản phẩm Adobe CC đầy đủ, bao gồm Illustrator, Photoshop, Animated CC và hơn thế nữa!</div>

      <div class="comment-item__actions">
        <n-link to class="comment-item__time">25m</n-link>

        <a href class="comment-item__action">Like</a>

        <a href class="comment-item__action">Reply</a>
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
    }
  },

  computed: {
    classes() {
      const levelClasses = {
        'comment-item--level-2': this.level === 2
      }
      return {...levelClasses}
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/comment/_comment-item.scss";
</style>