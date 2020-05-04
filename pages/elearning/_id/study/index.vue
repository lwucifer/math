<template>
  <div>
    <HeaderCourse />
    <div class="container elearning-lesson">
      <div class="elearning-lesson__main">
        <div class="row">
          <div class="col-md-8">
            <div class="box11">
              <div class="elearning-lesson_image">
                <img src="https://picsum.photos/750/422" alt />
              </div>
              <div class="elearning-lesson__main-nav">
                <a
                  :class="{ active: type === 'summary' }"
                  @click="type = 'summary'"
                  >Tổng quan</a
                >
                <a
                  :class="{ active: type === 'question' }"
                  @click="type = 'question'"
                  >Hỏi đáp</a
                >
                <!-- <n-link :to="'/elearning/course/question'">Hỏi đáp</n-link> -->
                <n-link :to="'/elearning/course/notify'">Thông báo</n-link>
                <n-link :to="'/elearning/course/question'">Đánh giá</n-link>
              </div>
              <ElearningInfo :info="info" v-if="type === 'summary'" />
              <ElearningQuestion
                v-if="type === 'question'"
                :interactive_questions="interactive_questions"
              />
            </div>
          </div>
          <div class="col-md-4">
            <ElearningCourseSide :info="info" :data="data" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElearningCourseComment from "~/components/page/elearning/study/Comment";
import ElearningCourseSide from "~/components/page/elearning/course/ElearningCourseSide";
import HeaderCourse from "~/components/layout/header/HeaderCourse";
import IconSearch from "~/assets/svg/design-icons/search.svg?inline";
import IconLike from "~/assets/svg/icons/like.svg?inline";
import IconCamera from "~/assets/svg/design-icons/camera.svg?inline";
// Import faked data
import { COURSE_LESSON } from "~/server/fakedata/elearning/test";
import { mapState } from "vuex";
import * as actionTypes from "~/utils/action-types";
import InfoService from "~/services/elearning/study/Info";
import InteractiveQuestionService from "~/services/elearning/study/InteractiveQuestion";
import { get } from "lodash";
import ProgramService from "~/services/elearning/public/Program";
import { AUTH, COMMENTS, LESSON } from "~/server/fakedata/elearning/test";
import ElearningInfo from "~/components/page/elearning/study/ElearningInfo";
import ElearningQuestion from "~/components/page/elearning/study/ElearningQuestion";

export default {
  name: "Elearning",
  layout: "no-header",

  components: {
    ElearningCourseComment,
    ElearningCourseSide,
    IconSearch,
    IconCamera,
    HeaderCourse,
    ElearningInfo,
    ElearningQuestion,
  },

  created() {
    console.log(this.$router.history.current.params.id);
    this.getData(this.$router.history.current.params.id);
  },

  methods: {
    async getData(elearning_id) {
      const getInfo = () =>
        new InfoService(this.$axios)[actionTypes.BASE.LIST]({
          params: {
            elearning_id,
          },
        });
      const getProgram = () =>
        new InteractiveQuestionService(this.$axios)[actionTypes.BASE.LIST]({
          params: {
            elearning_id,
          },
        });

      const data = await Promise.all([getInfo(), getProgram()]);

      console.log(data);

      this.info = get(data, "0.data", null);
      this.interactive_questions = get(data, "1.data", []);
    },
    get,
  },

  data() {
    return {
      type: "summary",
      auth: AUTH,
      comments: COMMENTS,
      info: null,
      interactive_questions: null,
      data: {
        number: 9,
        times: "9 giờ 30 phút",
        classes: [
          {
            id: 1,
            name: "Bài giảng online cho khoá học",
            done: false,
          },
          {
            id: 2,
            name: "Bài giảng online cho khoá học",
            done: true,
          },
        ],
        list: COURSE_LESSON,
      },
    };
  },
  computed: {
    ...mapState("auth", ["loggedUser"]),
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/components/elearning/course/_elearning-course.scss";
</style>
