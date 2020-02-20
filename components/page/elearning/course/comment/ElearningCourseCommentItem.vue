<template>
  <div class="elearning-course-comment__item">
    <ElearningCourseCommentContent :data="data" />
    <div class="actions">
      <button>
        <IconLike :class="data.liked ? 'fill-primary' : 'fill-999'" />
      </button>
      <span v-if="data.likes > 0">{{data.likes}}</span>
      <button class="bold" @click="reply(data.id)">Phản hồi</button>
    </div>
    <div class="reply">
      <!-- <ElearningCourseCommentInput :data="auth" /> -->
      <ElearningCourseCommentItem :data="data"/>
      <!-- <ElearningCourseCommentItem :auth="auth" :data="comment" v-for="(comment, i) in comments" :key="i" /> -->
    </div>
  </div>
</template>
<script>
import ElearningCourseCommentContent from "~/components/page/elearning/course/comment/ElearningCourseCommentContent";
import ElearningCourseCommentItem from "~/components/page/elearning/course/comment/ElearningCourseCommentItem";
import ElearningCourseCommentInput from "~/components/page/elearning/course/comment/ElearningCourseCommentInput";
import IconLike from "~/assets/svg/icons/like.svg?inline";
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";

export default {
  components: {
    IconCamera,
    IconLike,
    ElearningCourseCommentContent,
    ElearningCourseCommentItem,
    ElearningCourseCommentInput
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    auth: {
      type: Object,
      default: () => {}
    },
  },

  data() {
    return {
      reply: false,
      comments: [
        {
          id: 1,
          avatar: "https://picsum.photos/50/50",
          name: "Nguyễn Ngọc Quyên",
          content: "Làm chủ 6 công cụ Marketing online HOT NHẤT hiện nay",
          time: "20/11/2022",
          likes: 100,
          liked: true,
          parent: true,
          parentId: "",
        },
        {
          id: 2,
          avatar: "https://picsum.photos/50/50",
          name: "Nguyễn Ngọc Quyên",
          content: "Làm chủ 6 công cụ Marketing online HOT NHẤT hiện nay",
          time: "20/11/2022",
          likes: 100,
          liked: true,
          parent: true,
          parentId: "",
        },
      ]
    };
  },

  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/course/_elearning-course-side.scss";
</style>