<template>
  <div class="elearning-course-comment__item">
    <app-avatar :src="get(answer, 'creator.avatar.low', '')" :size="50" />
    <div class="content">
      <div>
        <strong class="pr-3">{{ answer.name }}</strong>
        <span>{{ answer.time }}</span>
      </div>
      <div class="text">{{ answer.content }}</div>
      <div class="actions mt-3 mb-3">
        <button>
          <IconLike :class="answer.liked ? 'fill-primary' : 'fill-999'" />
        </button>
        <span v-if="answer.likes > 0">{{ answer.likes }}</span>
        <!-- <button class="bold color-999 ml-4" @click="reply(data.id, data.name)">
          Phản hồi
        </button> -->
      </div>
      <!-- <CommentInput :tag="data" v-if="showReply" @close="showReply = false" /> -->
    </div>
  </div>
</template>
<script>
import IconLike from "~/assets/svg/icons/like.svg?inline";
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";
import { get } from "lodash";
import { mapState } from "vuex";

export default {
  components: {
    IconCamera,
    IconLike,
  },
  props: {
    answer: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      showReply: false,
      comments: [],
      visible: false,
      // comment: [
      //   {
      //     id: 1,
      //     avatar: "https://picsum.photos/58/50",
      //     name: "Nguyễn Ngọ Quyên",
      //     content:
      //       "Xuân Bắc và bé Bi Béo rồi. Cu Bi lớn rồi, nhưng vẫn mập mạp và rất đáng yêu.",
      //     time: "20/11/2022",
      //     likes: 100,
      //     liked: true,
      //     parent: true,
      //     parentId: "",
      //   },
      //   {
      //     id: 2,
      //     avatar: "https://picsum.photos/56/50",
      //     name: "Nguyễn Ngọc Quy",
      //     content:
      //       "Từ Từ Từ Bố ơi mình đi đâu thế? đã siêu thích chú Xuân Bắc và bé Bi Béo rồi. Cu Bi lớn rồi, nhưng vẫn mập mạp và rất đáng yêu.",
      //     time: "20/11/2022",
      //     likes: 100,
      //     liked: true,
      //     parent: true,
      //     parentId: "",
      //   },
      // ],
    };
  },

  computed: {
    ...mapState("auth", { user_login: "token" }),
  },

  // updated() {
  //   console.log(this.comment);
  // },

  // created() {
  //   console.log(this.comment);
  // },

  methods: {
    get,
    reply(id) {
      this.comments[id] = this.comment;
      this.showReply = !this.showReply;
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/course/_elearning-course-side.scss";
</style>
