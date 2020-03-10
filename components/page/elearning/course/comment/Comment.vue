<template>
  <div>
    <div class="d-flex">
      <app-avatar :src="auth.avatar" :size="50" />
      <app-input textarea v-model="comment" placeholder="Bình luận" class="ml-3 w-100" />
    </div>
    <CommentItem :auth="auth" :data="item" v-for="(item, index) in data" :key="index" />
  </div>
</template>
<script>
import CommentItem from "~/components/page/elearning/course/comment/CommentItem";
import CommentInput from "~/components/page/elearning/course/comment/CommentInput";
import IconLike from "~/assets/svg/icons/like.svg?inline";
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";

export default {
  components: {
    IconCamera,
    IconLike,
    CommentInput,
    CommentItem
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    auth: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      comment: "",
      reply: false
    };
  },

  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/course/_elearning-course-side.scss";
</style>