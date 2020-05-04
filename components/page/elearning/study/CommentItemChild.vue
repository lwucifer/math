<template>
  <div class="elearning-course-comment__item">
    <app-avatar :src="data.avatar" :size="50" />
    <div class="content">
      <div>
        <strong class="pr-3">{{data.name}}</strong>
        <span>{{data.time}}</span>
      </div>
      <div class="text">{{data.content}}</div>
      <div class="actions mt-3 mb-3">
        <button>
          <IconLike :class="data.liked ? 'fill-primary' : 'fill-999'" />
        </button>
        <span v-if="data.likes > 0">{{data.likes}}</span>
        <button class="bold color-999 ml-4" @click="reply(data.id, data.name)">Phản hồi</button>
      </div>
      <CommentInput :data="auth" :tag="data" v-if="showReply" @close="showReply = false" />
    </div>
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
    CommentItem,
    CommentInput
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    auth: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      showReply: false,
      comments: [],
      visible: false,
      comment: [
        {
          id: 1,
          avatar: "https://picsum.photos/58/50",
          name: "Nguyễn Ngọ Quyên",
          content: "Xuân Bắc và bé Bi Béo rồi. Cu Bi lớn rồi, nhưng vẫn mập mạp và rất đáng yêu.",
          time: "20/11/2022",
          likes: 100,
          liked: true,
          parent: true,
          parentId: ""
        },
        {
          id: 2,
          avatar: "https://picsum.photos/56/50",
          name: "Nguyễn Ngọc Quy",
          content: "Từ Từ Từ Bố ơi mình đi đâu thế? đã siêu thích chú Xuân Bắc và bé Bi Béo rồi. Cu Bi lớn rồi, nhưng vẫn mập mạp và rất đáng yêu.",
          time: "20/11/2022",
          likes: 100,
          liked: true,
          parent: true,
          parentId: ""
        }
      ]
    };
  },

  methods: {
    reply(id) {
      this.comments[id] = this.comment;
      this.showReply = !this.showReply;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/course/_elearning-course-side.scss";
</style>