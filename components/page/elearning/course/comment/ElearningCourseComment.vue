<template>
  <div>
    <!-- <ElearningCourseCommentInput :data="auth" />
    <div class="elearning-course-comment" v-for="(item, index) in data" :key="index">
      <ElearningCourseCommentContent :data="item" />
      <div class="actions">
        <button>
          <IconLike :class="item.liked ? 'fill-primary' : 'fill-999'" />
        </button>
        <span v-if="item.likes > 0">{{item.likes}}</span>
        <button class="bold" @click="reply(item.id)">Phản hồi</button>
      </div>
      <div class="reply">
        <ElearningCourseCommentInput :data="auth" />
        <div v-for="(comment, i) in comments" :key="i">
          <ElearningCourseCommentContent :data="comment" />
          <div class="actions">
            <button>
              <IconLike :class="comment.liked ? 'fill-primary' : 'fill-999'" />
            </button>
            <span v-if="comment.likes > 0">{{comment.likes}}</span>
            <button class="bold" @click="reply(comment.id)">Phản hồi</button>
          </div>
          <div class="reply">
            <ElearningCourseCommentInput :data="auth" />
            <div v-for="(comment2, j) in comments2" :key="j">
              <ElearningCourseCommentContent :data="comment2" />
              <div class="actions">
                <button>
                  <IconLike :class="comment2.liked ? 'fill-primary' : 'fill-999'" />
                </button>
                <span v-if="comment2.likes > 0">{{comment2.likes}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <ElearningCourseCommentItem :auth="auth" :data="item" v-for="(item, index) in data" :key="index"/> 
  </div>
</template>
<script>
import ElearningCourseCommentItem from "~/components/page/elearning/course/comment/ElearningCourseCommentItem";
import ElearningCourseCommentContent from "~/components/page/elearning/course/comment/ElearningCourseCommentContent";
import ElearningCourseCommentInput from "~/components/page/elearning/course/comment/ElearningCourseCommentInput";
import IconLike from "~/assets/svg/icons/like.svg?inline";
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";

export default {
  components: {
    IconCamera,
    IconLike,
    ElearningCourseCommentContent,
    ElearningCourseCommentInput,
    ElearningCourseCommentItem
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
      reply: false
    };
  },

  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/course/_elearning-course-side.scss";
</style>