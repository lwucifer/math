<template>
  <div class="elearning-course-comment__content">
    <app-avatar :src="data.avatar" :size="50" />
    <div class="content">
      <div>
        <strong class="pr-3">{{data.name}}</strong>
        <span>{{data.time}}</span>
      </div>
      <div class="text">{{data.content}}</div>
    </div>
  </div>
</template>
<script>
import IconLike from "~/assets/svg/icons/like.svg?inline";
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";

export default {
  components: {
    IconCamera,
    IconLike
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
    };
  },

  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/course/_elearning-course-side.scss";
</style>