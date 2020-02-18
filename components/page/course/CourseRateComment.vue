<template>
  <div class="course-rates-commnent">
    <div class="left">
      <div class="auth">
        <app-avatar src="https://picsum.photos/40/40" :size="40" />
        <strong class="ml-2">Tomothy Webb</strong>
      </div>
      <app-stars :stars="4" :size="16" class="mt-4 mb-3"/>
      <p class="color-666">Bài giảng rất hay</p>
    </div>
    <div class="ml-auto d-flex-center color-666">
        <IconClock width="14" height="14" class="mr-2"/> 16:48 20/08/2019
    </div>
  </div>
</template>
<script>
import IconClock from '~/assets/svg/icons/clock.svg?inline';

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
@import "~/assets/scss/components/course/_course-comment.scss";
</style>