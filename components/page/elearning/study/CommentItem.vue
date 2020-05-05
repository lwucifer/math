<template>
  <div class="elearning-course-comment__item">
    <app-avatar :src="get(comment, 'creator.avatar.low', '')" :size="50" />
    <div class="content">
      <div>
        <strong class="pr-3">{{ get(comment, "creator.name", "") }}</strong>
        <span>{{ get(comment, "timestamp", "") }}</span>
      </div>
      <div class="text">{{ get(comment, "content", "") }}</div>
      <div class="actions mt-3">
        <button>
          <IconLike
            :class="liked ? 'fill-primary' : 'fill-999'"
            @click="handleLikeAnswer"
          />
        </button>
        <span v-if="likes > 0">{{ likes }}</span>
        <button type="button" class="bold color-999 ml-4" @click="reply">
          Phản hồi
        </button>
      </div>
      <div class="reply ml-3" v-if="showReply">
        <button type="button" class="mt-3 mb-3" @click="showReply = false">
          Ẩn câu trả lời
        </button>
        <CommentInput />
        <CommentItemChild :data="comment" />
      </div>
    </div>
  </div>
</template>
<script>
import CommentItemChild from "~/components/page/elearning/study/CommentItemChild";
import CommentInput from "~/components/page/elearning/study/CommentInput";
import IconLike from "~/assets/svg/icons/like.svg?inline";
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";
import { get } from "lodash";
import QuestionLikeService from "~/services/elearning/study/QuestionLike";
import { useEffect } from "~/utils/common";

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
  },

  watch: {
    comment: {
      handler: function() {
        this.liked = get(this, "comment.liked", false);
        this.likes = get(this, "comment.likes", 0);
      },
      deep: true,
    },
  },

  data() {
    return {
      showReply: false,
      liked: get(this, "comment.liked", false),
      likes: get(this, "comment.likes", 0),
      submit: true,
    };
  },

  methods: {
    reply() {
      this.showReply = true;
    },
    get,
    async handleLikeAnswer() {
      if (!this.submit) return;
      this.submit = false;
      const payload = {
        question_id: this.comment.id,
        like: !this.liked,
      };

      const res = await new QuestionLikeService(this.$axios)["add"](payload);

      this.submit = true;

      if (get(res, "success", false)) {
        this.liked = !this.liked;
        this.likes = this.liked ? this.likes + 1 : this.likes - 1;
        return;
      }

      this.$toasted.error(get(res, "message", "Có lỗi xảy ra"));
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/course/_elearning-course-side.scss";
</style>
