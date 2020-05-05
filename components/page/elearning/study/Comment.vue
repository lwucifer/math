<template>
  <div>
    <div class="d-flex">
      <app-avatar :src="auth.avatar" :size="50" />
      <app-input
        textarea
        v-model="comment"
        placeholder="Bình luận"
        class="ml-3 w-100"
        @keyup.enter.native="handleChangeComment"
      />
    </div>
    <CommentItem
      :auth="auth"
      :comment="comment"
      v-for="(comment, index) in comments"
      :key="index"
    />
  </div>
</template>
<script>
import CommentItem from "~/components/page/elearning/study/CommentItem";
import CommentInput from "~/components/page/elearning/study/CommentInput";
import IconLike from "~/assets/svg/icons/like.svg?inline";
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";
import InteractiveQuestionService from "~/services/elearning/study/InteractiveQuestion";
import { get } from "lodash";

export default {
  components: {
    IconCamera,
    IconLike,
    CommentInput,
    CommentItem,
  },
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
    auth: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      comment: "",
      reply: false,
      submit: true,
    };
  },

  methods: {
    async handleChangeComment() {
      if (!this.submit) return;
      this.submit = false;
      const params = {
        content: this.comment,
        elearning_id: get(this, "$router.history.current.params.id", ""),
      };
      const res = await new InteractiveQuestionService(this.$axios)[
        "addQuestion"
      ](params);
      if (get(res, "success", false)) {
        this.$emit("addQuestionSuccess");
        this.$toasted.success("Thành công");
        this.comment = "";
        this.submit = true;
        return;
      }
      this.submit = true;
      this.$toasted.error(get(res, "message", "Có lỗi xảy ra"));
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/course/_elearning-course-side.scss";
</style>
