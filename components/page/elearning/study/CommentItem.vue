<template>
  <div class="elearning-course-comment__item">
    <app-avatar :src="comment.avatar" :size="50" />
    <div class="content">
      <div>
        <strong class="pr-3">{{ comment.name }}</strong>
        <span>{{ comment.time }}</span>
      </div>
      <div class="text">{{ comment.content }}</div>
      <div class="actions mt-3">
        <button>
          <IconLike :class="comment.liked ? 'fill-primary' : 'fill-999'" />
        </button>
        <span v-if="comment.likes > 0">{{ comment.likes }}</span>
        <button
          type="button"
          class="bold color-999 ml-4"
          @click="reply(comment.id)"
        >
          Phản hồi
        </button>
      </div>
      <div class="reply ml-3" v-if="showReply">
        <button type="button" class="mt-3 mb-3" @click="showReply = false">
          Ẩn câu trả lời
        </button>
        <CommentInput :data="auth" />
        <CommentItemChild
          :auth="auth"
          :data="item"
          v-for="(item, index) in comments[data.id]"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>
<script>
import CommentItemChild from "~/components/page/elearning/course/comment/CommentItemChild";
import CommentInput from "~/components/page/elearning/course/comment/CommentInput";
import IconLike from "~/assets/svg/icons/like.svg?inline";
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";

export default {
  components: {
    IconCamera,
    IconLike,
    CommentItemChild,
    CommentInput,
  },
  props: {
    comment: {
      type: Object,
      default: () => {},
    },
    auth: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      showReply: false,
      comments: [],
      comment: [
        {
          id: 1,
          avatar: "https://picsum.photos/50/52",
          name: "Quyên Ngọc",
          content:
            "Bố ơi mình đi đâu thế? đã siêu thích chú Xuân Bắc và bé Bi Béo rồi. Cu Bi lớn rồi, nhưng vẫn mập mạp và rất đáng yêu.",
          time: "20/11/2022",
          likes: 100,
          liked: true,
          parent: true,
          parentId: "",
        },
        {
          id: 2,
          avatar: "https://picsum.photos/52/50",
          name: "Ngọc Quyên",
          content:
            "Tã siêu thích chú Xuân Bắc và bé Bi Béo rồi. Cu Bi lớn rồi, nhưng vẫn mập mạp và rất đáng yêu.",
          time: "20/11/2022",
          likes: 100,
          liked: true,
          parent: true,
          parentId: "",
        },
      ],
    };
  },

  methods: {
    reply(id) {
      this.comments[id] = this.comment;
      this.showReply = true;
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/course/_elearning-course-side.scss";
</style>
